/** @noSelfInFile */

if (_G.MODIFIER_PROPERTY_PLAYER_DATA === undefined) {
	_G.MODIFIER_PROPERTY_PLAYER_DATA = {};
}
if (_G.MODIFIER_PROPERTY_TEAM_DATA === undefined) {
	_G.MODIFIER_PROPERTY_TEAM_DATA = {};
}
if (_G.MODIFIER_PROPERTY_TEAMHERO_DATA === undefined) {
	_G.MODIFIER_PROPERTY_TEAMHERO_DATA = {};
}

type DeclarePropertyFunction = (keys?: ModifierEvent) => any;
declare interface CDOTA_Modifier_Lua {
	_propertyCallbacks: Partial<Record<EOMModifierFunction, DeclarePropertyFunction>>;
	_staticPropertyValues: Partial<Record<EOMModifierFunction, any>>;

	/**
	 * Relationship of this status effect with those from other buffs (higher is more
	 * likely to be shown).
	 *
	 * @both
	 */
	StatusEffectPriority(): number;
}

function StaticModifierProperty(hModifier: CDOTA_Modifier_Lua, iProperty: EOMModifierFunction, value: any) {
	if (hModifier == undefined) return;
	let t: any = hModifier.GetParent();
	let propertyType = EOMModifierFunctionType[iProperty];
	switch (propertyType) {
		case EOMModifierPropertyType.PLAYER:
			{
				let iPlayerID = (t as CDOTA_BaseNPC).GetPlayerOwnerID();
				if (iPlayerID != -1) {
					MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] ?? {};
					t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID];
				} else {
					return;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM:
			{
				let iTeamNumber = (t as CDOTA_BaseNPC).GetTeamNumber();
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber];
				} else {
					return;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM_HERO:
			{
				let iTeamNumber = (t as CDOTA_BaseNPC).GetTeamNumber();
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber];
				} else {
					return;
				}
			}
			break;
		default:
			break;
	}
	if (hModifier._staticPropertyValues == undefined) hModifier._staticPropertyValues = {};
	if (t.tStaticPropertyModifers == undefined) t.tStaticPropertyModifers = {};
	if (t.tStaticPropertyModifers[iProperty] == undefined) t.tStaticPropertyModifers[iProperty] = {};

	let tValues = hModifier._staticPropertyValues;
	let aModifers: CDOTA_Modifier_Lua[] = t.tStaticPropertyModifers[iProperty];
	let funcSettleCallback = EOMModifierFunctionSettleCallback[iProperty];
	let funcCheckValueCallback = EOMModifierFunctionCheckValueCallback[iProperty];

	if (value != undefined && tValues[iProperty] == undefined) {
		aModifers.push(hModifier);
	}
	tValues[iProperty] = value;

	// 重新计算总值
	let fValue = funcSettleCallback != FirstSimple ? 0 : undefined;
	for (const i of $range(aModifers.length, 1, -1)) {
		const modifier = aModifers[i - 1];
		if (modifier == hModifier && value == undefined) {
			table.remove(aModifers, i);
			continue;
		}
		// @ts-ignore
		if (modifier._bDestroyed != true && modifier._staticPropertyValues != undefined && modifier._staticPropertyValues[iProperty] != undefined) {
			let value = modifier._staticPropertyValues[iProperty];
			if (funcCheckValueCallback != undefined) {
				value = funcCheckValueCallback(value) ?? value;
			}
			if (funcSettleCallback != undefined) {
				fValue = funcSettleCallback(fValue, value);
			} else {
				fValue = fValue + value;
			}
		} else {
			table.remove(aModifers, i);
		}
	}

	if (t.__staticPropertyValue == undefined) t.__staticPropertyValue = {};
	t.__staticPropertyValue[iProperty] = fValue;
}

function RegisterModifierProperty(hModifier: CDOTA_Modifier_Lua, iProperty: EOMModifierFunction, funcCallback: DeclarePropertyFunction) {
	let t: any = hModifier.GetParent();
	let propertyType = EOMModifierFunctionType[iProperty];
	switch (propertyType) {
		case EOMModifierPropertyType.PLAYER:
			{
				let iPlayerID = (t as CDOTA_BaseNPC).GetPlayerOwnerID();
				if (iPlayerID != -1) {
					MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] ?? {};
					t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID];
				} else {
					return;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM:
			{
				let iTeamNumber = (t as CDOTA_BaseNPC).GetTeamNumber();
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber];
				} else {
					return;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM_HERO:
			{
				let iTeamNumber = (t as CDOTA_BaseNPC).GetTeamNumber();
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber];
				} else {
					return;
				}
			}
			break;
		default:
			break;
	}
	if (hModifier._propertyCallbacks == undefined) hModifier._propertyCallbacks = {};
	if (t.tPropertyModifers == undefined) t.tPropertyModifers = {};
	if (t.tPropertyModifers[iProperty] == undefined) t.tPropertyModifers[iProperty] = [];

	let tCallbacks = hModifier._propertyCallbacks;
	let tPropertyModifers: CDOTA_Modifier_Lua[] = t.tPropertyModifers[iProperty];
	tPropertyModifers.push(hModifier);
	for (const i of $range(tPropertyModifers.length, 1, -1)) {
		const modifier = tPropertyModifers[i - 1];
		// @ts-ignore
		if (!IsValid(modifier) || modifier._bDestroyed == true) {
			table.remove(tPropertyModifers, i);
			modifier._propertyCallbacks[iProperty] = undefined;
		}
	}
	// 优先级越高越排在后面，因为遍历Property的callback是从后往前遍历，如果是从前往后遍历，则需要反过来处理
	tPropertyModifers.sort((a, b) => {
		let ap = typeof a.GetPriority == undefined ? modifierpriority.MODIFIER_PRIORITY_NORMAL : a.GetPriority();
		let bp = typeof b.GetPriority == undefined ? modifierpriority.MODIFIER_PRIORITY_NORMAL : b.GetPriority();
		return ap - bp;
	});
	tCallbacks[iProperty] = funcCallback;
}

function UnregisterModifierProperty(hModifier: CDOTA_Modifier_Lua, iProperty: EOMModifierFunction) {
	let t: any = hModifier.GetParent();
	let propertyType = EOMModifierFunctionType[iProperty];
	switch (propertyType) {
		case EOMModifierPropertyType.PLAYER:
			{
				let iPlayerID = (t as CDOTA_BaseNPC).GetPlayerOwnerID();
				if (iPlayerID != -1) {
					MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] ?? {};
					t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID];
				} else {
					return;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM:
			{
				let iTeamNumber = (t as CDOTA_BaseNPC).GetTeamNumber();
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber];
				} else {
					return;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM_HERO:
			{
				let iTeamNumber = (t as CDOTA_BaseNPC).GetTeamNumber();
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber];
				} else {
					return;
				}
			}
			break;
		default:
			break;
	}
	if (hModifier._propertyCallbacks == undefined) return;
	if (t.tPropertyModifers == undefined) return;
	if (t.tPropertyModifers[iProperty] == undefined) return;

	let tPropertyModifers: CDOTA_Modifier_Lua[] = t.tPropertyModifers[iProperty];

	for (const i of $range(tPropertyModifers.length, 1, -1)) {
		const modifier = tPropertyModifers[i - 1];
		// @ts-ignore
		if (modifier._bDestroyed == true || modifier == hModifier) {
			table.remove(tPropertyModifers, i);
			modifier._propertyCallbacks[iProperty] = undefined;
		}
	}
}

function GetModifierProperty(unitOrTeamOrPlayer: CDOTA_BaseNPC | DOTATeam_t | PlayerID, iProperty: EOMModifierFunction, tParams?: any) {
	if (unitOrTeamOrPlayer == undefined) return 0;
	let t: any;
	let propertyType = EOMModifierFunctionType[iProperty];
	switch (propertyType) {
		case EOMModifierPropertyType.PLAYER:
			{
				let iPlayerID: PlayerID = -1;
				if (typeof unitOrTeamOrPlayer == "number") {
					iPlayerID = unitOrTeamOrPlayer;
				} else {
					iPlayerID = unitOrTeamOrPlayer.GetPlayerOwnerID();
				}
				if (iPlayerID != -1) {
					MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] ?? {};
					t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID];
				} else {
					return 0;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM:
			{
				let iTeamNumber = DOTATeam_t.DOTA_TEAM_NOTEAM;
				if (typeof unitOrTeamOrPlayer == "number") {
					if (unitOrTeamOrPlayer >= DOTATeam_t.DOTA_TEAM_FIRST && unitOrTeamOrPlayer < DOTATeam_t.DOTA_TEAM_COUNT) {
						iTeamNumber = unitOrTeamOrPlayer as DOTATeam_t;
					}
				} else {
					iTeamNumber = unitOrTeamOrPlayer.GetTeamNumber();
				}
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber];
				} else {
					return 0;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM_HERO:
			{
				if (typeof unitOrTeamOrPlayer == "number") {
					return 0;
				}
				if (!unitOrTeamOrPlayer.IsRealHero()) {
					return 0;
				}
				let iTeamNumber = unitOrTeamOrPlayer.GetTeamNumber();
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber];
				} else {
					return 0;
				}
			}
			break;
		default:
			if (typeof unitOrTeamOrPlayer == "object") {
				t = unitOrTeamOrPlayer;
			} else {
				return 0;
			}
			break;
	}
	if (t.tPropertyModifers == undefined) t.tPropertyModifers = {};
	if (t.tPropertyModifers[iProperty] == undefined) t.tPropertyModifers[iProperty] = [];
	if (t.__staticPropertyValue == undefined) t.__staticPropertyValue = {};

	let tPropertyModifers: CDOTA_Modifier_Lua[] = t.tPropertyModifers[iProperty];
	let funcSettleCallback = EOMModifierFunctionSettleCallback[iProperty];
	let funcCheckValueCallback = EOMModifierFunctionCheckValueCallback[iProperty];

	let fPropertyValue = t.__staticPropertyValue[iProperty];
	if (fPropertyValue != undefined && funcCheckValueCallback != undefined) {
		fPropertyValue = funcCheckValueCallback(fPropertyValue, tParams) ?? fPropertyValue;
	}

	let fValue;
	if (funcSettleCallback != FirstSimple && fPropertyValue == undefined) {
		fValue = 0;
	} else {
		fValue = fPropertyValue;
	}

	for (const i of $range(tPropertyModifers.length, 1, -1)) {
		const modifier = tPropertyModifers[i - 1];
		// @ts-ignore
		if (modifier._bDestroyed != true) {
			let callbacks = modifier._propertyCallbacks;
			if (callbacks != undefined && callbacks[iProperty] != undefined) {
				let value = callbacks[iProperty](tParams);
				if (value == undefined) {
					continue;
				}
				if (funcCheckValueCallback != undefined) {
					value = funcCheckValueCallback(value, tParams) ?? value;
				}
				if (funcSettleCallback != undefined) {
					fValue = funcSettleCallback(fValue, value);
				} else {
					fValue = fValue + value;
				}
			}
		} else {
			table.remove(tPropertyModifers, i);
		}
	}

	return fValue;
}
function GetModifierPropertyFirst(unitOrTeamOrPlayer: CDOTA_BaseNPC | DOTATeam_t | PlayerID, iProperty: EOMModifierFunction, tParams?: any) {
	let t: any;
	let propertyType = EOMModifierFunctionType[iProperty];
	switch (propertyType) {
		case EOMModifierPropertyType.PLAYER:
			{
				let iPlayerID: PlayerID = -1;
				if (typeof unitOrTeamOrPlayer == "number") {
					iPlayerID = unitOrTeamOrPlayer;
				} else {
					iPlayerID = unitOrTeamOrPlayer.GetPlayerOwnerID();
				}
				if (iPlayerID != -1) {
					MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID] ?? {};
					t = MODIFIER_PROPERTY_PLAYER_DATA[iPlayerID];
				} else {
					return 0;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM:
			{
				let iTeamNumber = DOTATeam_t.DOTA_TEAM_NOTEAM;
				if (typeof unitOrTeamOrPlayer == "number") {
					if (unitOrTeamOrPlayer >= DOTATeam_t.DOTA_TEAM_FIRST && unitOrTeamOrPlayer < DOTATeam_t.DOTA_TEAM_COUNT) {
						iTeamNumber = unitOrTeamOrPlayer as DOTATeam_t;
					}
				} else {
					iTeamNumber = unitOrTeamOrPlayer.GetTeamNumber();
				}
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAM_DATA[iTeamNumber];
				} else {
					return 0;
				}
			}
			break;
		case EOMModifierPropertyType.TEAM_HERO:
			{
				if (typeof unitOrTeamOrPlayer == "number") {
					return 0;
				}
				if (!unitOrTeamOrPlayer.IsRealHero()) {
					return 0;
				}
				let iTeamNumber = unitOrTeamOrPlayer.GetTeamNumber();
				if (iTeamNumber != DOTATeam_t.DOTA_TEAM_NOTEAM) {
					MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber] ?? {};
					t = MODIFIER_PROPERTY_TEAMHERO_DATA[iTeamNumber];
				} else {
					return 0;
				}
			}
			break;
		default:
			if (typeof unitOrTeamOrPlayer == "object") {
				t = unitOrTeamOrPlayer;
			} else {
				return 0;
			}
			break;
	}
	if (t.tPropertyModifers == undefined) t.tPropertyModifers = {};
	if (t.tPropertyModifers[iProperty] == undefined) t.tPropertyModifers[iProperty] = [];
	if (t.__staticPropertyValue == undefined) t.__staticPropertyValue = {};

	let tPropertyModifers: CDOTA_Modifier_Lua[] = t.tPropertyModifers[iProperty];
	let funcCheckValueCallback = EOMModifierFunctionCheckValueCallback[iProperty];

	let fPropertyValue = t.__staticPropertyValue[iProperty];
	if (fPropertyValue != undefined && funcCheckValueCallback != undefined) {
		fPropertyValue = funcCheckValueCallback(fPropertyValue, tParams) ?? fPropertyValue;
	}

	if (fPropertyValue != undefined) {
		return fPropertyValue;
	}

	for (const i of $range(tPropertyModifers.length, 1, -1)) {
		const modifier = tPropertyModifers[i - 1];
		// @ts-ignore
		if (modifier._bDestroyed != true) {
			let callbacks = modifier._propertyCallbacks;
			if (callbacks != undefined && callbacks[iProperty] != undefined) {
				let value = callbacks[iProperty](tParams);
				if (value == undefined) {
					continue;
				}
				if (funcCheckValueCallback != undefined) {
					value = funcCheckValueCallback(value, tParams) ?? value;
				}
				// if (value > 0) {
				return value;
				// }
			}
		} else {
			table.remove(tPropertyModifers, i);
		}
	}

	return 0;
}

const MULTIPLE_ATTRIBUTE_PROPERTY: Partial<Record<EOMModifierFunction, true>> = {};
for (const [_, property] of pairs(ATTRIBUTE_MULTIPLE_MAP)) {
	MULTIPLE_ATTRIBUTE_PROPERTY[property] = true;
}

const PROPERTY_TO_ATTRIBUTE: Partial<Record<EOMModifierFunction, string>> = {};
for (const [k, v] of pairs(ATTRIBUTE_MAP)) {
	PROPERTY_TO_ATTRIBUTE[v] = k;
}

function GetAttributeValue(property: EOMModifierFunction, value: number): AttributeValue | undefined {
	let attributeName = PROPERTY_TO_ATTRIBUTE[property];
	if (attributeName == undefined) {
		return undefined;
	}
	return [attributeName, value, MULTIPLE_ATTRIBUTE_PROPERTY[property] ? 1 : 0];
}
function IsMultipleAttribute(attribute: string): boolean {
	return ATTRIBUTE_MULTIPLE_MAP[attribute] != undefined;
}

function GetAttributeMap(attribute: string) {
	return attribute.endsWith("*") ? ATTRIBUTE_MULTIPLE_MAP[attribute.replace("*", "")] : ATTRIBUTE_MAP[attribute];
}

const EOM_UPDATE_HEALTH_PROPERTY: Partial<Record<EOMModifierFunction, boolean>> = {
	[EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH]: true,
};
const EOM_UPDATE_MANA_PROPERTY: Partial<Record<EOMModifierFunction, boolean>> = {
};

//----------------------------------------------------------------------------------------------------
