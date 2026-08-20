window.__ModuleLoader__.load({
	id: "@wanghailong0419/dsh-mcp-manager",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region mcpInventory remote descriptor (inlined; the host package is not a client module)
		const mcpInventoryRemote = {
			package: "@wanghailong0419/dsh-mcp-manager",
			descriptors: [
				{
					id: "@wanghailong0419/dsh-mcp-manager#mcpInventory/list",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "list",
					invocation: { kind: "direct" },
					parameters: [],
					result: {
						mode: "strict",
						typeSymbol: "@wanghailong0419/dsh-mcp-manager#McpInventorySnapshot",
						schema: z_object({ path: z_string(), entries: z_array(z_object({ id: z_string(), name: z_string(), config: z_record(), enabled: z_boolean() })) })
					}
				},
				{
					id: "@wanghailong0419/dsh-mcp-manager#mcpInventory/add",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "add",
					invocation: { kind: "direct" },
					parameters: [{ name: "spec", wire: "spec", source: "json", codec: { mode: "strict", typeSymbol: "@wanghailong0419/dsh-mcp-manager#McpAddSpec", schema: z_object({ serverName: z_string(), name: z_string_optional(), config: z_record_optional() }) } }],
					result: {
						mode: "strict",
						typeSymbol: "@wanghailong0419/dsh-mcp-manager#McpMutationResult",
						schema: z_object({ ok: z_boolean(), id: z_string(), path: z_string(), entries: z_array(z_object({ id: z_string(), name: z_string(), config: z_record(), enabled: z_boolean() })) })
					}
				},
				{
					id: "@wanghailong0419/dsh-mcp-manager#mcpInventory/update",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "update",
					invocation: { kind: "direct" },
					parameters: [{ name: "spec", wire: "spec", source: "json", codec: { mode: "strict", typeSymbol: "@wanghailong0419/dsh-mcp-manager#McpUpdateSpec", schema: z_object({ id: z_string(), serverName: z_string_optional(), name: z_string_optional(), config: z_record_optional() }) } }],
					result: {
						mode: "strict",
						typeSymbol: "@wanghailong0419/dsh-mcp-manager#McpMutationResult",
						schema: z_object({ ok: z_boolean(), id: z_string(), path: z_string(), entries: z_array(z_object({ id: z_string(), name: z_string(), config: z_record(), enabled: z_boolean() })) })
					}
				},
				{
					id: "@wanghailong0419/dsh-mcp-manager#mcpInventory/removeServer",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "removeServer",
					invocation: { kind: "direct" },
					parameters: [{ name: "id", wire: "id", source: "json", codec: { mode: "strict", typeSymbol: "string", schema: z_string() } }],
					result: {
						mode: "strict",
						typeSymbol: "@wanghailong0419/dsh-mcp-manager#McpMutationResult",
						schema: z_object({ ok: z_boolean(), id: z_string(), path: z_string(), entries: z_array(z_object({ id: z_string(), name: z_string(), config: z_record(), enabled: z_boolean() })) })
					}
				},
				{
					id: "@wanghailong0419/dsh-mcp-manager#mcpInventory/test",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "test",
					invocation: { kind: "direct" },
					parameters: [{ name: "id", wire: "id", source: "json", codec: { mode: "strict", typeSymbol: "string", schema: z_string() } }],
					result: {
						mode: "strict",
						typeSymbol: "@wanghailong0419/dsh-mcp-manager#McpTestResult",
						schema: z_object({ ok: z_boolean(), id: z_string(), toolCount: z_number(), latencyMs: z_number(), message: z_string() })
					}
				},
				{
					id: "@wanghailong0419/dsh-mcp-manager#mcpInventory/setEnabled",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "setEnabled",
					invocation: { kind: "direct" },
					parameters: [{ name: "spec", wire: "spec", source: "json", codec: { mode: "strict", typeSymbol: "@wanghailong0419/dsh-mcp-manager#McpSetEnabledSpec", schema: z_object({ id: z_string(), enabled: z_boolean() }) } }],
					result: {
						mode: "strict",
						typeSymbol: "@wanghailong0419/dsh-mcp-manager#McpSetEnabledResult",
						schema: z_object({ ok: z_boolean(), id: z_string(), enabled: z_boolean(), path: z_string(), entries: z_array(z_object({ id: z_string(), name: z_string(), config: z_record(), enabled: z_boolean() })) })
					}
				}
			]
		};
		// Minimal zod-like builders for the strict codecs above (schemastery/zod not guaranteed in the browser table).
		function z_number() { return { mode: "strict", parse: (v) => { if (typeof v !== "number") throw new Error("expected number"); return v; } }; }
		function z_string() { return { mode: "strict", parse: (v) => { if (typeof v !== "string") throw new Error("expected string"); return v; } }; }
		function z_boolean() { return { mode: "strict", parse: (v) => { if (typeof v !== "boolean") throw new Error("expected boolean"); return v; } }; }
		function z_string_optional() { return { mode: "strict", parse: (v) => v === void 0 ? void 0 : (typeof v === "string" ? v : (() => { throw new Error("expected string"); })()) }; }
		function z_record() { return { mode: "strict", parse: (v) => { if (v === null || typeof v !== "object" || Array.isArray(v)) throw new Error("expected object"); return v; } }; }
		function z_record_optional() { return { mode: "strict", parse: (v) => v === void 0 ? void 0 : (v !== null && typeof v === "object" && !Array.isArray(v) ? v : (() => { throw new Error("expected object"); })()) }; }
		function z_object(schema) { return { mode: "strict", parse: (v) => { if (v === null || typeof v !== "object") throw new Error("expected object"); const out = {}; for (const [k, s] of Object.entries(schema)) { if (v[k] === void 0 && !(k in v)) continue; out[k] = s.parse(v[k]); } return out; } }; }
		function z_array(item) { return { mode: "strict", parse: (v) => { if (!Array.isArray(v)) throw new Error("expected array"); return v.map((x) => item.parse(x)); } }; }
		//#endregion
		//#region css
		const css = ".dshmcp_section{width:100%;max-width:760px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:14px;display:flex}.dshmcp_heading h3,.dshmcp_status,.dshmcp_failure p{margin:0}.dshmcp_status,.dshmcp_failure{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px}.dshmcp_failure{color:var(--dsw-alias-state-error-primary);align-items:center;gap:10px;display:flex}.dshmcp_failure button,.dshmcp_add,.dshmcp_toggle,.dshmcp_actions button{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:4px 10px}.dshmcp_catalog{flex-direction:column;gap:12px;display:flex}.dshmcp_heading{align-items:baseline;gap:7px;padding:0 2px;display:flex}.dshmcp_heading h3{font-size:13px;font-weight:600;line-height:20px}.dshmcp_heading span{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;font-size:12px;line-height:18px}.dshmcp_notice{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);margin:0;min-height:18px}.dshmcp_list{margin:0;padding:0;list-style:none;flex-direction:column;gap:8px;display:flex}.dshmcp_row{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:10px;align-items:center;gap:10px;padding:10px 14px;flex-wrap:wrap;display:flex}.dshmcp_row[data-open=true]{opacity:1}.dshmcp_main{flex:1;min-width:0;align-items:center;gap:10px;cursor:pointer;display:flex}.dshmcp_dot{width:8px;height:8px;border-radius:50%;flex:none;display:inline-block}.dshmcp_dot[data-phase=active]{background:var(--dsw-alias-state-success-primary)}.dshmcp_dot[data-phase=loading]{background:var(--dsw-alias-state-warning-primary)}.dshmcp_dot[data-phase=failed]{background:var(--dsw-alias-state-error-primary)}.dshmcp_dot[data-phase=pending]{background:var(--dsw-alias-label-tertiary)}.dshmcp_info{flex:1;min-width:0;flex-direction:column;gap:2px;display:flex}.dshmcp_name{font-size:13px;font-weight:600;line-height:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dshmcp_desc{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dshmcp_statusTag{font-size:11px;line-height:16px;border-radius:999px;padding:1px 8px;flex:none}.dshmcp_statusTag[data-status=ok]{background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 14%,transparent);color:var(--dsw-alias-state-success-primary)}.dshmcp_statusTag[data-status=bad]{background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 14%,transparent);color:var(--dsw-alias-state-error-primary)}.dshmcp_statusTag[data-status=unknown]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary)}.dshmcp_toggle{border-radius:999px;padding:4px 14px;font-size:12px;line-height:18px;flex:none}.dshmcp_toggle[data-enabled=true]{border-color:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-state-success-primary)}.dshmcp_toggle[data-enabled=false]{border-color:var(--dsw-alias-label-tertiary);color:var(--dsw-alias-label-tertiary)}.dshmcp_toggle:disabled{opacity:.6;cursor:default}.dshmcp_add{border:1px dashed var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;background:0 0;border-radius:8px;padding:7px 12px;align-self:flex-start}.dshmcp_add:hover{border-color:var(--dsw-alias-border-accent-strong)}.dshmcp_expanded{flex-direction:column;gap:8px;padding-top:10px;border-top:1px solid var(--dsw-alias-border-l2);flex-basis:100%;width:100%;display:flex}.dshmcp_expandedBody{flex-direction:column;gap:8px;display:flex}.dshmcp_fieldLabel{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}.dshmcp_value{font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:6px 10px;white-space:pre-wrap;word-break:break-word}.dshmcp_value:hover{cursor:pointer;border-color:var(--dsw-alias-border-accent-strong)}.dshmcp_content{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;height:260px;overflow:auto;box-sizing:border-box;margin:0;padding:8px 10px}.dshmcp_content:hover{cursor:pointer;border-color:var(--dsw-alias-border-accent-strong)}.dshmcp_editor{font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-word;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;min-height:260px;resize:vertical;width:100%;box-sizing:border-box;padding:8px 10px}.dshmcp_editor:focus{outline:none;border-color:var(--dsw-alias-border-accent-strong)}.dshmcp_nameInput{font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:6px 10px;width:100%;box-sizing:border-box}.dshmcp_nameInput:focus{outline:none;border-color:var(--dsw-alias-border-accent-strong)}.dshmcp_actions{align-items:center;gap:8px;display:flex}.dshmcp_actions button[data-danger=true]{color:var(--dsw-alias-state-error-primary);border-color:var(--dsw-alias-state-error-primary)}.dshmcp_actions button[data-primary=true]{border-color:var(--dsw-alias-border-accent-strong)}.dshmcp_actions button[disabled]{cursor:default;opacity:.55}.dshmcp_testResult{font-size:12px;line-height:18px;margin:0;word-break:break-all;overflow-wrap:anywhere}.dshmcp_testResult[data-status=ok]{color:var(--dsw-alias-state-success-primary)}.dshmcp_testResult[data-status=bad]{color:var(--dsw-alias-state-error-primary)}.dshmcp_form{flex-direction:column;gap:8px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:10px;padding:12px 14px;display:flex}.dshmcp_form label{font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary)}.dshmcp_form input,.dshmcp_form textarea{font:inherit;font-size:12px;line-height:18px;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;padding:6px 8px}.dshmcp_form input:focus,.dshmcp_form textarea:focus{outline:none;border-color:var(--dsw-alias-border-accent-strong)}.dshmcp_form textarea{min-height:140px;resize:vertical;white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.dshmcp_formRow{align-items:center;gap:8px;display:flex}.dshmcp_formRow button{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:4px 10px}.dshmcp_formRow button[data-primary=true]{border-color:var(--dsw-alias-border-accent-strong)}.dshmcp_formRow button[disabled]{cursor:default;opacity:.55}.dshmcp_formError{color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:18px;margin:0}";
		const tagId = "@wanghailong0419/dsh-mcp-manager/McpSection.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@wanghailong0419/dsh-mcp-manager";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const McpSection_module_css_default = {
			"section": "dshmcp_section",
			"failure": "dshmcp_failure",
			"status": "dshmcp_status",
			"heading": "dshmcp_heading",
			"catalog": "dshmcp_catalog",
			"notice": "dshmcp_notice",
			"list": "dshmcp_list",
			"row": "dshmcp_row",
			"main": "dshmcp_main",
			"dot": "dshmcp_dot",
			"info": "dshmcp_info",
			"name": "dshmcp_name",
			"desc": "dshmcp_desc",
			"statusTag": "dshmcp_statusTag",
			"toggle": "dshmcp_toggle",
			"add": "dshmcp_add",
			"expanded": "dshmcp_expanded",
			"expandedBody": "dshmcp_expandedBody",
			"fieldLabel": "dshmcp_fieldLabel",
			"value": "dshmcp_value",
			"content": "dshmcp_content",
			"editor": "dshmcp_editor",
			"nameInput": "dshmcp_nameInput",
			"actions": "dshmcp_actions",
			"testResult": "dshmcp_testResult",
			"form": "dshmcp_form",
			"formRow": "dshmcp_formRow",
			"formError": "dshmcp_formError"
		};
		//#endregion
		//#region module-level cache
		/**
		* Module-level MCP status cache: survives section unmount/remount, so
		* switching away and back shows the previous state immediately (stale
		* while revalidate) instead of flashing empty or rolling back. Keyed by
		* server id; each entry carries a timestamp for debouncing handshakes.
		*/
		const mcpStatusCache = /* @__PURE__ */ new Map();
		const CACHE_TTL_MS = 30000;
		const PROBE_DEBOUNCE_MS = 8000;
		/** Read a cached probe result for one server id, if still fresh. */
		function readCachedStatus(id) {
			const cached = mcpStatusCache.get(id);
			if (cached === void 0) return void 0;
			if (Date.now() - cached.at > CACHE_TTL_MS) {
				mcpStatusCache.delete(id);
				return void 0;
			}
			return cached;
		}
		/** Write a probe result into the module cache. */
		function writeCachedStatus(id, result) {
			mcpStatusCache.set(id, { ...result, at: Date.now() });
		}
		/** Whether a fresh handshake was run for this id within the debounce window. */
		function probeDebounced(id) {
			const cached = mcpStatusCache.get(id);
			return cached !== void 0 && Date.now() - cached.at < PROBE_DEBOUNCE_MS;
		}
		//#endregion
		//#region McpSection
		const PHASE_KEYS = {
			pending: "pending",
			loading: "loadingPhase",
			active: "active",
			failed: "failed",
			unloading: "unloading"
		};
		function phaseLabel(phase, t) {
			return phase === null ? t("unobserved") : t(PHASE_KEYS[phase]);
		}
		/** MCP entry ids are `mcp-<serverName>`; strip the prefix for display. */
		function mcpServerName(id) {
			return id.startsWith("mcp-") ? id.slice(4) : id;
		}
		/** Only real MCP server entries are manageable; the manager itself is excluded. */
		function isMcpEntry(entry) {
			if (entry.name === "@wanghailong0419/dsh-mcp-manager") return false;
			return (entry.id !== void 0 && entry.id.startsWith("mcp-")) || entry.name === "@deepseek-ai/dsh-mcp-client";
		}
		/** Pretty-print a config object as JSON text for the editor. */
		function configToText(config) {
			if (config === void 0 || config === null) return "";
			return JSON.stringify(config, null, 2);
		}
		/** Parse editor text back into an object. */
		function textToConfig(text) {
			const trimmed = text.trim();
			if (trimmed.length === 0) return {};
			try {
				const value = JSON.parse(trimmed);
				if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error("config must be an object");
				return value;
			} catch (cause) {
				throw new Error(`${cause.message}`);
			}
		}
		/** Render the MCP server catalog section with list/expand/edit/create/remove. */
		function McpSection({ list, add, update, remove, test, setEnabled, t }) {
			const catalogId = (0, react.useId)();
			const [request, setRequest] = (0, react.useState)(0);
			const [expanded, setExpanded] = (0, react.useState)(null);
			// editing: { id, serverName, moduleName, configText } or null
			const [editing, setEditing] = (0, react.useState)(null);
			// adding: boolean; newServerName / newModuleName / newConfigText for the create form
			const [adding, setAdding] = (0, react.useState)(false);
			const [newServerName, setNewServerName] = (0, react.useState)("");
			const [newModuleName, setNewModuleName] = (0, react.useState)("@deepseek-ai/dsh-mcp-client");
			const [newConfigText, setNewConfigText] = (0, react.useState)("");
			const [busy, setBusy] = (0, react.useState)(null);
			const [notice, setNotice] = (0, react.useState)(null);
			const [testing, setTesting] = (0, react.useState)(null);
			const [testResult, setTestResult] = (0, react.useState)(null);
			const listRef = (0, react.useRef)(list);
			listRef.current = list;
			const testRef = (0, react.useRef)(test);
			testRef.current = test;
			const setEnabledRef = (0, react.useRef)(setEnabled);
			setEnabledRef.current = setEnabled;
			const [state, setState] = (0, react.useState)(() => {
				const cached = mcpStatusCache.get("__snapshot__");
				return cached !== void 0 ? { status: "ready", snapshot: cached } : { status: "loading" };
			});
			(0, react.useEffect)(() => {
				let current = true;
				Promise.resolve().then(() => listRef.current()).then((snapshot) => {
					if (!current) return;
					const merged = {
						...snapshot,
						entries: snapshot.entries.map((entry) => {
							if (entry.id === void 0 || !entry.id.startsWith("mcp-") || entry.name === "@wanghailong0419/dsh-mcp-manager") return entry;
							const cached = readCachedStatus(entry.id);
							if (cached === void 0) return entry;
							return {
								...entry,
								toolCount: cached.toolCount ?? entry.toolCount ?? 0,
								connected: cached.ok === true || entry.connected === true || (entry.toolCount ?? 0) > 0
							};
						})
					};
					mcpStatusCache.set("__snapshot__", merged);
					setState({ status: "ready", snapshot: merged });
					const offline = merged.entries.filter((e) => e.id !== void 0 && e.id.startsWith("mcp-") && e.name !== "@wanghailong0419/dsh-mcp-manager" && !(e.connected === true || (e.toolCount ?? 0) > 0));
					for (const entry of offline) {
						if (probeDebounced(entry.id)) continue;
						Promise.resolve().then(() => testRef.current(entry.id)).then((result) => {
							if (!current || result === void 0) return;
							writeCachedStatus(entry.id, result);
							setState((prev) => prev.status === "ready" ? {
								...prev,
								snapshot: {
									...prev.snapshot,
									entries: prev.snapshot.entries.map((item) => item.id === entry.id ? {
										...item,
										toolCount: result.toolCount ?? 0,
										connected: result.ok === true
									} : item)
								}
							} : prev);
						}, () => { /* probe failure keeps the reported state */ });
					}
				}, () => {
					if (!current) return;
					if (mcpStatusCache.get("__snapshot__") === void 0) setState({ status: "error" });
				});
				return () => { current = false; };
			}, [request]);
			const retry = () => {
				setState({ status: "loading" });
				setRequest((value) => value + 1);
			};
			const entries = state.status === "ready" ? state.snapshot.entries.filter(isMcpEntry).map((entry) => ({
				entryId: entry.id,
				id: entry.id,
				moduleName: entry.name ?? "@deepseek-ai/dsh-mcp-client",
				name: entry.name ?? "@deepseek-ai/dsh-mcp-client",
				config: entry.config ?? {},
				toolCount: entry.toolCount ?? 0,
				connected: entry.connected === true || (entry.toolCount ?? 0) > 0,
				enabled: entry.enabled !== false,
				fiberPhase: entry.connected === true || (entry.toolCount ?? 0) > 0 ? "active" : "failed"
			})) : [];
			(0, react.useEffect)(() => {
				if (expanded !== null && !entries.some((entry) => entry.entryId === expanded.id)) setExpanded(null);
			}, [expanded, entries]);
			/** Apply a snapshot patch from a mutation result (add/update/remove).
			 * Mutation entries carry { id, name, config, enabled } only, so merge
			 * them over the previous snapshot to preserve runtime fields
			 * (toolCount/connected) that the inventory service does not report. */
			const patchSnapshot = (mutation) => {
				if (mutation === void 0 || mutation.entries === void 0) return;
				const prevEntries = state.status === "ready" ? state.snapshot.entries : [];
				const merged = mutation.entries.map((incoming) => {
					const prev = prevEntries.find((e) => e.id === incoming.id);
					return prev === void 0 ? incoming : { ...prev, ...incoming };
				});
				const path = mutation.path ?? (state.status === "ready" ? state.snapshot.path : "");
				const snapshot = { path, entries: merged };
				mcpStatusCache.set("__snapshot__", snapshot);
				setState({ status: "ready", snapshot });
			};
			const handleSaveEdit = async () => {
				if (editing === null) return;
				const serverName = editing.serverName.trim();
				if (!serverName) {
					setNotice(t("serverNameRequired"));
					return;
				}
				let config;
				try {
					config = textToConfig(editing.configText);
				} catch (cause) {
					setNotice(`${t("configInvalid")}: ${cause.message}`);
					return;
				}
				setBusy(editing.id);
				setNotice(null);
				try {
					const result = await update({
						id: editing.id,
						serverName: serverName === mcpServerName(editing.id) ? void 0 : serverName,
						name: editing.moduleName.trim() || "@deepseek-ai/dsh-mcp-client",
						config
					});
					if (!result.ok) throw new Error(result.error?.message ?? "update failed");
					setNotice(t("updated"));
					patchSnapshot(result);
					setEditing(null);
					setExpanded({ id: result.id ?? editing.id, status: "ready" });
				} catch (cause) {
					setNotice(cause instanceof Error ? cause.message : String(cause));
				} finally {
					setBusy(null);
				}
			};
			const handleCreate = async () => {
				const serverName = newServerName.trim();
				if (!serverName) {
					setNotice(t("serverNameRequired"));
					return;
				}
				let config;
				try {
					config = textToConfig(newConfigText);
				} catch (cause) {
					setNotice(`${t("configInvalid")}: ${cause.message}`);
					return;
				}
				setBusy("__create__");
				setNotice(null);
				try {
					const result = await add({ serverName, name: newModuleName.trim() || "@deepseek-ai/dsh-mcp-client", config });
					if (!result.ok) throw new Error(result.error?.message ?? "create failed");
					setNotice(t("added"));
					patchSnapshot(result);
					setAdding(false);
					setNewServerName("");
					setNewModuleName("@deepseek-ai/dsh-mcp-client");
					setNewConfigText("");
				} catch (cause) {
					setNotice(cause instanceof Error ? cause.message : String(cause));
				} finally {
					setBusy(null);
				}
			};
			const handleRemove = async (entry) => {
				if (!window.confirm(`${t("removeConfirm")} ${mcpServerName(entry.entryId)}?`)) return;
				setBusy(entry.entryId);
				setNotice(null);
				try {
					const result = await remove(entry.entryId);
					if (!result.ok) throw new Error(result.error?.message ?? "remove failed");
					setNotice(t("removed"));
					patchSnapshot(result);
					setExpanded(null);
					setEditing(null);
				} catch (cause) {
					setNotice(cause instanceof Error ? cause.message : String(cause));
				} finally {
					setBusy(null);
				}
			};
			const handleToggle = async (entry, enabled) => {
				setBusy(entry.entryId);
				setNotice(null);
				try {
					const result = await setEnabledRef.current({ id: entry.entryId, enabled });
					if (!result.ok) throw new Error(result.error?.message ?? "toggle failed");
					setNotice(t(enabled ? "enabledNotice" : "disabledNotice"));
					patchSnapshot(result);
				} catch (cause) {
					setNotice(cause instanceof Error ? cause.message : String(cause));
				} finally {
					setBusy(null);
				}
			};
			const handleTest = async (id) => {
				setTesting(id);
				setTestResult(null);
				try {
					const result = await test(id);
					writeCachedStatus(id, result);
					setTestResult({ id, ...result });
					if (state.status === "ready") {
						setState((prev) => prev.status === "ready" ? {
							...prev,
							snapshot: {
								...prev.snapshot,
								entries: prev.snapshot.entries.map((entry) => entry.id === id ? {
									...entry,
									toolCount: result.toolCount ?? entry.toolCount ?? 0,
									connected: result.ok === true
								} : entry)
							}
						} : prev);
					}
				} catch (cause) {
					const failure = { ok: false, message: cause instanceof Error ? cause.message : String(cause), toolCount: 0, latencyMs: 0 };
					writeCachedStatus(id, failure);
					setTestResult({ id, ...failure });
				} finally {
					setTesting(null);
				}
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: McpSection_module_css_default.section,
				"aria-busy": state.status === "loading" || busy !== null,
				children: [
					state.status === "loading" ? (0, react_jsx_runtime.jsx)("p", {
						className: McpSection_module_css_default.status,
						children: t("loading")
					}) : null,
					state.status === "error" ? (0, react_jsx_runtime.jsxs)("div", {
						className: McpSection_module_css_default.failure,
						children: [(0, react_jsx_runtime.jsx)("p", {
							role: "alert",
							children: t("error")
						}), (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: retry,
							children: t("retry")
						})]
					}) : null,
					state.status === "ready" ? (0, react_jsx_runtime.jsxs)("div", {
						className: McpSection_module_css_default.catalog,
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: McpSection_module_css_default.heading,
								children: [(0, react_jsx_runtime.jsx)("h3", { children: t("catalog") }), (0, react_jsx_runtime.jsx)("span", {
									"data-mcp-count": entries.length,
									children: entries.length
								})]
							}),
							(0, react_jsx_runtime.jsx)("p", {
								className: McpSection_module_css_default.notice,
								role: "status",
								"aria-hidden": notice === null ? "true" : "false",
								children: notice ?? "\u00a0"
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: McpSection_module_css_default.add,
								disabled: busy !== null,
								onClick: () => { setAdding(!adding); setEditing(null); setNotice(null); },
								children: adding ? t("cancel") : t("add")
							}),
							adding ? (0, react_jsx_runtime.jsxs)("div", {
								className: McpSection_module_css_default.form,
								children: [(0, react_jsx_runtime.jsx)("label", {
									children: t("serverName")
								}), (0, react_jsx_runtime.jsx)("input", {
									type: "text",
									value: newServerName,
									placeholder: "sequential-thinking",
									disabled: busy !== null,
									onChange: (event) => setNewServerName(event.target.value)
								}), (0, react_jsx_runtime.jsx)("label", {
									children: t("module")
								}), (0, react_jsx_runtime.jsx)("input", {
									type: "text",
									value: newModuleName,
									disabled: busy !== null,
									onChange: (event) => setNewModuleName(event.target.value)
								}), (0, react_jsx_runtime.jsx)("label", {
									children: t("config")
								}), (0, react_jsx_runtime.jsx)("textarea", {
									value: newConfigText,
									spellCheck: false,
									placeholder: '{\n  "transport": "stdio",\n  "command": "npx",\n  "args": ["-y", "@modelcontextprotocol/server-xxx"],\n  "env": {}\n}',
									disabled: busy !== null,
									onChange: (event) => setNewConfigText(event.target.value)
								}), (0, react_jsx_runtime.jsxs)("div", {
									className: McpSection_module_css_default.formRow,
									children: [(0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"data-primary": "true",
										disabled: busy !== null,
										onClick: handleCreate,
										children: busy === "__create__" ? t("saving") : t("save")
									}), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										disabled: busy !== null,
										onClick: () => { setAdding(false); setNotice(null); },
										children: t("cancel")
									})]
								})]
							}) : null,
							entries.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
								className: McpSection_module_css_default.status,
								children: t("empty")
							}) : null,
							(0, react_jsx_runtime.jsx)("ul", {
								className: McpSection_module_css_default.list,
								children: entries.map((entry) => {
									const title = mcpServerName(entry.entryId);
									const open = expanded !== null && expanded.id === entry.entryId;
									const detailId = `${catalogId}-details-${encodeURIComponent(entry.entryId)}`;
									const statusKey = entry.connected ? "ok" : (entry.fiberPhase === "failed" ? "bad" : "unknown");
									return (0, react_jsx_runtime.jsxs)("li", {
										className: McpSection_module_css_default.row,
										"data-mcp-entry": entry.entryId,
										"data-open": open ? "true" : "false",
										onClick: () => setExpanded((current) => current !== null && current.id === entry.entryId ? null : { id: entry.entryId, status: "ready" }),
										children: [
											(0, react_jsx_runtime.jsxs)("div", {
												className: McpSection_module_css_default.main,
												role: "button",
												tabIndex: 0,
												"aria-expanded": open,
												"aria-controls": detailId,
												onKeyDown: (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setExpanded((current) => current !== null && current.id === entry.entryId ? null : { id: entry.entryId, status: "ready" }); } },
												children: [(0, react_jsx_runtime.jsx)("span", {
													className: McpSection_module_css_default.dot,
													"data-phase": entry.fiberPhase ?? "pending",
													role: "img",
													"aria-label": phaseLabel(entry.fiberPhase, t),
													title: phaseLabel(entry.fiberPhase, t)
												}), (0, react_jsx_runtime.jsxs)("div", {
													className: McpSection_module_css_default.info,
													children: [(0, react_jsx_runtime.jsx)("strong", {
														className: McpSection_module_css_default.name,
														children: title
													}), (0, react_jsx_runtime.jsx)("span", {
														className: McpSection_module_css_default.desc,
														children: entry.moduleName
													})]
												}), (0, react_jsx_runtime.jsx)("span", {
													className: McpSection_module_css_default.statusTag,
													"data-status": statusKey,
													children: entry.connected ? `${entry.toolCount ?? 0} ${t("tools")}` : t("offline")
												})]
											}),
											(0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: McpSection_module_css_default.toggle,
												"data-enabled": entry.enabled ? "true" : "false",
												role: "switch",
												"aria-checked": entry.enabled,
												disabled: busy === entry.entryId,
												onClick: (event) => { event.stopPropagation(); handleToggle(entry, !entry.enabled); },
												children: busy === entry.entryId ? t("saving") : (entry.enabled ? t("enabledTag") : t("disabledTag"))
											}),
											open ? (0, react_jsx_runtime.jsxs)("div", {
												className: McpSection_module_css_default.expanded,
												id: detailId,
												onClick: () => setExpanded(null),
												children: [
													editing !== null && editing.id === entry.entryId ? (0, react_jsx_runtime.jsxs)("div", {
														className: McpSection_module_css_default.expandedBody,
														onClick: () => setExpanded(null),
														children: [(0, react_jsx_runtime.jsx)("label", {
															className: McpSection_module_css_default.fieldLabel,
															children: t("serverName")
														}), (0, react_jsx_runtime.jsx)("input", {
															className: McpSection_module_css_default.nameInput,
															type: "text",
															value: editing.serverName,
															disabled: busy !== null,
															onClick: (event) => event.stopPropagation(),
															onChange: (event) => setEditing({ ...editing, serverName: event.target.value })
														}), (0, react_jsx_runtime.jsx)("label", {
															className: McpSection_module_css_default.fieldLabel,
															children: t("module")
														}), (0, react_jsx_runtime.jsx)("input", {
															className: McpSection_module_css_default.nameInput,
															type: "text",
															value: editing.moduleName,
															disabled: busy !== null,
															onClick: (event) => event.stopPropagation(),
															onChange: (event) => setEditing({ ...editing, moduleName: event.target.value })
														}), (0, react_jsx_runtime.jsx)("label", {
															className: McpSection_module_css_default.fieldLabel,
															children: t("config")
														}), (0, react_jsx_runtime.jsx)("textarea", {
															className: McpSection_module_css_default.editor,
															value: editing.configText,
															spellCheck: false,
															disabled: busy !== null,
															onClick: (event) => event.stopPropagation(),
															onChange: (event) => setEditing({ ...editing, configText: event.target.value })
														}), (0, react_jsx_runtime.jsxs)("div", {
															className: McpSection_module_css_default.actions,
															onClick: (event) => event.stopPropagation(),
															children: [(0, react_jsx_runtime.jsx)("button", {
																type: "button",
																"data-primary": "true",
																disabled: busy !== null,
																onClick: handleSaveEdit,
																children: busy === entry.entryId ? t("saving") : t("save")
															}), (0, react_jsx_runtime.jsx)("button", {
																type: "button",
																disabled: busy !== null,
																onClick: () => setEditing(null),
																children: t("cancel")
															})]
														})]
													}) : (0, react_jsx_runtime.jsxs)("div", {
														className: McpSection_module_css_default.expandedBody,
														onClick: () => setExpanded(null),
														children: [(0, react_jsx_runtime.jsx)("label", {
															className: McpSection_module_css_default.fieldLabel,
															children: t("serverName")
														}), (0, react_jsx_runtime.jsx)("div", {
															className: McpSection_module_css_default.value,
															onClick: (event) => { event.stopPropagation(); setEditing({ id: entry.entryId, serverName: title, moduleName: entry.moduleName, configText: configToText(entry.config) }); },
															children: title
														}), (0, react_jsx_runtime.jsx)("label", {
															className: McpSection_module_css_default.fieldLabel,
															children: t("module")
														}), (0, react_jsx_runtime.jsx)("div", {
															className: McpSection_module_css_default.value,
															onClick: (event) => { event.stopPropagation(); setEditing({ id: entry.entryId, serverName: title, moduleName: entry.moduleName, configText: configToText(entry.config) }); },
															children: entry.moduleName
														}), (0, react_jsx_runtime.jsx)("label", {
															className: McpSection_module_css_default.fieldLabel,
															children: t("config")
														}), (0, react_jsx_runtime.jsx)("pre", {
															className: McpSection_module_css_default.content,
															onClick: (event) => { event.stopPropagation(); setEditing({ id: entry.entryId, serverName: title, moduleName: entry.moduleName, configText: configToText(entry.config) }); },
															children: configToText(entry.config)
														}), testResult !== null && testResult.id === entry.entryId ? (0, react_jsx_runtime.jsx)("p", {
															className: McpSection_module_css_default.testResult,
															"data-status": testResult.ok ? "ok" : "bad",
															role: "status",
															children: testResult.ok
																? `${t("testOk")} ${testResult.toolCount} ${t("tools")} · ${testResult.latencyMs}ms`
																: `${t("testFail")}: ${testResult.message}`
														}) : null, (0, react_jsx_runtime.jsxs)("div", {
															className: McpSection_module_css_default.actions,
															onClick: (event) => event.stopPropagation(),
															children: [(0, react_jsx_runtime.jsx)("button", {
																type: "button",
																disabled: testing !== null,
																onClick: () => handleTest(entry.entryId),
																children: testing === entry.entryId ? t("testing") : t("test")
															}), (0, react_jsx_runtime.jsx)("button", {
																type: "button",
																disabled: busy !== null,
																onClick: () => setEditing({ id: entry.entryId, serverName: title, moduleName: entry.moduleName, configText: configToText(entry.config) }),
																children: t("edit")
															}), (0, react_jsx_runtime.jsx)("button", {
																type: "button",
																"data-danger": "true",
																disabled: busy !== null,
																onClick: () => handleRemove(entry),
																children: t("remove")
															})]
														})]
													})
												]
											}) : null
										]
									}, entry.entryId);
								})
							})
						]
					}) : null
				]
			});
		}
		//#endregion
		//#region locales
		const zh = {
			nav: "mcp管理",
			loading: "正在读取 MCP 服务器…",
			error: "暂时无法读取 MCP 服务器。",
			retry: "重试",
			catalog: "MCP 服务器",
			empty: "未配置 MCP 服务器。",
			add: "新增",
			serverName: "Server 名称",
			serverNameRequired: "Server 名称不能为空。",
			module: "模块",
			config: "配置 (JSON)",
			configInvalid: "配置不是合法的 JSON 对象",
			save: "保存",
			saving: "保存中…",
			cancel: "取消",
			edit: "编辑",
			remove: "删除",
			removeConfirm: "确定删除",
			removing: "删除中…",
			added: "已新增，重启 dsh web 后生效。",
			updated: "已更新，重启 dsh web 后生效。",
			removed: "已删除，重启 dsh web 后生效。",
			tools: "个工具",
			offline: "未连接",
			test: "测试连接",
			testing: "测试中…",
			testOk: "连接正常：",
			testFail: "连接失败",
			enabledTag: "已启用",
			disabledTag: "已停用",
			enabledNotice: "已启用，重启 dsh web 后生效。",
			disabledNotice: "已停用，重启 dsh web 后生效。",
			unobserved: "未挂载",
			pending: "等待依赖",
			loadingPhase: "加载中",
			active: "已挂载",
			failed: "挂载失败",
			unloading: "卸载中"
		};
		const en = {
			nav: "MCP Manager",
			loading: "Reading MCP servers…",
			error: "MCP servers are temporarily unavailable.",
			retry: "Retry",
			catalog: "MCP servers",
			empty: "No MCP servers are configured.",
			add: "Add",
			serverName: "Server name",
			serverNameRequired: "Server name is required.",
			module: "Module",
			config: "Configuration (JSON)",
			configInvalid: "Configuration is not a valid JSON object",
			save: "Save",
			saving: "Saving…",
			cancel: "Cancel",
			edit: "Edit",
			remove: "Remove",
			removeConfirm: "Remove",
			removing: "Removing…",
			added: "Added. Restart dsh web to apply.",
			updated: "Updated. Restart dsh web to apply.",
			removed: "Removed. Restart dsh web to apply.",
			tools: "tools",
			offline: "offline",
			test: "Test",
			testing: "Testing…",
			testOk: "Reachable:",
			testFail: "Failed",
			enabledTag: "Enabled",
			disabledTag: "Disabled",
			enabledNotice: "Enabled. Restart dsh web to apply.",
			disabledNotice: "Disabled. Restart dsh web to apply.",
			unobserved: "Not mounted",
			pending: "Waiting for dependencies",
			loadingPhase: "Loading",
			active: "Mounted",
			failed: "Mount failed",
			unloading: "Unloading"
		};
		//#endregion
		//#region apply
		const NS = "settings.mcp";
		// NOTE: remote.mcpInventory is intentionally NOT in this inject list —
		// this plugin itself mounts that Remote contribution in apply(), and
		// Cordis waits for injected services to exist before activating a
		// plugin, so declaring it here would deadlock (apply would wait for a
		// service only apply can create). We mount first, then register slots.
		const inject = [
			"slots",
			"locale",
			"remote"
		];
		async function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "ui-settings-mcp: dictionaries");
			await ctx.remote.$mount(mcpInventoryRemote);
			const mcp = ctx.get("remote.mcpInventory");
			if (mcp === void 0) throw new Error("ui-settings-mcp: remote.mcpInventory did not mount");
			const t = ctx.locale.bind(NS);
			const call = async (fn, label) => {
				const result = await fn();
				if (!result.ok) throw new Error(`${label}: ${result.error.code}: ${result.error.message}`);
				return result.value;
			};
			const injected = () => ({
				list: () => call(() => mcp.list(), "mcpInventory.list"),
				add: (spec) => call(() => mcp.add(spec), "mcpInventory.add"),
				update: (spec) => call(() => mcp.update(spec), "mcpInventory.update"),
				remove: (id) => call(() => mcp.removeServer(id), "mcpInventory.removeServer"),
				test: (id) => call(() => mcp.test(id), "mcpInventory.test"),
				setEnabled: (spec) => call(() => mcp.setEnabled(spec), "mcpInventory.setEnabled"),
				t
			});
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "mcp",
				order: 20,
				label: () => t("nav"),
				inject: injected
			}, McpSection));
		}
		//#endregion
		exports.NS = NS;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
