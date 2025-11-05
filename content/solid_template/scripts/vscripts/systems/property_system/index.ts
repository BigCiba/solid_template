/** @noSelfInFile */

/**
 * 属性系统主入口
 * 统一导出所有公共 API
 */

// 导出类型
export * from './types';

// 导出核心功能
export {
	CleanupPropertyStorage, GetCacheHitRate, GetPropertyConfig, InitializePropertySystem, PrintPerformanceStats, RegisterPropertyConfig,
	RegisterPropertyConfigs, ResetPerformanceStats, ValidateProperty
} from './core';

// 导出静态属性 API
export {
	AddStaticProperties, AddStaticProperty, GetStaticPropertyContributors, GetStaticPropertyValue, RecalculateStaticProperty, RemoveStaticProperty,
	UpdateStaticPropertyValue
} from './static_properties';

// 导出动态属性 API
export {
	CalculateDynamicPropertyValue, ClearAllDynamicPropertyCaches, ClearDynamicPropertyCache, GetDynamicPropertyContributors, GetDynamicPropertyValue, RegisterDynamicProperties, RegisterDynamicProperty, UnregisterDynamicProperty, UpdateDynamicPropertyPriority
} from './dynamic_properties';

// 导出网表同步 API
export {
	ForceSyncProperties, ForceSyncProperty, GetNetTableSyncStatus, GetPropertyValue,
	GetPropertyValueFromNetTable, InitializeNetTableSync, ListenPropertyChange, SyncDirtyProperties
} from './nettable_sync';

// 导出清理 API
export {
	CleanupEmptyStorages, CleanupInvalidModifiers, CleanupModifierProperties,
	CleanupModifiers, CleanupPlayerProperties, CleanupUnitProperties,
	CleanupUnits, ResetPropertySystem,
	StartAutoCleanup
} from './cleanup';

// 导出调试 API
export {
	BenchmarkPropertyRead,
	EstimateMemoryUsage, GetPropertyDebugInfo, ListRegisteredProperties, PrintAllProperties, PrintMemoryUsage, PrintPropertyDebugInfo, PrintSystemStatus, RegisterDebugCommands
} from './debug';

// 导入用于便捷函数
import { StartAutoCleanup } from './cleanup';
import { InitializePropertySystem } from './core';
import { RegisterDebugCommands } from './debug';
import { InitializeNetTableSync } from './nettable_sync';

/**
 * 便捷 API：初始化整个系统
 */
export function InitializeFullPropertySystem(options?: {
	enableNetTableSync?: boolean;
	enableAutoCleanup?: boolean;
	autoCleanupInterval?: number;
	enableDebugCommands?: boolean;
}): void {
	const opts = {
		enableNetTableSync: true,
		enableAutoCleanup: true,
		autoCleanupInterval: 30,
		enableDebugCommands: true,
		...options,
	};

	// 初始化核心系统
	InitializePropertySystem();

	// 初始化网表同步
	if (opts.enableNetTableSync && IsServer()) {
		InitializeNetTableSync();
	}

	// 启动自动清理
	if (opts.enableAutoCleanup && IsServer()) {
		StartAutoCleanup(opts.autoCleanupInterval);
	}

	// 注册调试命令
	if (opts.enableDebugCommands && IsServer()) {
		RegisterDebugCommands();
	}

	print('[PropertySystem] Full system initialized');
}
