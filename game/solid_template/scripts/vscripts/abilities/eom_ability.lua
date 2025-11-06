local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 1,["8"] = 1,["9"] = 1,["10"] = 22,["11"] = 23,["12"] = 24,["13"] = 25,["14"] = 27,["16"] = 29,["18"] = 32,["19"] = 34,["20"] = 36,["21"] = 38,["22"] = 39,["23"] = 40,["24"] = 41,["25"] = 42,["26"] = 43,["27"] = 44,["28"] = 45,["29"] = 46,["30"] = 47,["31"] = 48,["32"] = 49,["33"] = 50,["34"] = 51,["35"] = 52,["36"] = 54,["37"] = 55,["38"] = 56,["39"] = 57,["41"] = 59,["44"] = 62,["45"] = 63,["46"] = 64,["48"] = 66,["52"] = 72,["53"] = 73,["54"] = 74,["56"] = 39,["57"] = 24,["58"] = 22,["59"] = 83,["60"] = 83,["61"] = 83,["62"] = 83});
local ____exports = {}
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local BaseAbility = ____dota_ts_adapter.BaseAbility
local toDotaClassInstance = ____dota_ts_adapter.toDotaClassInstance
____exports.registerEOMAbility = function(____, param)
    local name = param and param.name
    return function(____, ability)
        if name ~= nil then
            ability.name = name
        else
            name = ability.name
        end
        local env = getFileScope()
        env[name] = {}
        toDotaClassInstance(nil, env[name], ability)
        local originalSpawn = env[name].Spawn
        env[name].Spawn = function(self)
            self.behavior = param and param.behavior
            self.searchBehavior = param and param.searchBehavior or AI_SEARCH_BEHAVIOR.AI_SEARCH_BEHAVIOR_NONE
            self.aoeRadius = param and param.aoeRadius
            self.startWidth = param and param.startWidth
            self.endWidth = param and param.endWidth
            self.targetTeam = param and param.targetTeam
            self.targetType = param and param.targetType
            self.targetFlags = param and param.targetFlags
            self.funcSortFunction = param and param.funcSortFunction
            self.funcCondition = param and param.funcCondition
            self.funcUnitsCallback = param and param.funcUnitsCallback
            self.isNotPassive = param and param.isNotPassive
            self.orderType = param and param.orderType or FIND_ANY_ORDER
            if IsServer() then
                if (param and param.startLevel) ~= nil then
                    if type(param.startLevel) == "function" then
                        self:SetLevel(param:startLevel(self))
                    else
                        self:SetLevel(param.startLevel)
                    end
                end
                if (param and param.startCooldown) ~= nil then
                    if type(param.startCooldown) == "function" then
                        self:StartCooldown(param:startCooldown(self))
                    else
                        self:StartCooldown(param.startCooldown)
                    end
                end
            end
            self:____constructor()
            if originalSpawn then
                originalSpawn(self)
            end
        end
    end
end
____exports.EOMAbility = __TS__Class()
local EOMAbility = ____exports.EOMAbility
EOMAbility.name = "EOMAbility"
__TS__ClassExtends(EOMAbility, BaseAbility)
return ____exports
