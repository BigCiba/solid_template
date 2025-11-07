require("enums");
require("pseudo_random");
require("utils");
require("module");
require("timer");
require("debug");
require("request");
require("game_event");
require("event");
require("nettable");
require('property_system');
// 压力测试模块
// require('property_system/stress_test');

if (IsServer()) {
	require("demo");
	require("settings");
}