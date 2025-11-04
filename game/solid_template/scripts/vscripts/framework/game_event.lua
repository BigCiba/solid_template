local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 4,["5"] = 4,["7"] = 5,["8"] = 5,["16"] = 23,["17"] = 24,["18"] = 25,["19"] = 26,["20"] = 23,["24"] = 32,["25"] = 33,["26"] = 34,["27"] = 35,["28"] = 36,["29"] = 37,["32"] = 32,["39"] = 64,["40"] = 65,["41"] = 65,["42"] = 65,["43"] = 66,["44"] = 67,["46"] = 69,["47"] = 65,["48"] = 65,["49"] = 71,["50"] = 72,["51"] = 64,["55"] = 78,["56"] = 79,["57"] = 80,["58"] = 81,["59"] = 82,["62"] = 85,["63"] = 78,["69"] = 104,["70"] = 105,["71"] = 106,["72"] = 107,["74"] = 109,["77"] = 104});
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
function GameEvent(self, eventName, listener, context)
    local iListenerID = ListenToGameEvent(eventName, listener, context)
    GameEventListenerIDs[#GameEventListenerIDs + 1] = iListenerID
    return iListenerID
end
--- 注销游戏事件
-- 
-- @param iListenerID 事件注册ID
function StopGameEvent(self, iListenerID)
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
function CustomUIEvent(self, eventName, listener, context)
    local iListenerID = CustomGameEventManager:RegisterListener(
        eventName,
        function(_, ...)
            if context ~= nil then
                return listener(nil, context, ...)
            end
            return listener(nil, ...)
        end
    )
    CustomUIEventListenerIDs[#CustomUIEventListenerIDs + 1] = iListenerID
    return iListenerID
end
--- 注销UI事件
-- 
-- @param iListenerID 事件注册ID
function StopCustomUIEvent(self, iListenerID)
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
function RequestEvent(self, eventName, listener, context)
    if Request ~= nil then
        if IsServer() then
            Request:RegisterServerEvent(eventName, listener, context)
        else
            Request:RegisterClientEvent(eventName, listener, context)
        end
    end
end
