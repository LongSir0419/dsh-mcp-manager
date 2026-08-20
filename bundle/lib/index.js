import { Remote, TypertRemoteService } from "@deepseek-ai/dsh-typert-protocol";
import { join, dirname } from "node:path";
import { readFile, writeFile, rename } from "node:fs/promises";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
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

/**
 * The `navIcon(id)` branch this bundle injects into the official
 * dsh-client-ui-settings-general bundle so the Settings sidebar shows the MCP
 * logo for the "MCP servers" section instead of the default gear.
 * The SVG is the official MCP logo mark (modelcontextprotocol.io), stroke
 * follows currentColor so it adapts to dark/light themes.
 */
const MCP_NAV_BRANCH = `if (id === "mcp") return (0, react_jsx_runtime.jsx)("svg", {
				width: 16,
				height: 16,
				className: SettingsRoot_module_css_default.navIcon,
				viewBox: "0 0 180 180",
				fill: "none",
				xmlns: "http://www.w3.org/2000/svg",
				"aria-hidden": "true",
				children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
					children: [
						(0, react_jsx_runtime.jsx)("path", {
							d: "M23.5996 85.2532L86.2021 22.6507C94.8457 14.0071 108.86 14.0071 117.503 22.6507C126.147 31.2942 126.147 45.3083 117.503 53.9519L70.2254 101.23",
							stroke: "currentColor",
							strokeWidth: 11.0667,
							strokeLinecap: "round"
						}),
						(0, react_jsx_runtime.jsx)("path", {
							d: "M70.8789 100.578L117.504 53.952C126.148 45.3083 140.163 45.3083 148.806 53.952L149.132 54.278C157.776 62.9216 157.776 76.9357 149.132 85.5792L92.5139 142.198C89.6327 145.079 89.6327 149.75 92.5139 152.631L104.14 164.257",
							stroke: "currentColor",
							strokeWidth: 11.0667,
							strokeLinecap: "round"
						}),
						(0, react_jsx_runtime.jsx)("path", {
							d: "M101.853 38.3013L55.553 84.6011C46.9094 93.2447 46.9094 107.258 55.553 115.902C64.1966 124.546 78.2106 124.546 86.8543 115.902L133.154 69.6025",
							stroke: "currentColor",
							strokeWidth: 11.0667,
							strokeLinecap: "round"
						})
					]
				})
			});`;

/**
 * Idempotently patch the official dsh-client-ui-settings-general bundle so the
 * Settings sidebar nav renders the MCP logo for our section. DSH upgrades
 * overwrite node_modules, so this runs on every host activation and re-patches
 * if needed. All failures are swallowed: the icon is cosmetic and must never
 * break the plugin.
 * @param ctx - host plugin context (used for logging).
 * @returns true when the patch is present after this run.
 */
function ensureNavIconPatch(ctx) {
  try {
    const require = createRequire(import.meta.url);
    let target;
    try {
      target = require.resolve("@deepseek-ai/dsh-client-ui-settings-general/lib/client.js");
    } catch {
      return false; // package not present in this installation
    }
    if (!existsSync(target)) return false;
    const src = readFileSync(target, "utf8");
    if (src.includes('id === "mcp"')) return true; // already patched
    const anchor = 'if (id === "plugins") return';
    const idx = src.indexOf(anchor);
    if (idx === -1) return false; // unexpected bundle shape; leave it alone
    const insertAt = src.indexOf("\n", idx) + 1;
    const patched = `${src.slice(0, insertAt)}${MCP_NAV_BRANCH}\n${src.slice(insertAt)}`;
    writeFileSync(target, patched, "utf8");
    ctx?.logger?.info?.("dsh-mcp-manager: patched navIcon with MCP logo");
    return true;
  } catch (error) {
    ctx?.logger?.warn?.("dsh-mcp-manager: navIcon patch skipped:", error instanceof Error ? error.message : String(error));
    return false;
  }
}

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
        entries.push({ id: node.id, name: node.name, config: node.config ?? {}, enabled: node.enabled !== false });
      }
      if (Array.isArray(node.insert)) walk(node.insert);
    }
  };
  walk(doc);
  return entries;
}

/** Replace or insert one `mcp-*` entry inside the first insert list; if no insert list exists, create one.
 * Existing entries are shallow-merged so unrelated fields survive, and
 * `undefined` values are dropped (avoid writing `enabled: undefined`). */
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
  const clean = {};
  for (const [k, v] of Object.entries(entry)) {
    if (v !== void 0) clean[k] = v;
  }
  if (index >= 0) {
    insertList[index] = { ...insertList[index], ...clean };
  } else {
    insertList.push(clean);
  }
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
  let _set_enabled_decorators;
  return class McpInventoryGateway extends _classSuper {
    static {
      const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
      _list_decorators = [Remote("list")];
      _add_decorators = [Remote("add")];
      _update_decorators = [Remote("update")];
      _remove_decorators = [Remote("removeServer")];
      _test_decorators = [Remote("test")];
      _set_enabled_decorators = [Remote("setEnabled")];
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
      __esDecorate(this, null, _set_enabled_decorators, {
        kind: "method", name: "setEnabled", static: false, private: false,
        access: { has: (obj) => "setEnabled" in obj, get: (obj) => obj.setEnabled },
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
      // Cosmetic: ensure the Settings sidebar shows the MCP logo for our
      // section. Runs on every activation, idempotent, never throws.
      ensureNavIconPatch(ctx);
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
    /** Update an existing MCP server entry by id. When `serverName` is
     * provided and differs, the entry id is renamed accordingly. */
    async update(spec) {
      const { id, serverName, name, config } = spec;
      if (typeof id !== "string" || !id.startsWith("mcp-")) throw new Error("mcp-inventory: id must start with mcp-");
      if (serverName !== void 0 && serverName !== null && serverName !== "") {
        if (!/^[A-Za-z0-9_-]{1,32}$/.test(serverName)) throw new Error("mcp-inventory: serverName must match [A-Za-z0-9_-]{1,32}");
      }
      const path = this.patchPath();
      const text = await readFile(path, "utf8");
      const doc = parsePatchDocument(text);
      const before = collectMcpEntries(doc);
      const target = before.find((e) => e.id === id);
      if (!target) throw new Error(`mcp-inventory: MCP server "${id}" not found`);
      const newId = serverName !== void 0 && serverName !== null && serverName !== "" ? `mcp-${serverName}` : id;
      if (newId !== id && before.some((e) => e.id === newId)) throw new Error(`mcp-inventory: MCP server "${newId}" already exists`);
      if (newId !== id) {
        const replaced = removeMcpEntry(doc, id);
        if (!replaced) throw new Error(`mcp-inventory: MCP server "${id}" not found`);
      }
      upsertMcpEntry(doc, {
        id: newId,
        name: name ?? target.name ?? "@deepseek-ai/dsh-mcp-client",
        config: config ?? target.config ?? {},
        enabled: target.enabled === false ? false : void 0
      });
      await atomicWrite(path, yaml.dump(doc, { schema: patchSchema }));
      return { ok: true, id: newId, path, entries: collectMcpEntries(doc) };
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
    /** Enable or disable an MCP server entry by toggling the cordis `enabled`
     * field on its patch entry (`enabled: false` stops the loader from
     * activating it; removing the field re-enables it). */
    async setEnabled(spec) {
      const { id, enabled } = spec;
      if (typeof id !== "string" || !id.startsWith("mcp-")) throw new Error("mcp-inventory: id must start with mcp-");
      if (typeof enabled !== "boolean") throw new Error("mcp-inventory: enabled must be a boolean");
      const path = this.patchPath();
      const text = await readFile(path, "utf8");
      const doc = parsePatchDocument(text);
      let found = false;
      const walk = (list) => {
        for (const node of list) {
          if (node === null || typeof node !== "object" || Array.isArray(node)) continue;
          if (node.id === id) {
            found = true;
            if (enabled) delete node.enabled;
            else node.enabled = false;
            continue;
          }
          if (Array.isArray(node.insert)) walk(node.insert);
        }
      };
      walk(doc);
      if (!found) throw new Error(`mcp-inventory: MCP server "${id}" not found`);
      await atomicWrite(path, yaml.dump(doc, { schema: patchSchema }));
      const entries = collectMcpEntries(doc);
      return { ok: true, id, enabled, path, entries };
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
