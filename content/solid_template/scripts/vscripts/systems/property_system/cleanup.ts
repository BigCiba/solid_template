/** @noSelfInFile */

import { CleanupPropertyStorage } from './core';
import { ClearDynamicPropertyCache, UnregisterDynamicProperty } from './dynamic_properties';
import { RemoveStaticProperty } from './static_properties';
import { PropertyKey, PropertyScope } from './types';

/**
 * 清理模块
 * 负责防止内存泄漏，自动清理无效的修饰符和实体
 */

// ==================== 修饰符清理 ====================

/**
 * 清理修饰符的所有属性（在 OnDestroy 时调用）
 */
export function CleanupModifierProperties(modifier: CDOTA_Modifier_Lua, key?: PropertyKey): void {
	if (!modifier) return;

	// 移除静态属性
	RemoveStaticProperty(modifier, undefined, key);

	// 移除动态属性
	UnregisterDynamicProperty(modifier, undefined, key);

	print(`[PropertySystem] Cleaned up modifier: ${modifier.GetName()}`);
}

/**
 * 批量清理修饰符
 */
export function CleanupModifiers(modifiers: CDOTA_Modifier_Lua[]): void {
	for (const modifier of modifiers) {
		CleanupModifierProperties(modifier);
	}
}

// ==================== 单位清理 ====================

/**
 * 清理单位的所有属性（在单位死亡/移除时调用）
 */
export function CleanupUnitProperties(unit: CDOTA_BaseNPC): void {
	if (!unit) return;

	const entIndex = unit.GetEntityIndex();

	// 清理单位属性
	CleanupPropertyStorage(PropertyScope.UNIT, entIndex);

	// 如果单位有玩家所有者，也清理玩家属性（可选）
	const playerID = unit.GetPlayerOwnerID();
	if (playerID !== -1) {
		// 注意：这里不直接清理玩家属性，因为玩家可能控制多个单位
		// 只清除该单位对应的缓存
		ClearDynamicPropertyCache(PropertyScope.PLAYER, playerID);
	}

	print(`[PropertySystem] Cleaned up unit: ${unit.GetUnitName()} (${entIndex})`);
}

/**
 * 批量清理单位
 */
export function CleanupUnits(units: CDOTA_BaseNPC[]): void {
	for (const unit of units) {
		CleanupUnitProperties(unit);
	}
}

// ==================== 玩家清理 ====================

/**
 * 清理玩家的所有属性（在玩家断开连接时调用）
 */
export function CleanupPlayerProperties(playerID: PlayerID): void {
	if (playerID < 0) return;

	CleanupPropertyStorage(PropertyScope.PLAYER, playerID);

	print(`[PropertySystem] Cleaned up player: ${playerID}`);
}

// ==================== 全局清理 ====================

/**
 * 清理所有无效的修饰符引用（定期调用）
 */
export function CleanupInvalidModifiers(): number {
	let cleanedCount = 0;

	// 清理玩家存储
	for (const [key, storage] of PropertySystem.playerStorage) {
		cleanedCount += CleanupStorageInvalidModifiers(storage);
	}

	// 清理单位存储
	for (const [key, storage] of PropertySystem.unitStorage) {
		cleanedCount += CleanupStorageInvalidModifiers(storage);
	}

	if (cleanedCount > 0) {
		print(`[PropertySystem] Cleaned up ${cleanedCount} invalid modifiers`);
	}

	return cleanedCount;
}

/**
 * 清理存储中的无效修饰符
 */
function CleanupStorageInvalidModifiers(storage: any): number {
	let cleanedCount = 0;

	// 清理静态属性
	for (const [propertyId, propertyList] of storage.static) {
		for (let i = propertyList.length - 1; i >= 0; i--) {
			const data = propertyList[i];
			if (!IsValid(data.modifier) || (data.modifier as any)._bDestroyed === true) {
				propertyList.splice(i, 1);
				cleanedCount++;
			}
		}

		// 如果列表为空，删除整个属性
		if (propertyList.length === 0) {
			storage.static.delete(propertyId);
			storage.staticCache.delete(propertyId);
		}
	}

	// 清理动态属性
	for (const [propertyId, propertyList] of storage.dynamic) {
		for (let i = propertyList.length - 1; i >= 0; i--) {
			const data = propertyList[i];
			if (!IsValid(data.modifier) || (data.modifier as any)._bDestroyed === true) {
				propertyList.splice(i, 1);
				cleanedCount++;
			}
		}

		// 如果列表为空，删除整个属性
		if (propertyList.length === 0) {
			storage.dynamic.delete(propertyId);
		}
	}

	return cleanedCount;
}

/**
 * 清理所有空的存储容器
 */
export function CleanupEmptyStorages(): number {
	let cleanedCount = 0;

	// 清理玩家存储
	for (const [key, storage] of PropertySystem.playerStorage) {
		if (IsStorageEmpty(storage)) {
			PropertySystem.playerStorage.delete(key);
			cleanedCount++;
		}
	}

	// 清理单位存储
	for (const [key, storage] of PropertySystem.unitStorage) {
		if (IsStorageEmpty(storage)) {
			PropertySystem.unitStorage.delete(key);
			cleanedCount++;
		}
	}

	if (cleanedCount > 0) {
		print(`[PropertySystem] Cleaned up ${cleanedCount} empty storages`);
	}

	return cleanedCount;
}

/**
 * 检查存储是否为空
 */
function IsStorageEmpty(storage: any): boolean {
	return storage.static.size === 0 && storage.dynamic.size === 0 && storage.staticCache.size === 0 && storage.runtimeCache.size === 0;
}

/**
 * 重置整个属性系统（测试用）
 */
export function ResetPropertySystem(): void {
	// 清空所有存储
	PropertySystem.playerStorage.clear();
	PropertySystem.unitStorage.clear();
	PropertySystem.dirtyKeys.clear();

	// 重置统计
	PropertySystem.stats = {
		totalReads: 0,
		cacheHits: 0,
		totalWrites: 0,
		syncCount: 0,
	};

	print('[PropertySystem] System reset complete');
}

// ==================== 自动清理 ====================

/**
 * 启动自动清理定时器
 */
export function StartAutoCleanup(intervalSeconds: number = 30): void {
	if (!IsServer()) return;

	Timer.GameTimer(intervalSeconds, () => {
		CleanupInvalidModifiers();
		CleanupEmptyStorages();
		return intervalSeconds;
	});

	print(`[PropertySystem] Auto cleanup started (interval: ${intervalSeconds}s)`);
}
