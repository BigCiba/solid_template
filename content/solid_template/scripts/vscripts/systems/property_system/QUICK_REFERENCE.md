# 属性系统快速参考 (Quick Reference)

## 🚀 一分钟快速上手

```typescript
// 1. 初始化
import { InitializeFullPropertySystem } from './systems/property_system';
InitializeFullPropertySystem();

// 2. 注册属性
import { RegisterPropertyConfig, PropertyScope, AggregationStrategy } from './systems/property_system';
RegisterPropertyConfig({
	id: 'health_bonus',
	scope: PropertyScope.UNIT,
	aggregation: AggregationStrategy.SUM,
	syncToClient: true,
});

// 3. 添加属性
import { AddStaticProperty } from './systems/property_system';
AddStaticProperty(modifier, 'health_bonus', 500);

// 4. 读取属性
import { GetPropertyValue } from './systems/property_system';
const value = GetPropertyValue(PropertyScope.UNIT, unit.GetEntityIndex(), 'health_bonus');

// 5. 清理
import { CleanupModifierProperties } from './systems/property_system';
CleanupModifierProperties(modifier);
```

## 📚 常用 API

### 初始化

```typescript
InitializeFullPropertySystem(options?)
InitializePropertySystem()
RegisterPropertyConfig(config)
RegisterPropertyConfigs(configs[])
```

### 静态属性

```typescript
AddStaticProperty(modifier, propertyId, value, key?)
AddStaticProperties(modifier, properties[], key?)
RemoveStaticProperty(modifier, propertyId?, key?)
UpdateStaticPropertyValue(modifier, propertyId, newValue, key?)
GetStaticPropertyValue(scope, key, propertyId)
```

### 动态属性

```typescript
RegisterDynamicProperty(modifier, propertyId, callback, priority?, key?)
RegisterDynamicProperties(modifier, properties[], key?)
UnregisterDynamicProperty(modifier, propertyId?, key?)
GetDynamicPropertyValue(scope, key, propertyId, params?)
ClearDynamicPropertyCache(scope, key, propertyId?)
```

### 通用读取

```typescript
GetPropertyValue(scope, key, propertyId, params?)  // 服务器/客户端通用
```

### 清理

```typescript
CleanupModifierProperties(modifier, key?)
CleanupUnitProperties(unit)
CleanupPlayerProperties(playerID)
CleanupInvalidModifiers()
StartAutoCleanup(intervalSeconds?)
```

### 调试

```typescript
PrintPropertyDebugInfo(scope, key, propertyId, params?)
PrintAllProperties(scope, key)
PrintSystemStatus()
PrintPerformanceStats()
```

## 🎯 使用模式

### 修饰符模板

```typescript
class MyModifier extends CDOTA_Modifier_Lua {
	OnCreated(): void {
		if (IsServer()) {
			// 静态属性
			AddStaticProperty(this, 'property_id', value);
			
			// 动态属性
			RegisterDynamicProperty(this, 'property_id', (params) => {
				return this.CalculateValue();
			}, priority);
		}
	}

	OnDestroy(): void {
		if (IsServer()) {
			CleanupModifierProperties(this);
		}
	}

	DeclareFunctions(): ModifierFunction[] {
		return [/* ... */];
	}

	GetModifierXXX(): number {
		return GetPropertyValue(
			PropertyScope.UNIT,
			this.GetParent().GetEntityIndex(),
			'property_id'
		);
	}
}
```

### 配置模板

```typescript
RegisterPropertyConfig({
	id: 'property_name',               // 必需：属性唯一ID
	scope: PropertyScope.UNIT,         // 必需：UNIT 或 PLAYER
	valueType: PropertyValueType.NUMBER, // 可选：NUMBER, PERCENTAGE, BOOLEAN
	aggregation: AggregationStrategy.SUM, // 必需：聚合策略
	defaultValue: 0,                   // 可选：默认值
	syncToClient: true,                // 可选：是否同步到客户端
	syncPriority: 10,                  // 可选：同步优先级（越小越优先）
	enableCache: true,                 // 可选：是否启用缓存
	cacheDuration: 30,                 // 可选：缓存持续帧数
});
```

## 🔧 枚举值

### PropertyScope

```typescript
PropertyScope.UNIT    // 0 - 单位属性（按 entindex 索引）
PropertyScope.PLAYER  // 1 - 玩家属性（按 playerID 索引）
```

### PropertyValueType

```typescript
PropertyValueType.NUMBER      // 0 - 数值
PropertyValueType.PERCENTAGE  // 1 - 百分比
PropertyValueType.BOOLEAN     // 2 - 布尔
PropertyValueType.CUSTOM      // 3 - 自定义
```

### AggregationStrategy

```typescript
AggregationStrategy.SUM       // 0 - 累加
AggregationStrategy.MULTIPLY  // 1 - 乘法
AggregationStrategy.MAX       // 2 - 最大值
AggregationStrategy.MIN       // 3 - 最小值
AggregationStrategy.FIRST     // 4 - 第一个有效值
AggregationStrategy.LAST      // 5 - 最后一个有效值
AggregationStrategy.CUSTOM    // 6 - 自定义聚合函数
```

## 💡 最佳实践速查

### ✅ 正确做法

```typescript
// 使用静态属性处理固定值
AddStaticProperty(modifier, 'health', 500);

// 批量操作
AddStaticProperties(modifier, [
	{ propertyId: 'health', value: 500 },
	{ propertyId: 'damage', value: 50 },
]);

// 在 OnDestroy 中清理
CleanupModifierProperties(this);

// 启用缓存提升性能
RegisterPropertyConfig({
	id: 'my_property',
	enableCache: true,
	cacheDuration: 30,
	// ...
});
```

### ❌ 错误做法

```typescript
// 静态值使用动态属性（浪费性能）
RegisterDynamicProperty(modifier, 'health', () => 500);

// 逐个添加（触发多次计算）
AddStaticProperty(modifier, 'health', 500);
AddStaticProperty(modifier, 'damage', 50);
AddStaticProperty(modifier, 'armor', 10);

// 忘记清理
OnDestroy(): void {
	// 没有调用 CleanupModifierProperties(this)
}

// 高频读取不启用缓存
RegisterPropertyConfig({
	id: 'frequently_read',
	enableCache: false,  // ❌
	// ...
});
```

## 🐛 调试速查

### 控制台命令

```bash
# 调试指定属性
script property_debug 0 123 health_bonus

# 查看系统状态
script property_status

# 列出所有已注册属性
script property_list

# 重置性能统计
script property_reset_stats
```

### 代码调试

```typescript
// 调试单个属性
PrintPropertyDebugInfo(
	PropertyScope.UNIT,
	unit.GetEntityIndex(),
	'health_bonus'
);

// 调试所有属性
PrintAllProperties(
	PropertyScope.UNIT,
	unit.GetEntityIndex()
);

// 查看性能
PrintPerformanceStats();

// 内存使用
PrintMemoryUsage();

// 性能测试
BenchmarkPropertyRead(
	PropertyScope.UNIT,
	entIndex,
	'health_bonus',
	1000  // 迭代次数
);
```

## 📊 性能指标

### 缓存命中率

```typescript
const hitRate = GetCacheHitRate();

// 目标值：
// > 90% : 优秀 ✅
// 70-90% : 良好 ⚠️
// < 70% : 需优化 ❌
```

### 性能统计

```typescript
PropertySystem.stats = {
	totalReads: 10000,     // 总读取次数
	cacheHits: 9500,       // 缓存命中次数
	totalWrites: 500,      // 总写入次数
	syncCount: 150,        // 网表同步次数
}
```

## 🎨 使用场景

| 场景 | 作用域 | 类型 | 聚合策略 | 示例 |
|------|--------|------|----------|------|
| 装备属性 | UNIT | 静态 | SUM | +500 生命值 |
| 技能加成 | UNIT | 动态 | SUM | 每级 +20 攻击力 |
| 百分比加成 | UNIT | 静态/动态 | MULTIPLY | +25% 攻击速度 |
| 金币倍率 | PLAYER | 静态 | MULTIPLY | 金币 x1.5 |
| 经验倍率 | PLAYER | 静态 | MULTIPLY | 经验 x2.0 |
| 条件加成 | UNIT | 动态 | SUM | 低血时 +100 攻击 |
| 光环效果 | PLAYER | 静态 | SUM | 队伍光环 |

## 🔗 相关文档

- **完整文档**: [PROPERTY_SYSTEM.md](./PROPERTY_SYSTEM.md)
- **架构说明**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **使用示例**: [example.ts](./example.ts)
- **README**: [README.md](./README.md)

## 📞 快速帮助

**遇到问题？按顺序检查：**

1. ✅ 属性是否已注册？ → `property_list`
2. ✅ 修饰符是否有效？ → `IsValid(modifier)`
3. ✅ 是否忘记清理？ → `CleanupModifierProperties()`
4. ✅ 缓存命中率如何？ → `GetCacheHitRate()`
5. ✅ 网表是否同步？ → `GetNetTableSyncStatus()`

**常见错误码：**
- `Property XXX not registered` → 调用 `RegisterPropertyConfig()`
- `Invalid modifier` → 检查 modifier 有效性
- 客户端看不到值 → 设置 `syncToClient: true`
- 性能问题 → 启用缓存、批量操作

---

**最后更新**: 2025-11-05

**版本**: 1.0.0

**状态**: ✅ 生产就绪
