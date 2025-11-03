import { reloadable } from "../lib/tstl-utils";

@reloadable
class MRequest extends CModule {
	tEvents: Record<string, { callback: (...args: any) => any, context?: any; }>;
	initPriority(): number {
		return 2;
	}
	init(bReload: boolean): void {
		this.tEvents = {};
		if (IsServer()) {
			CustomUIEvent("server_request_event", function (...args) { return this.OnServerEvent(...args); }, this);
			CustomUIEvent("cancel_server_request_event", function (tData) {
				let playerID = tData.PlayerID;
				CustomNetTables.GetTableValue;
				let keys = CustomNetTables.GetAllTableKeys(`request_${playerID}` as "request_0");
				for (const key of keys) {
					if (key.startsWith(tData.queueIndex)) {
						CustomNetTables.SetTableValue(`request_${playerID}` as "request_0", key, undefined);
					}
				}
			}, this);
		} else {
			GameEvent("client_request_event", function (...args) { return this.OnClientEvent(...args); }, this);
		}
	}

	/**
	 * 注册服务器请求事件，可以从js端的请求，来获取luaserver端的数据
	 * @param sEvent 事件名
	 * @param func 回调
	 * @param context
	 * @serverOnly 
	 */
	RegisterServerEvent<EventName extends keyof ServerRequestEventDeclarations, RequestParams extends ServerRequestEventDeclarations[EventName]["params"], RequestResults extends ServerRequestEventDeclarations[EventName]["results"], TContext extends {}>(sEvent: EventName, func: (this: TContext, tEvents: RequestParams) => RequestResults, context: TContext): void;
	RegisterServerEvent<EventName extends keyof ServerRequestEventDeclarations, RequestParams extends ServerRequestEventDeclarations[EventName]["params"], RequestResults extends ServerRequestEventDeclarations[EventName]["results"]>(sEvent: EventName, func: (tEvents: RequestParams) => RequestResults, context?: undefined) {
		this.tEvents[sEvent] = {
			callback: func,
			context: context,
		};
	}

	FireServerEvent<EventName extends keyof ServerRequestEventDeclarations, RequestParams extends ServerRequestEventDeclarations[EventName]["params"]>(sEvent: EventName, iPlayerID: PlayerID, data: RequestParams) {
		this.OnServerEvent({
			event: sEvent,
			PlayerID: iPlayerID,
			data: json.encode(data),
			queueIndex: "",
			_IsFire: true,
		});
	}

	private OnServerEvent(tData: UIEventProperties<{ event: string, data: string, queueIndex: string; }> & { _IsFire?: boolean; }) {
		let hPlayer = PlayerResource.GetPlayer(tData.PlayerID ?? -1);
		if (hPlayer == undefined) return;

		let tEventTable = this.tEvents[tData.event];
		if (tEventTable == undefined) return;

		let [data] = json.decode(tData.data);
		if (data == undefined) return;

		coroutine.wrap(function () {
			let [a, b] = xpcall(function () {
				data.PlayerID = tData.PlayerID;

				let result;
				let func = tEventTable.callback;
				if (tEventTable.context != undefined) {
					result = (func as typeof noSelfFunction)(tEventTable.context, data);
				} else {
					result = (func as typeof noSelfFunction)(data);
				}

				if (tData._IsFire != true && typeof result == "object") {
					let stepAmount = 8192;
					let json_str = json.encode(result);
					let length = json_str.length;
					let maxStep = math.ceil(length / stepAmount);
					let nowStep = 1;
					let queueIndex = tData.queueIndex;
					let s = "";
					for (const i of $range(1, maxStep, 1)) {
						let iStart = Clamp((i - 1) * stepAmount + 1, 1, length);
						let iEnd = Clamp(i * stepAmount, 1, length);
						s = s + string.sub(json_str, iStart, iEnd);
						CustomNetTables.SetTableValue(`request_${data.PlayerID}` as "request_0", `${queueIndex}_____${nowStep}`, {
							result: string.sub(json_str, iStart, iEnd),
							maxStep: maxStep,
							nowStep: nowStep,
						});
						nowStep = nowStep + 1;
					}
				}
			}, debug.traceback);
			assert(a, b);
		})();
	}

	/**
	 * 注册客户端请求事件，可以从js端的请求，来获取luaclient端的数据
	 * @param sEvent 事件名
	 * @param func 回调
	 * @param context
	 * @serverOnly 
	 */
	RegisterClientEvent<EventName extends keyof ClientRequestEventDeclarations, RequestParams extends ClientRequestEventDeclarations[EventName]["params"], RequestResults extends ClientRequestEventDeclarations[EventName]["results"], TContext extends {}>(sEvent: EventName, func: (this: TContext, tEvents: RequestParams) => RequestResults, context: TContext): void;
	RegisterClientEvent<EventName extends keyof ClientRequestEventDeclarations, RequestParams extends ClientRequestEventDeclarations[EventName]["params"], RequestResults extends ClientRequestEventDeclarations[EventName]["results"]>(sEvent: EventName, func: (tEvents: RequestParams) => RequestResults, context?: undefined) {
		this.tEvents[sEvent] = {
			callback: func,
			context: context,
		};
	}

	FireClientEvent<EventName extends keyof ClientRequestEventDeclarations, RequestParams extends ClientRequestEventDeclarations[EventName]["params"]>(sEvent: EventName, iPlayerID: PlayerID, data: RequestParams) {
		this.OnClientEvent({
			game_event_listener: -1 as EventListenerID,
			game_event_name: "",
			splitscreenplayer: GetLocalPlayerID(),

			event: sEvent,
			data: json.encode(data),

			_IsFire: true,
		});
	}

	private OnClientEvent(tData: EventProperties<"client_request_event"> & { _IsFire?: boolean; }) {
		let tEventTable = this.tEvents[tData.event];
		if (tEventTable == undefined) return;

		let [data] = json.decode(tData.data);
		if (data == undefined) return;

		let result;
		let func = tEventTable.callback;
		if (tEventTable.context != undefined) {
			result = (func as typeof noSelfFunction)(tEventTable.context, data);
		} else {
			result = (func as typeof noSelfFunction)(data);
		}
		if (tData._IsFire != true && typeof result == "object") {
			let json_str = json.encode(result);
			_G.ClientRequestEventResult = json_str;
		}
	}
}
declare global {
	var Request: MRequest;
}
if (_G.Request == undefined) {
	_G.Request = new MRequest();
}