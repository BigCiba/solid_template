import { BaseAbility, toDotaClassInstance } from "../lib/dota_ts_adapter";

interface easyAbilityReturn {
	name: string,

	startLevel?: number | ((ability: CDOTA_Ability_Lua | CDOTA_Item_Lua) => number),
	startCooldown?: number | ((ability: CDOTA_Ability_Lua | CDOTA_Item_Lua) => number),
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
}
export const registerEOMAbility = (param?: Partial<easyAbilityReturn>) => {
	let name = param?.name;
	return (ability: new () => CDOTA_Ability_Lua | CDOTA_Item_Lua) => {
		if (name !== undefined) {
			// @ts-ignore
			ability.name = name;
		} else {
			name = ability.name;
		}

		const [env] = getFileScope();

		env[name] = {};

		toDotaClassInstance(env[name], ability);

		const originalSpawn = (env[name] as CDOTA_Ability_Lua | CDOTA_Item_Lua).Spawn;
		(env[name] as CDOTA_Ability_Lua | CDOTA_Item_Lua).Spawn = function () {
			this.behavior = param?.behavior;
			this.searchBehavior = param?.searchBehavior ?? AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE;
			this.aoeRadius = param?.aoeRadius;
			this.startWidth = param?.startWidth;
			this.endWidth = param?.endWidth;
			this.targetTeam = param?.targetTeam;
			this.targetType = param?.targetType;
			this.targetFlags = param?.targetFlags;
			this.funcSortFunction = param?.funcSortFunction;
			this.funcCondition = param?.funcCondition;
			this.funcUnitsCallback = param?.funcUnitsCallback;
			this.isNotPassive = param?.isNotPassive;
			this.orderType = param?.orderType ?? FindOrder.FIND_ANY_ORDER;

			if (IsServer()) {
				if (param?.startLevel != undefined) {
					if (typeof param.startLevel == "function") {
						this.SetLevel(param.startLevel(this));
					} else {
						this.SetLevel(param.startLevel);
					}
				}
				if (param?.startCooldown != undefined) {
					if (typeof param.startCooldown == "function") {
						this.StartCooldown(param.startCooldown(this));
					} else {
						this.StartCooldown(param.startCooldown);
					}
				}
			}

			// @ts-ignore
			this.____constructor();
			if (originalSpawn) {
				originalSpawn.call(this);
			}
		};
	};
};

export interface EOMAbility extends CDOTA_Ability_Lua {
	GetProgressModifierName(): string;
}
export class EOMAbility extends BaseAbility { }