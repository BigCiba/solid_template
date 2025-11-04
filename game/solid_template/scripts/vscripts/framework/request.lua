local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 3,["13"] = 3,["14"] = 4,["15"] = 6,["16"] = 7,["17"] = 6,["18"] = 9,["19"] = 10,["20"] = 11,["21"] = 12,["22"] = 12,["23"] = 12,["24"] = 12,["25"] = 12,["26"] = 12,["27"] = 12,["28"] = 12,["29"] = 13,["30"] = 13,["31"] = 13,["32"] = 13,["33"] = 14,["34"] = 15,["35"] = 16,["36"] = 17,["37"] = 18,["38"] = 19,["39"] = 19,["40"] = 19,["41"] = 19,["42"] = 19,["45"] = 13,["46"] = 13,["47"] = 13,["49"] = 24,["50"] = 24,["51"] = 24,["52"] = 24,["53"] = 24,["54"] = 24,["55"] = 24,["56"] = 24,["58"] = 9,["59"] = 36,["60"] = 37,["61"] = 36,["62"] = 43,["63"] = 44,["64"] = 44,["65"] = 44,["66"] = 44,["67"] = 44,["68"] = 44,["69"] = 44,["70"] = 43,["71"] = 53,["72"] = 54,["73"] = 55,["76"] = 57,["77"] = 58,["80"] = 60,["81"] = 61,["84"] = 63,["85"] = 64,["86"] = 64,["87"] = 65,["88"] = 67,["89"] = 68,["90"] = 69,["91"] = 70,["93"] = 72,["95"] = 75,["96"] = 76,["97"] = 77,["98"] = 78,["99"] = 79,["100"] = 80,["101"] = 81,["102"] = 82,["103"] = 83,["104"] = 84,["105"] = 85,["106"] = 86,["107"] = 87,["108"] = 87,["109"] = 87,["110"] = 87,["111"] = 87,["112"] = 87,["113"] = 87,["114"] = 87,["115"] = 87,["116"] = 92,["119"] = 64,["120"] = 64,["121"] = 64,["122"] = 96,["123"] = 63,["124"] = 53,["125"] = 108,["126"] = 109,["127"] = 108,["128"] = 115,["129"] = 116,["130"] = 116,["131"] = 116,["132"] = 116,["133"] = 116,["134"] = 116,["135"] = 116,["136"] = 116,["137"] = 115,["138"] = 128,["139"] = 129,["140"] = 130,["143"] = 132,["144"] = 133,["147"] = 135,["148"] = 136,["149"] = 137,["150"] = 138,["152"] = 140,["154"] = 142,["155"] = 143,["156"] = 144,["158"] = 128,["159"] = 3,["160"] = 151,["161"] = 152});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MRequest = __TS__Class()
MRequest.name = "MRequest"
__TS__ClassExtends(MRequest, CModule)
function MRequest.prototype.initPriority(self)
    return 2
end
function MRequest.prototype.init(self, bReload)
    self.tEvents = {}
    if IsServer() then
        CustomUIEvent(
            nil,
            "server_request_event",
            function(self, ...)
                return self:OnServerEvent(...)
            end,
            self
        )
        CustomUIEvent(
            nil,
            "cancel_server_request_event",
            function(self, tData)
                local playerID = tData.PlayerID
                local ____ = CustomNetTables.GetTableValue
                local keys = CustomNetTables:GetAllTableKeys("request_" .. tostring(playerID))
                for ____, key in ipairs(keys) do
                    if __TS__StringStartsWith(key, tData.queueIndex) then
                        CustomNetTables:SetTableValue(
                            "request_" .. tostring(playerID),
                            key,
                            nil
                        )
                    end
                end
            end,
            self
        )
    else
        GameEvent(
            nil,
            "client_request_event",
            function(self, ...)
                return self:OnClientEvent(...)
            end,
            self
        )
    end
end
function MRequest.prototype.RegisterServerEvent(self, sEvent, func, context)
    self.tEvents[sEvent] = {callback = func, context = context}
end
function MRequest.prototype.FireServerEvent(self, sEvent, iPlayerID, data)
    self:OnServerEvent({
        event = sEvent,
        PlayerID = iPlayerID,
        data = json.encode(data),
        queueIndex = "",
        _IsFire = true
    })
end
function MRequest.prototype.OnServerEvent(self, tData)
    local hPlayer = PlayerResource:GetPlayer(tData.PlayerID or -1)
    if hPlayer == nil then
        return
    end
    local tEventTable = self.tEvents[tData.event]
    if tEventTable == nil then
        return
    end
    local data = json.decode(tData.data)
    if data == nil then
        return
    end
    coroutine.wrap(function()
        local a, b = xpcall(
            function()
                data.PlayerID = tData.PlayerID
                local result
                local func = tEventTable.callback
                if tEventTable.context ~= nil then
                    result = func(tEventTable.context, data)
                else
                    result = func(data)
                end
                if tData._IsFire ~= true and type(result) == "table" then
                    local stepAmount = 8192
                    local json_str = json.encode(result)
                    local length = #json_str
                    local maxStep = math.ceil(length / stepAmount)
                    local nowStep = 1
                    local queueIndex = tData.queueIndex
                    local s = ""
                    for i = 1, maxStep, 1 do
                        local iStart = Clamp(nil, (i - 1) * stepAmount + 1, 1, length)
                        local iEnd = Clamp(nil, i * stepAmount, 1, length)
                        s = s .. string.sub(json_str, iStart, iEnd)
                        CustomNetTables:SetTableValue(
                            "request_" .. tostring(data.PlayerID),
                            (queueIndex .. "_____") .. tostring(nowStep),
                            {
                                result = string.sub(json_str, iStart, iEnd),
                                maxStep = maxStep,
                                nowStep = nowStep
                            }
                        )
                        nowStep = nowStep + 1
                    end
                end
            end,
            debug.traceback
        )
        assert(a, b)
    end)()
end
function MRequest.prototype.RegisterClientEvent(self, sEvent, func, context)
    self.tEvents[sEvent] = {callback = func, context = context}
end
function MRequest.prototype.FireClientEvent(self, sEvent, iPlayerID, data)
    self:OnClientEvent({
        game_event_listener = -1,
        game_event_name = "",
        splitscreenplayer = GetLocalPlayerID(),
        event = sEvent,
        data = json.encode(data),
        _IsFire = true
    })
end
function MRequest.prototype.OnClientEvent(self, tData)
    local tEventTable = self.tEvents[tData.event]
    if tEventTable == nil then
        return
    end
    local data = json.decode(tData.data)
    if data == nil then
        return
    end
    local result
    local func = tEventTable.callback
    if tEventTable.context ~= nil then
        result = func(tEventTable.context, data)
    else
        result = func(data)
    end
    if tData._IsFire ~= true and type(result) == "table" then
        local json_str = json.encode(result)
        _G.ClientRequestEventResult = json_str
    end
end
MRequest = __TS__DecorateLegacy({reloadable}, MRequest)
if _G.Request == nil then
    _G.Request = __TS__New(MRequest)
end
return ____exports
