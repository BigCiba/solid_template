/** @noSelfInFile */

import {
	AggregateValues,
	GetAggregationInitialValue,
	GetCurrentTime,
	GetPropertyConfig,
	GetPropertyStorage,
	IncrementReadStats,
	IncrementWriteStats,
	IsModifierValid,
	MarkDirty,
	TriggerPropertyChangeEvent,
	ValidateProperty
} from './core';
import {
	PropertyChangeEvent,
	PropertyKey,
	PropertyScope,
	StaticPropertyData,
} from './types';

/**
 * 静态属性管理模块
 * 静态属性：值在添加时确定，不随游戏状态变化
 * 特点：预计算总和，读取性能高
 */

// ==================== 添加静态属性 ====================

/**
 * 添加静态属性
 * @param modifier 修饰符实例
 * @param propertyId 属性 ID
 * @param value 属性值
 * @param key 可选的自定义键（默认从 modifier 的 Parent 获取）
 */
export function AddStaticProperty(
	modifier: CDOTA_Modifier_Lua,
	propertyId: string,
	value: number,
	key?: PropertyKey
): boolean {
	if (!ValidateProperty(propertyId)) return false;
	if (!IsModifierValid(modifier)) {
		print(`[PropertySystem] Error: Invalid modifier for property ${propertyId}`);
		return false;
	}

	const config = GetPropertyConfig(propertyId)!;
	const parent = modifier.GetParent();

	// 确定键
	let targetKey: PropertyKey;
	if (key !== undefined) {
		targetKey = key;
	} else {
		if (config.scope === PropertyScope.PLAYER) {
			targetKey = parent.GetPlayerOwnerID();
			if (targetKey === -1) {
				print(`[PropertySystem] Error: Unit has no player owner for property ${propertyId}`);
				return false;
			}
		} else {
			targetKey = parent.GetEntityIndex();
		}
	}

	const storage = GetPropertyStorage(config.scope, targetKey);
	let propertyList = storage.static.get(propertyId);

	if (!propertyList) {
		propertyList = [];
		storage.static.set(propertyId, propertyList);
	}

	// 添加数据
	const data: StaticPropertyData = {
		modifier,
		value,
		addedTime: GetCurrentTime(),
	};
	propertyList.push(data);

	// 重新计算缓存
	RecalculateStaticProperty(config.scope, targetKey, propertyId);

	// 标记需要同步
	if (config.syncToClient) {
		MarkDirty(config.scope, targetKey, propertyId);
	}

	IncrementWriteStats();

	return true;
}

/**
 * 批量添加静态属性
 */
export function AddStaticProperties(
	modifier: CDOTA_Modifier_Lua,
	properties: Array<{ propertyId: string; value: number; }>,
	key?: PropertyKey
): void {
	for (const prop of properties) {
		AddStaticProperty(modifier, prop.propertyId, prop.value, key);
	}
}

// ==================== 移除静态属性 ====================

/**
 * 移除修饰符的静态属性
 * @param modifier 修饰符实例
 * @param propertyId 属性 ID（可选，不传则移除所有属性）
 * @param key 可选的自定义键
 */
export function RemoveStaticProperty(modifier: CDOTA_Modifier_Lua, propertyId?: string, key?: PropertyKey): void {
	if (!modifier) return;

	// 如果指定了属性 ID，只移除该属性
	if (propertyId) {
		RemoveSingleStaticProperty(modifier, propertyId, key);
	} else {
		// 移除所有属性
		RemoveAllStaticProperties(modifier, key);
	}
}

/**
 * 移除单个静态属性
 */
function RemoveSingleStaticProperty(modifier: CDOTA_Modifier_Lua, propertyId: string, key?: PropertyKey): void {
	if (!ValidateProperty(propertyId)) return;

	const config = GetPropertyConfig(propertyId)!;
	const parent = modifier.GetParent();

	// 确定键
	let targetKey: PropertyKey;
	if (key !== undefined) {
		targetKey = key;
	} else {
		if (config.scope === PropertyScope.PLAYER) {
			targetKey = parent.GetPlayerOwnerID();
			if (targetKey === -1) return;
		} else {
			targetKey = parent.GetEntityIndex();
		}
	}

	const storage = GetPropertyStorage(config.scope, targetKey);
	const propertyList = storage.static.get(propertyId);

	if (!propertyList) return;

	// 查找并移除
	const index = propertyList.findIndex((data) => data.modifier === modifier);
	if (index !== -1) {
		propertyList.splice(index, 1);

		// 如果列表为空，删除整个属性
		if (propertyList.length === 0) {
			storage.static.delete(propertyId);
			storage.staticCache.delete(propertyId);
		} else {
			// 重新计算缓存
			RecalculateStaticProperty(config.scope, targetKey, propertyId);
		}

		// 标记需要同步
		if (config.syncToClient) {
			MarkDirty(config.scope, targetKey, propertyId);
		}

		IncrementWriteStats();
	}
}

/**
 * 移除修饰符的所有静态属性
 */
function RemoveAllStaticProperties(modifier: CDOTA_Modifier_Lua, key?: PropertyKey): void {
	if (!modifier) return;

	// 遍历所有已注册的属性
	for (const [propertyId] of PropertySystem.configs) {
		RemoveSingleStaticProperty(modifier, propertyId, key);
	}
}

// ==================== 计算和缓存 ====================

/**
 * 重新计算静态属性的总和
 */
export function RecalculateStaticProperty(scope: PropertyScope, key: PropertyKey, propertyId: string): void {
	const config = GetPropertyConfig(propertyId);
	if (!config) return;

	const storage = GetPropertyStorage(scope, key);
	const propertyList = storage.static.get(propertyId);

	if (!propertyList || propertyList.length === 0) {
		storage.staticCache.delete(propertyId);
		return;
	}

	// 清理无效的修饰符
	for (let i = propertyList.length - 1; i >= 0; i--) {
		if (!IsModifierValid(propertyList[i].modifier)) {
			propertyList.splice(i, 1);
		}
	}

	// 如果清理后为空
	if (propertyList.length === 0) {
		storage.static.delete(propertyId);
		storage.staticCache.delete(propertyId);
		return;
	}

	// 计算总和
	let result = GetAggregationInitialValue(config.aggregation, config.defaultValue ?? 0);

	for (const data of propertyList) {
		result = AggregateValues(config.aggregation, result, data.value, config.customAggregator);
	}

	// 缓存结果
	const oldValue = storage.staticCache.get(propertyId) ?? config.defaultValue ?? 0;
	storage.staticCache.set(propertyId, result);

	// 触发变化事件
	if (oldValue !== result) {
		const event: PropertyChangeEvent = {
			propertyId,
			key,
			oldValue,
			newValue: result,
			delta: result - oldValue,
		};
		TriggerPropertyChangeEvent(event);
	}
}

/**
 * 获取静态属性的预计算值
 */
export function GetStaticPropertyValue(scope: PropertyScope, key: PropertyKey, propertyId: string): number {
	const config = GetPropertyConfig(propertyId);
	if (!config) return 0;

	const storage = GetPropertyStorage(scope, key);
	const cachedValue = storage.staticCache.get(propertyId);

	IncrementReadStats(cachedValue !== undefined);

	return cachedValue ?? config.defaultValue ?? 0;
}

// ==================== 工具函数 ====================

/**
 * 更新静态属性值（不改变修饰符列表）
 */
export function UpdateStaticPropertyValue(
	modifier: CDOTA_Modifier_Lua,
	propertyId: string,
	newValue: number,
	key?: PropertyKey
): boolean {
	if (!ValidateProperty(propertyId)) return false;
	if (!IsModifierValid(modifier)) return false;

	const config = GetPropertyConfig(propertyId)!;
	const parent = modifier.GetParent();

	// 确定键
	let targetKey: PropertyKey;
	if (key !== undefined) {
		targetKey = key;
	} else {
		if (config.scope === PropertyScope.PLAYER) {
			targetKey = parent.GetPlayerOwnerID();
			if (targetKey === -1) return false;
		} else {
			targetKey = parent.GetEntityIndex();
		}
	}

	const storage = GetPropertyStorage(config.scope, targetKey);
	const propertyList = storage.static.get(propertyId);

	if (!propertyList) return false;

	// 查找并更新
	const data = propertyList.find((d) => d.modifier === modifier);
	if (data) {
		data.value = newValue;

		// 重新计算缓存
		RecalculateStaticProperty(config.scope, targetKey, propertyId);

		// 标记需要同步
		if (config.syncToClient) {
			MarkDirty(config.scope, targetKey, propertyId);
		}

		IncrementWriteStats();
		return true;
	}

	return false;
}

/**
 * 获取静态属性的所有贡献者
 */
export function GetStaticPropertyContributors(scope: PropertyScope, key: PropertyKey, propertyId: string): StaticPropertyData[] {
	const storage = GetPropertyStorage(scope, key);
	const propertyList = storage.static.get(propertyId);

	if (!propertyList) return [];

	// 返回副本以防止外部修改
	return propertyList.map((data) => ({ ...data }));
}
