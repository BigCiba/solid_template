if (GameUI.CustomUIConfig()._Request_QueueIndex == undefined) {
	GameUI.CustomUIConfig()._Request_QueueIndex = 0;
}
if (GameUI.CustomUIConfig()._Request_Table == undefined) {
	GameUI.CustomUIConfig()._Request_Table = {};
}
if (GameUI.CustomUIConfig()._Request_Result == undefined) {
	GameUI.CustomUIConfig()._Request_Result = {};
}
if (GameUI.CustomUIConfig()._Request_Listener != undefined) {
	GameEvents.Unsubscribe(GameUI.CustomUIConfig()._Request_Listener);
}
function Think() {
	let playerID = Players.GetLocalPlayer();
	if (playerID == -1) {
		$.Schedule(0, Think);
	} else {
		GameUI.CustomUIConfig()._Request_Listener = CustomNetTables.SubscribeNetTableListener(`request_${playerID}`, (tableName, queueIndex, data) => {
			let index = queueIndex.replaceAll(`_____${data.nowStep}`, "");
			if (GameUI.CustomUIConfig()._Request_Result[index] == undefined) {
				GameUI.CustomUIConfig()._Request_Result[index] = {};
			}
			GameUI.CustomUIConfig()._Request_Result[index][data.nowStep] = data.result;
			let bFinished = true;
			for (let i = data.maxStep; i > 0; i--) {
				let a = GameUI.CustomUIConfig()._Request_Result[index][i];
				if (a == undefined) {
					bFinished = false;
				}
			}
			if (!bFinished) return;
			let func = GameUI.CustomUIConfig()._Request_Table[index];
			delete GameUI.CustomUIConfig()._Request_Table[index];
			if (!func) return;

			let s = "";
			for (let i = 1; i <= data.maxStep; i++) {
				s += GameUI.CustomUIConfig()._Request_Result[index][i];
			}
			try {
				func(JSON.parse(s));
			} catch (error) {
			}
			// func(JSON.parse(data.result));

			GameEvents.SendCustomEventToServer("cancel_server_request_event", {
				queueIndex: index
			});
			delete GameUI.CustomUIConfig()._Request_Result[index];
		});
	}
}
Think();