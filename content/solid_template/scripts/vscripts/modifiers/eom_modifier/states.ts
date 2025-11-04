/** @noSelfInFile */
/**
 * EOMModifier状态
 */
enum EOMModifierStates {
	MODIFIER_STATE_NO_HEALTH_BAR = modifierstate.MODIFIER_STATE_LAST + 1,
	MODIFIER_STATE_CUSTOM_HEALTH_BAR,
	MODIFIER_STATE_ARMOR_REDUCTION_IMMUNE,	/** 不會被減甲 */
	MODIFIER_STATE_NO_ATTRIBUTE, // 无属性，即无法获得属性效果

	MODIFIER_STATE_AI_DISABLED,	/** 禁用AI */
	// MODIFIER_STATE_CRITICAL_IMMUNE,	/** TODO:免疫暴击 */
	MODIFIER_STATE_DASH_DISABLE,	/** 冲锋无效 */
	MODIFIER_STATE_TELEPORT_DISABLE,	/** TODO:传送无效 */
	// MODIFIER_STATE_STUN_IMMUNE,	/** 免疫眩晕 */
	MODIFIER_STATE_DAMAGE_IMMUNE,	/** 伤害免疫，仅用作标记，无实际作用 */
	MODIFIER_STATE_BLEEDING_DEEPEN,	/** 恶性流血 */
	MODIFIER_STATE_HEALTHY,	/** 健壮的 */
	MODIFIER_STATE_INJURED,	/** 背水的 */

}

function RegisterModifierState(hModifier: CDOTA_Modifier_Lua) {
	if (!IsValid(hModifier)) return false;
	if (typeof (hModifier["ECheckState" as keyof CDOTA_Modifier_Lua]) != "function") return false;
	let parent = hModifier.GetParent();

	if (parent.aStateModifers == undefined) parent.aStateModifers = [];
	let aStateModifers = parent.aStateModifers;

	aStateModifers.push(hModifier);

	aStateModifers.sort((a, b) => {
		let iPriorityA = typeof a.GetPriority == "function" ? a.GetPriority() : modifierpriority.MODIFIER_PRIORITY_NORMAL;
		let iPriorityB = typeof b.GetPriority == "function" ? b.GetPriority() : modifierpriority.MODIFIER_PRIORITY_NORMAL;
		return iPriorityA - iPriorityB;
	});

	return true;
}
function UnregisterModifierState(hModifier: CDOTA_Modifier_Lua) {
	if (!IsValid(hModifier)) return false;
	let parent = hModifier.GetParent();

	if (parent.aStateModifers == undefined) return false;
	let aStateModifers = parent.aStateModifers;

	if (ArrayRemove(aStateModifers, hModifier)[0] != undefined) {
		return true;
	}

	return false;
}

function HasState(parent: CDOTA_BaseNPC, iState: EOMModifierStates) {
	if (!IsValid(parent)) return false;

	if (parent.aStateModifers == undefined) parent.aStateModifers = [];
	let aStateModifers = parent.aStateModifers;

	for (const i of $range(aStateModifers.length, 1, -1)) {
		const hModifier = aStateModifers[i - 1];
		if (IsValid(hModifier) && typeof (hModifier["ECheckState" as keyof CDOTA_Modifier_Lua]) == "function") {
			// @ts-ignore
			let tFlags: Partial<Record<EOMModifierStates, boolean>> = hModifier["ECheckState"]();
			if (typeof tFlags == "object" && typeof tFlags[iState] == "boolean") {
				return tFlags[iState];
			}
		} else {
			table.remove(aStateModifers, i);
		}
	}

	return false;
}
// ----------------------------------------public----------------------------------------
/**
 * 是否没有血条
 * @param hUnit
 * @returns
 */
function HasNoHealthBar(hUnit: CDOTA_BaseNPC) {
	return HasState(hUnit, EOMModifierStates.MODIFIER_STATE_NO_HEALTH_BAR);
}
/**
 * TODO:是否免疫暴击
 * @param hUnit
 * @returns
 */
// function HasCriticalImmune(hUnit: CDOTA_BaseNPC) {
// 	return HasState(hUnit, EOMModifierStates.MODIFIER_STATE_CRITICAL_IMMUNE);
// }

/**
 * 是否免疫减甲
 * @param hUnit
 * @returns
 */
function HasArmorReductionImmune(hUnit: CDOTA_BaseNPC) {
	return HasState(hUnit, EOMModifierStates.MODIFIER_STATE_ARMOR_REDUCTION_IMMUNE);
}

/** 是否晕眩免疫 */
// function HasStunImmune(hUnit: CDOTA_BaseNPC) {
// 	return HasState(hUnit, EOMModifierStates.MODIFIER_STATE_STUN_IMMUNE);
// }