local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__New = ____lualib.__TS__New
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 3,["13"] = 4,["14"] = 5,["15"] = 6,["17"] = 5,["18"] = 3,["19"] = 15,["20"] = 15});
local ____exports = {}
local ____tstl_2Dutils = require("lib.tstl-utils")
local reloadable = ____tstl_2Dutils.reloadable
local CProperty = __TS__Class()
CProperty.name = "CProperty"
__TS__ClassExtends(CProperty, CModule)
function CProperty.prototype.init(self, bReload)
    if not bReload then
    end
end
CProperty = __TS__DecorateLegacy({reloadable}, CProperty)
if Property == nil then
    Property = __TS__New(CProperty)
end
return ____exports
