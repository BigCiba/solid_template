if (Activated) {
	GameEventListenerIDs.forEach((a) => {
		StopListeningToGameEvent(a);
	});
	CustomUIEventListenerIDs.forEach((a) => {
		CustomGameEventManager.UnregisterListener(a);
	});
	_G.GameEventListenerIDs = [];
	_G.CustomUIEventListenerIDs = [];

	if (IsServer()) {
		_G.TimerEventListenerIDs = [];
	}

	collectgarbage('collect');

	// CModule.reload();

	if (IsServer()) {
		if (GameRules.State_Get() > DOTA_GameState.DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD) {
			GameRules.Playtesting_UpdateAddOnKeyValues();
			FireGameEvent("client_reload_game_keyvalues", {});

			print("Reload Scripts");
		}
	}
}

function table_size(t: any, tRecord: Record<any, any> = {}) {
	let n = 0;
	tRecord[t] = true;
	for (const [k, v] of pairs(t)) {
		if (tRecord[v] != true && typeof v == "object") {
			n += table_size(v, tRecord);
		} else {
			n += 1;
		}
	}
	return n;
}

print(`[${IsServer() ? "server" : "client"} global size]: ${table_size(_G)}`);
