/** @noSelfInFile */

declare interface CDOTABaseAbility {
	behavior?: DOTA_ABILITY_BEHAVIOR,
	searchBehavior?: AI_SEARCH_BEHAVIOR,
	aoeRadius?: number,
	startWidth?: number,
	endWidth?: number,
	targetTeam?: DOTA_UNIT_TARGET_TEAM,
	targetType?: DOTA_UNIT_TARGET_TYPE,
	targetFlags?: DOTA_UNIT_TARGET_FLAGS,
	funcSortFunction?: (a: CDOTA_BaseNPC, b: CDOTA_BaseNPC) => boolean,
	funcCondition?: (this: CDOTA_Ability_Lua) => boolean,
	funcUnitsCallback?: (this: CDOTA_Ability_Lua, tTargets: CDOTA_BaseNPC[]) => CDOTA_BaseNPC[],
	isNotPassive?: boolean,
	orderType?: FindOrder,

	SaveData(key: string, value: any): void;
	LoadData<T>(key: string, defaultValue: T): T;
	/**
	 * 技能是否准备就绪可以施放
	 * @serverOnly
	 */
	IsAbilityReady(): boolean;
	/**
	 * 技能是否是可以触发技能施法事件
	 */
	CanProcsCast(): boolean;
	/** 减少冷却 */
	ReduceCooldown(reduce: number): void;
}
let DOTABaseAbility = IsServer() ? CDOTABaseAbility : C_DOTABaseAbility;
DOTABaseAbility.IsAbility = function () {
	return true;
};
DOTABaseAbility.SaveData = function (key, value) {
	if (!IsValid(this)) return;
	const caster = this.GetCaster();
	if (!IsValid(caster)) return;
	caster.SaveData(this.GetAbilityName() + key, value);
};
DOTABaseAbility.LoadData = function (key, defaultValue) {
	const caster = this.GetCaster();
	return caster._saveData_?.[this.GetAbilityName() + key] ?? defaultValue;
};

//********************************************************************************
// Server
//********************************************************************************
CDOTABaseAbility.IsAbilityReady = function () {
	const hCaster = this.GetCaster();
	const iBehavior = this.GetBehaviorInt();

	if (!IsValid(hCaster)) {
		return false;
	}

	if (!(hCaster.IsAlive() || (iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNRESTRICTED) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNRESTRICTED)) {
		return false;
	}

	const hAbility = hCaster.GetCurrentActiveAbility();
	if (IsValid(hAbility) && hAbility.IsInAbilityPhase()) {
		return false;
	}

	if (this.GetLevel() <= 0) {
		return false;
	}

	if (this.IsHidden()) {
		return false;
	}

	if (!this.IsActivated()) {
		return false;
	}

	if (!this.IsCooldownReady()) {
		return false;
	}

	if (!this.IsOwnersManaEnough()) {
		return false;
	}

	if (!this.IsOwnersGoldEnough(hCaster.GetPlayerOwnerID())) {
		return false;
	}

	if (hCaster.IsHexed() || hCaster.IsCommandRestricted()) {
		return false;
	}

	if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE) != DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_PSEUDO_QUEUE && hCaster.IsStunned()) {
		return false;
	}

	if (!this.IsItem() && !this.IsPassive() && hCaster.IsSilenced()) {
		return false;
	}

	if (!this.IsItem() && this.IsPassive() && hCaster.PassivesDisabled()) {
		return false;
	}

	if (this.IsItem() && !this.IsPassive() && hCaster.IsMuted()) {
		return false;
	}

	if ((iBehavior & (DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IMMEDIATE)) !== (DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IGNORE_CHANNEL + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_IMMEDIATE) && hCaster.IsChanneling()) {
		return false;
	}

	if (!this.IsFullyCastable()) {
		return false;
	}

	return true;
};

CDOTABaseAbility.CanProcsCast = function () {
	if (!IsValid(this)) {
		return false;
	}
	if (!this.IsAbility()) {
		return false;
	}
	if (this.IsItem()) {
		return false;
	}
	if (this.IsPassive()) {
		return false;
	}
	if (this.IsToggle()) {
		return false;
	}
	if (!this.ProcsMagicStick()) {
		return false;
	}
	return true;
};

CDOTABaseAbility.ReduceCooldown = function (reduce: number) {
	const remaining = this.GetCooldownTimeRemaining();
	this.EndCooldown();
	if (remaining > reduce) {
		this.StartCooldown(remaining - reduce);
	}
	this.RefreshCharges();
};