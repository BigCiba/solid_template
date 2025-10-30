export interface BaseAbility extends CDOTA_Ability_Lua {
	/**
	 * @abstract
	 */
	OnKnockBackHorizontalMotionFinish(target: CDOTA_BaseNPC, interrupted: boolean, knockbackModifier: CDOTA_Buff, extraData?: Record<string, any>): void;
	/**
	 * @abstract
	 */
	OnKnockBackVerticalMotionFinish(target: CDOTA_BaseNPC, interrupted: boolean, knockbackModifier: CDOTA_Buff, extraData?: Record<string, any>): void;
	/**
	 * @abstract
	 * @clientOnly
	 */
	GetTooltipDynamicValue(name: string, level: number): number | undefined;
}
export class BaseAbility { }

export interface BaseItem extends CDOTA_Item_Lua {
	/**
	 * @abstract
	 */
	OnKnockBackHorizontalMotionFinish(target: CDOTA_BaseNPC, interrupted: boolean, knockbackModifier: CDOTA_Buff, extraData?: Record<string, any>): void;
	/**
	 * @abstract
	 */
	OnKnockBackVerticalMotionFinish(target: CDOTA_BaseNPC, interrupted: boolean, knockbackModifier: CDOTA_Buff, extraData?: Record<string, any>): void;
	/**
	 * @abstract
	 */
	GetItemSubtitle(): string;
	/**
	 * @abstract
	 */
	OnDevoured(unit: CDOTA_BaseNPC): void;
	/**
	 * @abstract
	 */
	OnDevouredReleased(unit: CDOTA_BaseNPC): void;
	/**
	 * @abstract
	 * @clientOnly
	 */
	GetTooltipDynamicValue(name: string, level: number): number | undefined;
}
export class BaseItem {
	__ItemIntrinsicModifier__?: CDOTA_Buff;
	/**
	 * 获取物品被动modifier，和dota2自带的类似，但是针对性处理了多物品和同源物品的问题
	 * @returns 
	 */
	GetItemIntrinsicModifierName(): string | undefined {
		return;
	}
	/**
	 * 获取高级物品名列表，如果有这些物品存在则不会添加物品固有modifier（即GetItemIntrinsicModifierName）
	 * @returns 
	 */
	GetSuperiorItemList(): string[] | undefined {
		return;
	}
}

export interface BaseModifier extends CDOTA_Modifier_Lua { }
export class BaseModifier {
	public static apply<T extends typeof BaseModifier>(
		this: T,
		target: CDOTA_BaseNPC,
		caster?: CDOTA_BaseNPC,
		ability?: CDOTABaseAbility,
		modifierTable?: object,
	): InstanceType<T> {
		return target.AddNewModifier(caster, ability, this.name, modifierTable) as any;
	}
}

export interface BaseModifierMotionHorizontal extends CDOTA_Modifier_Lua_Horizontal_Motion { }
export class BaseModifierMotionHorizontal extends BaseModifier { }

export interface BaseModifierMotionVertical extends CDOTA_Modifier_Lua_Vertical_Motion { }
export class BaseModifierMotionVertical extends BaseModifier { }

export interface BaseModifierMotionBoth extends CDOTA_Modifier_Lua_Motion_Both { }
export class BaseModifierMotionBoth extends BaseModifier { }

// Add standard base classes to prototype chain to make `super.*` work as `self.BaseClass.*`
setmetatable(BaseAbility.prototype, { __index: CDOTA_Ability_Lua ?? C_DOTA_Ability_Lua });
setmetatable(BaseItem.prototype, { __index: CDOTA_Item_Lua ?? C_DOTA_Item_Lua });
// @ts-ignore
setmetatable(BaseModifier.prototype, { __index: CDOTA_Modifier_Lua ?? C_DOTA_Modifier_Lua });

export const registerAbility = (name?: string) => (ability: new () => CDOTA_Ability_Lua | CDOTA_Item_Lua) => {
	if (name !== undefined) {
		// @ts-ignore
		ability.name = name;
	} else {
		name = ability.name;
	}

	const [env] = getFileScope();

	env[name] = {};

	toDotaClassInstance(env[name], ability);

	const originalSpawn = (env[name] as CDOTA_Ability_Lua).Spawn;
	env[name].Spawn = function () {
		this.____constructor();
		if (originalSpawn) {
			originalSpawn.call(this);
		}
	};
};

export const registerModifier = (name?: string) => (modifier: new () => CDOTA_Modifier_Lua) => {
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

	const originalOnCreated = (env[name] as CDOTA_Modifier_Lua).OnCreated;
	env[name].OnCreated = function (parameters: any) {
		this.____constructor();
		if (originalOnCreated !== undefined) {
			originalOnCreated.call(this, parameters);
		}
	};

	let type = LuaModifierType.LUA_MODIFIER_MOTION_NONE;
	let base = (modifier as any).____super;
	while (base) {
		if (base === BaseModifierMotionBoth) {
			type = LuaModifierType.LUA_MODIFIER_MOTION_BOTH;
			break;
		} else if (base === BaseModifierMotionHorizontal) {
			type = LuaModifierType.LUA_MODIFIER_MOTION_HORIZONTAL;
			break;
		} else if (base === BaseModifierMotionVertical) {
			type = LuaModifierType.LUA_MODIFIER_MOTION_VERTICAL;
			break;
		}

		base = base.____super;
	}

	LinkLuaModifier(name, fileName, type);
};

/**
 * Use to expose top-level functions in entity scripts.
 * Usage: registerEntityFunction("OnStartTouch", (trigger: TriggerStartTouchEvent) => { <your code here> });
 */
export function registerEntityFunction(name: string, f: (...args: any[]) => any) {
	const [env] = getFileScope();
	env[name] = function (this: void, ...args: any[]) {
		f(...args);
	};
}

export function toDotaClassInstance(instance: any, table: new () => any) {
	let { prototype } = table;
	while (prototype) {
		for (const key in prototype) {
			// Using hasOwnProperty to ignore methods from metatable added by ExtendInstance
			// https://github.com/SteamDatabase/GameTracking-Dota2/blob/7edcaa294bdcf493df0846f8bbcd4d47a5c3bd57/game/core/scripts/vscripts/init.lua#L195
			if (!instance.hasOwnProperty(key)) {
				instance[key] = prototype[key];
			}
		}

		prototype = getmetatable(prototype);
	}
}
