local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["7"] = 12,["10"] = 18,["11"] = 19,["12"] = 20,["14"] = 25,["15"] = 26,["16"] = 25});
local ____exports = {}
--- 项目名称（addon 名称）
-- 从 package.json 的 name 字段读取
____exports.ADDON_NAME = "solid_template"
--- 调试标签前缀
-- 用于错误追踪和日志系统
____exports.DEBUG_TAG_SERVER = "solid_template_debug"
____exports.DEBUG_TAG_CLIENT = "solid_template_client_debug"
____exports.DEBUG_TAG_PUI = "solid_template_pui_debug"
--- 根据当前环境获取调试标签
function ____exports.GetDebugTag(self)
    return IsServer() and ____exports.DEBUG_TAG_SERVER or ____exports.DEBUG_TAG_CLIENT
end
return ____exports
