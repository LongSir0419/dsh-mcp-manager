window.__ModuleLoader__.load({
	id: "@long/dsh-client-ui-settings-mcp",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region mcpInventory remote descriptor (inlined; the host package is not a client module)
		const mcpInventoryRemote = {
			package: "@long/dsh-mcp-inventory",
			descriptors: [
				{
					id: "@long/dsh-mcp-inventory#mcpInventory/list",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "list",
					invocation: { kind: "direct" },
					parameters: [],
					result: {
						mode: "strict",
						typeSymbol: "@long/dsh-mcp-inventory#McpInventorySnapshot",
						schema: z_object({ path: z_string(), entries: z_array(z_object({ id: z_string(), name: z_string(), config: z_record() })) })
					}
				},
				{
					id: "@long/dsh-mcp-inventory#mcpInventory/add",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "add",
					invocation: { kind: "direct" },
					parameters: [{ name: "spec", wire: "spec", source: "json", codec: { mode: "strict", typeSymbol: "@long/dsh-mcp-inventory#McpAddSpec", schema: z_object({ serverName: z_string(), name: z_string_optional(), config: z_record_optional() }) } }],
					result: {
						mode: "strict",
						typeSymbol: "@long/dsh-mcp-inventory#McpMutationResult",
						schema: z_object({ ok: z_boolean(), id: z_string(), path: z_string(), entries: z_array(z_object({ id: z_string(), name: z_string(), config: z_record() })) })
					}
				},
				{
					id: "@long/dsh-mcp-inventory#mcpInventory/update",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "update",
					invocation: { kind: "direct" },
					parameters: [{ name: "spec", wire: "spec", source: "json", codec: { mode: "strict", typeSymbol: "@long/dsh-mcp-inventory#McpUpdateSpec", schema: z_object({ id: z_string(), name: z_string_optional(), config: z_record_optional() }) } }],
					result: {
						mode: "strict",
						typeSymbol: "@long/dsh-mcp-inventory#McpMutationResult",
						schema: z_object({ ok: z_boolean(), id: z_string(), path: z_string(), entries: z_array(z_object({ id: z_string(), name: z_string(), config: z_record() })) })
					}
				},
				{
					id: "@long/dsh-mcp-inventory#mcpInventory/removeServer",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "removeServer",
					invocation: { kind: "direct" },
					parameters: [{ name: "id", wire: "id", source: "json", codec: { mode: "strict", typeSymbol: "string", schema: z_string() } }],
					result: {
						mode: "strict",
						typeSymbol: "@long/dsh-mcp-inventory#McpMutationResult",
						schema: z_object({ ok: z_boolean(), id: z_string(), path: z_string(), entries: z_array(z_object({ id: z_string(), name: z_string(), config: z_record() })) })
					}
				},
				{
					id: "@long/dsh-mcp-inventory#mcpInventory/test",
					service: "mcpInventory",
					namespace: "mcpInventory",
					method: "test",
					invocation: { kind: "direct" },
					parameters: [{ name: "id", wire: "id", source: "json", codec: { mode: "strict", typeSymbol: "string", schema: z_string() } }],
					result: {
						mode: "strict",
						typeSymbol: "@long/dsh-mcp-inventory#McpTestResult",
						schema: z_object({ ok: z_boolean(), id: z_string(), toolCount: z_number(), latencyMs: z_number(), message: z_string() })
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
		//#region css
		const css = ".dshmcp_section{width:100%;max-width:760px;color:var(--dsw-alias-label-primary);flex-direction:column;gap:14px;display:flex}.dshmcp_heading h3,.dshmcp_status,.dshmcp_failure p{margin:0}.dshmcp_status,.dshmcp_failure{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:20px}.dshmcp_failure{color:var(--dsw-alias-state-error-primary);align-items:center;gap:10px;display:flex}.dshmcp_failure button,.dshmcp_addButton,.dshmcp_primary,.dshmcp_ghost,.dshmcp_danger{border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-primary);font:inherit;cursor:pointer;background:0 0;border-radius:6px;padding:4px 10px}.dshmcp_addButton{margin-left:auto;border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}.dshmcp_primary{background:var(--dsw-alias-state-business-primary);border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-bg-layer-1)}.dshmcp_danger{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary)}.dshmcp_ghost:hover{background:var(--dsw-alias-interactive-bg-hover)}.dshmcp_catalog{flex-direction:column;gap:12px;display:flex}.dshmcp_heading{align-items:baseline;gap:7px;padding:0 2px;display:flex}.dshmcp_heading h3{font-size:13px;font-weight:600;line-height:20px}.dshmcp_heading span{color:var(--dsw-alias-label-tertiary);font-variant-numeric:tabular-nums;font-size:12px;line-height:18px}.dshmcp_cards{grid-template-columns:repeat(2,minmax(0,1fr));align-items:start;gap:10px;margin:0;padding:0;list-style:none;display:grid}.dshmcp_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:10px;min-width:0;overflow:hidden}.dshmcp_card[data-open=true]{border-color:var(--dsw-alias-border-l1);box-shadow:var(--dsw-shadow-lv1)}.dshmcp_cardContent{width:100%;border:0;background:0 0;color:inherit;font:inherit;text-align:left;cursor:pointer;align-items:center;justify-content:space-between;gap:10px;padding:12px 14px;display:flex}.dshmcp_cardTitle{font-size:13px;font-weight:600;line-height:20px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dshmcp_cardTrailing{align-items:center;gap:8px;display:flex;flex:none}.dshmcp_statusDot{width:8px;height:8px;border-radius:50%;display:inline-block}.dshmcp_statusDot[data-phase=active]{background:var(--dsw-alias-state-success-primary)}.dshmcp_statusDot[data-phase=loading]{background:var(--dsw-alias-state-warning-primary)}.dshmcp_statusDot[data-phase=failed]{background:var(--dsw-alias-state-error-primary)}.dshmcp_statusDot[data-phase=pending]{background:var(--dsw-alias-label-tertiary)}.dshmcp_configTag{font-size:11px;line-height:16px;border-radius:999px;padding:1px 8px}.dshmcp_configTag[data-enabled=true]{background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 14%,transparent);color:var(--dsw-alias-state-success-primary)}.dshmcp_configTag[data-enabled=false]{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary)}.dshmcp_configTag[data-status=ok]{background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 14%,transparent);color:var(--dsw-alias-state-success-primary)}.dshmcp_configTag[data-status=bad]{background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 14%,transparent);color:var(--dsw-alias-state-error-primary)}.dshmcp_testResult{font-size:12px;line-height:18px;margin:0;word-break:break-all;overflow-wrap:anywhere}.dshmcp_testResult[data-status=ok]{color:var(--dsw-alias-state-success-primary)}.dshmcp_testResult[data-status=bad]{color:var(--dsw-alias-state-error-primary)}.dshmcp_chevron{color:var(--dsw-alias-label-tertiary);flex:none}.dshmcp_cardDetails{border-top:1px solid var(--dsw-alias-border-l2);flex-direction:column;gap:10px;padding:10px 14px 14px;display:flex}.dshmcp_entryValue{font-size:12px;line-height:18px;background:var(--dsw-alias-bg-layer-2);border-radius:6px;padding:4px 8px;word-break:break-all;overflow-wrap:anywhere;font-family:var(--dsw-font-mono)}.dshmcp_details{margin:0;flex-direction:column;gap:6px;display:flex}.dshmcp_details>div{display:flex;gap:8px;font-size:12px;line-height:18px}.dshmcp_details dt{color:var(--dsw-alias-label-tertiary);flex:none;min-width:72px}.dshmcp_details dd{margin:0;color:var(--dsw-alias-label-primary);word-break:break-all;overflow-wrap:anywhere}.dshmcp_form{flex-direction:column;gap:10px;display:flex}.dshmcp_formRow{flex-direction:column;gap:4px;display:flex}.dshmcp_formRow label{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary)}.dshmcp_formRow input,.dshmcp_formRow textarea{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);font:inherit;border-radius:8px;padding:6px 10px;font-size:13px;line-height:20px;outline:none}.dshmcp_formRow input:focus-visible,.dshmcp_formRow textarea:focus-visible{border-color:var(--dsw-alias-state-business-primary);box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-state-business-primary) 18%,transparent)}.dshmcp_formRow textarea{min-height:90px;resize:vertical;font-family:var(--dsw-font-mono);font-size:12px}.dshmcp_formActions{align-items:center;gap:8px;display:flex}.dshmcp_formError{color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:18px;margin:0}.dshmcp_notice{font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary);margin:0}.dshmcp_modal{position:fixed;inset:0;z-index:1200;display:flex;align-items:center;justify-content:center}.dshmcp_modalMask{position:absolute;inset:0;background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur)}.dshmcp_modalPanel{position:relative;background:var(--dsw-alias-bg-layer-2);border-radius:16px;box-shadow:var(--dsw-shadow-lv3);width:560px;max-width:calc(100vw - 48px);max-height:calc(100vh - 96px);overflow:auto;padding:20px;flex-direction:column;gap:14px;display:flex}.dshmcp_modalTitle{font-size:15px;font-weight:600;line-height:22px;margin:0}.dshmcp_actionRow{align-items:center;gap:8px;display:flex;margin-top:2px}.dshmcp_actionRow .dshmcp_ghost{padding:2px 8px;font-size:12px}";
		const tagId = "@long/dsh-client-ui-settings-mcp/McpSection.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@long/dsh-client-ui-settings-mcp";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const McpSection_module_css_default = {
			"section": "dshmcp_section",
			"failure": "dshmcp_failure",
			"cardTrailing": "dshmcp_cardTrailing",
			"configTag": "dshmcp_configTag",
			"chevron": "dshmcp_chevron",
			"status": "dshmcp_status",
			"heading": "dshmcp_heading",
			"cards": "dshmcp_cards",
			"statusDot": "dshmcp_statusDot",
			"cardContent": "dshmcp_cardContent",
			"cardTitle": "dshmcp_cardTitle",
			"entryValue": "dshmcp_entryValue",
			"card": "dshmcp_card",
			"cardDetails": "dshmcp_cardDetails",
			"details": "dshmcp_details",
			"catalog": "dshmcp_catalog",
			"addButton": "dshmcp_addButton",
			"primary": "dshmcp_primary",
			"ghost": "dshmcp_ghost",
			"danger": "dshmcp_danger",
			"form": "dshmcp_form",
			"formRow": "dshmcp_formRow",
			"formActions": "dshmcp_formActions",
			"formError": "dshmcp_formError",
			"notice": "dshmcp_notice",
			"modal": "dshmcp_modal",
			"modalMask": "dshmcp_modalMask",
			"modalPanel": "dshmcp_modalPanel",
			"modalTitle": "dshmcp_modalTitle",
			"actionRow": "dshmcp_actionRow",
			"testResult": "dshmcp_testResult"
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
		/** Only real MCP server entries are manageable; mcp-inventory is the management service itself. */
		function isMcpEntry(entry) {
			if (entry.name === "@long/dsh-mcp-inventory") return false;
			return (entry.id !== void 0 && entry.id.startsWith("mcp-")) || entry.name === "@deepseek-ai/dsh-mcp-client";
		}
		/** Pretty-print a config object as YAML-ish text for the editor. */
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
		/** Editor modal for adding or editing an MCP server. */
		function McpEditorModal({ mode, initial, onSave, onCancel, t }) {
			const [serverName, setServerName] = (0, react.useState)(initial?.id ? mcpServerName(initial.id) : "");
			const [name, setName] = (0, react.useState)(initial?.name ?? "@deepseek-ai/dsh-mcp-client");
			const [configText, setConfigText] = (0, react.useState)(configToText(initial?.config));
			const [error, setError] = (0, react.useState)(null);
			const [saving, setSaving] = (0, react.useState)(false);
			const save = async () => {
				setError(null);
				if (!serverName.trim()) {
					setError(t("serverNameRequired"));
					return;
				}
				let config;
				try {
					config = textToConfig(configText);
				} catch (cause) {
					setError(`${t("configInvalid")}: ${cause.message}`);
					return;
				}
				setSaving(true);
				try {
					await onSave({ serverName: serverName.trim(), name: name.trim() || "@deepseek-ai/dsh-mcp-client", config });
				} catch (cause) {
					setError(cause instanceof Error ? cause.message : String(cause));
					setSaving(false);
				}
			};
			const nameDisabled = mode === "edit";
			return (0, react_jsx_runtime.jsxs)("div", {
				className: McpSection_module_css_default.modal,
				role: "presentation",
				children: [(0, react_jsx_runtime.jsx)("div", {
					className: McpSection_module_css_default.modalMask,
					"aria-hidden": "true",
					onClick: () => { if (!saving) onCancel(); }
				}), (0, react_jsx_runtime.jsxs)("div", {
					className: McpSection_module_css_default.modalPanel,
					role: "dialog",
					"aria-modal": "true",
					children: [(0, react_jsx_runtime.jsx)("h3", {
						className: McpSection_module_css_default.modalTitle,
						children: mode === "edit" ? t("editTitle") : t("addTitle")
					}), (0, react_jsx_runtime.jsxs)("div", {
						className: McpSection_module_css_default.form,
						children: [
							(0, react_jsx_runtime.jsxs)("div", {
								className: McpSection_module_css_default.formRow,
								children: [(0, react_jsx_runtime.jsx)("label", { children: t("serverName") }), (0, react_jsx_runtime.jsx)("input", {
									type: "text",
									value: serverName,
									disabled: nameDisabled,
									placeholder: "sequential-thinking",
									onChange: (e) => setServerName(e.currentTarget.value)
								})]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: McpSection_module_css_default.formRow,
								children: [(0, react_jsx_runtime.jsx)("label", { children: t("module") }), (0, react_jsx_runtime.jsx)("input", {
									type: "text",
									value: name,
									onChange: (e) => setName(e.currentTarget.value)
								})]
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: McpSection_module_css_default.formRow,
								children: [(0, react_jsx_runtime.jsx)("label", { children: t("config") }), (0, react_jsx_runtime.jsx)("textarea", {
									value: configText,
									spellCheck: false,
									placeholder: '{\n  "transport": "stdio",\n  "command": "npx",\n  "args": ["-y", "@modelcontextprotocol/server-xxx"],\n  "env": {}\n}',
									onChange: (e) => setConfigText(e.currentTarget.value)
								})]
							}),
							error !== null ? (0, react_jsx_runtime.jsx)("p", {
								className: McpSection_module_css_default.formError,
								role: "alert",
								children: error
							}) : null,
							(0, react_jsx_runtime.jsx)("p", {
								className: McpSection_module_css_default.notice,
								children: t("restartNotice")
							}),
							(0, react_jsx_runtime.jsxs)("div", {
								className: McpSection_module_css_default.formActions,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: McpSection_module_css_default.primary,
									disabled: saving,
									onClick: save,
									children: saving ? t("saving") : t("save")
								}), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: McpSection_module_css_default.ghost,
									disabled: saving,
									onClick: onCancel,
									children: t("cancel")
								})]
							})
						]
					})]
				})]
			});
		}
		/** Render the MCP server catalog section with add/edit/remove. */
		function McpSection({ list, add, update, remove, test, t }) {
			const catalogId = (0, react.useId)();
			const [request, setRequest] = (0, react.useState)(0);
			const [expanded, setExpanded] = (0, react.useState)(null);
			const [editor, setEditor] = (0, react.useState)(null);
			const [confirmRemove, setConfirmRemove] = (0, react.useState)(null);
			const [busy, setBusy] = (0, react.useState)(false);
			const [notice, setNotice] = (0, react.useState)(null);
			const [testing, setTesting] = (0, react.useState)(null);
			const [testResult, setTestResult] = (0, react.useState)(null);
			// Stabilize the injected callbacks: the slot inject factory returns a
			// fresh object on every render, which would otherwise re-trigger the
			// load effect on each render and after every section remount.
			const listRef = (0, react.useRef)(list);
			listRef.current = list;
			const testRef = (0, react.useRef)(test);
			testRef.current = test;
			// Initial state comes from the module cache when available, so a
			// remount after switching sections shows the last state immediately
			// (stale-while-revalidate) instead of flashing empty.
			const [state, setState] = (0, react.useState)(() => {
				const cached = mcpStatusCache.get("__snapshot__");
				return cached !== void 0 ? { status: "ready", snapshot: cached } : { status: "loading" };
			});
			(0, react.useEffect)(() => {
				let current = true;
				Promise.resolve().then(() => listRef.current()).then((snapshot) => {
					if (!current) return;
					// Merge cached probe results into the fresh snapshot so a
					// previously verified server keeps its known status even if
					// the passive toolCount momentarily reads 0.
					const merged = {
						...snapshot,
						entries: snapshot.entries.map((entry) => {
							if (entry.id === void 0 || !entry.id.startsWith("mcp-") || entry.name === "@long/dsh-mcp-inventory") return entry;
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
					// Auto-verify servers still reported as disconnected, but
					// only when no fresh handshake ran recently (debounced).
					const offline = merged.entries.filter((e) => e.id !== void 0 && e.id.startsWith("mcp-") && e.name !== "@long/dsh-mcp-inventory" && !(e.connected === true || (e.toolCount ?? 0) > 0));
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
			const refresh = () => setRequest((value) => value + 1);
			// mcpInventory.list() returns { id, name, config } per entry.
			// Normalize to the shape the card renderer expects, using stable
			// defaults for fields the inventory service does not report.
			const entries = state.status === "ready" ? state.snapshot.entries.filter(isMcpEntry).map((entry) => ({
				entryId: entry.id,
				id: entry.id,
				moduleName: entry.name ?? "@deepseek-ai/dsh-mcp-client",
				name: entry.name ?? "@deepseek-ai/dsh-mcp-client",
				config: entry.config ?? {},
				toolCount: entry.toolCount ?? 0,
				connected: entry.connected === true || (entry.toolCount ?? 0) > 0,
				enabled: true,
				// Normal = green dot, abnormal (no tools registered) = red dot.
				fiberPhase: entry.connected === true || (entry.toolCount ?? 0) > 0 ? "active" : "failed"
			})) : [];
			(0, react.useEffect)(() => {
				if (expanded !== null && !entries.some((entry) => entry.entryId === expanded)) setExpanded(null);
			}, [expanded, entries]);
			const handleSave = async (payload) => {
				if (editor === null) return;
				const { mode, entry } = editor;
				const result = mode === "edit"
					? await update({ id: entry.id, name: payload.name, config: payload.config })
					: await add({ serverName: payload.serverName, name: payload.name, config: payload.config });
				if (!result.ok) throw new Error(result.error?.message ?? "save failed");
				setEditor(null);
				setNotice(mode === "edit" ? t("updated") : t("added"));
				refresh();
			};
			const handleRemove = async () => {
				if (confirmRemove === null) return;
				setBusy(true);
				try {
					const result = await remove(confirmRemove.id);
					if (!result.ok) throw new Error(result.error?.message ?? "remove failed");
					setConfirmRemove(null);
					setNotice(t("removed"));
					refresh();
				} finally {
					setBusy(false);
				}
			};
			const handleTest = async (id) => {
				setTesting(id);
				setTestResult(null);
				try {
					const result = await test(id);
					writeCachedStatus(id, result);
					setTestResult({ id, ...result });
					// Update the snapshot so the card's status dot reflects the
					// fresh handshake result (green when reachable).
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
				"aria-busy": state.status === "loading" || busy,
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
								}), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: McpSection_module_css_default.addButton,
									onClick: () => setEditor({ mode: "add", entry: null }),
									children: t("add")
								})]
							}),
							notice !== null ? (0, react_jsx_runtime.jsx)("p", {
								className: McpSection_module_css_default.notice,
								role: "status",
								children: notice
							}) : null,
							entries.length === 0 ? (0, react_jsx_runtime.jsx)("p", {
								className: McpSection_module_css_default.status,
								children: t("empty")
							}) : null,
							entries.length > 0 ? (0, react_jsx_runtime.jsx)("ul", {
								className: McpSection_module_css_default.cards,
								children: entries.map((entry) => {
									const status = phaseLabel(entry.fiberPhase, t);
									const title = mcpServerName(entry.entryId);
									const configuration = t(entry.enabled ? "enabledTag" : "disabledTag");
									const open = expanded === entry.entryId;
									const detailId = `${catalogId}-details-${encodeURIComponent(entry.entryId)}`;
									return (0, react_jsx_runtime.jsxs)("li", {
										className: McpSection_module_css_default.card,
										"data-mcp-entry": entry.entryId,
										"data-open": open ? "true" : void 0,
										children: [(0, react_jsx_runtime.jsxs)("button", {
											className: McpSection_module_css_default.cardContent,
											type: "button",
											"aria-expanded": open,
											"aria-controls": detailId,
											"aria-label": entry.enabled ? `${title}, ${status}, ${configuration}` : `${title}, ${configuration}`,
											onClick: () => setExpanded((current) => current === entry.entryId ? null : entry.entryId),
											children: [(0, react_jsx_runtime.jsx)("strong", {
												className: McpSection_module_css_default.cardTitle,
												title: entry.moduleName,
												children: title
											}), (0, react_jsx_runtime.jsxs)("span", {
												className: McpSection_module_css_default.cardTrailing,
												children: [
													entry.enabled ? (0, react_jsx_runtime.jsx)("span", {
														className: McpSection_module_css_default.statusDot,
														"data-phase": entry.fiberPhase ?? "unobserved",
														role: "img",
														"aria-label": status,
														title: status
													}) : null,
													(0, react_jsx_runtime.jsx)("span", {
														className: McpSection_module_css_default.configTag,
														"data-enabled": entry.connected ? "true" : "false",
														"data-status": entry.connected ? "ok" : "bad",
														children: entry.connected ? `${entry.toolCount ?? 0} ${t("tools")}` : t("offline")
													}),
													(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconChevronDownOutline14, {
														className: McpSection_module_css_default.chevron,
														size: 12,
														"aria-hidden": "true"
													})
												]
											})]
										}), open ? (0, react_jsx_runtime.jsxs)("div", {
											className: McpSection_module_css_default.cardDetails,
											id: detailId,
											children: [
												(0, react_jsx_runtime.jsx)("code", {
													className: McpSection_module_css_default.entryValue,
													"data-loader-entry": true,
													children: entry.entryId
												}),
												(0, react_jsx_runtime.jsxs)("dl", {
													className: McpSection_module_css_default.details,
													children: [
														(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("dt", { children: t("module") }), (0, react_jsx_runtime.jsx)("dd", { children: entry.moduleName })] }),
														(0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("dt", { children: t("configuration") }), (0, react_jsx_runtime.jsx)("dd", { children: configuration })] }),
														entry.enabled ? (0, react_jsx_runtime.jsxs)("div", { children: [(0, react_jsx_runtime.jsx)("dt", { children: t("cordis") }), (0, react_jsx_runtime.jsx)("dd", { children: status })] }) : null
													]
												}),
												(0, react_jsx_runtime.jsxs)("div", {
													className: McpSection_module_css_default.actionRow,
													children: [
														(0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: McpSection_module_css_default.ghost,
															disabled: testing !== null,
															onClick: () => handleTest(entry.id),
															children: testing === entry.id ? t("testing") : t("test")
														}),
														(0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: McpSection_module_css_default.ghost,
															onClick: () => setEditor({ mode: "edit", entry }),
															children: t("edit")
														}),
														(0, react_jsx_runtime.jsx)("button", {
															type: "button",
															className: McpSection_module_css_default.danger,
															onClick: () => setConfirmRemove(entry),
															children: t("remove")
														})
													]
												}),
												testResult !== null && testResult.id === entry.id ? (0, react_jsx_runtime.jsx)("p", {
													className: McpSection_module_css_default.testResult,
													"data-status": testResult.ok ? "ok" : "bad",
													role: "status",
													children: testResult.ok
														? `${t("testOk")} ${testResult.toolCount} ${t("tools")} · ${testResult.latencyMs}ms`
														: `${t("testFail")}: ${testResult.message}`
												}) : null
											]
										}) : null]
									}, entry.entryId);
								})
							}) : null
						]
					}) : null,
					editor !== null ? (0, react_jsx_runtime.jsx)(McpEditorModal, {
						mode: editor.mode,
						initial: editor.entry,
						onSave: handleSave,
						onCancel: () => setEditor(null),
						t: t
					}) : null,
					confirmRemove !== null ? (0, react_jsx_runtime.jsxs)("div", {
						className: McpSection_module_css_default.modal,
						role: "presentation",
						children: [(0, react_jsx_runtime.jsx)("div", {
							className: McpSection_module_css_default.modalMask,
							"aria-hidden": "true",
							onClick: () => { if (!busy) setConfirmRemove(null); }
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: McpSection_module_css_default.modalPanel,
							role: "dialog",
							"aria-modal": "true",
							children: [(0, react_jsx_runtime.jsx)("h3", {
								className: McpSection_module_css_default.modalTitle,
								children: t("removeTitle")
							}), (0, react_jsx_runtime.jsx)("p", {
								className: McpSection_module_css_default.status,
								children: `${t("removeConfirm")} ${mcpServerName(confirmRemove.id)}?`
							}), (0, react_jsx_runtime.jsxs)("div", {
								className: McpSection_module_css_default.formActions,
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: McpSection_module_css_default.danger,
									disabled: busy,
									onClick: handleRemove,
									children: busy ? t("removing") : t("remove")
								}), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: McpSection_module_css_default.ghost,
									disabled: busy,
									onClick: () => setConfirmRemove(null),
									children: t("cancel")
								})]
							})]
						})]
					}) : null
				]
			});
		}
		//#endregion
		//#region locales
		const zh = {
			nav: "MCP 服务器",
			loading: "正在读取 MCP 服务器…",
			error: "暂时无法读取 MCP 服务器。",
			retry: "重试",
			catalog: "MCP 服务器",
			empty: "未配置 MCP 服务器。",
			add: "新增",
			addTitle: "新增 MCP 服务器",
			editTitle: "编辑 MCP 服务器",
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
			removeTitle: "删除 MCP 服务器",
			removeConfirm: "确定删除",
			removing: "删除中…",
			added: "已新增，重启 dsh web 后生效。",
			updated: "已更新，重启 dsh web 后生效。",
			removed: "已删除，重启 dsh web 后生效。",
			restartNotice: "修改会写入配置文件，重启 dsh web 后生效。",
			tools: "个工具",
			offline: "未连接",
			test: "测试连接",
			testing: "测试中…",
			testOk: "连接正常：",
			testFail: "连接失败",
			enabledTag: "已启用",
			disabledTag: "已停用",
			configuration: "配置状态",
			cordis: "Cordis 状态",
			unobserved: "未挂载",
			pending: "等待依赖",
			loadingPhase: "加载中",
			active: "已挂载",
			failed: "挂载失败",
			unloading: "卸载中"
		};
		const en = {
			nav: "MCP servers",
			loading: "Reading MCP servers…",
			error: "MCP servers are temporarily unavailable.",
			retry: "Retry",
			catalog: "MCP servers",
			empty: "No MCP servers are configured.",
			add: "Add",
			addTitle: "Add MCP server",
			editTitle: "Edit MCP server",
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
			removeTitle: "Remove MCP server",
			removeConfirm: "Remove",
			removing: "Removing…",
			added: "Added. Restart dsh web to apply.",
			updated: "Updated. Restart dsh web to apply.",
			removed: "Removed. Restart dsh web to apply.",
			restartNotice: "Changes are written to the config file and apply after restarting dsh web.",
			tools: "tools",
			offline: "offline",
			test: "Test",
			testing: "Testing…",
			testOk: "Reachable:",
			testFail: "Failed",
			enabledTag: "Enabled",
			disabledTag: "Disabled",
			configuration: "Configuration",
			cordis: "Cordis status",
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
			// Mount the mcpInventory Remote contribution, then resolve the
			// namespace service explicitly via ctx.get (the proxy property
			// access `ctx.remote.mcpInventory` requires an inject declaration,
			// which would deadlock here since this plugin performs the mount).
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
