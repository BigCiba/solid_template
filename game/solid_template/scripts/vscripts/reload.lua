local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 6,["6"] = 7,["7"] = 7,["8"] = 7,["9"] = 8,["10"] = 7,["11"] = 7,["12"] = 10,["13"] = 10,["14"] = 10,["15"] = 11,["16"] = 10,["17"] = 10,["18"] = 13,["19"] = 14,["20"] = 16,["21"] = 17,["23"] = 20,["24"] = 24,["25"] = 25,["26"] = 26,["27"] = 27,["28"] = 29,["32"] = 33,["34"] = 36,["35"] = 36,["36"] = 36,["38"] = 37,["39"] = 38,["40"] = 39,["41"] = 40,["42"] = 41,["44"] = 43,["47"] = 46,["48"] = 36,["49"] = 49});
if GameModeActivated then
    __TS__ArrayForEach(
        GameEventListenerIDs,
        function(____, a)
            StopListeningToGameEvent(a)
        end
    )
    __TS__ArrayForEach(
        CustomUIEventListenerIDs,
        function(____, a)
            CustomGameEventManager:UnregisterListener(a)
        end
    )
    _G.GameEventListenerIDs = {}
    _G.CustomUIEventListenerIDs = {}
    if IsServer() then
        _G.TimerEventListenerIDs = {}
    end
    collectgarbage("collect")
    if IsServer() then
        if GameRules:State_Get() > DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD then
            GameRules:Playtesting_UpdateAddOnKeyValues()
            FireGameEvent("client_reload_game_keyvalues", {})
            print("Reload Scripts")
        end
    end
else
    GameModeActivated = true
end
function table_size(self, t, tRecord)
    if tRecord == nil then
        tRecord = {}
    end
    local n = 0
    tRecord[t] = true
    for k, v in pairs(t) do
        if tRecord[v] ~= true and type(v) == "table" then
            n = n + table_size(nil, v, tRecord)
        else
            n = n + 1
        end
    end
    return n
end
print((("[" .. (IsServer() and "server" or "client")) .. " global size]: ") .. tostring(table_size(nil, _G)))
