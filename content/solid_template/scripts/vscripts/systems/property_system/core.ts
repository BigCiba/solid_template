/** @noSelfInFile */

import {
	AggregationStrategy,
	PropertyChangeEvent,
	PropertyConfig,
	PropertyKey,
	PropertyScope,
	PropertyStorage
} from './types';

/**
 * 属性系统核心模块
 * 负责初始化、存储管理、配置注册
 */

// ==================== 初始化 ====================

/**
 * 初始化属性系统
 */
export function InitializePropertySystem(): void {
	if (!PropertySystem) {
		(globalThis as any).PropertySystem = {
			configs: new Map(),
			playerStorage: new Map(),
			unitStorage: new Map(),
			dirtyKeys: new Set(),
			lastSyncTime: 0,
			stats: {
				totalReads: 0,
				cacheHits: 0,
				totalWrites: 0,
				syncCount: 0,
			},
		};

		print('[PropertySystem] System initialized');
	}
}

/**
 * 注册属性配置
 */
export function RegisterPropertyConfig(config: PropertyConfig): void {
	if (PropertySystem.configs.has(config.id)) {
		print(`[PropertySystem] Warning: Property ${config.id} already registered, overwriting`);
	}

	// 设置默认值
	const finalConfig: PropertyConfig = {
		...config,
		defaultValue: config.defaultValue ?? 0,
		syncToClient: config.syncToClient ?? true,
		syncPriority: config.syncPriority ?? 100,
		enableCache: config.enableCache ?? true,
		cacheDuration: config.cacheDuration ?? 0,
	};

	PropertySystem.configs.set(config.id, finalConfig);
	print(`[PropertySystem] Registered property: ${config.id} (scope: ${PropertyScope[config.scope]})`);
}

/**
 * 批量注册属性配置
 */
export function RegisterPropertyConfigs(configs: PropertyConfig[]): void {
	for (const config of configs) {
		RegisterPropertyConfig(config);
	}
}

// ==================== 存储管理 ====================

/**
 * 获取属性存储容器
 */
export function GetPropertyStorage(scope: PropertyScope, key: PropertyKey): PropertyStorage {
	const storageMap = scope === PropertyScope.PLAYER ? PropertySystem.playerStorage : PropertySystem.unitStorage;

	let storage = storageMap.get(key as any);
	if (!storage) {
		storage = {
			static: new Map(),
			dynamic: new Map(),
			staticCache: new Map(),
			runtimeCache: new Map(),
		};
		storageMap.set(key as any, storage);
	}

	return storage;
}

/**
 * 清理存储容器（当实体销毁时调用）
 */
export function CleanupPropertyStorage(scope: PropertyScope, key: PropertyKey): void {
	const storageMap = scope === PropertyScope.PLAYER ? PropertySystem.playerStorage : PropertySystem.unitStorage;

	const storage = storageMap.get(key as any);
	if (storage) {
		// 清空所有 Map
		storage.static.clear();
		storage.dynamic.clear();
		storage.staticCache.clear();
		storage.runtimeCache.clear();

		// 删除存储
		storageMap.delete(key as any);

		print(`[PropertySystem] Cleaned up storage for ${PropertyScope[scope]} key: ${key}`);
	}
}

/**
 * 获取属性配置
 */
export function GetPropertyConfig(propertyId: string): PropertyConfig | undefined {
	return PropertySystem.configs.get(propertyId);
}

/**
 * 验证属性是否已注册
 */
export function ValidateProperty(propertyId: string): boolean {
	if (!PropertySystem.configs.has(propertyId)) {
		print(`[PropertySystem] Error: Property ${propertyId} not registered`);
		return false;
	}
	return true;
}

// ==================== 聚合函数 ====================

/**
 * 根据聚合策略计算最终值
 */
export function AggregateValues(strategy: AggregationStrategy, current: number, value: number, customAggregator?: any): number {
	switch (strategy) {
		case AggregationStrategy.SUM:
			return current + value;

		case AggregationStrategy.MULTIPLY:
			return current * value;

		case AggregationStrategy.MAX:
			return Math.max(current, value);

		case AggregationStrategy.MIN:
			return Math.min(current, value);

		case AggregationStrategy.FIRST:
			return current !== 0 ? current : value;

		case AggregationStrategy.LAST:
			return value;

		case AggregationStrategy.CUSTOM:
			if (customAggregator && typeof customAggregator === 'function') {
				return customAggregator(current, value);
			}
			return current + value;

		default:
			return current + value;
	}
}

/**
 * 获取聚合初始值
 */
export function GetAggregationInitialValue(strategy: AggregationStrategy, defaultValue: number): number {
	switch (strategy) {
		case AggregationStrategy.MULTIPLY:
			return 1;
		case AggregationStrategy.MAX:
			return Number.NEGATIVE_INFINITY;
		case AggregationStrategy.MIN:
			return Number.POSITIVE_INFINITY;
		case AggregationStrategy.FIRST:
		case AggregationStrategy.LAST:
			return defaultValue;
		default:
			return defaultValue;
	}
}

// ==================== 工具函数 ====================

/**
 * 生成唯一的脏数据键
 */
export function GetDirtyKey(scope: PropertyScope, key: PropertyKey, propertyId: string): string {
	return `${scope}_${key}_${propertyId}`;
}

/**
 * 标记为脏数据（需要同步）
 */
export function MarkDirty(scope: PropertyScope, key: PropertyKey, propertyId: string): void {
	const dirtyKey = GetDirtyKey(scope, key, propertyId);
	PropertySystem.dirtyKeys.add(dirtyKey);
}

/**
 * 检查修饰符是否有效
 */
export function IsModifierValid(modifier: CDOTA_Modifier_Lua): boolean {
	if (!modifier) return false;
	if (!IsValid(modifier)) return false;
	if ((modifier as any)._bDestroyed === true) return false;
	return true;
}

/**
 * 获取当前帧号
 */
export function GetCurrentFrame(): number {
	return GameRules.GetDOTATime(false, false) as number;
}

/**
 * 获取当前游戏时间
 */
export function GetCurrentTime(): number {
	return GameRules.GetGameTime();
}

/**
 * 触发属性变化事件
 */
export function TriggerPropertyChangeEvent(event: PropertyChangeEvent): void {
	// TODO: 实现事件系统集成
	// GameEvents.SendEventClientSide('property_changed', event);
}

// ==================== 调试和统计 ====================

/**
 * 增加读取统计
 */
export function IncrementReadStats(cacheHit: boolean): void {
	PropertySystem.stats.totalReads++;
	if (cacheHit) {
		PropertySystem.stats.cacheHits++;
	}
}

/**
 * 增加写入统计
 */
export function IncrementWriteStats(): void {
	PropertySystem.stats.totalWrites++;
}

/**
 * 获取缓存命中率
 */
export function GetCacheHitRate(): number {
	if (PropertySystem.stats.totalReads === 0) return 0;
	return (PropertySystem.stats.cacheHits / PropertySystem.stats.totalReads) * 100;
}

/**
 * 打印性能统计
 */
export function PrintPerformanceStats(): void {
	const stats = PropertySystem.stats;
	const hitRate = GetCacheHitRate();

	print('=== Property System Performance Stats ===');
	print(`Total Reads: ${stats.totalReads}`);
	print(`Cache Hits: ${stats.cacheHits} (${hitRate.toFixed(2)}%)`);
	print(`Total Writes: ${stats.totalWrites}`);
	print(`Sync Count: ${stats.syncCount}`);
	print(`Registered Properties: ${PropertySystem.configs.size}`);
	print(`Player Storages: ${PropertySystem.playerStorage.size}`);
	print(`Unit Storages: ${PropertySystem.unitStorage.size}`);
	print('=========================================');
}

/**
 * 重置性能统计
 */
export function ResetPerformanceStats(): void {
	PropertySystem.stats = {
		totalReads: 0,
		cacheHits: 0,
		totalWrites: 0,
		syncCount: 0,
	};
	print('[PropertySystem] Performance stats reset');
}
