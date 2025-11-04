local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ArrayForEach = ____lualib.__TS__ArrayForEach
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["11"] = 2,["12"] = 2,["13"] = 11,["14"] = 11,["15"] = 12,["16"] = 16,["17"] = 17,["18"] = 16,["19"] = 19,["20"] = 20,["21"] = 21,["22"] = 22,["23"] = 23,["25"] = 25,["27"] = 27,["28"] = 27,["29"] = 28,["30"] = 29,["31"] = 30,["33"] = 27,["37"] = 19,["38"] = 36,["39"] = 37,["40"] = 38,["41"] = 39,["42"] = 40,["43"] = 40,["44"] = 41,["45"] = 42,["46"] = 36,["47"] = 45,["48"] = 46,["49"] = 45,["50"] = 49,["51"] = 54,["52"] = 55,["54"] = 57,["56"] = 57,["57"] = 57,["58"] = 57,["59"] = 58,["62"] = 61,["63"] = 63,["65"] = 66,["67"] = 57,["68"] = 57,["70"] = 49,["71"] = 11,["72"] = 71,["73"] = 72});
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
if _G.Event == nil then
    _G.Event = __TS__New(MEvent)
end
return ____exports
