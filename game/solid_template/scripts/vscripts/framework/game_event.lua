local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 6,["5"] = 6,["7"] = 7,["8"] = 7,["16"] = 25,["17"] = 26,["18"] = 27,["19"] = 28,["20"] = 25,["24"] = 34,["25"] = 35,["26"] = 36,["27"] = 37,["28"] = 38,["29"] = 39,["32"] = 34,["39"] = 66,["40"] = 67,["41"] = 67,["42"] = 67,["43"] = 68,["44"] = 69,["46"] = 71,["47"] = 67,["48"] = 67,["49"] = 73,["50"] = 74,["51"] = 66,["55"] = 80,["56"] = 81,["57"] = 82,["58"] = 83,["59"] = 84,["62"] = 87,["63"] = 80,["69"] = 106,["70"] = 107,["71"] = 108,["72"] = 109,["74"] = 111,["77"] = 106});
if GameEventListenerIDs == nil then
    GameEventListenerIDs = {}
end
if CustomUIEventListenerIDs == nil then
    CustomUIEventListenerIDs = {}
end
--- 注册游戏事件
-- 
-- @param eventName 事件
-- @param listener 监听
-- @param context
-- @returns 返回事件注册ID
function GameEvent(eventName, listener, context)
    local iListenerID = ListenToGameEvent(eventName, listener, context)
    GameEventListenerIDs[#GameEventListenerIDs + 1] = iListenerID
    return iListenerID
end
--- 注销游戏事件
-- 
-- @param iListenerID 事件注册ID
function StopGameEvent(iListenerID)
    for i = #GameEventListenerIDs - 1, 0, -1 do
        local element = GameEventListenerIDs[i + 1]
        if element == iListenerID then
            table.remove(GameEventListenerIDs, i + 1)
            StopListeningToGameEvent(iListenerID)
        end
    end
end
--- 注册UI事件
-- 
-- @param eventName 事件
-- @param listener 监听
-- @param context
-- @returns 返回事件注册ID
function CustomUIEvent(eventName, listener, context)
    local iListenerID = CustomGameEventManager:RegisterListener(
        eventName,
        function(_, ...)
            if context ~= nil then
                return listener(context, ...)
            end
            return listener(...)
        end
    )
    CustomUIEventListenerIDs[#CustomUIEventListenerIDs + 1] = iListenerID
    return iListenerID
end
--- 注销UI事件
-- 
-- @param iListenerID 事件注册ID
function StopCustomUIEvent(iListenerID)
    for i = #CustomUIEventListenerIDs - 1, 0, -1 do
        local element = CustomUIEventListenerIDs[i + 1]
        if element == iListenerID then
            table.remove(CustomUIEventListenerIDs, i + 1)
        end
    end
    CustomGameEventManager:UnregisterListener(iListenerID)
end
--- 注册请求事件，可以从js端的请求，来获取lua的server/client端的数据
-- 
-- @param sEvent
-- @param func
-- @param context
function RequestEvent(eventName, listener, context)
    if Request ~= nil then
        if IsServer() then
            Request:RegisterServerEvent(eventName, listener, context)
        else
            Request:RegisterClientEvent(eventName, listener, context)
        end
    end
end
