/** 属性作用域类型 */
enum PropertyScope {
	/** 单位级别属性 - 按 entindex 索引 */
	UNIT = 0,
	/** 玩家级别属性 - 按 playerID 索引 */
	PLAYER = 1,
}

/** 属性值类型 */
enum PropertyValueType {
	/** 数值类型 */
	NUMBER = 0,
	/** 百分比类型（0.1 = 10%） */
	PERCENTAGE = 1,
	/** 布尔类型 */
	BOOLEAN = 2,
	/** 自定义类型 */
	CUSTOM = 3,
}

/** 聚合策略 */
enum AggregationStrategy {
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

/** 属性键（玩家或单位的唯一标识） */
type PropertySystemKey = PlayerID | EntityIndex;

/** 动态属性回调函数 */
type DynamicPropertyCallback = (params?: any) => number | undefined;

/** 自定义聚合函数 */
type CustomAggregator = (current: number, value: number) => number;

/** 属性配置 */
interface PropertyConfig {
	id: string;
	scope: PropertyScope;
	valueType: PropertyValueType;
	aggregation: AggregationStrategy;
	customAggregator?: CustomAggregator;
	defaultValue?: number;
	syncToClient?: boolean;
	syncPriority?: number;
	enableCache?: boolean;
	cacheDuration?: number;
}

/** 
 * 静态属性数据（独立于 modifier）
 * 使用唯一 ID 标识，而不是 modifier 实例
 */
interface StaticPropertyData {
	/** 属性来源的唯一 ID（可以是任意字符串） */
	sourceId: string;
	/** 属性值 */
	value: number;
	/** 添加时间（GameTime） */
	addedTime: number;
	/** 可选的元数据 */
	metadata?: Record<string, any>;
}

/** 
 * 动态属性数据（独立于 modifier）
 * 使用唯一 ID 标识
 */
interface DynamicPropertyData {
	/** 属性来源的唯一 ID */
	sourceId: string;
	/** 回调函数 */
	callback: DynamicPropertyCallback;
	/** 优先级 */
	priority: number;
	/** 添加时间（GameTime） */
	addedTime: number;
	/** 可选的元数据 */
	metadata?: Record<string, any>;
}

/** 属性缓存数据 */
interface PropertyCacheData {
	value: number;
	frame: number;
	time: number;
}

/** 属性存储容器 */
interface PropertyStorage {
	static: Map<string, StaticPropertyData[]>;
	dynamic: Map<string, DynamicPropertyData[]>;
	staticCache: Map<string, number>;
	runtimeCache: Map<string, PropertyCacheData>;
}