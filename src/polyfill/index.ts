let CustomUIConfig = GameUI.CustomUIConfig();
let KeyValues = GameUI.CustomUIConfig();
let STEAM_WEB_KEY = "D34B40626FBA6E482A7653E4FB8A80CB";

function print(...args: any[]) {
	if (!Game.IsInToolsMode()) {
		return;
	}
	let s = "";
	let a = [...args];

	a.forEach(e => {
		if (s != "") {
			s += "\t";
		}
		if (typeof (e) == "function" && e.length == 0) {
			e = e();
		}
		if (typeof (e) == "object") {
			s = s + JSON.stringify(e);
		} else {
			s = s + String(e);
		}
	});
	if (s.length > 2000) {
		for (let i = 0; i < s.length; i += 2000) {
			$.Msg(s.slice(i, Math.min(s.length, i + 2000)));
		}
	} else {
		$.Msg(s);
	}
}
/**
 * 递归打印对象结构
 * @param obj 要打印的对象
 * @param name 对象名称
 * @param str 缩进字符串
 * @param map 已访问对象的映射，用于避免循环引用
 */
function alertObj(obj: any, name?: string, str?: string, map?: Map<any, boolean>): void {
	if (!Game.IsInToolsMode()) {
		return;
	}
	let output = "";
	if (name == null) {
		name = toString(obj);
	}
	if (str == null) {
		str = "";
	}

	if (map == null) {
		map = new Map();
	}
	map.set(obj, true);

	$.Msg(str + name + "\n" + str + "{");
	for (let k in obj) {
		let property = obj[k];
		if (typeof (property) == "object") {
			if (map.get(property)) {
				$.Msg(str + "\t" + k + " = [already seen]");
				continue;
			}
			alertObj(property, k, str + "\t", map);
		} else {
			output = k + " = " + property + "\t(" + typeof (property) + ")";
			$.Msg(str + "\t" + output);
		}
	}
	$.Msg(str + "}");
}

/**
 * 深度打印对象的所有属性和结构
 * @param obj 要打印的对象
 */
function DeepPrint(obj: any): void {
	return alertObj(obj);
}
/**
 * 符号分割器 - 将内容按指定分隔符分割并转换为对象
 * @param content 要分割的内容
 * @param symbol1 第一级分隔符
 * @param symbol2 第二级分隔符
 * @returns 分割后的对象
 */
function SymbolSpliter(content: string, symbol1: string, symbol2: string): Record<string, string> {
	return Object.fromEntries(
		content.split(symbol1).map(str => {
			return str.split(symbol2);
		})
	);
}

/** 获取当前语言
 * @returns 当前语言字符串（仅返回 english、russian 或 schinese）
 */
function Language() {
	// 获取当前语言的逻辑
	let language = $.Language().toLowerCase();
	// 只返回english, russian和schinese两种语言，其他语言均返回english
	if (language !== "russian" && language !== "schinese") {
		language = "english";
	}
	return language;
}
interface CustomUIConfig {
	_unique_id: number;
}

CustomUIConfig._unique_id = CustomUIConfig._unique_id || 0;
/**
 * 获取随机字符串
 * @param {string} string 基础字符串
 * @returns {string}
 */
function DoUniqueString(string?: string): string {
	return `${string}${CustomUIConfig._unique_id++}`;
};

/** 保存数据到面板的Data属性中
 * @param panel 目标面板
 * @param key 键
 * @param value 值
 */
function SaveData(panel: Panel, key: string, value: any) {
	(panel.Data() as any)[key] = value;
};

/** 从面板的Data属性中加载数据
 * @param panel 目标面板
 * @param key 键
 * @returns 值
 */
function LoadData(panel: Panel, key: string) {
	return (panel.Data() as any)[key];
};

/** 返回`url('file://{images}/custom_game/${relativePath}')` */
function getImagePath(relativePath: string | string[]) {
	if (typeof relativePath == "string") {
		return `url('file://{images}/custom_game/${relativePath}')`;
	} else {
		return `url('file://{images}/custom_game/${relativePath.join("/")}')`;
	}
}
/** 返回`s2r://panorama/images/custom_game/${relativePath.replace(".png", "_png")}.vtex` */
function getSrcPath(relativePath: string | string[]) {
	if (typeof relativePath == "string") {
		return `s2r://panorama/images/custom_game/${relativePath.replace(".png", "_png")}.vtex`;
	} else {
		return `s2r://panorama/images/custom_game/${relativePath.join("/").replace(".png", "_png")}`;
	}
}

/** 发送UI端事件到客户端 */
function clientSideEvent(eventName: string, eventData: any) {
	GameEvents.SendEventClientSide("client_side_event", { event_name: eventName, event_data: JSON.stringify(eventData) });
}
/** 发送UI端事件到所有客户端 */
function allClientSideEvent(eventName: string, eventData: any) {
	GameEvents.SendCustomGameEventToAllClients<any>("client_side_event", { event_name: eventName, event_data: JSON.stringify(eventData) });
}
/** 封装客户端消息 */
interface ClientSideEventData {
	event_name: string;
	event_data: string;
}

function useClientSideEvent(eventName: string, callback: (data: any) => void): GameEventListenerID {
	return GameEvents.Subscribe<ClientSideEventData>("client_side_event", (eventData) => {
		if (eventName == eventData.event_name) {
			callback(JSON.parseSafe(eventData.event_data));
		}
	});
}
/** 封装客户端消息 */
interface ToggleWindowEventData {
	window_name: string;
	state: number;
}

function useToggleWindow(
	windowName: string,
	value: () => boolean,
	setter: (value: boolean) => void
): GameEventListenerID {
	return GameEvents.Subscribe<ToggleWindowEventData>("custom_ui_toggle_windows", (eventData) => {
		if (eventData.window_name == windowName) {
			if (eventData.state == 1) {
				setter(eventData.state == 1);
			} else {
				setter(!value());
			}
		} else {
			setter(false);
		}
	});
}
// 自定义 polyfill 初始化
!(function () {
	// polyfill 初始化逻辑
} as any)();
