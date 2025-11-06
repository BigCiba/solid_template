local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["15"] = 4,["16"] = 6,["17"] = 8,["18"] = 10,["19"] = 12,["20"] = 14,["21"] = 3,["22"] = 15,["23"] = 16,["24"] = 16,["25"] = 16,["26"] = 16,["27"] = 16,["28"] = 16,["29"] = 16,["30"] = 15,["31"] = 18,["32"] = 19,["33"] = 18,["34"] = 22,["35"] = 23,["36"] = 22,["37"] = 30,["38"] = 31,["39"] = 32,["40"] = 33,["41"] = 34,["46"] = 30,["47"] = 45,["48"] = 46,["49"] = 47,["50"] = 48,["51"] = 49,["52"] = 50,["53"] = 51,["58"] = 47,["60"] = 58,["61"] = 59,["62"] = 60,["63"] = 61,["69"] = 45,["70"] = 73,["71"] = 74,["72"] = 75,["73"] = 75,["74"] = 76,["75"] = 77,["76"] = 78,["78"] = 75,["79"] = 75,["80"] = 75,["81"] = 81,["82"] = 73,["83"] = 89,["84"] = 90,["85"] = 91,["87"] = 92,["88"] = 93,["89"] = 93,["91"] = 94,["95"] = 96,["96"] = 89,["97"] = 98,["98"] = 99,["99"] = 100,["100"] = 101,["101"] = 100,["102"] = 103,["103"] = 98,["104"] = 106,["105"] = 107,["106"] = 106,["107"] = 110,["108"] = 111,["109"] = 112,["110"] = 113,["111"] = 110,["112"] = 115,["113"] = 116,["114"] = 115,["115"] = 122,["116"] = 123,["117"] = 124,["118"] = 130,["119"] = 131,["120"] = 122,["121"] = 133,["122"] = 134,["123"] = 133,["124"] = 137,["125"] = 138,["126"] = 141,["127"] = 142,["128"] = 143,["129"] = 144,["130"] = 145,["131"] = 146,["136"] = 152,["138"] = 155,["140"] = 158,["142"] = 161,["143"] = 162,["145"] = 137,["146"] = 3,["147"] = 170,["148"] = 170});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local MGame = __TS__Class()
MGame.name = "MGame"
__TS__ClassExtends(MGame, CModule)
function MGame.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self._isPause = false
    self._difficulty = 1
    self._maxDifficulty = 1
    self._playerCount = 1
    self._gameSuccess = false
end
function MGame.prototype.init(self, bReload)
    GameEvent(
        "game_rules_state_change",
        function(self, ...)
            return self:OnGameRulesStateChange(...)
        end,
        self
    )
end
function MGame.prototype.GetDifficulty(self)
    return self._difficulty
end
function MGame.prototype.GetMaxDifficulty(self)
    return self._maxDifficulty
end
function MGame.prototype.EachTeamsWithPlayer(self, funcCallBack)
    for iTeamNumber = DOTA_TEAM_FIRST, DOTA_TEAM_CUSTOM_7, 1 do
        local iPlayerCount = PlayerResource:GetPlayerCountForTeam(iTeamNumber)
        if iPlayerCount > 0 then
            if funcCallBack(nil, iTeamNumber) == true then
                break
            end
        end
    end
end
function MGame.prototype.EachPlayer(self, funcCallBack, iTeamNumber)
    if iTeamNumber == nil then
        self:EachTeamsWithPlayer(function(self, _iTeamNumber)
            for n = 1, PlayerResource:GetPlayerCountForTeam(_iTeamNumber), 1 do
                local iPlayerID = PlayerResource:GetNthPlayerIDOnTeam(_iTeamNumber, n)
                if PlayerResource:IsValidPlayerID(iPlayerID) then
                    if funcCallBack(nil, iPlayerID, _iTeamNumber, n) == true then
                        break
                    end
                end
            end
        end)
    else
        for n = 1, PlayerResource:GetPlayerCountForTeam(iTeamNumber), 1 do
            local iPlayerID = PlayerResource:GetNthPlayerIDOnTeam(iTeamNumber, n)
            if PlayerResource:IsValidPlayerID(iPlayerID) then
                if funcCallBack(nil, iPlayerID, iTeamNumber, n) == true then
                    break
                end
            end
        end
    end
end
function MGame.prototype.GetValidPlayerCount(self, iTeamNumber)
    local n = 0
    self:EachPlayer(
        function(____, iPlayerID)
            local hHero = PlayerResource:GetSelectedHeroEntity(iPlayerID)
            if IsValid(hHero) then
                n = n + 1
            end
        end,
        iTeamNumber
    )
    return n
end
function MGame.prototype.GetPlayerTeamSlot(self, playerID)
    local team = PlayerResource:GetTeam(playerID)
    for i = 1, PlayerResource:GetPlayerCountForTeam(team), 1 do
        do
            local slotPlayerID = PlayerResource:GetNthPlayerIDOnTeam(team, i)
            if slotPlayerID ~= playerID then
                goto __continue24
            end
            return i
        end
        ::__continue24::
    end
    return 0
end
function MGame.prototype.GetPlayerCount(self)
    local n = 0
    self:EachPlayer(function(____, iPlayerID)
        n = n + 1
    end)
    return n
end
function MGame.prototype.IsPause(self)
    return self._isPause
end
function MGame.prototype.Pause(self, bFlag)
    self._isPause = bFlag
    PauseGame(self._isPause)
    self:UpdateCustomPause()
end
function MGame.prototype.UpdateCustomPause(self)
    CustomNetTables:SetTableValue("common", "custom_pause", {pause = self._isPause})
end
function MGame.prototype.SetGameResult(self, success)
    self._gameSuccess = success
    local t = CustomNetTables:GetNetData("common", "values") or ({difficulty = 1, player_count = 1, boss_round = 0, is_attacking = 0})
    t.game_success = success
    CustomNetTables:SetNetData("common", "values", t)
end
function MGame.prototype.GetGameResult(self)
    return self._gameSuccess
end
function MGame.prototype.OnGameRulesStateChange(self, events)
    local state = GameRules:State_Get()
    if state == DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP then
        if not IsInToolsMode() then
            if not IsDedicatedServer() or GameRules:IsCheatMode() then
                local bb = 1
                while true do
                    bb = bb + 1
                end
            end
        end
    end
    if state == DOTA_GAMERULES_STATE_HERO_SELECTION then
    end
    if state == DOTA_GAMERULES_STATE_STRATEGY_TIME then
    end
    if state == DOTA_GAMERULES_STATE_PRE_GAME then
    end
    if state == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
        GameRules:SetTimeOfDay(0.26)
    end
end
MGame = __TS__DecorateLegacy({reloadable}, MGame)
if Game == nil then
    Game = __TS__New(MGame)
end
return ____exports
