local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 2,["10"] = 2,["11"] = 12,["12"] = 12,["13"] = 13,["15"] = 13,["16"] = 15,["17"] = 12,["18"] = 16,["19"] = 17,["20"] = 18,["21"] = 19,["23"] = 22,["24"] = 22,["25"] = 22,["26"] = 22,["27"] = 22,["28"] = 22,["29"] = 22,["30"] = 25,["31"] = 25,["32"] = 25,["33"] = 26,["34"] = 27,["35"] = 28,["36"] = 29,["37"] = 30,["38"] = 31,["39"] = 32,["40"] = 38,["41"] = 39,["42"] = 40,["45"] = 43,["47"] = 25,["48"] = 25,["49"] = 25,["50"] = 16,["51"] = 49,["52"] = 50,["53"] = 51,["54"] = 52,["55"] = 53,["56"] = 53,["57"] = 53,["58"] = 53,["59"] = 53,["60"] = 53,["61"] = 53,["62"] = 53,["63"] = 54,["64"] = 55,["65"] = 56,["66"] = 56,["67"] = 56,["68"] = 56,["69"] = 55,["70"] = 49,["71"] = 60,["72"] = 60,["73"] = 82,["74"] = 83,["75"] = 86,["76"] = 82,["77"] = 88,["78"] = 89,["81"] = 92,["82"] = 93,["83"] = 94,["84"] = 96,["85"] = 97,["86"] = 98,["88"] = 99,["89"] = 99,["90"] = 100,["91"] = 101,["92"] = 102,["94"] = 104,["96"] = 99,["99"] = 108,["100"] = 109,["102"] = 111,["103"] = 112,["105"] = 114,["106"] = 115,["108"] = 88,["109"] = 121,["110"] = 122,["111"] = 121,["112"] = 124,["113"] = 125,["114"] = 124,["115"] = 130,["116"] = 131,["117"] = 132,["118"] = 133,["119"] = 134,["120"] = 135,["122"] = 136,["123"] = 136,["124"] = 137,["125"] = 138,["126"] = 139,["127"] = 140,["129"] = 136,["133"] = 143,["134"] = 143,["135"] = 144,["136"] = 145,["137"] = 146,["138"] = 147,["140"] = 143,["143"] = 150,["144"] = 151,["146"] = 130,["147"] = 156,["148"] = 157,["149"] = 158,["150"] = 159,["151"] = 156,["152"] = 162,["153"] = 163,["154"] = 164,["155"] = 165,["157"] = 162,["158"] = 177,["159"] = 178,["160"] = 177,["161"] = 181,["162"] = 182,["163"] = 183,["164"] = 181,["165"] = 186,["166"] = 187,["167"] = 188,["168"] = 186,["169"] = 190,["170"] = 191,["171"] = 190,["172"] = 12,["173"] = 199,["174"] = 199});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local CDemo = __TS__Class()
CDemo.name = "CDemo"
__TS__ClassExtends(CDemo, CModule)
function CDemo.prototype.____constructor(self, ...)
    CModule.prototype.____constructor(self, ...)
    self.free_spells = false
end
function CDemo.prototype.init(self, bReload)
    if not bReload then
        SendToServerConsole("sv_cheats 1")
        SendToServerConsole("dota_ability_debug 0")
    end
    GameEvent(
        "player_chat",
        function(self, ...)
            return self:OnPlayerChat(...)
        end,
        self
    )
    CustomUIEvent(
        "DemoEvent",
        function(self, data)
            local eventName = data.event_name
            local playerID = data.player_id or -1
            local unit = EntIndexToHScript(data.unit or -1)
            local position = data.position ~= nil and Vector(data.position["0"], data.position["1"], data.position["2"]) or vec3_invalid
            local str = data.str
            if type(eventName) == "string" and type(self[eventName]) == "function" then
                local params = {playerID = playerID, unit = unit, position = position, str = str}
                for k, v in pairs(data) do
                    if k ~= "event_name" and k ~= "player_id" and k ~= "unit" and k ~= "position" and k ~= "str" then
                        params[k] = v
                    end
                end
                self[eventName](self, params)
            end
        end,
        self
    )
end
function CDemo.prototype.saveConfig(self, iPlayerID, config)
    local handle = CreateHTTPRequestScriptVM("POST", "http://150.158.155.234:8001/v1/other/save-custom-gameconfig")
    handle:SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8")
    handle:SetHTTPRequestHeaderValue("Authorization", "28EF96C3DAE7B3743D8854C57099BF38DEF9539F")
    handle:SetHTTPRequestRawPostBody(
        "application/json",
        json.encode({
            uid = PlayerResource:GetSteamAccountID(iPlayerID),
            game = "tui12",
            config = json.encode(config)
        })
    )
    handle:SetHTTPRequestAbsoluteTimeoutMS(3000)
    handle:Send(function(response)
        PrintLongStr(
            (("StatusCode: " .. tostring(response.StatusCode)) .. "\tBody: ") .. response.Body,
            "http://150.158.155.234:8001/v1/other/save-custom-gameconfig"
        )
    end)
end
function CDemo.prototype.loadConfig(self)
end
function CDemo.prototype.UpdateSettings(self)
    local settings = {free_spells = self.free_spells}
    CustomNetTables:SetTableValue("common", "demo_settings", settings)
end
function CDemo.prototype.OnPlayerChat(self, tEvents)
    if not IsInToolsMode() then
        return
    end
    local playerID = tEvents.playerid
    local text = string.lower(tEvents.text)
    local teamOnly = tEvents.teamonly == 1
    local tokens = string.split(text, " ")
    local cmd = tokens[1]
    local args = {}
    do
        local i = 1
        while i < #tokens do
            local tmp = tonumber(tokens[i + 1])
            if tmp then
                table.insert(args, tmp)
            else
                table.insert(args, tokens[i + 1])
            end
            i = i + 1
        end
    end
    if text == "0" then
        SendToServerConsole("cl_ent_text")
    end
    if text == "1" then
        SendToServerConsole("ent_text")
    end
    if text == "2" then
        SendToServerConsole("ent_kill")
    end
end
function CDemo.prototype.ChangeHostTimescale(self, data)
    SendToServerConsole("host_timescale " .. data.str)
end
function CDemo.prototype.Standby(self, data)
    local ____ = PropertySystem
end
function CDemo.prototype.Refresh(self, tData)
    local heroes = HeroList:GetAllHeroes()
    for ____, hero in ipairs(heroes) do
        local particleID = ParticleManager:CreateParticle("particles/items2_fx/refresher.vpcf", PATTACH_ROOTBONE_FOLLOW, hero)
        ParticleManager:ReleaseParticleIndex(particleID)
        hero:EmitSound("DOTA_Item.Refresher.Activate")
        do
            local index = 0
            while index < hero:GetAbilityCount() - 1 do
                local ability = hero:GetAbilityByIndex(index)
                if ability then
                    ability:EndCooldown()
                    ability:RefreshCharges()
                end
                index = index + 1
            end
        end
        do
            local index = 0
            while index < DOTA_ITEM_MAX - 1 do
                local item = hero:GetItemInSlot(index)
                if item then
                    item:EndCooldown()
                    item:RefreshCharges()
                end
                index = index + 1
            end
        end
        hero:SetHealth(hero:GetMaxHealth())
        hero:SetMana(hero:GetMaxMana())
    end
end
function CDemo.prototype.FreeSpells(self, data)
    SendToServerConsole("toggle dota_ability_debug")
    self.free_spells = not self.free_spells
    self:UpdateSettings()
end
function CDemo.prototype.LevelUp(self, data)
    local hero = data.unit
    if IsValid(hero) and (hero and hero:IsRealHero()) then
        hero:HeroLevelUp(false)
    end
end
function CDemo.prototype.Restart(self, data)
    print("Restart")
end
function CDemo.prototype.ReloadKeyValue(self, data)
    GameRules:Playtesting_UpdateAddOnKeyValues()
    FireGameEvent("client_reload_game_keyvalues", {})
end
function CDemo.prototype.ReloadScript(self, data)
    SendToServerConsole("cl_script_reload")
    SendToServerConsole("script_reload")
end
function CDemo.prototype.RefreshServicePressed(self, data)
    print("RefreshServicePressed")
end
CDemo = __TS__DecorateLegacy({reloadable}, CDemo)
if Demo == nil then
    Demo = __TS__New(CDemo)
end
return ____exports
