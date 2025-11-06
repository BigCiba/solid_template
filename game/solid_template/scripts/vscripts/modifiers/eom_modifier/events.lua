local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["5"] = 11,["6"] = 11,["7"] = 11,["8"] = 11,["9"] = 11,["10"] = 11,["11"] = 11,["12"] = 11,["13"] = 11,["14"] = 11,["15"] = 11,["16"] = 11,["17"] = 11,["18"] = 11,["19"] = 11,["20"] = 11,["21"] = 11,["22"] = 11,["23"] = 11,["24"] = 11,["25"] = 11,["26"] = 11,["27"] = 11,["28"] = 11,["29"] = 11,["30"] = 11,["31"] = 11,["32"] = 11,["33"] = 11,["34"] = 11,["35"] = 11,["36"] = 11,["37"] = 11,["38"] = 11,["39"] = 11,["40"] = 11,["41"] = 11,["42"] = 11,["43"] = 11,["44"] = 11,["45"] = 11,["46"] = 11,["47"] = 11,["48"] = 11,["49"] = 11,["50"] = 11,["51"] = 11,["52"] = 11,["53"] = 11,["54"] = 11,["55"] = 11,["56"] = 11,["57"] = 11,["58"] = 11,["59"] = 11,["60"] = 11,["61"] = 11,["62"] = 11,["63"] = 11,["64"] = 11,["65"] = 11,["66"] = 11,["67"] = 11,["68"] = 11,["69"] = 11,["70"] = 11,["71"] = 11,["72"] = 11,["73"] = 11,["74"] = 11,["75"] = 11,["76"] = 11,["77"] = 11,["78"] = 11,["79"] = 11,["81"] = 74,["82"] = 74,["83"] = 74,["84"] = 74,["85"] = 74,["86"] = 74,["87"] = 74,["88"] = 74,["89"] = 74,["90"] = 74,["91"] = 74,["92"] = 74,["93"] = 74,["94"] = 74,["95"] = 74,["96"] = 74,["97"] = 74,["98"] = 74,["99"] = 74,["100"] = 74,["101"] = 74,["102"] = 74,["103"] = 74,["104"] = 74,["105"] = 74,["106"] = 74,["107"] = 74,["108"] = 74,["109"] = 74,["110"] = 74,["111"] = 74,["112"] = 74,["113"] = 74,["114"] = 74,["115"] = 74,["116"] = 74,["117"] = 74,["118"] = 74,["119"] = 74,["120"] = 74,["121"] = 74,["122"] = 74,["123"] = 74,["124"] = 74,["125"] = 74,["126"] = 74,["127"] = 74,["128"] = 74,["129"] = 74,["130"] = 74,["131"] = 74,["132"] = 74,["133"] = 74,["134"] = 74,["135"] = 74,["136"] = 74,["137"] = 74,["138"] = 74,["139"] = 74,["140"] = 74,["141"] = 74,["142"] = 74,["143"] = 74,["144"] = 74,["145"] = 74,["146"] = 74,["147"] = 74,["148"] = 74,["149"] = 74,["150"] = 74,["151"] = 74,["152"] = 74,["153"] = 74,["154"] = 74,["155"] = 74,["156"] = 74,["157"] = 74,["158"] = 74,["159"] = 74,["160"] = 74,["161"] = 74,["162"] = 162,["163"] = 163,["164"] = 164,["165"] = 165,["166"] = 166,["168"] = 168,["169"] = 169,["171"] = 172,["172"] = 172,["174"] = 174,["175"] = 175,["176"] = 176,["178"] = 178,["179"] = 179,["181"] = 182,["182"] = 182,["185"] = 185,["186"] = 186,["188"] = 188,["189"] = 189,["191"] = 191,["192"] = 191,["194"] = 162,["195"] = 195,["196"] = 196,["197"] = 197,["198"] = 198,["199"] = 199,["201"] = 201,["202"] = 202,["204"] = 205,["206"] = 207,["207"] = 208,["208"] = 209,["210"] = 211,["211"] = 212,["213"] = 215,["216"] = 218,["217"] = 219,["219"] = 221,["220"] = 222,["222"] = 224,["224"] = 195,["225"] = 229,["226"] = 230,["227"] = 231,["228"] = 232,["229"] = 232,["230"] = 233,["231"] = 234,["232"] = 235,["233"] = 236,["236"] = 240,["237"] = 242,["239"] = 244,["244"] = 249,["245"] = 250,["246"] = 250,["247"] = 251,["248"] = 252,["249"] = 253,["250"] = 254,["253"] = 258,["254"] = 260,["256"] = 262,["261"] = 267,["262"] = 268,["263"] = 269,["264"] = 270,["265"] = 271,["266"] = 273,["268"] = 275,["272"] = 229});
--- EOMModifier自定义事件
EOMModifierEvents = EOMModifierEvents or ({})
EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_START_CUSTOM = 383
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_START_CUSTOM] = "MODIFIER_EVENT_ON_ATTACK_START_CUSTOM"
EOMModifierEvents.MODIFIER_EVENT_ON_TREE_CUT_DOWN = 384
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_TREE_CUT_DOWN] = "MODIFIER_EVENT_ON_TREE_CUT_DOWN"
EOMModifierEvents.MODIFIER_EVENT_ON_CRITICAL_STRIKE = 385
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_CRITICAL_STRIKE] = "MODIFIER_EVENT_ON_CRITICAL_STRIKE"
EOMModifierEvents.MODIFIER_EVENT_ON_KNOCKBACK = 386
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_KNOCKBACK] = "MODIFIER_EVENT_ON_KNOCKBACK"
EOMModifierEvents.MODIFIER_EVENT_ON_KNOCKBACK_END = 387
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_KNOCKBACK_END] = "MODIFIER_EVENT_ON_KNOCKBACK_END"
EOMModifierEvents.MODIFIER_EVENT_ON_HERO_LEVEL_UP = 388
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_HERO_LEVEL_UP] = "MODIFIER_EVENT_ON_HERO_LEVEL_UP"
EOMModifierEvents.MODIFIER_EVENT_ON_DASH = 389
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_DASH] = "MODIFIER_EVENT_ON_DASH"
EOMModifierEvents.MODIFIER_EVENT_ON_DASH_END = 390
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_DASH_END] = "MODIFIER_EVENT_ON_DASH_END"
EOMModifierEvents.MODIFIER_EVENT_ON_DEATH_END = 391
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_DEATH_END] = "MODIFIER_EVENT_ON_DEATH_END"
EOMModifierEvents.MODIFIER_EVENT_ON_HERO_TELEPORTED = 392
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_HERO_TELEPORTED] = "MODIFIER_EVENT_ON_HERO_TELEPORTED"
EOMModifierEvents.MODIFIER_EVENT_ON_SUMMON = 393
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_SUMMON] = "MODIFIER_EVENT_ON_SUMMON"
EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_PHYSICAL_DAMAGE = 394
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_PHYSICAL_DAMAGE] = "MODIFIER_EVENT_ON_TAKE_PHYSICAL_DAMAGE"
EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_MAGICAL_DAMAGE = 395
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_MAGICAL_DAMAGE] = "MODIFIER_EVENT_ON_TAKE_MAGICAL_DAMAGE"
EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_PURE_DAMAGE = 396
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_PURE_DAMAGE] = "MODIFIER_EVENT_ON_TAKE_PURE_DAMAGE"
EOMModifierEvents.MODIFIER_EVENT_ON_DAMAGE_FINISHED = 397
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_DAMAGE_FINISHED] = "MODIFIER_EVENT_ON_DAMAGE_FINISHED"
EOMModifierEvents.MODIFIER_EVENT_ON_DIALOG_EVENT_ABILITY_CAST = 398
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_DIALOG_EVENT_ABILITY_CAST] = "MODIFIER_EVENT_ON_DIALOG_EVENT_ABILITY_CAST"
EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_CANEXTENDATTACK = 399
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_CANEXTENDATTACK] = "MODIFIER_EVENT_ON_ATTACK_CANEXTENDATTACK"
EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_START_ANIMATION = 400
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_START_ANIMATION] = "MODIFIER_EVENT_ON_ATTACK_START_ANIMATION"
EOMModifierEvents.MODIFIER_EVENT_ON_HP_REGEN = 401
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_HP_REGEN] = "MODIFIER_EVENT_ON_HP_REGEN"
EOMModifierEvents.MODIFIER_EVENT_ON_HEAL = 402
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_HEAL] = "MODIFIER_EVENT_ON_HEAL"
EOMModifierEvents.MODIFIER_EVENT_ON_LIFESTEAL = 403
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_LIFESTEAL] = "MODIFIER_EVENT_ON_LIFESTEAL"
EOMModifierEvents.MODIFIER_EVENT_ON_PRE_DAMAGE_PROCESS = 404
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_PRE_DAMAGE_PROCESS] = "MODIFIER_EVENT_ON_PRE_DAMAGE_PROCESS"
EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_COMPLETE = 405
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_COMPLETE] = "MODIFIER_EVENT_ON_ATTACK_COMPLETE"
EOMModifierEvents.MODIFIER_EVENT_ON_RESOURCE_CHANGE = 406
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_RESOURCE_CHANGE] = "MODIFIER_EVENT_ON_RESOURCE_CHANGE"
EOMModifierEvents.MODIFIER_EVENT_ON_DAMAGE_BEFORE_HEALTH_MODIFIED = 407
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_DAMAGE_BEFORE_HEALTH_MODIFIED] = "MODIFIER_EVENT_ON_DAMAGE_BEFORE_HEALTH_MODIFIED"
EOMModifierEvents.MODIFIER_EVENT_ON_TAKEDAMAGE_BEFORE_BARRIER = 408
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_TAKEDAMAGE_BEFORE_BARRIER] = "MODIFIER_EVENT_ON_TAKEDAMAGE_BEFORE_BARRIER"
EOMModifierEvents.MODIFIER_EVENT_ON_FIRE_TRIAL_COMPLETE = 409
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_FIRE_TRIAL_COMPLETE] = "MODIFIER_EVENT_ON_FIRE_TRIAL_COMPLETE"
EOMModifierEvents.MODIFIER_EVENT_ON_STUN = 410
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_STUN] = "MODIFIER_EVENT_ON_STUN"
EOMModifierEvents.MODIFIER_EVENT_ON_STUNNED = 411
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_STUNNED] = "MODIFIER_EVENT_ON_STUNNED"
EOMModifierEvents.MODIFIER_EVENT_ON_CHILL = 412
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_CHILL] = "MODIFIER_EVENT_ON_CHILL"
EOMModifierEvents.MODIFIER_EVENT_ON_FREEZE = 413
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_FREEZE] = "MODIFIER_EVENT_ON_FREEZE"
EOMModifierEvents.MODIFIER_EVENT_ON_FROZEN = 414
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_FROZEN] = "MODIFIER_EVENT_ON_FROZEN"
EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_ADDED = 415
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_ADDED] = "MODIFIER_EVENT_ON_BARRIER_ADDED"
EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_DESTROYED = 416
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_DESTROYED] = "MODIFIER_EVENT_ON_BARRIER_DESTROYED"
EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_BLOCK = 417
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_BLOCK] = "MODIFIER_EVENT_ON_BARRIER_BLOCK"
EOMModifierEvents.MODIFIER_EVENT_ON_ELECTRIFICATION = 418
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_ELECTRIFICATION] = "MODIFIER_EVENT_ON_ELECTRIFICATION"
EOMModifierEvents.MODIFIER_EVENT_ON_COUNTER = 419
EOMModifierEvents[EOMModifierEvents.MODIFIER_EVENT_ON_COUNTER] = "MODIFIER_EVENT_ON_COUNTER"
--- EOMModifier自定义事件对应的函数名
EOMModifierEventsFunctionName = {
    [MODIFIER_EVENT_ON_SPELL_TARGET_READY] = "OnSpellTargetReady",
    [MODIFIER_EVENT_ON_ATTACK_RECORD] = "OnAttackRecord",
    [MODIFIER_EVENT_ON_ATTACK_START] = "OnAttackStart",
    [MODIFIER_EVENT_ON_ATTACK] = "OnAttack",
    [MODIFIER_EVENT_ON_ATTACK_LANDED] = "OnAttackLanded",
    [MODIFIER_EVENT_ON_ATTACK_FAIL] = "OnAttackFail",
    [MODIFIER_EVENT_ON_ATTACK_ALLIED] = "OnAttackAllied",
    [MODIFIER_EVENT_ON_PROJECTILE_DODGE] = "OnProjectileDodge",
    [MODIFIER_EVENT_ON_ORDER] = "OnOrder",
    [MODIFIER_EVENT_ON_UNIT_MOVED] = "OnUnitMoved",
    [MODIFIER_EVENT_ON_ABILITY_START] = "OnAbilityStart",
    [MODIFIER_EVENT_ON_ABILITY_EXECUTED] = "OnAbilityExecuted",
    [MODIFIER_EVENT_ON_ABILITY_FULLY_CAST] = "OnAbilityFullyCast",
    [MODIFIER_EVENT_ON_BREAK_INVISIBILITY] = "OnBreakInvisibility",
    [MODIFIER_EVENT_ON_ABILITY_END_CHANNEL] = "OnAbilityEndChannel",
    [MODIFIER_EVENT_ON_TAKEDAMAGE] = "OnTakeDamage",
    [MODIFIER_EVENT_ON_DEATH_PREVENTED] = "OnDamagePrevented",
    [MODIFIER_EVENT_ON_STATE_CHANGED] = "OnStateChanged",
    [MODIFIER_EVENT_ON_PROCESS_CLEAVE] = "OnProcessCleave",
    [MODIFIER_EVENT_ON_DAMAGE_CALCULATED] = "OnDamageCalculated",
    [MODIFIER_EVENT_ON_MAGIC_DAMAGE_CALCULATED] = "OnMagicDamageCalculated",
    [MODIFIER_EVENT_ON_ATTACKED] = "OnAttacked",
    [MODIFIER_EVENT_ON_DEATH] = "OnDeath",
    [MODIFIER_EVENT_ON_RESPAWN] = "OnRespawn",
    [MODIFIER_EVENT_ON_SPENT_MANA] = "OnSpentMana",
    [MODIFIER_EVENT_ON_TELEPORTING] = "OnTeleporting",
    [MODIFIER_EVENT_ON_TELEPORTED] = "OnTeleported",
    [MODIFIER_EVENT_ON_SET_LOCATION] = "OnSetLocation",
    [MODIFIER_EVENT_ON_HEALTH_GAINED] = "OnHealthGained",
    [MODIFIER_EVENT_ON_MANA_GAINED] = "OnManaGained",
    [MODIFIER_EVENT_ON_TAKEDAMAGE_KILLCREDIT] = "OnTakeDamageKillCredit",
    [MODIFIER_EVENT_ON_HERO_KILLED] = "OnHeroKilled",
    [MODIFIER_EVENT_ON_HEAL_RECEIVED] = "OnHealReceived",
    [MODIFIER_EVENT_ON_BUILDING_KILLED] = "OnBuildingKilled",
    [MODIFIER_EVENT_ON_MODEL_CHANGED] = "OnModelChanged",
    [MODIFIER_EVENT_ON_MODIFIER_ADDED] = "OnModifierAdded",
    [MODIFIER_EVENT_ON_DOMINATED] = "OnDominated",
    [MODIFIER_EVENT_ON_ASSIST] = "OnAssist",
    [MODIFIER_EVENT_ON_ATTACK_FINISHED] = "OnAttackFinished",
    [MODIFIER_EVENT_ON_ATTACK_RECORD_DESTROY] = "OnAttackRecordDestroy",
    [MODIFIER_EVENT_ON_PROJECTILE_OBSTRUCTION_HIT] = "OnProjectileObstructionHit",
    [MODIFIER_EVENT_ON_PREDEBUFF_APPLIED] = "OnPreDebuffApplied",
    [EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_START_CUSTOM] = "OnAttackStartCustom",
    [EOMModifierEvents.MODIFIER_EVENT_ON_TREE_CUT_DOWN] = "OnCustomTreeCutDown",
    [EOMModifierEvents.MODIFIER_EVENT_ON_CRITICAL_STRIKE] = "OnCriticalStrike",
    [EOMModifierEvents.MODIFIER_EVENT_ON_KNOCKBACK] = "OnKnockback",
    [EOMModifierEvents.MODIFIER_EVENT_ON_KNOCKBACK_END] = "OnKnockbackEnd",
    [EOMModifierEvents.MODIFIER_EVENT_ON_HERO_LEVEL_UP] = "OnHeroLevelUp",
    [EOMModifierEvents.MODIFIER_EVENT_ON_DASH] = "OnDash",
    [EOMModifierEvents.MODIFIER_EVENT_ON_DASH_END] = "OnDashEnd",
    [EOMModifierEvents.MODIFIER_EVENT_ON_DEATH_END] = "OnDeathEnd",
    [EOMModifierEvents.MODIFIER_EVENT_ON_HERO_TELEPORTED] = "OnHeroTeleported",
    [EOMModifierEvents.MODIFIER_EVENT_ON_SUMMON] = "OnSummon",
    [EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_PHYSICAL_DAMAGE] = "OnTakePhysicalDamage",
    [EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_MAGICAL_DAMAGE] = "OnTakeMagicalDamage",
    [EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_PURE_DAMAGE] = "OnTakePureDamage",
    [EOMModifierEvents.MODIFIER_EVENT_ON_DAMAGE_FINISHED] = "OnDamageFinished",
    [EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_CANEXTENDATTACK] = "OnAttackCanExtendAttack",
    [EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_START_ANIMATION] = "OnAttackStartAnimation",
    [EOMModifierEvents.MODIFIER_EVENT_ON_HP_REGEN] = "OnHPRegen",
    [EOMModifierEvents.MODIFIER_EVENT_ON_HEAL] = "OnHeal",
    [EOMModifierEvents.MODIFIER_EVENT_ON_LIFESTEAL] = "OnLifeSteal",
    [EOMModifierEvents.MODIFIER_EVENT_ON_PRE_DAMAGE_PROCESS] = "OnPreDamageProcess",
    [EOMModifierEvents.MODIFIER_EVENT_ON_DIALOG_EVENT_ABILITY_CAST] = "OnDialogEventAbilityCast",
    [EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_COMPLETE] = "OnAttackComplete",
    [EOMModifierEvents.MODIFIER_EVENT_ON_RESOURCE_CHANGE] = "OnResourceChange",
    [EOMModifierEvents.MODIFIER_EVENT_ON_DAMAGE_BEFORE_HEALTH_MODIFIED] = "OnDamageBeforeHealthModified",
    [EOMModifierEvents.MODIFIER_EVENT_ON_TAKEDAMAGE_BEFORE_BARRIER] = "OnTakeDamageBeforeBarrier",
    [EOMModifierEvents.MODIFIER_EVENT_ON_FIRE_TRIAL_COMPLETE] = "OnFireTrialComplete",
    [EOMModifierEvents.MODIFIER_EVENT_ON_STUN] = "OnStun",
    [EOMModifierEvents.MODIFIER_EVENT_ON_STUNNED] = "OnStunned",
    [EOMModifierEvents.MODIFIER_EVENT_ON_CHILL] = "OnChill",
    [EOMModifierEvents.MODIFIER_EVENT_ON_FREEZE] = "OnFreeze",
    [EOMModifierEvents.MODIFIER_EVENT_ON_FROZEN] = "OnFrozen",
    [EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_ADDED] = "OnShieldAdded",
    [EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_DESTROYED] = "OnCustomShieldDestroyed",
    [EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_BLOCK] = "OnShieldBlock",
    [EOMModifierEvents.MODIFIER_EVENT_ON_ELECTRIFICATION] = "OnElectrification",
    [EOMModifierEvents.MODIFIER_EVENT_ON_COUNTER] = "OnCounter"
}
function AddModifierEvents(hModifier, iModifierEvent, hSource, hTarget)
    if IsValid(hTarget) or IsValid(hSource) then
        if IsValid(hSource) then
            if type(hSource.tSourceModifierEvents) == "nil" then
                hSource.tSourceModifierEvents = {}
            end
            if type(hSource.tSourceModifierEvents[iModifierEvent]) == "nil" then
                hSource.tSourceModifierEvents[iModifierEvent] = {}
            end
            local ____hSource_tSourceModifierEvents_iModifierEvent_0 = hSource.tSourceModifierEvents[iModifierEvent]
            ____hSource_tSourceModifierEvents_iModifierEvent_0[#____hSource_tSourceModifierEvents_iModifierEvent_0 + 1] = hModifier
        end
        if IsValid(hTarget) then
            if type(hTarget.tTargetModifierEvents) == "nil" then
                hTarget.tTargetModifierEvents = {}
            end
            if type(hTarget.tTargetModifierEvents[iModifierEvent]) == "nil" then
                hTarget.tTargetModifierEvents[iModifierEvent] = {}
            end
            local ____hTarget_tTargetModifierEvents_iModifierEvent_1 = hTarget.tTargetModifierEvents[iModifierEvent]
            ____hTarget_tTargetModifierEvents_iModifierEvent_1[#____hTarget_tTargetModifierEvents_iModifierEvent_1 + 1] = hModifier
        end
    else
        if _G.tModifierEvents == nil then
            _G.tModifierEvents = {}
        end
        if type(tModifierEvents[iModifierEvent]) == "nil" then
            tModifierEvents[iModifierEvent] = {}
        end
        local ____tModifierEvents_iModifierEvent_2 = tModifierEvents[iModifierEvent]
        ____tModifierEvents_iModifierEvent_2[#____tModifierEvents_iModifierEvent_2 + 1] = hModifier
    end
end
function RemoveModifierEvents(hModifier, iModifierEvent, hSource, hTarget)
    if IsValid(hTarget) or IsValid(hSource) then
        if IsValid(hSource) then
            if type(hSource.tSourceModifierEvents) == "nil" then
                hSource.tSourceModifierEvents = {}
            end
            if type(hSource.tSourceModifierEvents[iModifierEvent]) == "nil" then
                hSource.tSourceModifierEvents[iModifierEvent] = {}
            end
            ArrayRemove(hSource.tSourceModifierEvents[iModifierEvent], hModifier)
        end
        if IsValid(hTarget) then
            if type(hTarget.tTargetModifierEvents) == "nil" then
                hTarget.tTargetModifierEvents = {}
            end
            if type(hTarget.tTargetModifierEvents[iModifierEvent]) == "nil" then
                hTarget.tTargetModifierEvents[iModifierEvent] = {}
            end
            ArrayRemove(hTarget.tTargetModifierEvents[iModifierEvent], hModifier)
        end
    else
        if _G.tModifierEvents == nil then
            _G.tModifierEvents = {}
        end
        if type(tModifierEvents[iModifierEvent]) == "nil" then
            tModifierEvents[iModifierEvent] = {}
        end
        ArrayRemove(tModifierEvents[iModifierEvent], hModifier)
    end
end
function FireModifierEvent(iModifierEvent, params, hSource, hTarget)
    local sFunctionName = EOMModifierEventsFunctionName[iModifierEvent]
    if IsValid(hSource) then
        local ____opt_3 = hSource.tSourceModifierEvents
        local aModifiers = ____opt_3 and ____opt_3[iModifierEvent]
        if aModifiers then
            for i = #aModifiers - 1, 0, -1 do
                local hModifier = aModifiers[i + 1]
                if not IsValid(hSource) then
                    break
                end
                if IsValid(hModifier) and type(hModifier[sFunctionName]) == "function" then
                    hModifier[sFunctionName](hModifier, params)
                else
                    table.remove(aModifiers, i + 1)
                end
            end
        end
    end
    if IsValid(hTarget) then
        local ____opt_5 = hTarget.tTargetModifierEvents
        local aModifiers = ____opt_5 and ____opt_5[iModifierEvent]
        if aModifiers then
            for i = #aModifiers - 1, 0, -1 do
                local hModifier = aModifiers[i + 1]
                if not IsValid(hTarget) then
                    break
                end
                if IsValid(hModifier) and type(hModifier[sFunctionName]) == "function" then
                    hModifier[sFunctionName](hModifier, params)
                else
                    table.remove(aModifiers, i + 1)
                end
            end
        end
    end
    local aModifiers = tModifierEvents and tModifierEvents[iModifierEvent]
    if aModifiers then
        for i = #aModifiers - 1, 0, -1 do
            local hModifier = aModifiers[i + 1]
            if IsValid(hModifier) and type(hModifier[sFunctionName]) == "function" then
                hModifier[sFunctionName](hModifier, params)
            else
                table.remove(aModifiers, i + 1)
            end
        end
    end
end
