//********************************************************************************
// Server
//********************************************************************************
declare interface CCustomNetTableManager {
	SetTableValue<
		TName extends keyof CustomNetTableDeclarations,
		T extends CustomNetTableDeclarations[TName],
		K extends keyof T
	>(
		tableName: TName,
		keyName: K,
		value: T[K] | undefined,
	): boolean;
	SetTableValue_Engine: typeof CCustomNetTableManager.SetTableValue;
	TablesKeys: Record<string, never[]>;
	GetAllTableKeys<TName extends keyof CustomNetTableDeclarations, T extends CustomNetTableDeclarations[TName], K extends keyof T>(
		tableName: TName,
	): K[];
	SetNetData<
		TName extends keyof NetDataDeclarations,
		T extends NetDataDeclarations[TName],
		K extends keyof T
	>(
		tableName: TName,
		keyName: K,
		value: T[K] | undefined,
		playerID?: PlayerID,
	): void;
	GetNetData<
		TName extends keyof NetDataDeclarations,
		T extends NetDataDeclarations[TName],
		K extends keyof T
	>(
		tableName: TName,
		keyName: K,
		playerID?: PlayerID,
	): T[K] | undefined;


	GetTableValue_Engine: typeof CCustomNetTableManager.GetTableValue;
	ClientNetTable: Record<string, Record<number, any>>;
	ClientNetData: Record<string, Record<number, any>>;
}
if (IsServer()) {
	if (CCustomNetTableManager.SetTableValue_Engine == undefined) {
		CCustomNetTableManager.SetTableValue_Engine = CCustomNetTableManager.SetTableValue;
	}
	CCustomNetTableManager.SetTableValue = function (tableName, keyName, value) {
		xpcall(function () {
			if (typeof value == "object") {
				// print(tableName, keyName, json.encode(value).length);
			}
		}, debug.traceback);
		let bSuccess = this.SetTableValue_Engine(tableName, keyName, value);
		if (bSuccess) {
			if (CCustomNetTableManager.TablesKeys == undefined) {
				CCustomNetTableManager.TablesKeys = {};
			}
			if (CCustomNetTableManager.TablesKeys[tableName] == undefined) {
				CCustomNetTableManager.TablesKeys[tableName] = [];
			}
			if (value != undefined && TableFindKey(CCustomNetTableManager.TablesKeys[tableName], keyName) == undefined) {
				CCustomNetTableManager.TablesKeys[tableName].push(keyName as never);
			}
			else if (value == undefined) {
				ArrayRemove(CCustomNetTableManager.TablesKeys[tableName], keyName);
			}
		}
		return bSuccess;
	};
	CCustomNetTableManager.GetAllTableKeys = function (tableName) {
		if (CCustomNetTableManager.TablesKeys != undefined && CCustomNetTableManager.TablesKeys[tableName] != undefined) {
			return shallowcopy(CCustomNetTableManager.TablesKeys[tableName]);
		}
		return [];
	};
	CCustomNetTableManager.SetNetData = function (tableName, tableKey, value, playerID) {
		let keyName = playerID != undefined ? tableKey + playerID : tableKey;
		let data = value == undefined ? "" : json.encode(value);
		// @ts-ignore
		CustomNetTables.SetTableValue(tableName, keyName, { data });
	};
	CCustomNetTableManager.GetNetData = function (tableName, tableKey, playerID) {
		let keyName = playerID != undefined ? tableKey + playerID : tableKey;
		// @ts-ignore
		let t = CustomNetTables.GetTableValue(tableName, keyName);
		// @ts-ignore
		if (t == undefined || t.data == undefined) {
			return;
		}
		// @ts-ignore
		let a = json.decode(t.data)[0];
		return a;
	};
}

//********************************************************************************
// Client
//********************************************************************************
if (IsClient()) {
	if (CCustomNetTableManager.GetTableValue_Engine == undefined) {
		CCustomNetTableManager.GetTableValue_Engine = CCustomNetTableManager.GetTableValue;
	}
	CCustomNetTableManager.GetTableValue = function (tableName, keyName) {
		let key = tableName + "," + keyName;
		let key2 = GetFrameCount();
		if (CCustomNetTableManager.ClientNetTable == undefined) {
			CCustomNetTableManager.ClientNetTable = {};
		}
		let t;
		if (CCustomNetTableManager.ClientNetTable[key]?.[key2] == undefined) {
			CCustomNetTableManager.ClientNetTable[key] = {};
			t = CCustomNetTableManager.ClientNetTable[key][key2] = this.GetTableValue_Engine(tableName, keyName);
		} else {
			t = CCustomNetTableManager.ClientNetTable[key][key2];
		}
		return t;
	};
	CCustomNetTableManager.GetNetData = function (tableName, tableKey, playerID) {
		let keyName;
		if (playerID != undefined) {
			keyName = tableKey + playerID;
		} else {
			keyName = tableKey;
		}

		let key = tableName + "," + keyName;
		let key2 = GetFrameCount();
		if (CCustomNetTableManager.ClientNetData == undefined) {
			CCustomNetTableManager.ClientNetData = {};
		}
		let t;
		if (CCustomNetTableManager.ClientNetData[key]?.[key2] == undefined) {
			CCustomNetTableManager.ClientNetData[key] = {};
			// @ts-ignore
			let a = CustomNetTables.GetTableValue(tableName, keyName);
			// @ts-ignore
			if (a != undefined && a.data != undefined) {
				// @ts-ignore
				t = CCustomNetTableManager.ClientNetData[key][key2] = json.decode(a.data)[0];
			}
		} else {
			t = CCustomNetTableManager.ClientNetData[key][key2];
		}
		return t;
	};
}