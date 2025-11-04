declare interface CEntityPointer {
	/**
	 * Has underlying C++ entity object been deleted?
	 *
	 * @both
	 */
	IsNull(): boolean;
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

/**尺寸，[XSize, YSize] */
declare type SIZE = [number, number];