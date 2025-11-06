# PropertySystem 重构完成

## 变更概述

PropertySystem 已成功重构，**完全移除了与 CDOTA_Modifier_Lua 的强关联性**。

## 核心变更

### 1. 类型定义

**StaticPropertyData 和 DynamicPropertyData:**
- ❌ 移除：`modifier: CDOTA_Modifier_Lua`
- ✅ 新增：`sourceId: string` - 属性来源的唯一标识
- ✅ 新增：`metadata?: Record<string, any>` - 可选的元数据

### 2. API 签名变更

所有API从依赖 modifier 改为显式传递 scope/key/sourceId：

**静态属性:**
- `AddStaticProperty(scope, key, propertyId, sourceId, value, metadata?)`
- `RemoveStaticProperty(scope, key, sourceId, propertyId?)`
- `UpdateStaticPropertyValue(scope, key, propertyId, sourceId, newValue)`

**动态属性:**
- `RegisterDynamicProperty(scope, key, propertyId, sourceId, callback, priority?, metadata?)`
- `UnregisterDynamicProperty(scope, key, sourceId, propertyId?)`

**清理:**
- `CleanupModifierProperties` → `CleanupSourceProperties(scope, key, sourceId)`

### 3. 移除的功能

- `IsModifierValid()` - 不再需要验证 modifier 有效性
- `ResolveKey()` - 不再需要从 modifier 解析 key
- 自动清理无效 modifier - 改为手动调用 `CleanupSourceProperties`

### 4. 新增功能

- `GetEntityContext(entity)` - 辅助方法，自动推断 scope 和 key
- `metadata` 支持 - 可为属性附加额外信息（如过期时间、堆叠规则等）

## 优势

✅ **更灵活** - 可以为任意来源添加属性（物品、技能、系统事件等），不仅限于 modifier  
✅ **更清晰** - 显式的参数，不需要隐式推断  
✅ **更易用** - sourceId 字符串标识，易于理解和调试  
✅ **更可控** - 手动清理，避免意外删除  
✅ **更高效** - 移除了运行时 modifier 验证开销

## 使用示例

### 基本用法

```typescript
// 添加属性
PropertySystem.AddStaticProperty(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "attack_damage",
  "item_sword_123",  // sourceId
  50
);

// 删除属性
PropertySystem.CleanupSourceProperties(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "item_sword_123"
);
```

### 使用辅助方法

```typescript
const context = PropertySystem.GetEntityContext(unit);
if (context) {
  const [scope, key] = context;
  PropertySystem.AddStaticProperty(scope, key, "attack_damage", "item_sword", 50);
}
```

## 迁移指南

详细的迁移指南请查看：`PROPERTY_SYSTEM_MIGRATION_GUIDE.md`

包含：
- API 变更对照表
- 迁移示例
- 便捷包装函数（用于过渡）
- sourceId 命名规范
- 完整使用示例

## 文件状态

📄 **property_system.ts** - ✅ 重构完成，无编译错误  
📄 **PROPERTY_SYSTEM_MIGRATION_GUIDE.md** - ✅ 详细迁移文档已创建  
📄 **PROPERTY_SYSTEM_REFACTORING_SUMMARY.md** - ✅ 本文档

## 下一步

1. ⚠️ **更新现有调用代码** - 搜索并更新所有使用旧API的地方
2. ⚠️ **考虑创建便捷包装** - 如果项目大量使用 modifier，可以创建包装函数平滑过渡
3. ⚠️ **测试新功能** - 确保所有属性添加/删除逻辑正常工作
4. ⚠️ **更新清理逻辑** - 在合适的时机调用 `CleanupSourceProperties`

## 兼容性

⚠️ **Breaking Change** - 这是一次不兼容的 API 变更，需要更新所有调用代码。

建议采用**渐进式迁移**：
1. 先创建便捷包装函数（见迁移指南）
2. 逐步替换旧调用为新API
3. 测试并验证功能
4. 完全迁移后移除包装函数

## 技术债务清理

以下技术债务已在本次重构中清理：
- ✅ 移除对 CDOTA_Modifier_Lua 的强依赖
- ✅ 移除运行时 modifier 有效性检查
- ✅ 简化清理逻辑
- ✅ 统一参数顺序（scope, key 始终在前）

## 性能影响

预期性能**略有提升**：
- 移除了定期的 `IsModifierValid` 检查
- 减少了自动清理任务的运行频率
- 字符串比较性能与对象引用比较相当
