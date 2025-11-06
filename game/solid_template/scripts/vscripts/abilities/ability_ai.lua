local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 1,["8"] = 1,["9"] = 20,["10"] = 20,["11"] = 20,["12"] = 20,["13"] = 22,["14"] = 23,["15"] = 24,["16"] = 25,["18"] = 22,["19"] = 29,["20"] = 31,["21"] = 32,["22"] = 33,["23"] = 34,["24"] = 35,["25"] = 36,["26"] = 37,["27"] = 38,["30"] = 42,["31"] = 43,["32"] = 44,["33"] = 45,["34"] = 46,["36"] = 48,["37"] = 49,["39"] = 29,["40"] = 53,["41"] = 54,["42"] = 55,["43"] = 56,["44"] = 57,["46"] = 59,["47"] = 60,["48"] = 60,["49"] = 60,["50"] = 61,["51"] = 62,["52"] = 63,["54"] = 65,["55"] = 66,["56"] = 67,["57"] = 67,["58"] = 67,["59"] = 67,["60"] = 67,["61"] = 67,["62"] = 67,["63"] = 67,["64"] = 67,["65"] = 67,["66"] = 67,["67"] = 68,["68"] = 69,["71"] = 72,["74"] = 75,["75"] = 60,["76"] = 60,["77"] = 77,["78"] = 78,["79"] = 78,["80"] = 78,["81"] = 79,["82"] = 80,["83"] = 81,["85"] = 83,["86"] = 84,["87"] = 85,["88"] = 86,["89"] = 86,["90"] = 86,["91"] = 86,["92"] = 86,["93"] = 86,["94"] = 86,["95"] = 86,["96"] = 86,["97"] = 86,["98"] = 86,["99"] = 87,["100"] = 88,["101"] = 88,["102"] = 88,["103"] = 88,["104"] = 88,["105"] = 88,["107"] = 90,["108"] = 91,["110"] = 93,["111"] = 94,["112"] = 94,["113"] = 94,["114"] = 94,["115"] = 94,["116"] = 94,["117"] = 94,["118"] = 94,["119"] = 94,["120"] = 94,["121"] = 95,["122"] = 96,["123"] = 96,["124"] = 96,["125"] = 96,["126"] = 96,["127"] = 96,["128"] = 96,["129"] = 96,["130"] = 96,["131"] = 96,["132"] = 96,["133"] = 96,["135"] = 98,["136"] = 99,["139"] = 102,["140"] = 78,["141"] = 78,["142"] = 104,["143"] = 105,["144"] = 105,["145"] = 105,["146"] = 106,["147"] = 107,["148"] = 108,["150"] = 110,["151"] = 111,["152"] = 112,["153"] = 113,["154"] = 113,["155"] = 113,["156"] = 113,["157"] = 113,["158"] = 113,["159"] = 113,["160"] = 113,["161"] = 113,["162"] = 113,["163"] = 113,["164"] = 114,["165"] = 115,["166"] = 115,["167"] = 115,["168"] = 115,["169"] = 115,["170"] = 115,["172"] = 117,["173"] = 118,["175"] = 120,["176"] = 121,["178"] = 123,["179"] = 124,["180"] = 124,["181"] = 124,["182"] = 124,["183"] = 124,["184"] = 124,["185"] = 124,["186"] = 124,["187"] = 124,["188"] = 124,["190"] = 126,["191"] = 127,["194"] = 130,["195"] = 105,["196"] = 105,["198"] = 53,["199"] = 134,["200"] = 135,["201"] = 136,["202"] = 137,["204"] = 134,["205"] = 140,["206"] = 141,["207"] = 140,["208"] = 143,["209"] = 144,["210"] = 143,["211"] = 146,["212"] = 147,["213"] = 146,["214"] = 149,["215"] = 150,["216"] = 151,["218"] = 153,["219"] = 149,["220"] = 155,["221"] = 156,["222"] = 155,["223"] = 158,["224"] = 159,["225"] = 158,["226"] = 161,["227"] = 162,["228"] = 161});
local ____exports = {}
local ____eom_ability = require("abilities.eom_ability")
local EOMAbility = ____eom_ability.EOMAbility
____exports.EOMAbilityAI = __TS__Class()
local EOMAbilityAI = ____exports.EOMAbilityAI
EOMAbilityAI.name = "EOMAbilityAI"
__TS__ClassExtends(EOMAbilityAI, EOMAbility)
function EOMAbilityAI.prototype.Spawn(self)
    if IsServer() then
        self:ParseBehavior()
        self:_StartThink()
    end
end
function EOMAbilityAI.prototype.ParseBehavior(self)
    if not self:IsPassive() and self.behavior == nil then
        local behavior = self:GetBehaviorInt()
        if bit.band(behavior, DOTA_ABILITY_BEHAVIOR_NO_TARGET) == DOTA_ABILITY_BEHAVIOR_NO_TARGET then
            self.behavior = DOTA_ABILITY_BEHAVIOR_NO_TARGET
        elseif bit.band(behavior, DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) == DOTA_ABILITY_BEHAVIOR_UNIT_TARGET then
            self.behavior = DOTA_ABILITY_BEHAVIOR_UNIT_TARGET
        elseif bit.band(behavior, DOTA_ABILITY_BEHAVIOR_POINT) == DOTA_ABILITY_BEHAVIOR_POINT then
            self.behavior = DOTA_ABILITY_BEHAVIOR_POINT
        end
    end
    self.targetTeam = self.targetTeam or self:GetAbilityTargetTeam()
    self.targetType = self.targetType or self:GetAbilityTargetType()
    self.targetFlags = self.targetFlags or self:GetAbilityTargetFlags()
    if self.targetTeam == DOTA_UNIT_TARGET_TEAM_NONE then
        self.targetTeam = DOTA_UNIT_TARGET_TEAM_ENEMY
    end
    if self.targetType == DOTA_UNIT_TARGET_NONE then
        self.targetType = DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_BASIC
    end
end
function EOMAbilityAI.prototype._StartThink(self)
    self:_StopThink()
    local hCaster = self:GetCaster()
    if HasState(hCaster, EOMModifierState.AI_DISABLED) then
        return AI_TIMER_TICK_TIME
    end
    if self.behavior == DOTA_ABILITY_BEHAVIOR_NO_TARGET then
        self.aiTimer = self:GameTimer(
            0,
            function()
                if self:_IsReady() then
                    if self.funcCondition ~= nil and self:funcCondition() ~= true then
                        return AI_TIMER_TICK_TIME
                    end
                    local aoeRadius = self:GetAOERadius()
                    if aoeRadius > 0 then
                        local tTargets = FindUnitsInRadius(
                            hCaster:GetTeamNumber(),
                            hCaster:GetAbsOrigin(),
                            nil,
                            self:GetAOERadius(),
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType,
                            false
                        )
                        if IsValid(tTargets[1]) then
                            self:_CastAbilityNoTarget()
                        end
                    else
                        self:_CastAbilityNoTarget()
                    end
                end
                return AI_TIMER_TICK_TIME
            end
        )
    elseif self.behavior == DOTA_ABILITY_BEHAVIOR_POINT then
        self.aiTimer = self:GameTimer(
            0,
            function()
                if self:_IsReady() then
                    if self.funcCondition ~= nil and self:funcCondition() ~= true then
                        return AI_TIMER_TICK_TIME
                    end
                    local flCastRange = self:GetEffectiveCastRange(vec3_invalid, nil)
                    local vPosition = vec3_invalid
                    if self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE then
                        local tTargets = FindUnitsInRadius(
                            hCaster:GetTeamNumber(),
                            hCaster:GetAbsOrigin(),
                            nil,
                            flCastRange,
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType,
                            false
                        )
                        if self.funcSortFunction ~= nil then
                            table.sort(
                                tTargets,
                                function(a, b)
                                    return self:funcSortFunction(a, b)
                                end
                            )
                        end
                        if IsValid(tTargets[1]) then
                            vPosition = tTargets[1]:GetAbsOrigin()
                        end
                    elseif self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET then
                        vPosition = GetAOEMostTargetsPosition(
                            hCaster:GetAbsOrigin(),
                            flCastRange,
                            hCaster:GetTeamNumber(),
                            self:GetAOERadius(),
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType
                        )
                    elseif self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_LINE_TARGET then
                        vPosition = GetLinearMostTargetsPosition(
                            hCaster:GetAbsOrigin(),
                            flCastRange,
                            hCaster:GetTeamNumber(),
                            self:GetLinearStartWidth(),
                            self:GetLinearEndWidth(),
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType,
                            {}
                        )
                    end
                    if vPosition ~= vec3_invalid then
                        self:_CastAbilityOnPosition(vPosition)
                    end
                end
                return AI_TIMER_TICK_TIME
            end
        )
    elseif self.behavior == DOTA_ABILITY_BEHAVIOR_UNIT_TARGET then
        self.aiTimer = self:GameTimer(
            0,
            function()
                if self:_IsReady() then
                    if self.funcCondition ~= nil and self:funcCondition() ~= true then
                        return AI_TIMER_TICK_TIME
                    end
                    local flCastRange = self:GetEffectiveCastRange(vec3_invalid, nil)
                    local hTarget
                    if self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE then
                        local tTargets = FindUnitsInRadius(
                            hCaster:GetTeamNumber(),
                            hCaster:GetAbsOrigin(),
                            nil,
                            flCastRange,
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType,
                            false
                        )
                        if self.funcSortFunction ~= nil then
                            table.sort(
                                tTargets,
                                function(a, b)
                                    return self:funcSortFunction(a, b)
                                end
                            )
                        end
                        if self.funcUnitsCallback ~= nil then
                            tTargets = self:funcUnitsCallback(tTargets)
                        end
                        if IsValid(tTargets[1]) then
                            hTarget = tTargets[1]
                        end
                    elseif self.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET then
                        hTarget = GetAOEMostTargetsSpellTarget(
                            hCaster:GetAbsOrigin(),
                            flCastRange,
                            hCaster:GetTeamNumber(),
                            self:GetAOERadius(),
                            self.targetTeam,
                            self.targetType,
                            self.targetFlags,
                            self.orderType
                        )
                    end
                    if hTarget then
                        self:_CastAbilityOnTarget(hTarget)
                    end
                end
                return AI_TIMER_TICK_TIME
            end
        )
    end
end
function EOMAbilityAI.prototype._StopThink(self)
    if self.aiTimer then
        self:StopTimer(self.aiTimer)
        self.aiTimer = nil
    end
end
function EOMAbilityAI.prototype._CastAbilityNoTarget(self)
    self:GetCaster():ExecuteOrder(DOTA_UNIT_ORDER_CAST_NO_TARGET, self)
end
function EOMAbilityAI.prototype._CastAbilityOnPosition(self, vPosition)
    self:GetCaster():ExecuteOrder(DOTA_UNIT_ORDER_CAST_POSITION, self, vPosition)
end
function EOMAbilityAI.prototype._CastAbilityOnTarget(self, hTarget)
    self:GetCaster():ExecuteOrder(DOTA_UNIT_ORDER_CAST_TARGET, self, hTarget)
end
function EOMAbilityAI.prototype._IsReady(self)
    if self:IsAbilityReady() then
        return true
    end
    return false
end
function EOMAbilityAI.prototype.GetAOERadius(self)
    return self.aoeRadius or 0
end
function EOMAbilityAI.prototype.GetLinearStartWidth(self)
    return self.startWidth or 0
end
function EOMAbilityAI.prototype.GetLinearEndWidth(self)
    return self.endWidth or 0
end
return ____exports
