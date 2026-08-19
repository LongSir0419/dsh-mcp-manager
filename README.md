# dsh-mcp-manager

DeepSeek Harness (DSH) 的 MCP 服务器管理插件——在 Web 设置里可视化查看、新增、编辑、删除 MCP 服务器，并支持主动连接测试。

[![npm](https://img.shields.io/npm/v/@wanghailong0419/dsh-mcp-manager)](https://www.npmjs.com/package/@wanghailong0419/dsh-mcp-manager)
[![npm downloads](https://img.shields.io/npm/dm/@wanghailong0419/dsh-mcp-manager)](https://www.npmjs.com/package/@wanghailong0419/dsh-mcp-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

![preview](docs//preview_01.png)

## 功能

- **状态总览**：进入设置 → "MCP 服务器"，每个 server 显示连接状态（绿=正常 / 红=异常）+ 已注册工具数
- **新增 / 编辑 / 删除**：表单化配置 MCP server（serverName、transport、command、args、env），写入 `$DSH_HOME/profiles/web/cordis.patch.yml`
- **测试连接**：独立发起 MCP 握手（initialize + tools/list），验证 server 是否可达、返回工具数与延迟
- **缓存优化**：切走再切回状态秒开（stale-while-revalidate），未连接 server 自动后台验证

## 架构

单包双半的 DSH bundle：

| 半 | 入口 | 角色 |
|---|---|---|
| Host | `lib/index.js` | `mcpInventory` Remote 服务：list/add/update/removeServer/test，读写 `cordis.patch.yml`，统计工具数 |
| Client | `lib/client.js` | 设置面板 "MCP 服务器" 分区（`dsh.client` bundle，被 client-modules 自动发现） |

包通过 `dsh.bundle.patch`（`cordis.patch.yml`）声明，`dsh plugin` 安装后自动挂载。

## 安装

### 前置

- DeepSeek Harness (`dsh`) 已安装
- Web profile（`dsh web`）可用

### 安装（npm 已发布）

```bash
dsh plugin --profile web add @wanghailong0419/dsh-mcp-manager
dsh web   # 重启生效
```

> npm 包：https://www.npmjs.com/package/@wanghailong0419/dsh-mcp-manager

### 本地开发 / 未发布版本（file 源）

```bash
dsh plugin --profile web add file:/path/to/dsh-mcp-manager/bundle
dsh web
```

### 升级 / 移除

```bash
dsh plugin --profile web update @wanghailong0419/dsh-mcp-manager
dsh plugin --profile web remove @wanghailong0419/dsh-mcp-manager
```

> `dsh plugin add` 会自动把包加入 `dsh.profile.bundles` 层（检测到 `dsh.bundle` 声明），无需手动改配置。

## 使用

1. 启动 `dsh web`，打开**设置 → MCP 服务器**
2. 每个 server 卡片显示：名称、状态点（绿/红）、工具数
3. 展开卡片：查看配置、**测试连接**、编辑、删除
4. 新增：点右上角"新增"，填写 serverName / 模块 / 配置 JSON

> 修改会写入 `cordis.patch.yml`，**重启 dsh web 后生效**（web 模式 HMR 禁用）。

## 配置示例

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

## 已知限制

- **需手动改 `dsh-client-ui-settings-general`**：设置面板左侧导航的 "MCP 服务器" 图标需要给官方包 `navIcon()` 加 `mcp` 分支（见 `patch-settings-general.js`，升级 DSH 后需重新打补丁）。不影响功能，仅影响导航图标显示
- **host 服务需要 `tools` 服务**：`toolCount` 依赖 DSH 的工具注册表
- **测试 idea/pycharm**：`stdioMcpServer` 模式会再拉起一次 IDE 进程，耗时较长

> 升级提示：如果你是从早期手动安装版本升级过来的，先移除 `cordis.patch.yml` 里手动添加的 `mcp-inventory` / `ui-settings-mcp` 条目（bundle 会自动提供，重复会导致服务冲突）。全新安装用户无需理会。

## License

MIT
