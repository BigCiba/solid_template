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

if (IsServer()) {
	require("demo");
	require("settings");
}