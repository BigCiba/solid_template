declare interface CEntityPointer {
	/**
	 * Has underlying C++ entity object been deleted?
	 *
	 * @both
	 */
	IsNull(): boolean;
}

declare interface CBaseEntity {
	bIsNotFirstSpawn: boolean | undefined;
	_tOverrideData: Record<any, any>;
	_saveData_?: Table;
}
declare interface CDOTA_Item {
	_devourType_?: DevourType;
	_created_?: boolean;
	_is_locked?: boolean;
	_expiry_time?: number;
}
declare interface CDOTA_BaseNPC {
	__counter_ready__: boolean;
	GetCaster(): CDOTA_BaseNPC | undefined;
	GetDieTime(): unknown;
	DealDamage(hUnit: any, hAbility: CDOTABaseAbility | undefined, flDamage: number, DAMAGE_TYPE_PHYSICAL: any): unknown;
	aStateModifers: CDOTA_Modifier_Lua[] | undefined;
	bIsNotFirstSpawn: boolean | undefined;
	hModifierCommon: CDOTA_Buff | undefined;
	iKillerPlayerID: PlayerID | undefined;
	iRoundNumber: number | undefined;
	bLevelDrawTraced: boolean | undefined;
	/**
	 * 获取单位的unit_state技能
	 * @returns
	 */
	GetDummyAbility(): CDOTABaseAbility | undefined;

	/**
	 * 添加ActivityModifier
	 * @param sName
	 */
	AddActivityModifier(sName: string): void;
	/**
	 * 移除ActivityModifier
	 * @param sName
	 */
	RemoveActivityModifier(sName: string): void;
	AddActivityModifier_Engine(name: string): void;
	_updateActivityModifier(): void;
	_aActivityModifiers: string[] | undefined;
	__ReduceArmor: number | undefined;
	__Teleport_Type: TELEPORT_TYPE;
	ForceTeleportLoot?: boolean;
	_IsReincarnating?: boolean;
}

declare interface CScriptParticleManager {
	/** @both */
	SetParticleControlEnt(
		particle: ParticleID,
		controlPoint: number,
		unit: CBaseEntity,
		particleAttach: ParticleAttachment_t,
		attachment: string | undefined,
		offset: Vector,
		lockOrientation: boolean,
	): void;
}

declare interface CScriptKeyValues {
	/**
	 * Reads a spawn key.
	 *
	 * @both
	 */
	GetValue<T>(arg1: string): T | undefined;
	__kind__: 'instance';
}

/**
 * A function to re-lookup a function by name every time.
 *
 * @both
 */
declare function Dynamic_Wrap<
	T extends object,
	K extends {
		[P in keyof T]: ((...args: any[]) => any) extends T[P] // At least one of union's values is a function
		? [T[P]] extends [((this: infer TThis, ...args: any[]) => any) | null | undefined] // Box type to make it not distributive
		? {} extends TThis // Has no specified this
		? P
		: TThis extends T // Has this specified as T
		? P
		: never
		: never
		: never;
	}[keyof T]
>(context: T, name: K): T[K];

/**尺寸，[XSize, YSize] */
declare type SIZE = [number, number];