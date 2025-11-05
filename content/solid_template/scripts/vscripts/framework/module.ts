/**
 * 模块组
 */
declare var Modules: CModule[];

/** 基础模块功能 */
Modules ??= [];
class CModule {
	isModule: boolean = true;
	init(reload: boolean) { };
	initPriority() {
		return 0;
	}
	constructor() {
		let index = 0;
		for (let i = Modules.length - 1; i >= 0; i--) {
			index = i + 1;
			const element = Modules[i];
			if (element.initPriority() >= this.initPriority()) {
				break;
			}
		}
		Modules.splice(index, 0, this);
	}
	dispose() {
		Modules.splice(Modules.indexOf(this), 1);
	}
	static initialize() {
		Modules.forEach(m => m.init(false));
	}
	static reload() {
		Modules.forEach(m => m.init(true));
	}
	print(...args: any[]) {
		print(`[${this.constructor.name}]: `, ...args);
	}
	reset() { }
	static reset() {
		Modules.forEach(m => m.reset());
	}
}