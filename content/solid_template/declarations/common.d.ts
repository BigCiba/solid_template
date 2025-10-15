declare interface AbilityValueData {
	value: number[]; // 数值
	_attack_damage?: number[]; // 攻击力系数
	_spell_power?: number[]; // 法术强度系数
	_armor?: number[]; // 护甲系数
	_health?: number[]; // 生命值系数
	_str?: number[]; // 力量系数
	_agi?: number[]; // 敏捷系数
	_int?: number[]; // 智力系数
	_primary?: number[]; // 主属性系数
	_all?: number[]; // 全属性系数
	_min?: number[]; // 最小值
	_max?: number[]; // 最大值
	_attack_range?: number[]; //攻击距离系数
	IsProbability?: boolean; // 是否为概率值
	IsMultiplicative?: boolean; // 是否为倍乘值
	affected_by_aoe_increase?: boolean; // 是否受范围加成
	CalculateSpellDamageTooltip?: boolean; // 计算技能增强
	RequiresScepter?: boolean; // 是否需要神杖
	RequiresShard?: boolean; // 是否需要魔晶
	DamageTypeTooltip?: DAMAGE_TYPES; // 伤害类型
	TooltipOnly?: boolean; // 是否仅tooltip显示，自动添加装备属性会被跳过
	dynamic_value?: boolean; // 是否为动态值，如果是则会一直显示出来
	death_property?: boolean; // 是否为动态值，如果是则会一直显示出来

	// 技能升级功能
	operator_ability_name?: string; // 修改的技能
	operator_key_name?: string; // 修改值的key名，默认为value
	operator_mul?: boolean; // 是否是百分比修改
	operator_negative?: boolean; // 是否为负值效果
}

declare type AbilityValueNumberDataKey =
	"value" |
	"_attack_damage" |
	"_spell_power" |
	"_armor" |
	"_health" |
	"_str" |
	"_agi" |
	"_int" |
	"_primary" |
	"_all" |
	"_min" |
	"_attack_range" |
	"_max";

declare type PaymentType = "1000" | "2000" | "3000" | "4000";//支付宝 微信 paypal payssion
declare type AttributeValue = [string, number, 0 | 1]; // 属性变量，[变量名，数值，是否为multple]

declare type PlayerIDRecord<T> = { [k in PlayerID]?: T };