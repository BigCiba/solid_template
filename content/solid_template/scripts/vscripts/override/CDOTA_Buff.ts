/** @noSelfInFile */
interface ModifierEvent {
	attacker?: CDOTA_BaseNPC;
	caster?: CDOTA_BaseNPC;
	unit?: CDOTA_BaseNPC;
	target?: CDOTA_BaseNPC;
	ability?: CDOTABaseAbility;
	inflictor?: CDOTABaseAbility;
	damage: number;
	damage_type: DAMAGE_TYPES;
	damage_category: DamageCategory_t;
	damage_flags: DOTADamageFlag_t;
	original_damage: number;
	ranged_attack: boolean;
	no_attack_cooldown: boolean;
	record: number;
	fail_type: attackfail;
	do_not_consume?: boolean;
	report_max?: boolean;
	eom_flags?: EOM_DAMAGE_FLAGS;
	attack_states?: ATTACK_STATES;
	itemname?: string;
	gain?: number;
	unitname?: string;
	player_id?: PlayerID;
	loots?: string[];
}
declare interface CDOTA_Buff {
	/**
	 * 获取buff来源技能当前等级键值，如获取不到则会返回0
	 * @param sKey 键名
	 * @returns 值
	 */
	GetAbilitySpecialValueFor(sKey: string): number;
	/**
	 * 获取buff来源技能等级键值，如获取不到则会返回0
	 * @param sKey 键名
	 * @param iLevel 等级，-1为取当前等级，1级填值为0
	 * @returns 值
	 */
	GetAbilityLevelSpecialValueFor(sKey: string, iLevel: number): number;

	/** 伪随机 */
	PRD(chance: number, pseudo_random_recording?: string): boolean;
	/** 增加层数 */
	IncrementStackCount_Engine: typeof CDOTA_Buff.IncrementStackCount;
	IncrementStackCount(iStackCount?: number): void;
	/** 减少层数 */
	DecrementStackCount_Engine: typeof CDOTA_Buff.DecrementStackCount;
	DecrementStackCount(iStackCount?: number): void;
	/** 存Think的表，StartThink用到 */
	_ThinkList: Record<string, string>;
	/**
	 * 自定义的计时器，方便开多个，回调OnThink，name不填默认是buff的名字
	 * @serverOnly
	 */
	StartThink(interval: number, name?: string, callback?: (name: string) => void): void;
	/**
	 * 自定义的计时器的回调
	 * @serverOnly
	 */
	OnThink(name: string): void;
}

CDOTA_Buff.GetAbilitySpecialValueFor = function (sKey: string) {
	if (!IsValid(this)) return 0;
	// @ts-ignore
	let ability = (this.ability as CDOTABaseAbility | undefined) ?? this.GetAbility();
	// @ts-ignore
	if (!IsValid(ability)) return this[sKey] ?? 0;
	let level = ability.GetLevel() - 1;
	if (level == -1) return 0;
	let caster: CDOTA_BaseNPC | undefined = ability.GetCaster();
	if (!IsValid(caster)) {
		caster = this.GetCaster();
	}
	if (!IsValid(caster)) return 0;
	// return AbilityValues.GetAbilityLevelSpecialValueFor(ability.GetAbilityName(), sKey, level, caster, undefined, AbilityValues.GetAbilityOverrideAbilityValue(ability.entindex(), sKey));
	return ability.GetSpecialValueFor(sKey);
};
CDOTA_Buff.GetAbilityLevelSpecialValueFor = function (sKey: string, iLevel: number) {
	if (!IsValid(this)) return 0;
	// @ts-ignore
	let ability = (this.ability as CDOTABaseAbility | undefined) ?? this.GetAbility();
	// @ts-ignore
	if (!IsValid(ability)) return this[sKey] ?? 0;
	return ability.GetLevelSpecialValueFor(sKey, iLevel);
};
CDOTA_Buff.PRD = function (chance, pseudo_random_recording) {
	// @ts-ignore
	return PRD(this.GetCaster(), chance, pseudo_random_recording ?? this.GetName());
};
if (CDOTA_Buff.IncrementStackCount_Engine == undefined) {
	CDOTA_Buff.IncrementStackCount_Engine = CDOTA_Buff.IncrementStackCount;
}
CDOTA_Buff.IncrementStackCount = function (iStackCount?: number) {
	if (iStackCount == undefined) {
		this.IncrementStackCount_Engine();
	} else {
		this.SetStackCount(this.GetStackCount() + iStackCount);
	}
};
if (CDOTA_Buff.DecrementStackCount_Engine == undefined) {
	CDOTA_Buff.DecrementStackCount_Engine = CDOTA_Buff.DecrementStackCount;
}
CDOTA_Buff.DecrementStackCount = function (iStackCount?: number) {
	if (iStackCount == undefined) {
		this.DecrementStackCount_Engine();
	} else {
		this.SetStackCount(this.GetStackCount() - iStackCount);
	}
};
CDOTA_Buff.StartThink = function (interval: number, name?: string, callback?: (name: string) => void) {
	if (IsServer()) {
		const timerName = name ?? this.GetName();
		if (this._ThinkList == undefined) {
			this._ThinkList = {};
		}
		// 传入-1停止计时器
		if (interval == -1) {
			if (this._ThinkList[timerName]) {
				Timer.StopTimer(this._ThinkList[timerName]);
				// @ts-ignore
				this._ThinkList[timerName] = undefined;
			}
			return;
		}
		// 停止同名计时器
		if (this._ThinkList[timerName] != undefined) {
			Timer.StopTimer(this._ThinkList[timerName]);
		}
		const index = Timer.StartIntervalThink(this, interval, () => {
			if (callback != undefined) {
				callback(timerName);
			}
			if (this.OnThink != undefined) {
				this.OnThink(timerName);
			}
		});
		this._ThinkList[timerName] = index;
	}
};