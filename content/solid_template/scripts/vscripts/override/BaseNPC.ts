//********************************************************************************
// Both
//********************************************************************************
declare interface CDOTA_BaseNPC {
	IsFriendly(target: CDOTA_BaseNPC): boolean;
	GetManaPercent(): number;
}

let BaseNPC = IsServer() ? CDOTA_BaseNPC : C_DOTA_BaseNPC;
BaseNPC.IsFriendly = function (hTarget: CDOTA_BaseNPC) {
	if (IsValid(this) && IsValid(hTarget)) {
		return this.GetTeamNumber() == hTarget.GetTeamNumber();
	}
	return false;
};

//********************************************************************************
// Server
//********************************************************************************
declare interface CDOTA_BaseNPC {
	/** @private */
	EmitSound_Engine: typeof CDOTA_BaseNPC.EmitSound;
	/** @private */
	AddAbility_Engine: typeof CDOTA_BaseNPC.AddAbility;
	/** @private */
	RespawnUnit_Engine: typeof CDOTA_BaseNPC.RespawnUnit;
	/** @private */
	AddNewModifier_Engine: typeof CDOTA_BaseNPC.AddNewModifier;
	GetAttachmentPosition(attachmentName: string): Vector;
}
if (IsServer()) {
	CDOTA_BaseNPC.EmitSound_Engine ??= CDOTA_BaseNPC.EmitSound;
	CDOTA_BaseNPC.EmitSound = function (sound: string, position?: Vector) {
		if (position) {
			EmitSoundOnLocationWithCaster(position, sound, this);
		} else {
			this.EmitSound_Engine(sound);
		}
	};

	CDOTA_BaseNPC.AddAbility_Engine ??= CDOTA_BaseNPC.AddAbility;
	CDOTA_BaseNPC.AddAbility = function (abilityName: string, level?: number) {
		let ability = this.AddAbility_Engine(abilityName);
		if (level != undefined && IsValid(ability)) {
			ability.SetLevel(level);
		}
		return ability;
	};

	CDOTA_BaseNPC.GetAttachmentPosition = function (attachName: string) {
		if (!IsValid(this)) return vec3_zero;
		return this.GetAttachmentOrigin(this.ScriptLookupAttachment(attachName));
	};

	CDOTA_BaseNPC.RespawnUnit_Engine ??= CDOTA_BaseNPC.RespawnUnit;
	CDOTA_BaseNPC.RespawnUnit = function () {
		if (!this.UnitCanRespawn()) return;
		let model = this.FirstMoveChild();
		while (model != undefined) {
			let next = model.NextMovePeer();
			if (model != undefined && model.GetClassname() != "" && model.GetClassname() == "dota_item_wearable") {
				UTIL_Remove(model);
			}
			model = next;
		}
		this.RespawnUnit_Engine();
	};
	CDOTA_BaseNPC.AddNewModifier = function (caster, ability, modifierName, modifierTable: any, flags?: AddModifierFlag) {
		if (flags != undefined) {
			// 无视死亡添加，但是不能同步到客户端
			if (IsValid(this) && (flags & AddModifierFlag.IGNORE_DEATH) == AddModifierFlag.IGNORE_DEATH) {
				let isDead = !this.IsAlive();
				let modifier = undefined;
				if (isDead) {
					this.SetHealth(1);
				}
				modifier = this.AddNewModifier_Engine(caster, ability, modifierName, modifierTable);
				if (isDead) {
					this.SetHealth(0);
				}
				return modifier;
			}
		}
		return this.AddNewModifier_Engine(caster, ability, modifierName, modifierTable);
	};
}
