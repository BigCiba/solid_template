const vec3_zero = Vector(0, 0, 0);
const vec3_left = Vector(-1, 0, 0);
const vec3_right = Vector(1, 0, 0);
const vec3_top = Vector(0, 1, 0);
const vec3_bottom = Vector(0, -1, 0);

const AI_TIMER_TICK_TIME = 0.25; // AI的计时器间隔

enum AddModifierFlag {
	IGNORE_DEATH = 1 << 0, // 无视死亡
}

enum AI_SEARCH_BEHAVIOR {
	AI_SEARCH_BEHAVIOR_NONE,
	AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET,
	AI_SEARCH_BEHAVIOR_MOST_LINE_TARGET,
}

// 属性类型
enum EOMModifierPropertyType {
	NONE, // 无，挂载在单位身上的属性
	PLAYER, // 玩家属性，挂载在单位所属玩家上的属性
	TEAM, // 队伍属性，挂载在单位所属队伍上的属性
	TEAM_HERO, // 队伍英雄属性，挂载在单位所属队伍中所有英雄上的属性
}

/**伤害状态 */
enum EOM_DAMAGE_FLAGS {
	NONE = 0,
	/**
	 * 暴击
	 */
	CRIT = 1 << 0,
	/**
	 * 不触发暴击
	 */
	NO_CRIT = 1 << 1,
	/**
	 * 持续伤害
	 */
	DOT = 1 << 2,
	/**
	 * 不会受到来源者的伤害增强
	 */
	NO_SOURCE_AMPLIFY = 1 << 3,
	/**
	 * 不会受到伤害增强，包含来源伤害增强
	 */
	NO_DAMAGE_AMPLIFY = 1 << 4,
	/**
	 * 被转化后的伤害
	 */
	CONVERTED_DAMAGE = 1 << 5,
	/**
	 * 召唤伤害
	 */
	SUMMONED_DAMAGE = 1 << 6,
	/**
	 * 无输出伤害调整
	 */
	NO_OUTGOING_ADJUST = 1 << 7,
	/**
	 * 无承受伤害调整
	 */
	NO_INCOMING_ADJUST = 1 << 8,
	/**
	 * 无视护盾
	 */
	IGNORE_BARRIER = 1 << 9,
	/**
	 * 无视躲避伤害，包括免死效果
	 */
	IGNORE_VOID_DAMAGE = 1 << 10,
	/**
	 * 反击伤害
	 */
	RETALIATED_DAMAGE = 1 << 11,
	/**
	 * 流血伤害
	 */
	BLEEDING_DAMAGE = 1 << 12,
	/**
	 * 碾压伤害
	 */
	OVERWHELMING_DAMAGE = 1 << 13,
	/**
	 * 燃烧伤害
	 */
	BURNING_DAMAGE = 1 << 14,
	/**
	 * 特殊标记
	 */
	SPECIAL_MARK = 1 << 15,
}

/**攻击状态 */
enum ATTACK_STATES {
	NONE = 0,
	/**
	 * 不触发攻击法球
	 */
	NOT_USECASTATTACKORB = 1 << 1,
	/**
	 * 不触发攻击特效
	 */
	NOT_PROCESSPROCS = 1 << 2,
	/**
	 * 无视攻击间隔
	 */
	SKIPCOOLDOWN = 1 << 3,
	/**
	 * 不触发破影一击
	 */
	IGNOREINVIS = 1 << 4,
	/**
	 * 没有攻击弹道
	 */
	NOT_USEPROJECTILE = 1 << 5,
	/**
	 * 假攻击
	 */
	FAKEATTACK = 1 << 6,
	/**
	 * 攻击不会丢失
	 */
	NEVERMISS = 1 << 7,
	/**
	 * 没有分裂攻击
	 */
	NO_CLEAVE = 1 << 8,
	/**
	 * 无额外攻击
	 */
	NO_EXTENDATTACK = 1 << 9,
	/**
	 * 不减少各种攻击计数
	 */
	SKIPCOUNTING = 1 << 10,
	/**
	 * 攻击暴击，攻击流程中会自动插入，Attack调用时不能填
	 */
	CRIT = 1 << 11,
	/**
	 * 不计算格挡
	 */
	BYPASSES_BLOCK = 1 << 12,
	/**
	 * 反击
	 */
	RETALIATION = 1 << 13,
}