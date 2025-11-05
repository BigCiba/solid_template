# 属性系统架构说明

## 系统架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         Property System                          │
│                      (属性系统主入口)                            │
└───────────┬─────────────────────────────────────────┬───────────┘
            │                                         │
            ▼                                         ▼
┌───────────────────────┐               ┌────────────────────────┐
│    Core Module        │               │   Types Definition     │
│    (核心模块)         │               │   (类型定义)           │
│                       │               │                        │
│ - Initialize          │               │ - PropertyScope        │
│ - Register Config     │               │ - PropertyConfig       │
│ - Storage Management  │               │ - DynamicCallback      │
│ - Aggregation         │               │ - PropertyStorage      │
└───────┬───────────────┘               └────────────────────────┘
        │
        ├─────────────┬─────────────┬─────────────┬─────────────┐
        │             │             │             │             │
        ▼             ▼             ▼             ▼             ▼
┌─────────────┐ ┌──────────┐ ┌─────────┐ ┌─────────┐ ┌───────────┐
│   Static    │ │ Dynamic  │ │NetTable │ │ Cleanup │ │   Debug   │
│ Properties  │ │Properties│ │  Sync   │ │         │ │           │
│ (静态属性)  │ │(动态属性)│ │(网表同步)│ │(清理)   │ │(调试工具) │
└─────────────┘ └──────────┘ └─────────┘ └─────────┘ └───────────┘
      │               │            │          │            │
      └───────────────┴────────────┴──────────┴────────────┘
                             │
                             ▼
                 ┌───────────────────────┐
                 │   PropertyStorage     │
                 │   (属性存储容器)      │
                 │                       │
                 │ - static: Map         │
                 │ - dynamic: Map        │
                 │ - staticCache: Map    │
                 │ - runtimeCache: Map   │
                 └───────────────────────┘
```

## 数据流图

### 添加属性流程

```
Modifier
   │
   ├─ AddStaticProperty(modifier, id, value)
   │     │
   │     ├─ 1. ValidateProperty(id)
   │     ├─ 2. GetPropertyStorage(scope, key)
   │     ├─ 3. Add to propertyList[]
   │     ├─ 4. RecalculateStaticProperty()
   │     │     └─ staticCache.set(id, totalValue)
   │     └─ 5. MarkDirty() → 触发网表同步
   │
   └─ RegisterDynamicProperty(modifier, id, callback, priority)
         │
         ├─ 1. ValidateProperty(id)
         ├─ 2. GetPropertyStorage(scope, key)
         ├─ 3. Add to propertyList[]
         ├─ 4. Sort by priority
         └─ 5. ClearCache() + MarkDirty()
```

### 读取属性流程

```
GetPropertyValue(scope, key, id, params)
   │
   ├─ IsServer?
   │   │
   │   ├─ Yes (Server)
   │   │    │
   │   │    ├─ 1. GetStaticPropertyValue()
   │   │    │     └─ Read from staticCache
   │   │    │
   │   │    ├─ 2. GetDynamicPropertyValue()
   │   │    │     │
   │   │    │     ├─ Check runtimeCache
   │   │    │     │   ├─ Hit → Return cached value
   │   │    │     │   └─ Miss → Calculate
   │   │    │     │
   │   │    │     └─ For each callback:
   │   │    │           └─ value = callback(params)
   │   │    │
   │   │    └─ 3. Aggregate(staticValue, dynamicValue)
   │   │
   │   └─ No (Client)
   │        └─ GetPropertyValueFromNetTable()
   │              └─ Read from CustomNetTables
   │
   └─ Return final value
```

### 网表同步流程

```
Server (每 0.1秒)
   │
   ├─ SyncDirtyProperties()
   │     │
   │     ├─ 1. 收集 dirtyKeys Set
   │     ├─ 2. 按 syncPriority 排序
   │     ├─ 3. 分批处理 (MAX_SYNC_PER_BATCH)
   │     │     │
   │     │     └─ For each batch:
   │     │           ├─ GetPropertyValue() for each key
   │     │           └─ CustomNetTables.SetTableValue()
   │     │
   │     └─ 4. Clear dirtyKeys
   │
   └─ Network ────────────────────────────┐
                                          │
Client                                    │
   │                                      │
   ├─ CustomNetTables.SubscribeListener() ◄┘
   │     │
   │     └─ OnTableChanged(key, value)
   │           └─ Trigger callback(oldValue, newValue)
   │
   └─ GetPropertyValueFromNetTable(scope, key, id)
         └─ Return value from NetTable
```

## 内存布局

### 全局存储结构

```
PropertySystem (Global)
├── configs: Map<string, PropertyConfig>
│     └── "health_bonus" → {id, scope, aggregation, ...}
│     └── "attack_damage" → {id, scope, aggregation, ...}
│
├── playerStorage: Map<PlayerID, PropertyStorage>
│     └── PlayerID(0) → PropertyStorage {
│           ├── static: Map<"gold_multiplier", [...modifiers]>
│           ├── dynamic: Map<"exp_multiplier", [...modifiers]>
│           ├── staticCache: Map<"gold_multiplier", 1.5>
│           └── runtimeCache: Map<"exp_multiplier", {value, frame}>
│         }
│
├── unitStorage: Map<EntityIndex, PropertyStorage>
│     └── EntityIndex(123) → PropertyStorage {
│           ├── static: Map<"health_bonus", [
│           │     {modifier1, value: 500, addedTime: 10.5},
│           │     {modifier2, value: 300, addedTime: 15.2}
│           │   ]>
│           ├── dynamic: Map<"attack_bonus", [
│           │     {modifier3, callback, priority: 0, addedTime: 5.0}
│           │   ]>
│           ├── staticCache: Map<"health_bonus", 800>
│           └── runtimeCache: Map<"attack_bonus", {value: 50, frame: 1500}>
│         }
│
├── dirtyKeys: Set<string>
│     └── "0_123_health_bonus"  # scope_key_propertyId
│     └── "1_0_gold_multiplier"
│
└── stats: {
      totalReads: 10000,
      cacheHits: 9500,
      totalWrites: 500,
      syncCount: 150
    }
```

### PropertyStorage 详细结构

```
PropertyStorage {
  static: Map<PropertyId, StaticPropertyData[]>
    └── StaticPropertyData {
          modifier: CDOTA_Modifier_Lua  // 修饰符实例
          value: number                 // 属性值
          addedTime: number            // 添加时间
        }
  
  dynamic: Map<PropertyId, DynamicPropertyData[]>
    └── DynamicPropertyData {
          modifier: CDOTA_Modifier_Lua  // 修饰符实例
          callback: Function            // 回调函数
          priority: number             // 优先级
          addedTime: number           // 添加时间
        }
  
  staticCache: Map<PropertyId, number>
    └── 预计算的静态属性总和
  
  runtimeCache: Map<PropertyId, PropertyCacheData>
    └── PropertyCacheData {
          value: number    // 缓存的值
          frame: number   // 缓存的帧号
          time: number   // 缓存的时间
        }
}
```

## 执行时序图

### 添加和读取属性的完整流程

```
Time →

T0: 游戏初始化
    InitializeFullPropertySystem()
    RegisterPropertyConfig("health_bonus", ...)

T1: 单位获得装备
    unit.AddNewModifier(hero, item, "modifier_item_sword", {})
      └─ modifier.OnCreated()
           └─ AddStaticProperty(this, "health_bonus", 500)
                ├─ storage.static["health_bonus"].push({modifier, 500})
                ├─ storage.staticCache["health_bonus"] = 500
                └─ dirtyKeys.add("0_123_health_bonus")

T2: 定时器触发同步 (0.1秒后)
    SyncDirtyProperties()
      └─ CustomNetTables.SetTableValue("property_system", {
           "0_123_health_bonus": 500
         })

T3: 客户端接收同步
    OnNetTableChanged()
      └─ callback(undefined, 500)
           └─ Update UI

T4: 服务器读取属性
    GetPropertyValue(UNIT, 123, "health_bonus")
      └─ staticCache.get("health_bonus")
           └─ Return 500 (缓存命中)

T5: 单位获得第二件装备
    AddStaticProperty(modifier2, "health_bonus", 300)
      └─ RecalculateStaticProperty()
           ├─ Aggregate: 500 + 300 = 800
           ├─ staticCache["health_bonus"] = 800
           └─ dirtyKeys.add("0_123_health_bonus")

T6: 同步更新值
    SyncDirtyProperties()
      └─ CustomNetTables.SetTableValue({
           "0_123_health_bonus": 800
         })

T7: 修饰符销毁
    modifier.OnDestroy()
      └─ CleanupModifierProperties(this)
           ├─ RemoveStaticProperty()
           ├─ RecalculateStaticProperty()  # 重新计算：现在只有300
           └─ dirtyKeys.add("0_123_health_bonus")
```

## 性能优化点

### 1. 缓存层次

```
读取优先级（从快到慢）：
1. Runtime Cache (动态属性) - 帧级缓存
   └─ 适用于高频读取、低频变化的动态值
   
2. Static Cache (静态属性) - 预计算总和
   └─ 只在修饰符添加/移除时重新计算
   
3. Dynamic Calculation (动态计算) - 实时调用回调
   └─ 每次都执行回调函数
```

### 2. 批量操作

```
批量添加属性：
AddStaticProperties(modifier, [
  {id: "health", value: 500},
  {id: "damage", value: 50},
  {id: "armor", value: 10}
])
  └─ 一次性计算、一次性标记脏数据

单独添加（不推荐）：
AddStaticProperty(modifier, "health", 500)  # 3次计算
AddStaticProperty(modifier, "damage", 50)   # 3次标记
AddStaticProperty(modifier, "armor", 10)    # 3次同步
```

### 3. 网表同步优化

```
优化前：
每个属性变化 → 立即同步 → N次网表写入

优化后：
收集脏数据 → 定时批量同步 → 1次网表写入（包含N个属性）
```

### 4. 无效引用清理

```
自动清理时机：
1. GetPropertyValue() 时检测并移除无效 modifier
2. RecalculateStaticProperty() 时清理
3. 定时器自动清理 (30秒)
4. 手动调用 CleanupInvalidModifiers()
```

## 扩展性设计

### 添加新的聚合策略

```typescript
// 1. 在 AggregationStrategy 枚举中添加
enum AggregationStrategy {
  // ... 现有策略
  AVERAGE = 7,  // 新增：平均值
}

// 2. 在 AggregateValues() 中实现
function AggregateValues(strategy, current, value, customAggregator) {
  switch (strategy) {
    // ... 现有逻辑
    case AggregationStrategy.AVERAGE:
      // 需要额外的计数器支持
      return (current + value) / 2;
  }
}
```

### 添加新的属性作用域

```typescript
// 1. 扩展 PropertyScope
enum PropertyScope {
  UNIT = 0,
  PLAYER = 1,
  TEAM = 2,     // 新增：队伍级别
  GLOBAL = 3,   // 新增：全局级别
}

// 2. 在 PropertySystem 中添加存储
interface PropertySystemGlobal {
  // ... 现有存储
  teamStorage: Map<DOTATeam_t, PropertyStorage>;
  globalStorage: PropertyStorage;
}

// 3. 更新 GetPropertyStorage() 逻辑
```

### 添加新的缓存策略

```typescript
// 1. 扩展 PropertyConfig
interface PropertyConfig {
  // ... 现有字段
  cacheStrategy?: 'frame' | 'time' | 'hybrid';
  cacheTimeSeconds?: number;
}

// 2. 在 GetDynamicPropertyValue() 中实现
function GetDynamicPropertyValue(...) {
  if (config.cacheStrategy === 'time') {
    const age = currentTime - cached.time;
    if (age <= config.cacheTimeSeconds) {
      return cached.value;
    }
  }
}
```

## 常见使用模式

### 模式1：装备系统
```
Modifier → AddStaticProperty → staticCache → GetPropertyValue
特点：固定值、预计算、高性能
```

### 模式2：等级加成
```
Modifier → RegisterDynamicProperty(callback) → runtimeCache → GetPropertyValue
特点：动态计算、支持缓存
```

### 模式3：条件加成
```
Modifier → RegisterDynamicProperty(callback with params) → 实时计算 → GetPropertyValue
特点：传递参数、无缓存、灵活
```

### 模式4：队伍光环
```
Modifier → AddStaticProperty(propertyId, value, playerID) → 跨实体属性
特点：玩家级别、批量添加
```

---

**设计原则：**
- ✅ 模块化：每个模块职责单一
- ✅ 可扩展：易于添加新特性
- ✅ 高性能：多层缓存优化
- ✅ 易调试：完整的调试工具
- ✅ 内存安全：自动清理机制
