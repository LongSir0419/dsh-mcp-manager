import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";
import { join, dirname } from "node:path";
import { readFile, writeFile, rename } from "node:fs/promises";
import * as yaml from "js-yaml";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { scrubbedParentEnv } from "@deepseek-ai/dsh-subprocess";

/**
 * The DSH patch dialect: `!!js` scalars are expression nodes the Loader
 * evaluates at entry activation. This mirrors cordis-plugin-include's
 * JsExpr type so reading and writing cordis.patch.yml round-trips them
 * instead of failing on an unknown tag.
 */
const JsExpr = new yaml.Type("tag:yaml.org,2002:js", {
  kind: "scalar",
  resolve: (data) => typeof data === "string",
  construct: (data) => ({ __jsExpr: data }),
  predicate: (value) => value !== null && typeof value === "object" && value.__jsExpr !== void 0,
  represent: (value) => value["__jsExpr"]
});
/** Schema for parsing and dumping patch documents, including `!!js`. */
const patchSchema = yaml.JSON_SCHEMA.extend(JsExpr);

//#region decorator helpers (must precede the decorated class)
var __runInitializers = function(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  return useValue ? value : void 0;
};
var __esDecorate = function(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected");
    return f;
  }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function(f) {
      if (done) throw new TypeError("Cannot add initializers after decoration has completed");
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(kind === "accessor" ? {
      get: descriptor.get,
      set: descriptor.set
    } : descriptor[key], context);
    if (kind === "accessor") {
      if (result === void 0) continue;
      if (result === null || typeof result !== "object") throw new TypeError("Object expected");
      if (_ = accept(result.get)) descriptor.get = _;
      if (_ = accept(result.set)) descriptor.set = _;
      if (_ = accept(result.init)) initializers.unshift(_);
    } else if (_ = accept(result)) if (kind === "field") initializers.unshift(_);
    else descriptor[key] = _;
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};
//#endregion

//#region MCP inventory Remote
/**
 * Read/write MCP server entries in the active profile's cordis.patch.yml.
 *
 * The user patch layer is a top-level YAML array of loader patch entries. MCP
 * servers live in an `insert` list under ids `mcp-<name>`. This service
 * locates the active profile directory through the Loader's baseUrl, edits
 * the file in place (preserving unrelated entries and comments via a
 * text-surgery update), and returns the resulting snapshot.
 */

/** Find the active profile's cordis.patch.yml through the Loader baseUrl. */
function profilePatchPath(ctx) {
  const base = ctx.loader?.ctx?.baseUrl;
  if (base === void 0) throw new Error("mcp-inventory: loader baseUrl unavailable");
  const url = base instanceof URL ? base : new URL(base);
  if (url.protocol !== "file:") throw new Error(`mcp-inventory: loader baseUrl is not a file URL: ${url.href}`);
  const dir = url.pathname;
  // Windows file URLs keep a leading slash before the drive letter.
  const normalized = /^\/[A-Za-z]:\//.test(dir) ? dir.slice(1) : dir;
  return join(normalized, "cordis.patch.yml");
}

/** Parse a patch document into its top-level entry array. */
function parsePatchDocument(text) {
  const data = yaml.load(text, { schema: patchSchema });
  if (!Array.isArray(data)) throw new Error("mcp-inventory: cordis.patch.yml must be a top-level YAML array");
  return data;
}

/** Collect every `mcp-*` entry from all `insert` lists in the document. */
function collectMcpEntries(doc) {
  const entries = [];
  const walk = (list) => {
    for (const node of list) {
      if (node === null || typeof node !== "object" || Array.isArray(node)) continue;
      if (node.id !== void 0 && typeof node.id === "string" && node.id.startsWith("mcp-")) {
        entries.push({ id: node.id, name: node.name, config: node.config ?? {} });
      }
      if (Array.isArray(node.insert)) walk(node.insert);
    }
  };
  walk(doc);
  return entries;
}

/** Replace or insert one `mcp-*` entry inside the first insert list; if no insert list exists, create one. */
function upsertMcpEntry(doc, entry) {
  let insertList = null;
  for (const node of doc) {
    if (node !== null && typeof node === "object" && !Array.isArray(node) && Array.isArray(node.insert)) {
      insertList = node.insert;
      break;
    }
  }
  if (insertList === null) {
    insertList = [];
    doc.push({ insert: insertList });
  }
  const index = insertList.findIndex((e) => e && e.id === entry.id);
  if (index >= 0) insertList[index] = entry;
  else insertList.push(entry);
}

/** Remove every `mcp-*` entry with the given id from all insert lists. */
function removeMcpEntry(doc, id) {
  let removed = false;
  const walk = (list) => {
    for (let i = list.length - 1; i >= 0; i--) {
      const node = list[i];
      if (node === null || typeof node !== "object" || Array.isArray(node)) continue;
      if (node.id === id) {
        list.splice(i, 1);
        removed = true;
        continue;
      }
      if (Array.isArray(node.insert)) walk(node.insert);
    }
  };
  walk(doc);
  return removed;
}

/** Atomic write: temp file + rename, matching dsh-settings-file's approach. */
async function atomicWrite(path, text) {
  const tmp = `${path}.tmp`;
  await writeFile(tmp, text, "utf8");
  await rename(tmp, path);
}

/**
 * Remote-only service exposing MCP server management over the active
 * profile's user patch layer.
 */
let McpInventoryGateway = (() => {
  let _classSuper = TypertRemoteService;
  let _instanceExtraInitializers = [];
  let _list_decorators;
  let _add_decorators;
  let _update_decorators;
  let _remove_decorators;
  let _test_decorators;
  return class McpInventoryGateway extends _classSuper {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _list_decorators = [Remote("list")];
      _add_decorators = [Remote("add")];
      _update_decorators = [Remote("update")];
      _remove_decorators = [Remote("removeServer")];
      _test_decorators = [Remote("test")];
      __esDecorate(this, null, _list_decorators, {
        kind: "method", name: "list", static: false, private: false,
        access: { has: (obj) => "list" in obj, get: (obj) => obj.list },
        metadata: _metadata
      }, null, _instanceExtraInitializers);
      __esDecorate(this, null, _add_decorators, {
        kind: "method", name: "add", static: false, private: false,
        access: { has: (obj) => "add" in obj, get: (obj) => obj.add },
        metadata: _metadata
      }, null, _instanceExtraInitializers);
      __esDecorate(this, null, _update_decorators, {
        kind: "method", name: "update", static: false, private: false,
        access: { has: (obj) => "update" in obj, get: (obj) => obj.update },
        metadata: _metadata
      }, null, _instanceExtraInitializers);
      __esDecorate(this, null, _remove_decorators, {
        kind: "method", name: "removeServer", static: false, private: false,
        access: { has: (obj) => "removeServer" in obj, get: (obj) => obj.removeServer },
        metadata: _metadata
      }, null, _instanceExtraInitializers);
      __esDecorate(this, null, _test_decorators, {
        kind: "method", name: "test", static: false, private: false,
        access: { has: (obj) => "test" in obj, get: (obj) => obj.test },
        metadata: _metadata
      }, null, _instanceExtraInitializers);
      if (_metadata) Object.defineProperty(this, Symbol.metadata, {
        enumerable: true, configurable: true, writable: true, value: _metadata
      });
    }
    static inject = ["loader", "tools"];
    constructor(ctx) {
      super(ctx, "mcpInventory");
      __runInitializers(this, _instanceExtraInitializers);
    }
    /** Path of the active profile's user patch file. */
    patchPath() {
      return profilePatchPath(this.ctx);
    }
    /** Count registered tools per MCP server from the live tools registry. */
    toolCounts() {
      const counts = {};
      try {
        const globalLayer = this.ctx.tools?.layers?.global;
        if (globalLayer?.tools) {
          for (const [name] of globalLayer.tools.entries()) {
            // Registered MCP tools are named mcp__<serverName>__<rawName>.
            if (typeof name === "string" && name.startsWith("mcp__")) {
              const server = name.split("__")[1];
              if (server !== void 0) counts[server] = (counts[server] ?? 0) + 1;
            }
          }
        }
      } catch (error) {
        // Tool counting is best-effort; never fail list() on registry access.
        this.ctx.logger?.warn?.("mcp-inventory: toolCounts failed", error);
      }
      return counts;
    }
    /** Read and return every MCP server entry plus the patch file path. */
    async list() {
      const path = this.patchPath();
      let doc = [];
      let text = "";
      try {
        text = await readFile(path, "utf8");
        doc = parsePatchDocument(text);
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
      const counts = this.toolCounts();
      const entries = collectMcpEntries(doc).map((entry) => {
        const serverName = entry.id.startsWith("mcp-") ? entry.id.slice(4) : entry.id;
        return {
          ...entry,
          toolCount: counts[serverName] ?? 0,
          connected: (counts[serverName] ?? 0) > 0
        };
      });
      return { path, entries };
    }
    /** Add a new MCP server entry. */
    async add(spec) {
      const { serverName, name, config } = spec;
      if (typeof serverName !== "string" || serverName.length === 0) throw new Error("mcp-inventory: serverName is required");
      if (!/^[A-Za-z0-9_-]{1,32}$/.test(serverName)) throw new Error("mcp-inventory: serverName must match [A-Za-z0-9_-]{1,32}");
      const id = `mcp-${serverName}`;
      const path = this.patchPath();
      let doc = [];
      let text = "";
      try {
        text = await readFile(path, "utf8");
        doc = parsePatchDocument(text);
      } catch (error) {
        if (error?.code !== "ENOENT") throw error;
      }
      const existing = collectMcpEntries(doc).find((e) => e.id === id);
      if (existing) throw new Error(`mcp-inventory: MCP server "${serverName}" already exists`);
      upsertMcpEntry(doc, { id, name: name ?? "@deepseek-ai/dsh-mcp-client", config: config ?? {} });
      await atomicWrite(path, yaml.dump(doc, { schema: patchSchema }));
      return { ok: true, id, path, entries: collectMcpEntries(doc) };
    }
    /** Update an existing MCP server entry by id. */
    async update(spec) {
      const { id, name, config } = spec;
      if (typeof id !== "string" || !id.startsWith("mcp-")) throw new Error("mcp-inventory: id must start with mcp-");
      const path = this.patchPath();
      const text = await readFile(path, "utf8");
      const doc = parsePatchDocument(text);
      const before = collectMcpEntries(doc);
      const target = before.find((e) => e.id === id);
      if (!target) throw new Error(`mcp-inventory: MCP server "${id}" not found`);
      upsertMcpEntry(doc, {
        id,
        name: name ?? target.name ?? "@deepseek-ai/dsh-mcp-client",
        config: config ?? target.config ?? {}
      });
      await atomicWrite(path, yaml.dump(doc, { schema: patchSchema }));
      return { ok: true, id, path, entries: collectMcpEntries(doc) };
    }
    /** Remove an MCP server entry by id. Named removeServer because `remove`
     * collides with RemoteNamespaceService.prototype.remove in the client api. */
    async removeServer(id) {
      if (typeof id !== "string" || !id.startsWith("mcp-")) throw new Error("mcp-inventory: id must start with mcp-");
      const path = this.patchPath();
      const text = await readFile(path, "utf8");
      const doc = parsePatchDocument(text);
      const removed = removeMcpEntry(doc, id);
      if (!removed) throw new Error(`mcp-inventory: MCP server "${id}" not found`);
      await atomicWrite(path, yaml.dump(doc, { schema: patchSchema }));
      return { ok: true, id, path, entries: collectMcpEntries(doc) };
    }
    /**
     * Actively test connectivity to one MCP server: perform a fresh MCP
     * handshake (initialize + tools/list) independent of the running
     * dsh-mcp-client instance. Returns tool count and latency on success, or
     * a diagnostic message on failure.
     */
    async test(id) {
      if (typeof id !== "string" || !id.startsWith("mcp-")) throw new Error("mcp-inventory: id must start with mcp-");
      const path = this.patchPath();
      const text = await readFile(path, "utf8");
      const doc = parsePatchDocument(text);
      const target = collectMcpEntries(doc).find((e) => e.id === id);
      if (!target) throw new Error(`mcp-inventory: MCP server "${id}" not found`);
      const config = target.config ?? {};
      const start = Date.now();
      let client;
      try {
        let transport;
        if (config.transport === "streamable-http" || config.url !== void 0) {
          transport = new StreamableHTTPClientTransport(new URL(config.url), {
            requestInit: config.headers !== void 0 ? { headers: config.headers } : void 0
          });
        } else {
          transport = new StdioClientTransport({
            command: config.command,
            args: config.args ?? [],
            env: { ...scrubbedParentEnv(), ...(config.env ?? {}) },
            cwd: config.cwd
          });
        }
        client = new Client({ name: "@wanghailong0419/dsh-mcp-inventory-test", version: "0.1.0" });
        const timeout = new Promise((_, reject) => {
          const timer = setTimeout(() => reject(new Error("连接超时（15s）")), 15000);
          timer.unref?.();
        });
        await Promise.race([client.connect(transport), timeout]);
        const toolsResult = await Promise.race([client.listTools(), timeout]);
        const toolCount = Array.isArray(toolsResult.tools) ? toolsResult.tools.length : 0;
        const latencyMs = Date.now() - start;
        return { ok: true, id, toolCount, latencyMs, message: "可达" };
      } catch (cause) {
        const latencyMs = Date.now() - start;
        return {
          ok: false,
          id,
          toolCount: 0,
          latencyMs,
          message: cause instanceof Error ? cause.message : String(cause)
        };
      } finally {
        if (client !== void 0) try { await client.close(); } catch { /* ignore close errors */ }
      }
    }
  };
})();
//#endregion

export { McpInventoryGateway, McpInventoryGateway as default };
