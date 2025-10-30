declare type ValueOf<T> = T[keyof T];
declare type Polygon<T extends Vector | Point = Vector> = T[];
declare type RectVector = { min: Vector, max: Vector; };
declare type KV = Record<string, any>;

declare var old_debug_traceback: typeof debug.traceback;
declare var print_Engine: typeof print;
declare var pairs_Engine: typeof pairs;
declare var ipairs_Engine: typeof ipairs;
declare var CreateUnitByName_Engine: typeof CreateUnitByName;
declare var ApplyDamage_Engine: typeof ApplyDamage;
/**
 * PRD的C值表
 */
declare var PSEUDO_RANDOM_C: number[];
/**
 * 是否以激活
 */
declare var Activated: boolean;
declare var PUIErrorEventListenerID: EventListenerID;
declare var GameEventListenerIDs: EventListenerID[];
declare var CustomUIEventListenerIDs: CustomGameEventListenerID[];
declare var TimerEventListenerIDs: string[];

/**
 * modifier事件储存表
 */
declare var tModifierEvents: Partial<Record<modifierfunction | EOMModifierEvents, CDOTA_Modifier_Lua[]>> | undefined;

/**
 * 模块组
 */
declare var MODULES: CModule[];

/**
 * modifier事件系统马甲
 */
declare var MODIFIER_EVENTS_DUMMY: CDOTA_BaseNPC;

/**
 * 
 */
declare type AbilityClasses = CDOTABaseAbility;

/**
 * record系统马甲
 */
declare interface RECORD_SYSTEM_DUMMY extends CDOTA_BaseNPC {
	iLastRecord?: number,
	ATTACK_SYSTEM?: Record<number, number>,
	ABILITY?: Record<number, AbilityClasses>,
}
declare var RECORD_SYSTEM_DUMMY: RECORD_SYSTEM_DUMMY;
declare var CLIENT_ABILITY: CDOTABaseAbility;
declare var ENEMY_DUMMY: CDOTA_BaseNPC;

/**
 * 用于储存modifier队伍或玩家数据
 */
declare var MODIFIER_PROPERTY_PLAYER_DATA: Partial<Record<PlayerID, any>>;
declare var MODIFIER_PROPERTY_TEAMHERO_DATA: Partial<Record<DOTATeam_t, any>>;
declare var MODIFIER_PROPERTY_TEAM_DATA: Partial<Record<DOTATeam_t, any>>;

/**
 * 游戏事件参数样式
 */
declare type EventProperties<T extends keyof GameEventDeclarations | {}> = T extends keyof GameEventDeclarations ? GameEventProvidedProperties & GameEventDeclarations[T] : GameEventProvidedProperties & T;
/**
 * 自定义UI事件参数样式
 */
declare type UIEventProperties<T extends keyof CustomGameEventDeclarations | Object> =
	NetworkedData<
		T extends keyof CustomGameEventDeclarations
		? CustomGameEventDeclarations[T]
		: T
	> & { PlayerID: PlayerID; };

type ServerRequestParams<T extends keyof ServerRequestEventDeclarations> = ServerRequestEventDeclarations[T]["params"] & { PlayerID: PlayerID; };

/**@noSelf */
declare function EntIndexToHScript<T extends CBaseEntity>(entityIndex: EntityIndex): T | undefined;

/**
 * Vector相加
 */
declare const Vadd: LuaAddition<Vector, Vector, Vector>;
/**
 * Vector相减
 */
declare const Vsub: LuaSubtraction<Vector, Vector, Vector>;
/**
 * Vector相乘
 */
declare const Vmul: LuaMultiplication<Vector, Vector | number, Vector>;
/**
 * Vector相除
 */
declare const Vdiv: LuaDivision<Vector, Vector | number, Vector>;

/**@noSelf */
declare function CreateUnitFromTable(options: Record<string, any>, location: Vector): CDOTA_BaseNPC;

/**@clientOnly */
declare var GetAbilitySpecialValue_AbilityEntIndex: EntityIndex | undefined;
/**@clientOnly */
declare var GetAbilitySpecialValue_Level: number | undefined;
/**@clientOnly */
declare var GetAbilitySpecialValue_KeyName: string | undefined;
/**@clientOnly */
declare var ClientRequestEventResult: string | undefined;

/**@noSelf */
declare function noSelfFunction(...args: any): any;

/**@noSelf */
declare function sortpairs<TKey extends AnyNotNil, TValue>(
	t: LuaTable<TKey, TValue>
): LuaIterable<LuaMultiReturn<[TKey, NonNullable<TValue>]>>;
/**@noSelf */
declare function sortpairs<T>(t: T): LuaIterable<LuaMultiReturn<[keyof T, NonNullable<T[keyof T]>]>>;

/**@noSelf */
declare function reverse_ipairs<T>(
	t: Record<number, T>
): LuaIterable<LuaMultiReturn<[number, NonNullable<T>]>>;

/**
 * 计算多个数的最大公约数
 * @param x 
 * @noSelf
 */
declare function GreatestCommonDivisor(...x: number[]): number;

/**
 * 计算多个数的最小公倍数
 * @param x 
 * @noSelf
 */
declare function LeastCommonMultiple(...x: number[]): number;

declare interface CDroppedItem extends CBaseAnimatingActivity {
	gridIndex?: number;
	name?: string;
	charge?: number;
	purchaser?: EntityIndex;
	locked?: boolean;
	level?: number;
	toggle?: boolean;
	isStackable?: boolean;
	_launchThink?: () => any;
	overheadParticleIDs?: ParticleID[];
	stackParticleIndex?: number;
	expiryTime?: number;
}

/**@noSelf */
declare function FilterCallback<T>(params: T): boolean;
declare type FilterCallbackType<T = any> = typeof FilterCallback<T>;

declare namespace string {
	/** @noSelf */
	function split(str: string, delimiter: string, toNumber: true): number[];
	/** @noSelf */
	function split(str: string, delimiter: string, toNumber?: false): string[];
	/** @noSelf */
	function replace(s: string, pattern: string, repl: string): string;
}

/**@noSelf */
declare function GetDroppedItemContainedItemID(h: CBaseModelEntity): number;
/**@noSelf */
declare function GetDroppedItemName(h: CBaseModelEntity): string | undefined;

interface ModifierAddedEvent {
	attacker: CDOTA_BaseNPC;
	unit: CDOTA_BaseNPC;
	added_buff: CDOTA_Buff;
}

interface ModifierCustomHealEvent {
	unit: CDOTA_BaseNPC,
	amount: number;
	percent: number;
	ability: CDOTABaseAbility | undefined;
	overheal: number;
}