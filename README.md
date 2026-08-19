# dsh-mcp-manager

DeepSeek Harness (DSH) 的 MCP 服务器管理插件——在 Web 设置里可视化查看、新增、编辑、删除 MCP 服务器，并支持主动连接测试。

## 功能

- **状态总览**：进入设置 → "MCP 服务器"，每个 server 显示连接状态（绿=正常 / 红=异常）+ 已注册工具数
- **新增 / 编辑 / 删除**：表单化配置 MCP server（serverName、transport、command、args、env），写入 `$DSH_HOME/profiles/web/cordis.patch.yml`
- **测试连接**：独立发起 MCP 握手（initialize + tools/list），验证 server 是否可达、返回工具数与延迟
- **缓存优化**：切走再切回状态秒开（stale-while-revalidate），未连接 server 自动后台验证

## 架构

由两个包组成：

| 包 | 角色 |
|---|---|
| `@long/dsh-mcp-inventory` | Host 侧 Remote 服务：list/add/update/remove/test，读写 `cordis.patch.yml` |
| `@long/dsh-client-ui-settings-mcp` | 浏览器插件：设置面板 "MCP 服务器" 分区（`dsh.client` bundle） |

## 安装

### 前置

- DeepSeek Harness (`dsh`) 已安装
- Web profile（`dsh web`）可用

### 方式一：手动安装（当前版本）

1. 将两个包复制到 profile 的模块目录：

```bash
cp -r dsh-mcp-inventory dsh-client-ui-settings-mcp \
  $DSH_HOME/profiles/node_modules/@long/
```

2. 在 `$DSH_HOME/profiles/web/cordis.patch.yml` 的 `insert` 列表追加：

```yaml
- insert:
    - id: mcp-inventory
      name: '@long/dsh-mcp-inventory'
    - id: ui-settings-mcp
      name: '@long/dsh-client-ui-settings-mcp'
```

3. 重启：

```bash
dsh web
```

### 方式二：bundle 安装（规划中）

正在适配为标准 `dsh.bundle` 包，之后可一键安装：

```bash
dsh plugin --profile web add @long/dsh-mcp-manager
```

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

- **需手动改 `dsh-client-ui-settings-general`**：设置面板左侧导航的 "MCP 服务器" 图标需要给官方包 `navIcon()` 加 `mcp` 分支（见 `patch-settings-general.js`，升级 DSH 后需重新打补丁）
- **host 服务需要 `tools` 服务**：`toolCount` 依赖 DSH 的工具注册表
- **测试 idea/pycharm**：`stdioMcpServer` 模式会再拉起一次 IDE 进程，耗时较长

## 开发

```bash
# 本地验证（file 源安装）
dsh plugin --profile web add file:../dsh-mcp-manager/dsh-mcp-inventory
```

## License

MIT
