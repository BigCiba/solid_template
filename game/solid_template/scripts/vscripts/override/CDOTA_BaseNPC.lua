local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 11,["5"] = 12,["6"] = 13,["7"] = 14,["9"] = 16,["10"] = 12,["11"] = 35,["12"] = 36,["13"] = 36,["15"] = 37,["16"] = 38,["17"] = 39,["19"] = 41,["21"] = 37,["22"] = 45,["23"] = 45,["25"] = 46,["26"] = 47,["27"] = 48,["28"] = 49,["30"] = 51,["31"] = 46,["32"] = 54,["33"] = 55,["34"] = 55,["36"] = 56,["37"] = 54,["38"] = 59,["39"] = 59,["41"] = 60,["42"] = 61,["45"] = 62,["46"] = 63,["47"] = 64,["48"] = 65,["49"] = 66,["51"] = 68,["53"] = 70,["54"] = 60,["55"] = 72,["56"] = 73,["57"] = 75,["58"] = 76,["59"] = 77,["60"] = 78,["61"] = 79,["63"] = 81,["64"] = 82,["65"] = 83,["67"] = 85,["70"] = 88,["71"] = 72,["72"] = 90,["73"] = 90,["74"] = 91,["75"] = 92,["76"] = 93,["77"] = 94,["78"] = 95,["79"] = 96,["80"] = 96,["81"] = 96,["82"] = 96,["83"] = 96,["84"] = 96,["85"] = 96,["86"] = 97,["87"] = 98,["88"] = 99,["89"] = 100,["90"] = 101,["91"] = 102,["92"] = 103,["93"] = 104,["94"] = 105,["95"] = 106,["97"] = 108,["98"] = 109,["101"] = 112,["102"] = 112,["103"] = 112,["104"] = 112,["105"] = 112,["106"] = 112,["107"] = 112,["108"] = 90});
BaseNPC = IsServer() and CDOTA_BaseNPC or C_DOTA_BaseNPC
BaseNPC.IsFriendly = function(self, hTarget)
    if IsValid(nil, self) and IsValid(nil, hTarget) then
        return self:GetTeamNumber() == hTarget:GetTeamNumber()
    end
    return false
end
if IsServer() then
    if CDOTA_BaseNPC.EmitSound_Engine == nil then
        CDOTA_BaseNPC.EmitSound_Engine = CDOTA_BaseNPC.EmitSound
    end
    CDOTA_BaseNPC.EmitSound = function(self, sound, position)
        if position then
            EmitSoundOnLocationWithCaster(position, sound, self)
        else
            self:EmitSound_Engine(sound)
        end
    end
    if CDOTA_BaseNPC.AddAbility_Engine == nil then
        CDOTA_BaseNPC.AddAbility_Engine = CDOTA_BaseNPC.AddAbility
    end
    CDOTA_BaseNPC.AddAbility = function(self, abilityName, level)
        local ability = self:AddAbility_Engine(abilityName)
        if level ~= nil and IsValid(nil, ability) then
            ability:SetLevel(level)
        end
        return ability
    end
    CDOTA_BaseNPC.GetAttachmentPosition = function(self, attachName)
        if not IsValid(nil, self) then
            return vec3_zero
        end
        return self:GetAttachmentOrigin(self:ScriptLookupAttachment(attachName))
    end
    if CDOTA_BaseNPC.RespawnUnit_Engine == nil then
        CDOTA_BaseNPC.RespawnUnit_Engine = CDOTA_BaseNPC.RespawnUnit
    end
    CDOTA_BaseNPC.RespawnUnit = function(self)
        if not self:UnitCanRespawn() then
            return
        end
        local model = self:FirstMoveChild()
        while model ~= nil do
            local next = model:NextMovePeer()
            if model ~= nil and model:GetClassname() ~= "" and model:GetClassname() == "dota_item_wearable" then
                UTIL_Remove(model)
            end
            model = next
        end
        self:RespawnUnit_Engine()
    end
    CDOTA_BaseNPC.AddNewModifier = function(self, caster, ability, modifierName, modifierTable, flags)
        if flags ~= nil then
            if IsValid(nil, self) and bit.band(flags, AddModifierFlag.IGNORE_DEATH) == AddModifierFlag.IGNORE_DEATH then
                local isDead = not self:IsAlive()
                local modifier = nil
                if isDead then
                    self:SetHealth(1)
                end
                modifier = self:AddNewModifier_Engine(caster, ability, modifierName, modifierTable)
                if isDead then
                    self:SetHealth(0)
                end
                return modifier
            end
        end
        return self:AddNewModifier_Engine(caster, ability, modifierName, modifierTable)
    end
    CDOTA_BaseNPC.ExecuteOrder = function(self, iOrder, ...)
        local arg = {...}
        local hAbility
        local hTarget
        local vPosition
        local tPositionOrder = {DOTA_UNIT_ORDER_MOVE_TO_POSITION, DOTA_UNIT_ORDER_ATTACK_MOVE}
        local tTargetOrder = {DOTA_UNIT_ORDER_MOVE_TO_TARGET, DOTA_UNIT_ORDER_ATTACK_TARGET}
        local tAbilityOrder = {
            DOTA_UNIT_ORDER_CAST_POSITION,
            DOTA_UNIT_ORDER_CAST_TARGET,
            DOTA_UNIT_ORDER_CAST_TARGET_TREE,
            DOTA_UNIT_ORDER_CAST_NO_TARGET,
            DOTA_UNIT_ORDER_CAST_TOGGLE
        }
        if TableFindKey(nil, tPositionOrder, iOrder) ~= nil then
            vPosition = arg[1]
        elseif TableFindKey(nil, tTargetOrder, iOrder) ~= nil then
            hTarget = arg[1]
        elseif TableFindKey(nil, tAbilityOrder, iOrder) ~= nil then
            if iOrder == DOTA_UNIT_ORDER_CAST_POSITION then
                hAbility = arg[1]
                vPosition = arg[2]
            elseif iOrder == DOTA_UNIT_ORDER_CAST_NO_TARGET or iOrder == DOTA_UNIT_ORDER_CAST_TOGGLE then
                hAbility = arg[1]
            else
                hAbility = arg[1]
                hTarget = arg[2]
            end
        end
        ExecuteOrderFromTable({
            UnitIndex = self:entindex(),
            OrderType = iOrder,
            TargetIndex = IsValid(nil, hTarget) and hTarget:entindex() or nil,
            AbilityIndex = IsValid(nil, hAbility) and hAbility:entindex() or nil,
            Position = vPosition
        })
    end
end
