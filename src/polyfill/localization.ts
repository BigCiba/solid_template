/**
 * 将字符串里$xxx替换为具体翻译
 * @param str 要替换的字符串
 * @returns 替换后的字符串
 * @example replaceDollar("$mana") -> "蓝量加成"
 */
function replaceDollar(text: string): string {
	return text.replace(/\$(\w+)\b/g, (match, variableName, offset, string) => {
		let text = `dota_ability_variable_${variableName}`;
		let localization = Localize(text);
		if (localization == text) {
			return match;
		}
		return localization;
	});
}

//  function replaceKeyWord(text: string): string {
// 	return text.replace(/\{KeyWord:(\w+)\}/g, (match, keyName, offset, string) => {
// 		let replacement = Localize(`KeyWord_${keyName}`);
// 		return replacement;
// 	});
// }

/**
 * 翻译字符串，会将$xxx替换为具体翻译
 * @param str 翻译key
 * @param p 可选Panel
 * @returns 翻译后的字符串
 */
function Localize(token: string, parent?: PanelBase): string;
function Localize(token: string, value: number, parent?: PanelBase): string;
function Localize(token: string, ...args: any[]) {
	if (token == "") return token;
	let parent;
	let value;
	if (args.length == 1) {
		if (typeof args[0] == "number") {
			value = args[0];
		} else {
			parent = args[0];
		}
	}
	if (args.length == 2) {
		value = args[0];
		parent = args[1];
	}
	let originalToken = token;
	if (token[0] != "#") {
		token = "#" + token;
	}

	let old = token;
	if (value != undefined) {
		if (parent != undefined) {
			token = $.Localize(token, value, parent);
		} else {
			token = $.Localize(token, value, $.GetContextPanel());
		}
	} else {
		if (parent != undefined) {
			token = $.Localize(token, parent);
		} else {
			token = $.Localize(token, $.GetContextPanel());
		}
	}

	if (token.length == old.length && token.toLocaleLowerCase() == old.toLocaleLowerCase()) {
		return originalToken;
	}

	token = replaceDollar(token);
	token = token.replace(/(?<!%(-)?(\.(\d+))?([dfl])?\w+\b)%%/g, "%");
	token = token.replace(/<(\w+\b):([\s\S]*?)\/>/g, (match, key: string, text, offset, string) => {
		let featureKey = GetLocalization(`feature_${key}`, "");
		if (featureKey == "") return match;
		// GameUI.CustomUIConfig().LocalizationFeatureList ??= []
		if (GameUI.CustomUIConfig().LocalizationFeatureList != undefined) {
			if (GameUI.CustomUIConfig().LocalizationFeatureList!.indexOf(key) == -1) {
				GameUI.CustomUIConfig().LocalizationFeatureList!.push(key);
			}
		}
		return `<span class='FeatureLabel'>${text}</span>`;

	});
	return token;
}

function GetLocalization(token: string, defaultText?: string, parent?: PanelBase): string;
function GetLocalization(token: string, defaultText: string | undefined, value: number, parent?: PanelBase): string;
function GetLocalization(text: string, defaultText?: string, ...args: any[]) {
	let localizedText = Localize(text, ...args);
	if (defaultText != undefined && localizedText == text) {
		localizedText = defaultText;
	}
	return localizedText;
}

function ClearLocalizationFeatureList() {
	GameUI.CustomUIConfig().LocalizationFeatureList = [];
}

function GetLocalizationFeatureList() {
	return GameUI.CustomUIConfig().LocalizationFeatureList;
}

function GetAndClearLocalizationFeatureList() {
	let feature = GameUI.CustomUIConfig().LocalizationFeatureList;
	if (!feature) return;
	let list = [...feature];
	GameUI.CustomUIConfig().LocalizationFeatureList = undefined;
	return list;
}

function GetItemName(itemName: string, defaultText?: string, parent?: PanelBase) {
	const abilityKV = GameUI.CustomUIConfig().ItemsKv[itemName];
	if (abilityKV == undefined) {
		return GetLocalization(itemName, defaultText);
	}
	const customItemType = abilityKV.CustomItemType;
	if (customItemType == "ABILITY_BOOK") {
		return GetLocalization("#DOTA_Tooltip_ability_" + abilityKV.LinkAbility, defaultText, parent);
	}
	return GetLocalization("DOTA_Tooltip_ability_" + itemName, defaultText, parent);

}

function ReplaceAttribute(text: string, attrbiutes?: Record<string, AttributeValue>, classnames?: string) {
	if (attrbiutes == undefined) return text;

	for (const key in attrbiutes) {
		const attrbiute = attrbiutes[key];
		if (!Array.isArray(attrbiute)) continue;
		if (attrbiute.length != 3) continue;
		let [name, value, multiplicative] = attrbiute;
		let isMultiplicative = multiplicative == 1;
		let regExp = new RegExp(`{a:${key}:([\\s\\S]*?)}`, "g");
		text = text.replace(regExp, (match, s: string, offset, string) => {
			let attributeLocalization = GetLocalization(`dota_ability_attribute_${name}`, "");
			let isPercentage = false;
			let isNegative = false;
			if (attributeLocalization != "") {
				isPercentage = attributeLocalization[0] == "%";
				isNegative = attributeLocalization[attributeLocalization.length - 1] == "*";
				attributeLocalization = `${attributeLocalization.substring(isPercentage ? 1 : 0, isNegative ? attributeLocalization.length - 1 : attributeLocalization.length)}`;
			}
			let sign = "+";
			if (value < 0) {
				sign = "-";
			}

			s = s.replace(new RegExp(`%(-)?(\\.(\\d+))?([dfl])?value\\b%`, "g"), (_, sign, __, precisionNumber, type) => {
				let hasSign = sign != undefined;
				let precision = precisionNumber != undefined ? toFiniteNumber(precisionNumber, 2) : undefined;
				let valueNumberToString = (value: number) => {
					value = Float(value);
					if (!hasSign) {
						value = Math.abs(value);
					}

					// 如果过小
					if (Math.abs(value) < 1) {
						if (type == "d") {
							return String(Math.trunc(value));
						} else if (type == "f") {
							if (precision != undefined) {
								return value.toFixed(precision);
							} else {
								return String(value);
							}
						}
						return String(value);
					}

					if (type == "d") {
						return String(Math.trunc(value));
					} else if (type == "f") {
						if (precision != undefined) {
							return value.toFixed(precision);
						} else {
							return String(value);
						}
					}
					return FormatNumber(value, precision);
				};

				let v = valueNumberToString(value);
				v = isPercentage ? `${v}%` : v;
				if (classnames != undefined) {
					v = `<span class='${classnames}'>${v}</span>`;
				}
				if (isMultiplicative) {
					let mark = GetLocalization("dota_ability_variable_mult_mark", "");
					if (mark != "") {
						v = v + mark;
					}
				}
				return v;
			});

			return s.replaceAll("%sign%", sign).replaceAll("%name%", attributeLocalization);
		});
	}

	return text;
}

function IsActiveAbility(iBehavior: DOTA_ABILITY_BEHAVIOR) {
	if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_TOGGLE) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_TOGGLE) {
		return true;
	}
	if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) {
		return true;
	}
	if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) {
		return true;
	}
	if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
		return true;
	}
	return false;
}

let castTypeList: [DOTA_ABILITY_BEHAVIOR, string][] = [
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AURA, "DOTA_ToolTip_Ability_Aura"], // 光环
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AUTOCAST, "DOTA_ToolTip_Ability_AutoCast"], // 自动施放
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_PASSIVE + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN, "DOTA_ToolTip_Ability_Passive_Summon"], // 自动召唤
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_PASSIVE, "DOTA_ToolTip_Ability_Passive"], // 被动
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_TOGGLE, "DOTA_ToolTip_Ability_Toggle"], // 切换
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_CHANNELLED, "DOTA_ToolTip_Ability_Channeled"], // 持续施法
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET, "DOTA_ToolTip_Ability_NoTarget"], // 无目标
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_RUNE_TARGET, "DOTA_ToolTip_Ability_Item"], // 物品目标
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING, "DOTA_ToolTip_Ability_Vector_Unit"], // 单位矢量目标
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING, "DOTA_ToolTip_Ability_Vector_Point"], // 点矢量目标
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET, "DOTA_ToolTip_Ability_UnitOrPoint_Target"], // 点目标
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT, "DOTA_ToolTip_Ability_Point"], // 点目标
	[DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET, "DOTA_ToolTip_Ability_Target"], // 单位目标
];

function GetAbilityCastTypeText(iBehavior: DOTA_ABILITY_BEHAVIOR) {
	for (const [i, s] of castTypeList) {
		if ((iBehavior & i) == i) {
			return s;
		}
	}

	return "";
}

function GetAbilityTargetTypeText(iTeam: DOTA_UNIT_TARGET_TEAM, iType: DOTA_UNIT_TARGET_TYPE) {
	if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_TREE) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_TREE) {
		return "DOTA_ToolTip_Targeting_Trees";
	}
	if (iTeam == DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY) {
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) {
			return "DOTA_ToolTip_Targeting_AlliedUnitsAndBuildings";
		}
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) {
			return "DOTA_ToolTip_Targeting_AlliedHeroesAndBuildings";
		}
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
			return "DOTA_ToolTip_Targeting_AlliedUnits";
		}
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
			return "DOTA_ToolTip_Targeting_AlliedHeroes";
		}
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP) {
			return "DOTA_ToolTip_Targeting_AlliedCreeps";
		}
		return "DOTA_ToolTip_Targeting_Allies";
	}
	if (iTeam == DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY) {
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) {
			return "DOTA_ToolTip_Targeting_EnemyUnitsAndBuildings";
		}
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) {
			return "DOTA_ToolTip_Targeting_EnemyHeroesAndBuildings";
		}
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
			return "DOTA_ToolTip_Targeting_EnemyUnits";
		}
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
			return "DOTA_ToolTip_Targeting_EnemyHero";
		}
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP) {
			return "DOTA_ToolTip_Targeting_EnemyCreeps";
		}
		return "DOTA_ToolTip_Targeting_Enemy";
	}
	if (iTeam == DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_BOTH) {
		if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
			return "DOTA_Tooltip_Targeting_All_Heroes";
		}
		return "DOTA_ToolTip_Targeting_Units";
	}
	return "";
}

function GetAbilityDamageTypeText(iDamageType: DAMAGE_TYPES, adaptiveDamageType?: DAMAGE_TYPES) {
	if (iDamageType == DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) {
		return "DOTA_ToolTip_Damage_Physical";
	}
	if (iDamageType == DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) {
		return "DOTA_ToolTip_Damage_Magical";
	}
	if (iDamageType == DAMAGE_TYPES.DAMAGE_TYPE_PURE) {
		return "DOTA_ToolTip_Damage_Pure";
	}
	if (iDamageType == DAMAGE_TYPES.DAMAGE_TYPE_HP_REMOVAL) {
		if (adaptiveDamageType == DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) {
			return "DOTA_ToolTip_Damage_Adaptive_Physical";
		} else if (adaptiveDamageType == DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) {
			return "DOTA_ToolTip_Damage_Adaptive_Magical";
		}
		return "DOTA_ToolTip_Damage_Adaptive";
	}
	return "";
}

function GetAbilitySpellImmunityText(iSpellImmunityType: SPELL_IMMUNITY_TYPES) {
	if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ALLIES_YES) {
		return "DOTA_ToolTip_PiercesSpellImmunity_Yes";
	}
	if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ALLIES_NO) {
		return "DOTA_ToolTip_PiercesSpellImmunity_No";
	}
	if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ENEMIES_YES) {
		return "DOTA_ToolTip_PiercesSpellImmunity_Yes";
	}
	if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ENEMIES_NO) {
		return "DOTA_ToolTip_PiercesSpellImmunity_No";
	}
	if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ALLIES_YES_ENEMIES_NO) {
		return "DOTA_ToolTip_PiercesSpellImmunity_AlliesYesEnemiesNo";
	}
	return "";
}

function GetAbilityDispelTypeText(sSpellDispellableType: string) {
	if (sSpellDispellableType == "SPELL_DISPELLABLE_YES") {
		return "DOTA_ToolTip_Dispellable_Yes_Soft";
	}
	if (sSpellDispellableType == "SPELL_DISPELLABLE_NO") {
		return "DOTA_ToolTip_Dispellable_No";
	}
	if (sSpellDispellableType == "SPELL_DISPELLABLE_YES_STRONG") {
		return "DOTA_ToolTip_Dispellable_Yes_Strong";
	}
	return "";
}

function GetItemDispelTypeText(sSpellDispellableType: string) {
	if (sSpellDispellableType == "SPELL_DISPELLABLE_YES") {
		return "DOTA_ToolTip_Dispellable_Item_Yes_Soft";
	}
	if (sSpellDispellableType == "SPELL_DISPELLABLE_YES_STRONG") {
		return "DOTA_ToolTip_Dispellable_Item_Yes_Strong";
	}
	return "";
}

function defaultComposeAbsNumberToString(value: number) {
	value = Float(Math.abs(value));
	if (value < 1) {
		return String(value);
	}
	return FormatNumber(value);
}

function composeNumberToString(value: number) {
	value = Float(value);
	if (Math.abs(value) < 1) {
		return String(value);
	}
	return FormatNumber(value);
}

/**
 * 将数值列表组合为文本。返回字符串数组，需要用string.join来合并。该函数用于需要补充处理字符串连接的时候。
 * @param values 数值
 * @param level 等级
 * @param onlyCurrentLevelValue 是否仅显示当前等级
 * @param maxLevel 最大显示等级
 * @param className 文本额外css的class
 * @param funcNumberToString 数值转化为文本时的方法。默认为处理成大数值文本
 * @see {defaultComposeAbsNumberToString} funcNumberToString的默认值
 * @returns 第一个值为正常的值，第二个为附带百分比符号的
 */
function ComposeValuesSB(values: number[], level: number = 1, onlyCurrentLevelValue: boolean = false, maxLevel: number = 1, className: string = "", funcNumberToString: (value: number) => string = defaultComposeAbsNumberToString) {
	if (maxLevel == -1) {
		maxLevel = values.length;
	}
	let textSB: string[] = [];
	let textPctSB: string[] = [];
	if (level != -1 && onlyCurrentLevelValue && values.length > 0) {
		let value = values[Clamp(level - 1, -1, values.length - 1)] ?? 0;
		let valueStr = funcNumberToString(value);
		textSB.push(`<span class='GameplayVariable ${className}'>${valueStr}</span>`);
		textPctSB.push(`<span class='GameplayVariable ${className}'>${valueStr}%</span>`);
	} else {
		let isFirst = true;
		for (let index = 0; index < maxLevel; index++) {
			if (!isFirst) {
				textSB.push(" / ");
				textPctSB.push(" / ");
			} else {
				isFirst = false;
			}
			let value = values[Clamp(index, 0, values.length - 1)];
			let valueStr = funcNumberToString(value);
			if (level != -1 && index + 1 == Math.min(level, values.length)) {
				textSB.push(`<span class='GameplayVariable ${className}'>${valueStr}</span>`);
				textPctSB.push(`<span class='GameplayVariable ${className}'>${valueStr}%</span>`);
			} else {
				textSB.push(`<span class='${className}'>${valueStr}</span>`);
				textPctSB.push(`<span class='${className}'>${valueStr}%</span>`);
			}
		}
	}
	if (level == -1) {
		textSB.unshift("<span class='GameplayValues GameplayVariable'>"); textSB.push("</span>");
		textPctSB.unshift("<span class='GameplayValues GameplayVariable'>"); textPctSB.push("</span>");
	} else {
		textSB.unshift("<span class='GameplayValues'>"); textSB.push("</span>");
		textPctSB.unshift("<span class='GameplayValues'>"); textPctSB.push("</span>");
	}
	return [textSB, textPctSB];
}

/**
 * 将数值列表组合为文本
 * @param values 数值
 * @param level 等级
 * @param onlyCurrentLevelValue 是否仅显示当前等级
 * @param maxLevel 最大显示等级
 * @param className 文本额外css的class
 * @param funcNumberToString 数值转化为文本时的方法。默认为处理成大数值文本
 * @see {defaultComposeAbsNumberToString} funcNumberToString的默认值
 * @returns 第一个值为正常的值，第二个为附带百分比符号的
 */
function ComposeValues(values: number[], level: number = 1, onlyCurrentLevelValue: boolean = false, maxLevel: number = 1, className: string = "", funcNumberToString: (value: number) => string = defaultComposeAbsNumberToString) {
	let [textSB, textPctSB] = ComposeValuesSB(values, level, onlyCurrentLevelValue, maxLevel, className, funcNumberToString);
	return [textSB.join(""), textPctSB.join("")];
}

/**
 * 替换技能数值
 * @param text 文本，需要以本地化的文本
 * @param abilityValues 技能数值表
 * @param level 显示等级
 * @param {ReplaceValuesOption} options 额外选项
 * @returns 返回替换好的文本
 */
function ReplaceValues(text: string, abilityValues: Record<string, Partial<AbilityValueData>>, level: number = -1, options?: ReplaceValuesOption) {
	let unit = options?.UnitEntIndex != undefined && Entities.IsValidEntity(options.UnitEntIndex) ? options.UnitEntIndex : undefined;
	let showExtra = options?.ShowExtra ?? false;
	let isDescription = options?.IsDescription ?? false;
	let onlyCurrentLevelValue = options?.OnlyCurrentLevelValue ?? false;
	let abilityDamageType = options?.AbilityDamageType ?? DAMAGE_TYPES.DAMAGE_TYPE_NONE;
	let addedAttributeValues: Record<string, number> = ClientRequest("get_unit_added_attribute_values", { unit: unit })?.value ?? {};

	for (const valueName in abilityValues) {
		const abilityValue = abilityValues[valueName];

		if (abilityValue.value == undefined) continue;
		let regExp = new RegExp(`%(-)?(\\.(\\d+))?([dfl])?(${valueName})\\b%(%)?`, "g");
		let matches = text.matchAll(regExp);
		let next = matches.next();

		if (next.done) {
			continue;
		}

		let originalValues = abilityValue.value.slice();
		let values = abilityValue.value.slice();
		let maxValues = abilityValue._max;
		let minValues = abilityValue._min;
		let addedFactors: Record<string, number[]> = {};
		let addedValues: Record<string, number[]> = {};

		for (const addedName in addedAttributeValues) {
			if (addedName[0] != "_") continue; // 这里排除不是"_"开头的，因为额外附加属性系数必须"_"开头
			const addedAttributeValue = addedAttributeValues[addedName as keyof AbilityValueData];
			if (addedAttributeValue == undefined) {
				continue;
			}
			let v = abilityValue[addedName as keyof AbilityValueData] as number[] | undefined;
			if (v == undefined || v.length <= 0 || (v.length == 1 && v[0] == 0)) {
				continue;
			}
			addedFactors[addedName] = v.slice();
			let i = -1;
			addedValues[addedName] = v.map(factor => {
				i++;
				let added = addedAttributeValue * factor;
				let v = 0;
				if (values[i] != undefined) {
					v = values[i];
				} else {
					originalValues[i] = 0;
				}
				values[i] = v + added;
				return addedAttributeValue * factor;
			});
		}

		let showValues = (isDescription ? values : originalValues).slice();
		let simplifyShowValues = SimplifyValuesArray(showValues);
		let classList: Record<string, boolean> = {};

		if (!isDescription) {
			let indexOfDamage = valueName.indexOf("damage") != -1; // 是否有伤害关键词

			// 伤害类型
			let damageTypeTooltip = DAMAGE_TYPES.DAMAGE_TYPE_NONE;
			if (abilityValue.DamageTypeTooltip != undefined) {
				damageTypeTooltip = abilityValue.DamageTypeTooltip;
			} else if (indexOfDamage) {
				damageTypeTooltip = abilityDamageType;
			}
			// let damagePercent = Number.NaN;
			switch (damageTypeTooltip) {
				case DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL:
					classList["DamageTypePhysical"] = true;
					// damagePercent = addedAttributeValues["physical_damage"];
					break;
				case DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL:
					classList["DamageTypeMagical"] = true;
					// damagePercent = addedAttributeValues["magical_damage"];
					break;
				case DAMAGE_TYPES.DAMAGE_TYPE_PURE:
					classList["DamageTypePure"] = true;
					// damagePercent = addedAttributeValues["pure_damage"];
					break;
				default:
					break;
			}

			// 技能增强
			let calculateSpellDamage = false;
			if (abilityValue.CalculateSpellDamageTooltip != undefined) {
				calculateSpellDamage = abilityValue.CalculateSpellDamageTooltip;
			} else if (indexOfDamage) {
				calculateSpellDamage = true;
			}
			if (calculateSpellDamage) {
				// let spellAmplify = addedAttributeValues["spell_amplify"];
				// if (spellAmplify != undefined) {
				// 	spellAmplify = spellAmplify * 0.01;
				// 	values.forEach((v, i) => {
				// 		values[i] = v * (1 + spellAmplify);
				// 	});
				// 	if (minValues != undefined) {
				// 		minValues.forEach((v, i) => {
				// 			minValues[i] = v * (1 + spellAmplify);
				// 		});
				// 	}
				// 	if (maxValues != undefined) {
				// 		maxValues.forEach((v, i) => {
				// 			maxValues[i] = v * (1 + spellAmplify);
				// 		});
				// 	}
				// 	for (const addedName in addedValues) {
				// 		const a = addedValues[addedName];
				// 		a.forEach((v, i) => {
				// 			a[i] = v * (1 + spellAmplify);
				// 		});
				// 	}
				// }
				// if (Number.isFinite(damagePercent)) {
				// 	damagePercent = damagePercent * 0.01;
				// 	// 伤害增加
				// 	values.forEach((v, i) => {
				// 		values[i] = v * (1 + damagePercent);
				// 	});
				// 	if (minValues != undefined) {
				// 		minValues.forEach((v, i) => {
				// 			minValues[i] = v * (1 + damagePercent);
				// 		});
				// 	}
				// 	if (maxValues != undefined) {
				// 		maxValues.forEach((v, i) => {
				// 			maxValues[i] = v * (1 + damagePercent);
				// 		});
				// 	}
				// 	for (const addedName in addedValues) {
				// 		const a = addedValues[addedName];
				// 		a.forEach((v, i) => {
				// 			a[i] = v * (1 + damagePercent);
				// 		});
				// 	}
				// }
			}
			let probabilityAmplify = addedAttributeValues["probability_amplify"];
			if (probabilityAmplify != undefined) {
				probabilityAmplify = probabilityAmplify * 0.01;
				// 概率增强
				let isProbability = false;
				if (abilityValue.IsProbability != undefined) {
					isProbability = abilityValue.IsProbability;
				} else if (indexOfDamage) {
					isProbability = true;
				}
				if (isProbability) {
					values.forEach((v, i) => {
						values[i] = v * (1 + probabilityAmplify);
					});
					if (minValues != undefined) {
						minValues.forEach((v, i) => {
							minValues[i] = v * (1 + probabilityAmplify);
						});
					}
					if (maxValues != undefined) {
						maxValues.forEach((v, i) => {
							maxValues[i] = v * (1 + probabilityAmplify);
						});
					}
					for (const addedName in addedValues) {
						const a = addedValues[addedName];
						a.forEach((v, i) => {
							a[i] = v * (1 + probabilityAmplify);
						});
					}
				}
			}
		}

		let className = classNames(classList);

		let offset = 0;
		while (!next.done) {
			let match = next.value;
			let hasSign = match[1] != undefined;
			let precision = match[3] != undefined ? toFiniteNumber(match[3], 2) : undefined;
			let type = match[4];
			let isPercent = match[6] != undefined;
			let valueNumberToString = (value: number) => {
				value = Float(value);
				if (!hasSign) {
					value = Math.abs(value);
				}

				// 如果过小
				if (Math.abs(value) < 1) {
					if (type == "d") {
						return String(Math.trunc(value));
					} else if (type == "f") {
						if (precision != undefined) {
							return value.toFixed(precision);
						} else {
							return String(value);
						}
					}
					return String(value);
				}

				if (type == "d") {
					return String(Math.trunc(value));
				} else if (type == "f") {
					if (precision != undefined) {
						return value.toFixed(precision);
					} else {
						return String(value);
					}
				}
				return FormatNumber(value, precision);
			};

			let [valuesSB, valuesPctSB] = ComposeValuesSB(showValues, level, onlyCurrentLevelValue, showValues.length, className, valueNumberToString);

			if (!isDescription) {
				if (!(showExtra && unit != undefined)) {
					// 正常显示公式
					let n = 0;
					for (const addedName in addedAttributeValues) {
						let factors = addedFactors[addedName];
						if (factors == undefined) {
							continue;
						}
						let addedLocalization = GetLocalization(`dota_ability_special_variable${addedName}`, "");
						if (addedLocalization == "") continue;
						let [temp, tempPct] = ComposeValues(factors, level, onlyCurrentLevelValue, showValues.length, className, composeNumberToString);
						if (onlyCurrentLevelValue ? level > 0 && showValues.length > 0 && showValues[Clamp(level, 1, showValues.length) - 1] == 0 : simplifyShowValues.length == 1 && simplifyShowValues[0] == 0) {
							if (n == 0) {
								valuesSB = [];
								valuesSB.push(`${addedLocalization}×${temp}`);
								valuesPctSB = [];
								valuesPctSB.push(`${addedLocalization}×${tempPct}`);
							} else {
								valuesSB.push(` + ${addedLocalization}×${temp}`);
								valuesPctSB.push(` + ${addedLocalization}×${tempPct}`);
							}
						} else {
							valuesSB.push(`[ + ${addedLocalization}×${temp}]`);
							valuesPctSB.push(`[ + ${addedLocalization}×${tempPct}]`);
						}
						n++;
					}
				} else {
					// 显示计算后的数值
					let hasOperation = false;
					let n = 0;
					for (const addedName in addedAttributeValues) {
						let addedValue = addedValues[addedName];
						if (addedValue == undefined) {
							continue;
						}
						let [temp, tempPct] = ComposeValues(addedValue, level, onlyCurrentLevelValue, showValues.length, className, composeNumberToString);
						if (onlyCurrentLevelValue ? level > 0 && showValues.length > 0 && showValues[Clamp(level, 1, showValues.length) - 1] == 0 : simplifyShowValues.length == 1 && simplifyShowValues[0] == 0) {
							if (n == 0) {
								valuesSB = [];
								valuesSB.push(`${temp}`);
								valuesPctSB = [];
								valuesPctSB.push(`${tempPct}`);
							} else {
								hasOperation = true;
								valuesSB.push(` + ${temp}`);
								valuesPctSB.push(` + ${tempPct}`);
							}
						} else {
							hasOperation = true;
							valuesSB.push(`[ + ${temp}]`);
							valuesPctSB.push(`[ + ${tempPct}]`);
						}
						n++;
					}

					let [temp, tempPct] = ComposeValues(values, level, onlyCurrentLevelValue, showValues.length, className, valueNumberToString);
					if (hasOperation) {
						valuesSB.push(` = ${temp}`);
						valuesPctSB.push(` = ${tempPct}`);
					} else {
						valuesSB = [];
						valuesSB.push(`${temp}`);
						valuesPctSB = [];
						valuesPctSB.push(`${tempPct}`);
					}
				}

				// 显示最大最小值
				if (showExtra) {
					if (minValues != undefined) {
						let minLocalization = GetLocalization("dota_ability_special_variable_min", "");
						if (minLocalization != "") {
							let [temp, tempPct] = ComposeValues(minValues, level, onlyCurrentLevelValue, showValues.length, className);
							valuesSB.push(`[${minLocalization}${temp}]`);
							valuesPctSB.push(`[${minLocalization}${tempPct}]`);
						}
					}
					if (maxValues != undefined) {
						let maxLocalization = GetLocalization("dota_ability_special_variable_max", "");
						if (maxLocalization != "") {
							let [temp, tempPct] = ComposeValues(maxValues, level, onlyCurrentLevelValue, showValues.length, className);
							valuesSB.push(`[${maxLocalization}${temp}]`);
							valuesPctSB.push(`[${maxLocalization}${tempPct}]`);
						}
					}
				}
			}

			// 乘区显示
			if (abilityValue.IsMultiplicative == true) {
				let mark = GetLocalization("dota_ability_variable_mult_mark", "");
				if (mark != "") {
					valuesSB.push(mark);
					valuesPctSB.push(mark);
				}
			}

			let replacing = isPercent ? valuesPctSB.join("") : valuesSB.join("");

			text = text.substring(0, match.index + offset) + replacing + text.substring(match.index + offset + match[0].length);
			offset += replacing.length - match[0].length;

			next = matches.next();
		}
	}

	return text;
}

function GetAbilityUpgradeName(abilityUpgradeID: string) {
	let t = KeyValues.AbilityUpgradesKv[abilityUpgradeID] ?? KeyValues.ItemUpgradesKv[abilityUpgradeID];
	if (t == undefined) return "";
	let textSB: string[] = [];
	let type = t.type;
	switch (type) {
		case "ABILITY_UPGRADES_TYPE_UNIQUE":
			break;
		case "ABILITY_UPGRADES_TYPE_VALUE":
			break;
		default:
			break;
	}
	return textSB.join("");
}

function GetAbilityUpgradeDescription(abilityUpgradeID: string, abilityUpgradeData?: {
	type: "ABILITY_UPGRADES_TYPE_VALUE" | "ABILITY_UPGRADES_TYPE_UNIQUE";
	ability_name: string;
	operator?: "ABILITY_UPGRADES_OP_ADD" | "ABILITY_UPGRADES_OP_MUL";
	operator_value?: number;
	value_name?: string;
	value_key_name?: string;
	unique?: string;
	AbilityValues?: Record<string, number | Record<string, number>>;
	max_count?: number;
}) {
	let t = KeyValues.AbilityUpgradesKv[abilityUpgradeID] ?? KeyValues.ItemUpgradesKv[abilityUpgradeID] ?? abilityUpgradeData;
	if (t == undefined) return "";
	let type = t.type;
	if (type == undefined) return "";
	let abilityName = t.ability_name;
	if (abilityName == undefined) return "";
	let textSB: string[] = [];
	switch (type) {
		case "ABILITY_UPGRADES_TYPE_UNIQUE":
			let unique = t.unique;
			let abilityValues: Record<string, AbilityValueData> = {};
			if (typeof t.AbilityValues == "object") {
				for (const valueName in t.AbilityValues) {
					const element = t.AbilityValues[valueName];
					abilityValues[valueName] = FormatAbilityValueData(element);
				}
			}
			let description = GetLocalization(`DOTA_Tooltip_Ability_${abilityName}_unique_${unique}_description`, "");
			if (description != "") {
				textSB.push(ReplaceValues(description, abilityValues));
			}
			break;
		case "ABILITY_UPGRADES_TYPE_VALUE":
			let valueName = t.value_name;
			if (valueName == undefined) {
				break;
			}
			let valueKeyName = t.value_key_name ?? "value";
			if (typeof valueKeyName != "string") {
				break;
			}
			let valueText = GetLocalization(`DOTA_Tooltip_ability_upgrade_${abilityUpgradeID}_${valueName}`, "");
			if (valueText == "") {
				valueText = GetLocalization(`DOTA_Tooltip_Ability_${abilityName}_${valueName}`, "").replace(/[:：\s]/g, "");
				if (valueText == "") {
					valueText = GetLocalization(`dota_ability_special_variable_${valueName}`, "");
					if (valueText != "") {
						let isNegative = valueText.substring(valueText.length - 1) == "*";
						if (isNegative) {
							valueText = valueText.substring(0, valueText.length - 1);
						}
					} else {
						valueText = GetLocalization(`dota_ability_attribute_${valueName.replace("item_", "")}`, "");
					}
				}
			}
			if (valueText == "") {
				break;
			}
			let isPercent;
			if (valueText[0] == "%") {
				isPercent = true;
				valueText = valueText.substring(1);
			} else {
				isPercent = t.operator == "ABILITY_UPGRADES_OP_MUL";
			}
			textSB.push(valueText);
			if (valueKeyName != "value") {
				let valueKeyText = GetLocalization(`dota_ability_special_variable${valueKeyName}_full`, "");
				if (valueKeyText != "") {
					textSB.push(valueKeyText);
				}
			}
			let [number, numberPct] = ComposeValues([toFiniteNumber(t.operator_value)]);
			textSB.unshift(`${toFiniteNumber(t.operator_value) >= 0 ? "+" : "-"} ${isPercent ? numberPct : number} `);
			break;
		default:
			break;
	}
	return textSB.join("");
}

function FormatAbilityValueData(data: any) {
	let t: AbilityValueData = {
		value: [0]
	};
	if (typeof data == "object") {
		for (const k in data) {
			let v = data[k];
			let key = k.replace(/\s/g, "") as keyof AbilityValueData | "";
			if (key == "") {
				continue;
			}
			let value = toFiniteString(v);
			if (value == "") {
				continue;
			}
			switch (key) {
				// 数值处理
				case "value":
				case "_attack_damage":
				case "_spell_power":
				case "_armor":
				case "_health":
				case "_str":
				case "_agi":
				case "_int":
				case "_primary":
				case "_all":
				case "_attack_range":
				case "_min":
				case "_max":
					let values = SimplifyValuesArray(value.split(" ").map(a => toFiniteNumber(a)));
					if (key == "value") {
						t[key] = values;
					} else if (key == "_min" || key == "_max") {
						if (values.length > 0) {
							t[key] = values;
						}
					} else {
						if (values.length > 0 && !(values.length == 1 && values[0] == 0)) {
							t[key] = values;
						}
					}
					break;
				// 布尔值处理
				case "IsProbability":
				case "IsMultiplicative":
				case "affected_by_aoe_increase":
				case "CalculateSpellDamageTooltip":
				case "RequiresScepter":
				case "RequiresShard":
				case "TooltipOnly":
				case "dynamic_value":
				case "operator_mul":
				case "operator_negative":
					t[key] = value == "true" || toFiniteNumber(value) >= 1;
					break;
				// 字符串处理
				case "operator_ability_name":
				case "operator_key_name":
					t[key] = value != undefined ? String(value) : undefined;
					break;
				// 枚举处理
				case "DamageTypeTooltip":
					let enums = value.split("|");
					for (const e of enums) {
						if (e == "DAMAGE_TYPE_NONE" ||
							e == "DAMAGE_TYPE_PHYSICAL" ||
							e == "DAMAGE_TYPE_MAGICAL" ||
							e == "DAMAGE_TYPE_PURE") {
							let i = DAMAGE_TYPES[e];
							if (i == undefined) {
								continue;
							}
							t[key] = (t[key] ?? 0) + i;
						}
					}
					break;
			}
		}
	} else {
		let value = toFiniteString(data);
		if (value != "") {
			t.value = SimplifyValuesArray(value.split(" ").map(a => toFiniteNumber(a)));
		}
	}
	if (t.value == undefined) {
		t.value = [0];
	}
	else if (t.value.length <= 0) {
		t.value.push(0);
	}
	return t;
}

function GetAbilityTalentAllText(abilityName: string, talentName: string, level: number = -1, onlyCurrentLevelValue: boolean = false) {
	let t: Table | undefined = KeyValues.HeroAbilityTalentKv[abilityName]?.[talentName] ?? KeyValues.GeneSuitKv[abilityName]?.[talentName];
	let result = {
		attributes: "",
		description: "",
		extra_attributes: "",
		extradescription: "",
	};
	if (t == undefined) return result;
	if (abilityName == undefined) return result;
	let abilityValues: Record<string, AbilityValueData> = {};
	if (typeof t.AbilityValues == "object") {
		for (const valueName in t.AbilityValues) {
			const element = t.AbilityValues[valueName];
			abilityValues[valueName] = FormatAbilityValueData(element);
		}
	}

	const pushNewLine = (sb: string[], text: string) => {
		if (sb.length != 0) {
			sb.push("<br>");
		}
		sb.push(text);
	};

	let sb_attributes: string[] = [];
	let sb_description: string[] = [];
	let sb_extra_attributes: string[] = [];
	let sb_extradescription: string[] = [];

	for (const valueName of Object.keys(abilityValues)) {
		const abilityValue = abilityValues[valueName];
		if (valueName == t.ValueName) continue;
		if (abilityValue.value == undefined) continue;
		if (abilityValue.value.length <= 0) continue;
		// 动态数值不会隐藏
		if (abilityValue.value.length == 1 && abilityValue.value[0] == 0 && abilityValue.dynamic_value != true) {
			let skip = true;
			for (const key in abilityValue) {
				if (key[0] == "_") {
					let factors = abilityValue[key as never] as number[];
					if (factors != undefined && factors.length > 0 && !(factors.length == 1 && factors[0] == 0)) {
						skip = false;
						break;
					}
				}
			}
			if (skip) {
				continue;
			}
		}
		// 如果仅显示当前等级数值，则需要检查当前等级的数值是否有用。动态数值不会隐藏
		if (onlyCurrentLevelValue == true && abilityValue.dynamic_value != true) {
			if (level <= 0) continue;
			if (abilityValue.value[Clamp(level - 1, 0, abilityValue.value.length)] == 0) {
				let skip = true;
				for (const key in abilityValue) {
					if (key[0] == "_") {
						let factors = abilityValue[key as never] as number[];
						if (factors != undefined && factors.length > 0) {
							let factor = factors[Clamp(level - 1, 0, factors.length)];
							if (factor != 0) {
								skip = false;
								break;
							}
						}
					}
				}
				if (skip) {
					continue;
				}
			}
		}

		let valueLocalization;
		if (valueName == "abilitydamage") {
			valueLocalization = GetLocalization("AbilityDamage", "");
		} else {
			valueLocalization = GetLocalization(`dota_tooltip_ability_${abilityName}_${valueName}`, "");
		}

		// 天赋属性处理
		if (valueLocalization == "" && valueName.substring(0, 7) == "talent_") {
			let attributeLocalization = GetLocalization(`dota_ability_attribute_${valueName.substring(7)}`, "");
			if (attributeLocalization != "") {
				let isPercentage = attributeLocalization.substring(0, 1) == "%";
				let isNegative = attributeLocalization.substring(attributeLocalization.length - 1) == "*";
				valueLocalization = `${isPercentage ? "%" : ""}${isNegative ? "-" : "+"}${attributeLocalization.substring(isPercentage ? 1 : 0, isNegative ? attributeLocalization.length - 1 : attributeLocalization.length)}`;
			}
		}

		// 技能升级处理
		if (valueLocalization == "" && valueName.substring(0, 9) == "operator_") {
			let operatorValueName = valueName.substring(9);
			let operatorAbilityName = abilityValue.operator_ability_name ?? abilityName;
			let operatorKeyName = abilityValue.operator_key_name ?? "value";
			if (typeof operatorKeyName == "string") {
				let attributeLocalization = GetLocalization(`DOTA_Tooltip_Ability_${operatorAbilityName}_${operatorValueName}`, "").replace(/[:：\s]/g, "");
				if (attributeLocalization == "") {
					attributeLocalization = GetLocalization(`DOTA_Tooltip_Ability_${operatorAbilityName}_unique_${talentName}_${operatorValueName}`, "").replace(/[:：\s]/g, "");
				}
				if (attributeLocalization == "") {
					attributeLocalization = GetLocalization(`dota_ability_special_variable_${operatorValueName}`, "");
				}
				if (attributeLocalization != "") {
					let isPercentage = attributeLocalization.substring(0, 1) == "%";
					let isNegative = attributeLocalization.substring(attributeLocalization.length - 1) == "*";
					let abilityNameLoc = GetLocalization(`DOTA_Tooltip_Ability_${operatorAbilityName}`, "");
					attributeLocalization = (abilityNameLoc != "" ? "<span class='ability_name'>" + abilityNameLoc + "</span>" : "") + attributeLocalization.substring(isPercentage ? 1 : 0, isNegative ? attributeLocalization.length - 1 : attributeLocalization.length) + (operatorKeyName != "value" ? GetLocalization(`dota_ability_special_variable${operatorKeyName}_full`, "") : "");

					valueLocalization = `${isPercentage || abilityValue.operator_mul ? "%" : ""}${isNegative ? "-" : "+"}${attributeLocalization}`;
				}
			}
		}

		if (valueLocalization == "") {
			continue;
		}
		let isPercentage = valueLocalization.substring(0, 1) == "%";
		if (isPercentage) {
			valueLocalization = valueLocalization.substring(1);
		}
		let hasSign = valueLocalization.search(/[\+\-]/g) == 0;
		if (hasSign) {
			let value = abilityValue.value.length > 0 ? abilityValue.value[Clamp(level - 1, 0, abilityValue.value.length - 1)] : 0;
			let sign = valueLocalization.substring(0, 1);
			let isNegative = false;
			if (value < 0 && sign == "+") {
				sign = "-";
				isNegative = true;
			} else if (value > 0 && sign == "-") {
				sign = "+";
				isNegative = true;
			}
			valueLocalization = valueLocalization.substring(1);
			pushNewLine(sb_attributes, `${sign} %${valueName}%${isPercentage ? "%" : ""} ${isNegative ? "<font color='#e03e2e'>" : ""}${valueLocalization}${isNegative ? "</font>" : ""}`);
		} else {
			pushNewLine(sb_extra_attributes, `${valueLocalization} %${valueName}%${isPercentage ? "%" : ""}`);
		}
	}

	{
		let unique = talentName;
		let description = GetLocalization(`DOTA_Tooltip_Ability_${abilityName}_unique_${unique}_description`, "");
		if (description != "") {
			pushNewLine(sb_description, description);
		}
	}

	{
		// 需求
		let requires = t.Requires;
		if (requires != undefined) {
			let requiresTextList = [];
			for (const a of String(requires).replaceAll(/\s/g, "").split(";")) {
				let [name, level] = a.split("-");
				let text = GetLocalization("DOTA_AbilityTalentTooltip_RequiresTalent", "");
				if (text == "") break;
				let talentNameLoc = GetLocalization(`DOTA_Tooltip_Ability_${abilityName}_unique_${name}`, "");
				if (talentNameLoc == "") continue;
				text = text.replace("%s0", talentNameLoc);
				text = text.replace("%s1", String(toFiniteNumber(level, 1)));
				requiresTextList.push(text);
			}
			if (requiresTextList.length > 0) {
				pushNewLine(sb_extradescription, GetLocalization("DOTA_AbilityTalentTooltip_Requires") + "<br>" + requiresTextList.join("<br>"));
			}
		}

		// 互斥
		let conflict = t.Conflict;
		if (conflict != undefined) {
			let conflictTextList = [];
			for (const a of String(conflict).replaceAll(/\s/g, "").split(";")) {
				let [name, level] = a.split("-");
				let text = GetLocalization("DOTA_AbilityTalentTooltip_ConflictTalent", "");
				if (text == "") break;
				let talentNameLoc = GetLocalization(`DOTA_Tooltip_Ability_${abilityName}_unique_${name}`, "");
				if (talentNameLoc == "") continue;
				text = text.replace("%s0", talentNameLoc);
				conflictTextList.push(text);
			}
			if (conflictTextList.length > 0) {
				pushNewLine(sb_extradescription, GetLocalization("DOTA_AbilityTalentTooltip_Conflict") + "<br>" + conflictTextList.join("<br>"));
			}
		}
	}

	result.attributes = ReplaceValues(sb_attributes.join(""), abilityValues, level, {
		OnlyCurrentLevelValue: onlyCurrentLevelValue,
		IsDescription: false,
	});
	result.description = ReplaceValues(sb_description.join(""), abilityValues, level, {
		OnlyCurrentLevelValue: onlyCurrentLevelValue,
		IsDescription: false,
	});
	result.extra_attributes = ReplaceValues(sb_extra_attributes.join(""), abilityValues, level, {
		OnlyCurrentLevelValue: onlyCurrentLevelValue,
		IsDescription: false,
	});
	result.extradescription = sb_extradescription.join("");

	return result;
}
