
import { reloadable } from "../lib/tstl-utils";

declare global {
	var Event: MEvent;
	interface EventCallback {
		test: {};
	}
}

@reloadable
class MEvent extends CModule {
	eventList: Record<number, Function>;
	eventId: number;
	eventIdMap: Record<string, { context: any, eventID: number; }[]>;
	initPriority() {
		return 9;
	}
	init(reload: boolean) {
		if (!reload) {
			this.eventId = 1;
			this.eventList = {};
			this.eventIdMap = {};
		}
		for (const [eventType, _] of pairs(this.eventIdMap)) {
			/** 重注册模块的事件 */
			for (let i = this.eventIdMap[eventType].length - 1; i >= 0; i--) {
				const eventData = this.eventIdMap[eventType][i];
				if (eventData.context != undefined && eventData.context.isModule != undefined) {
					table.remove(this.eventIdMap[eventType], i + 1);
				}
			}
		}
	}
	/** 注册事件 */
	Register<K extends keyof EventCallback, TContext extends {}>(eventType: K, callback: (data: EventCallback[K]) => void, context?: TContext): number {
		this.eventIdMap[eventType] = this.eventIdMap[eventType] ?? [];
		let eventID = this.eventId;
		this.eventList[eventID] = callback;
		this.eventIdMap[eventType].push({ context, eventID });
		this.eventId++;
		return eventID;
	}
	/** 取消注册 */
	Unregister(eventId: number) {
		delete this.eventList[eventId];
	}
	/** 发送事件 */
	Fire<K extends keyof EventCallback>(eventType: K, data: EventCallback[K], modifierEventData?: {
		modifierEvent: EOMModifierEvents,
		source?: CDOTA_BaseNPC,
		target?: CDOTA_BaseNPC;
	}) {
		if (modifierEventData != undefined) {
			FireModifierEvent(modifierEventData.modifierEvent, data, modifierEventData.source, modifierEventData.target);
		}
		this.eventIdMap[eventType]?.forEach(eventData => {
			if (this.eventList[eventData.eventID] == undefined) {
				return;
			}
			if (eventData.context != undefined) {
				// @ts-ignore
				xpcall(this.eventList[eventData.eventID], debug.traceback, eventData.context, data);
			} else {
				// @ts-ignore
				xpcall(this.eventList[eventData.eventID], debug.traceback, undefined, data);
			}
		});
	}
}
if (_G.Event == undefined) {
	_G.Event = new MEvent();
}