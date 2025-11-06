local ____lualib = require("lualib_bundle")
local __TS__ArraySort = ____lualib.__TS__ArraySort
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 5,["7"] = 5,["8"] = 5,["9"] = 5,["10"] = 5,["11"] = 5,["12"] = 5,["13"] = 12,["14"] = 13,["15"] = 13,["17"] = 14,["18"] = 14,["20"] = 15,["21"] = 17,["22"] = 17,["24"] = 18,["25"] = 20,["26"] = 22,["27"] = 22,["28"] = 22,["29"] = 23,["30"] = 24,["31"] = 25,["32"] = 22,["33"] = 22,["34"] = 28,["35"] = 12,["36"] = 30,["37"] = 31,["38"] = 31,["40"] = 32,["41"] = 34,["42"] = 34,["44"] = 35,["45"] = 37,["46"] = 38,["48"] = 41,["49"] = 30,["50"] = 44,["51"] = 45,["52"] = 45,["54"] = 47,["55"] = 47,["57"] = 48,["58"] = 50,["59"] = 51,["60"] = 52,["61"] = 54,["62"] = 55,["63"] = 56,["66"] = 59,["69"] = 63,["70"] = 44});
--- EOMModifier状态
EOMModifierState = EOMModifierState or ({})
EOMModifierState.NO_HEALTH_BAR = 65
EOMModifierState[EOMModifierState.NO_HEALTH_BAR] = "NO_HEALTH_BAR"
EOMModifierState.CUSTOM_HEALTH_BAR = 66
EOMModifierState[EOMModifierState.CUSTOM_HEALTH_BAR] = "CUSTOM_HEALTH_BAR"
EOMModifierState.AI_DISABLED = 67
EOMModifierState[EOMModifierState.AI_DISABLED] = "AI_DISABLED"
function RegisterModifierState(hModifier)
    if not IsValid(hModifier) then
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
    if not IsValid(hModifier) then
        return false
    end
    local parent = hModifier:GetParent()
    if parent.aStateModifers == nil then
        return false
    end
    local aStateModifers = parent.aStateModifers
    if (ArrayRemove(aStateModifers, hModifier)) ~= nil then
        return true
    end
    return false
end
function HasState(parent, iState)
    if not IsValid(parent) then
        return false
    end
    if parent.aStateModifers == nil then
        parent.aStateModifers = {}
    end
    local aStateModifers = parent.aStateModifers
    for i = #aStateModifers, 1, -1 do
        local hModifier = aStateModifers[i]
        if IsValid(hModifier) and type(hModifier.ECheckState) == "function" then
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
