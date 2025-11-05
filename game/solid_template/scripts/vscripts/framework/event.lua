local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 2,["12"] = 2,["13"] = 10,["14"] = 10,["15"] = 11,["16"] = 15,["17"] = 16,["18"] = 15,["19"] = 18,["20"] = 19,["21"] = 20,["22"] = 21,["23"] = 22,["25"] = 24,["27"] = 26,["28"] = 26,["29"] = 27,["30"] = 28,["31"] = 29,["33"] = 26,["37"] = 18,["38"] = 35,["39"] = 36,["40"] = 37,["41"] = 38,["42"] = 39,["43"] = 39,["44"] = 40,["45"] = 41,["46"] = 35,["47"] = 44,["48"] = 45,["49"] = 44,["50"] = 48,["51"] = 53,["52"] = 54,["54"] = 56,["56"] = 56,["57"] = 56,["58"] = 56,["59"] = 57,["62"] = 60,["63"] = 62,["65"] = 65,["67"] = 56,["68"] = 56,["70"] = 48,["71"] = 10,["72"] = 70,["73"] = 70});
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
        self.eventList = {}
        self.eventIdMap = {}
    end
    for eventType, _ in pairs(self.eventIdMap) do
        do
            local i = #self.eventIdMap[eventType] - 1
            while i >= 0 do
                local eventData = self.eventIdMap[eventType][i + 1]
                if eventData.context ~= nil and eventData.context.isModule ~= nil then
                    table.remove(self.eventIdMap[eventType], i + 1)
                end
                i = i - 1
            end
        end
    end
end
function MEvent.prototype.Register(self, eventType, callback, context)
    self.eventIdMap[eventType] = self.eventIdMap[eventType] or ({})
    local eventID = self.eventId
    self.eventList[eventID] = callback
    local ____self_eventIdMap_eventType_0 = self.eventIdMap[eventType]
    ____self_eventIdMap_eventType_0[#____self_eventIdMap_eventType_0 + 1] = {context = context, eventID = eventID}
    self.eventId = self.eventId + 1
    return eventID
end
function MEvent.prototype.Unregister(self, eventId)
    __TS__Delete(self.eventList, eventId)
end
function MEvent.prototype.Fire(self, eventType, data, modifierEventData)
    if modifierEventData ~= nil then
        FireModifierEvent(modifierEventData.modifierEvent, data, modifierEventData.source, modifierEventData.target)
    end
    local ____opt_1 = self.eventIdMap[eventType]
    if ____opt_1 ~= nil then
        __TS__ArrayForEach(
            self.eventIdMap[eventType],
            function(____, eventData)
                if self.eventList[eventData.eventID] == nil then
                    return
                end
                if eventData.context ~= nil then
                    xpcall(self.eventList[eventData.eventID], debug.traceback, eventData.context, data)
                else
                    xpcall(self.eventList[eventData.eventID], debug.traceback, nil, data)
                end
            end
        )
    end
end
MEvent = __TS__DecorateLegacy({reloadable}, MEvent)
if Event == nil then
    Event = __TS__New(MEvent)
end
return ____exports
