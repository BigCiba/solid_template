declare enum PlayerBuildDataKey {
	PLAYER_BUILDING = 0,
	PLAYER_BUILDING_IN_HAND = 1,
	PLAYER_BUILDING_POSITION = 2,
}

declare enum AbilityUpgradeOperator {
	ABILITY_UPGRADES_OP_ADD = 0,
	ABILITY_UPGRADES_OP_MUL,
}

declare enum AbilityUpgradeType {
	ABILITY_UPGRADES_TYPE_SPECIAL_VALUE = 0,
	ABILITY_UPGRADES_TYPE_SPECIAL_VALUE_PROPERTY,
	ABILITY_UPGRADES_TYPE_STATS,
	ABILITY_UPGRADES_TYPE_ABILITY_MECHANICS,
	ABILITY_UPGRADES_TYPE_ADD_ABILITY,
}

declare enum PlayerLoginState {
	None,
	Success, // 登录成功
	NoPermission, // 无许可证
	Banned // 无许可证
}

declare enum AbilityUpgradeKeyType {
	UPGRADES_KEY_DATA = 0,
	UPGRADES_KEY_CACHED_RESULT,
}

// 单位
declare enum Digit {
	K = 1,
	M = 2,
	G = 3,
	T = 4,
	P = 5,
	E = 6,
	Z = 7,
	Y = 8,
	R = 9,
}

// 中文单位
declare enum DigitSchinese {
	万 = 1,
	亿 = 2,
	兆 = 3,
	京 = 4,
	垓 = 5,
	秭 = 6,
	穰 = 7,
	沟 = 8,
	涧 = 9,
}

declare enum T12GameState {
	None,
	GameStart, // 游戏开始
	HeroSelection, // 选择英雄
	BeforeHeroSpawn, // 英雄创建完成前，用于处理一些英雄创建前的处理，以免英雄创建出来报错
	PreGame, // 准备游戏阶段
	GameInProgress, // 游戏进行
	ChallengeTime, // 挑战时间
	PostGame, // 结束阶段
	GameRestart, // 游戏重开
	HeroReselection, // 英雄重选
	HookGame, // 挂机模式
	FirstBattle, // 首次剧情战斗
}

declare enum Constellation {
	NONE,
	ARIES,
	TAURUS,
	GEMINI,
	CANCER,
	LEO,
	VIRGO,
	LIBRA,
	SCORPIO,
	SAGITTARIUS,
	CAPRICORN,
	AQUARIUS,
	PISCES,
}

declare enum DevourType {
	NONE,
	DEVOUR, // 神佑宝石
	CASTING_2, // 3级铸造物
	CASTING_3, // 4级铸造物
	CASTING_4, // 5级铸造物
	DIVINE, // 神赐之物
	STARTING, // 开战装备
}

declare enum EquipmentOperator {
	Inherit,//继承
	Strengthen,//强化
	Succinct,//洗练
	Inlay //镶嵌宝石
}

declare enum CosmeticType {
	/** 英雄皮肤 */
	HERO_SKIN,
	/** 英雄翅膀 */
	HERO_WING,
	/** 英雄冲刺 */
	HERO_DASH,
	/** 英雄周身 */
	HERO_AMBIENT,
	/** 英雄传送 */
	HERO_TELEPORT,
	/** 信使周身 */
	COURIER_AMBIENT,
	/** 信使足迹 */
	COURIER_PATH,
	/** 信使闪烁 */
	COURIER_BLINK,
	/** 头像框 */
	AVATAR_BORDER,
	/** 称号 */
	AVATAR_NAME,
	/** 雅典娜皮肤 */
	GOD_SKIN,
	/** 雅典娜底座？ */
	GOD_BASE,
	/** 训练场地图 */
	TRAINING_MAP
}