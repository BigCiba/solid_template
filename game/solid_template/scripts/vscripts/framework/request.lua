local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__StringStartsWith = ____lualib.__TS__StringStartsWith
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 3,["13"] = 3,["14"] = 4,["15"] = 6,["16"] = 7,["17"] = 6,["18"] = 9,["19"] = 10,["20"] = 11,["21"] = 12,["22"] = 12,["23"] = 12,["24"] = 12,["25"] = 12,["26"] = 12,["27"] = 12,["28"] = 13,["29"] = 13,["30"] = 13,["31"] = 14,["32"] = 15,["33"] = 16,["34"] = 17,["35"] = 18,["36"] = 19,["37"] = 19,["38"] = 19,["39"] = 19,["40"] = 19,["43"] = 13,["44"] = 13,["45"] = 13,["47"] = 24,["48"] = 24,["49"] = 24,["50"] = 24,["51"] = 24,["52"] = 24,["53"] = 24,["55"] = 9,["56"] = 36,["57"] = 37,["58"] = 36,["59"] = 43,["60"] = 44,["61"] = 44,["62"] = 44,["63"] = 44,["64"] = 44,["65"] = 44,["66"] = 44,["67"] = 43,["68"] = 53,["69"] = 54,["70"] = 55,["73"] = 57,["74"] = 58,["77"] = 60,["78"] = 61,["81"] = 63,["82"] = 64,["83"] = 64,["84"] = 65,["85"] = 67,["86"] = 68,["87"] = 69,["88"] = 70,["90"] = 72,["92"] = 75,["93"] = 76,["94"] = 77,["95"] = 78,["96"] = 79,["97"] = 80,["98"] = 81,["99"] = 82,["100"] = 83,["101"] = 84,["102"] = 85,["103"] = 86,["104"] = 87,["105"] = 87,["106"] = 87,["107"] = 87,["108"] = 87,["109"] = 87,["110"] = 87,["111"] = 87,["112"] = 87,["113"] = 92,["116"] = 64,["117"] = 64,["118"] = 64,["119"] = 96,["120"] = 63,["121"] = 53,["122"] = 108,["123"] = 109,["124"] = 108,["125"] = 115,["126"] = 116,["127"] = 116,["128"] = 116,["129"] = 116,["130"] = 116,["131"] = 116,["132"] = 116,["133"] = 116,["134"] = 115,["135"] = 128,["136"] = 129,["137"] = 130,["140"] = 132,["141"] = 133,["144"] = 135,["145"] = 136,["146"] = 137,["147"] = 138,["149"] = 140,["151"] = 142,["152"] = 143,["153"] = 144,["155"] = 128,["156"] = 3,["157"] = 151,["158"] = 151});
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
            "server_request_event",
            function(self, ...)
                return self:OnServerEvent(...)
            end,
            self
        )
        CustomUIEvent(
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
                        local iStart = Clamp((i - 1) * stepAmount + 1, 1, length)
                        local iEnd = Clamp(i * stepAmount, 1, length)
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
if Request == nil then
    Request = __TS__New(MRequest)
end
return ____exports
