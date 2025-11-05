/** @noSelfInFile */

/**
 * 属性系统类型定义
 */

// ==================== 枚举定义 ====================

/**
 * 属性作用域类型
 */
export enum PropertyScope {
	/** 单位级别属性 - 按 entindex 索引 */
	UNIT = 0,
	/** 玩家级别属性 - 按 playerID 索引 */
	PLAYER = 1,
}

/**
 * 属性值类型
 */
export enum PropertyValueType {
	/** 数值类型 */
	NUMBER = 0,
	/** 百分比类型（0.1 = 10%） */
	PERCENTAGE = 1,
	/** 布尔类型 */
	BOOLEAN = 2,
	/** 自定义类型 */
	CUSTOM = 3,
}

/**
 * 聚合策略
 */
export enum AggregationStrategy {
	/** 累加（默认） */
	SUM = 0,
	/** 乘法（适合百分比加成） */
	MULTIPLY = 1,
	/** 最大值 */
	MAX = 2,
	/** 最小值 */
	MIN = 3,
	/** 取第一个有效值 */
	FIRST = 4,
	/** 取最后一个有效值 */
	LAST = 5,
	/** 自定义聚合函数 */
	CUSTOM = 6,
}

// ==================== 类型定义 ====================

/**
 * 属性键（玩家或单位的唯一标识）
 */
export type PropertyKey = PlayerID | EntityIndex;

/**
 * 动态属性回调函数
 */
export type DynamicPropertyCallback = (params?: any) => number | undefined;

/**
 * 自定义聚合函数
 */
export type CustomAggregator = (current: number, value: number) => number;

/**
 * 属性配置
 */
export interface PropertyConfig {
	/** 属性 ID */
	id: string;
	/** 属性作用域 */
	scope: PropertyScope;
	/** 属性值类型 */
	valueType: PropertyValueType;
	/** 聚合策略 */
	aggregation: AggregationStrategy;
	/** 自定义聚合函数（当 aggregation = CUSTOM 时） */
	customAggregator?: CustomAggregator;
	/** 默认值 */
	defaultValue?: number;
	/** 是否同步到客户端 */
	syncToClient?: boolean;
	/** 同步优先级（数字越小越优先，用于网表大小限制时） */
	syncPriority?: number;
	/** 是否启用缓存 */
	enableCache?: boolean;
	/** 缓存持续帧数（0 = 仅当前帧） */
	cacheDuration?: number;
}

/**
 * 静态属性数据
 */
export interface StaticPropertyData {
	/** 修饰符实例 */
	modifier: CDOTA_Modifier_Lua;
	/** 属性值 */
	value: number;
	/** 添加时间（GameTime） */
	addedTime: number;
}

/**
 * 动态属性数据
 */
export interface DynamicPropertyData {
	/** 修饰符实例 */
	modifier: CDOTA_Modifier_Lua;
	/** 回调函数 */
	callback: DynamicPropertyCallback;
	/** 优先级 */
	priority: number;
	/** 添加时间（GameTime） */
	addedTime: number;
}

/**
 * 属性缓存数据
 */
export interface PropertyCacheData {
	/** 缓存的值 */
	value: number;
	/** 缓存的帧号 */
	frame: number;
	/** 缓存的游戏时间 */
	time: number;
}

/**
 * 属性存储容器
 */
export interface PropertyStorage {
	/** 静态属性列表 */
	static: Map<string, StaticPropertyData[]>;
	/** 动态属性列表 */
	dynamic: Map<string, DynamicPropertyData[]>;
	/** 预计算的静态属性总和 */
	staticCache: Map<string, number>;
	/** 运行时缓存 */
	runtimeCache: Map<string, PropertyCacheData>;
}

/**
 * 网表同步数据结构
 */
export interface NetTableSyncData {
	/** 属性值映射 */
	properties: Record<string, number>;
	/** 最后更新时间 */
	lastUpdate: number;
	/** 数据版本号 */
	version: number;
}

/**
 * 属性变化事件数据
 */
export interface PropertyChangeEvent {
	/** 属性 ID */
	propertyId: string;
	/** 实体键 */
	key: PropertyKey;
	/** 旧值 */
	oldValue: number;
	/** 新值 */
	newValue: number;
	/** 变化量 */
	delta: number;
}

/**
 * 调试信息
 */
export interface PropertyDebugInfo {
	/** 属性 ID */
	propertyId: string;
	/** 实体键 */
	key: PropertyKey;
	/** 当前总值 */
	totalValue: number;
	/** 静态属性贡献 */
	staticContributions: Array<{
		modifierName: string;
		value: number;
		addedTime: number;
	}>;
	/** 动态属性贡献 */
	dynamicContributions: Array<{
		modifierName: string;
		value: number;
		priority: number;
		addedTime: number;
	}>;
	/** 缓存状态 */
	cacheStatus: {
		enabled: boolean;
		cached: boolean;
		frame?: number;
		age?: number;
	};
}

// ==================== 全局声明 ====================

declare global {
	/**
	 * 属性系统全局命名空间
	 */
	interface PropertySystemGlobal {
		/** 属性配置表 */
		configs: Map<string, PropertyConfig>;
		/** 玩家属性存储 */
		playerStorage: Map<PlayerID, PropertyStorage>;
		/** 单位属性存储 */
		unitStorage: Map<EntityIndex, PropertyStorage>;
		/** 待同步的脏数据标记 */
		dirtyKeys: Set<string>;
		/** 上次同步时间 */
		lastSyncTime: number;
		/** 性能统计 */
		stats: {
			totalReads: number;
			cacheHits: number;
			totalWrites: number;
			syncCount: number;
		};
	}

	var PropertySystem: PropertySystemGlobal;
}
