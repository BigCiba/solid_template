# Polyfill 开发指南

## 概述

这个项目支持多文件 TypeScript polyfill 开发，**自动扫描并合并** `src/polyfill/` 目录下的所有 `.ts` 文件。

## 工作原理

### 🔄 自动文件发现
构建系统会自动扫描 `src/polyfill/` 目录下的所有 `.ts` 文件（除了 README.md），无需在任何地方手动添加 import 语句。

### 📦 独立编译合并
每个 `.ts` 文件都会被独立编译为 JavaScript，然后按文件名排序合并到最终的 `custom-polyfill.js` 中。

## 开发工作流

### 创建新的 Polyfill 模块

直接在 `src/polyfill/` 目录下创建新的 `.ts` 文件：

```typescript
// src/polyfill/my-utils.ts

/**
 * 我的自定义函数
 * @param param 参数
 * @returns 结果
 */
function MyCustomFunction(param: string): string {
    return `processed: ${param}`;
}

/**
 * 另一个工具函数
 */
function AnotherUtility(): void {
    // 实现逻辑
}
```

## 注意事项

- 所有函数自动成为全局函数，无需手动绑定
- 文件按字母顺序合并，注意函数依赖关系
- 构建输出为 ES5 格式，兼容 Panorama 环境
- TypeScript 错误不会阻止构建，但建议修复所有错误
- 删除文件后需要重新构建才能从最终输出中移除