local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 1,["5"] = 2,["6"] = 3,["7"] = 4,["8"] = 5,["9"] = 6,["10"] = 7,["11"] = 8,["12"] = 9,["13"] = 10,["14"] = 11,["15"] = 13,["16"] = 14,["17"] = 15});
require("framework.enums")
require("framework.pseudo_random")
require("framework.utils")
require("framework.module")
require("framework.timer")
require("framework.debug")
require("framework.request")
require("framework.game_event")
require("framework.event")
require("framework.nettable")
require("framework.property_system.index")
if IsServer() then
    require("framework.demo")
    require("framework.settings")
end
