local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__Delete = ____lualib.__TS__Delete
local __TS__ObjectKeys = ____lualib.__TS__ObjectKeys
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 19,["13"] = 19,["14"] = 20,["15"] = 24,["16"] = 25,["17"] = 24,["18"] = 28,["19"] = 29,["20"] = 30,["21"] = 31,["23"] = 34,["25"] = 28,["26"] = 41,["27"] = 42,["29"] = 43,["30"] = 43,["31"] = 44,["32"] = 45,["34"] = 45,["36"] = 45,["37"] = 46,["39"] = 43,["42"] = 51,["43"] = 52,["46"] = 41,["47"] = 61,["48"] = 66,["49"] = 66,["50"] = 66,["52"] = 68,["53"] = 68,["54"] = 68,["55"] = 68,["56"] = 69,["57"] = 75,["58"] = 75,["59"] = 76,["60"] = 61,["61"] = 83,["62"] = 86,["63"] = 86,["65"] = 89,["66"] = 89,["67"] = 89,["69"] = 91,["70"] = 91,["71"] = 91,["72"] = 91,["73"] = 92,["74"] = 99,["75"] = 102,["77"] = 103,["78"] = 103,["79"] = 104,["80"] = 105,["81"] = 106,["84"] = 103,["87"] = 111,["88"] = 112,["89"] = 83,["90"] = 118,["91"] = 120,["93"] = 121,["94"] = 121,["95"] = 122,["96"] = 123,["97"] = 126,["98"] = 127,["100"] = 130,["102"] = 121,["106"] = 135,["107"] = 118,["108"] = 141,["109"] = 142,["110"] = 144,["112"] = 145,["113"] = 145,["114"] = 146,["115"] = 147,["116"] = 148,["118"] = 145,["121"] = 152,["122"] = 153,["125"] = 157,["126"] = 141,["127"] = 163,["128"] = 164,["129"] = 165,["130"] = 165,["132"] = 167,["133"] = 168,["134"] = 169,["135"] = 163,["136"] = 175,["137"] = 176,["138"] = 177,["139"] = 175,["140"] = 183,["141"] = 184,["142"] = 185,["143"] = 185,["145"] = 189,["146"] = 190,["147"] = 191,["149"] = 193,["150"] = 183,["151"] = 199,["152"] = 203,["153"] = 204,["156"] = 209,["158"] = 211,["159"] = 211,["161"] = 212,["162"] = 215,["163"] = 216,["164"] = 217,["166"] = 221,["167"] = 228,["168"] = 229,["169"] = 234,["173"] = 211,["176"] = 239,["177"] = 240,["179"] = 243,["180"] = 199,["181"] = 249,["182"] = 254,["183"] = 256,["184"] = 257,["185"] = 258,["186"] = 256,["187"] = 261,["188"] = 262,["189"] = 249,["190"] = 269,["191"] = 275,["192"] = 276,["193"] = 277,["195"] = 275,["196"] = 281,["197"] = 269,["198"] = 287,["199"] = 288,["202"] = 290,["203"] = 291,["204"] = 292,["205"] = 293,["206"] = 294,["207"] = 296,["208"] = 297,["209"] = 299,["210"] = 300,["212"] = 300,["216"] = 300,["218"] = 300,["219"] = 300,["220"] = 301,["222"] = 301,["224"] = 301,["226"] = 300,["227"] = 302,["228"] = 304,["230"] = 306,["232"] = 309,["233"] = 287,["234"] = 315,["235"] = 316,["236"] = 317,["237"] = 319,["238"] = 320,["239"] = 321,["241"] = 324,["242"] = 315,["243"] = 19});
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
function MEvent.prototype.RegisterWithPriority(self, eventType, callback, priority, context)
    if priority == nil then
        priority = 100
    end
    local ____self_eventIdMap_8, ____eventType_9 = self.eventIdMap, eventType
    if ____self_eventIdMap_8[____eventType_9] == nil then
        ____self_eventIdMap_8[____eventType_9] = {}
    end
    local ____self_10, ____eventId_11 = self, "eventId"
    local ____self_eventId_12 = ____self_10[____eventId_11]
    ____self_10[____eventId_11] = ____self_eventId_12 + 1
    local eventID = ____self_eventId_12
    local listener = {context = context, eventID = eventID, callback = callback, priority = priority}
    local listeners = self.eventIdMap[eventType]
    local insertIndex = #listeners
    do
        local i = 0
        while i < #listeners do
            local currentPriority = listeners[i + 1].priority or 100
            if priority < currentPriority then
                insertIndex = i
                break
            end
            i = i + 1
        end
    end
    table.insert(listeners, insertIndex + 1, listener)
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
function MEvent.prototype.UnregisterContext(self, context)
    local count = 0
    for eventType, listeners in pairs(self.eventIdMap) do
        do
            local i = #listeners - 1
            while i >= 0 do
                if listeners[i + 1].context == context then
                    table.remove(listeners, i + 1)
                    count = count + 1
                end
                i = i - 1
            end
        end
        if #listeners == 0 then
            __TS__Delete(self.eventIdMap, eventType)
        end
    end
    return count
end
function MEvent.prototype.UnregisterAll(self, eventType)
    local listeners = self.eventIdMap[eventType]
    if not listeners then
        return 0
    end
    local count = #listeners
    __TS__Delete(self.eventIdMap, eventType)
    return count
end
function MEvent.prototype.HasListeners(self, eventType)
    local listeners = self.eventIdMap[eventType]
    return listeners ~= nil and #listeners > 0
end
function MEvent.prototype.GetListenerCount(self, eventType)
    if eventType ~= nil then
        local ____opt_13 = self.eventIdMap[eventType]
        return ____opt_13 and #____opt_13 or 0
    end
    local total = 0
    for _, listeners in pairs(self.eventIdMap) do
        total = total + #listeners
    end
    return total
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
                    goto __continue38
                end
                local success, errorMsg = xpcall(listener.callback, debug.traceback, listener.context, data)
                if not success then
                    errors[#errors + 1] = {eventID = listener.eventID, error = errorMsg}
                    Warning((((("Event listener error:\nType: " .. eventType) .. "\nID: ") .. tostring(listener.eventID)) .. "\nError: ") .. tostring(errorMsg))
                end
            end
            ::__continue38::
            i = i - 1
        end
    end
    if #listeners == 0 then
        __TS__Delete(self.eventIdMap, eventType)
    end
    return errors
end
function MEvent.prototype.Once(self, eventType, callback, context)
    local eventID
    local function wrappedCallback(____, data)
        callback(context, data)
        self:Unregister(eventID)
    end
    eventID = self:Register(eventType, wrappedCallback, context)
    return eventID
end
function MEvent.prototype.RegisterFiltered(self, eventType, filter, callback, context)
    local function wrappedCallback(____, data)
        if filter(nil, data) then
            callback(context, data)
        end
    end
    return self:Register(eventType, wrappedCallback, context)
end
function MEvent.prototype.DebugPrint(self)
    if IsDedicatedServer() then
        return
    end
    print("=== Event System Debug ===")
    print("Total event types: " .. tostring(#__TS__ObjectKeys(self.eventIdMap)))
    print("Total listeners: " .. tostring(self:GetListenerCount()))
    print("Next event ID: " .. tostring(self.eventId))
    print("")
    for eventType, listeners in pairs(self.eventIdMap) do
        print(((("[" .. eventType) .. "] (") .. tostring(#listeners)) .. " listeners)")
        for ____, listener in ipairs(listeners) do
            local ____opt_17 = listener.context
            if ____opt_17 ~= nil then
                ____opt_17 = ____opt_17.constructor
            end
            local ____opt_result_19
            if ____opt_17 ~= nil then
                ____opt_result_19 = ____opt_17.name
            end
            local ____opt_result_19_22 = ____opt_result_19
            if ____opt_result_19_22 == nil then
                local ____opt_20 = listener.context
                if ____opt_20 ~= nil then
                    ____opt_20 = ____opt_20.isModule
                end
                ____opt_result_19_22 = ____opt_20 and "Module" or "Global"
            end
            local contextName = ____opt_result_19_22
            local priority = listener.priority or 100
            print((((("  - ID:" .. tostring(listener.eventID)) .. " Priority:") .. tostring(priority)) .. " Context:") .. tostring(contextName))
        end
        print("")
    end
    print("========================")
end
function MEvent.prototype.GetMemoryStats(self)
    local totalListeners = 0
    local totalEventTypes = 0
    for _, listeners in pairs(self.eventIdMap) do
        totalEventTypes = totalEventTypes + 1
        totalListeners = totalListeners + #listeners
    end
    return {eventTypes = totalEventTypes, listeners = totalListeners, avgListenersPerType = totalEventTypes > 0 and totalListeners / totalEventTypes or 0}
end
MEvent = __TS__DecorateLegacy({reloadable}, MEvent)
return ____exports
