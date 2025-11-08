/** @noSelfInFile */

/**
 * 游戏机制模块入口
 * 在这里 require 所有游戏机制模块
 */

require("gamepad");

if (IsServer()) {
	// 服务器端初始化
} else {
	// 客户端初始化
}
