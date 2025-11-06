/**
 * Reloads all scripts and clears event listeners
 */

declare var GameModeActivated: boolean;
if (GameModeActivated) {
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

	CModule.reload();

	if (IsServer()) {
		print("Reload completed. Server time: " + GameRules.GetGameTime());
	}
} else {
	GameModeActivated = true;
}