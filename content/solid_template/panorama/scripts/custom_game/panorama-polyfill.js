// Auto-generated from package.json Polyfill (index.ts, enums.ts)

// ========== index.ts ==========
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

// ========== enums.ts ==========
// 支付类型
var PayType;
(function (PayType) {
    PayType[PayType["MONEY"] = 0] = "MONEY";
    PayType[PayType["MOON"] = 100001] = "MOON";
    PayType[PayType["STAR"] = 100002] = "STAR";
    PayType[PayType["SHARD"] = 100003] = "SHARD";
    PayType[PayType["COIN"] = 110001] = "COIN";
})(PayType || (PayType = {}));
