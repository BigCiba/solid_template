local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["4"] = 3,["5"] = 4,["6"] = 6,["7"] = 8,["8"] = 9});
SendToConsole("dota_combine_models 0")
Convars:SetBool("dota_combine_models", false)
require("requires")
if not GameModeActivated then
    CModule:initialize()
end
