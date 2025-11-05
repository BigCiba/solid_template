/** @noSelfInFile */

import { GetCurrentTime, GetDirtyKey, GetPropertyConfig } from './core';
import { GetDynamicPropertyValue } from './dynamic_properties';
import { GetStaticPropertyValue } from './static_properties';
import { PropertyKey, PropertyScope } from './types';

/**
 * 网表同步模块
 * 负责将服务器端的属性值同步到客户端
 * 采用增量同步和批量更新策略以优化性能
 */

// ==================== 配置 ====================

/** 网表名称 */
const NETTABLE_NAME = 'property_system';

/** 同步间隔（秒） */
const SYNC_INTERVAL = 0.1;

/** 单次同步的最大属性数量（防止网表溢出） */
const MAX_SYNC_PER_BATCH = 50;

// ==================== 初始化 ====================

/**
 * 初始化网表同步系统
 */
export function InitializeNetTableSync(): void {
	if (IsServer()) {
		// 创建网表
		CustomNetTables.SetTableValue(NETTABLE_NAME, 'init', { version: 1, time: GetCurrentTime() });

		// 启动定时同步
		Timer.GameTimer(SYNC_INTERVAL, () => {
			SyncDirtyProperties();
			return SYNC_INTERVAL;
		});

		print('[PropertySystem] NetTable sync initialized');
	}
}

// ==================== 同步逻辑 ====================

/**
 * 同步所有脏数据
 */
export function SyncDirtyProperties(): void {
	if (!IsServer()) return;
	if (PropertySystem.dirtyKeys.size === 0) return;

	const dirtyArray = Array.from(PropertySystem.dirtyKeys);

	// 按优先级排序
	dirtyArray.sort((a, b) => {
		const [scopeA, keyA, propIdA] = a.split('_');
		const [scopeB, keyB, propIdB] = b.split('_');

		const configA = GetPropertyConfig(propIdA);
		const configB = GetPropertyConfig(propIdB);

		const priorityA = configA?.syncPriority ?? 100;
		const priorityB = configB?.syncPriority ?? 100;

		return priorityA - priorityB;
	});

	// 分批同步
	const batchCount = Math.ceil(dirtyArray.length / MAX_SYNC_PER_BATCH);

	for (let i = 0; i < batchCount; i++) {
		const batch = dirtyArray.slice(i * MAX_SYNC_PER_BATCH, (i + 1) * MAX_SYNC_PER_BATCH);
		SyncPropertyBatch(batch);
	}

	// 清空脏数据标记
	PropertySystem.dirtyKeys.clear();
	PropertySystem.lastSyncTime = GetCurrentTime();
	PropertySystem.stats.syncCount++;
}

/**
 * 同步一批属性
 */
function SyncPropertyBatch(dirtyKeys: string[]): void {
	const updates: Record<string, any> = {};

	for (const dirtyKey of dirtyKeys) {
		const [scopeStr, keyStr, propertyId] = dirtyKey.split('_');
		const scope = parseInt(scopeStr) as PropertyScope;
		const key = parseInt(keyStr) as PropertyKey;

		const value = GetPropertyValue(scope, key, propertyId);
		updates[dirtyKey] = value;
	}

	// 发送到网表
	CustomNetTables.SetTableValue(NETTABLE_NAME, 'properties', updates);
}

/**
 * 强制同步指定属性（立即同步，不等待定时器）
 */
export function ForceSyncProperty(scope: PropertyScope, key: PropertyKey, propertyId: string): void {
	if (!IsServer()) return;

	const config = GetPropertyConfig(propertyId);
	if (!config || !config.syncToClient) return;

	const dirtyKey = GetDirtyKey(scope, key, propertyId);
	const value = GetPropertyValue(scope, key, propertyId);

	const update: Record<string, any> = {};
	update[dirtyKey] = value;

	CustomNetTables.SetTableValue(NETTABLE_NAME, 'properties', update);
}

/**
 * 批量强制同步
 */
export function ForceSyncProperties(properties: Array<{ scope: PropertyScope; key: PropertyKey; propertyId: string; }>): void {
	if (!IsServer()) return;

	const updates: Record<string, any> = {};

	for (const prop of properties) {
		const config = GetPropertyConfig(prop.propertyId);
		if (!config || !config.syncToClient) continue;

		const dirtyKey = GetDirtyKey(prop.scope, prop.key, prop.propertyId);
		const value = GetPropertyValue(prop.scope, prop.key, prop.propertyId);
		updates[dirtyKey] = value;
	}

	if (Object.keys(updates).length > 0) {
		CustomNetTables.SetTableValue(NETTABLE_NAME, 'properties', updates);
	}
}

// ==================== 客户端读取 ====================

/**
 * 客户端：从网表获取属性值
 */
export function GetPropertyValueFromNetTable(scope: PropertyScope, key: PropertyKey, propertyId: string): number | undefined {
	if (IsServer()) {
		print('[PropertySystem] Warning: GetPropertyValueFromNetTable should only be called on client');
		return undefined;
	}

	const dirtyKey = GetDirtyKey(scope, key, propertyId);
	const data = CustomNetTables.GetTableValue(NETTABLE_NAME, 'properties');

	if (data && data[dirtyKey] !== undefined) {
		return data[dirtyKey] as number;
	}

	return undefined;
}

/**
 * 客户端：监听属性变化
 * 注意：Lua客户端没有SubscribeNetTableListener，需要通过定时器轮询实现
 */
export function ListenPropertyChange(
	scope: PropertyScope,
	key: PropertyKey,
	propertyId: string,
	callback: (oldValue: number | undefined, newValue: number | undefined) => void
): void {
	if (IsServer()) {
		print('[PropertySystem] Warning: ListenPropertyChange should only be called on client');
		return;
	}

	const dirtyKey = GetDirtyKey(scope, key, propertyId);
	let lastValue = GetPropertyValueFromNetTable(scope, key, propertyId);

	// Lua客户端需要使用定时器轮询网表变化
	Timer.GameTimer(0.1, () => {
		const newValue = GetPropertyValueFromNetTable(scope, key, propertyId);
		if (newValue !== lastValue) {
			callback(lastValue, newValue);
			lastValue = newValue;
		}
		return 0.1; // 继续轮询
	});
}

// ==================== 工具函数 ====================

/**
 * 获取属性值（服务器端：计算，客户端：从网表读取）
 */
export function GetPropertyValue(scope: PropertyScope, key: PropertyKey, propertyId: string, params?: any): number {
	if (IsServer()) {
		// 服务器端：静态值 + 动态值
		const staticValue = GetStaticPropertyValue(scope, key, propertyId);
		const dynamicValue = GetDynamicPropertyValue(scope, key, propertyId, params);

		const config = GetPropertyConfig(propertyId);
		if (!config) return 0;

		// 根据聚合策略合并
		// 注意：这里简化处理，假设静态和动态都是累加
		// 实际项目中可能需要更复杂的逻辑
		return staticValue + dynamicValue;
	} else {
		// 客户端：从网表读取
		return GetPropertyValueFromNetTable(scope, key, propertyId) ?? 0;
	}
}

/**
 * 获取网表同步状态
 */
export function GetNetTableSyncStatus(): {
	dirtyCount: number;
	lastSyncTime: number;
	syncCount: number;
} {
	return {
		dirtyCount: PropertySystem.dirtyKeys.size,
		lastSyncTime: PropertySystem.lastSyncTime,
		syncCount: PropertySystem.stats.syncCount,
	};
}
