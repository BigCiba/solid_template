// 加载加密模块
pcall(require, "encrypt");

require("framework");
require("override");

// require("base");
// require("constant");
// require("class");
// require("globals");
// require("kv");
// require("request");
// require("abilities");
// require("modifiers");
require("mechanics");
if (IsServer()) {
	// 	require("filter");
	// 	require("service");
	require("game");
} else {
	// 	require("mechanics");
	// 	require("service/service_client");
}