import { BaseModifier, BaseModifierMotionBoth, BaseModifierMotionHorizontal, BaseModifierMotionVertical, toDotaClassInstance } from "../../lib/dota_ts_adapter";

const EOMModifierSyncVarRegistry = new Map<Function, string[]>();

function registerSyncVar(ctor: Function, propertyKey: string) {
	let list = EOMModifierSyncVarRegistry.get(ctor);
	if (list == undefined) {
		list = [];
		EOMModifierSyncVarRegistry.set(ctor, list);
	}
	if (!list.includes(propertyKey)) {
		list.push(propertyKey);
	}
}

function collectSyncVarEntries(ctor: any): string[] {
	const fields: string[] = [];
	let current = ctor;
	while (current != undefined) {
		const list = EOMModifierSyncVarRegistry.get(current);
		if (list != undefined) {
			for (const name of list) {
				if (!fields.includes(name)) {
					fields.push(name);
				}
			}
		}
		current = current.____super;
	}
	return fields;
}

export function SyncVar(): PropertyDecorator {
	return (target, propertyKey) => {
		const ctor = (target as any).constructor as Function;
		if (ctor != undefined) {
			registerSyncVar(ctor, propertyKey as string);
		}
	};
}

interface easyModifierReturn {
	name: string,
	IsHidden: boolean,
	IsDebuff: boolean,
	IsPermanent: boolean,
	IsPurgable: boolean,
	IsPurgeException: boolean,
	IsStunDebuff: boolean,
	RemoveOnDeath: boolean,
	DestroyOnExpire: boolean,
	CanParentBeAutoAttacked: boolean,
	AllowIllusionDuplicate: boolean,
	GetAttributes: DOTAModifierAttribute_t,
	GetPriority: modifierpriority,

	IsAura: boolean;
	IsAuraActiveOnDeath: boolean;
	GetAuraDuration: number,
	GetAuraRadius: number,
	GetAuraSearchTeam: DOTA_UNIT_TARGET_TEAM,
	GetAuraSearchType: DOTA_UNIT_TARGET_TYPE,
	GetAuraSearchFlags: DOTA_UNIT_TARGET_FLAGS,
	GetModifierAura: string,

	GetEffectName: string,
	GetEffectAttachType: ParticleAttachment_t,
	ShouldUseOverheadOffset: boolean,
	GetHeroEffectName: string,
	HeroEffectPriority: number,
	GetStatusEffectName: string,
	StatusEffectPriority: number,
}
export const registerEOMModifier = (param?: Partial<easyModifierReturn>) => {
	let name = param?.name;
	return (modifier: new () => CDOTA_Modifier_Lua) => {
		if (name !== undefined) {
			// @ts-ignore
			modifier.name = name;
		} else {
			name = modifier.name;
		}

		const [env, source] = getFileScope();
		const [fileName] = string.gsub(source, ".*scripts[\\/]vscripts[\\/]", "");

		env[name] = {};

		toDotaClassInstance(env[name], modifier);

		let isEOMModifier = false;
		let type = LuaModifierType.LUA_MODIFIER_MOTION_NONE;
		let base = (modifier as any).____super;
		while (base) {
			if (!isEOMModifier && (base === EOMModifier || base === EOMModifierMotionBoth || base === EOMModifierMotionHorizontal || base === EOMModifierMotionVertical)) {
				isEOMModifier = true;
			}
			if (base === EOMModifierMotionBoth || base === BaseModifierMotionBoth) {
				type = LuaModifierType.LUA_MODIFIER_MOTION_BOTH;
				break;
			} else if (base === EOMModifierMotionHorizontal || base === BaseModifierMotionHorizontal) {
				type = LuaModifierType.LUA_MODIFIER_MOTION_HORIZONTAL;
				break;
			} else if (base === EOMModifierMotionVertical || base === BaseModifierMotionVertical) {
				type = LuaModifierType.LUA_MODIFIER_MOTION_VERTICAL;
				break;
			}

			base = base.____super;
		}

		const classType = env[name] as EOMModifier;
		const syncVarFields = collectSyncVarEntries(modifier);
		const originalGetAbilitySpecialValue: Function = classType.GetAbilitySpecialValue;
		const originalOnCreated = classType.OnCreated;
		classType.OnCreated = function (parameters: any) {
			(this as any).____constructor();
			this.parent = this.GetParent();
			this.caster = this.GetCaster();
			this.ability = this.GetAbility();
			this.name = name!;
			if (syncVarFields.length > 0 && IsServer()) {
				this.SetHasCustomTransmitterData(true);
			}
			if (originalGetAbilitySpecialValue !== undefined) {
				originalGetAbilitySpecialValue.call(this);
			}
			if (originalOnCreated !== undefined) {
				originalOnCreated.call(this, parameters);
			}
			if (isEOMModifier && originalOnCreated != EOMModifier.prototype.OnCreated) {
				EOMModifier.prototype.OnCreated.call(this, parameters);
			}
		};
		const originalOnRefresh = classType.OnRefresh;
		classType.OnRefresh = function (parameters: any) {
			this.caster = this.GetCaster();
			this.ability = this.GetAbility();
			if (originalGetAbilitySpecialValue !== undefined) {
				originalGetAbilitySpecialValue.call(this);
			}
			if (originalOnRefresh !== undefined) {
				originalOnRefresh.call(this, parameters);
			}
			if (isEOMModifier && originalOnRefresh != EOMModifier.prototype.OnRefresh) {
				EOMModifier.prototype.OnRefresh.call(this, parameters);
			}
		};
		const originalOnStackCountChanged = classType.OnStackCountChanged;
		classType.OnStackCountChanged = function (parameters: any) {
			if (originalGetAbilitySpecialValue !== undefined) {
				originalGetAbilitySpecialValue.call(this);
			}
			if (originalOnStackCountChanged !== undefined) {
				originalOnStackCountChanged.call(this, parameters);
			}
			if (isEOMModifier && originalOnStackCountChanged != EOMModifier.prototype.OnStackCountChanged) {
				EOMModifier.prototype.OnStackCountChanged.call(this, parameters);
			}
		};
		const originalOnDestroy = classType.OnDestroy;
		classType.OnDestroy = function () {
			if (originalOnDestroy !== undefined) {
				originalOnDestroy.call(this);
			}
			if (isEOMModifier && originalOnDestroy != EOMModifier.prototype.OnDestroy) {
				EOMModifier.prototype.OnDestroy.call(this);
			}
		};
		const originalGetTexture = classType.GetTexture;
		classType.GetTexture = function () {
			// if (_G._GetBuffProperties != undefined) {
			// 	let propertyValues: Record<string, any[]> = {};
			// 	for (let i = 0; i < _G._GetBuffProperties.length; i++) {
			// 		let property = _G._GetBuffProperties[i];
			// 		let value;
			// 		let iEOMModifierProperty = EOMModifierFunction[property as any] as any as EOMModifierFunction;
			// 		if (iEOMModifierProperty != undefined) {
			// 			let t = undefined;
			// 			if (iEOMModifierProperty == EOMModifierFunction.EOM_MODIFIER_PROPERTY_PHYSICAL_DAMAGE_BARRIER || iEOMModifierProperty == EOMModifierFunction.EOM_MODIFIER_PROPERTY_MAGICAL_DAMAGE_BARRIER || iEOMModifierProperty == EOMModifierFunction.EOM_MODIFIER_PROPERTY_DAMAGE_BARRIER) {
			// 				t = { do_not_consume: true };
			// 			}
			// 			// @ts-ignore
			// 			if (this._DeclareProperty?.[iEOMModifierProperty] != undefined) {
			// 				// @ts-ignore
			// 				value = this._DeclareProperty[iEOMModifierProperty](t);
			// 				// @ts-ignore
			// 			} else if (this._StaticProperty?.[iEOMModifierProperty] != undefined) {
			// 				// @ts-ignore
			// 				value = this._StaticProperty[iEOMModifierProperty];
			// 			}
			// 			if (MULTIPLE_ATTRIBUTE_PROPERTY[iEOMModifierProperty]) {
			// 				property = property + "[x]";
			// 			}
			// 		}
			// 		let modifierFunctionName = ModifierFunctions[property];
			// 		if (modifierFunctionName != undefined) {
			// 			let modifierFunction = this[modifierFunctionName as keyof EOMModifier];
			// 			if (typeof modifierFunction == "function") {
			// 				// @ts-ignore
			// 				value = modifierFunction.call(this);
			// 			}
			// 		}
			// 		if (value != undefined) {
			// 			if (propertyValues[property] == undefined) {
			// 				propertyValues[property] = [];
			// 			}
			// 			propertyValues[property].push(value);
			// 		}
			// 	}
			// 	_G._GetBuffProperties = undefined;
			// 	return json.encode({
			// 		property_values: propertyValues,
			// 		is_aura: this.GetAuraOwner() != undefined,
			// 	});
			// }
			if (originalGetTexture !== undefined) {
				return originalGetTexture.call(this);
			}
			return EOMModifier.prototype.GetTexture.call(this);
		};
		// const originalGetAuraDuration = classType.GetAuraDuration;
		// classType.GetAuraDuration = function () {
		// 	if (originalGetAuraDuration !== undefined) {
		// 		return originalGetAuraDuration.call(this);
		// 	}
		// 	return 0.1;
		// };
		for (const [key, value] of pairs(param)) {
			if (key != "name" && typeof classType[key] != "function") {
				(classType as any)[key] = () => {
					return value;
				};
			}
		}

		if (syncVarFields.length > 0) {
			const originalAddCustomTransmitterData = classType.AddCustomTransmitterData;
			classType.AddCustomTransmitterData = function () {
				let payload = originalAddCustomTransmitterData !== undefined ? originalAddCustomTransmitterData.call(this) : undefined;
				if (payload == undefined) {
					payload = {};
				}
				for (const field of syncVarFields) {
					(payload as Record<string, any>)[field] = (this as any)[field];
				}
				return payload;
			};
			const originalHandleCustomTransmitterData = classType.HandleCustomTransmitterData;
			classType.HandleCustomTransmitterData = function (data: Record<string, any>) {
				if (data != undefined) {
					for (const field of syncVarFields) {
						if (data[field] !== undefined) {
							// @ts-ignore
							if (typeof data[field] == "userdata") {
								const result = tonumber(tostring(data[field])) ?? 0;
								(this as any)[field] = result;
								this.OnSyncVarUpdated(field, result);
							} else {
								(this as any)[field] = data[field];
								this.OnSyncVarUpdated(field, data[field]);
							}
						}
					}
				}
				if (originalHandleCustomTransmitterData !== undefined) {
					originalHandleCustomTransmitterData.call(this, data);
				}
			};
		}

		LinkLuaModifier(name, fileName, type);
	};
};

export interface EOMModifier extends CDOTA_Modifier_Lua {
	EDeclareEvents(): Partial<Record<modifierfunction | EOMModifierEvents, [(CDOTA_BaseNPC | -1)?, (CDOTA_BaseNPC | -1)?]>>;
	ECheckState(): Partial<Record<EOMModifierStates, boolean>>;
	GetAbilitySpecialValue(): void;
	StaticProperty(): Partial<Record<EOMModifierFunction, any>>;
	DeclareProperty(): Partial<Record<EOMModifierFunction, DeclarePropertyFunction>>;
	AddCustomTransmitterData(): any;
	HandleCustomTransmitterData(data: any): void;
	OnSyncVarUpdated(field: string, value: any): void;
}
export class EOMModifier extends BaseModifier {
	protected _StaticProperty?: Partial<Record<EOMModifierFunction, any>>;
	protected _DeclareProperty?: Partial<Record<EOMModifierFunction, DeclarePropertyFunction>>;
	protected _DeclareEvents?: number[];
	protected _EDeclareEvents?: Partial<Record<modifierfunction | EOMModifierEvents, [(CDOTA_BaseNPC | -1)?, (CDOTA_BaseNPC | -1)?]>>;
	protected _bDestroyed?: boolean;
	parent: CDOTA_BaseNPC;
	ability?: CDOTABaseAbility;
	caster?: CDOTA_BaseNPC;
	name: string;

	OnCreated(params: object): void {
		if (this._bDestroyed == true) return;

		let calculateGenericBonuses = false;

		if (this.DeclareProperty != undefined) {
			this._DeclareProperty = this.DeclareProperty();
			for (const [iProperty, func] of pairs(this._DeclareProperty)) {
				if (calculateGenericBonuses == false && EOM_UPDATE_MANA_PROPERTY[iProperty] == true) {
					calculateGenericBonuses = true;
				}
				RegisterModifierProperty(this, iProperty, func);
			}
		}
		if (this.StaticProperty != undefined) {
			this._StaticProperty = this.StaticProperty();
			for (const [iProperty, value] of pairs(this._StaticProperty)) {
				if (this._DeclareProperty?.[iProperty] == undefined) {
					if (calculateGenericBonuses == false && EOM_UPDATE_MANA_PROPERTY[iProperty] == true) {
						calculateGenericBonuses = true;
					}
					StaticModifierProperty(this, iProperty, value);
				}
			}
		}

		RegisterModifierState(this);

		if (IsServer()) {
			if (calculateGenericBonuses) {
				this.parent.IsHero() ? this.parent.CalculateStatBonus(true) : this.parent.CalculateGenericBonuses();
			}
			if (this.EDeclareEvents != undefined) {
				this._EDeclareEvents = this.EDeclareEvents();
				for (const [iEvents, _] of pairs(this._EDeclareEvents)) {
					let [hSource, hTarget] = _;
					let a = hSource == -1 ? undefined : hSource;
					let b = hTarget == -1 ? undefined : hTarget;
					AddModifierEvents(this, iEvents, a, b);
				}
			}
		}
	}
	OnRefresh(params: object): void {
		if (this._bDestroyed == true) return;

		let calculateGenericBonuses = false;

		if (this.StaticProperty != undefined) {
			this._StaticProperty = this.StaticProperty();
			for (const [iProperty, value] of pairs(this._StaticProperty)) {
				if (this._DeclareProperty?.[iProperty] == undefined) {
					if (calculateGenericBonuses == false && EOM_UPDATE_MANA_PROPERTY[iProperty] == true) {
						calculateGenericBonuses = true;
					}
					StaticModifierProperty(this, iProperty, value);
				}
			}
		}
		if (IsServer()) {
			if (calculateGenericBonuses) {
				this.parent.IsHero() ? this.parent.CalculateStatBonus(true) : this.parent.CalculateGenericBonuses();
			}
		}
	}
	OnStackCountChanged(stackCount: number): void {
		if (this._bDestroyed == true) return;

		let calculateGenericBonuses = false;

		if (this.StaticProperty != undefined) {
			this._StaticProperty = this.StaticProperty();
			for (const [iProperty, value] of pairs(this._StaticProperty)) {
				if (this._DeclareProperty?.[iProperty] == undefined) {
					if (calculateGenericBonuses == false && EOM_UPDATE_MANA_PROPERTY[iProperty] == true) {
						calculateGenericBonuses = true;
					}
					StaticModifierProperty(this, iProperty, value);
				}
			}
		}
		if (IsServer()) {
			if (calculateGenericBonuses) {
				this.parent.IsHero() ? this.parent.CalculateStatBonus(true) : this.parent.CalculateGenericBonuses();
			}
		}
	}
	OnDestroy(): void {
		this._bDestroyed = true;

		let calculateGenericBonuses = false;

		if (this._StaticProperty != undefined) {
			for (const [iProperty, _] of pairs(this._StaticProperty)) {
				if (this._DeclareProperty?.[iProperty] == undefined) {
					if (calculateGenericBonuses == false && EOM_UPDATE_MANA_PROPERTY[iProperty] == true) {
						calculateGenericBonuses = true;
					}
					StaticModifierProperty(this, iProperty, undefined);
				}
			}
			this._StaticProperty = undefined;
		}

		if (this._DeclareProperty != undefined) {
			for (const [iProperty, _] of pairs(this._DeclareProperty)) {
				if (calculateGenericBonuses == false && EOM_UPDATE_MANA_PROPERTY[iProperty] == true) {
					calculateGenericBonuses = true;
				}
				UnregisterModifierProperty(this, iProperty);
			}
			this._DeclareProperty = undefined;
		}

		UnregisterModifierState(this);

		if (IsServer()) {
			if (calculateGenericBonuses && IsValid(this.parent)) {
				this.parent.IsHero() ? this.parent.CalculateStatBonus(true) : this.parent.CalculateGenericBonuses();
			}
			if (this._EDeclareEvents != undefined) {
				for (const [iEvents, _] of pairs(this._EDeclareEvents)) {
					let [hSource, hTarget] = _;
					let a = hSource == -1 ? undefined : hSource;
					let b = hTarget == -1 ? undefined : hTarget;
					RemoveModifierEvents(this, iEvents, a, b);
				}
				this._EDeclareEvents = undefined;
			}
			if (this._DeclareEvents != undefined) {
				for (const [i, v] of ipairs(this._DeclareEvents)) {
					Event.Unregister(v);
				}
				this._DeclareEvents = undefined;
			}
		}
	}
	OnSyncVarUpdated(field: string, value: any): void { }
}
export interface EOMModifierMotionHorizontal extends CDOTA_Modifier_Lua_Horizontal_Motion { }
export class EOMModifierMotionHorizontal extends EOMModifier { }

export interface EOMModifierMotionVertical extends CDOTA_Modifier_Lua_Vertical_Motion { }
export class EOMModifierMotionVertical extends EOMModifier { }

export interface EOMModifierMotionBoth extends CDOTA_Modifier_Lua_Motion_Both { }
export class EOMModifierMotionBoth extends EOMModifier { }