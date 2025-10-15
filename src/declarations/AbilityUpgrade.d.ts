declare interface AbilityUpgrade {
	type: AbilityUpgradeType,
	unit_name?: string,
	ability_name?: string,
	pre_ability_upgrade?: string,
	value?: number,
	special_value_name?: string,
	special_value_property?: string,
	operator?: AbilityUpgradeOperator,
	values?: { [key: string]: string | number; } | { [key: string]: { value: string | number, [x: string]: string | number; }; },
	description?: string,
	level?: number,
	max_count?: number,
	key?: string,
	rarity?: string,
	id?: string,
}

/**
 * 处理技能升级压缩
 * @param t1 
 * @param t2 
 */
declare function unzip(t1: object, t2: object): AbilityUpgrade;