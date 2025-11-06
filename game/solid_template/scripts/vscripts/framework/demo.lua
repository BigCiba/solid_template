local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 2,["10"] = 2,["11"] = 12,["12"] = 12,["13"] = 13,["15"] = 13,["16"] = 15,["17"] = 12,["18"] = 16,["19"] = 17,["20"] = 18,["21"] = 19,["23"] = 22,["24"] = 22,["25"] = 22,["26"] = 22,["27"] = 22,["28"] = 22,["29"] = 22,["30"] = 25,["31"] = 25,["32"] = 25,["33"] = 26,["34"] = 27,["35"] = 28,["36"] = 29,["37"] = 30,["38"] = 31,["39"] = 32,["40"] = 38,["41"] = 39,["42"] = 40,["45"] = 43,["47"] = 25,["48"] = 25,["49"] = 25,["50"] = 16,["51"] = 49,["52"] = 50,["53"] = 51,["54"] = 52,["55"] = 53,["56"] = 53,["57"] = 53,["58"] = 53,["59"] = 53,["60"] = 53,["61"] = 53,["62"] = 53,["63"] = 54,["64"] = 55,["65"] = 56,["66"] = 56,["67"] = 56,["68"] = 56,["69"] = 55,["70"] = 49,["71"] = 60,["72"] = 60,["73"] = 82,["74"] = 83,["75"] = 86,["76"] = 82,["77"] = 88,["78"] = 89,["81"] = 92,["82"] = 93,["83"] = 94,["84"] = 96,["85"] = 97,["86"] = 98,["88"] = 99,["89"] = 99,["90"] = 100,["91"] = 101,["92"] = 102,["94"] = 104,["96"] = 99,["99"] = 108,["100"] = 109,["102"] = 111,["103"] = 112,["105"] = 114,["106"] = 115,["108"] = 88,["109"] = 121,["110"] = 122,["111"] = 121,["112"] = 124,["113"] = 126,["114"] = 133,["115"] = 136,["116"] = 136,["117"] = 136,["118"] = 136,["119"] = 136,["120"] = 136,["121"] = 136,["122"] = 145,["123"] = 146,["124"] = 149,["125"] = 152,["126"] = 153,["127"] = 156,["128"] = 156,["129"] = 156,["130"] = 157,["131"] = 158,["132"] = 159,["133"] = 160,["134"] = 161,["135"] = 162,["136"] = 163,["137"] = 164,["138"] = 165,["140"] = 167,["142"] = 169,["144"] = 156,["145"] = 156,["146"] = 124,["147"] = 176,["148"] = 177,["149"] = 178,["150"] = 179,["151"] = 180,["152"] = 181,["154"] = 182,["155"] = 182,["156"] = 183,["157"] = 184,["158"] = 185,["159"] = 186,["161"] = 182,["165"] = 189,["166"] = 189,["167"] = 190,["168"] = 191,["169"] = 192,["170"] = 193,["172"] = 189,["175"] = 196,["176"] = 197,["178"] = 176,["179"] = 202,["180"] = 203,["181"] = 204,["182"] = 205,["183"] = 202,["184"] = 208,["185"] = 209,["186"] = 210,["187"] = 211,["189"] = 208,["190"] = 223,["191"] = 224,["192"] = 223,["193"] = 227,["194"] = 228,["195"] = 229,["196"] = 227,["197"] = 232,["198"] = 233,["199"] = 234,["200"] = 232,["201"] = 236,["202"] = 237,["203"] = 236,["204"] = 12,["205"] = 245,["206"] = 245});
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
function CDemo.prototype.SaveConfig(self, iPlayerID, config)
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
function CDemo.prototype.LoadConfig(self)
end
function CDemo.prototype.UpdateSettings(self)
    local settings = {free_spells = self.free_spells}
    CustomNetTables:SetTableValue("common", "demo_settings", settings)
end
function CDemo.prototype.OnPlayerChat(self, events)
    if not IsInToolsMode() then
        return
    end
    local playerID = events.playerid
    local text = string.lower(events.text)
    local teamOnly = events.teamonly == 1
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
    PropertySystem:RegisterProperty({id = "attack_damage", scope = PropertyScope.UNIT, valueType = PropertyValueType.NUMBER, aggregation = AggregationStrategy.SUM})
    local entIndex = data.unit:GetEntityIndex()
    PropertySystem:AddStaticProperty(
        PropertyScope.UNIT,
        entIndex,
        "attack_damage",
        "item_sword_12345",
        50
    )
    local value = PropertySystem:GetPropertyValue(PropertyScope.UNIT, entIndex, "attack_damage")
    self:print("Property Value: " .. tostring(value))
    PropertySystem:ForceSyncProperty(PropertyScope.UNIT, entIndex, "attack_damage")
    self:print("Server PropertyData.dirtyKeys:")
    PrintTable(PropertyData.dirtyKeys)
    Timer:GameTimer(
        0.3,
        function()
            self:print("Reading NetTable after 0.3s...")
            local netTableData = CustomNetTables:GetTableValue("property_system", "properties")
            self:print("NetTable type: " .. type(netTableData))
            self:print("Server-side NetTable Data:")
            if netTableData then
                local count = 0
                for key, val in pairs(netTableData) do
                    self:print((("  " .. tostring(key)) .. " = ") .. tostring(val))
                    count = count + 1
                end
                self:print("Total keys: " .. tostring(count))
            else
                self:print("  NetTable is nil!")
            end
        end
    )
end
function CDemo.prototype.Refresh(self, data)
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
