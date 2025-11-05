# 属性系统文档 (Property System)

## 📋 目录

- [概述](#概述)
- [核心概念](#核心概念)
- [快速开始](#快速开始)
- [API 参考](#api-参考)
- [最佳实践](#最佳实践)
- [性能优化](#性能优化)
- [调试指南](#调试指南)
- [常见问题](#常见问题)

---

## 概述

### 什么是属性系统？

属性系统是一个高性能、可扩展的属性管理框架，用于管理 Dota 2 自定义游戏中的单位/玩家属性。它提供了：

- ✅ **双作用域**：支持单位属性和玩家属性
- ✅ **双类型**：静态属性（预计算）和动态属性（回调）
- ✅ **自动同步**：服务器到客户端的网表同步
- ✅ **缓存优化**：多层缓存策略提升性能
- ✅ **内存安全**：自动清理防止泄漏
- ✅ **调试友好**：完整的调试工具和性能分析

### 为什么需要属性系统？

原生 Dota 2 修饰符系统存在以下限制：

1. **属性有限**：只能使用预定义的 modifier properties
2. **作用域单一**：只能绑定到单个单位
3. **性能问题**：频繁调用 GetModifierProperty* 函数
4. **难以调试**：缺乏可视化工具

属性系统解决了这些问题，提供了更灵活、高效的解决方案。

---

## 核心概念

### 1. 属性作用域 (PropertyScope)

```typescript
enum PropertyScope {
	UNIT = 0,    // 单位属性 - 按 entindex 索引
	PLAYER = 1,  // 玩家属性 - 按 playerID 索引
}
```

**示例场景**：
- **单位属性**：生命值加成、护甲加成、移动速度
- **玩家属性**：金币加成倍率、经验加成、队伍光环

### 2. 属性类型

#### 静态属性 (Static Property)

- **特点**：值在添加时确定，不会变化
- **优势**：预计算总和，读取速度快
- **适用**：固定数值加成（如 +100 生命值）

```typescript
// 添加静态属性
AddStaticProperty(modifier, "health_bonus", 100);
```

#### 动态属性 (Dynamic Property)

- **特点**：通过回调函数计算，可根据游戏状态变化
- **优势**：灵活，支持优先级和参数
- **适用**：条件加成（如"每级 +10 攻击力"）

```typescript
// 注册动态属性
RegisterDynamicProperty(modifier, "attack_bonus", (params) => {
	return this.GetAbility().GetLevel() * 10;
}, priority);
```

### 3. 聚合策略 (AggregationStrategy)

定义多个修饰符如何合并属性值：

```typescript
enum AggregationStrategy {
	SUM,        // 累加（默认）：10 + 20 = 30
	MULTIPLY,   // 乘法：1.1 * 1.2 = 1.32
	MAX,        // 最大值：max(10, 20) = 20
	MIN,        // 最小值：min(10, 20) = 10
	FIRST,      // 第一个有效值
	LAST,       // 最后一个有效值
	CUSTOM,     // 自定义聚合函数
}
```

### 4. 网表同步

属性系统使用 CustomNetTables 将服务器数据同步到客户端：

- ✅ **增量同步**：只同步变化的属性
- ✅ **批量更新**：减少网表写入次数
- ✅ **优先级控制**：重要属性优先同步
- ✅ **大小限制**：自动处理网表容量问题

---

## 快速开始

### 步骤 1：初始化系统

在 `addon_game_mode.lua` 或初始化脚本中：

```typescript
import { InitializeFullPropertySystem } from './systems/property_system';

// 在游戏开始时初始化
InitializeFullPropertySystem({
	enableNetTableSync: true,      // 启用网表同步
	enableAutoCleanup: true,        // 启用自动清理
	autoCleanupInterval: 30,        // 每30秒清理一次
	enableDebugCommands: true,      // 启用调试命令
});
```

### 步骤 2：注册属性配置

```typescript
import { RegisterPropertyConfig, PropertyScope, PropertyValueType, AggregationStrategy } from './systems/property_system';

// 注册属性：生命值加成
RegisterPropertyConfig({
	id: 'health_bonus',
	scope: PropertyScope.UNIT,
	valueType: PropertyValueType.NUMBER,
	aggregation: AggregationStrategy.SUM,
	defaultValue: 0,
	syncToClient: true,
	enableCache: true,
});

// 注册属性：经验倍率（玩家级别）
RegisterPropertyConfig({
	id: 'exp_multiplier',
	scope: PropertyScope.PLAYER,
	valueType: PropertyValueType.PERCENTAGE,
	aggregation: AggregationStrategy.MULTIPLY,
	defaultValue: 1.0,
	syncToClient: true,
	syncPriority: 10,  // 高优先级
});
```

### 步骤 3：在修饰符中使用

```typescript
class modifier_item_heart_custom extends BaseModifier {
	OnCreated(): void {
		if (IsServer()) {
			// 添加静态属性：+500 生命值
			AddStaticProperty(this, 'health_bonus', 500);
		}
	}

	OnDestroy(): void {
		if (IsServer()) {
			// 自动清理（或手动调用）
			CleanupModifierProperties(this);
		}
	}
}
```

### 步骤 4：读取属性值

```typescript
import { GetPropertyValue, PropertyScope } from './systems/property_system';

// 获取单位的生命值加成
const unit: CDOTA_BaseNPC = ...;
const healthBonus = GetPropertyValue(
	PropertyScope.UNIT,
	unit.GetEntityIndex(),
	'health_bonus'
);

// 获取玩家的经验倍率
const playerID = unit.GetPlayerOwnerID();
const expMultiplier = GetPropertyValue(
	PropertyScope.PLAYER,
	playerID,
	'exp_multiplier'
);
```

---

## API 参考

### 核心 API

#### `InitializePropertySystem()`
初始化属性系统的核心数据结构。

#### `RegisterPropertyConfig(config: PropertyConfig)`
注册一个属性配置。

**参数**：
```typescript
interface PropertyConfig {
	id: string;                      // 属性唯一ID
	scope: PropertyScope;            // 作用域
	valueType: PropertyValueType;    // 值类型
	aggregation: AggregationStrategy; // 聚合策略
	customAggregator?: CustomAggregator;
	defaultValue?: number;
	syncToClient?: boolean;          // 是否同步到客户端
	syncPriority?: number;           // 同步优先级
	enableCache?: boolean;           // 是否启用缓存
	cacheDuration?: number;          // 缓存持续帧数
}
```

### 静态属性 API

#### `AddStaticProperty(modifier, propertyId, value, key?)`
添加静态属性。

**示例**：
```typescript
AddStaticProperty(modifier, 'attack_damage', 50);
```

#### `RemoveStaticProperty(modifier, propertyId?, key?)`
移除静态属性。

#### `UpdateStaticPropertyValue(modifier, propertyId, newValue, key?)`
更新静态属性的值（不改变修饰符列表）。

### 动态属性 API

#### `RegisterDynamicProperty(modifier, propertyId, callback, priority?, key?)`
注册动态属性回调。

**示例**：
```typescript
RegisterDynamicProperty(
	modifier,
	'attack_damage',
	(params) => {
		const ability = this.GetAbility();
		return ability ? ability.GetLevel() * 20 : 0;
	},
	0  // 优先级
);
```

#### `UnregisterDynamicProperty(modifier, propertyId?, key?)`
注销动态属性。

#### `ClearDynamicPropertyCache(scope, key, propertyId?)`
清除动态属性缓存。

### 网表同步 API

#### `GetPropertyValue(scope, key, propertyId, params?)`
获取属性值（服务器端计算，客户端从网表读取）。

#### `ForceSyncProperty(scope, key, propertyId)`
强制立即同步指定属性。

#### `ListenPropertyChange(scope, key, propertyId, callback)`
客户端监听属性变化。

**示例（客户端）**：
```typescript
ListenPropertyChange(
	PropertyScope.PLAYER,
	Players.GetLocalPlayer(),
	'exp_multiplier',
	(oldValue, newValue) => {
		$.Msg(`EXP multiplier changed: ${oldValue} -> ${newValue}`);
	}
);
```

### 清理 API

#### `CleanupModifierProperties(modifier, key?)`
清理修饰符的所有属性（在 OnDestroy 时调用）。

#### `CleanupUnitProperties(unit)`
清理单位的所有属性（在单位死亡/移除时调用）。

#### `CleanupPlayerProperties(playerID)`
清理玩家的所有属性（在玩家断开时调用）。

#### `StartAutoCleanup(intervalSeconds)`
启动自动清理定时器。

### 调试 API

#### `PrintPropertyDebugInfo(scope, key, propertyId, params?)`
打印属性的详细调试信息。

**输出示例**：
```
=== Property Debug Info ===
Property: health_bonus
Scope: UNIT (Key: 123)
Total Value: 650

Static Contributions (2):
  - modifier_item_heart: 500 (added: 10.50s)
  - modifier_item_reaver: 150 (added: 15.20s)

Dynamic Contributions (1):
  - modifier_ability_str_bonus: 100 (priority: 0, added: 5.00s)

Cache Status:
  - Enabled: true
  - Cached: true
  - Frame: 1500
  - Age: 0 frames
===========================
```

#### `PrintSystemStatus()`
打印系统状态和性能统计。

#### `RegisterDebugCommands()`
注册控制台调试命令。

**可用命令**：
- `property_debug <scope> <key> <propertyId>` - 调试指定属性
- `property_status` - 查看系统状态
- `property_list` - 列出所有已注册属性
- `property_reset_stats` - 重置性能统计

---

## 最佳实践

### 1. 选择合适的属性类型

#### 使用静态属性的场景：
✅ 固定数值加成（装备提供的属性）
✅ 不依赖游戏状态的加成
✅ 需要频繁读取的属性

#### 使用动态属性的场景：
✅ 依赖技能等级的加成
✅ 条件触发的加成（如"低于30%生命时"）
✅ 需要传递参数的计算

**示例**：
```typescript
// ❌ 错误：静态值使用动态属性（浪费性能）
RegisterDynamicProperty(modifier, 'health', () => 100);

// ✅ 正确：静态值使用静态属性
AddStaticProperty(modifier, 'health', 100);

// ✅ 正确：动态计算使用动态属性
RegisterDynamicProperty(modifier, 'health', (params) => {
	const level = this.GetAbility().GetLevel();
	return level * 50;
});
```

### 2. 优先级管理

优先级数字越小越优先执行。合理设置优先级可以确保计算顺序：

```typescript
// 基础值（优先级最低）
RegisterDynamicProperty(modifier, 'damage', () => 100, 100);

// 百分比加成（中等优先级）
RegisterDynamicProperty(modifier, 'damage', (params) => {
	return params.baseDamage * 0.2;  // +20%
}, 50);

// 最终加成（高优先级）
RegisterDynamicProperty(modifier, 'damage', () => 50, 10);
```

### 3. 缓存策略

根据属性的更新频率选择缓存持续时间：

```typescript
// 高频读取，低频变化 - 长缓存
RegisterPropertyConfig({
	id: 'max_health',
	enableCache: true,
	cacheDuration: 30,  // 缓存30帧（约1秒）
	// ...
});

// 实时变化 - 无缓存
RegisterPropertyConfig({
	id: 'current_health_percent',
	enableCache: false,
	// ...
});
```

### 4. 内存管理

**始终在修饰符销毁时清理**：

```typescript
class MyModifier extends BaseModifier {
	OnDestroy(): void {
		if (IsServer()) {
			// 方法1：清理所有属性
			CleanupModifierProperties(this);

			// 方法2：只清理特定属性
			RemoveStaticProperty(this, 'health_bonus');
			UnregisterDynamicProperty(this, 'attack_bonus');
		}
	}
}
```

**监听单位移除事件**：

```typescript
ListenToGameEvent('entity_killed', (event) => {
	const unit = EntIndexToHScript(event.entindex_killed) as CDOTA_BaseNPC;
	if (unit) {
		CleanupUnitProperties(unit);
	}
}, null);
```

### 5. 网表同步优化

**设置同步优先级**：

```typescript
// 重要属性 - 高优先级
RegisterPropertyConfig({
	id: 'gold_multiplier',
	syncPriority: 1,  // 最高优先级
	// ...
});

// 次要属性 - 低优先级
RegisterPropertyConfig({
	id: 'cosmetic_glow',
	syncPriority: 100,
	// ...
});
```

**批量同步**：

```typescript
// ❌ 错误：逐个强制同步（触发多次网表写入）
ForceSyncProperty(scope, key, 'prop1');
ForceSyncProperty(scope, key, 'prop2');
ForceSyncProperty(scope, key, 'prop3');

// ✅ 正确：批量同步
ForceSyncProperties([
	{ scope, key, propertyId: 'prop1' },
	{ scope, key, propertyId: 'prop2' },
	{ scope, key, propertyId: 'prop3' },
]);
```

---

## 性能优化

### 1. 读取优化

**避免高频调用**：

```typescript
// ❌ 错误：每帧读取
function OnThink(): void {
	const damage = GetPropertyValue(scope, key, 'attack_damage');
	// ...
}

// ✅ 正确：缓存结果，只在变化时更新
private cachedDamage: number = 0;

function OnCreated(): void {
	this.cachedDamage = GetPropertyValue(scope, key, 'attack_damage');
	
	// 监听变化
	ListenPropertyChange(scope, key, 'attack_damage', (old, new) => {
		this.cachedDamage = new!;
	});
}
```

### 2. 写入优化

**批量添加属性**：

```typescript
// ✅ 批量添加静态属性
AddStaticProperties(modifier, [
	{ propertyId: 'health', value: 500 },
	{ propertyId: 'mana', value: 300 },
	{ propertyId: 'armor', value: 10 },
]);

// ✅ 批量注册动态属性
RegisterDynamicProperties(modifier, [
	{ propertyId: 'damage', callback: () => this.GetDamage(), priority: 0 },
	{ propertyId: 'attack_speed', callback: () => this.GetAttackSpeed(), priority: 0 },
]);
```

### 3. 缓存命中率

监控缓存性能：

```typescript
// 打印性能统计
PrintPerformanceStats();

// 输出：
// Total Reads: 10000
// Cache Hits: 9500 (95.00%)
// Total Writes: 500
```

**目标缓存命中率**：
- 🎯 **>90%**: 优秀
- ⚠️ **70-90%**: 良好
- ❌ **<70%**: 需要优化缓存策略

---

## 调试指南

### 1. 基础调试

```typescript
// 调试单个属性
PrintPropertyDebugInfo(
	PropertyScope.UNIT,
	unit.GetEntityIndex(),
	'health_bonus'
);

// 调试单位所有属性
PrintAllProperties(
	PropertyScope.UNIT,
	unit.GetEntityIndex()
);

// 查看系统状态
PrintSystemStatus();
```

### 2. 控制台命令

在游戏内控制台执行：

```
script property_debug 0 123 health_bonus
script property_status
script property_list
script property_reset_stats
```

### 3. 性能分析

```typescript
// 基准测试
BenchmarkPropertyRead(
	PropertyScope.UNIT,
	unit.GetEntityIndex(),
	'health_bonus',
	1000  // 迭代次数
);

// 内存使用估算
PrintMemoryUsage();
```

### 4. 常见问题排查

#### 问题：属性值不正确

**检查清单**：
1. 属性是否已注册？`property_list`
2. 修饰符是否有效？检查 `IsValid(modifier)`
3. 聚合策略是否正确？检查 `AggregationStrategy`
4. 调试属性贡献：`PrintPropertyDebugInfo()`

#### 问题：客户端看不到属性值

**检查清单**：
1. `syncToClient` 是否为 `true`？
2. 网表是否正常同步？`GetNetTableSyncStatus()`
3. 客户端是否使用正确的 API？使用 `GetPropertyValueFromNetTable()`

#### 问题：性能问题

**检查清单**：
1. 缓存命中率？`GetCacheHitRate()`
2. 是否频繁清除缓存？
3. 动态属性回调是否有性能问题？
4. 是否有内存泄漏？`CleanupInvalidModifiers()`

---

## 常见问题

### Q: 静态属性和动态属性可以混用吗？

A: 可以！同一个属性ID可以同时有静态和动态贡献者，系统会自动合并：

```typescript
// 静态：基础值
AddStaticProperty(modifier1, 'damage', 100);

// 动态：等级加成
RegisterDynamicProperty(modifier2, 'damage', () => level * 10);

// 最终值 = 100 + (level * 10)
```

### Q: 如何实现百分比加成？

A: 使用 `MULTIPLY` 聚合策略：

```typescript
RegisterPropertyConfig({
	id: 'damage_multiplier',
	aggregation: AggregationStrategy.MULTIPLY,
	defaultValue: 1.0,  // 基础为1.0（100%）
	// ...
});

// 添加 +20% 加成
AddStaticProperty(modifier, 'damage_multiplier', 1.2);

// 添加 +50% 加成
AddStaticProperty(modifier, 'damage_multiplier', 1.5);

// 最终 = 1.0 * 1.2 * 1.5 = 1.8 (180%)
```

### Q: 如何实现条件属性？

A: 使用动态属性的参数传递：

```typescript
RegisterDynamicProperty(modifier, 'bonus_damage', (params) => {
	const unit = params?.unit as CDOTA_BaseNPC;
	if (unit && unit.GetHealthPercent() < 30) {
		return 100;  // 低于30%生命时 +100 攻击力
	}
	return 0;
});

// 读取时传递参数
const damage = GetDynamicPropertyValue(scope, key, 'bonus_damage', { unit });
```

### Q: 如何优化网表同步？

A: 三种策略：
1. **只同步必要属性**：设置 `syncToClient: false`
2. **设置优先级**：重要属性设置低 `syncPriority`
3. **减少同步频率**：增加 `SYNC_INTERVAL`

### Q: 系统支持多少个属性？

A: 理论上无限制，但受网表大小限制（约8KB）。建议：
- 同步到客户端的属性：<100个
- 仅服务器的属性：无限制

### Q: 如何迁移现有代码？

A: 逐步迁移策略：

```typescript
// 旧代码
function GetModifierAttackDamage(): number {
	return this.GetAbility().GetSpecialValueFor('bonus_damage');
}

// 新代码（兼容）
function GetModifierAttackDamage(): number {
	// 优先使用属性系统
	const propertyValue = GetPropertyValue(
		PropertyScope.UNIT,
		this.GetParent().GetEntityIndex(),
		'attack_damage'
	);
	
	// 回退到旧逻辑
	return propertyValue || this.GetAbility().GetSpecialValueFor('bonus_damage');
}
```

---

## 完整示例

### 示例1：装备系统

```typescript
// 注册属性
RegisterPropertyConfigs([
	{
		id: 'bonus_health',
		scope: PropertyScope.UNIT,
		valueType: PropertyValueType.NUMBER,
		aggregation: AggregationStrategy.SUM,
		syncToClient: true,
		enableCache: true,
	},
	{
		id: 'bonus_damage',
		scope: PropertyScope.UNIT,
		valueType: PropertyValueType.NUMBER,
		aggregation: AggregationStrategy.SUM,
		syncToClient: true,
		enableCache: true,
	},
]);

// 装备修饰符
class modifier_item_sword extends BaseModifier {
	OnCreated(): void {
		if (IsServer()) {
			AddStaticProperties(this, [
				{ propertyId: 'bonus_health', value: 200 },
				{ propertyId: 'bonus_damage', value: 50 },
			]);
		}
	}

	OnDestroy(): void {
		if (IsServer()) {
			CleanupModifierProperties(this);
		}
	}
}

// 使用属性
function ApplyBonuses(unit: CDOTA_BaseNPC): void {
	const health = GetPropertyValue(
		PropertyScope.UNIT,
		unit.GetEntityIndex(),
		'bonus_health'
	);
	
	const damage = GetPropertyValue(
		PropertyScope.UNIT,
		unit.GetEntityIndex(),
		'bonus_damage'
	);
	
	unit.SetBaseMaxHealth(unit.GetBaseMaxHealth() + health);
	unit.SetBaseDamageMax(unit.GetBaseDamageMax() + damage);
}
```

### 示例2：队伍光环系统

```typescript
// 注册玩家级别属性
RegisterPropertyConfig({
	id: 'team_gold_bonus',
	scope: PropertyScope.PLAYER,
	valueType: PropertyValueType.PERCENTAGE,
	aggregation: AggregationStrategy.MULTIPLY,
	defaultValue: 1.0,
	syncToClient: true,
	syncPriority: 5,
});

// 光环修饰符
class modifier_team_gold_aura extends BaseModifier {
	OnCreated(): void {
		if (IsServer()) {
			// 为队伍所有玩家添加属性
			const team = this.GetParent().GetTeamNumber();
			for (let i = 0; i < DOTA_MAX_TEAM_PLAYERS; i++) {
				const player = PlayerResource.GetPlayer(i);
				if (player && PlayerResource.GetTeam(i) === team) {
					AddStaticProperty(this, 'team_gold_bonus', 1.2, i);
				}
			}
		}
	}

	OnDestroy(): void {
		if (IsServer()) {
			// 清理所有玩家的属性
			for (let i = 0; i < DOTA_MAX_TEAM_PLAYERS; i++) {
				RemoveStaticProperty(this, 'team_gold_bonus', i);
			}
		}
	}
}

// 金币过滤器
function GoldFilter(event: GoldFilterEvent): boolean {
	const playerID = event.player_id_const;
	const multiplier = GetPropertyValue(
		PropertyScope.PLAYER,
		playerID,
		'team_gold_bonus'
	);
	
	event.gold = Math.floor(event.gold * multiplier);
	return true;
}
```

---

## 总结

属性系统提供了一个强大、灵活、高性能的属性管理解决方案。通过合理使用静态/动态属性、缓存策略和清理机制，你可以构建复杂的游戏系统而不用担心性能和内存问题。

**记住这些关键点**：
- ✅ 静态属性用于固定值，动态属性用于计算值
- ✅ 始终清理修饰符和单位的属性
- ✅ 监控缓存命中率和性能统计
- ✅ 合理设置网表同步优先级
- ✅ 使用调试工具排查问题

祝你开发愉快！🎮
