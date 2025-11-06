# PropertySystem 迁移指南

## 重大变更概述

PropertySystem 已重构，**移除了与 CDOTA_Modifier_Lua 的强关联**。属性现在使用字符串 `sourceId` 标识，可以独立添加和删除，不再依赖 modifier 实例。

---

## API 变更对照表

### 1. 静态属性 API

#### AddStaticProperty (添加静态属性)

**旧 API:**
```typescript
PropertySystem.AddStaticProperty(
  modifier: CDOTA_Modifier_Lua,
  propertyId: string,
  value: number,
  key?: PropertySystemKey
)
```

**新 API:**
```typescript
PropertySystem.AddStaticProperty(
  scope: PropertyScope,           // 'UNIT' 或 'PLAYER'
  key: PropertySystemKey,         // 实体索引或玩家ID
  propertyId: string,
  sourceId: string,               // 唯一标识来源（如 "item_sword_123"）
  value: number,
  metadata?: Record<string, any>  // 可选：附加元数据
)
```

**迁移示例:**
```typescript
// ❌ 旧方式
PropertySystem.AddStaticProperty(modifier, "attack_damage", 50);

// ✅ 新方式
PropertySystem.AddStaticProperty(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "attack_damage",
  "item_sword_123",  // sourceId 唯一标识这个属性来源
  50
);
```

#### RemoveStaticProperty (删除静态属性)

**旧 API:**
```typescript
PropertySystem.RemoveStaticProperty(
  modifier: CDOTA_Modifier_Lua,
  propertyId?: string,
  key?: PropertySystemKey
)
```

**新 API:**
```typescript
PropertySystem.RemoveStaticProperty(
  scope: PropertyScope,
  key: PropertySystemKey,
  sourceId: string,
  propertyId?: string  // 可选：删除特定属性，否则删除该 sourceId 的所有属性
)
```

**迁移示例:**
```typescript
// ❌ 旧方式
PropertySystem.RemoveStaticProperty(modifier, "attack_damage");

// ✅ 新方式：删除特定属性
PropertySystem.RemoveStaticProperty(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "item_sword_123",
  "attack_damage"
);

// ✅ 新方式：删除该来源的所有属性
PropertySystem.RemoveStaticProperty(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "item_sword_123"
);
```

#### UpdateStaticPropertyValue (更新静态属性值)

**旧 API:**
```typescript
PropertySystem.UpdateStaticPropertyValue(
  modifier: CDOTA_Modifier_Lua,
  propertyId: string,
  newValue: number,
  key?: PropertySystemKey
)
```

**新 API:**
```typescript
PropertySystem.UpdateStaticPropertyValue(
  scope: PropertyScope,
  key: PropertySystemKey,
  propertyId: string,
  sourceId: string,
  newValue: number
)
```

**迁移示例:**
```typescript
// ❌ 旧方式
PropertySystem.UpdateStaticPropertyValue(modifier, "attack_damage", 75);

// ✅ 新方式
PropertySystem.UpdateStaticPropertyValue(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "attack_damage",
  "item_sword_123",
  75
);
```

---

### 2. 动态属性 API

#### RegisterDynamicProperty (注册动态属性)

**旧 API:**
```typescript
PropertySystem.RegisterDynamicProperty(
  modifier: CDOTA_Modifier_Lua,
  propertyId: string,
  callback: DynamicPropertyCallback,
  priority?: number,
  key?: PropertySystemKey
)
```

**新 API:**
```typescript
PropertySystem.RegisterDynamicProperty(
  scope: PropertyScope,
  key: PropertySystemKey,
  propertyId: string,
  sourceId: string,
  callback: DynamicPropertyCallback,
  priority?: number,
  metadata?: Record<string, any>
)
```

**迁移示例:**
```typescript
// ❌ 旧方式
PropertySystem.RegisterDynamicProperty(
  modifier,
  "attack_damage",
  () => unit.GetHealth() * 0.1,
  0
);

// ✅ 新方式
PropertySystem.RegisterDynamicProperty(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "attack_damage",
  "ability_berserker",
  () => unit.GetHealth() * 0.1,
  0
);
```

#### UnregisterDynamicProperty (注销动态属性)

**旧 API:**
```typescript
PropertySystem.UnregisterDynamicProperty(
  modifier: CDOTA_Modifier_Lua,
  propertyId?: string,
  key?: PropertySystemKey
)
```

**新 API:**
```typescript
PropertySystem.UnregisterDynamicProperty(
  scope: PropertyScope,
  key: PropertySystemKey,
  sourceId: string,
  propertyId?: string
)
```

**迁移示例:**
```typescript
// ❌ 旧方式
PropertySystem.UnregisterDynamicProperty(modifier, "attack_damage");

// ✅ 新方式
PropertySystem.UnregisterDynamicProperty(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "ability_berserker",
  "attack_damage"
);
```

---

### 3. 清理 API

#### CleanupSourceProperties (清理来源属性)

**旧 API:**
```typescript
PropertySystem.CleanupModifierProperties(
  modifier: CDOTA_Modifier_Lua,
  key?: PropertySystemKey
)
```

**新 API:**
```typescript
PropertySystem.CleanupSourceProperties(
  scope: PropertyScope,
  key: PropertySystemKey,
  sourceId: string
)
```

**迁移示例:**
```typescript
// ❌ 旧方式（在 modifier 销毁时）
PropertySystem.CleanupModifierProperties(modifier);

// ✅ 新方式（在物品/技能移除时）
PropertySystem.CleanupSourceProperties(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "item_sword_123"
);
```

---

## 实用模式

### 模式 1：使用 GetEntityContext 辅助方法

新增的 `GetEntityContext` 方法可以自动推断 `scope` 和 `key`：

```typescript
// 自动获取实体的 scope 和 key
const context = PropertySystem.GetEntityContext(unit);
if (context) {
  const [scope, key] = context;
  
  PropertySystem.AddStaticProperty(
    scope,
    key,
    "attack_damage",
    "item_sword_123",
    50
  );
}
```

### 模式 2：Modifier 便捷包装

如果你的项目仍大量使用 modifier，可以创建包装函数：

```typescript
// 在你的代码中添加辅助函数
function AddPropertyFromModifier(
  modifier: CDOTA_Modifier_Lua,
  propertyId: string,
  value: number
): boolean {
  const parent = modifier.GetParent();
  const sourceId = `mod_${modifier.GetName()}_${modifier.GetSerialNumber()}`;
  
  const context = PropertySystem.GetEntityContext(parent);
  if (!context) return false;
  
  const [scope, key] = context;
  return PropertySystem.AddStaticProperty(scope, key, propertyId, sourceId, value);
}

function RemovePropertyFromModifier(
  modifier: CDOTA_Modifier_Lua,
  propertyId?: string
): boolean {
  const parent = modifier.GetParent();
  const sourceId = `mod_${modifier.GetName()}_${modifier.GetSerialNumber()}`;
  
  const context = PropertySystem.GetEntityContext(parent);
  if (!context) return false;
  
  const [scope, key] = context;
  return PropertySystem.RemoveStaticProperty(scope, key, sourceId, propertyId);
}
```

**使用:**
```typescript
// Modifier 创建时
AddPropertyFromModifier(this, "attack_damage", 50);

// Modifier 销毁时
RemovePropertyFromModifier(this);
```

### 模式 3：sourceId 命名规范

建议使用统一的命名规范：

```typescript
// 物品
const itemSourceId = `item_${item.GetName()}_${item.GetEntityIndex()}`;

// 技能
const abilitySourceId = `ability_${ability.GetName()}_${ability.GetEntityIndex()}`;

// Modifier
const modifierSourceId = `mod_${modifier.GetName()}_${modifier.GetSerialNumber()}`;

// 系统事件
const systemSourceId = `system_event_${eventName}`;

// 临时 Buff
const buffSourceId = `buff_${buffName}_${uniqueId}`;
```

### 模式 4：使用 metadata 存储额外信息

新的 API 支持 `metadata` 字段，用于存储额外信息：

```typescript
PropertySystem.AddStaticProperty(
  PropertyScope.UNIT,
  unit.GetEntityIndex(),
  "attack_damage",
  "item_sword_legendary",
  100,
  {
    itemTier: "legendary",
    expiresAt: GameRules.GetGameTime() + 60,  // 60秒后过期
    stackable: false
  }
);
```

---

## 迁移检查清单

- [ ] 搜索所有 `AddStaticProperty` 调用并更新参数
- [ ] 搜索所有 `RemoveStaticProperty` 调用并更新参数
- [ ] 搜索所有 `UpdateStaticPropertyValue` 调用并更新参数
- [ ] 搜索所有 `RegisterDynamicProperty` 调用并更新参数
- [ ] 搜索所有 `UnregisterDynamicProperty` 调用并更新参数
- [ ] 搜索所有 `CleanupModifierProperties` 调用，改为 `CleanupSourceProperties`
- [ ] 确定 `sourceId` 命名规范
- [ ] 考虑是否需要创建便捷包装函数（如上述模式2）
- [ ] 更新属性清理逻辑（从 modifier 销毁事件改为合适的时机）

---

## 注意事项

### 1. 自动清理机制变更

**旧行为:**
- 系统自动检测 modifier 是否有效
- 定期清理无效的 modifier 引用

**新行为:**
- 不再自动清理属性
- 需要在合适的时机手动调用 `CleanupSourceProperties`
- 建议时机：
  - 物品被移除时
  - 技能被禁用时
  - Buff 结束时
  - 实体死亡/移除时

### 2. sourceId 必须唯一

确保同一作用域和键下，不同来源使用不同的 `sourceId`：

```typescript
// ❌ 错误：两个不同的剑使用相同 sourceId
PropertySystem.AddStaticProperty(scope, key, "attack_damage", "item_sword", 50);
PropertySystem.AddStaticProperty(scope, key, "attack_damage", "item_sword", 30);  // 会覆盖第一个

// ✅ 正确：使用唯一标识
PropertySystem.AddStaticProperty(scope, key, "attack_damage", "item_sword_1", 50);
PropertySystem.AddStaticProperty(scope, key, "attack_damage", "item_sword_2", 30);
```

### 3. 同 sourceId 同 propertyId 会更新值

如果用相同的 `sourceId` 和 `propertyId` 再次调用 `AddStaticProperty`，会更新现有值而不是添加新的：

```typescript
PropertySystem.AddStaticProperty(scope, key, "attack_damage", "item_sword", 50);
PropertySystem.AddStaticProperty(scope, key, "attack_damage", "item_sword", 75);  // 更新为 75，不是添加
```

---

## 常见问题

**Q: 为什么要移除 modifier 依赖？**

A: 提高灵活性。现在可以为任意来源添加属性，不仅限于 modifier，例如：
- 物品（不需要创建 modifier）
- 技能效果（直接通过 ability 管理）
- 系统事件（如商店购买加成）
- 临时 Buff（自定义过期逻辑）

**Q: 如何处理现有的 modifier 代码？**

A: 三种选择：
1. 使用 `GetEntityContext` 重写（推荐）
2. 创建便捷包装函数（过渡方案）
3. 逐步迁移（混合使用）

**Q: 如何确保属性被正确清理？**

A: 
1. 在资源释放时调用 `CleanupSourceProperties`
2. 使用 `metadata.expiresAt` 实现过期机制（需自行实现检查）
3. 记录所有添加的 `sourceId`，在合适时机统一清理

**Q: 性能影响如何？**

A: 
- 移除了 `IsModifierValid` 检查，减少了运行时验证开销
- 不再需要定期清理无效 modifier，减少了定时器任务
- 整体性能应该**略有提升**

---

## 完整示例

### 示例 1：物品属性管理

```typescript
class item_custom_sword extends CDOTA_Item_Lua {
  OnEquip(): void {
    const owner = this.GetOwner();
    const sourceId = `item_${this.GetName()}_${this.GetEntityIndex()}`;
    
    const context = PropertySystem.GetEntityContext(owner);
    if (context) {
      const [scope, key] = context;
      
      // 添加多个属性
      PropertySystem.AddStaticProperty(scope, key, "attack_damage", sourceId, 50);
      PropertySystem.AddStaticProperty(scope, key, "attack_speed", sourceId, 20);
      PropertySystem.AddStaticProperty(scope, key, "strength", sourceId, 10);
    }
  }
  
  OnUnequip(): void {
    const owner = this.GetOwner();
    const sourceId = `item_${this.GetName()}_${this.GetEntityIndex()}`;
    
    const context = PropertySystem.GetEntityContext(owner);
    if (context) {
      const [scope, key] = context;
      
      // 清理所有属性
      PropertySystem.CleanupSourceProperties(scope, key, sourceId);
    }
  }
}
```

### 示例 2：动态属性（基于生命值的伤害加成）

```typescript
class modifier_berserker extends CDOTA_Modifier_Lua {
  OnCreated(): void {
    if (!IsServer()) return;
    
    const parent = this.GetParent();
    const sourceId = `mod_${this.GetName()}_${this.GetSerialNumber()}`;
    
    const context = PropertySystem.GetEntityContext(parent);
    if (context) {
      const [scope, key] = context;
      
      PropertySystem.RegisterDynamicProperty(
        scope,
        key,
        "attack_damage",
        sourceId,
        () => {
          const healthPercent = parent.GetHealthPercent();
          // 血量越低伤害越高（最多+100）
          return (100 - healthPercent) * 1.0;
        },
        10  // 优先级
      );
    }
  }
  
  OnDestroy(): void {
    if (!IsServer()) return;
    
    const parent = this.GetParent();
    const sourceId = `mod_${this.GetName()}_${this.GetSerialNumber()}`;
    
    const context = PropertySystem.GetEntityContext(parent);
    if (context) {
      const [scope, key] = context;
      PropertySystem.CleanupSourceProperties(scope, key, sourceId);
    }
  }
}
```

### 示例 3：系统事件临时属性

```typescript
// 商店购买加成（持续 30 秒）
function ApplyShopBonus(unit: CDOTA_BaseNPC): void {
  const sourceId = `system_shop_bonus_${GameRules.GetGameTime()}`;
  const context = PropertySystem.GetEntityContext(unit);
  
  if (context) {
    const [scope, key] = context;
    
    PropertySystem.AddStaticProperty(
      scope,
      key,
      "attack_damage",
      sourceId,
      25,
      { expiresAt: GameRules.GetGameTime() + 30 }
    );
    
    // 30 秒后自动移除
    Timer.GameTimer(30, () => {
      PropertySystem.CleanupSourceProperties(scope, key, sourceId);
    });
  }
}
```

---

## 总结

新的 PropertySystem API 提供了：
- ✅ 更高的灵活性（不依赖 modifier）
- ✅ 更清晰的语义（显式的 scope/key/sourceId）
- ✅ 更好的扩展性（metadata 支持）
- ✅ 更简单的清理逻辑（手动可控）

迁移工作量：**中等**（需要更新所有调用，但逻辑简单）

建议迁移策略：**渐进式**（先创建包装函数，再逐步替换）
