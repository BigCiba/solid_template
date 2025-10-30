/** @noSelfInFile **/

SendToServerConsole("dota_combine_models 0");
Convars.SetBool("dota_combine_models", false);
SendToServerConsole("dota_max_physical_items_purchase_limit 99999");

require("requires");

function Activate() {
	print("=== Activate ===");
	CModule.initialize();
}

function Precache(context: CScriptPrecacheContext) {
	let precacheAutoList: Record<string, string[]> = require("precache_auto");
	for (const sPrecacheMode in precacheAutoList) {
		const aList = precacheAutoList[sPrecacheMode];
		if (sPrecacheMode == "particle_tool" && IsInToolsMode()) {
			for (const [_, sResource] of ipairs(aList)) {
				PrecacheResource("particle", sResource, context);
			}
		} else {
			aList.forEach(sResource => {
				PrecacheResource(sPrecacheMode, sResource, context);
			});
		}
	}

	let precacheList: Record<string, string[]> = require("precache");
	for (const [sPrecacheMode, list] of pairs(precacheList)) {
		for (const [_, sResource] of ipairs(list)) {
			PrecacheResource(sPrecacheMode, sResource, context);
		}
	}

	// for (const k in KeyValues.UnitsKv) {
	// 	if (k != "Version") {
	// 		PrecacheUnitByNameSync(k, context);
	// 	}
	// }

	// for (const k in KeyValues.ItemsKv) {
	// 	if (k != "Version") {
	// 		PrecacheItemByNameSync(k, context);
	// 	}
	// }
}

function SpawnGroupPrecache(hSpawnGroup: SpawnGroupHandle, context: CScriptPrecacheContext) {
}

require("reload");