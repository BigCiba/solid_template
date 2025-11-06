local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 16,["13"] = 16,["14"] = 17,["15"] = 21,["16"] = 22,["17"] = 21,["18"] = 25,["19"] = 26,["20"] = 27,["21"] = 28,["23"] = 31,["25"] = 25,["26"] = 38,["27"] = 39,["29"] = 40,["30"] = 40,["31"] = 41,["32"] = 42,["34"] = 42,["36"] = 42,["37"] = 43,["39"] = 40,["42"] = 48,["43"] = 49,["46"] = 38,["47"] = 58,["48"] = 63,["49"] = 63,["50"] = 63,["52"] = 65,["53"] = 65,["54"] = 65,["55"] = 65,["56"] = 66,["57"] = 72,["58"] = 72,["59"] = 73,["60"] = 58,["61"] = 79,["62"] = 81,["64"] = 82,["65"] = 82,["66"] = 83,["67"] = 84,["68"] = 87,["69"] = 88,["71"] = 91,["73"] = 82,["77"] = 96,["78"] = 79,["79"] = 102,["80"] = 106,["81"] = 107,["84"] = 112,["86"] = 114,["87"] = 114,["89"] = 115,["90"] = 118,["91"] = 119,["92"] = 120,["94"] = 124,["95"] = 131,["96"] = 132,["100"] = 114,["103"] = 147,["104"] = 148,["106"] = 151,["107"] = 102,["108"] = 16,["109"] = 155,["110"] = 155});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MEvent = __TS__Class()
MEvent.name = "MEvent"
__TS__ClassExtends(MEvent, CModule)
function MEvent.prototype.initPriority(self)
    return 9
end
function MEvent.prototype.init(self, reload)
    if not reload then
        self.eventId = 1
        self.eventIdMap = {}
    else
        self:cleanupModuleListeners()
    end
end
function MEvent.prototype.cleanupModuleListeners(self)
    for eventType, listeners in pairs(self.eventIdMap) do
        do
            local i = #listeners - 1
            while i >= 0 do
                local listener = listeners[i + 1]
                local ____opt_0 = listener.context
                if ____opt_0 ~= nil then
                    ____opt_0 = ____opt_0.isModule
                end
                if ____opt_0 == true then
                    table.remove(listeners, i + 1)
                end
                i = i - 1
            end
        end
        if #listeners == 0 then
            __TS__Delete(self.eventIdMap, eventType)
        end
    end
end
function MEvent.prototype.Register(self, eventType, callback, context)
    local ____self_eventIdMap_2, ____eventType_3 = self.eventIdMap, eventType
    if ____self_eventIdMap_2[____eventType_3] == nil then
        ____self_eventIdMap_2[____eventType_3] = {}
    end
    local ____self_4, ____eventId_5 = self, "eventId"
    local ____self_eventId_6 = ____self_4[____eventId_5]
    ____self_4[____eventId_5] = ____self_eventId_6 + 1
    local eventID = ____self_eventId_6
    local listener = {context = context, eventID = eventID, callback = callback}
    local ____self_eventIdMap_eventType_7 = self.eventIdMap[eventType]
    ____self_eventIdMap_eventType_7[#____self_eventIdMap_eventType_7 + 1] = listener
    return eventID
end
function MEvent.prototype.Unregister(self, eventId)
    for eventType, listeners in pairs(self.eventIdMap) do
        do
            local i = #listeners - 1
            while i >= 0 do
                if listeners[i + 1].eventID == eventId then
                    table.remove(listeners, i + 1)
                    if #listeners == 0 then
                        __TS__Delete(self.eventIdMap, eventType)
                    end
                    return true
                end
                i = i - 1
            end
        end
    end
    return false
end
function MEvent.prototype.Fire(self, eventType, data)
    local listeners = self.eventIdMap[eventType]
    if not listeners or #listeners == 0 then
        return
    end
    local errors = {}
    do
        local i = #listeners - 1
        while i >= 0 do
            do
                local listener = listeners[i + 1]
                if not listener or not listener.callback then
                    table.remove(listeners, i + 1)
                    goto __continue22
                end
                local success, errorMsg = xpcall(listener.callback, debug.traceback, listener.context, data)
                if not success then
                    errors[#errors + 1] = {eventID = listener.eventID, error = errorMsg}
                end
            end
            ::__continue22::
            i = i - 1
        end
    end
    if #listeners == 0 then
        __TS__Delete(self.eventIdMap, eventType)
    end
    return errors
end
MEvent = __TS__DecorateLegacy({reloadable}, MEvent)
if Event == nil then
    Event = __TS__New(MEvent)
end
return ____exports
