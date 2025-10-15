!function(){"use strict";function e(e,...t){if("string"!=typeof e)return[e,...t].map((e=>n(e))).join(" ");let o=String(e).replace(/%[sdj%]/g,(e=>{if("%%"===e)return"%";if(0===t.length)return e;switch(e){case"%s":return String(t.shift());case"%d":return String(Number(t.shift()));case"%j":try{return JSON.stringify(t.shift())}catch{return"[Circular]"}default:return e}}));for(const e of t)o+="object"!=typeof e||null===e?` ${e}`:` ${n(e)}`;return o}function n(e,o,r=""){let i="";if("string"==typeof e)i=`"${e}"`;else if("number"==typeof e||"boolean"==typeof e)i=`${e}`;else if("function"==typeof e)i=function(e){if("function"!=typeof e)return!1;const n=Object.getOwnPropertyDescriptor(e,"prototype");return!!n&&!n.writable}(e)?`[class ${e.name}]`:`[function ${e.name}]`;else if("symbol"==typeof e)i=e.toString();else if(void 0===e)i="undefined";else if("bigint"==typeof e)i=`[bigint ${e.toString()}]`;else if("object"==typeof e)if(null===e)i="null";else if(Array.isArray(e)){let t=[];for(const i of e)t.push(r+n(i,o,o?r+"    ":r));o?(i+="[\n",i+=t.map((e=>"    "+e)).join(",\n"),i+="\n"+r+"]"):i=`[ ${t.join(", ")} ]`}else{let s=[],c="";if(e instanceof Map){c="[Map]";for(const[t,i]of e.entries()){let e="";"object"==typeof t?e=Array.isArray(t)?"[Array]":"[Object]":t.toString&&(e=t.toString()),s.push(`${r}${e}: ${n(i,o,o?r+"    ":r)}`)}}else if(e instanceof Set){c="[Set]";for(const t of e.values())s.push(`${r}${n(t,o,o?r+"    ":r)}`)}else{const i=t(e);for(const[t,c]of Object.entries(e))"style"===t&&i?s.push(`${r}${t}: [VCSSStyleDeclaration]`):s.push(`${r}${t}: ${n(c,o,o?r+"    ":r)}`)}o?(i+=c+"{\n",i+=s.map((e=>"    "+e)).join(",\n"),i+="\n"+r+"}"):i=c+`{ ${s.join(", ")} }`}return i}const t=e=>"paneltype"in e&&"rememberchildfocus"in e&&"SetPanelEvent"in e;function o(e){for(const n of e.split("\n"))if(n.length>2047){const e="... (line have been trimmed because of a length limit)";$.Warning(`${n.slice(0,2047-e.length)}${e}`)}else $.Msg(n)}function r(...n){$.Warning(e(...n))}const i=r;function s(...n){o(e(...n))}const c=s,l=s,f=new Map;const u={logx:function(...e){o(function(e,...t){if("string"!=typeof e)return[e,...t].map((e=>n(e,!0))).join(" ");let o=String(e).replace(/%[sdj%]/g,(e=>{if("%%"===e)return"%";if(0===t.length)return e;switch(e){case"%s":return String(t.unshift());case"%d":return String(Number(t.unshift()));case"%j":try{return JSON.stringify(t.unshift())}catch{return"[Circular]"}default:return e}}));for(const e of t)o+="object"!=typeof e||null===e?` ${e}`:` ${n(e)}`;return o}(...e))},assert:function(e,n="console.assert",...t){e||r(new Error(`Assertion failed: ${n}`),...t)},warn:i,error:r,log:s,debug:c,info:l,time:function(e="default"){e=`${e}`,f.has(e)?i(`Timer '${e}' already exists`):f.set(e,Date.now())},timeEnd:function(e="default"){e=`${e}`;const n=f.get(e);null!=n?(f.delete(e),o(`${e}: ${Date.now()-n}ms`)):i(`Timer '${e} does not exist'`)},trace:function n(t="",...r){const i={message:e(t,...r),name:"Trace",stack:""};Error.captureStackTrace(i,n),o(e(i.stack))},clear:function(){},dir:function(){throw new Error("console.dir is not implemented")},dirxml:function(){throw new Error("console.dirxml is not implemented")},table:function(){throw new Error("console.table is not implemented")},count:function(){throw new Error("console.count is not implemented")},countReset:function(){throw new Error("console.countReset is not implemented")},group:function(){throw new Error("console.group is not implemented")},groupCollapsed:function(){throw new Error("console.groupCollapsed is not implemented")},groupEnd:function(){throw new Error("console.groupEnd is not implemented")},profile:function(){throw new Error("console.profile is not implemented")},profileEnd:function(){throw new Error("console.profileEnd is not implemented")},timeStamp:function(){throw new Error("console.timeStamp is not implemented")}};globalThis.console=u}();


!function(){"use strict";const e=new Map;let l=-1e5;const t=(e,l=0,...t)=>$.Schedule(l/1e3,(()=>e(...t)));function c(t,c=0,...a){c/=1e3,l-=1;const s=l,n=()=>{e.set(s,$.Schedule(c,n)),t(...a)};return e.set(s,$.Schedule(c,n)),s}const a=(e,...l)=>$.Schedule(0,(()=>e(...l)));function s(l){if("number"==typeof l)try{l<-1e5?e.has(l)&&($.CancelScheduled(e.get(l)),e.delete(l)):$.CancelScheduled(l)}catch{}}globalThis.setInterval=c,globalThis.clearInterval=s,globalThis.setTimeout=t,globalThis.clearTimeout=s,globalThis.setImmediate=a,globalThis.clearImmediate=s}();


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

