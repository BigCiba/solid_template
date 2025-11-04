local ____lualib = require("lualib_bundle")
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 5,["7"] = 5,["8"] = 5,["9"] = 5,["10"] = 5,["11"] = 5,["12"] = 5,["13"] = 5,["14"] = 5,["15"] = 5,["16"] = 5,["17"] = 5,["18"] = 5,["19"] = 5,["20"] = 5,["21"] = 5,["22"] = 5,["23"] = 5,["24"] = 5,["25"] = 5,["26"] = 5,["27"] = 5,["28"] = 5,["29"] = 23,["30"] = 24,["31"] = 24,["33"] = 25,["34"] = 25,["36"] = 26,["37"] = 28,["38"] = 28,["40"] = 29,["41"] = 31,["42"] = 33,["43"] = 33,["44"] = 33,["45"] = 34,["46"] = 35,["47"] = 36,["48"] = 33,["49"] = 33,["50"] = 39,["51"] = 23,["52"] = 41,["53"] = 42,["54"] = 42,["56"] = 43,["57"] = 45,["58"] = 45,["60"] = 46,["61"] = 48,["62"] = 49,["64"] = 52,["65"] = 41,["66"] = 55,["67"] = 56,["68"] = 56,["70"] = 58,["71"] = 58,["73"] = 59,["74"] = 61,["75"] = 62,["76"] = 63,["77"] = 65,["78"] = 66,["79"] = 67,["82"] = 70,["85"] = 74,["86"] = 55,["91"] = 82,["92"] = 83,["93"] = 82,["98"] = 99,["99"] = 100,["100"] = 99});
--- EOMModifier状态
EOMModifierStates = EOMModifierStates or ({})
EOMModifierStates.MODIFIER_STATE_NO_HEALTH_BAR = 65
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_NO_HEALTH_BAR] = "MODIFIER_STATE_NO_HEALTH_BAR"
EOMModifierStates.MODIFIER_STATE_CUSTOM_HEALTH_BAR = 66
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_CUSTOM_HEALTH_BAR] = "MODIFIER_STATE_CUSTOM_HEALTH_BAR"
EOMModifierStates.MODIFIER_STATE_ARMOR_REDUCTION_IMMUNE = 67
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_ARMOR_REDUCTION_IMMUNE] = "MODIFIER_STATE_ARMOR_REDUCTION_IMMUNE"
EOMModifierStates.MODIFIER_STATE_NO_ATTRIBUTE = 68
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_NO_ATTRIBUTE] = "MODIFIER_STATE_NO_ATTRIBUTE"
EOMModifierStates.MODIFIER_STATE_AI_DISABLED = 69
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_AI_DISABLED] = "MODIFIER_STATE_AI_DISABLED"
EOMModifierStates.MODIFIER_STATE_DASH_DISABLE = 70
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_DASH_DISABLE] = "MODIFIER_STATE_DASH_DISABLE"
EOMModifierStates.MODIFIER_STATE_TELEPORT_DISABLE = 71
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_TELEPORT_DISABLE] = "MODIFIER_STATE_TELEPORT_DISABLE"
EOMModifierStates.MODIFIER_STATE_DAMAGE_IMMUNE = 72
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_DAMAGE_IMMUNE] = "MODIFIER_STATE_DAMAGE_IMMUNE"
EOMModifierStates.MODIFIER_STATE_BLEEDING_DEEPEN = 73
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_BLEEDING_DEEPEN] = "MODIFIER_STATE_BLEEDING_DEEPEN"
EOMModifierStates.MODIFIER_STATE_HEALTHY = 74
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_HEALTHY] = "MODIFIER_STATE_HEALTHY"
EOMModifierStates.MODIFIER_STATE_INJURED = 75
EOMModifierStates[EOMModifierStates.MODIFIER_STATE_INJURED] = "MODIFIER_STATE_INJURED"
function RegisterModifierState(hModifier)
    if not IsValid(nil, hModifier) then
        return false
    end
    if type(hModifier.ECheckState) ~= "function" then
        return false
    end
    local parent = hModifier:GetParent()
    if parent.aStateModifers == nil then
        parent.aStateModifers = {}
    end
    local aStateModifers = parent.aStateModifers
    aStateModifers[#aStateModifers + 1] = hModifier
    __TS__ArraySort(
        aStateModifers,
        function(____, a, b)
            local iPriorityA = type(a.GetPriority) == "function" and a:GetPriority() or MODIFIER_PRIORITY_NORMAL
            local iPriorityB = type(b.GetPriority) == "function" and b:GetPriority() or MODIFIER_PRIORITY_NORMAL
            return iPriorityA - iPriorityB
        end
    )
    return true
end
function UnregisterModifierState(hModifier)
    if not IsValid(nil, hModifier) then
        return false
    end
    local parent = hModifier:GetParent()
    if parent.aStateModifers == nil then
        return false
    end
    local aStateModifers = parent.aStateModifers
    if (ArrayRemove(nil, aStateModifers, hModifier)) ~= nil then
        return true
    end
    return false
end
function HasState(parent, iState)
    if not IsValid(nil, parent) then
        return false
    end
    if parent.aStateModifers == nil then
        parent.aStateModifers = {}
    end
    local aStateModifers = parent.aStateModifers
    for i = #aStateModifers, 1, -1 do
        local hModifier = aStateModifers[i]
        if IsValid(nil, hModifier) and type(hModifier.ECheckState) == "function" then
            local tFlags = hModifier.ECheckState(hModifier)
            if type(tFlags) == "table" and type(tFlags[iState]) == "boolean" then
                return tFlags[iState]
            end
        else
            table.remove(aStateModifers, i)
        end
    end
    return false
end
--- 是否没有血条
-- 
-- @param hUnit
-- @returns
function HasNoHealthBar(hUnit)
    return HasState(hUnit, EOMModifierStates.MODIFIER_STATE_NO_HEALTH_BAR)
end
--- 是否免疫减甲
-- 
-- @param hUnit
-- @returns
function HasArmorReductionImmune(hUnit)
    return HasState(hUnit, EOMModifierStates.MODIFIER_STATE_ARMOR_REDUCTION_IMMUNE)
end
