// Auto-generated from src/polyfill/ (index.ts, localization.ts, math-utils.ts)

// ========== 来自 index.ts ==========
/**
 * 符号分割器 - 将内容按指定分隔符分割并转换为对象
 * @param content 要分割的内容
 * @param symbol1 第一级分隔符
 * @param symbol2 第二级分隔符
 * @returns 分割后的对象
 */
function SymbolSpliter(content, symbol1, symbol2) {
    return Object.fromEntries(content.split(symbol1).map(function (str) {
        return str.split(symbol2);
    }));
}
// 自定义 polyfill 初始化
!function () {
    // polyfill 初始化逻辑
}();

// ========== 来自 localization.ts ==========
/**
 * 本地化相关的 polyfill 函数
 */
/**
 * 获取本地化文本
 * @param key 本地化键名
 * @param fallback 备用文本
 * @returns 本地化后的文本
 */
function GetLocalizedText(key, fallback) {
    // 这里可以实现真正的本地化逻辑
    // 例如从 Dota 的本地化系统获取文本
    try {
        return $.Localize(key) || fallback || key;
    }
    catch (_a) {
        return fallback || key;
    }
}
/**
 * 格式化本地化文本（支持参数替换）
 * @param key 本地化键名
 * @param params 参数对象
 * @returns 格式化后的文本
 */
function FormatLocalizedText(key, params) {
    var text = GetLocalizedText(key);
    // 替换参数 {param_name} -> 实际值
    Object.entries(params).forEach(function (_a) {
        var paramKey = _a[0], value = _a[1];
        text = text.replace(new RegExp("\\{".concat(paramKey, "\\}"), 'g'), String(value));
    });
    return text;
}

// ========== 来自 math-utils.ts ==========
/**
 * 数学工具函数 polyfill
 */
/**
 * 将数字格式化为带千分位分隔符的字符串
 * @param num 要格式化的数字
 * @param separator 分隔符，默认为逗号
 * @returns 格式化后的字符串
 */
function FormatNumberWithCommas(num, separator) {
    if (separator === void 0) { separator = ','; }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
}
/**
 * 将数字格式化为简短的显示格式（如 1.2K, 3.4M）
 * @param num 要格式化的数字
 * @returns 简短格式的字符串
 */
function FormatNumberShort(num) {
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
function ClampNumber(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
/**
 * 线性插值
 * @param a 起始值
 * @param b 结束值
 * @param t 插值因子 (0-1)
 * @returns 插值结果
 */
function Lerp(a, b, t) {
    return a + (b - a) * ClampNumber(t, 0, 1);
}
