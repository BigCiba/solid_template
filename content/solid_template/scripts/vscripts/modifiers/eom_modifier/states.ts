/** @noSelfInFile */
/**
 * EOMModifier状态
 */
enum EOMModifierState {
	NO_HEALTH_BAR = modifierstate.MODIFIER_STATE_LAST + 1,
	CUSTOM_HEALTH_BAR,
	AI_DISABLED,	/** 禁用AI */

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

function HasState(parent: CDOTA_BaseNPC, iState: EOMModifierState) {
	if (!IsValid(parent)) return false;

	if (parent.aStateModifers == undefined) parent.aStateModifers = [];
	let aStateModifers = parent.aStateModifers;

	for (const i of $range(aStateModifers.length, 1, -1)) {
		const hModifier = aStateModifers[i - 1];
		if (IsValid(hModifier) && typeof (hModifier["ECheckState" as keyof CDOTA_Modifier_Lua]) == "function") {
			// @ts-ignore
			let tFlags: Partial<Record<EOMModifierState, boolean>> = hModifier["ECheckState"]();
			if (typeof tFlags == "object" && typeof tFlags[iState] == "boolean") {
				return tFlags[iState];
			}
		} else {
			table.remove(aStateModifers, i);
		}
	}

	return false;
}