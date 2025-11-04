# VScripts 配置模块使用指南

## 什么是 `_config.ts`？

`_config.ts` 是一个自动生成的 TypeScript 模块，包含从 `package.json` 读取的项目配置常量。它位于：

```
content/{addon_name}/scripts/vscripts/_config.ts
```

## 为什么需要它？

在 VScripts 业务代码中，你可能需要使用项目名称，例如：
- 调试日志标签
- HTTP 请求参数
- 数据库键名
- 事件名称前缀

如果硬编码这些值，当重命名项目时需要手动修改所有相关代码。使用 `_config.ts` 可以自动同步。

## 自动生成的内容

```typescript
/**
 * 🤖 此文件由 node_scripts/generate-tsconfig.js 自动生成
 * ⚠️  请勿手动编辑 - 每次构建时会被覆盖
 */

// 项目名称（从 package.json 的 name 字段）
export const ADDON_NAME = "solid_template";

// 调试标签
export const DEBUG_TAG_SERVER = "solid_template_debug";
export const DEBUG_TAG_CLIENT = "solid_template_client_debug";
export const DEBUG_TAG_PUI = "solid_template_pui_debug";

// 辅助函数
export function GetDebugTag(): string {
	return IsServer() ? DEBUG_TAG_SERVER : DEBUG_TAG_CLIENT;
}
```

## 使用示例

### 1. 调试日志系统

**❌ 硬编码方式:**
```typescript
// framework/debug.ts
const tc = IsServer() ? "solid_template_debug" : "solid_template_client_debug";

if (IsClient()) {
	const params = { tc: "solid_template_pui_debug", t: "error", d: data };
}
```

**✅ 使用配置模块:**
```typescript
// framework/debug.ts
import { DEBUG_TAG_PUI, GetDebugTag } from "../_config";

const tc = GetDebugTag();  // 自动选择正确的标签

if (IsClient()) {
	const params = { tc: DEBUG_TAG_PUI, t: "error", d: data };
}
```

### 2. 自定义网络事件

**❌ 硬编码方式:**
```typescript
// systems/network.ts
CustomNetTables.DefineTable("solid_template_data", { version: 1 });
CustomGameEventManager.RegisterListener("solid_template_event", callback);
```

**✅ 使用配置模块:**
```typescript
// systems/network.ts
import { ADDON_NAME } from "../_config";

CustomNetTables.DefineTable(`${ADDON_NAME}_data`, { version: 1 });
CustomGameEventManager.RegisterListener(`${ADDON_NAME}_event`, callback);
```

### 3. 存储系统键名

**❌ 硬编码方式:**
```typescript
// systems/storage.ts
const key = `solid_template_player_${playerID}`;
const cacheKey = `solid_template_cache_${type}`;
```

**✅ 使用配置模块:**
```typescript
// systems/storage.ts
import { ADDON_NAME } from "../_config";

const key = `${ADDON_NAME}_player_${playerID}`;
const cacheKey = `${ADDON_NAME}_cache_${type}`;
```

### 4. HTTP 请求

**❌ 硬编码方式:**
```typescript
// api/client.ts
const params = {
	addon: "solid_template",
	version: "1.0.0",
	tag: IsServer() ? "solid_template_debug" : "solid_template_client_debug"
};
```

**✅ 使用配置模块:**
```typescript
// api/client.ts
import { ADDON_NAME, GetDebugTag } from "../_config";

const params = {
	addon: ADDON_NAME,
	version: "1.0.0",
	tag: GetDebugTag()
};
```

## 可用的配置常量

| 常量 | 类型 | 说明 | 示例值 |
|------|------|------|--------|
| `ADDON_NAME` | `string` | 项目名称 | `"solid_template"` |
| `DEBUG_TAG_SERVER` | `string` | 服务端调试标签 | `"solid_template_debug"` |
| `DEBUG_TAG_CLIENT` | `string` | 客户端调试标签 | `"solid_template_client_debug"` |
| `DEBUG_TAG_PUI` | `string` | Panorama UI 调试标签 | `"solid_template_pui_debug"` |

## 可用的辅助函数

### `GetDebugTag()`

根据当前环境（服务端/客户端）返回正确的调试标签。

```typescript
function GetDebugTag(): string;
```

**用法:**
```typescript
import { GetDebugTag } from "../_config";

const tag = GetDebugTag();
// 服务端返回: "solid_template_debug"
// 客户端返回: "solid_template_client_debug"

print(`[${tag}] System initialized`);
```

## 如何添加自定义配置

如果你需要添加新的配置常量（例如 API 端点、版本号等），编辑 `node_scripts/generate-tsconfig.js`:

```javascript
function generateVScriptsConfig() {
	const outputPath = path.join(paths.contentScripts, '_config.ts');
	
	const configContent = `
export const ADDON_NAME = "${paths.addonName}";
export const DEBUG_TAG_SERVER = "${paths.addonName}_debug";
export const DEBUG_TAG_CLIENT = "${paths.addonName}_client_debug";
export const DEBUG_TAG_PUI = "${paths.addonName}_pui_debug";

// 自定义配置
export const API_ENDPOINT = "https://your-api.com";
export const GAME_VERSION = "1.0.0";
export const MAX_PLAYERS = 10;

export function GetDebugTag(): string {
	return IsServer() ? DEBUG_TAG_SERVER : DEBUG_TAG_CLIENT;
}
`;

	fs.writeFileSync(outputPath, configContent, 'utf-8');
}
```

然后运行 `npm run generate:config` 重新生成配置文件。

## 重要提醒

### ⚠️ 不要手动编辑 `_config.ts`

这个文件在每次构建时都会被覆盖。如果你手动修改，下次运行构建命令时修改会丢失。

### ✅ 正确的修改方式

1. 编辑 `node_scripts/generate-tsconfig.js`
2. 修改 `generateVScriptsConfig()` 函数
3. 运行 `npm run generate:config` 或任何构建命令

### 📝 已加入 .gitignore

`_config.ts` 已加入 `.gitignore`，不会提交到版本控制。这确保每个开发者/环境都会生成自己的配置。

## 最佳实践

1. **始终使用配置模块**: 避免在业务代码中硬编码项目名称
2. **集中管理配置**: 所有项目级配置都通过 `_config.ts` 管理
3. **类型安全**: 利用 TypeScript 的类型检查避免拼写错误
4. **一致性**: 确保所有代码使用相同的命名规范

## 故障排除

### 问题：找不到 `_config` 模块

**原因**: 配置文件未生成

**解决方案**:
```bash
npm run generate:config
# 或者运行任何构建命令
npm run build:vscripts
npm run dev:vscripts
```

### 问题：导入路径错误

**检查**: 确保使用相对路径导入

```typescript
// ✅ 正确 - 从当前目录的上级导入
import { ADDON_NAME } from "../_config";

// ❌ 错误 - 绝对路径
import { ADDON_NAME } from "/_config";
```

### 问题：配置值不正确

**原因**: `package.json` 的 `name` 字段可能不正确

**解决方案**:
1. 检查 `package.json` 的 `name` 字段
2. 运行 `npm run generate:config` 重新生成

## 相关文档

- [DYNAMIC_PATHS.md](./DYNAMIC_PATHS.md) - 完整的动态路径配置系统文档
- [.github/copilot-instructions.md](../.github/copilot-instructions.md) - 项目架构说明
