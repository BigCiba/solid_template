# 动态路径配置系统

本项目使用动态路径配置系统，所有路径都从 `package.json` 的 `name` 字段读取。

## 核心原理

### 1. 中央配置工具 (`node_scripts/get-addon-name.js`)

提供两个核心函数：

```javascript
const { getAddonName, getAddonPaths } = require('./get-addon-name');

// 获取 addon 名称
const name = getAddonName(); // 返回: "solid_template"

// 获取所有路径
const paths = getAddonPaths();
// 返回对象包含:
// - addonName: addon 名称
// - contentRoot: content/solid_template
// - contentScripts: content/solid_template/scripts/vscripts
// - contentPanorama: content/solid_template/panorama
// - gameRoot: game/solid_template
// - gameScripts: game/solid_template/scripts/vscripts
// - vscriptsTsConfig: content/solid_template/scripts/vscripts/tsconfig.json
// ... 等等
```

### 2. 自动生成 tsconfig.json (`node_scripts/generate-tsconfig.js`)

由于 JSON 文件不支持变量，所有 `tsconfig.json` 文件都是自动生成的：

- `src/tsconfig.json` - Panorama UI 的 TypeScript 配置
- `content/{addon_name}/scripts/vscripts/tsconfig.json` - VScripts 的 TSTL 配置

**重要**: 
- ⚠️ 不要手动编辑这些文件，它们会在每次构建时被覆盖
- ✅ 如需修改配置，请编辑 `node_scripts/generate-tsconfig.js`

### 3. 集成到构建流程

所有构建命令都会自动生成配置：

```bash
# 手动生成（通常不需要）
npm run generate:config

# 以下命令会自动生成配置
npm run build:solid         # 生成 src/tsconfig.json
npm run dev:solid           # 生成 src/tsconfig.json
npm run build:vscripts      # 生成 vscripts/tsconfig.json + _config.ts
npm run dev:vscripts        # 生成 vscripts/tsconfig.json + _config.ts
```

## VScripts 业务代码中使用项目配置

### 自动生成的配置模块 (`_config.ts`)

系统会自动生成 `content/{addon_name}/scripts/vscripts/_config.ts` 文件，包含项目级别的配置常量：

```typescript
// 自动生成的 _config.ts 内容示例
export const ADDON_NAME = "solid_template";
export const DEBUG_TAG_SERVER = "solid_template_debug";
export const DEBUG_TAG_CLIENT = "solid_template_client_debug";
export const DEBUG_TAG_PUI = "solid_template_pui_debug";

export function GetDebugTag(): string {
	return IsServer() ? DEBUG_TAG_SERVER : DEBUG_TAG_CLIENT;
}
```

### 在业务代码中使用

**❌ 不推荐 - 硬编码项目名称:**
```typescript
const tc = IsServer() ? "solid_template_debug" : "solid_template_client_debug";
const params = { tc: "solid_template_pui_debug", t: "error", d: data };
```

**✅ 推荐 - 使用配置模块:**
```typescript
import { DEBUG_TAG_SERVER, DEBUG_TAG_CLIENT, DEBUG_TAG_PUI, GetDebugTag } from "../_config";

const tc = GetDebugTag();  // 自动根据环境选择正确的标签
const params = { tc: DEBUG_TAG_PUI, t: "error", d: data };
```

### 配置模块的优势

1. **自动同步**: 修改 `package.json` name 后，所有业务代码自动使用新名称
2. **类型安全**: TypeScript 编译时检查，避免拼写错误
3. **集中管理**: 所有项目配置在一个地方
4. **易于扩展**: 需要新配置时只需修改 `generate-tsconfig.js`

### 添加自定义配置

编辑 `node_scripts/generate-tsconfig.js`，在 `generateVScriptsConfig()` 函数中添加：

```javascript
const configContent = `
export const ADDON_NAME = "${paths.addonName}";
export const DEBUG_TAG_SERVER = "${paths.addonName}_debug";

// 添加你的自定义配置
export const API_ENDPOINT = "http://your-api.com";
export const MAX_PLAYERS = 10;
`;
```

## 如何重命名项目

只需一步：

```json
// package.json
{
  "name": "my_awesome_addon",  // 修改这里
  ...
}
```

然后运行任何构建命令，所有路径都会自动更新！

## 已集成的脚本

以下脚本都使用动态路径：

- ✅ `node_scripts/build-vscripts.js` - 构建 VScripts
- ✅ `node_scripts/watch-vscripts.js` - 监听 VScripts 变化
- ✅ `node_scripts/clean-images.js` - 清理未使用的图片
- ✅ `node_scripts/precache.js` - 预缓存资源
- ✅ `node_scripts/encrypt-custom-game.js` - 加密 Lua 文件
- ✅ `rollup/build.ts` - Panorama UI 构建
- ✅ `rollup/rollup-plugin-panorama.ts` - Panorama 插件

## 文件说明

### 自动生成的文件（已加入 .gitignore）

```
src/tsconfig.json                                    # 自动生成 - Panorama UI TS 配置
content/{addon_name}/scripts/vscripts/tsconfig.json # 自动生成 - VScripts TSTL 配置
content/{addon_name}/scripts/vscripts/_config.ts    # 自动生成 - VScripts 项目配置常量
```

### 手动维护的配置文件

```
package.json                          # 项目名称配置（修改 name 字段）
node_scripts/get-addon-name.js       # 路径工具（不要修改）
node_scripts/generate-tsconfig.js    # 配置生成器（可修改以添加自定义配置）
rollup/tsconfig.json                 # Rollup 构建脚本的 TS 配置（独立）
```

## 故障排除

### 问题：路径错误或找不到文件

**解决方案**: 运行 `npm run generate:config` 重新生成配置文件

### 问题：修改 tsconfig.json 后被覆盖

**原因**: tsconfig.json 是自动生成的

**解决方案**: 编辑 `node_scripts/generate-tsconfig.js` 而不是 tsconfig.json

### 问题：重命名项目后构建失败

**检查步骤**:
1. 确认 `package.json` 的 `name` 字段已修改
2. 确认 `content/{new_name}/` 和 `game/{new_name}/` 目录存在
3. 运行 `npm run generate:config`
4. 重新运行构建命令

## 开发最佳实践

1. **不要硬编码路径** - 总是使用 `getAddonPaths()` 获取路径
2. **不要手动编辑 tsconfig.json** - 使用生成脚本
3. **修改项目名称后测试** - 确保所有构建命令正常工作
4. **新增脚本时集成路径系统** - 参考现有脚本的用法

## 示例：在新脚本中使用

### Node.js 脚本中使用路径

```javascript
// my-new-script.js
const { getAddonPaths } = require('./get-addon-name');

const paths = getAddonPaths();

// 使用路径
console.log(`Content root: ${paths.contentRoot}`);
console.log(`Game root: ${paths.gameRoot}`);

// 构建文件路径
const myFile = path.join(paths.gameScripts, 'my_module.lua');
```

### VScripts 业务代码中使用配置

```typescript
// framework/my_system.ts
import { ADDON_NAME, GetDebugTag } from "../_config";

// 使用项目名称
const systemName = `${ADDON_NAME}_my_system`;

// 使用调试标签
const tag = GetDebugTag();
print(`[${tag}] System initialized`);

// HTTP 请求中使用
const params = {
	tc: GetDebugTag(),
	addon: ADDON_NAME,
	data: someData
};
```

## 技术细节

### 为什么需要这个系统？

1. **项目可移植性**: 修改一处即可重命名整个项目
2. **避免错误**: 减少路径相关的 bug
3. **易于维护**: 中央化的路径管理
4. **自动化**: 配置文件自动同步项目名称

### 系统架构

```
package.json (name)
    ↓
get-addon-name.js (读取 name)
    ↓
generate-tsconfig.js (生成配置)
    ↓
build/watch scripts (使用路径)
    ↓
输出到正确的目录
```
