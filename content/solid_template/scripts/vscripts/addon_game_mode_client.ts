/** @noSelfInFile **/

import { reloadable } from "./lib/tstl-utils";

SendToConsole("dota_combine_models 0");
Convars.SetBool("dota_combine_models", false);

require("requires");

@reloadable
class MClient extends CModule {
	initPriority(): number {
		return 1;
	}
	init(bReload: boolean) {
		if (!bReload) {
		}
		GameEvent("cl_script_reload", () => {
			require("addon_game_mode_client");
		}, undefined);
	}
}
declare global {
	/**
	 * @ClientOnly
	 */
	var Client: MClient;
}

Client ??= new MClient();

if (!GameModeActivated) {
	CModule.initialize();
}

require("reload");