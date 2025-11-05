// require("./eom_modifier/property_check_value_callback");
// require("./eom_modifier/properties_declare");
// require("./eom_modifier/properties");
// require("./eom_modifier/events");
// require("./eom_modifier/states");
// modifier加载列表
for (const [i, v] of ipairs([
	"modifier_common",
])) {
	require("modifiers." + v);
}