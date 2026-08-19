#!/usr/bin/env node
/**
 * Patch dsh-client-ui-settings-general so the Settings sidebar nav shows the
 * MCP logo for the "MCP servers" section instead of the default gear icon.
 *
 * DSH ships navIcon(id) with hardcoded branches for models/agent-presets/
 * plugins; unknown ids (including our `mcp`) fall back to the gear. This
 * script adds an `mcp` branch to the installed bundle.
 *
 * NOTE: DSH upgrades overwrite node_modules, so re-run after every upgrade.
 *
 * Usage:
 *   node patch-settings-general.js [path-to-dsh-install]
 *
 * Default path resolves relative to this package's node_modules.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const require = createRequire(import.meta.url);
const MCP_LOGO_BRANCH = `if (id === "mcp") return (0, react_jsx_runtime.jsx)("svg", {
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

const target = process.argv[2] ?? (() => {
  try {
    return fileURLToPath(require.resolve('@deepseek-ai/dsh-client-ui-settings-general/lib/client.js'));
  } catch {
    throw new Error('Cannot locate dsh-client-ui-settings-general. Pass the dsh install path explicitly.');
  }
})();

const src = readFileSync(target, 'utf8');
if (src.includes('id === "mcp"')) {
  console.log('Already patched:', target);
  process.exit(0);
}
if (!src.includes('function navIcon(id)')) {
  throw new Error(`navIcon not found in ${target} — unexpected bundle shape`);
}
const anchor = 'if (id === "plugins") return';
const idx = src.indexOf(anchor);
if (idx === -1) throw new Error('plugins branch not found in navIcon');
const insertAt = src.indexOf('\n', idx) + 1;
const patched = src.slice(0, insertAt) + MCP_LOGO_BRANCH + '\n' + src.slice(insertAt);
writeFileSync(target, patched, 'utf8');
console.log('Patched navIcon with mcp branch:', target);
