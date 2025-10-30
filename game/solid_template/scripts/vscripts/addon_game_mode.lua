local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 3,["6"] = 4,["7"] = 5,["8"] = 7,["9"] = 9,["10"] = 10,["11"] = 11,["12"] = 9,["13"] = 14,["14"] = 15,["15"] = 16,["16"] = 17,["17"] = 18,["18"] = 19,["19"] = 20,["22"] = 23,["23"] = 23,["24"] = 23,["25"] = 24,["26"] = 23,["27"] = 23,["30"] = 29,["31"] = 30,["32"] = 31,["33"] = 32,["36"] = 14,["37"] = 49,["38"] = 49,["39"] = 52});
SendToServerConsole("dota_combine_models 0")
Convars:SetBool("dota_combine_models", false)
SendToServerConsole("dota_max_physical_items_purchase_limit 99999")
require("requires")
function Activate()
    print("=== Activate ===")
    CModule:initialize()
end
function Precache(context)
    local precacheAutoList = require("precache_auto")
    for sPrecacheMode in pairs(precacheAutoList) do
        local aList = precacheAutoList[sPrecacheMode]
        if sPrecacheMode == "particle_tool" and IsInToolsMode() then
            for _, sResource in ipairs(aList) do
                PrecacheResource("particle", sResource, context)
            end
        else
            __TS__ArrayForEach(
                aList,
                function(____, sResource)
                    PrecacheResource(sPrecacheMode, sResource, context)
                end
            )
        end
    end
    local precacheList = require("precache")
    for sPrecacheMode, list in pairs(precacheList) do
        for _, sResource in ipairs(list) do
            PrecacheResource(sPrecacheMode, sResource, context)
        end
    end
end
function SpawnGroupPrecache(hSpawnGroup, context)
end
require("reload")
