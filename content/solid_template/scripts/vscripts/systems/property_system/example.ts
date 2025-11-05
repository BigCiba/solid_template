/** @noSelfInFile */

/**
 * 属性系统使用示例
 * 展示如何在实际项目中使用属性系统
 */

import {
	AddStaticProperty,
	AggregationStrategy,
	CleanupModifierProperties,
	CleanupUnitProperties,
	GetPropertyValue,
	InitializeFullPropertySystem,
	PropertyScope,
	PropertyValueType,
	RegisterDynamicProperty,
	RegisterPropertyConfig,
} from './index';

// ==================== 1. 初始化 ====================

export function InitializePropertySystemExample(): void {
	// 初始化系统
	InitializeFullPropertySystem({
		enableNetTableSync: true,
		enableAutoCleanup: true,
		autoCleanupInterval: 30,
		enableDebugCommands: true,
	});

	// 注册属性配置
	RegisterExampleProperties();

	print('[Example] Property system initialized with example properties');
}

// ==================== 2. 注册属性 ====================

function RegisterExampleProperties(): void {
	// 单位属性：生命值加成
	RegisterPropertyConfig({
		id: 'health_bonus',
		scope: PropertyScope.UNIT,
		valueType: PropertyValueType.NUMBER,
		aggregation: AggregationStrategy.SUM,
		defaultValue: 0,
		syncToClient: true,
		syncPriority: 10,
		enableCache: true,
		cacheDuration: 30,
	});

	// 单位属性：攻击力加成
	RegisterPropertyConfig({
		id: 'attack_damage_bonus',
		scope: PropertyScope.UNIT,
		valueType: PropertyValueType.NUMBER,
		aggregation: AggregationStrategy.SUM,
		defaultValue: 0,
		syncToClient: true,
		enableCache: true,
	});

	// 单位属性：攻击速度倍率
	RegisterPropertyConfig({
		id: 'attack_speed_multiplier',
		scope: PropertyScope.UNIT,
		valueType: PropertyValueType.PERCENTAGE,
		aggregation: AggregationStrategy.MULTIPLY,
		defaultValue: 1.0,
		syncToClient: true,
		enableCache: true,
	});

	// 玩家属性：金币倍率
	RegisterPropertyConfig({
		id: 'gold_multiplier',
		scope: PropertyScope.PLAYER,
		valueType: PropertyValueType.PERCENTAGE,
		aggregation: AggregationStrategy.MULTIPLY,
		defaultValue: 1.0,
		syncToClient: true,
		syncPriority: 5,
		enableCache: true,
		cacheDuration: 60,
	});

	// 玩家属性：经验倍率
	RegisterPropertyConfig({
		id: 'exp_multiplier',
		scope: PropertyScope.PLAYER,
		valueType: PropertyValueType.PERCENTAGE,
		aggregation: AggregationStrategy.MULTIPLY,
		defaultValue: 1.0,
		syncToClient: true,
		syncPriority: 5,
		enableCache: true,
		cacheDuration: 60,
	});
}

// ==================== 3. 示例修饰符：装备 ====================

export class modifier_item_example_sword extends CDOTA_Modifier_Lua {
	IsHidden(): boolean {
		return false;
	}
	IsPurgable(): boolean {
		return false;
	}

	OnCreated(): void {
		if (IsServer()) {
			// 添加静态属性
			AddStaticProperty(this, 'health_bonus', 500);
			AddStaticProperty(this, 'attack_damage_bonus', 75);
			AddStaticProperty(this, 'attack_speed_multiplier', 1.25); // +25% 攻速
		}
	}

	OnDestroy(): void {
		if (IsServer()) {
			// 清理属性
			CleanupModifierProperties(this);
		}
	}

	// 在 DeclareFunctions 中应用属性
	DeclareFunctions(): ModifierFunction[] {
		return [ModifierFunction.PREATTACK_BONUS_DAMAGE, ModifierFunction.ATTACKSPEED_BONUS_CONSTANT, ModifierFunction.HEALTH_BONUS];
	}

	GetModifierPreAttack_BonusDamage(): number {
		const damage = GetPropertyValue(PropertyScope.UNIT, this.GetParent().GetEntityIndex(), 'attack_damage_bonus');
		return damage;
	}

	GetModifierAttackSpeedBonus_Constant(): number {
		const multiplier = GetPropertyValue(PropertyScope.UNIT, this.GetParent().GetEntityIndex(), 'attack_speed_multiplier');
		// 转换倍率为加成值
		return (multiplier - 1.0) * 100;
	}

	GetModifierHealthBonus(): number {
		const health = GetPropertyValue(PropertyScope.UNIT, this.GetParent().GetEntityIndex(), 'health_bonus');
		return health;
	}
}

// ==================== 4. 示例修饰符：动态属性 ====================

export class modifier_ability_example_rage extends CDOTA_Modifier_Lua {
	IsHidden(): boolean {
		return false;
	}
	IsPurgable(): boolean {
		return true;
	}

	OnCreated(): void {
		if (IsServer()) {
			// 注册动态属性：基于技能等级的攻击力加成
			RegisterDynamicProperty(
				this,
				'attack_damage_bonus',
				(params) => {
					const ability = this.GetAbility();
					if (!ability) return 0;

					// 每级 +20 攻击力
					return ability.GetLevel() * 20;
				},
				0 // 优先级
			);

			// 注册动态属性：低血时额外加成
			RegisterDynamicProperty(
				this,
				'attack_damage_bonus',
				(params) => {
					const parent = this.GetParent();
					const healthPercent = parent.GetHealthPercent();

					// 血量越低，攻击力越高
					if (healthPercent < 30) {
						return 100; // 低于30%时 +100 攻击
					} else if (healthPercent < 50) {
						return 50; // 低于50%时 +50 攻击
					}
					return 0;
				},
				10 // 较低优先级
			);
		}
	}

	OnDestroy(): void {
		if (IsServer()) {
			CleanupModifierProperties(this);
		}
	}

	DeclareFunctions(): ModifierFunction[] {
		return [ModifierFunction.PREATTACK_BONUS_DAMAGE];
	}

	GetModifierPreAttack_BonusDamage(): number {
		// 传递参数给动态属性计算
		const damage = GetPropertyValue(PropertyScope.UNIT, this.GetParent().GetEntityIndex(), 'attack_damage_bonus', {
			unit: this.GetParent(),
		});
		return damage;
	}
}

// ==================== 5. 示例：玩家光环 ====================

export class modifier_player_aura_gold_boost extends CDOTA_Modifier_Lua {
	IsHidden(): boolean {
		return false;
	}
	IsPurgable(): boolean {
		return false;
	}
	IsAura(): boolean {
		return false;
	} // 不是单位光环，是玩家属性

	OnCreated(): void {
		if (IsServer()) {
			// 为拥有者玩家添加金币倍率
			const playerID = this.GetParent().GetPlayerOwnerID();
			if (playerID !== -1) {
				AddStaticProperty(this, 'gold_multiplier', 1.5, playerID); // +50% 金币
			}
		}
	}

	OnDestroy(): void {
		if (IsServer()) {
			const playerID = this.GetParent().GetPlayerOwnerID();
			if (playerID !== -1) {
				CleanupModifierProperties(this, playerID);
			}
		}
	}
}

// ==================== 6. 示例：在游戏逻辑中使用 ====================

/**
 * 示例：金币过滤器
 */
export function ExampleGoldFilter(event: any): boolean {
	const playerID = event.player_id_const as PlayerID;

	// 获取玩家的金币倍率
	const multiplier = GetPropertyValue(PropertyScope.PLAYER, playerID, 'gold_multiplier');

	// 应用倍率
	event.gold = Math.floor(event.gold * multiplier);

	return true;
}

/**
 * 示例：经验过滤器
 */
export function ExampleExpFilter(event: any): boolean {
	const playerID = event.player_id_const as PlayerID;

	// 获取玩家的经验倍率
	const multiplier = GetPropertyValue(PropertyScope.PLAYER, playerID, 'exp_multiplier');

	// 应用倍率
	event.experience = Math.floor(event.experience * multiplier);

	return true;
}

/**
 * 示例：单位死亡清理
 */
export function ExampleOnEntityKilled(event: any): void {
	const unit = EntIndexToHScript(event.entindex_killed) as CDOTA_BaseNPC;

	if (unit && unit.IsRealHero()) {
		// 清理单位属性
		CleanupUnitProperties(unit);
	}
}

/**
 * 示例：获取单位的总属性值
 */
export function ExampleGetUnitTotalStats(unit: CDOTA_BaseNPC): {
	healthBonus: number;
	damageBonus: number;
	attackSpeedMultiplier: number;
} {
	const entIndex = unit.GetEntityIndex();

	return {
		healthBonus: GetPropertyValue(PropertyScope.UNIT, entIndex, 'health_bonus'),
		damageBonus: GetPropertyValue(PropertyScope.UNIT, entIndex, 'attack_damage_bonus'),
		attackSpeedMultiplier: GetPropertyValue(PropertyScope.UNIT, entIndex, 'attack_speed_multiplier'),
	};
}

/**
 * 示例：显示单位属性到客户端
 */
export function ExampleShowUnitStats(unit: CDOTA_BaseNPC, playerID: PlayerID): void {
	const stats = ExampleGetUnitTotalStats(unit);

	const message = `
		Unit Stats:
		Health Bonus: +${stats.healthBonus}
		Damage Bonus: +${stats.damageBonus}
		Attack Speed: ${(stats.attackSpeedMultiplier * 100).toFixed(0)}%
	`;

	CustomGameEventManager.Send_ServerToPlayer(PlayerResource.GetPlayer(playerID)!, 'show_unit_stats', {
		message,
	});
}

// ==================== 7. 使用说明 ====================

/*

在 addon_game_mode.ts 中初始化：

import { InitializePropertySystemExample, ExampleGoldFilter, ExampleExpFilter, ExampleOnEntityKilled } from './systems/property_system/example';

class GameMode {
	static Precache(context: CScriptPrecacheContext): void {
		// ...
	}

	static Activate(): void {
		// 初始化属性系统和示例
		InitializePropertySystemExample();

		// 注册过滤器
		GameRules.GetGameModeEntity().SetGoldFilter(ExampleGoldFilter, {});
		GameRules.GetGameModeEntity().SetExpFilter(ExampleExpFilter, {});

		// 监听单位死亡
		ListenToGameEvent('entity_killed', ExampleOnEntityKilled, null);
	}
}

在技能/装备中使用：

// 创建修饰符
const modifier = hero.AddNewModifier(hero, ability, 'modifier_item_example_sword', {});

// 获取属性值
const damage = GetPropertyValue(
	PropertyScope.UNIT,
	hero.GetEntityIndex(),
	'attack_damage_bonus'
);

// 清理
CleanupModifierProperties(modifier);

客户端监听属性变化（Panorama）：

import { ListenPropertyChange, PropertyScope } from './systems/property_system';

ListenPropertyChange(
	PropertyScope.PLAYER,
	Players.GetLocalPlayer(),
	'gold_multiplier',
	(oldValue, newValue) => {
		$.Msg(`Gold multiplier changed: ${oldValue} -> ${newValue}`);
		// 更新 UI
	}
);

*/
