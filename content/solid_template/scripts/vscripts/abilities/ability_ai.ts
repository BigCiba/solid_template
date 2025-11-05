import { EOMAbility } from "./eom_ability";

export interface EOMAbilityAI {
	startCooldown: number;
	behavior: DOTA_ABILITY_BEHAVIOR,
	searchBehavior: AI_SEARCH_BEHAVIOR,
	aoeRadius: number,
	startWidth: number,
	endWidth: number,
	targetTeam: DOTA_UNIT_TARGET_TEAM,
	targetType: DOTA_UNIT_TARGET_TYPE,
	targetFlags: DOTA_UNIT_TARGET_FLAGS,
	funcSortFunction: (a: CDOTA_BaseNPC, b: CDOTA_BaseNPC) => boolean,
	funcCondition: (this: CDOTA_Ability_Lua) => boolean,
	funcUnitsCallback: (this: CDOTA_Ability_Lua, tTargets: CDOTA_BaseNPC[]) => CDOTA_BaseNPC[],
	isNotPassive: boolean,
	orderType: FindOrder,

}
export class EOMAbilityAI extends EOMAbility {
	aiTimer: string | undefined;
	Spawn() {
		if (IsServer()) {
			this.ParseBehavior();
			this._StartThink();
		}
	}
	// 解析技能行为
	ParseBehavior() {
		// 主动技能解析技能行为
		if (!this.IsPassive() && this.behavior == undefined) {
			const behavior = this.GetBehaviorInt();
			if ((behavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) {
				this.behavior = DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET;
			} else if ((behavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
				this.behavior = DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET;
			} else if ((behavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) {
				this.behavior = DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT;
			}
		}
		// 初始化参数
		this.targetTeam = this.targetTeam ?? this.GetAbilityTargetTeam();
		this.targetType = this.targetType ?? this.GetAbilityTargetType();
		this.targetFlags = this.targetFlags ?? this.GetAbilityTargetFlags();
		if (this.targetTeam == DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_NONE) {
			this.targetTeam = DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY;
		}
		if (this.targetType == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_NONE) {
			this.targetType = DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BASIC;
		}
	}
	/** 开启AI Think */
	_StartThink() {
		this._StopThink();
		const hCaster = this.GetCaster();
		if (HasState(hCaster, EOMModifierState.AI_DISABLED)) {
			return AI_TIMER_TICK_TIME;
		}
		if (this.behavior == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) {
			this.aiTimer = this.GameTimer(0, () => {
				if (this._IsReady()) {
					if (this.funcCondition != undefined && this.funcCondition() != true) {
						return AI_TIMER_TICK_TIME;
					}
					const aoeRadius = this.GetAOERadius();
					if (aoeRadius > 0) {
						const tTargets = FindUnitsInRadius(hCaster.GetTeamNumber(), hCaster.GetAbsOrigin(), undefined, this.GetAOERadius(), this.targetTeam, this.targetType, this.targetFlags, this.orderType, false);
						if (IsValid(tTargets[0])) {
							this._CastAbilityNoTarget();
						}
					} else {
						this._CastAbilityNoTarget();
					}
				}
				return AI_TIMER_TICK_TIME;
			});
		} else if (this.behavior == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) {
			this.aiTimer = this.GameTimer(0, () => {
				if (this._IsReady()) {
					if (this.funcCondition != undefined && this.funcCondition() != true) {
						return AI_TIMER_TICK_TIME;
					}
					const flCastRange = this.GetEffectiveCastRange(vec3_invalid, undefined as any);
					let vPosition = vec3_invalid;
					if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE) {
						let tTargets = FindUnitsInRadius(hCaster.GetTeamNumber(), hCaster.GetAbsOrigin(), undefined, flCastRange, this.targetTeam, this.targetType, this.targetFlags, this.orderType, false);
						if (this.funcSortFunction != undefined) {
							table.sort(tTargets, (a, b) => { return this.funcSortFunction(a, b); });
						}
						if (IsValid(tTargets[0])) {
							vPosition = tTargets[0].GetAbsOrigin();
						}
					} else if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET) {
						vPosition = GetAOEMostTargetsPosition(hCaster.GetAbsOrigin(), flCastRange, hCaster.GetTeamNumber(), this.GetAOERadius(), this.targetTeam, this.targetType, this.targetFlags, this.orderType);
					} else if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_LINE_TARGET) {
						vPosition = GetLinearMostTargetsPosition(hCaster.GetAbsOrigin(), flCastRange, hCaster.GetTeamNumber(), this.GetLinearStartWidth(), this.GetLinearEndWidth(), this.targetTeam, this.targetType, this.targetFlags, this.orderType, []);
					}
					if (vPosition != vec3_invalid) {
						this._CastAbilityOnPosition(vPosition);
					}
				}
				return AI_TIMER_TICK_TIME;
			});
		} else if (this.behavior == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
			this.aiTimer = this.GameTimer(0, () => {
				if (this._IsReady()) {
					if (this.funcCondition != undefined && this.funcCondition() != true) {
						return AI_TIMER_TICK_TIME;
					}
					const flCastRange = this.GetEffectiveCastRange(vec3_invalid, undefined as any);
					let hTarget;
					if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE) {
						let tTargets = FindUnitsInRadius(hCaster.GetTeamNumber(), hCaster.GetAbsOrigin(), undefined, flCastRange, this.targetTeam, this.targetType, this.targetFlags, this.orderType, false);
						if (this.funcSortFunction != undefined) {
							table.sort(tTargets, (a, b) => { return this.funcSortFunction(a, b); });
						}
						if (this.funcUnitsCallback != undefined) {
							tTargets = this.funcUnitsCallback(tTargets);
						}
						if (IsValid(tTargets[0])) {
							hTarget = tTargets[0];
						}
					} else if (this.searchBehavior == AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_MOST_AOE_TARGET) {
						hTarget = GetAOEMostTargetsSpellTarget(hCaster.GetAbsOrigin(), flCastRange, hCaster.GetTeamNumber(), this.GetAOERadius(), this.targetTeam, this.targetType, this.targetFlags, this.orderType);
					}
					if (hTarget) {
						this._CastAbilityOnTarget(hTarget);
					}
				}
				return AI_TIMER_TICK_TIME;
			});
		}
	}
	_StopThink() {
		if (this.aiTimer) {
			this.StopTimer(this.aiTimer);
			this.aiTimer = undefined;
		}
	}
	_CastAbilityNoTarget() {
		this.GetCaster().ExecuteOrder(dotaunitorder_t.DOTA_UNIT_ORDER_CAST_NO_TARGET, this);
	}
	_CastAbilityOnPosition(vPosition: Vector) {
		this.GetCaster().ExecuteOrder(dotaunitorder_t.DOTA_UNIT_ORDER_CAST_POSITION, this, vPosition);
	}
	_CastAbilityOnTarget(hTarget: CDOTA_BaseNPC) {
		this.GetCaster().ExecuteOrder(dotaunitorder_t.DOTA_UNIT_ORDER_CAST_TARGET, this, hTarget);
	}
	_IsReady() {
		if (this.IsAbilityReady()) {
			return true;
		}
		return false;
	}
	GetAOERadius() {
		return this.aoeRadius ?? 0;
	}
	GetLinearStartWidth() {
		return this.startWidth ?? 0;
	}
	GetLinearEndWidth() {
		return this.endWidth ?? 0;
	}
}