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

function SaveData(panel: Panel, key: string, value: any) {
	(panel.Data() as any)[key] = value;
};
function LoadData(panel: Panel, key: string) {
	return (panel.Data() as any)[key];
};

// 自定义 polyfill 初始化
!(function () {
	// polyfill 初始化逻辑
} as any)();
