import { reloadable } from "../lib/tstl-utils";

/** 计时器，不会被游戏暂停 */
@reloadable
class CTimer extends CModule {
	index: number = 1;
	timerList: Record<string, {
		interval: number;
		stack: number;
		type: "GameTimer" | "Timer" | "Modifier";
		entity: CBaseEntity,
		callback: () => number | void,
	}> = {};
	record: number = 0;

	reset() {
		this.index = 1;
		this.timerList = {};
		this.record = 0;
	}

	Think() {
		this.record++;
		const frame = FrameTime();
		let keys = Object.keys(this.timerList).sort();
		//let keys = StringKeysToNumberKeys(Object.keys(this.timerList));
		for (const i of $range(keys.length, 1, -1)) {
			const index = keys[i - 1] as unknown as number;
			//const index = keys[i - 1];
			const timerData = this.timerList[index];
			// 回调中StopTimer会导致timerData为空
			if (timerData == undefined) {
				continue;
			}
			// 暂停处理
			if (GameRules.IsGamePaused() && (timerData.type == "GameTimer" || timerData.type == "Modifier")) {
				continue;
			}
			// 实体销毁
			if (timerData.entity != undefined && !IsValid(timerData.entity)) {
				// 销毁计时器
				// @ts-ignore
				this.timerList[index] = undefined;
				continue;
			}
			timerData.stack += frame;
			// 时间到期
			if (timerData.stack >= timerData.interval) {
				let [_, interval] = xpcall(timerData.callback, debug.traceback, timerData.entity ?? this);
				if (typeof interval == "number") {
					timerData.stack -= timerData.interval;
					// 根据return的间隔开启下一次think
					// let _interval = math.max(interval, FRAME_TIME);
					timerData.interval = interval;
				} else if (timerData.type == "Modifier") {
					// Modifier不会return interval，特殊处理
					timerData.stack -= timerData.interval;
				} else {
					// 没有return销毁计时器
					// @ts-ignore
					this.timerList[index] = undefined;
				}
			}
		}
	}

	init(bReload: boolean): void {
		if (!bReload) {
			// if (IsClient()) {
			// 	GameRules.GetGameModeEntity().SetContextThink(DoUniqueString("Timer"), () => {
			// 		this.Think();
			// 		return FrameTime();
			// 	}, 0);
			// }
		}
	}

	StartInternalThinker(type: "Timer" | "GameTimer" | "Modifier", entity: any, fInterval: any, funcThink: () => number | void) {
		fInterval = math.max(fInterval, FrameTime());
		this.timerList[this.index] = {
			interval: fInterval,
			stack: 0,
			type: type,
			entity: entity,
			callback: funcThink
		};
		this.index++;
		return tostring(this.index - 1);
	}

	// 不暂停
	Timer(entity: any, fInterval: any, funcThink: () => number | void) {
		if (funcThink == undefined) {
			funcThink = fInterval;
			fInterval = entity;
			entity = undefined;
		}
		return this.StartInternalThinker("Timer", entity, fInterval, funcThink);
	}

	// 暂停
	GameTimer(entity: any, fInterval: any, funcThink: () => number | void) {
		if (funcThink == undefined) {
			funcThink = fInterval;
			fInterval = entity;
			entity = undefined;
		}
		return this.StartInternalThinker("GameTimer", entity, fInterval, funcThink);
	}

	/** 代替Buff上的StartIntervalThink */
	StartIntervalThink(modifier: any, fInterval: number, funcThink: () => void) {
		return this.StartInternalThinker("Modifier", modifier, fInterval, funcThink);
	}

	// 清除计时器
	StopTimer(index: string) {
		if (this.timerList[index]) {
			delete this.timerList[index];
		}
	}
}

declare global {
	var Timer: CTimer;
}

if (_G.Timer == undefined) {
	_G.Timer = new CTimer();
}