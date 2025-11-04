local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 32,["5"] = 33,["6"] = 34,["7"] = 33,["8"] = 36,["9"] = 37,["12"] = 38,["13"] = 39,["16"] = 40,["17"] = 40,["18"] = 40,["19"] = 40,["20"] = 36,["21"] = 42,["22"] = 43,["23"] = 44,["24"] = 44,["25"] = 44,["26"] = 44,["28"] = 44,["29"] = 42,["30"] = 50,["31"] = 51,["32"] = 52,["33"] = 54,["34"] = 55,["36"] = 58,["37"] = 59,["39"] = 62,["40"] = 63,["41"] = 64,["43"] = 67,["44"] = 68,["46"] = 71,["47"] = 72,["49"] = 75,["50"] = 76,["52"] = 79,["53"] = 80,["55"] = 83,["56"] = 84,["58"] = 87,["59"] = 88,["61"] = 91,["62"] = 92,["64"] = 95,["65"] = 96,["67"] = 99,["68"] = 100,["70"] = 103,["71"] = 104,["73"] = 107,["74"] = 108,["76"] = 111,["77"] = 112,["79"] = 115,["80"] = 116,["82"] = 119,["83"] = 50,["84"] = 122,["85"] = 123,["86"] = 124,["88"] = 126,["89"] = 127,["91"] = 129,["92"] = 130,["94"] = 132,["95"] = 133,["97"] = 135,["98"] = 136,["100"] = 138,["101"] = 139,["103"] = 141,["104"] = 122,["105"] = 144,["106"] = 145,["107"] = 146,["108"] = 147,["109"] = 148,["111"] = 150,["112"] = 144});
DOTABaseAbility = IsServer() and CDOTABaseAbility or C_DOTABaseAbility
DOTABaseAbility.IsAbility = function(self)
    return true
end
DOTABaseAbility.SaveData = function(self, key, value)
    if not IsValid(nil, self) then
        return
    end
    local caster = self:GetCaster()
    if not IsValid(nil, caster) then
        return
    end
    caster:SaveData(
        self:GetAbilityName() .. key,
        value
    )
end
DOTABaseAbility.LoadData = function(self, key, defaultValue)
    local caster = self:GetCaster()
    local ____opt_0 = caster._saveData_
    local ____temp_2 = ____opt_0 and ____opt_0[self:GetAbilityName() .. key]
    if ____temp_2 == nil then
        ____temp_2 = defaultValue
    end
    return ____temp_2
end
CDOTABaseAbility.IsAbilityReady = function(self)
    local hCaster = self:GetCaster()
    local iBehavior = self:GetBehaviorInt()
    if not IsValid(nil, hCaster) then
        return false
    end
    if not (hCaster:IsAlive() or bit.band(iBehavior, DOTA_ABILITY_BEHAVIOR_UNRESTRICTED) == DOTA_ABILITY_BEHAVIOR_UNRESTRICTED) then
        return false
    end
    local hAbility = hCaster:GetCurrentActiveAbility()
    if IsValid(nil, hAbility) and hAbility:IsInAbilityPhase() then
        return false
    end
    if self:GetLevel() <= 0 then
        return false
    end
    if self:IsHidden() then
        return false
    end
    if not self:IsActivated() then
        return false
    end
    if not self:IsCooldownReady() then
        return false
    end
    if not self:IsOwnersManaEnough() then
        return false
    end
    if not self:IsOwnersGoldEnough(hCaster:GetPlayerOwnerID()) then
        return false
    end
    if hCaster:IsHexed() or hCaster:IsCommandRestricted() then
        return false
    end
    if bit.band(iBehavior, DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE) ~= DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE and hCaster:IsStunned() then
        return false
    end
    if not self:IsItem() and not self:IsPassive() and hCaster:IsSilenced() then
        return false
    end
    if not self:IsItem() and self:IsPassive() and hCaster:PassivesDisabled() then
        return false
    end
    if self:IsItem() and not self:IsPassive() and hCaster:IsMuted() then
        return false
    end
    if bit.band(iBehavior, DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL + DOTA_ABILITY_BEHAVIOR_IMMEDIATE) ~= DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL + DOTA_ABILITY_BEHAVIOR_IMMEDIATE and hCaster:IsChanneling() then
        return false
    end
    if not self:IsFullyCastable() then
        return false
    end
    return true
end
CDOTABaseAbility.CanProcsCast = function(self)
    if not IsValid(nil, self) then
        return false
    end
    if not self:IsAbility() then
        return false
    end
    if self:IsItem() then
        return false
    end
    if self:IsPassive() then
        return false
    end
    if self:IsToggle() then
        return false
    end
    if not self:ProcsMagicStick() then
        return false
    end
    return true
end
CDOTABaseAbility.ReduceCooldown = function(self, reduce)
    local remaining = self:GetCooldownTimeRemaining()
    self:EndCooldown()
    if remaining > reduce then
        self:StartCooldown(remaining - reduce)
    end
    self:RefreshCharges()
end
