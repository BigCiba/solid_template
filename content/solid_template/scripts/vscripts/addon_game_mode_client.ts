/** @noSelfInFile **/

SendToConsole("dota_combine_models 0");
Convars.SetBool("dota_combine_models", false);

require("requires");

if (!GameModeActivated) {
	CModule.initialize();
}