/** @noSelfInFile */

import { reloadable } from "../../lib/tstl-utils";

/**
 * 属性系统 - 整合版 CModule
 * 
 * 完整的属性管理系统，支持：
 * - 双作用域（玩家/单位级别）
 * - 双类型（静态/动态属性）
 * - 自动网表同步
 * - 多层缓存优化
 * - 自动内存清理
 * - 完整调试工具
 * 
 */

// ==================== 类型定义 ====================
require('property_system_types');

// ==================== 主类定义 ====================
@reloadable
class MPropertySystem extends CModule {
	// 网表同步配置
	private readonly NETTABLE_NAME = 'property_system';
	private readonly SYNC_INTERVAL = 0.2;
	private readonly MAX_NETTABLE_SIZE = 14000; // 留余量，实际限制是 16KB

	// 自动清理配置
	private autoCleanupInterval = 30;

	init(reload: boolean): void {
		if (!reload) {
			this.InitializeCore();

			if (IsServer()) {
				this.InitializeNetTableSync();
				this.StartAutoCleanup();
				this.RegisterDebugCommands();
			}

			this.print('Property System initialized');
		} else {
			this.print('Property System reloaded');
		}
	}

	initPriority(): number {
		return 10; // 较高优先级，在大多数系统之前初始化
	}

	reset(): void {
		this.ResetSystem();
	}

	// ==================== 核心初始化 ====================

	private InitializeCore(): void {
		if (!PropertyData) {
			PropertyData = {
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
		}
	}

	// ==================== 属性配置 ====================

	/** 注册单个属性配置 */
	RegisterProperty(config: PropertyConfig): void {
		const finalConfig: PropertyConfig = {
			...config,
			defaultValue: config.defaultValue ?? 0,
			syncToClient: config.syncToClient ?? true,
			syncPriority: config.syncPriority ?? 100,
			enableCache: config.enableCache ?? true,
			cacheDuration: config.cacheDuration ?? 0,
		};

		PropertyData.configs.set(config.id, finalConfig);
		this.print(`Registered: ${config.id} (${PropertyScope[config.scope]})`);
	}

	/** 批量注册属性配置 */
	RegisterProperties(configs: PropertyConfig[]): void {
		for (const config of configs) {
			this.RegisterProperty(config);
		}
	}

	// ==================== 静态属性 API ====================

	/**
	 * 添加静态属性（不依赖 modifier）
	 * @param key 目标键（playerID 或 entityIndex）
	 * @param propertyId 属性 ID
	 * @param sourceId 属性来源的唯一标识（如 "item_sword", "ability_crit", "buff_aura"）
	 * @param value 属性值
	 * @param metadata 可选的元数据
	 */
	AddStaticProperty(
		key: PropertySystemKey,
		propertyId: string,
		sourceId: string,
		value: number,
		metadata?: Record<string, any>
	): boolean {
		if (!this.ValidateProperty(propertyId)) return false;

		const config = this.GetConfig(propertyId)!;
		const storage = this.GetStorage(config.scope, key);
		let propertyList = storage.static.get(propertyId);

		if (!propertyList) {
			propertyList = [];
			storage.static.set(propertyId, propertyList);
		}

		// 检查是否已存在相同 sourceId
		const existingIndex = propertyList.findIndex(d => d.sourceId === sourceId);
		if (existingIndex !== -1) {
			// 更新现有值
			propertyList[existingIndex].value = value;
			propertyList[existingIndex].metadata = metadata;
		} else {
			// 添加新属性
			propertyList.push({
				sourceId,
				value,
				addedTime: this.GetCurrentTime(),
				metadata,
			});
		}

		this.RecalculateStaticProperty(config.scope, key, propertyId);

		if (config.syncToClient) {
			this.MarkDirty(config.scope, key, propertyId);
		}

		PropertyData.stats.totalWrites++;
		return true;
	}

	/**
	 * 移除静态属性
	 * @param key 目标键
	 * @param sourceId 属性来源 ID
	 * @param propertyId 属性 ID（可选，不传则移除该 sourceId 的所有属性）
	 */
	RemoveStaticProperty(
		key: PropertySystemKey,
		sourceId: string,
		propertyId?: string
	): boolean {
		if (propertyId) {
			return this.RemoveSingleStaticProperty(key, sourceId, propertyId);
		} else {
			// 移除该 sourceId 的所有属性
			let removed = false;
			for (const [pid] of PropertyData.configs) {
				if (this.RemoveSingleStaticProperty(key, sourceId, pid)) {
					removed = true;
				}
			}
			return removed;
		}
	}

	private RemoveSingleStaticProperty(
		key: PropertySystemKey,
		sourceId: string,
		propertyId: string
	): boolean {
		if (!this.ValidateProperty(propertyId)) return false;

		const config = this.GetConfig(propertyId)!;
		const storage = this.GetStorage(config.scope, key);
		const propertyList = storage.static.get(propertyId);

		if (!propertyList) return false;

		const index = propertyList.findIndex(d => d.sourceId === sourceId);
		if (index !== -1) {
			propertyList.splice(index, 1);

			if (propertyList.length === 0) {
				storage.static.delete(propertyId);
				storage.staticCache.delete(propertyId);
			} else {
				this.RecalculateStaticProperty(config.scope, key, propertyId);
			}

			if (config.syncToClient) {
				this.MarkDirty(config.scope, key, propertyId);
			}

			return true;
		}

		return false;
	}

	/**
	 * 更新静态属性值
	 * @param key 目标键
	 * @param propertyId 属性 ID
	 * @param sourceId 属性来源 ID
	 * @param newValue 新值
	 */
	UpdateStaticPropertyValue(
		key: PropertySystemKey,
		propertyId: string,
		sourceId: string,
		newValue: number
	): boolean {
		if (!this.ValidateProperty(propertyId)) return false;

		const config = this.GetConfig(propertyId)!;
		const storage = this.GetStorage(config.scope, key);
		const propertyList = storage.static.get(propertyId);

		if (!propertyList) return false;

		const data = propertyList.find(d => d.sourceId === sourceId);
		if (data) {
			data.value = newValue;
			this.RecalculateStaticProperty(config.scope, key, propertyId);

			if (config.syncToClient) {
				this.MarkDirty(config.scope, key, propertyId);
			}

			return true;
		}

		return false;
	}

	/** 获取静态属性值 */
	GetStaticPropertyValue(scope: PropertyScope, key: PropertySystemKey, propertyId: string): number {
		const config = this.GetConfig(propertyId);
		if (!config) return 0;

		const storage = this.GetStorage(scope, key);
		const cachedValue = storage.staticCache.get(propertyId);

		PropertyData.stats.totalReads++;
		if (cachedValue !== undefined) {
			PropertyData.stats.cacheHits++;
		}

		return cachedValue ?? config.defaultValue ?? 0;
	}

	private RecalculateStaticProperty(scope: PropertyScope, key: PropertySystemKey, propertyId: string): void {
		const config = this.GetConfig(propertyId);
		if (!config) return;

		const storage = this.GetStorage(scope, key);
		const propertyList = storage.static.get(propertyId);

		if (!propertyList || propertyList.length === 0) {
			storage.staticCache.delete(propertyId);
			return;
		}

		// 计算总和（静态属性不需要清理无效项）
		let result = this.GetAggregationInitialValue(config.aggregation, config.defaultValue ?? 0);

		for (const data of propertyList) {
			result = this.AggregateValues(config.aggregation, result, data.value, config.customAggregator);
		}

		storage.staticCache.set(propertyId, result);
	}

	// ==================== 动态属性 API ====================

	/**
	 * 注册动态属性（不依赖 modifier）
	 * @param key 目标键
	 * @param propertyId 属性 ID
	 * @param sourceId 属性来源的唯一标识
	 * @param callback 回调函数
	 * @param priority 优先级（越小越先执行）
	 * @param metadata 可选的元数据
	 */
	RegisterDynamicProperty(
		key: PropertySystemKey,
		propertyId: string,
		sourceId: string,
		callback: DynamicPropertyCallback,
		priority: number = 0,
		metadata?: Record<string, any>
	): boolean {
		if (!this.ValidateProperty(propertyId)) return false;

		const config = this.GetConfig(propertyId)!;
		const storage = this.GetStorage(config.scope, key);
		let propertyList = storage.dynamic.get(propertyId);

		if (!propertyList) {
			propertyList = [];
			storage.dynamic.set(propertyId, propertyList);
		}

		const existingIndex = propertyList.findIndex(d => d.sourceId === sourceId);
		if (existingIndex !== -1) {
			// 更新现有的
			propertyList[existingIndex].callback = callback;
			propertyList[existingIndex].priority = priority;
			propertyList[existingIndex].metadata = metadata;
		} else {
			// 添加新的
			propertyList.push({
				sourceId,
				callback,
				priority,
				addedTime: this.GetCurrentTime(),
				metadata,
			});
		}

		propertyList.sort((a, b) => a.priority - b.priority);
		storage.runtimeCache.delete(propertyId);

		if (config.syncToClient) {
			this.MarkDirty(config.scope, key, propertyId);
		}

		PropertyData.stats.totalWrites++;
		return true;
	}

	/**
	 * 注销动态属性
	 * @param key 目标键
	 * @param sourceId 属性来源 ID
	 * @param propertyId 属性 ID（可选）
	 */
	UnregisterDynamicProperty(
		key: PropertySystemKey,
		sourceId: string,
		propertyId?: string
	): boolean {
		if (propertyId) {
			return this.UnregisterSingleDynamicProperty(key, sourceId, propertyId);
		} else {
			// 移除该 sourceId 的所有动态属性
			let removed = false;
			for (const [pid] of PropertyData.configs) {
				if (this.UnregisterSingleDynamicProperty(key, sourceId, pid)) {
					removed = true;
				}
			}
			return removed;
		}
	}

	private UnregisterSingleDynamicProperty(
		key: PropertySystemKey,
		sourceId: string,
		propertyId: string
	): boolean {
		if (!this.ValidateProperty(propertyId)) return false;

		const config = this.GetConfig(propertyId)!;
		const storage = this.GetStorage(config.scope, key);
		const propertyList = storage.dynamic.get(propertyId);

		if (!propertyList) return false;

		const index = propertyList.findIndex(d => d.sourceId === sourceId);
		if (index !== -1) {
			propertyList.splice(index, 1);

			if (propertyList.length === 0) {
				storage.dynamic.delete(propertyId);
			}

			storage.runtimeCache.delete(propertyId);

			if (config.syncToClient) {
				this.MarkDirty(config.scope, key, propertyId);
			}

			return true;
		}

		return false;
	}

	/** 获取动态属性值（带缓存） */
	GetDynamicPropertyValue(scope: PropertyScope, key: PropertySystemKey, propertyId: string, params?: any): number {
		const config = this.GetConfig(propertyId);
		if (!config) return 0;

		const storage = this.GetStorage(scope, key);

		// 检查缓存
		if (config.enableCache) {
			const cached = storage.runtimeCache.get(propertyId);
			const currentFrame = this.GetCurrentFrame();

			if (cached) {
				const frameAge = currentFrame - cached.frame;
				if (frameAge <= (config.cacheDuration ?? 0)) {
					PropertyData.stats.totalReads++;
					PropertyData.stats.cacheHits++;
					return cached.value;
				}
			}
		}

		// 计算新值
		const value = this.CalculateDynamicPropertyValue(scope, key, propertyId, params);

		// 更新缓存
		if (config.enableCache) {
			storage.runtimeCache.set(propertyId, {
				value,
				frame: this.GetCurrentFrame(),
				time: this.GetCurrentTime(),
			});
		}

		PropertyData.stats.totalReads++;
		return value;
	}

	private CalculateDynamicPropertyValue(scope: PropertyScope, key: PropertySystemKey, propertyId: string, params?: any): number {
		const config = this.GetConfig(propertyId);
		if (!config) return 0;

		const storage = this.GetStorage(scope, key);
		const propertyList = storage.dynamic.get(propertyId);

		if (!propertyList || propertyList.length === 0) {
			return config.defaultValue ?? 0;
		}

		// 计算总和（动态属性不需要清理无效项）
		let result = this.GetAggregationInitialValue(config.aggregation, config.defaultValue ?? 0);

		for (const data of propertyList) {
			try {
				const value = data.callback(params);
				if (value !== undefined) {
					result = this.AggregateValues(config.aggregation, result, value, config.customAggregator);
				}
			} catch (error) {
				this.print(`Error in callback for ${propertyId} (sourceId: ${data.sourceId}): ${error}`);
			}
		}

		return result;
	}

	/** 清除动态属性缓存 */
	ClearDynamicPropertyCache(scope: PropertyScope, key: PropertySystemKey, propertyId?: string): void {
		const storage = this.GetStorage(scope, key);

		if (propertyId) {
			storage.runtimeCache.delete(propertyId);
		} else {
			storage.runtimeCache.clear();
		}
	}

	// ==================== 通用属性值获取 ====================

	/** 获取属性值（静态 + 动态） */
	GetPropertyValue(scope: PropertyScope, key: PropertySystemKey, propertyId: string, params?: any): number {
		const staticValue = this.GetStaticPropertyValue(scope, key, propertyId);
		const dynamicValue = this.GetDynamicPropertyValue(scope, key, propertyId, params);

		// 简化处理：累加
		// 实际项目中可能需要更复杂的合并逻辑
		return staticValue + dynamicValue;
	}

	// ==================== 网表同步 ====================

	private InitializeNetTableSync(): void {
		CustomNetTables.SetTableValue(this.NETTABLE_NAME, 'init', {
			version: 1,
			time: this.GetCurrentTime(),
		});

		Timer.GameTimer(this.SYNC_INTERVAL, () => {
			this.SyncDirtyProperties();
			return this.SYNC_INTERVAL;
		});

		this.print('NetTable sync initialized');
	}

	private SyncDirtyProperties(): void {
		if (PropertyData.dirtyKeys.size === 0) return;

		const dirtyArray = Array.from(PropertyData.dirtyKeys);

		// 按 scope+key 分组（每个单位/玩家一个网表 key）
		const groupedByEntity = new Map<string, string[]>();

		for (const dirtyKey of dirtyArray) {
			const [scopeStr, keyStr] = dirtyKey.split('|');
			const entityKey = `${scopeStr}_${keyStr}`; // 例如：UNIT_0, PLAYER_1

			if (!groupedByEntity.has(entityKey)) {
				groupedByEntity.set(entityKey, []);
			}
			groupedByEntity.get(entityKey)!.push(dirtyKey);
		}

		// 按优先级排序各组
		for (const [entityKey, keys] of groupedByEntity) {
			keys.sort((a, b) => {
				const [, , propIdA] = a.split('|');
				const [, , propIdB] = b.split('|');

				const configA = this.GetConfig(propIdA);
				const configB = this.GetConfig(propIdB);

				const priorityA = configA?.syncPriority ?? 100;
				const priorityB = configB?.syncPriority ?? 100;

				return priorityA - priorityB;
			});

			// 按单位/玩家同步（每个单位一个独立的网表 key）
			this.SyncEntityBatch(entityKey, keys);
		}

		PropertyData.dirtyKeys.clear();
		PropertyData.lastSyncTime = this.GetCurrentTime();
		PropertyData.stats.syncCount++;
	}

	/**
	 * 同步单个实体的属性（按网表文档建议：每个单位一个 key）
	 * 避免大对象反复整块重发，控制单次更新体积
	 */
	private SyncEntityBatch(entityKey: string, dirtyKeys: string[]): void {
		const updates: Record<string, number> = {};
		let estimatedSize = 50; // 基础开销估算

		for (const dirtyKey of dirtyKeys) {
			const [scopeStr, keyStr, propertyId] = dirtyKey.split('|');
			const scope = parseInt(scopeStr) as PropertyScope;
			const key = parseInt(keyStr) as PropertySystemKey;

			const value = this.GetPropertyValue(scope, key, propertyId);
			updates[propertyId] = value;

			// 粗略估算大小（key + value）
			estimatedSize += propertyId.length + 10; // 10 字节用于数字和格式化
		}

		// 体积检查
		if (estimatedSize > this.MAX_NETTABLE_SIZE) {
			this.print(`Warning: NetTable update for ${entityKey} may exceed size limit (${estimatedSize} bytes)`);
		}

		// 使用实体专属的 key（例如：unit_0, player_1）
		CustomNetTables.SetTableValue(this.NETTABLE_NAME, entityKey, updates);
	}

	/** 强制同步指定属性（立即执行） */
	ForceSyncProperty(scope: PropertyScope, key: PropertySystemKey, propertyId: string): void {
		if (!IsServer()) return;

		const config = this.GetConfig(propertyId);
		if (!config || !config.syncToClient) return;

		const entityKey = `${scope}_${key}`;
		const value = this.GetPropertyValue(scope, key, propertyId);

		// 获取该实体的现有数据并合并
		const existingData = CustomNetTables.GetTableValue(this.NETTABLE_NAME, entityKey);
		const update: Record<string, number> = existingData ? { ...existingData } : {};
		update[propertyId] = value;

		CustomNetTables.SetTableValue(this.NETTABLE_NAME, entityKey, update);

		// 从脏标记中移除（因为已经同步）
		const dirtyKey = this.GetDirtyKey(scope, key, propertyId);
		PropertyData.dirtyKeys.delete(dirtyKey);
	}

	/** 强制同步实体的所有属性（立即执行） */
	ForceSyncEntity(scope: PropertyScope, key: PropertySystemKey): void {
		if (!IsServer()) return;

		const storage = this.GetStorage(scope, key);
		const entityKey = `${scope}_${key}`;
		const updates: Record<string, number> = {};

		// 收集所有需要同步的属性
		for (const [propertyId] of storage.static) {
			const config = this.GetConfig(propertyId);
			if (config && config.syncToClient) {
				const value = this.GetPropertyValue(scope, key, propertyId);
				updates[propertyId] = value;

				// 从脏标记中移除
				const dirtyKey = this.GetDirtyKey(scope, key, propertyId);
				PropertyData.dirtyKeys.delete(dirtyKey);
			}
		}

		for (const [propertyId] of storage.dynamic) {
			const config = this.GetConfig(propertyId);
			if (config && config.syncToClient) {
				const value = this.GetPropertyValue(scope, key, propertyId);
				updates[propertyId] = value;

				// 从脏标记中移除
				const dirtyKey = this.GetDirtyKey(scope, key, propertyId);
				PropertyData.dirtyKeys.delete(dirtyKey);
			}
		}

		if (Object.keys(updates).length > 0) {
			CustomNetTables.SetTableValue(this.NETTABLE_NAME, entityKey, updates);
		}
	}

	/** 从网表获取属性值（服务器和客户端都可用） */
	GetPropertyValueFromNetTable(scope: PropertyScope, key: PropertySystemKey, propertyId: string): number | undefined {
		const entityKey = `${scope}_${key}`;
		const data = CustomNetTables.GetTableValue(this.NETTABLE_NAME, entityKey);

		if (data && data[propertyId] !== undefined) {
			return data[propertyId] as number;
		}

		return undefined;
	}

	/** 客户端：监听属性变化（使用定时器轮询） */
	ListenPropertyChange(
		scope: PropertyScope,
		key: PropertySystemKey,
		propertyId: string,
		callback: (oldValue: number | undefined, newValue: number | undefined) => void
	): void {
		if (IsServer()) {
			this.print('Warning: ListenPropertyChange should only be called on client');
			return;
		}

		let lastValue = this.GetPropertyValueFromNetTable(scope, key, propertyId);

		Timer.GameTimer(0.1, () => {
			const newValue = this.GetPropertyValueFromNetTable(scope, key, propertyId);
			if (newValue !== lastValue) {
				callback(lastValue, newValue);
				lastValue = newValue;
			}
			return 0.1;
		});
	}

	// ==================== 清理系统 ====================

	/**
	 * 清理指定来源的所有属性
	 * @param key 目标键
	 * @param sourceId 来源 ID
	 */
	CleanupSourceProperties(key: PropertySystemKey, sourceId: string): void {
		// 清理静态属性
		this.RemoveStaticProperty(key, sourceId);

		// 清理动态属性
		this.UnregisterDynamicProperty(key, sourceId);
	}

	/** 清理单位的所有属性 */
	CleanupUnitProperties(unit: CDOTA_BaseNPC): void {
		if (!unit) return;

		const entIndex = unit.GetEntityIndex();
		this.CleanupStorage(PropertyScope.UNIT, entIndex);

		const playerID = unit.GetPlayerOwnerID();
		if (playerID !== -1) {
			this.ClearDynamicPropertyCache(PropertyScope.PLAYER, playerID);
		}
	}

	/** 清理玩家的所有属性 */
	CleanupPlayerProperties(playerID: PlayerID): void {
		if (playerID < 0) return;
		this.CleanupStorage(PropertyScope.PLAYER, playerID);
	}

	private CleanupStorage(scope: PropertyScope, key: PropertySystemKey): void {
		const storageMap = scope === PropertyScope.PLAYER
			? PropertyData.playerStorage
			: PropertyData.unitStorage;

		const storage = storageMap.get(key as any);
		if (storage) {
			storage.static.clear();
			storage.dynamic.clear();
			storage.staticCache.clear();
			storage.runtimeCache.clear();
			storageMap.delete(key as any);
		}
	}

	/** 清理所有无效的修饰符引用 */
	CleanupInvalidModifiers(): number {
		let cleanedCount = 0;

		for (const [, storage] of PropertyData.playerStorage) {
			cleanedCount += this.CleanupStorageInvalidModifiers(storage);
		}

		for (const [, storage] of PropertyData.unitStorage) {
			cleanedCount += this.CleanupStorageInvalidModifiers(storage);
		}

		if (cleanedCount > 0) {
			this.print(`Cleaned up ${cleanedCount} invalid modifiers`);
		}

		return cleanedCount;
	}

	private CleanupStorageInvalidModifiers(storage: PropertyStorage): number {
		// 注意：移除 modifier 依赖后，此方法不再自动清理
		// 属性现在通过手动调用 CleanupSourceProperties 清理
		// 或者可以扩展为基于时间的过期机制
		return 0;
	}

	/** 清理空存储 */
	CleanupEmptyStorages(): number {
		let cleanedCount = 0;

		for (const [key, storage] of PropertyData.playerStorage) {
			if (this.IsStorageEmpty(storage)) {
				PropertyData.playerStorage.delete(key);
				cleanedCount++;
			}
		}

		for (const [key, storage] of PropertyData.unitStorage) {
			if (this.IsStorageEmpty(storage)) {
				PropertyData.unitStorage.delete(key);
				cleanedCount++;
			}
		}

		return cleanedCount;
	}

	private IsStorageEmpty(storage: PropertyStorage): boolean {
		return storage.static.size === 0 &&
			storage.dynamic.size === 0 &&
			storage.staticCache.size === 0 &&
			storage.runtimeCache.size === 0;
	}

	/** 启动自动清理 */
	private StartAutoCleanup(): void {
		Timer.GameTimer(this.autoCleanupInterval, () => {
			this.CleanupInvalidModifiers();
			this.CleanupEmptyStorages();
			return this.autoCleanupInterval;
		});

		this.print(`Auto cleanup started (${this.autoCleanupInterval}s)`);
	}

	/** 重置系统 */
	private ResetSystem(): void {
		PropertyData.playerStorage.clear();
		PropertyData.unitStorage.clear();
		PropertyData.dirtyKeys.clear();
		PropertyData.stats = {
			totalReads: 0,
			cacheHits: 0,
			totalWrites: 0,
			syncCount: 0,
		};
	}

	// ==================== 网表体积管理 ====================

	/** 估算实体的网表体积 */
	EstimateEntityNetTableSize(scope: PropertyScope, key: PropertySystemKey): number {
		const storage = this.GetStorage(scope, key);
		let size = 50; // 基础开销

		// 估算静态属性
		for (const [propertyId] of storage.static) {
			size += propertyId.length + 10;
		}

		// 估算动态属性
		for (const [propertyId] of storage.dynamic) {
			size += propertyId.length + 10;
		}

		return size;
	}

	/** 获取网表体积统计 */
	GetNetTableSizeStats(): { total: number; entities: Map<string, number>; warnings: string[]; } {
		const entities = new Map<string, number>();
		const warnings: string[] = [];
		let total = 0;

		// 统计玩家
		for (const [playerID] of PropertyData.playerStorage) {
			const size = this.EstimateEntityNetTableSize(PropertyScope.PLAYER, playerID);
			const key = `PLAYER_${playerID}`;
			entities.set(key, size);
			total += size;

			if (size > this.MAX_NETTABLE_SIZE) {
				warnings.push(`${key} exceeds size limit: ${size} bytes`);
			}
		}

		// 统计单位
		for (const [entIndex] of PropertyData.unitStorage) {
			const size = this.EstimateEntityNetTableSize(PropertyScope.UNIT, entIndex);
			const key = `UNIT_${entIndex}`;
			entities.set(key, size);
			total += size;

			if (size > this.MAX_NETTABLE_SIZE) {
				warnings.push(`${key} exceeds size limit: ${size} bytes`);
			}
		}

		return { total, entities, warnings };
	}

	// ==================== 调试命令 ====================

	private RegisterDebugCommands(): void {
		// 打印系统状态
		Convars.RegisterCommand('property_status', () => {
			this.PrintSystemStatus();
		}, 'Print property system status', 0);

		// 打印性能统计
		Convars.RegisterCommand('property_stats', () => {
			this.PrintPerformanceStats();
		}, 'Print performance statistics', 0);

		// 重置统计
		Convars.RegisterCommand('property_reset_stats', () => {
			PropertyData.stats = {
				totalReads: 0,
				cacheHits: 0,
				totalWrites: 0,
				syncCount: 0,
			};
			this.print('Stats reset');
		}, 'Reset performance statistics', 0);

		// 列出所有属性
		Convars.RegisterCommand('property_list', () => {
			this.print('=== Registered Properties ===');
			for (const [id, config] of PropertyData.configs) {
				this.print(`${id}: scope=${PropertyScope[config.scope]}, type=${PropertyValueType[config.valueType]}`);
			}
		}, 'List all registered properties', 0);

		// 强制清理
		Convars.RegisterCommand('property_cleanup', () => {
			const count = this.CleanupInvalidModifiers();
			const storageCount = this.CleanupEmptyStorages();
			this.print(`Cleaned: ${count} modifiers, ${storageCount} storages`);
		}, 'Force cleanup invalid modifiers', 0);

		// 网表体积统计
		Convars.RegisterCommand('property_nettable_size', () => {
			const stats = this.GetNetTableSizeStats();
			this.print('=== NetTable Size Stats ===');
			this.print(`Total: ${stats.total} bytes`);
			this.print(`Entities: ${stats.entities.size}`);

			if (stats.warnings.length > 0) {
				this.print('⚠️ WARNINGS:');
				for (const warning of stats.warnings) {
					this.print(`  ${warning}`);
				}
			}

			// 显示最大的实体
			const sorted = Array.from(stats.entities.entries()).sort((a, b) => b[1] - a[1]);
			this.print('\nTop 10 largest entities:');
			for (let i = 0; i < Math.min(10, sorted.length); i++) {
				this.print(`  ${sorted[i][0]}: ${sorted[i][1]} bytes`);
			}
		}, 'Show NetTable size statistics', 0);

		this.print('Debug commands registered');
	}

	private PrintSystemStatus(): void {
		this.print('=== Property System Status ===');
		this.print(`Registered Properties: ${PropertyData.configs.size}`);
		this.print(`Player Storages: ${PropertyData.playerStorage.size}`);
		this.print(`Unit Storages: ${PropertyData.unitStorage.size}`);
		this.print(`Dirty Keys: ${PropertyData.dirtyKeys.size}`);
		this.print(`Last Sync: ${PropertyData.lastSyncTime.toFixed(2)}s`);
	}

	private PrintPerformanceStats(): void {
		const stats = PropertyData.stats;
		const hitRate = stats.totalReads > 0
			? (stats.cacheHits / stats.totalReads * 100).toFixed(2)
			: '0.00';

		this.print('=== Performance Stats ===');
		this.print(`Total Reads: ${stats.totalReads}`);
		this.print(`Cache Hits: ${stats.cacheHits} (${hitRate}%)`);
		this.print(`Total Writes: ${stats.totalWrites}`);
		this.print(`Sync Count: ${stats.syncCount}`);
	}

	// ==================== 工具函数 ====================

	private GetStorage(scope: PropertyScope, key: PropertySystemKey): PropertyStorage {
		const storageMap = scope === PropertyScope.PLAYER
			? PropertyData.playerStorage
			: PropertyData.unitStorage;

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

	private GetConfig(propertyId: string): PropertyConfig | undefined {
		return PropertyData.configs.get(propertyId);
	}

	private ValidateProperty(propertyId: string): boolean {
		if (!PropertyData.configs.has(propertyId)) {
			this.print(`Error: Property ${propertyId} not registered`);
			return false;
		}
		return true;
	}

	/**
	 * 获取实体的上下文信息
	 * 辅助方法：根据实体自动推断 scope 和 key
	 * @param entity 单位或玩家
	 * @returns [scope, key] 或 undefined
	 */
	GetEntityContext(entity: CDOTA_BaseNPC | CDOTAPlayerController): [PropertyScope, PropertySystemKey] | undefined {
		if (!entity || !IsValid(entity)) return undefined;

		// 尝试作为玩家
		if ((entity as CDOTAPlayerController).IsPlayer && (entity as CDOTAPlayerController).IsPlayer()) {
			const playerID = (entity as CDOTAPlayerController).GetPlayerID();
			return [PropertyScope.PLAYER, playerID];
		}

		// 尝试作为单位
		if ((entity as CDOTA_BaseNPC).IsBaseNPC && (entity as CDOTA_BaseNPC).IsBaseNPC()) {
			return [PropertyScope.UNIT, (entity as CDOTA_BaseNPC).GetEntityIndex()];
		}

		return undefined;
	}

	private AggregateValues(strategy: AggregationStrategy, current: number, value: number, customAggregator?: CustomAggregator): number {
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
				if (customAggregator) {
					return customAggregator(current, value);
				}
				return current + value;
			default:
				return current + value;
		}
	}

	private GetAggregationInitialValue(strategy: AggregationStrategy, defaultValue: number): number {
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

	private GetDirtyKey(scope: PropertyScope, key: PropertySystemKey, propertyId: string): string {
		// 使用 | 作为分隔符，避免与 propertyId 中的 _ 冲突
		return `${scope}|${key}|${propertyId}`;
	}

	private MarkDirty(scope: PropertyScope, key: PropertySystemKey, propertyId: string): void {
		const dirtyKey = this.GetDirtyKey(scope, key, propertyId);
		PropertyData.dirtyKeys.add(dirtyKey);
	}

	private GetCurrentFrame(): number {
		return GameRules.GetDOTATime(false, false) as number;
	}

	private GetCurrentTime(): number {
		return GameRules.GetGameTime();
	}

	/**
	 * 强制同步所有未同步的属性（用于测试/调试）
	 */
	ForceSyncAllDirty(): void {
		if (!IsServer()) return;

		const dirtyCount = PropertyData.dirtyKeys.size;
		if (dirtyCount === 0) return;

		this.print(`[ForceSyncAllDirty] Syncing ${dirtyCount} dirty properties...`);
		this.SyncDirtyProperties();
		this.print(`[ForceSyncAllDirty] Sync completed, remaining: ${PropertyData.dirtyKeys.size}`);
	}
}

// ==================== 导出 ====================

declare global {
	var PropertySystem: MPropertySystem;
	var PropertyData: {
		configs: Map<any, any>,
		playerStorage: Map<any, any>,
		unitStorage: Map<any, any>,
		dirtyKeys: Set<string>;
		lastSyncTime: number,
		stats: {
			totalReads: number,
			cacheHits: number,
			totalWrites: number,
			syncCount: number,
		},
	};
}
PropertySystem ??= new MPropertySystem();