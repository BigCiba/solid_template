local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 1,["6"] = 2,["7"] = 2,["8"] = 2,["9"] = 3,["10"] = 2,["11"] = 2,["12"] = 5,["13"] = 5,["14"] = 5,["15"] = 6,["16"] = 5,["17"] = 5,["18"] = 8,["19"] = 9,["20"] = 11,["21"] = 12,["23"] = 15,["24"] = 19,["25"] = 20,["26"] = 21,["27"] = 22,["28"] = 24,["32"] = 29,["33"] = 29,["34"] = 29,["36"] = 30,["37"] = 31,["38"] = 32,["39"] = 33,["40"] = 34,["42"] = 36,["45"] = 39,["46"] = 29,["47"] = 42});
if Activated then
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
