/** @noSelfInFile */

import { GetPropertyConfig, GetPropertyStorage, PrintPerformanceStats, ResetPerformanceStats } from './core';
import { CalculateDynamicPropertyValue, GetDynamicPropertyContributors } from './dynamic_properties';
import { GetNetTableSyncStatus } from './nettable_sync';
import { GetStaticPropertyContributors } from './static_properties';
import { PropertyDebugInfo, PropertyKey, PropertyScope } from './types';

/**
 * 调试模块
 * 提供详细的调试信息和可视化工具
 */

// ==================== 属性调试 ====================

/**
 * 获取属性的详细调试信息
 */
export function GetPropertyDebugInfo(scope: PropertyScope, key: PropertyKey, propertyId: string, params?: any): PropertyDebugInfo | undefined {
	const config = GetPropertyConfig(propertyId);
	if (!config) {
		print(`[PropertySystem] Debug: Property ${propertyId} not registered`);
		return undefined;
	}

	const storage = GetPropertyStorage(scope, key);

	// 获取静态属性贡献
	const staticContributors = GetStaticPropertyContributors(scope, key, propertyId);
	const staticContributions = staticContributors.map((data) => ({
		modifierName: data.modifier.GetName(),
		value: data.value,
		addedTime: data.addedTime,
	}));

	// 获取动态属性贡献
	const dynamicContributors = GetDynamicPropertyContributors(scope, key, propertyId);
	const dynamicContributions = dynamicContributors.map((data) => {
		let value = 0;
		try {
			value = data.callback(params) ?? 0;
		} catch (error) {
			print(`Error evaluating callback: ${error}`);
		}
		return {
			modifierName: data.modifier.GetName(),
			value,
			priority: data.priority,
			addedTime: data.addedTime,
		};
	});

	// 计算总值
	const staticTotal = storage.staticCache.get(propertyId) ?? 0;
	const dynamicTotal = CalculateDynamicPropertyValue(scope, key, propertyId, params);
	const totalValue = staticTotal + dynamicTotal;

	// 缓存状态
	const cache = storage.runtimeCache.get(propertyId);
	const cacheStatus = {
		enabled: config.enableCache ?? false,
		cached: cache !== undefined,
		frame: cache?.frame,
		age: cache ? storage.runtimeCache.size - cache.frame : undefined,
	};

	return {
		propertyId,
		key,
		totalValue,
		staticContributions,
		dynamicContributions,
		cacheStatus,
	};
}

/**
 * 打印属性调试信息
 */
export function PrintPropertyDebugInfo(scope: PropertyScope, key: PropertyKey, propertyId: string, params?: any): void {
	const info = GetPropertyDebugInfo(scope, key, propertyId, params);
	if (!info) return;

	print('=== Property Debug Info ===');
	print(`Property: ${info.propertyId}`);
	print(`Scope: ${PropertyScope[scope]} (Key: ${key})`);
	print(`Total Value: ${info.totalValue}`);
	print('');

	if (info.staticContributions.length > 0) {
		print(`Static Contributions (${info.staticContributions.length}):`);
		for (const contrib of info.staticContributions) {
			print(`  - ${contrib.modifierName}: ${contrib.value} (added: ${contrib.addedTime.toFixed(2)}s)`);
		}
		print('');
	}

	if (info.dynamicContributions.length > 0) {
		print(`Dynamic Contributions (${info.dynamicContributions.length}):`);
		for (const contrib of info.dynamicContributions) {
			print(`  - ${contrib.modifierName}: ${contrib.value} (priority: ${contrib.priority}, added: ${contrib.addedTime.toFixed(2)}s)`);
		}
		print('');
	}

	if (info.cacheStatus.enabled) {
		print(`Cache Status:`);
		print(`  - Enabled: ${info.cacheStatus.enabled}`);
		print(`  - Cached: ${info.cacheStatus.cached}`);
		if (info.cacheStatus.cached) {
			print(`  - Frame: ${info.cacheStatus.frame}`);
			print(`  - Age: ${info.cacheStatus.age} frames`);
		}
		print('');
	}

	print('===========================');
}

/**
 * 打印单位/玩家的所有属性
 */
export function PrintAllProperties(scope: PropertyScope, key: PropertyKey): void {
	const storage = GetPropertyStorage(scope, key);

	print('=== All Properties ===');
	print(`Scope: ${PropertyScope[scope]} (Key: ${key})`);
	print('');

	// 静态属性
	if (storage.static.size > 0) {
		print('Static Properties:');
		for (const [propertyId, propertyList] of storage.static) {
			const cachedValue = storage.staticCache.get(propertyId) ?? 0;
			print(`  ${propertyId}: ${cachedValue} (${propertyList.length} modifiers)`);
		}
		print('');
	}

	// 动态属性
	if (storage.dynamic.size > 0) {
		print('Dynamic Properties:');
		for (const [propertyId, propertyList] of storage.dynamic) {
			print(`  ${propertyId}: (${propertyList.length} modifiers)`);
		}
		print('');
	}

	print('======================');
}

// ==================== 系统调试 ====================

/**
 * 打印系统状态
 */
export function PrintSystemStatus(): void {
	print('=== Property System Status ===');
	print(`Registered Properties: ${PropertySystem.configs.size}`);
	print(`Player Storages: ${PropertySystem.playerStorage.size}`);
	print(`Unit Storages: ${PropertySystem.unitStorage.size}`);
	print(`Dirty Keys: ${PropertySystem.dirtyKeys.size}`);
	print('');

	const syncStatus = GetNetTableSyncStatus();
	print('NetTable Sync:');
	print(`  - Pending: ${syncStatus.dirtyCount}`);
	print(`  - Last Sync: ${syncStatus.lastSyncTime.toFixed(2)}s`);
	print(`  - Total Syncs: ${syncStatus.syncCount}`);
	print('');

	PrintPerformanceStats();
	print('==============================');
}

/**
 * 列出所有已注册的属性
 */
export function ListRegisteredProperties(): void {
	print('=== Registered Properties ===');
	for (const [propertyId, config] of PropertySystem.configs) {
		print(`${propertyId}:`);
		print(`  - Scope: ${PropertyScope[config.scope]}`);
		print(`  - Sync: ${config.syncToClient}`);
		print(`  - Cache: ${config.enableCache}`);
		print(`  - Priority: ${config.syncPriority}`);
	}
	print('=============================');
}

// ==================== 控制台命令（调试用） ====================

/**
 * 注册控制台调试命令
 */
export function RegisterDebugCommands(): void {
	if (!IsServer()) return;

	// 这些命令需要在游戏中通过控制台执行
	// 例如: script_reload property_system_debug

	Convars.RegisterCommand(
		'property_debug',
		(command: string, ...args: string[]) => {
			if (args.length < 3) {
				print('Usage: property_debug <scope> <key> <propertyId> [params]');
				return;
			}

			const scope = parseInt(args[0]) as PropertyScope;
			const key = parseInt(args[1]) as PropertyKey;
			const propertyId = args[2];

			PrintPropertyDebugInfo(scope, key, propertyId);
		},
		'Debug a specific property',
		0
	);

	Convars.RegisterCommand(
		'property_status',
		() => {
			PrintSystemStatus();
		},
		'Print property system status',
		0
	);

	Convars.RegisterCommand(
		'property_list',
		() => {
			ListRegisteredProperties();
		},
		'List all registered properties',
		0
	);

	Convars.RegisterCommand(
		'property_reset_stats',
		() => {
			ResetPerformanceStats();
		},
		'Reset performance statistics',
		0
	);

	print('[PropertySystem] Debug commands registered');
}

// ==================== 性能分析 ====================

/**
 * 测量属性读取性能
 */
export function BenchmarkPropertyRead(scope: PropertyScope, key: PropertyKey, propertyId: string, iterations: number = 1000): void {
	const startTime = Time();

	for (let i = 0; i < iterations; i++) {
		const storage = GetPropertyStorage(scope, key);
		const value = storage.staticCache.get(propertyId);
	}

	const endTime = Time();
	const elapsed = (endTime - startTime) * 1000;
	const avgTime = elapsed / iterations;

	print('=== Property Read Benchmark ===');
	print(`Property: ${propertyId}`);
	print(`Iterations: ${iterations}`);
	print(`Total Time: ${elapsed.toFixed(3)}ms`);
	print(`Avg Time: ${avgTime.toFixed(6)}ms`);
	print(`Reads/sec: ${(1000 / avgTime).toFixed(0)}`);
	print('===============================');
}

/**
 * 获取内存使用估算
 */
export function EstimateMemoryUsage(): {
	playerStorages: number;
	unitStorages: number;
	totalProperties: number;
	totalModifiers: number;
} {
	let totalProperties = 0;
	let totalModifiers = 0;

	for (const [, storage] of PropertySystem.playerStorage) {
		for (const [, propertyList] of storage.static) {
			totalProperties++;
			totalModifiers += propertyList.length;
		}
		for (const [, propertyList] of storage.dynamic) {
			totalProperties++;
			totalModifiers += propertyList.length;
		}
	}

	for (const [, storage] of PropertySystem.unitStorage) {
		for (const [, propertyList] of storage.static) {
			totalProperties++;
			totalModifiers += propertyList.length;
		}
		for (const [, propertyList] of storage.dynamic) {
			totalProperties++;
			totalModifiers += propertyList.length;
		}
	}

	return {
		playerStorages: PropertySystem.playerStorage.size,
		unitStorages: PropertySystem.unitStorage.size,
		totalProperties,
		totalModifiers,
	};
}

/**
 * 打印内存使用估算
 */
export function PrintMemoryUsage(): void {
	const usage = EstimateMemoryUsage();

	print('=== Memory Usage Estimate ===');
	print(`Player Storages: ${usage.playerStorages}`);
	print(`Unit Storages: ${usage.unitStorages}`);
	print(`Total Properties: ${usage.totalProperties}`);
	print(`Total Modifiers: ${usage.totalModifiers}`);
	print(`Avg Modifiers/Property: ${(usage.totalModifiers / Math.max(1, usage.totalProperties)).toFixed(2)}`);
	print('=============================');
}
