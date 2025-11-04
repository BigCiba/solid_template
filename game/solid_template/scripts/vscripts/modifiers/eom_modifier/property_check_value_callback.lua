local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["6"] = 4,["7"] = 5,["8"] = 6,["10"] = 4,["11"] = 10,["12"] = 11,["13"] = 12,["14"] = 13,["16"] = 10,["17"] = 17,["18"] = 18,["19"] = 19,["21"] = 17,["22"] = 23,["23"] = 24,["24"] = 25,["26"] = 27,["27"] = 28,["28"] = 29,["29"] = 30,["33"] = 34,["34"] = 23});
---
-- @noSelfInFile
function PCVC_DamageAdjust(value, tParams)
    if type(value) == "number" and type(tParams) == "table" and type(tParams.damage) == "number" then
        tParams.damage = tParams.damage + value
    end
end
function PCVC_DamageBarrier(value, tParams)
    if type(value) == "number" and type(tParams) == "table" and type(tParams.damage) == "number" then
        tParams.damage = tParams.damage - math.abs(value)
        return -math.abs(value)
    end
end
function PCVC_NonLethal(value, tParams)
    if type(value) == "number" and value > 0 and type(tParams) == "table" and type(tParams.damage_flags) == "number" then
        tParams.damage_flags = bit.bor(tParams.damage_flags, DOTA_DAMAGE_FLAG_NON_LETHAL)
    end
end
function PCVC_StaticLoot(value, tParams)
    if type(value) == "string" and value ~= "" and type(tParams) == "table" and type(tParams.loots) == "table" then
        table.insert(tParams.loots, value)
    end
    if type(value) == "table" and type(tParams) == "table" and type(tParams.loots) == "table" then
        for _, v in ipairs(value) do
            if type(v) == "string" and v ~= "" then
                table.insert(tParams.loots, v)
            end
        end
    end
    return 0
end
