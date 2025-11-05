/** @noSelfInFile */

import {
	AggregateValues,
	GetAggregationInitialValue,
	GetCurrentFrame,
	GetCurrentTime,
	GetPropertyConfig,
	GetPropertyStorage,
	IncrementReadStats,
	IncrementWriteStats,
	IsModifierValid,
	MarkDirty,
	ValidateProperty,
} from './core';
import {
	DynamicPropertyCallback,
	DynamicPropertyData,
	PropertyCacheData,
	PropertyKey,
	PropertyScope,
} from './types';

/**
 * 动态属性管理模块
 * 动态属性：通过回调函数计算，可以根据游戏状态动态变化
 * 特点：灵活，支持优先级和参数传递，但计算开销较大
 */

// ==================== 添加动态属性 ====================

/**
 * 注册动态属性回调
 * @param modifier 修饰符实例
 * @param propertyId 属性 ID
 * @param callback 回调函数
 * @param priority 优先级（数字越小越优先执行）
 * @param key 可选的自定义键
 */
export function RegisterDynamicProperty(
	modifier: CDOTA_Modifier_Lua,
	propertyId: string,
	callback: DynamicPropertyCallback,
	priority: number = 0,
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
	let propertyList = storage.dynamic.get(propertyId);

	if (!propertyList) {
		propertyList = [];
		storage.dynamic.set(propertyId, propertyList);
	}

	// 检查是否已存在
	const existingIndex = propertyList.findIndex((data) => data.modifier === modifier);
	if (existingIndex !== -1) {
		// 更新现有的
		propertyList[existingIndex].callback = callback;
		propertyList[existingIndex].priority = priority;
	} else {
		// 添加新的
		const data: DynamicPropertyData = {
			modifier,
			callback,
			priority,
			addedTime: GetCurrentTime(),
		};
		propertyList.push(data);
	}

	// 按优先级排序（从小到大）
	propertyList.sort((a, b) => a.priority - b.priority);

	// 清除缓存
	storage.runtimeCache.delete(propertyId);

	// 标记需要同步
	if (config.syncToClient) {
		MarkDirty(config.scope, targetKey, propertyId);
	}

	IncrementWriteStats();

	return true;
}

/**
 * 批量注册动态属性
 */
export function RegisterDynamicProperties(
	modifier: CDOTA_Modifier_Lua,
	properties: Array<{ propertyId: string; callback: DynamicPropertyCallback; priority?: number; }>,
	key?: PropertyKey
): void {
	for (const prop of properties) {
		RegisterDynamicProperty(modifier, prop.propertyId, prop.callback, prop.priority ?? 0, key);
	}
}

// ==================== 移除动态属性 ====================

/**
 * 注销动态属性回调
 * @param modifier 修饰符实例
 * @param propertyId 属性 ID（可选，不传则移除所有属性）
 * @param key 可选的自定义键
 */
export function UnregisterDynamicProperty(modifier: CDOTA_Modifier_Lua, propertyId?: string, key?: PropertyKey): void {
	if (!modifier) return;

	// 如果指定了属性 ID，只移除该属性
	if (propertyId) {
		UnregisterSingleDynamicProperty(modifier, propertyId, key);
	} else {
		// 移除所有属性
		UnregisterAllDynamicProperties(modifier, key);
	}
}

/**
 * 注销单个动态属性
 */
function UnregisterSingleDynamicProperty(modifier: CDOTA_Modifier_Lua, propertyId: string, key?: PropertyKey): void {
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
	const propertyList = storage.dynamic.get(propertyId);

	if (!propertyList) return;

	// 查找并移除
	const index = propertyList.findIndex((data) => data.modifier === modifier);
	if (index !== -1) {
		propertyList.splice(index, 1);

		// 如果列表为空，删除整个属性
		if (propertyList.length === 0) {
			storage.dynamic.delete(propertyId);
		}

		// 清除缓存
		storage.runtimeCache.delete(propertyId);

		// 标记需要同步
		if (config.syncToClient) {
			MarkDirty(config.scope, targetKey, propertyId);
		}

		IncrementWriteStats();
	}
}

/**
 * 注销修饰符的所有动态属性
 */
function UnregisterAllDynamicProperties(modifier: CDOTA_Modifier_Lua, key?: PropertyKey): void {
	if (!modifier) return;

	// 遍历所有已注册的属性
	for (const [propertyId] of PropertySystem.configs) {
		UnregisterSingleDynamicProperty(modifier, propertyId, key);
	}
}

// ==================== 计算和缓存 ====================

/**
 * 获取动态属性值（带缓存）
 */
export function GetDynamicPropertyValue(scope: PropertyScope, key: PropertyKey, propertyId: string, params?: any): number {
	const config = GetPropertyConfig(propertyId);
	if (!config) return 0;

	const storage = GetPropertyStorage(scope, key);

	// 检查缓存
	if (config.enableCache) {
		const cached = storage.runtimeCache.get(propertyId);
		const currentFrame = GetCurrentFrame();

		if (cached) {
			const frameAge = currentFrame - cached.frame;
			if (frameAge <= (config.cacheDuration ?? 0)) {
				IncrementReadStats(true);
				return cached.value;
			}
		}
	}

	// 计算新值
	const value = CalculateDynamicPropertyValue(scope, key, propertyId, params);

	// 更新缓存
	if (config.enableCache) {
		const cacheData: PropertyCacheData = {
			value,
			frame: GetCurrentFrame(),
			time: GetCurrentTime(),
		};
		storage.runtimeCache.set(propertyId, cacheData);
	}

	IncrementReadStats(false);

	return value;
}

/**
 * 计算动态属性值（不使用缓存）
 */
export function CalculateDynamicPropertyValue(scope: PropertyScope, key: PropertyKey, propertyId: string, params?: any): number {
	const config = GetPropertyConfig(propertyId);
	if (!config) return 0;

	const storage = GetPropertyStorage(scope, key);
	const propertyList = storage.dynamic.get(propertyId);

	if (!propertyList || propertyList.length === 0) {
		return config.defaultValue ?? 0;
	}

	// 清理无效的修饰符
	for (let i = propertyList.length - 1; i >= 0; i--) {
		if (!IsModifierValid(propertyList[i].modifier)) {
			propertyList.splice(i, 1);
		}
	}

	// 如果清理后为空
	if (propertyList.length === 0) {
		storage.dynamic.delete(propertyId);
		return config.defaultValue ?? 0;
	}

	// 计算总和
	let result = GetAggregationInitialValue(config.aggregation, config.defaultValue ?? 0);

	for (const data of propertyList) {
		try {
			const value = data.callback(params);
			if (value !== undefined) {
				result = AggregateValues(config.aggregation, result, value, config.customAggregator);
			}
		} catch (error) {
			print(`[PropertySystem] Error in dynamic callback for ${propertyId}: ${error}`);
		}
	}

	return result;
}

/**
 * 清除动态属性缓存
 */
export function ClearDynamicPropertyCache(scope: PropertyScope, key: PropertyKey, propertyId?: string): void {
	const storage = GetPropertyStorage(scope, key);

	if (propertyId) {
		// 清除指定属性的缓存
		storage.runtimeCache.delete(propertyId);
	} else {
		// 清除所有缓存
		storage.runtimeCache.clear();
	}
}

/**
 * 批量清除缓存
 */
export function ClearAllDynamicPropertyCaches(): void {
	// 清除所有玩家存储的缓存
	for (const [, storage] of PropertySystem.playerStorage) {
		storage.runtimeCache.clear();
	}

	// 清除所有单位存储的缓存
	for (const [, storage] of PropertySystem.unitStorage) {
		storage.runtimeCache.clear();
	}

	print('[PropertySystem] Cleared all dynamic property caches');
}

// ==================== 工具函数 ====================

/**
 * 更新动态属性的优先级
 */
export function UpdateDynamicPropertyPriority(
	modifier: CDOTA_Modifier_Lua,
	propertyId: string,
	newPriority: number,
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
	const propertyList = storage.dynamic.get(propertyId);

	if (!propertyList) return false;

	// 查找并更新
	const data = propertyList.find((d) => d.modifier === modifier);
	if (data) {
		data.priority = newPriority;

		// 重新排序
		propertyList.sort((a, b) => a.priority - b.priority);

		// 清除缓存
		storage.runtimeCache.delete(propertyId);

		return true;
	}

	return false;
}

/**
 * 获取动态属性的所有贡献者
 */
export function GetDynamicPropertyContributors(scope: PropertyScope, key: PropertyKey, propertyId: string): DynamicPropertyData[] {
	const storage = GetPropertyStorage(scope, key);
	const propertyList = storage.dynamic.get(propertyId);

	if (!propertyList) return [];

	// 返回副本以防止外部修改（但回调函数是引用）
	return propertyList.map((data) => ({
		modifier: data.modifier,
		callback: data.callback,
		priority: data.priority,
		addedTime: data.addedTime,
	}));
}
