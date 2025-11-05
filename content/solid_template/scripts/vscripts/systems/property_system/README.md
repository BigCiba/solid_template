# 属性系统 (Property System)

一个为 Dota 2 自定义游戏设计的高性能、模块化属性管理系统。

## ✨ 特性

- 🎯 **双作用域支持** - 单位属性 (UNIT) 和玩家属性 (PLAYER)
- ⚡ **双类型属性** - 静态属性（预计算）和动态属性（回调函数）
- 🔄 **自动网表同步** - 服务器到客户端的增量同步
- 💾 **多层缓存优化** - 静态缓存 + 运行时缓存
- 🧹 **自动清理机制** - 防止内存泄漏
- 🐛 **完整调试工具** - 性能分析、属性追踪、控制台命令
- 📊 **性能统计** - 缓存命中率、读写次数、同步计数

## 📂 文件结构

```
property_system/
├── types.ts              # 类型定义
├── core.ts               # 核心功能（初始化、存储管理、聚合）
├── static_properties.ts  # 静态属性管理
├── dynamic_properties.ts # 动态属性管理
├── nettable_sync.ts      # 网表同步系统
├── cleanup.ts            # 清理和内存管理
├── debug.ts              # 调试工具
├── index.ts              # 主入口（统一导出）
├── example.ts            # 使用示例
├── PROPERTY_SYSTEM.md    # 完整文档
└── README.md             # 本文件
```

## 🚀 快速开始

### 1. 初始化

```typescript
import { InitializeFullPropertySystem } from './systems/property_system';

InitializeFullPropertySystem({
	enableNetTableSync: true,
	enableAutoCleanup: true,
	autoCleanupInterval: 30,
	enableDebugCommands: true,
});
```

### 2. 注册属性

```typescript
import { RegisterPropertyConfig, PropertyScope, AggregationStrategy } from './systems/property_system';

RegisterPropertyConfig({
	id: 'health_bonus',
	scope: PropertyScope.UNIT,
	aggregation: AggregationStrategy.SUM,
	syncToClient: true,
	enableCache: true,
});
```

### 3. 添加属性

```typescript
import { AddStaticProperty, RegisterDynamicProperty } from './systems/property_system';

// 静态属性（固定值）
AddStaticProperty(modifier, 'health_bonus', 500);

// 动态属性（计算值）
RegisterDynamicProperty(modifier, 'attack_bonus', (params) => {
	return this.GetAbility().GetLevel() * 20;
}, 0);
```

### 4. 读取属性

```typescript
import { GetPropertyValue, PropertyScope } from './systems/property_system';

const health = GetPropertyValue(
	PropertyScope.UNIT,
	unit.GetEntityIndex(),
	'health_bonus'
);
```

### 5. 清理属性

```typescript
import { CleanupModifierProperties } from './systems/property_system';

// 在修饰符 OnDestroy 中
CleanupModifierProperties(this);
```

## 📖 完整文档

详细文档请参阅 [PROPERTY_SYSTEM.md](./PROPERTY_SYSTEM.md)，包含：

- 📋 核心概念详解
- 🔧 完整 API 参考
- 💡 最佳实践指南
- ⚡ 性能优化技巧
- 🐛 调试指南
- ❓ 常见问题解答
- 📝 完整代码示例

## 🎮 使用示例

查看 [example.ts](./example.ts) 获取完整的实用示例，包括：

- ⚔️ 装备系统
- 🔮 技能增益
- 👥 玩家光环
- 💰 金币/经验倍率
- 🎯 条件属性
- 📊 UI 集成

## 🛠️ API 概览

### 核心 API
- `InitializePropertySystem()` - 初始化系统
- `RegisterPropertyConfig()` - 注册属性配置
- `GetPropertyStorage()` - 获取存储容器
- `CleanupPropertyStorage()` - 清理存储

### 静态属性
- `AddStaticProperty()` - 添加静态属性
- `RemoveStaticProperty()` - 移除静态属性
- `UpdateStaticPropertyValue()` - 更新属性值
- `GetStaticPropertyValue()` - 获取静态值

### 动态属性
- `RegisterDynamicProperty()` - 注册回调
- `UnregisterDynamicProperty()` - 注销回调
- `GetDynamicPropertyValue()` - 获取动态值
- `ClearDynamicPropertyCache()` - 清除缓存

### 网表同步
- `InitializeNetTableSync()` - 初始化同步
- `SyncDirtyProperties()` - 同步脏数据
- `ForceSyncProperty()` - 强制同步
- `GetPropertyValue()` - 获取值（跨端）
- `ListenPropertyChange()` - 监听变化（客户端）

### 清理
- `CleanupModifierProperties()` - 清理修饰符
- `CleanupUnitProperties()` - 清理单位
- `CleanupPlayerProperties()` - 清理玩家
- `StartAutoCleanup()` - 启动自动清理

### 调试
- `PrintPropertyDebugInfo()` - 打印属性详情
- `PrintSystemStatus()` - 打印系统状态
- `PrintPerformanceStats()` - 打印性能统计
- `BenchmarkPropertyRead()` - 性能基准测试

## 🎯 核心概念

### 属性作用域

```typescript
PropertyScope.UNIT    // 单位属性 - 按 entindex 索引
PropertyScope.PLAYER  // 玩家属性 - 按 playerID 索引
```

### 属性类型

**静态属性**：
- 值在添加时确定
- 预计算总和，性能最优
- 适用于固定加成

**动态属性**：
- 通过回调函数计算
- 支持优先级和参数
- 适用于条件加成

### 聚合策略

```typescript
SUM       // 累加：10 + 20 = 30
MULTIPLY  // 乘法：1.1 * 1.2 = 1.32
MAX       // 最大值：max(10, 20) = 20
MIN       // 最小值：min(10, 20) = 10
FIRST     // 第一个有效值
LAST      // 最后一个有效值
CUSTOM    // 自定义聚合函数
```

## ⚡ 性能特性

- ✅ **静态属性预计算** - 只在值变化时重新计算
- ✅ **动态属性缓存** - 可配置的帧缓存
- ✅ **增量网表同步** - 只同步变化的属性
- ✅ **批量操作优化** - 减少遍历次数
- ✅ **自动清理无效引用** - 防止内存泄漏
- ✅ **性能统计追踪** - 监控缓存命中率

## 🧪 调试工具

### 控制台命令

```
script property_debug 0 123 health_bonus  # 调试指定属性
script property_status                     # 查看系统状态
script property_list                       # 列出所有属性
script property_reset_stats                # 重置统计
```

### 代码调试

```typescript
// 打印属性详情
PrintPropertyDebugInfo(PropertyScope.UNIT, unit.GetEntityIndex(), 'health_bonus');

// 打印系统状态
PrintSystemStatus();

// 性能基准测试
BenchmarkPropertyRead(PropertyScope.UNIT, entIndex, 'health_bonus', 1000);

// 内存使用
PrintMemoryUsage();
```

## 📊 性能指标

查看性能统计：

```typescript
PrintPerformanceStats();
```

输出示例：
```
=== Property System Performance Stats ===
Total Reads: 10000
Cache Hits: 9500 (95.00%)
Total Writes: 500
Sync Count: 150
Registered Properties: 20
Player Storages: 10
Unit Storages: 50
=========================================
```

## 🔧 最佳实践

1. **选择正确的属性类型**
   - 固定值 → 静态属性
   - 动态计算 → 动态属性

2. **始终清理属性**
   - 在 `OnDestroy` 中调用 `CleanupModifierProperties()`
   - 监听单位死亡事件清理

3. **合理设置缓存**
   - 高频读取 → 启用缓存
   - 实时变化 → 禁用缓存

4. **优化网表同步**
   - 设置同步优先级
   - 批量操作
   - 只同步必要属性

5. **监控性能**
   - 定期检查缓存命中率（目标 >90%）
   - 使用性能基准测试
   - 检查内存使用

## ⚠️ 注意事项

1. **网表大小限制** - CustomNetTables 有约8KB限制，建议同步属性 <100个
2. **类型安全** - 某些类型错误需要使用 `as any` 转换（TypeScript限制）
3. **Timer 工具** - 需要项目中存在 `Timers` 工具类
4. **Modifier 清理** - 必须在 `OnDestroy` 中清理属性

## 🤝 集成指南

### 与现有系统集成

```typescript
// 旧代码
function GetModifierAttackDamage(): number {
	return this.bonus_damage;
}

// 新代码（兼容）
function GetModifierAttackDamage(): number {
	return GetPropertyValue(
		PropertyScope.UNIT,
		this.GetParent().GetEntityIndex(),
		'attack_damage'
	) || this.bonus_damage;  // 回退到旧逻辑
}
```

### 客户端集成（Panorama）

```typescript
import { ListenPropertyChange, PropertyScope } from './systems/property_system';

ListenPropertyChange(
	PropertyScope.PLAYER,
	Players.GetLocalPlayer(),
	'gold_multiplier',
	(oldValue, newValue) => {
		// 更新 UI
		$('#gold-bonus').text = `+${((newValue! - 1) * 100).toFixed(0)}%`;
	}
);
```

## 📝 许可

本属性系统为开源项目的一部分。

## 🙋 支持

遇到问题？

1. 查阅 [完整文档](./PROPERTY_SYSTEM.md)
2. 查看 [使用示例](./example.ts)
3. 检查 [常见问题](#常见问题)
4. 使用调试工具排查

---

**Happy Coding! 🎮**
