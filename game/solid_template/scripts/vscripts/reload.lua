local ____lualib = require("lualib_bundle")
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 6,["6"] = 7,["7"] = 7,["8"] = 7,["9"] = 8,["10"] = 7,["11"] = 7,["12"] = 10,["13"] = 10,["14"] = 10,["15"] = 11,["16"] = 10,["17"] = 10,["18"] = 13,["19"] = 14,["20"] = 16,["21"] = 17,["23"] = 20,["24"] = 22,["25"] = 24,["26"] = 25,["29"] = 28});
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
    CModule:reload()
    if IsServer() then
        print("Reload completed. Server time: " .. tostring(GameRules:GetGameTime()))
    end
else
    GameModeActivated = true
end
