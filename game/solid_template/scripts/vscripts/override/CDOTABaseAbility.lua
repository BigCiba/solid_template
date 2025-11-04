local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 32,["5"] = 33,["6"] = 34,["7"] = 33,["8"] = 36,["9"] = 37,["12"] = 38,["13"] = 39,["16"] = 40,["17"] = 40,["18"] = 40,["19"] = 40,["20"] = 36,["21"] = 42,["22"] = 43,["23"] = 44,["24"] = 44,["25"] = 44,["26"] = 44,["28"] = 44,["29"] = 42,["30"] = 50,["31"] = 52,["32"] = 53,["33"] = 54,["34"] = 56,["35"] = 57,["37"] = 60,["38"] = 61,["40"] = 64,["41"] = 65,["42"] = 66,["44"] = 69,["45"] = 70,["47"] = 73,["48"] = 74,["50"] = 77,["51"] = 78,["53"] = 81,["54"] = 82,["56"] = 85,["57"] = 86,["59"] = 89,["60"] = 90,["62"] = 93,["63"] = 94,["65"] = 97,["66"] = 98,["68"] = 101,["69"] = 102,["71"] = 105,["72"] = 106,["74"] = 109,["75"] = 110,["77"] = 113,["78"] = 114,["80"] = 117,["81"] = 118,["83"] = 121,["84"] = 52,["85"] = 124,["86"] = 125,["87"] = 126,["89"] = 128,["90"] = 129,["92"] = 131,["93"] = 132,["95"] = 134,["96"] = 135,["98"] = 137,["99"] = 138,["101"] = 140,["102"] = 141,["104"] = 143,["105"] = 124,["106"] = 146,["107"] = 147,["108"] = 148,["109"] = 149,["110"] = 150,["112"] = 152,["113"] = 146});
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
if IsServer() then
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
end
