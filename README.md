# dsh-mcp-manager

[English](README.md) | [中文](README_CN.md)

An MCP server management plugin for DeepSeek Harness (DSH) — visually view, add, edit and remove MCP servers in the Web settings, with built-in connection testing.

[![npm](https://img.shields.io/npm/v/@wanghailong0419/dsh-mcp-manager)](https://www.npmjs.com/package/@wanghailong0419/dsh-mcp-manager)
[![npm downloads](https://img.shields.io/npm/dm/@wanghailong0419/dsh-mcp-manager)](https://www.npmjs.com/package/@wanghailong0419/dsh-mcp-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![preview](docs/preview_01.png)

## Features

- **List overview**: go to Settings → "mcp管理", each server shows connection status (green dot) + registered tool count
- **Click to expand / collapse**: click anywhere on a row to expand details (Server name / module / config JSON), click again to collapse (input fields and buttons excluded)
- **Add / edit / delete / enable-disable**: inline form to configure MCP servers (serverName, module, config JSON), enable/disable toggle, writes to `$DSH_HOME/profiles/web/cordis.patch.yml`
- **Connection test**: independent MCP handshake (initialize + tools/list) to verify reachability, tool count and latency
- **Cache optimization**: re-entering the page is instant (stale-while-revalidate); unconnected servers are verified in the background automatically; add/edit/delete updates state locally without flicker

## Architecture

A single-package, two-half DSH bundle:

| Half | Entry | Role |
|---|---|---|
| Host | `lib/index.js` | `mcpInventory` Remote service: list/add/update/removeServer/test, reads/writes `cordis.patch.yml`, counts tools |
| Client | `lib/client.js` | "MCP 服务器" section in the settings panel (`dsh.client` bundle, auto-discovered by client-modules) |

The package declares itself via `dsh.bundle.patch` (`cordis.patch.yml`) and is auto-mounted after `dsh plugin` installs it.

## Installation

### Prerequisites

- DeepSeek Harness (`dsh`) installed
- Web profile (`dsh web`) available

### Install (published on npm)

```bash
dsh plugin --profile web add @wanghailong0419/dsh-mcp-manager
dsh web   # restart to take effect
```

> npm package: https://www.npmjs.com/package/@wanghailong0419/dsh-mcp-manager

### Local development / unpublished version (file source)

```bash
dsh plugin --profile web add file:/path/to/dsh-mcp-manager/bundle
dsh web
```

### Upgrade / Remove

```bash
dsh plugin --profile web update @wanghailong0419/dsh-mcp-manager
dsh plugin --profile web remove @wanghailong0419/dsh-mcp-manager
```

> `dsh plugin add` automatically adds the package to the `dsh.profile.bundles` layer (it detects the `dsh.bundle` declaration) — no manual config editing needed.

## Usage

1. Start `dsh web`, open **Settings → mcp管理**
2. Each server row shows: name, status dot (green/red), tool count
3. Click a row to expand: view Server name / module / config JSON, **test connection**, edit, delete
4. Add: click "新增", fill in serverName / module / config JSON inline
5. Enable/disable: toggle the switch on the right side of the row

> Changes are written to `cordis.patch.yml` and take effect **after restarting `dsh web`** (HMR is disabled in web mode).

## Configuration Example

```yaml
- id: mcp-example
  name: '@deepseek-ai/dsh-mcp-client'
  config:
    serverName: example
    transport: stdio
    command: npx
    args: ['-y', '@modelcontextprotocol/server-xxx']
    env:
      TOKEN: !!js process.env.MY_TOKEN
```

## Known Limitations

- **Host service requires the `tools` service**: `toolCount` depends on DSH's tool registry
- **Testing idea/pycharm**: `stdioMcpServer` mode launches the IDE process once more, which takes longer

## Icon Notes

The "MCP 服务器" icon in the settings panel's left navigation is **patched automatically** when the plugin activates (injects an MCP logo branch into the official `dsh-client-ui-settings-general` `navIcon`; idempotent and fails silently). If DSH upgrades overwrite the official package, the patch is re-applied automatically on next startup — no manual action needed.

> Upgrade note: if you're upgrading from an earlier manual installation, remove the manually added `mcp-inventory` / `ui-settings-mcp` entries from `cordis.patch.yml` first (the bundle provides them automatically; duplicates cause service conflicts). Fresh installs can ignore this.

## License

MIT
