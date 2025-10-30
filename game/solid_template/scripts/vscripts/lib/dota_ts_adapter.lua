local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 168,["8"] = 169,["9"] = 169,["10"] = 170,["11"] = 171,["12"] = 174,["13"] = 175,["16"] = 179,["18"] = 168,["19"] = 16,["20"] = 16,["21"] = 16,["23"] = 16,["24"] = 45,["25"] = 45,["26"] = 45,["28"] = 45,["29"] = 51,["31"] = 51,["32"] = 58,["34"] = 58,["35"] = 64,["36"] = 64,["37"] = 64,["39"] = 64,["40"] = 65,["41"] = 72,["42"] = 65,["43"] = 77,["44"] = 77,["45"] = 77,["46"] = 77,["47"] = 80,["48"] = 80,["49"] = 80,["50"] = 80,["51"] = 83,["52"] = 83,["53"] = 83,["54"] = 83,["55"] = 86,["56"] = 87,["57"] = 89,["58"] = 91,["59"] = 92,["60"] = 94,["62"] = 96,["64"] = 99,["65"] = 101,["66"] = 103,["67"] = 105,["68"] = 106,["69"] = 107,["70"] = 108,["71"] = 109,["73"] = 106,["74"] = 91,["75"] = 114,["76"] = 115,["77"] = 117,["79"] = 119,["81"] = 122,["82"] = 123,["83"] = 125,["84"] = 127,["85"] = 129,["86"] = 130,["87"] = 131,["88"] = 132,["89"] = 133,["91"] = 130,["92"] = 137,["93"] = 138,["94"] = 139,["95"] = 140,["96"] = 141,["98"] = 143,["99"] = 144,["101"] = 146,["102"] = 147,["105"] = 151,["107"] = 154,["108"] = 114,["111"] = 161,["112"] = 162,["113"] = 163,["114"] = 164,["115"] = 163,["116"] = 161});
local ____exports = {}
function ____exports.toDotaClassInstance(self, instance, ____table)
    local ____table_0 = ____table
    local prototype = ____table_0.prototype
    while prototype do
        for key in pairs(prototype) do
            if not (rawget(instance, key) ~= nil) then
                instance[key] = prototype[key]
            end
        end
        prototype = getmetatable(prototype)
    end
end
____exports.BaseAbility = __TS__Class()
local BaseAbility = ____exports.BaseAbility
BaseAbility.name = "BaseAbility"
function BaseAbility.prototype.____constructor(self)
end
____exports.BaseItem = __TS__Class()
local BaseItem = ____exports.BaseItem
BaseItem.name = "BaseItem"
function BaseItem.prototype.____constructor(self)
end
function BaseItem.prototype.GetItemIntrinsicModifierName(self)
    return
end
function BaseItem.prototype.GetSuperiorItemList(self)
    return
end
____exports.BaseModifier = __TS__Class()
local BaseModifier = ____exports.BaseModifier
BaseModifier.name = "BaseModifier"
function BaseModifier.prototype.____constructor(self)
end
function BaseModifier.apply(self, target, caster, ability, modifierTable)
    return target:AddNewModifier(caster, ability, self.name, modifierTable)
end
____exports.BaseModifierMotionHorizontal = __TS__Class()
local BaseModifierMotionHorizontal = ____exports.BaseModifierMotionHorizontal
BaseModifierMotionHorizontal.name = "BaseModifierMotionHorizontal"
__TS__ClassExtends(BaseModifierMotionHorizontal, ____exports.BaseModifier)
____exports.BaseModifierMotionVertical = __TS__Class()
local BaseModifierMotionVertical = ____exports.BaseModifierMotionVertical
BaseModifierMotionVertical.name = "BaseModifierMotionVertical"
__TS__ClassExtends(BaseModifierMotionVertical, ____exports.BaseModifier)
____exports.BaseModifierMotionBoth = __TS__Class()
local BaseModifierMotionBoth = ____exports.BaseModifierMotionBoth
BaseModifierMotionBoth.name = "BaseModifierMotionBoth"
__TS__ClassExtends(BaseModifierMotionBoth, ____exports.BaseModifier)
setmetatable(____exports.BaseAbility.prototype, {__index = CDOTA_Ability_Lua or C_DOTA_Ability_Lua})
setmetatable(____exports.BaseItem.prototype, {__index = CDOTA_Item_Lua or C_DOTA_Item_Lua})
setmetatable(____exports.BaseModifier.prototype, {__index = CDOTA_Modifier_Lua or C_DOTA_Modifier_Lua})
____exports.registerAbility = function(____, name) return function(____, ability)
    if name ~= nil then
        ability.name = name
    else
        name = ability.name
    end
    local env = getFileScope(nil)
    env[name] = {}
    ____exports.toDotaClassInstance(nil, env[name], ability)
    local originalSpawn = env[name].Spawn
    env[name].Spawn = function(self)
        self:____constructor()
        if originalSpawn then
            originalSpawn(self)
        end
    end
end end
____exports.registerModifier = function(____, name) return function(____, modifier)
    if name ~= nil then
        modifier.name = name
    else
        name = modifier.name
    end
    local env, source = getFileScope(nil)
    local fileName = string.gsub(source, ".*scripts[\\/]vscripts[\\/]", "")
    env[name] = {}
    ____exports.toDotaClassInstance(nil, env[name], modifier)
    local originalOnCreated = env[name].OnCreated
    env[name].OnCreated = function(self, parameters)
        self:____constructor()
        if originalOnCreated ~= nil then
            originalOnCreated(self, parameters)
        end
    end
    local ____type = LUA_MODIFIER_MOTION_NONE
    local base = modifier.____super
    while base do
        if base == ____exports.BaseModifierMotionBoth then
            ____type = LUA_MODIFIER_MOTION_BOTH
            break
        elseif base == ____exports.BaseModifierMotionHorizontal then
            ____type = LUA_MODIFIER_MOTION_HORIZONTAL
            break
        elseif base == ____exports.BaseModifierMotionVertical then
            ____type = LUA_MODIFIER_MOTION_VERTICAL
            break
        end
        base = base.____super
    end
    LinkLuaModifier(name, fileName, ____type)
end end
--- Use to expose top-level functions in entity scripts.
-- Usage: registerEntityFunction("OnStartTouch", (trigger: TriggerStartTouchEvent) => { <your code here> });
function ____exports.registerEntityFunction(self, name, f)
    local env = getFileScope(nil)
    env[name] = function(...)
        f(nil, ...)
    end
end
return ____exports
