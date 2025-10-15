/**
 * 数学工具函数 polyfill
 */

/**
 * 将数字格式化为带千分位分隔符的字符串
 * @param num 要格式化的数字
 * @param separator 分隔符，默认为逗号
 * @returns 格式化后的字符串
 */
function FormatNumberWithCommas(num: number, separator: string = ','): string {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}

/**
 * 将数字格式化为简短的显示格式（如 1.2K, 3.4M）
 * @param num 要格式化的数字
 * @returns 简短格式的字符串
 */
function FormatNumberShort(num: number): string {
	if (num >= 1000000000) {
		return (num / 1000000000).toFixed(1) + 'B';
	}
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	}
	if (num >= 1000) {
		return (num / 1000).toFixed(1) + 'K';
	}
	return num.toString();
}

/**
 * 限制数字在指定范围内
 * @param value 要限制的值
 * @param min 最小值
 * @param max 最大值
 * @returns 限制后的值
 */
function ClampNumber(value: number, min: number, max: number): number {
	return Math.min(Math.max(value, min), max);
}

/**
 * 线性插值
 * @param a 起始值
 * @param b 结束值
 * @param t 插值因子 (0-1)
 * @returns 插值结果
 */
function Lerp(a: number, b: number, t: number): number {
	return a + (b - a) * ClampNumber(t, 0, 1);
}