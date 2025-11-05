/** @noSelfInFile */
enum EOMModifierFunction {
	/** $health */
	EOM_MODIFIER_PROPERTY_HEALTH = modifierfunction.MODIFIER_FUNCTION_LAST + 1,
	/** $attack */
	EOM_MODIFIER_PROPERTY_ATTACK,
	EOM_MODIFIER_PROPERTY_LAST,
}
const ATTRIBUTE_MAP: Record<string, EOMModifierFunction> = {
	health: EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH,
	attack: EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACK,
};
const ATTRIBUTE_MULTIPLE_MAP: Record<string, EOMModifierFunction> = {
};
const EOMModifierFunctionSettleCallback: Partial<Record<EOMModifierFunction, (a: any, b: any) => any>> = {
};
const EOMModifierFunctionType: Partial<Record<EOMModifierFunction, EOMModifierPropertyType>> = {
};
const EOMModifierFunctionCheckValueCallback: Partial<Record<EOMModifierFunction, (value: any, tParams?: any) => any>> = {
};

/** $health */
function GetHealth(unit: CDOTA_BaseNPC, params?: any) {
	return GetModifierProperty(unit, EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH, params);
}
/** $attack */
function GetAttack(unit: CDOTA_BaseNPC, params?: any) {
	return GetModifierProperty(unit, EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACK, params);
}