local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["15"] = 4,["16"] = 6,["17"] = 8,["18"] = 10,["19"] = 12,["20"] = 14,["21"] = 3,["22"] = 15,["23"] = 16,["24"] = 16,["25"] = 16,["26"] = 16,["27"] = 16,["28"] = 16,["29"] = 16,["30"] = 17,["31"] = 18,["34"] = 15,["35"] = 22,["36"] = 23,["37"] = 22,["38"] = 26,["39"] = 27,["40"] = 26,["41"] = 34,["42"] = 35,["43"] = 36,["44"] = 37,["45"] = 38,["50"] = 34,["51"] = 49,["52"] = 50,["53"] = 51,["54"] = 52,["55"] = 53,["56"] = 54,["57"] = 55,["62"] = 51,["64"] = 62,["65"] = 63,["66"] = 64,["67"] = 65,["73"] = 49,["74"] = 77,["75"] = 78,["76"] = 79,["77"] = 79,["78"] = 80,["79"] = 81,["80"] = 82,["82"] = 79,["83"] = 79,["84"] = 79,["85"] = 85,["86"] = 77,["87"] = 93,["88"] = 94,["89"] = 95,["91"] = 96,["92"] = 97,["93"] = 97,["95"] = 98,["99"] = 100,["100"] = 93,["101"] = 102,["102"] = 103,["103"] = 104,["104"] = 105,["105"] = 104,["106"] = 107,["107"] = 102,["108"] = 110,["109"] = 111,["110"] = 110,["111"] = 114,["112"] = 115,["113"] = 116,["114"] = 117,["115"] = 114,["116"] = 119,["117"] = 120,["118"] = 119,["119"] = 126,["120"] = 127,["121"] = 128,["122"] = 134,["123"] = 135,["124"] = 126,["125"] = 137,["126"] = 138,["127"] = 137,["128"] = 141,["129"] = 142,["130"] = 145,["131"] = 146,["132"] = 147,["133"] = 148,["134"] = 149,["135"] = 150,["140"] = 156,["142"] = 159,["144"] = 162,["146"] = 165,["147"] = 166,["149"] = 141,["150"] = 3,["151"] = 174,["152"] = 174});
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
function MGame.prototype.init(self, reload)
    GameEvent(
        "game_rules_state_change",
        function(self, ...)
            return self:OnGameRulesStateChange(...)
        end,
        self
    )
    if not reload then
        if IsServer() then
        end
    end
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
                goto __continue26
            end
            return i
        end
        ::__continue26::
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
