local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 2,["7"] = 2,["8"] = 2,["9"] = 2,["10"] = 2,["11"] = 2,["12"] = 2,["13"] = 9,["14"] = 13,["15"] = 15,["16"] = 17,["17"] = 19,["19"] = 23,["20"] = 24,["21"] = 23,["23"] = 27,["24"] = 28,["25"] = 27});
---
-- @noSelfInFile
EOMModifierFunction = EOMModifierFunction or ({})
EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH = 380
EOMModifierFunction[EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH] = "EOM_MODIFIER_PROPERTY_HEALTH"
EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACK = 381
EOMModifierFunction[EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACK] = "EOM_MODIFIER_PROPERTY_ATTACK"
EOMModifierFunction.EOM_MODIFIER_PROPERTY_LAST = 382
EOMModifierFunction[EOMModifierFunction.EOM_MODIFIER_PROPERTY_LAST] = "EOM_MODIFIER_PROPERTY_LAST"
ATTRIBUTE_MAP = {health = EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH, attack = EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACK}
ATTRIBUTE_MULTIPLE_MAP = {}
EOMModifierFunctionSettleCallback = {}
EOMModifierFunctionType = {}
EOMModifierFunctionCheckValueCallback = {}
--- $health
function GetHealth(unit, params)
    return GetModifierProperty(unit, EOMModifierFunction.EOM_MODIFIER_PROPERTY_HEALTH, params)
end
--- $attack
function GetAttack(unit, params)
    return GetModifierProperty(unit, EOMModifierFunction.EOM_MODIFIER_PROPERTY_ATTACK, params)
end
