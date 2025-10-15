/**
 * 本地化相关的 polyfill 函数
 */

/**
 * 获取本地化文本
 * @param key 本地化键名
 * @param fallback 备用文本
 * @returns 本地化后的文本
 */
function GetLocalizedText(key: string, fallback?: string): string {
	// 这里可以实现真正的本地化逻辑
	// 例如从 Dota 的本地化系统获取文本
	try {
		return $.Localize(key) || fallback || key;
	} catch {
		return fallback || key;
	}
}

/**
 * 格式化本地化文本（支持参数替换）
 * @param key 本地化键名
 * @param params 参数对象
 * @returns 格式化后的文本
 */
function FormatLocalizedText(key: string, params: Record<string, string | number>): string {
	let text = GetLocalizedText(key);

	// 替换参数 {param_name} -> 实际值
	Object.entries(params).forEach(([paramKey, value]) => {
		text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(value));
	});

	return text;
}