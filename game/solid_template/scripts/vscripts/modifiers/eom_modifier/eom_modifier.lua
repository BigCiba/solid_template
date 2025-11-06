local ____lualib = require("lualib_bundle")
local Map = ____lualib.Map
local __TS__New = ____lualib.__TS__New
local __TS__ArrayIncludes = ____lualib.__TS__ArrayIncludes
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["10"] = 1,["11"] = 1,["12"] = 1,["13"] = 1,["14"] = 1,["15"] = 1,["16"] = 3,["17"] = 5,["18"] = 6,["19"] = 7,["20"] = 8,["21"] = 9,["23"] = 11,["24"] = 12,["26"] = 5,["27"] = 16,["28"] = 17,["29"] = 18,["30"] = 19,["31"] = 20,["32"] = 21,["33"] = 22,["34"] = 23,["35"] = 24,["39"] = 28,["41"] = 30,["42"] = 16,["43"] = 33,["44"] = 34,["45"] = 35,["46"] = 36,["47"] = 37,["49"] = 34,["50"] = 33,["51"] = 74,["52"] = 75,["53"] = 76,["54"] = 77,["55"] = 79,["57"] = 81,["59"] = 84,["60"] = 85,["61"] = 87,["62"] = 89,["63"] = 91,["64"] = 92,["65"] = 93,["66"] = 94,["67"] = 95,["68"] = 96,["70"] = 98,["71"] = 99,["73"] = 101,["74"] = 102,["76"] = 104,["77"] = 105,["80"] = 109,["82"] = 112,["83"] = 113,["84"] = 114,["85"] = 115,["86"] = 116,["87"] = 117,["88"] = 118,["89"] = 119,["90"] = 120,["91"] = 121,["92"] = 122,["93"] = 123,["95"] = 125,["96"] = 126,["98"] = 128,["99"] = 129,["101"] = 131,["102"] = 132,["104"] = 116,["105"] = 135,["106"] = 136,["107"] = 137,["108"] = 138,["109"] = 139,["110"] = 140,["112"] = 142,["113"] = 143,["115"] = 145,["116"] = 146,["118"] = 136,["119"] = 149,["120"] = 150,["121"] = 151,["122"] = 152,["124"] = 154,["125"] = 155,["127"] = 157,["128"] = 158,["130"] = 150,["131"] = 161,["132"] = 162,["133"] = 163,["134"] = 164,["136"] = 166,["137"] = 167,["139"] = 162,["140"] = 170,["141"] = 171,["142"] = 217,["143"] = 218,["145"] = 220,["146"] = 171,["147"] = 229,["148"] = 230,["149"] = 231,["150"] = 232,["151"] = 231,["154"] = 237,["155"] = 238,["156"] = 239,["157"] = 240,["158"] = 240,["159"] = 240,["161"] = 240,["163"] = 240,["164"] = 241,["165"] = 242,["167"] = 244,["168"] = 245,["170"] = 247,["171"] = 239,["172"] = 249,["173"] = 250,["174"] = 251,["175"] = 252,["176"] = 253,["177"] = 255,["178"] = 256,["179"] = 257,["180"] = 258,["182"] = 260,["183"] = 261,["188"] = 266,["189"] = 267,["191"] = 250,["193"] = 272,["194"] = 76,["195"] = 74,["196"] = 286,["197"] = 286,["198"] = 286,["199"] = 286,["200"] = 297,["201"] = 298,["204"] = 300,["205"] = 302,["206"] = 303,["207"] = 304,["208"] = 305,["209"] = 306,["211"] = 308,["214"] = 311,["215"] = 312,["216"] = 313,["217"] = 314,["218"] = 314,["219"] = 315,["220"] = 316,["222"] = 318,["226"] = 323,["227"] = 325,["228"] = 326,["229"] = 327,["230"] = 327,["231"] = 327,["233"] = 327,["236"] = 329,["237"] = 330,["238"] = 331,["239"] = 332,["240"] = 333,["241"] = 333,["242"] = 333,["244"] = 333,["246"] = 333,["247"] = 334,["248"] = 334,["249"] = 334,["251"] = 334,["253"] = 334,["254"] = 335,["258"] = 297,["259"] = 340,["260"] = 341,["263"] = 343,["264"] = 345,["265"] = 346,["266"] = 347,["267"] = 348,["268"] = 348,["269"] = 349,["270"] = 350,["272"] = 352,["276"] = 356,["277"] = 357,["278"] = 358,["279"] = 358,["280"] = 358,["282"] = 358,["286"] = 340,["287"] = 362,["288"] = 363,["291"] = 365,["292"] = 367,["293"] = 368,["294"] = 369,["295"] = 370,["296"] = 370,["297"] = 371,["298"] = 372,["300"] = 374,["304"] = 378,["305"] = 379,["306"] = 380,["307"] = 380,["308"] = 380,["310"] = 380,["314"] = 362,["315"] = 384,["316"] = 385,["317"] = 387,["318"] = 389,["319"] = 390,["320"] = 391,["321"] = 391,["322"] = 392,["323"] = 393,["325"] = 395,["328"] = 398,["330"] = 401,["331"] = 402,["332"] = 403,["333"] = 404,["335"] = 406,["337"] = 408,["339"] = 411,["340"] = 413,["341"] = 414,["342"] = 415,["343"] = 415,["344"] = 415,["346"] = 415,["349"] = 417,["350"] = 418,["351"] = 419,["352"] = 420,["353"] = 420,["354"] = 420,["356"] = 420,["358"] = 420,["359"] = 421,["360"] = 421,["361"] = 421,["363"] = 421,["365"] = 421,["366"] = 422,["368"] = 424,["370"] = 426,["371"] = 427,["372"] = 428,["374"] = 430,["377"] = 384,["378"] = 434,["379"] = 434,["380"] = 437,["381"] = 437,["382"] = 437,["383"] = 437,["384"] = 440,["385"] = 440,["386"] = 440,["387"] = 440,["388"] = 443,["389"] = 443,["390"] = 443,["391"] = 443});
local ____exports = {}
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local BaseModifier = ____dota_ts_adapter.BaseModifier
local BaseModifierMotionBoth = ____dota_ts_adapter.BaseModifierMotionBoth
local BaseModifierMotionHorizontal = ____dota_ts_adapter.BaseModifierMotionHorizontal
local BaseModifierMotionVertical = ____dota_ts_adapter.BaseModifierMotionVertical
local toDotaClassInstance = ____dota_ts_adapter.toDotaClassInstance
local EOMModifierSyncVarRegistry = __TS__New(Map)
local function registerSyncVar(self, ctor, propertyKey)
    local list = EOMModifierSyncVarRegistry:get(ctor)
    if list == nil then
        list = {}
        EOMModifierSyncVarRegistry:set(ctor, list)
    end
    if not __TS__ArrayIncludes(list, propertyKey) then
        list[#list + 1] = propertyKey
    end
end
local function collectSyncVarEntries(self, ctor)
    local fields = {}
    local current = ctor
    while current ~= nil do
        local list = EOMModifierSyncVarRegistry:get(current)
        if list ~= nil then
            for ____, name in ipairs(list) do
                if not __TS__ArrayIncludes(fields, name) then
                    fields[#fields + 1] = name
                end
            end
        end
        current = current.____super
    end
    return fields
end
function ____exports.SyncVar(self)
    return function(____, target, propertyKey)
        local ctor = target.constructor
        if ctor ~= nil then
            registerSyncVar(nil, ctor, propertyKey)
        end
    end
end
____exports.registerEOMModifier = function(____, param)
    local name = param and param.name
    return function(____, modifier)
        if name ~= nil then
            modifier.name = name
        else
            name = modifier.name
        end
        local env, source = getFileScope()
        local fileName = string.gsub(source, ".*scripts[\\/]vscripts[\\/]", "")
        env[name] = {}
        toDotaClassInstance(nil, env[name], modifier)
        local isEOMModifier = false
        local ____type = LUA_MODIFIER_MOTION_NONE
        local base = modifier.____super
        while base do
            if not isEOMModifier and (base == ____exports.EOMModifier or base == ____exports.EOMModifierMotionBoth or base == ____exports.EOMModifierMotionHorizontal or base == ____exports.EOMModifierMotionVertical) then
                isEOMModifier = true
            end
            if base == ____exports.EOMModifierMotionBoth or base == BaseModifierMotionBoth then
                ____type = LUA_MODIFIER_MOTION_BOTH
                break
            elseif base == ____exports.EOMModifierMotionHorizontal or base == BaseModifierMotionHorizontal then
                ____type = LUA_MODIFIER_MOTION_HORIZONTAL
                break
            elseif base == ____exports.EOMModifierMotionVertical or base == BaseModifierMotionVertical then
                ____type = LUA_MODIFIER_MOTION_VERTICAL
                break
            end
            base = base.____super
        end
        local classType = env[name]
        local syncVarFields = collectSyncVarEntries(nil, modifier)
        local originalGetAbilitySpecialValue = classType.GetAbilitySpecialValue
        local originalOnCreated = classType.OnCreated
        classType.OnCreated = function(self, parameters)
            self:____constructor()
            self.parent = self:GetParent()
            self.caster = self:GetCaster()
            self.ability = self:GetAbility()
            self.name = name
            if #syncVarFields > 0 and IsServer() then
                self:SetHasCustomTransmitterData(true)
            end
            if originalGetAbilitySpecialValue ~= nil then
                originalGetAbilitySpecialValue(self)
            end
            if originalOnCreated ~= nil then
                originalOnCreated(self, parameters)
            end
            if isEOMModifier and originalOnCreated ~= ____exports.EOMModifier.prototype.OnCreated then
                ____exports.EOMModifier.prototype.OnCreated(self, parameters)
            end
        end
        local originalOnRefresh = classType.OnRefresh
        classType.OnRefresh = function(self, parameters)
            self.caster = self:GetCaster()
            self.ability = self:GetAbility()
            if originalGetAbilitySpecialValue ~= nil then
                originalGetAbilitySpecialValue(self)
            end
            if originalOnRefresh ~= nil then
                originalOnRefresh(self, parameters)
            end
            if isEOMModifier and originalOnRefresh ~= ____exports.EOMModifier.prototype.OnRefresh then
                ____exports.EOMModifier.prototype.OnRefresh(self, parameters)
            end
        end
        local originalOnStackCountChanged = classType.OnStackCountChanged
        classType.OnStackCountChanged = function(self, parameters)
            if originalGetAbilitySpecialValue ~= nil then
                originalGetAbilitySpecialValue(self)
            end
            if originalOnStackCountChanged ~= nil then
                originalOnStackCountChanged(self, parameters)
            end
            if isEOMModifier and originalOnStackCountChanged ~= ____exports.EOMModifier.prototype.OnStackCountChanged then
                ____exports.EOMModifier.prototype.OnStackCountChanged(self, parameters)
            end
        end
        local originalOnDestroy = classType.OnDestroy
        classType.OnDestroy = function(self)
            if originalOnDestroy ~= nil then
                originalOnDestroy(self)
            end
            if isEOMModifier and originalOnDestroy ~= ____exports.EOMModifier.prototype.OnDestroy then
                ____exports.EOMModifier.prototype.OnDestroy(self)
            end
        end
        local originalGetTexture = classType.GetTexture
        classType.GetTexture = function(self)
            if originalGetTexture ~= nil then
                return originalGetTexture(self)
            end
            return ____exports.EOMModifier.prototype.GetTexture(self)
        end
        for key, value in pairs(param) do
            if key ~= "name" and type(classType[key]) ~= "function" then
                classType[key] = function()
                    return value
                end
            end
        end
        if #syncVarFields > 0 then
            local originalAddCustomTransmitterData = classType.AddCustomTransmitterData
            classType.AddCustomTransmitterData = function(self)
                local ____temp_2
                if originalAddCustomTransmitterData ~= nil then
                    ____temp_2 = originalAddCustomTransmitterData(self)
                else
                    ____temp_2 = nil
                end
                local payload = ____temp_2
                if payload == nil then
                    payload = {}
                end
                for ____, field in ipairs(syncVarFields) do
                    payload[field] = self[field]
                end
                return payload
            end
            local originalHandleCustomTransmitterData = classType.HandleCustomTransmitterData
            classType.HandleCustomTransmitterData = function(self, data)
                if data ~= nil then
                    for ____, field in ipairs(syncVarFields) do
                        if data[field] ~= nil then
                            if type(data[field]) == "userdata" then
                                local result = tonumber(tostring(data[field])) or 0
                                self[field] = result
                                self:OnSyncVarUpdated(field, result)
                            else
                                self[field] = data[field]
                                self:OnSyncVarUpdated(field, data[field])
                            end
                        end
                    end
                end
                if originalHandleCustomTransmitterData ~= nil then
                    originalHandleCustomTransmitterData(self, data)
                end
            end
        end
        LinkLuaModifier(name, fileName, ____type)
    end
end
____exports.EOMModifier = __TS__Class()
local EOMModifier = ____exports.EOMModifier
EOMModifier.name = "EOMModifier"
__TS__ClassExtends(EOMModifier, BaseModifier)
function EOMModifier.prototype.OnCreated(self, params)
    if self._bDestroyed == true then
        return
    end
    local calculateGenericBonuses = false
    if self.DeclareProperty ~= nil then
        self._DeclareProperty = self:DeclareProperty()
        for iProperty, func in pairs(self._DeclareProperty) do
            if calculateGenericBonuses == false and EOM_UPDATE_MANA_PROPERTY[iProperty] == true then
                calculateGenericBonuses = true
            end
            RegisterModifierProperty(self, iProperty, func)
        end
    end
    if self.StaticProperty ~= nil then
        self._StaticProperty = self:StaticProperty()
        for iProperty, value in pairs(self._StaticProperty) do
            local ____opt_3 = self._DeclareProperty
            if (____opt_3 and ____opt_3[iProperty]) == nil then
                if calculateGenericBonuses == false and EOM_UPDATE_MANA_PROPERTY[iProperty] == true then
                    calculateGenericBonuses = true
                end
                StaticModifierProperty(self, iProperty, value)
            end
        end
    end
    RegisterModifierState(self)
    if IsServer() then
        if calculateGenericBonuses then
            local ____table_parent_IsHero_result_5
            if self.parent:IsHero() then
                ____table_parent_IsHero_result_5 = self.parent:CalculateStatBonus(true)
            else
                ____table_parent_IsHero_result_5 = self.parent:CalculateGenericBonuses()
            end
        end
        if self.EDeclareEvents ~= nil then
            self._EDeclareEvents = self:EDeclareEvents()
            for iEvents, _ in pairs(self._EDeclareEvents) do
                local hSource, hTarget = unpack(_, 1, 2)
                local ____temp_6
                if hSource == -1 then
                    ____temp_6 = nil
                else
                    ____temp_6 = hSource
                end
                local a = ____temp_6
                local ____temp_7
                if hTarget == -1 then
                    ____temp_7 = nil
                else
                    ____temp_7 = hTarget
                end
                local b = ____temp_7
                AddModifierEvents(self, iEvents, a, b)
            end
        end
    end
end
function EOMModifier.prototype.OnRefresh(self, params)
    if self._bDestroyed == true then
        return
    end
    local calculateGenericBonuses = false
    if self.StaticProperty ~= nil then
        self._StaticProperty = self:StaticProperty()
        for iProperty, value in pairs(self._StaticProperty) do
            local ____opt_8 = self._DeclareProperty
            if (____opt_8 and ____opt_8[iProperty]) == nil then
                if calculateGenericBonuses == false and EOM_UPDATE_MANA_PROPERTY[iProperty] == true then
                    calculateGenericBonuses = true
                end
                StaticModifierProperty(self, iProperty, value)
            end
        end
    end
    if IsServer() then
        if calculateGenericBonuses then
            local ____table_parent_IsHero_result_10
            if self.parent:IsHero() then
                ____table_parent_IsHero_result_10 = self.parent:CalculateStatBonus(true)
            else
                ____table_parent_IsHero_result_10 = self.parent:CalculateGenericBonuses()
            end
        end
    end
end
function EOMModifier.prototype.OnStackCountChanged(self, stackCount)
    if self._bDestroyed == true then
        return
    end
    local calculateGenericBonuses = false
    if self.StaticProperty ~= nil then
        self._StaticProperty = self:StaticProperty()
        for iProperty, value in pairs(self._StaticProperty) do
            local ____opt_11 = self._DeclareProperty
            if (____opt_11 and ____opt_11[iProperty]) == nil then
                if calculateGenericBonuses == false and EOM_UPDATE_MANA_PROPERTY[iProperty] == true then
                    calculateGenericBonuses = true
                end
                StaticModifierProperty(self, iProperty, value)
            end
        end
    end
    if IsServer() then
        if calculateGenericBonuses then
            local ____table_parent_IsHero_result_13
            if self.parent:IsHero() then
                ____table_parent_IsHero_result_13 = self.parent:CalculateStatBonus(true)
            else
                ____table_parent_IsHero_result_13 = self.parent:CalculateGenericBonuses()
            end
        end
    end
end
function EOMModifier.prototype.OnDestroy(self)
    self._bDestroyed = true
    local calculateGenericBonuses = false
    if self._StaticProperty ~= nil then
        for iProperty, _ in pairs(self._StaticProperty) do
            local ____opt_14 = self._DeclareProperty
            if (____opt_14 and ____opt_14[iProperty]) == nil then
                if calculateGenericBonuses == false and EOM_UPDATE_MANA_PROPERTY[iProperty] == true then
                    calculateGenericBonuses = true
                end
                StaticModifierProperty(self, iProperty, nil)
            end
        end
        self._StaticProperty = nil
    end
    if self._DeclareProperty ~= nil then
        for iProperty, _ in pairs(self._DeclareProperty) do
            if calculateGenericBonuses == false and EOM_UPDATE_MANA_PROPERTY[iProperty] == true then
                calculateGenericBonuses = true
            end
            UnregisterModifierProperty(self, iProperty)
        end
        self._DeclareProperty = nil
    end
    UnregisterModifierState(self)
    if IsServer() then
        if calculateGenericBonuses and IsValid(self.parent) then
            local ____table_parent_IsHero_result_16
            if self.parent:IsHero() then
                ____table_parent_IsHero_result_16 = self.parent:CalculateStatBonus(true)
            else
                ____table_parent_IsHero_result_16 = self.parent:CalculateGenericBonuses()
            end
        end
        if self._EDeclareEvents ~= nil then
            for iEvents, _ in pairs(self._EDeclareEvents) do
                local hSource, hTarget = unpack(_, 1, 2)
                local ____temp_17
                if hSource == -1 then
                    ____temp_17 = nil
                else
                    ____temp_17 = hSource
                end
                local a = ____temp_17
                local ____temp_18
                if hTarget == -1 then
                    ____temp_18 = nil
                else
                    ____temp_18 = hTarget
                end
                local b = ____temp_18
                RemoveModifierEvents(self, iEvents, a, b)
            end
            self._EDeclareEvents = nil
        end
        if self._DeclareEvents ~= nil then
            for i, v in ipairs(self._DeclareEvents) do
                Event:Unregister(v)
            end
            self._DeclareEvents = nil
        end
    end
end
function EOMModifier.prototype.OnSyncVarUpdated(self, field, value)
end
____exports.EOMModifierMotionHorizontal = __TS__Class()
local EOMModifierMotionHorizontal = ____exports.EOMModifierMotionHorizontal
EOMModifierMotionHorizontal.name = "EOMModifierMotionHorizontal"
__TS__ClassExtends(EOMModifierMotionHorizontal, ____exports.EOMModifier)
____exports.EOMModifierMotionVertical = __TS__Class()
local EOMModifierMotionVertical = ____exports.EOMModifierMotionVertical
EOMModifierMotionVertical.name = "EOMModifierMotionVertical"
__TS__ClassExtends(EOMModifierMotionVertical, ____exports.EOMModifier)
____exports.EOMModifierMotionBoth = __TS__Class()
local EOMModifierMotionBoth = ____exports.EOMModifierMotionBoth
EOMModifierMotionBoth.name = "EOMModifierMotionBoth"
__TS__ClassExtends(EOMModifierMotionBoth, ____exports.EOMModifier)
return ____exports
