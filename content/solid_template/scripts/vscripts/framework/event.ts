import { reloadable } from "../lib/tstl-utils";

declare global {
	var Event: MEvent;
	interface EventCallback {
		test: {};
	}
}

interface EventListenerData {
	context?: any;
	eventID: number;
	callback: Function;
	priority?: number;  // ✅ 新增优先级字段
}

type EventFilter<K extends keyof EventCallback> = (data: EventCallback[K]) => boolean;

@reloadable
class MEvent extends CModule {
	private eventId: number;
	private eventIdMap: Record<string, EventListenerData[]>;

	initPriority() {
		return 9;
	}

	init(reload: boolean) {
		if (!reload) {
			this.eventId = 1;
			this.eventIdMap = {};
		} else {
			// ✅ 改进：完整清理模块事件
			this.cleanupModuleListeners();
		}
	}

	/**
	 * 清理所有 CModule 注册的监听器
	 */
	private cleanupModuleListeners() {
		for (const [eventType, listeners] of pairs(this.eventIdMap)) {
			for (let i = listeners.length - 1; i >= 0; i--) {
				const listener = listeners[i];
				if (listener.context?.isModule === true) {
					table.remove(listeners, i + 1);
				}
			}

			// ✅ 清理空的事件类型
			if (listeners.length === 0) {
				delete this.eventIdMap[eventType];
			}
		}
	}

	/**
	 * 注册事件监听器
	 * @returns 事件ID，用于取消注册
	 */
	Register<K extends keyof EventCallback, TContext extends {}>(
		eventType: K,
		callback: (this: TContext, data: EventCallback[K]) => void,
		context?: TContext
	): number {
		this.eventIdMap[eventType] ??= [];

		const eventID = this.eventId++;
		const listener: EventListenerData = {
			context,
			eventID,
			callback,
		};

		this.eventIdMap[eventType].push(listener);
		return eventID;
	}

	/**
	 * 注册带优先级的事件监听器
	 * @param priority 优先级（越小越先执行，默认 100）
	 */
	RegisterWithPriority<K extends keyof EventCallback, TContext extends {}>(
		eventType: K,
		callback: (this: TContext, data: EventCallback[K]) => void,
		priority: number = 100,
		context?: TContext
	): number {
		this.eventIdMap[eventType] ??= [];

		const eventID = this.eventId++;
		const listener: EventListenerData = {
			context,
			eventID,
			callback,
			priority
		};

		const listeners = this.eventIdMap[eventType];

		// 按优先级插入（保持有序）
		let insertIndex = listeners.length;
		for (let i = 0; i < listeners.length; i++) {
			const currentPriority = listeners[i].priority ?? 100;
			if (priority < currentPriority) {
				insertIndex = i;
				break;
			}
		}

		table.insert(listeners, insertIndex + 1, listener);
		return eventID;
	}

	/**
	 * 取消注册事件监听器
	 */
	Unregister(eventId: number): boolean {
		// ✅ 修复：从 eventIdMap 中移除
		for (const [eventType, listeners] of pairs(this.eventIdMap)) {
			for (let i = listeners.length - 1; i >= 0; i--) {
				if (listeners[i].eventID === eventId) {
					table.remove(listeners, i + 1);

					// 清理空的事件类型
					if (listeners.length === 0) {
						delete this.eventIdMap[eventType];
					}

					return true;
				}
			}
		}

		return false;
	}

	/**
	 * 取消注册特定上下文的所有监听器
	 */
	UnregisterContext(context: any): number {
		let count = 0;

		for (const [eventType, listeners] of pairs(this.eventIdMap)) {
			for (let i = listeners.length - 1; i >= 0; i--) {
				if (listeners[i].context === context) {
					table.remove(listeners, i + 1);
					count++;
				}
			}

			if (listeners.length === 0) {
				delete this.eventIdMap[eventType];
			}
		}

		return count;
	}

	/**
	 * 取消注册特定事件类型的所有监听器
	 */
	UnregisterAll<K extends keyof EventCallback>(eventType: K): number {
		const listeners = this.eventIdMap[eventType];
		if (!listeners) return 0;

		const count = listeners.length;
		delete this.eventIdMap[eventType];
		return count;
	}

	/**
	 * 检查是否有监听器
	 */
	HasListeners<K extends keyof EventCallback>(eventType: K): boolean {
		const listeners = this.eventIdMap[eventType];
		return listeners !== undefined && listeners.length > 0;
	}

	/**
	 * 获取监听器数量
	 */
	GetListenerCount<K extends keyof EventCallback>(eventType?: K): number {
		if (eventType !== undefined) {
			return this.eventIdMap[eventType]?.length ?? 0;
		}

		// 所有监听器总数
		let total = 0;
		for (const [_, listeners] of pairs(this.eventIdMap)) {
			total += listeners.length;
		}
		return total;
	}

	/**
	 * 发送事件
	 */
	Fire<K extends keyof EventCallback>(
		eventType: K,
		data: EventCallback[K]
	) {
		const listeners = this.eventIdMap[eventType];
		if (!listeners || listeners.length === 0) {
			return;
		}

		// ✅ 改进：清理无效监听器 + 错误收集
		const errors: Array<{ eventID: number; error: string; }> = [];

		for (let i = listeners.length - 1; i >= 0; i--) {
			const listener = listeners[i];

			// 检查监听器是否仍然有效
			if (!listener || !listener.callback) {
				table.remove(listeners, i + 1);
				continue;
			}

			// 安全调用回调
			const [success, errorMsg] = xpcall(
				listener.callback as any,
				debug.traceback,
				listener.context,
				data
			);

			if (!success) {
				errors.push({
					eventID: listener.eventID,
					error: errorMsg as string,
				});

				Warning(`Event listener error:\nType: ${eventType}\nID: ${listener.eventID}\nError: ${errorMsg}`);
			}
		}

		// 清理空的事件类型
		if (listeners.length === 0) {
			delete this.eventIdMap[eventType];
		}

		return errors;
	}

	/**
	 * 注册一次性事件监听器（触发后自动取消）
	 */
	Once<K extends keyof EventCallback, TContext extends {}>(
		eventType: K,
		callback: (this: TContext, data: EventCallback[K]) => void,
		context?: TContext
	): number {
		let eventID: number;

		const wrappedCallback = (data: EventCallback[K]) => {
			callback.call(context as TContext, data);
			this.Unregister(eventID);
		};

		eventID = this.Register(eventType, wrappedCallback as any, context);
		return eventID;
	}

	/**
	 * 注册带过滤器的事件监听器
	 * 只有通过过滤器的事件才会触发回调
	 */
	RegisterFiltered<K extends keyof EventCallback, TContext extends {}>(
		eventType: K,
		filter: EventFilter<K>,
		callback: (this: TContext, data: EventCallback[K]) => void,
		context?: TContext
	): number {
		const wrappedCallback = (data: EventCallback[K]) => {
			if (filter(data)) {
				callback.call(context as TContext, data);
			}
		};

		return this.Register(eventType, wrappedCallback as any, context);
	}

	/**
	 * 打印所有事件监听器（调试用）
	 */
	DebugPrint() {
		if (IsDedicatedServer()) return;

		print("=== Event System Debug ===");
		print(`Total event types: ${Object.keys(this.eventIdMap).length}`);
		print(`Total listeners: ${this.GetListenerCount()}`);
		print(`Next event ID: ${this.eventId}`);
		print("");

		for (const [eventType, listeners] of pairs(this.eventIdMap)) {
			print(`[${eventType}] (${listeners.length} listeners)`);

			for (const listener of listeners) {
				const contextName = listener.context?.constructor?.name ??
					(listener.context?.isModule ? "Module" : "Global");
				const priority = listener.priority ?? 100;

				print(`  - ID:${listener.eventID} Priority:${priority} Context:${contextName}`);
			}
			print("");
		}

		print("========================");
	}

	/**
	 * 获取内存使用统计
	 */
	GetMemoryStats() {
		let totalListeners = 0;
		let totalEventTypes = 0;

		for (const [_, listeners] of pairs(this.eventIdMap)) {
			totalEventTypes++;
			totalListeners += listeners.length;
		}

		return {
			eventTypes: totalEventTypes,
			listeners: totalListeners,
			avgListenersPerType: totalEventTypes > 0 ? totalListeners / totalEventTypes : 0
		};
	}
}

// 注册调试命令
if (!IsDedicatedServer()) {
	Convars.RegisterCommand("event_debug", () => {
		Event.DebugPrint();
	}, "Print event system debug info", 0);

	Convars.RegisterCommand("event_stats", () => {
		const stats = Event.GetMemoryStats();
		print(`Event Types: ${stats.eventTypes}`);
		print(`Total Listeners: ${stats.listeners}`);
		print(`Avg Listeners/Type: ${stats.avgListenersPerType.toFixed(2)}`);
	}, "Print event system statistics", 0);
}