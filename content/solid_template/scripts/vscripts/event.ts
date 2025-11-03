
/**
 * 注册游戏事件
 * @param eventName 事件
 * @param listener 监听
 * @param context
 * @returns 返回事件注册ID
 */
function GameEvent<TName extends keyof GameEventDeclarations>(
	eventName: TName,
	listener: (event: GameEventProvidedProperties & GameEventDeclarations[TName]) => void,
	context?: undefined,
): EventListenerID;
function GameEvent<TName extends keyof GameEventDeclarations, TContext extends {}>(
	eventName: TName,
	listener: (this: TContext, event: GameEventProvidedProperties & GameEventDeclarations[TName]) => void,
	context: TContext,
): EventListenerID;
function GameEvent(eventName: any, listener: any, context: any) {
	let iListenerID = ListenToGameEvent(eventName, listener, context);
	GameEventListenerIDs.push(iListenerID);
	return iListenerID;
}
/**
 * 注销游戏事件
 * @param iListenerID 事件注册ID
 */
function StopGameEvent(iListenerID: EventListenerID) {
	for (const i of $range(GameEventListenerIDs.length - 1, 0, -1)) {
		const element = GameEventListenerIDs[i];
		if (element == iListenerID) {
			table.remove(GameEventListenerIDs, i + 1);
			StopListeningToGameEvent(iListenerID);
		}
	}
}

/**
 * 注册UI事件
 * @param eventName 事件
 * @param listener 监听
 * @param context
 * @returns 返回事件注册ID
 */
function CustomUIEvent<T extends string | object, TContext extends {}>(
	eventName: (T extends string ? T : string) | keyof CustomGameEventDeclarations,
	listener: (
		this: TContext,
		event: NetworkedData<CCustomGameEventManager.InferEventType<T, object> & { PlayerID: PlayerID; }>,
	) => void,
	context: TContext,
): CustomGameEventListenerID;
function CustomUIEvent<T extends string | object>(
	eventName: (T extends string ? T : string) | keyof CustomGameEventDeclarations,
	listener: (
		event: NetworkedData<CCustomGameEventManager.InferEventType<T, object> & { PlayerID: PlayerID; }>,
	) => void,
	context?: undefined,
): CustomGameEventListenerID;
function CustomUIEvent(eventName: any, listener: (...args: any[]) => any, context: any) {
	let iListenerID = CustomGameEventManager.RegisterListener(eventName, (_, ...args) => {
		if (context != undefined) {
			return listener(context, ...args);
		}
		return listener(...args);
	});
	CustomUIEventListenerIDs.push(iListenerID);
	return iListenerID;
}
/**
 * 注销UI事件
 * @param iListenerID 事件注册ID
 */
function StopCustomUIEvent(iListenerID: CustomGameEventListenerID) {
	for (const i of $range(CustomUIEventListenerIDs.length - 1, 0, -1)) {
		const element = CustomUIEventListenerIDs[i];
		if (element == iListenerID) {
			table.remove(CustomUIEventListenerIDs, i + 1);
		}
	}
	CustomGameEventManager.UnregisterListener(iListenerID);
}