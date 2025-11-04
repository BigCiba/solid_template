/** @noSelfInFile */

declare interface CDOTA_BaseNPC {
	tSourceModifierEvents: Partial<Record<modifierfunction | EOMModifierEvents, CDOTA_Modifier_Lua[]>> | undefined;
	tTargetModifierEvents: Partial<Record<modifierfunction | EOMModifierEvents, CDOTA_Modifier_Lua[]>> | undefined;
}

/**
 * EOMModifier自定义事件
 */
enum EOMModifierEvents {
	MODIFIER_EVENT_ON_ATTACK_START_CUSTOM = EOMModifierFunction.EOM_MODIFIER_PROPERTY_LAST + 1,
	MODIFIER_EVENT_ON_TREE_CUT_DOWN,
	MODIFIER_EVENT_ON_CRITICAL_STRIKE,
	MODIFIER_EVENT_ON_KNOCKBACK,
	MODIFIER_EVENT_ON_KNOCKBACK_END,
	MODIFIER_EVENT_ON_HERO_LEVEL_UP,
	MODIFIER_EVENT_ON_DASH,
	MODIFIER_EVENT_ON_DASH_END,
	MODIFIER_EVENT_ON_DEATH_END,
	MODIFIER_EVENT_ON_HERO_TELEPORTED,
	MODIFIER_EVENT_ON_SUMMON,
	MODIFIER_EVENT_ON_TAKE_PHYSICAL_DAMAGE,
	MODIFIER_EVENT_ON_TAKE_MAGICAL_DAMAGE,
	MODIFIER_EVENT_ON_TAKE_PURE_DAMAGE,
	MODIFIER_EVENT_ON_DAMAGE_FINISHED,
	MODIFIER_EVENT_ON_DIALOG_EVENT_ABILITY_CAST,
	/** 可以额外攻击的攻击发出事件 */
	MODIFIER_EVENT_ON_ATTACK_CANEXTENDATTACK,
	MODIFIER_EVENT_ON_ATTACK_START_ANIMATION,
	/** 生命恢复事件 */
	MODIFIER_EVENT_ON_HP_REGEN,
	/** 治疗事件 */
	MODIFIER_EVENT_ON_HEAL,
	/** 吸血事件 */
	MODIFIER_EVENT_ON_LIFESTEAL,
	/** 伤害事件之前，可以对伤害表进行修改 */
	MODIFIER_EVENT_ON_PRE_DAMAGE_PROCESS,
	/** 攻击扣血完成后 */
	MODIFIER_EVENT_ON_ATTACK_COMPLETE,
	/** 资源变更 */
	MODIFIER_EVENT_ON_RESOURCE_CHANGE,
	/** 伤害扣血之前 */
	MODIFIER_EVENT_ON_DAMAGE_BEFORE_HEALTH_MODIFIED,
	/** 伤害计算护盾之前之前 */
	MODIFIER_EVENT_ON_TAKEDAMAGE_BEFORE_BARRIER,
	/** 完成火之试炼 */
	MODIFIER_EVENT_ON_FIRE_TRIAL_COMPLETE,
	/** 触发眩晕，不一定成功眩晕 */
	MODIFIER_EVENT_ON_STUN,
	/** 被眩晕，代表成功被眩晕 */
	MODIFIER_EVENT_ON_STUNNED,
	/** 冻伤 */
	MODIFIER_EVENT_ON_CHILL,
	/** 触发冻结，不一定成功冻结 */
	MODIFIER_EVENT_ON_FREEZE,
	/** 被冻结，代表成功被冻结 */
	MODIFIER_EVENT_ON_FROZEN,
	/** 添加护盾 */
	MODIFIER_EVENT_ON_BARRIER_ADDED,
	/** 护盾破坏 */
	MODIFIER_EVENT_ON_BARRIER_DESTROYED,
	/** 护盾抵挡伤害 */
	MODIFIER_EVENT_ON_BARRIER_BLOCK,
	/** 感电 */
	MODIFIER_EVENT_ON_ELECTRIFICATION,
	/** 反击 */
	MODIFIER_EVENT_ON_COUNTER
}

/**
 * EOMModifier自定义事件对应的函数名
 */
const EOMModifierEventsFunctionName: Partial<Record<EOMModifierEvents | modifierfunction, string>> = {
	// 官方事件
	[modifierfunction.MODIFIER_EVENT_ON_SPELL_TARGET_READY]: "OnSpellTargetReady",
	[modifierfunction.MODIFIER_EVENT_ON_ATTACK_RECORD]: "OnAttackRecord",
	[modifierfunction.MODIFIER_EVENT_ON_ATTACK_START]: "OnAttackStart",
	[modifierfunction.MODIFIER_EVENT_ON_ATTACK]: "OnAttack",
	[modifierfunction.MODIFIER_EVENT_ON_ATTACK_LANDED]: "OnAttackLanded",
	[modifierfunction.MODIFIER_EVENT_ON_ATTACK_FAIL]: "OnAttackFail",
	[modifierfunction.MODIFIER_EVENT_ON_ATTACK_ALLIED]: "OnAttackAllied",
	[modifierfunction.MODIFIER_EVENT_ON_PROJECTILE_DODGE]: "OnProjectileDodge",
	[modifierfunction.MODIFIER_EVENT_ON_ORDER]: "OnOrder",
	[modifierfunction.MODIFIER_EVENT_ON_UNIT_MOVED]: "OnUnitMoved",
	[modifierfunction.MODIFIER_EVENT_ON_ABILITY_START]: "OnAbilityStart",
	[modifierfunction.MODIFIER_EVENT_ON_ABILITY_EXECUTED]: "OnAbilityExecuted",
	[modifierfunction.MODIFIER_EVENT_ON_ABILITY_FULLY_CAST]: "OnAbilityFullyCast",
	[modifierfunction.MODIFIER_EVENT_ON_BREAK_INVISIBILITY]: "OnBreakInvisibility",
	[modifierfunction.MODIFIER_EVENT_ON_ABILITY_END_CHANNEL]: "OnAbilityEndChannel",
	// [modifierfunction.MODIFIER_EVENT_ON_PROCESS_UPGRADE]: "",
	// [modifierfunction.MODIFIER_EVENT_ON_REFRESH]: "",
	[modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE]: "OnTakeDamage",
	[modifierfunction.MODIFIER_EVENT_ON_DEATH_PREVENTED]: "OnDamagePrevented",
	[modifierfunction.MODIFIER_EVENT_ON_STATE_CHANGED]: "OnStateChanged",
	// [modifierfunction.MODIFIER_EVENT_ON_ORB_EFFECT]: "",
	[modifierfunction.MODIFIER_EVENT_ON_PROCESS_CLEAVE]: "OnProcessCleave",
	[modifierfunction.MODIFIER_EVENT_ON_DAMAGE_CALCULATED]: "OnDamageCalculated",
	[modifierfunction.MODIFIER_EVENT_ON_MAGIC_DAMAGE_CALCULATED]: "OnMagicDamageCalculated",
	[modifierfunction.MODIFIER_EVENT_ON_ATTACKED]: "OnAttacked",
	[modifierfunction.MODIFIER_EVENT_ON_DEATH]: "OnDeath",
	[modifierfunction.MODIFIER_EVENT_ON_RESPAWN]: "OnRespawn",
	[modifierfunction.MODIFIER_EVENT_ON_SPENT_MANA]: "OnSpentMana",
	[modifierfunction.MODIFIER_EVENT_ON_TELEPORTING]: "OnTeleporting",
	[modifierfunction.MODIFIER_EVENT_ON_TELEPORTED]: "OnTeleported",
	[modifierfunction.MODIFIER_EVENT_ON_SET_LOCATION]: "OnSetLocation",
	[modifierfunction.MODIFIER_EVENT_ON_HEALTH_GAINED]: "OnHealthGained",
	[modifierfunction.MODIFIER_EVENT_ON_MANA_GAINED]: "OnManaGained",
	[modifierfunction.MODIFIER_EVENT_ON_TAKEDAMAGE_KILLCREDIT]: "OnTakeDamageKillCredit",
	[modifierfunction.MODIFIER_EVENT_ON_HERO_KILLED]: "OnHeroKilled",
	[modifierfunction.MODIFIER_EVENT_ON_HEAL_RECEIVED]: "OnHealReceived",
	[modifierfunction.MODIFIER_EVENT_ON_BUILDING_KILLED]: "OnBuildingKilled",
	[modifierfunction.MODIFIER_EVENT_ON_MODEL_CHANGED]: "OnModelChanged",
	[modifierfunction.MODIFIER_EVENT_ON_MODIFIER_ADDED]: "OnModifierAdded",
	[modifierfunction.MODIFIER_EVENT_ON_DOMINATED]: "OnDominated",
	[modifierfunction.MODIFIER_EVENT_ON_ASSIST]: "OnAssist",
	[modifierfunction.MODIFIER_EVENT_ON_ATTACK_FINISHED]: "OnAttackFinished",
	[modifierfunction.MODIFIER_EVENT_ON_ATTACK_RECORD_DESTROY]: "OnAttackRecordDestroy",
	[modifierfunction.MODIFIER_EVENT_ON_PROJECTILE_OBSTRUCTION_HIT]: "OnProjectileObstructionHit",
	[modifierfunction.MODIFIER_EVENT_ON_PREDEBUFF_APPLIED]: "OnPreDebuffApplied",

	// 自定义事件
	[EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_START_CUSTOM]: "OnAttackStartCustom",
	[EOMModifierEvents.MODIFIER_EVENT_ON_TREE_CUT_DOWN]: "OnCustomTreeCutDown",
	[EOMModifierEvents.MODIFIER_EVENT_ON_CRITICAL_STRIKE]: "OnCriticalStrike",
	[EOMModifierEvents.MODIFIER_EVENT_ON_KNOCKBACK]: "OnKnockback",
	[EOMModifierEvents.MODIFIER_EVENT_ON_KNOCKBACK_END]: "OnKnockbackEnd",
	[EOMModifierEvents.MODIFIER_EVENT_ON_HERO_LEVEL_UP]: "OnHeroLevelUp",
	[EOMModifierEvents.MODIFIER_EVENT_ON_DASH]: "OnDash",
	[EOMModifierEvents.MODIFIER_EVENT_ON_DASH_END]: "OnDashEnd",
	[EOMModifierEvents.MODIFIER_EVENT_ON_DEATH_END]: "OnDeathEnd",
	[EOMModifierEvents.MODIFIER_EVENT_ON_HERO_TELEPORTED]: "OnHeroTeleported",
	[EOMModifierEvents.MODIFIER_EVENT_ON_SUMMON]: "OnSummon",
	[EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_PHYSICAL_DAMAGE]: "OnTakePhysicalDamage",
	[EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_MAGICAL_DAMAGE]: "OnTakeMagicalDamage",
	[EOMModifierEvents.MODIFIER_EVENT_ON_TAKE_PURE_DAMAGE]: "OnTakePureDamage",
	[EOMModifierEvents.MODIFIER_EVENT_ON_DAMAGE_FINISHED]: "OnDamageFinished",
	[EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_CANEXTENDATTACK]: "OnAttackCanExtendAttack",
	[EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_START_ANIMATION]: "OnAttackStartAnimation",
	[EOMModifierEvents.MODIFIER_EVENT_ON_HP_REGEN]: "OnHPRegen",
	[EOMModifierEvents.MODIFIER_EVENT_ON_HEAL]: "OnHeal",
	[EOMModifierEvents.MODIFIER_EVENT_ON_LIFESTEAL]: "OnLifeSteal",
	[EOMModifierEvents.MODIFIER_EVENT_ON_PRE_DAMAGE_PROCESS]: "OnPreDamageProcess",
	[EOMModifierEvents.MODIFIER_EVENT_ON_DIALOG_EVENT_ABILITY_CAST]: "OnDialogEventAbilityCast",
	[EOMModifierEvents.MODIFIER_EVENT_ON_ATTACK_COMPLETE]: "OnAttackComplete",
	[EOMModifierEvents.MODIFIER_EVENT_ON_RESOURCE_CHANGE]: "OnResourceChange",
	[EOMModifierEvents.MODIFIER_EVENT_ON_DAMAGE_BEFORE_HEALTH_MODIFIED]: "OnDamageBeforeHealthModified",
	[EOMModifierEvents.MODIFIER_EVENT_ON_TAKEDAMAGE_BEFORE_BARRIER]: "OnTakeDamageBeforeBarrier",
	[EOMModifierEvents.MODIFIER_EVENT_ON_FIRE_TRIAL_COMPLETE]: "OnFireTrialComplete",
	[EOMModifierEvents.MODIFIER_EVENT_ON_STUN]: "OnStun",
	[EOMModifierEvents.MODIFIER_EVENT_ON_STUNNED]: "OnStunned",
	[EOMModifierEvents.MODIFIER_EVENT_ON_CHILL]: "OnChill",
	[EOMModifierEvents.MODIFIER_EVENT_ON_FREEZE]: "OnFreeze",
	[EOMModifierEvents.MODIFIER_EVENT_ON_FROZEN]: "OnFrozen",
	[EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_ADDED]: "OnShieldAdded",
	[EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_DESTROYED]: "OnCustomShieldDestroyed",
	[EOMModifierEvents.MODIFIER_EVENT_ON_BARRIER_BLOCK]: "OnShieldBlock",
	[EOMModifierEvents.MODIFIER_EVENT_ON_ELECTRIFICATION]: "OnElectrification",
	[EOMModifierEvents.MODIFIER_EVENT_ON_COUNTER]: "OnCounter",
};

function AddModifierEvents(hModifier: CDOTA_Modifier_Lua, iModifierEvent: modifierfunction | EOMModifierEvents, hSource?: CDOTA_BaseNPC, hTarget?: CDOTA_BaseNPC) {
	if (IsValid(hTarget) || IsValid(hSource)) {
		if (IsValid(hSource)) {
			if (typeof hSource.tSourceModifierEvents == "undefined") {
				hSource.tSourceModifierEvents = {};
			}
			if (typeof hSource.tSourceModifierEvents[iModifierEvent] == "undefined") {
				hSource.tSourceModifierEvents[iModifierEvent] = [];
			}

			hSource.tSourceModifierEvents[iModifierEvent]!.push(hModifier);
		}
		if (IsValid(hTarget)) {
			if (typeof hTarget.tTargetModifierEvents == "undefined") {
				hTarget.tTargetModifierEvents = {};
			}
			if (typeof hTarget.tTargetModifierEvents[iModifierEvent] == "undefined") {
				hTarget.tTargetModifierEvents[iModifierEvent] = [];
			}

			hTarget.tTargetModifierEvents[iModifierEvent]!.push(hModifier);
		}
	} else {
		if (_G.tModifierEvents == undefined) {
			_G.tModifierEvents = {};
		}
		if (typeof tModifierEvents![iModifierEvent] == "undefined") {
			tModifierEvents![iModifierEvent] = [];
		}
		tModifierEvents![iModifierEvent]!.push(hModifier);
	}
}

function RemoveModifierEvents(hModifier: CDOTA_Modifier_Lua, iModifierEvent: modifierfunction | EOMModifierEvents, hSource?: CDOTA_BaseNPC, hTarget?: CDOTA_BaseNPC) {
	if (IsValid(hTarget) || IsValid(hSource)) {
		if (IsValid(hSource)) {
			if (typeof hSource.tSourceModifierEvents == "undefined") {
				hSource.tSourceModifierEvents = {};
			}
			if (typeof hSource.tSourceModifierEvents[iModifierEvent] == "undefined") {
				hSource.tSourceModifierEvents[iModifierEvent] = [];
			}

			ArrayRemove(hSource.tSourceModifierEvents[iModifierEvent]!, hModifier);
		}
		if (IsValid(hTarget)) {
			if (typeof hTarget.tTargetModifierEvents == "undefined") {
				hTarget.tTargetModifierEvents = {};
			}
			if (typeof hTarget.tTargetModifierEvents[iModifierEvent] == "undefined") {
				hTarget.tTargetModifierEvents[iModifierEvent] = [];
			}

			ArrayRemove(hTarget.tTargetModifierEvents[iModifierEvent]!, hModifier);
		}
	} else {
		if (_G.tModifierEvents == undefined) {
			_G.tModifierEvents = {};
		}
		if (typeof tModifierEvents![iModifierEvent] == "undefined") {
			tModifierEvents![iModifierEvent] = [];
		}
		ArrayRemove(tModifierEvents![iModifierEvent]!, hModifier);
	}
}


function FireModifierEvent(iModifierEvent: modifierfunction | EOMModifierEvents, params?: any, hSource?: CDOTA_BaseNPC, hTarget?: CDOTA_BaseNPC) {
	let sFunctionName = EOMModifierEventsFunctionName[iModifierEvent];
	if (IsValid(hSource)) {
		let aModifiers = hSource.tSourceModifierEvents?.[iModifierEvent];
		if (aModifiers) {
			for (const i of $range(aModifiers.length - 1, 0, -1)) {
				const hModifier = aModifiers[i];
				if (!IsValid(hSource)) {
					break;
				}

				if (IsValid(hModifier) && typeof hModifier[sFunctionName as keyof CDOTA_Modifier_Lua] == "function") {
					// @ts-ignore
					hModifier[sFunctionName](params);
				} else {
					table.remove(aModifiers, i + 1);
				}
			}
		}
	}
	if (IsValid(hTarget)) {
		let aModifiers = hTarget.tTargetModifierEvents?.[iModifierEvent];
		if (aModifiers) {
			for (const i of $range(aModifiers.length - 1, 0, -1)) {
				const hModifier = aModifiers[i];
				if (!IsValid(hTarget)) {
					break;
				}

				if (IsValid(hModifier) && typeof hModifier[sFunctionName as keyof CDOTA_Modifier_Lua] == "function") {
					// @ts-ignore
					hModifier[sFunctionName](params);
				} else {
					table.remove(aModifiers, i + 1);
				}
			}
		}
	}
	let aModifiers = tModifierEvents?.[iModifierEvent];
	if (aModifiers) {
		for (const i of $range(aModifiers.length - 1, 0, -1)) {
			const hModifier = aModifiers[i];
			if (IsValid(hModifier) && typeof hModifier[sFunctionName as keyof CDOTA_Modifier_Lua] == "function") {
				// @ts-ignore
				hModifier[sFunctionName](params);
			} else {
				table.remove(aModifiers, i + 1);
			}
		}
	}
}