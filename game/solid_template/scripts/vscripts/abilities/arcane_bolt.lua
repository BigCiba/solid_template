local ____lualib = require("lualib_bundle")
local __TS__Class = ____lualib.__TS__Class
local __TS__ClassExtends = ____lualib.__TS__ClassExtends
local __TS__DecorateLegacy = ____lualib.__TS__DecorateLegacy
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["8"] = 1,["9"] = 1,["10"] = 1,["11"] = 3,["12"] = 4,["13"] = 3,["14"] = 4,["15"] = 5,["16"] = 6,["17"] = 7,["18"] = 5,["19"] = 4,["20"] = 3,["21"] = 4,["23"] = 4});
local ____exports = {}
local ____dota_ts_adapter = require("lib.dota_ts_adapter")
local BaseAbility = ____dota_ts_adapter.BaseAbility
local registerAbility = ____dota_ts_adapter.registerAbility
____exports.arcane_bolt_ss = __TS__Class()
local arcane_bolt_ss = ____exports.arcane_bolt_ss
arcane_bolt_ss.name = "arcane_bolt_ss"
__TS__ClassExtends(arcane_bolt_ss, BaseAbility)
function arcane_bolt_ss.prototype.OnSpellStart(self)
    local caster = self:GetCaster()
    caster:GetAttachmentPosition("attach_attack1")
end
arcane_bolt_ss = __TS__DecorateLegacy(
    {registerAbility(nil)},
    arcane_bolt_ss
)
____exports.arcane_bolt_ss = arcane_bolt_ss
return ____exports
