local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 65,["5"] = 66,["6"] = 66,["8"] = 68,["9"] = 70,["10"] = 70,["11"] = 70,["12"] = 70,["14"] = 70,["16"] = 71,["17"] = 72,["18"] = 72,["20"] = 73,["21"] = 74,["22"] = 75,["24"] = 77,["25"] = 77,["27"] = 79,["28"] = 65,["29"] = 81,["30"] = 82,["31"] = 82,["33"] = 84,["34"] = 86,["35"] = 86,["36"] = 86,["37"] = 86,["39"] = 86,["41"] = 87,["42"] = 81,["43"] = 89,["44"] = 91,["45"] = 91,["46"] = 91,["47"] = 91,["48"] = 91,["49"] = 91,["50"] = 89,["51"] = 93,["52"] = 94,["54"] = 96,["55"] = 97,["56"] = 98,["58"] = 100,["60"] = 96,["61"] = 103,["62"] = 104,["64"] = 106,["65"] = 107,["66"] = 108,["68"] = 110,["70"] = 106,["71"] = 113,["72"] = 114,["73"] = 115,["74"] = 116,["75"] = 117,["77"] = 120,["78"] = 121,["79"] = 122,["80"] = 124,["84"] = 129,["85"] = 130,["87"] = 132,["88"] = 132,["89"] = 132,["90"] = 132,["91"] = 133,["92"] = 134,["94"] = 136,["95"] = 137,["97"] = 132,["98"] = 132,["99"] = 140,["101"] = 113});
CDOTA_Buff.GetAbilitySpecialValueFor = function(self, sKey)
    if not IsValid(self) then
        return 0
    end
    local ability = self.ability or self:GetAbility()
    if not IsValid(ability) then
        local ____self_sKey_0 = self[sKey]
        if ____self_sKey_0 == nil then
            ____self_sKey_0 = 0
        end
        return ____self_sKey_0
    end
    local level = ability:GetLevel() - 1
    if level == -1 then
        return 0
    end
    local caster = ability:GetCaster()
    if not IsValid(caster) then
        caster = self:GetCaster()
    end
    if not IsValid(caster) then
        return 0
    end
    return ability:GetSpecialValueFor(sKey)
end
CDOTA_Buff.GetAbilityLevelSpecialValueFor = function(self, sKey, iLevel)
    if not IsValid(self) then
        return 0
    end
    local ability = self.ability or self:GetAbility()
    if not IsValid(ability) then
        local ____self_sKey_1 = self[sKey]
        if ____self_sKey_1 == nil then
            ____self_sKey_1 = 0
        end
        return ____self_sKey_1
    end
    return ability:GetLevelSpecialValueFor(sKey, iLevel)
end
CDOTA_Buff.PRD = function(self, chance, pseudo_random_recording)
    return PRD(
        nil,
        self:GetCaster(),
        chance,
        pseudo_random_recording or self:GetName()
    )
end
if CDOTA_Buff.IncrementStackCount_Engine == nil then
    CDOTA_Buff.IncrementStackCount_Engine = CDOTA_Buff.IncrementStackCount
end
CDOTA_Buff.IncrementStackCount = function(self, iStackCount)
    if iStackCount == nil then
        self:IncrementStackCount_Engine()
    else
        self:SetStackCount(self:GetStackCount() + iStackCount)
    end
end
if CDOTA_Buff.DecrementStackCount_Engine == nil then
    CDOTA_Buff.DecrementStackCount_Engine = CDOTA_Buff.DecrementStackCount
end
CDOTA_Buff.DecrementStackCount = function(self, iStackCount)
    if iStackCount == nil then
        self:DecrementStackCount_Engine()
    else
        self:SetStackCount(self:GetStackCount() - iStackCount)
    end
end
CDOTA_Buff.StartThink = function(self, interval, name, callback)
    if IsServer() then
        local timerName = name or self:GetName()
        if self._ThinkList == nil then
            self._ThinkList = {}
        end
        if interval == -1 then
            if self._ThinkList[timerName] then
                Timer:StopTimer(self._ThinkList[timerName])
                self._ThinkList[timerName] = nil
            end
            return
        end
        if self._ThinkList[timerName] ~= nil then
            Timer:StopTimer(self._ThinkList[timerName])
        end
        local index = Timer:StartIntervalThink(
            self,
            interval,
            function()
                if callback ~= nil then
                    callback(timerName)
                end
                if self.OnThink ~= nil then
                    self:OnThink(timerName)
                end
            end
        )
        self._ThinkList[timerName] = index
    end
end
