local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 2,["5"] = 4,["6"] = 5,["7"] = 15,["8"] = 16,["9"] = 19});
pcall(require, "encrypt")
require("framework.index")
require("override.index")
require("mechanics.index")
if IsServer() then
    require("game")
else
end
