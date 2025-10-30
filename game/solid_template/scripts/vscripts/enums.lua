local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 1,["5"] = 2,["6"] = 3,["7"] = 4,["8"] = 5,["9"] = 7,["10"] = 7,["11"] = 7,["12"] = 7,["13"] = 7});
vec3_zero = Vector(0, 0, 0)
vec3_left = Vector(-1, 0, 0)
vec3_right = Vector(1, 0, 0)
vec3_top = Vector(0, 1, 0)
vec3_bottom = Vector(0, -1, 0)
AddModifierFlag = AddModifierFlag or ({})
AddModifierFlag.CALC_STATUS_RESISTANCE = 1
AddModifierFlag[AddModifierFlag.CALC_STATUS_RESISTANCE] = "CALC_STATUS_RESISTANCE"
AddModifierFlag.IGNORE_DEATH = 2
AddModifierFlag[AddModifierFlag.IGNORE_DEATH] = "IGNORE_DEATH"
