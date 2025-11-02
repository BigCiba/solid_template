// Auto-generated from package.json Polyfill (timers.js, console.js, index.ts, enums.ts, localization.ts)

// ========== timers.js ==========
!function () { "use strict"; const e = new Map; let l = -1e5; const t = (e, l = 0, ...t) => $.Schedule(l / 1e3, (() => e(...t))); function c(t, c = 0, ...a) { c /= 1e3, l -= 1; const s = l, n = () => { e.set(s, $.Schedule(c, n)), t(...a); }; return e.set(s, $.Schedule(c, n)), s; } const a = (e, ...l) => $.Schedule(0, (() => e(...l))); function s(l) { if ("number" == typeof l) try { l < -1e5 ? e.has(l) && ($.CancelScheduled(e.get(l)), e.delete(l)) : $.CancelScheduled(l); } catch { } } globalThis.setInterval = c, globalThis.clearInterval = s, globalThis.setTimeout = t, globalThis.clearTimeout = s, globalThis.setImmediate = a, globalThis.clearImmediate = s; }();
// ========== console.js ==========
!function () { "use strict"; function e(e, ...t) { if ("string" != typeof e) return [e, ...t].map((e => n(e))).join(" "); let o = String(e).replace(/%[sdj%]/g, (e => { if ("%%" === e) return "%"; if (0 === t.length) return e; switch (e) { case "%s": return String(t.shift()); case "%d": return String(Number(t.shift())); case "%j": try { return JSON.stringify(t.shift()); } catch { return "[Circular]"; } default: return e; } })); for (const e of t) o += "object" != typeof e || null === e ? ` ${e}` : ` ${n(e)}`; return o; } function n(e, o, r = "") { let i = ""; if ("string" == typeof e) i = `"${e}"`; else if ("number" == typeof e || "boolean" == typeof e) i = `${e}`; else if ("function" == typeof e) i = function (e) { if ("function" != typeof e) return !1; const n = Object.getOwnPropertyDescriptor(e, "prototype"); return !!n && !n.writable; }(e) ? `[class ${e.name}]` : `[function ${e.name}]`; else if ("symbol" == typeof e) i = e.toString(); else if (void 0 === e) i = "undefined"; else if ("bigint" == typeof e) i = `[bigint ${e.toString()}]`; else if ("object" == typeof e) if (null === e) i = "null"; else if (Array.isArray(e)) { let t = []; for (const i of e) t.push(r + n(i, o, o ? r + "    " : r)); o ? (i += "[\n", i += t.map((e => "    " + e)).join(",\n"), i += "\n" + r + "]") : i = `[ ${t.join(", ")} ]`; } else { let s = [], c = ""; if (e instanceof Map) { c = "[Map]"; for (const [t, i] of e.entries()) { let e = ""; "object" == typeof t ? e = Array.isArray(t) ? "[Array]" : "[Object]" : t.toString && (e = t.toString()), s.push(`${r}${e}: ${n(i, o, o ? r + "    " : r)}`); } } else if (e instanceof Set) { c = "[Set]"; for (const t of e.values()) s.push(`${r}${n(t, o, o ? r + "    " : r)}`); } else { const i = t(e); for (const [t, c] of Object.entries(e)) "style" === t && i ? s.push(`${r}${t}: [VCSSStyleDeclaration]`) : s.push(`${r}${t}: ${n(c, o, o ? r + "    " : r)}`); } o ? (i += c + "{\n", i += s.map((e => "    " + e)).join(",\n"), i += "\n" + r + "}") : i = c + `{ ${s.join(", ")} }`; } return i; } const t = e => "paneltype" in e && "rememberchildfocus" in e && "SetPanelEvent" in e; function o(e) { for (const n of e.split("\n")) if (n.length > 2047) { const e = "... (line have been trimmed because of a length limit)"; $.Warning(`${n.slice(0, 2047 - e.length)}${e}`); } else $.Msg(n); } function r(...n) { $.Warning(e(...n)); } const i = r; function s(...n) { o(e(...n)); } const c = s, l = s, f = new Map; const u = { logx: function (...e) { o(function (e, ...t) { if ("string" != typeof e) return [e, ...t].map((e => n(e, !0))).join(" "); let o = String(e).replace(/%[sdj%]/g, (e => { if ("%%" === e) return "%"; if (0 === t.length) return e; switch (e) { case "%s": return String(t.unshift()); case "%d": return String(Number(t.unshift())); case "%j": try { return JSON.stringify(t.unshift()); } catch { return "[Circular]"; } default: return e; } })); for (const e of t) o += "object" != typeof e || null === e ? ` ${e}` : ` ${n(e)}`; return o; }(...e)); }, assert: function (e, n = "console.assert", ...t) { e || r(new Error(`Assertion failed: ${n}`), ...t); }, warn: i, error: r, log: s, debug: c, info: l, time: function (e = "default") { e = `${e}`, f.has(e) ? i(`Timer '${e}' already exists`) : f.set(e, Date.now()); }, timeEnd: function (e = "default") { e = `${e}`; const n = f.get(e); null != n ? (f.delete(e), o(`${e}: ${Date.now() - n}ms`)) : i(`Timer '${e} does not exist'`); }, trace: function n(t = "", ...r) { const i = { message: e(t, ...r), name: "Trace", stack: "" }; Error.captureStackTrace(i, n), o(e(i.stack)); }, clear: function () { }, dir: function () { throw new Error("console.dir is not implemented"); }, dirxml: function () { throw new Error("console.dirxml is not implemented"); }, table: function () { throw new Error("console.table is not implemented"); }, count: function () { throw new Error("console.count is not implemented"); }, countReset: function () { throw new Error("console.countReset is not implemented"); }, group: function () { throw new Error("console.group is not implemented"); }, groupCollapsed: function () { throw new Error("console.groupCollapsed is not implemented"); }, groupEnd: function () { throw new Error("console.groupEnd is not implemented"); }, profile: function () { throw new Error("console.profile is not implemented"); }, profileEnd: function () { throw new Error("console.profileEnd is not implemented"); }, timeStamp: function () { throw new Error("console.timeStamp is not implemented"); } }; globalThis.console = u; }();
// ========== index.ts ==========
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var CustomUIConfig = GameUI.CustomUIConfig();
var KeyValues = GameUI.CustomUIConfig();
var STEAM_WEB_KEY = "D34B40626FBA6E482A7653E4FB8A80CB";
function print() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (!Game.IsInToolsMode()) {
        return;
    }
    var s = "";
    var a = __spreadArray([], args, true);
    a.forEach(function (e) {
        if (s != "") {
            s += "\t";
        }
        if (typeof (e) == "function" && e.length == 0) {
            e = e();
        }
        if (typeof (e) == "object") {
            s = s + JSON.stringify(e);
        }
        else {
            s = s + String(e);
        }
    });
    if (s.length > 2000) {
        for (var i = 0; i < s.length; i += 2000) {
            $.Msg(s.slice(i, Math.min(s.length, i + 2000)));
        }
    }
    else {
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
function alertObj(obj, name, str, map) {
    if (!Game.IsInToolsMode()) {
        return;
    }
    var output = "";
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
    for (var k in obj) {
        var property = obj[k];
        if (typeof (property) == "object") {
            if (map.get(property)) {
                $.Msg(str + "\t" + k + " = [already seen]");
                continue;
            }
            alertObj(property, k, str + "\t", map);
        }
        else {
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
function DeepPrint(obj) {
    return alertObj(obj);
}
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
/** 获取当前语言
 * @returns 当前语言字符串（仅返回 english、russian 或 schinese）
 */
function Language() {
    // 获取当前语言的逻辑
    var language = $.Language().toLowerCase();
    // 只返回english, russian和schinese两种语言，其他语言均返回english
    if (language !== "russian" && language !== "schinese") {
        language = "english";
    }
    return language;
}
CustomUIConfig._unique_id = CustomUIConfig._unique_id || 0;
/**
 * 获取随机字符串
 * @param {string} string 基础字符串
 * @returns {string}
 */
function DoUniqueString(string) {
    return "".concat(string).concat(CustomUIConfig._unique_id++);
}
;
/** 保存数据到面板的Data属性中
 * @param panel 目标面板
 * @param key 键
 * @param value 值
 */
function SaveData(panel, key, value) {
    panel.Data()[key] = value;
}
;
/** 从面板的Data属性中加载数据
 * @param panel 目标面板
 * @param key 键
 * @returns 值
 */
function LoadData(panel, key) {
    return panel.Data()[key];
}
;
/** 返回`url('file://{images}/custom_game/${relativePath}')` */
function getImagePath(relativePath) {
    if (typeof relativePath == "string") {
        return "url('file://{images}/custom_game/".concat(relativePath, "')");
    }
    else {
        return "url('file://{images}/custom_game/".concat(relativePath.join("/"), "')");
    }
}
/** 返回`s2r://panorama/images/custom_game/${relativePath.replace(".png", "_png")}.vtex` */
function getSrcPath(relativePath) {
    if (typeof relativePath == "string") {
        return "s2r://panorama/images/custom_game/".concat(relativePath.replace(".png", "_png"), ".vtex");
    }
    else {
        return "s2r://panorama/images/custom_game/".concat(relativePath.join("/").replace(".png", "_png"));
    }
}
/** 发送UI端事件到客户端 */
function clientSideEvent(eventName, eventData) {
    GameEvents.SendEventClientSide("client_side_event", { event_name: eventName, event_data: JSON.stringify(eventData) });
}
/** 发送UI端事件到所有客户端 */
function allClientSideEvent(eventName, eventData) {
    GameEvents.SendCustomGameEventToAllClients("client_side_event", { event_name: eventName, event_data: JSON.stringify(eventData) });
}
function useClientSideEvent(eventName, callback) {
    return GameEvents.Subscribe("client_side_event", function (eventData) {
        if (eventName == eventData.event_name) {
            callback(JSON.parseSafe(eventData.event_data));
        }
    });
}
function useToggleWindow(windowName, value, setter) {
    return GameEvents.Subscribe("custom_ui_toggle_windows", function (eventData) {
        if (eventData.window_name == windowName) {
            if (eventData.state == 1) {
                setter(eventData.state == 1);
            }
            else {
                setter(!value());
            }
        }
        else {
            setter(false);
        }
    });
}
// 自定义 polyfill 初始化
!function () {
    // polyfill 初始化逻辑
}();

// ========== enums.ts ==========
/** 支付类型 */
var PayType;
(function (PayType) {
    PayType[PayType["MONEY"] = 0] = "MONEY";
    PayType[PayType["MOON"] = 100001] = "MOON";
    PayType[PayType["STAR"] = 100002] = "STAR";
    PayType[PayType["SHARD"] = 100003] = "SHARD";
    PayType[PayType["COIN"] = 110001] = "COIN";
})(PayType || (PayType = {}));
/** 玩家登录状态 */
var PlayerLoginState;
(function (PlayerLoginState) {
    PlayerLoginState[PlayerLoginState["None"] = 0] = "None";
    PlayerLoginState[PlayerLoginState["Success"] = 1] = "Success";
    PlayerLoginState[PlayerLoginState["NoPermission"] = 2] = "NoPermission";
    PlayerLoginState[PlayerLoginState["Banned"] = 3] = "Banned"; // 无许可证
})(PlayerLoginState || (PlayerLoginState = {}));
/** 游戏阶段 */
var GameStage;
(function (GameStage) {
    GameStage[GameStage["None"] = 0] = "None";
    GameStage[GameStage["GameStart"] = 1] = "GameStart";
    GameStage[GameStage["HeroSelection"] = 2] = "HeroSelection";
    GameStage[GameStage["BeforeHeroSpawn"] = 3] = "BeforeHeroSpawn";
    GameStage[GameStage["PreGame"] = 4] = "PreGame";
    GameStage[GameStage["GameInProgress"] = 5] = "GameInProgress";
    GameStage[GameStage["ChallengeTime"] = 6] = "ChallengeTime";
    GameStage[GameStage["PostGame"] = 7] = "PostGame";
    GameStage[GameStage["GameRestart"] = 8] = "GameRestart";
    GameStage[GameStage["HeroReselection"] = 9] = "HeroReselection";
    GameStage[GameStage["HookGame"] = 10] = "HookGame";
    GameStage[GameStage["FirstBattle"] = 11] = "FirstBattle";
})(GameStage || (GameStage = {}));

// ========== localization.ts ==========
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * 将字符串里$xxx替换为具体翻译
 * @param str 要替换的字符串
 * @returns 替换后的字符串
 * @example replaceDollar("$mana") -> "蓝量加成"
 */
function replaceDollar(text) {
    return text.replace(/\$(\w+)\b/g, function (match, variableName, offset, string) {
        var text = "dota_ability_variable_".concat(variableName);
        var localization = Localize(text);
        if (localization == text) {
            return match;
        }
        return localization;
    });
}
function Localize(token) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (token == "")
        return token;
    var parent;
    var value;
    if (args.length == 1) {
        if (typeof args[0] == "number") {
            value = args[0];
        }
        else {
            parent = args[0];
        }
    }
    if (args.length == 2) {
        value = args[0];
        parent = args[1];
    }
    var originalToken = token;
    if (token[0] != "#") {
        token = "#" + token;
    }
    var old = token;
    if (value != undefined) {
        if (parent != undefined) {
            token = $.Localize(token, value, parent);
        }
        else {
            token = $.Localize(token, value, $.GetContextPanel());
        }
    }
    else {
        if (parent != undefined) {
            token = $.Localize(token, parent);
        }
        else {
            token = $.Localize(token, $.GetContextPanel());
        }
    }
    if (token.length == old.length && token.toLocaleLowerCase() == old.toLocaleLowerCase()) {
        return originalToken;
    }
    token = replaceDollar(token);
    token = token.replace(/(?<!%(-)?(\.(\d+))?([dfl])?\w+\b)%%/g, "%");
    token = token.replace(/<(\w+\b):([\s\S]*?)\/>/g, function (match, key, text, offset, string) {
        var featureKey = GetLocalization("feature_".concat(key), "");
        if (featureKey == "")
            return match;
        // GameUI.CustomUIConfig().LocalizationFeatureList ??= []
        if (GameUI.CustomUIConfig().LocalizationFeatureList != undefined) {
            if (GameUI.CustomUIConfig().LocalizationFeatureList.indexOf(key) == -1) {
                GameUI.CustomUIConfig().LocalizationFeatureList.push(key);
            }
        }
        return "<span class='FeatureLabel'>".concat(text, "</span>");
    });
    return token;
}
function GetLocalization(text, defaultText) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var localizedText = Localize.apply(void 0, __spreadArray([text], args, false));
    if (defaultText != undefined && localizedText == text) {
        localizedText = defaultText;
    }
    return localizedText;
}
function ClearLocalizationFeatureList() {
    GameUI.CustomUIConfig().LocalizationFeatureList = [];
}
function GetLocalizationFeatureList() {
    return GameUI.CustomUIConfig().LocalizationFeatureList;
}
function GetAndClearLocalizationFeatureList() {
    var feature = GameUI.CustomUIConfig().LocalizationFeatureList;
    if (!feature)
        return;
    var list = __spreadArray([], feature, true);
    GameUI.CustomUIConfig().LocalizationFeatureList = undefined;
    return list;
}
function GetItemName(itemName, defaultText, parent) {
    var abilityKV = GameUI.CustomUIConfig().ItemsKv[itemName];
    if (abilityKV == undefined) {
        return GetLocalization(itemName, defaultText);
    }
    var customItemType = abilityKV.CustomItemType;
    if (customItemType == "ABILITY_BOOK") {
        return GetLocalization("#DOTA_Tooltip_ability_" + abilityKV.LinkAbility, defaultText, parent);
    }
    return GetLocalization("DOTA_Tooltip_ability_" + itemName, defaultText, parent);
}
function ReplaceAttribute(text, attrbiutes, classnames) {
    if (attrbiutes == undefined)
        return text;
    var _loop_1 = function (key) {
        var attrbiute = attrbiutes[key];
        if (!Array.isArray(attrbiute))
            return "continue";
        if (attrbiute.length != 3)
            return "continue";
        var name = attrbiute[0], value = attrbiute[1], multiplicative = attrbiute[2];
        var isMultiplicative = multiplicative == 1;
        var regExp = new RegExp("{a:".concat(key, ":([\\s\\S]*?)}"), "g");
        text = text.replace(regExp, function (match, s, offset, string) {
            var attributeLocalization = GetLocalization("dota_ability_attribute_".concat(name), "");
            var isPercentage = false;
            var isNegative = false;
            if (attributeLocalization != "") {
                isPercentage = attributeLocalization[0] == "%";
                isNegative = attributeLocalization[attributeLocalization.length - 1] == "*";
                attributeLocalization = "".concat(attributeLocalization.substring(isPercentage ? 1 : 0, isNegative ? attributeLocalization.length - 1 : attributeLocalization.length));
            }
            var sign = "+";
            if (value < 0) {
                sign = "-";
            }
            s = s.replace(new RegExp("%(-)?(\\.(\\d+))?([dfl])?value\\b%", "g"), function (_, sign, __, precisionNumber, type) {
                var hasSign = sign != undefined;
                var precision = precisionNumber != undefined ? toFiniteNumber(precisionNumber, 2) : undefined;
                var valueNumberToString = function (value) {
                    value = Float(value);
                    if (!hasSign) {
                        value = Math.abs(value);
                    }
                    // 如果过小
                    if (Math.abs(value) < 1) {
                        if (type == "d") {
                            return String(Math.trunc(value));
                        }
                        else if (type == "f") {
                            if (precision != undefined) {
                                return value.toFixed(precision);
                            }
                            else {
                                return String(value);
                            }
                        }
                        return String(value);
                    }
                    if (type == "d") {
                        return String(Math.trunc(value));
                    }
                    else if (type == "f") {
                        if (precision != undefined) {
                            return value.toFixed(precision);
                        }
                        else {
                            return String(value);
                        }
                    }
                    return FormatNumber(value, precision);
                };
                var v = valueNumberToString(value);
                v = isPercentage ? "".concat(v, "%") : v;
                if (classnames != undefined) {
                    v = "<span class='".concat(classnames, "'>").concat(v, "</span>");
                }
                if (isMultiplicative) {
                    var mark = GetLocalization("dota_ability_variable_mult_mark", "");
                    if (mark != "") {
                        v = v + mark;
                    }
                }
                return v;
            });
            return s.replaceAll("%sign%", sign).replaceAll("%name%", attributeLocalization);
        });
    };
    for (var key in attrbiutes) {
        _loop_1(key);
    }
    return text;
}
function IsActiveAbility(iBehavior) {
    if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_TOGGLE) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_TOGGLE) {
        return true;
    }
    if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET) {
        return true;
    }
    if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT) {
        return true;
    }
    if ((iBehavior & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET) {
        return true;
    }
    return false;
}
var castTypeList = [
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AURA, "DOTA_ToolTip_Ability_Aura"], // 光环
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_AUTOCAST, "DOTA_ToolTip_Ability_AutoCast"], // 自动施放
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_PASSIVE + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NORMAL_WHEN_STOLEN, "DOTA_ToolTip_Ability_Passive_Summon"], // 自动召唤
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_PASSIVE, "DOTA_ToolTip_Ability_Passive"], // 被动
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_TOGGLE, "DOTA_ToolTip_Ability_Toggle"], // 切换
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_CHANNELLED, "DOTA_ToolTip_Ability_Channeled"], // 持续施法
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_NO_TARGET, "DOTA_ToolTip_Ability_NoTarget"], // 无目标
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_RUNE_TARGET, "DOTA_ToolTip_Ability_Item"], // 物品目标
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING, "DOTA_ToolTip_Ability_Vector_Unit"], // 单位矢量目标
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING, "DOTA_ToolTip_Ability_Vector_Point"], // 点矢量目标
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT + DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET, "DOTA_ToolTip_Ability_UnitOrPoint_Target"], // 点目标
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_POINT, "DOTA_ToolTip_Ability_Point"], // 点目标
    [DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_UNIT_TARGET, "DOTA_ToolTip_Ability_Target"], // 单位目标
];
function GetAbilityCastTypeText(iBehavior) {
    for (var _i = 0, castTypeList_1 = castTypeList; _i < castTypeList_1.length; _i++) {
        var _a = castTypeList_1[_i], i = _a[0], s = _a[1];
        if ((iBehavior & i) == i) {
            return s;
        }
    }
    return "";
}
function GetAbilityTargetTypeText(iTeam, iType) {
    if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_TREE) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_TREE) {
        return "DOTA_ToolTip_Targeting_Trees";
    }
    if (iTeam == DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_FRIENDLY) {
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) {
            return "DOTA_ToolTip_Targeting_AlliedUnitsAndBuildings";
        }
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) {
            return "DOTA_ToolTip_Targeting_AlliedHeroesAndBuildings";
        }
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
            return "DOTA_ToolTip_Targeting_AlliedUnits";
        }
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
            return "DOTA_ToolTip_Targeting_AlliedHeroes";
        }
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP) {
            return "DOTA_ToolTip_Targeting_AlliedCreeps";
        }
        return "DOTA_ToolTip_Targeting_Allies";
    }
    if (iTeam == DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_ENEMY) {
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) {
            return "DOTA_ToolTip_Targeting_EnemyUnitsAndBuildings";
        }
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_BUILDING) {
            return "DOTA_ToolTip_Targeting_EnemyHeroesAndBuildings";
        }
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP + DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
            return "DOTA_ToolTip_Targeting_EnemyUnits";
        }
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
            return "DOTA_ToolTip_Targeting_EnemyHero";
        }
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_CREEP) {
            return "DOTA_ToolTip_Targeting_EnemyCreeps";
        }
        return "DOTA_ToolTip_Targeting_Enemy";
    }
    if (iTeam == DOTA_UNIT_TARGET_TEAM.DOTA_UNIT_TARGET_TEAM_BOTH) {
        if ((iType & DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) == DOTA_UNIT_TARGET_TYPE.DOTA_UNIT_TARGET_HERO) {
            return "DOTA_Tooltip_Targeting_All_Heroes";
        }
        return "DOTA_ToolTip_Targeting_Units";
    }
    return "";
}
function GetAbilityDamageTypeText(iDamageType, adaptiveDamageType) {
    if (iDamageType == DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) {
        return "DOTA_ToolTip_Damage_Physical";
    }
    if (iDamageType == DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) {
        return "DOTA_ToolTip_Damage_Magical";
    }
    if (iDamageType == DAMAGE_TYPES.DAMAGE_TYPE_PURE) {
        return "DOTA_ToolTip_Damage_Pure";
    }
    if (iDamageType == DAMAGE_TYPES.DAMAGE_TYPE_HP_REMOVAL) {
        if (adaptiveDamageType == DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL) {
            return "DOTA_ToolTip_Damage_Adaptive_Physical";
        }
        else if (adaptiveDamageType == DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL) {
            return "DOTA_ToolTip_Damage_Adaptive_Magical";
        }
        return "DOTA_ToolTip_Damage_Adaptive";
    }
    return "";
}
function GetAbilitySpellImmunityText(iSpellImmunityType) {
    if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ALLIES_YES) {
        return "DOTA_ToolTip_PiercesSpellImmunity_Yes";
    }
    if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ALLIES_NO) {
        return "DOTA_ToolTip_PiercesSpellImmunity_No";
    }
    if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ENEMIES_YES) {
        return "DOTA_ToolTip_PiercesSpellImmunity_Yes";
    }
    if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ENEMIES_NO) {
        return "DOTA_ToolTip_PiercesSpellImmunity_No";
    }
    if (iSpellImmunityType == SPELL_IMMUNITY_TYPES.SPELL_IMMUNITY_ALLIES_YES_ENEMIES_NO) {
        return "DOTA_ToolTip_PiercesSpellImmunity_AlliesYesEnemiesNo";
    }
    return "";
}
function GetAbilityDispelTypeText(sSpellDispellableType) {
    if (sSpellDispellableType == "SPELL_DISPELLABLE_YES") {
        return "DOTA_ToolTip_Dispellable_Yes_Soft";
    }
    if (sSpellDispellableType == "SPELL_DISPELLABLE_NO") {
        return "DOTA_ToolTip_Dispellable_No";
    }
    if (sSpellDispellableType == "SPELL_DISPELLABLE_YES_STRONG") {
        return "DOTA_ToolTip_Dispellable_Yes_Strong";
    }
    return "";
}
function GetItemDispelTypeText(sSpellDispellableType) {
    if (sSpellDispellableType == "SPELL_DISPELLABLE_YES") {
        return "DOTA_ToolTip_Dispellable_Item_Yes_Soft";
    }
    if (sSpellDispellableType == "SPELL_DISPELLABLE_YES_STRONG") {
        return "DOTA_ToolTip_Dispellable_Item_Yes_Strong";
    }
    return "";
}
function defaultComposeAbsNumberToString(value) {
    value = Float(Math.abs(value));
    if (value < 1) {
        return String(value);
    }
    return FormatNumber(value);
}
function composeNumberToString(value) {
    value = Float(value);
    if (Math.abs(value) < 1) {
        return String(value);
    }
    return FormatNumber(value);
}
/**
 * 将数值列表组合为文本。返回字符串数组，需要用string.join来合并。该函数用于需要补充处理字符串连接的时候。
 * @param values 数值
 * @param level 等级
 * @param onlyCurrentLevelValue 是否仅显示当前等级
 * @param maxLevel 最大显示等级
 * @param className 文本额外css的class
 * @param funcNumberToString 数值转化为文本时的方法。默认为处理成大数值文本
 * @see {defaultComposeAbsNumberToString} funcNumberToString的默认值
 * @returns 第一个值为正常的值，第二个为附带百分比符号的
 */
function ComposeValuesSB(values, level, onlyCurrentLevelValue, maxLevel, className, funcNumberToString) {
    var _a;
    if (level === void 0) { level = 1; }
    if (onlyCurrentLevelValue === void 0) { onlyCurrentLevelValue = false; }
    if (maxLevel === void 0) { maxLevel = 1; }
    if (className === void 0) { className = ""; }
    if (funcNumberToString === void 0) { funcNumberToString = defaultComposeAbsNumberToString; }
    if (maxLevel == -1) {
        maxLevel = values.length;
    }
    var textSB = [];
    var textPctSB = [];
    if (level != -1 && onlyCurrentLevelValue && values.length > 0) {
        var value = (_a = values[Clamp(level - 1, -1, values.length - 1)]) !== null && _a !== void 0 ? _a : 0;
        var valueStr = funcNumberToString(value);
        textSB.push("<span class='GameplayVariable ".concat(className, "'>").concat(valueStr, "</span>"));
        textPctSB.push("<span class='GameplayVariable ".concat(className, "'>").concat(valueStr, "%</span>"));
    }
    else {
        var isFirst = true;
        for (var index = 0; index < maxLevel; index++) {
            if (!isFirst) {
                textSB.push(" / ");
                textPctSB.push(" / ");
            }
            else {
                isFirst = false;
            }
            var value = values[Clamp(index, 0, values.length - 1)];
            var valueStr = funcNumberToString(value);
            if (level != -1 && index + 1 == Math.min(level, values.length)) {
                textSB.push("<span class='GameplayVariable ".concat(className, "'>").concat(valueStr, "</span>"));
                textPctSB.push("<span class='GameplayVariable ".concat(className, "'>").concat(valueStr, "%</span>"));
            }
            else {
                textSB.push("<span class='".concat(className, "'>").concat(valueStr, "</span>"));
                textPctSB.push("<span class='".concat(className, "'>").concat(valueStr, "%</span>"));
            }
        }
    }
    if (level == -1) {
        textSB.unshift("<span class='GameplayValues GameplayVariable'>");
        textSB.push("</span>");
        textPctSB.unshift("<span class='GameplayValues GameplayVariable'>");
        textPctSB.push("</span>");
    }
    else {
        textSB.unshift("<span class='GameplayValues'>");
        textSB.push("</span>");
        textPctSB.unshift("<span class='GameplayValues'>");
        textPctSB.push("</span>");
    }
    return [textSB, textPctSB];
}
/**
 * 将数值列表组合为文本
 * @param values 数值
 * @param level 等级
 * @param onlyCurrentLevelValue 是否仅显示当前等级
 * @param maxLevel 最大显示等级
 * @param className 文本额外css的class
 * @param funcNumberToString 数值转化为文本时的方法。默认为处理成大数值文本
 * @see {defaultComposeAbsNumberToString} funcNumberToString的默认值
 * @returns 第一个值为正常的值，第二个为附带百分比符号的
 */
function ComposeValues(values, level, onlyCurrentLevelValue, maxLevel, className, funcNumberToString) {
    if (level === void 0) { level = 1; }
    if (onlyCurrentLevelValue === void 0) { onlyCurrentLevelValue = false; }
    if (maxLevel === void 0) { maxLevel = 1; }
    if (className === void 0) { className = ""; }
    if (funcNumberToString === void 0) { funcNumberToString = defaultComposeAbsNumberToString; }
    var _a = ComposeValuesSB(values, level, onlyCurrentLevelValue, maxLevel, className, funcNumberToString), textSB = _a[0], textPctSB = _a[1];
    return [textSB.join(""), textPctSB.join("")];
}
/**
 * 替换技能数值
 * @param text 文本，需要以本地化的文本
 * @param abilityValues 技能数值表
 * @param level 显示等级
 * @param {ReplaceValuesOption} options 额外选项
 * @returns 返回替换好的文本
 */
function ReplaceValues(text, abilityValues, level, options) {
    var _a, _b, _c, _d, _e, _f;
    if (level === void 0) { level = -1; }
    var unit = (options === null || options === void 0 ? void 0 : options.UnitEntIndex) != undefined && Entities.IsValidEntity(options.UnitEntIndex) ? options.UnitEntIndex : undefined;
    var showExtra = (_a = options === null || options === void 0 ? void 0 : options.ShowExtra) !== null && _a !== void 0 ? _a : false;
    var isDescription = (_b = options === null || options === void 0 ? void 0 : options.IsDescription) !== null && _b !== void 0 ? _b : false;
    var onlyCurrentLevelValue = (_c = options === null || options === void 0 ? void 0 : options.OnlyCurrentLevelValue) !== null && _c !== void 0 ? _c : false;
    var abilityDamageType = (_d = options === null || options === void 0 ? void 0 : options.AbilityDamageType) !== null && _d !== void 0 ? _d : DAMAGE_TYPES.DAMAGE_TYPE_NONE;
    var addedAttributeValues = (_f = (_e = ClientRequest("get_unit_added_attribute_values", { unit: unit })) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : {};
    var _loop_2 = function (valueName) {
        var abilityValue = abilityValues[valueName];
        if (abilityValue.value == undefined)
            return "continue";
        var regExp = new RegExp("%(-)?(\\.(\\d+))?([dfl])?(".concat(valueName, ")\\b%(%)?"), "g");
        var matches = text.matchAll(regExp);
        var next = matches.next();
        if (next.done) {
            return "continue";
        }
        var originalValues = abilityValue.value.slice();
        var values = abilityValue.value.slice();
        var maxValues = abilityValue._max;
        var minValues = abilityValue._min;
        var addedFactors = {};
        var addedValues = {};
        var _loop_3 = function (addedName) {
            if (addedName[0] != "_")
                return "continue"; // 这里排除不是"_"开头的，因为额外附加属性系数必须"_"开头
            var addedAttributeValue = addedAttributeValues[addedName];
            if (addedAttributeValue == undefined) {
                return "continue";
            }
            var v = abilityValue[addedName];
            if (v == undefined || v.length <= 0 || (v.length == 1 && v[0] == 0)) {
                return "continue";
            }
            addedFactors[addedName] = v.slice();
            var i = -1;
            addedValues[addedName] = v.map(function (factor) {
                i++;
                var added = addedAttributeValue * factor;
                var v = 0;
                if (values[i] != undefined) {
                    v = values[i];
                }
                else {
                    originalValues[i] = 0;
                }
                values[i] = v + added;
                return addedAttributeValue * factor;
            });
        };
        for (var addedName in addedAttributeValues) {
            _loop_3(addedName);
        }
        var showValues = (isDescription ? values : originalValues).slice();
        var simplifyShowValues = SimplifyValuesArray(showValues);
        var classList = {};
        if (!isDescription) {
            var indexOfDamage = valueName.indexOf("damage") != -1; // 是否有伤害关键词
            // 伤害类型
            var damageTypeTooltip = DAMAGE_TYPES.DAMAGE_TYPE_NONE;
            if (abilityValue.DamageTypeTooltip != undefined) {
                damageTypeTooltip = abilityValue.DamageTypeTooltip;
            }
            else if (indexOfDamage) {
                damageTypeTooltip = abilityDamageType;
            }
            // let damagePercent = Number.NaN;
            switch (damageTypeTooltip) {
                case DAMAGE_TYPES.DAMAGE_TYPE_PHYSICAL:
                    classList["DamageTypePhysical"] = true;
                    // damagePercent = addedAttributeValues["physical_damage"];
                    break;
                case DAMAGE_TYPES.DAMAGE_TYPE_MAGICAL:
                    classList["DamageTypeMagical"] = true;
                    // damagePercent = addedAttributeValues["magical_damage"];
                    break;
                case DAMAGE_TYPES.DAMAGE_TYPE_PURE:
                    classList["DamageTypePure"] = true;
                    // damagePercent = addedAttributeValues["pure_damage"];
                    break;
                default:
                    break;
            }
            // 技能增强
            var calculateSpellDamage = false;
            if (abilityValue.CalculateSpellDamageTooltip != undefined) {
                calculateSpellDamage = abilityValue.CalculateSpellDamageTooltip;
            }
            else if (indexOfDamage) {
                calculateSpellDamage = true;
            }
            if (calculateSpellDamage) {
                // let spellAmplify = addedAttributeValues["spell_amplify"];
                // if (spellAmplify != undefined) {
                // 	spellAmplify = spellAmplify * 0.01;
                // 	values.forEach((v, i) => {
                // 		values[i] = v * (1 + spellAmplify);
                // 	});
                // 	if (minValues != undefined) {
                // 		minValues.forEach((v, i) => {
                // 			minValues[i] = v * (1 + spellAmplify);
                // 		});
                // 	}
                // 	if (maxValues != undefined) {
                // 		maxValues.forEach((v, i) => {
                // 			maxValues[i] = v * (1 + spellAmplify);
                // 		});
                // 	}
                // 	for (const addedName in addedValues) {
                // 		const a = addedValues[addedName];
                // 		a.forEach((v, i) => {
                // 			a[i] = v * (1 + spellAmplify);
                // 		});
                // 	}
                // }
                // if (Number.isFinite(damagePercent)) {
                // 	damagePercent = damagePercent * 0.01;
                // 	// 伤害增加
                // 	values.forEach((v, i) => {
                // 		values[i] = v * (1 + damagePercent);
                // 	});
                // 	if (minValues != undefined) {
                // 		minValues.forEach((v, i) => {
                // 			minValues[i] = v * (1 + damagePercent);
                // 		});
                // 	}
                // 	if (maxValues != undefined) {
                // 		maxValues.forEach((v, i) => {
                // 			maxValues[i] = v * (1 + damagePercent);
                // 		});
                // 	}
                // 	for (const addedName in addedValues) {
                // 		const a = addedValues[addedName];
                // 		a.forEach((v, i) => {
                // 			a[i] = v * (1 + damagePercent);
                // 		});
                // 	}
                // }
            }
            var probabilityAmplify_1 = addedAttributeValues["probability_amplify"];
            if (probabilityAmplify_1 != undefined) {
                probabilityAmplify_1 = probabilityAmplify_1 * 0.01;
                // 概率增强
                var isProbability = false;
                if (abilityValue.IsProbability != undefined) {
                    isProbability = abilityValue.IsProbability;
                }
                else if (indexOfDamage) {
                    isProbability = true;
                }
                if (isProbability) {
                    values.forEach(function (v, i) {
                        values[i] = v * (1 + probabilityAmplify_1);
                    });
                    if (minValues != undefined) {
                        minValues.forEach(function (v, i) {
                            minValues[i] = v * (1 + probabilityAmplify_1);
                        });
                    }
                    if (maxValues != undefined) {
                        maxValues.forEach(function (v, i) {
                            maxValues[i] = v * (1 + probabilityAmplify_1);
                        });
                    }
                    var _loop_4 = function (addedName) {
                        var a = addedValues[addedName];
                        a.forEach(function (v, i) {
                            a[i] = v * (1 + probabilityAmplify_1);
                        });
                    };
                    for (var addedName in addedValues) {
                        _loop_4(addedName);
                    }
                }
            }
        }
        var className = classNames(classList);
        var offset = 0;
        var _loop_5 = function () {
            var match = next.value;
            var hasSign = match[1] != undefined;
            var precision = match[3] != undefined ? toFiniteNumber(match[3], 2) : undefined;
            var type = match[4];
            var isPercent = match[6] != undefined;
            var valueNumberToString = function (value) {
                value = Float(value);
                if (!hasSign) {
                    value = Math.abs(value);
                }
                // 如果过小
                if (Math.abs(value) < 1) {
                    if (type == "d") {
                        return String(Math.trunc(value));
                    }
                    else if (type == "f") {
                        if (precision != undefined) {
                            return value.toFixed(precision);
                        }
                        else {
                            return String(value);
                        }
                    }
                    return String(value);
                }
                if (type == "d") {
                    return String(Math.trunc(value));
                }
                else if (type == "f") {
                    if (precision != undefined) {
                        return value.toFixed(precision);
                    }
                    else {
                        return String(value);
                    }
                }
                return FormatNumber(value, precision);
            };
            var _g = ComposeValuesSB(showValues, level, onlyCurrentLevelValue, showValues.length, className, valueNumberToString), valuesSB = _g[0], valuesPctSB = _g[1];
            if (!isDescription) {
                if (!(showExtra && unit != undefined)) {
                    // 正常显示公式
                    var n = 0;
                    for (var addedName in addedAttributeValues) {
                        var factors = addedFactors[addedName];
                        if (factors == undefined) {
                            continue;
                        }
                        var addedLocalization = GetLocalization("dota_ability_special_variable".concat(addedName), "");
                        if (addedLocalization == "")
                            continue;
                        var _h = ComposeValues(factors, level, onlyCurrentLevelValue, showValues.length, className, composeNumberToString), temp = _h[0], tempPct = _h[1];
                        if (onlyCurrentLevelValue ? level > 0 && showValues.length > 0 && showValues[Clamp(level, 1, showValues.length) - 1] == 0 : simplifyShowValues.length == 1 && simplifyShowValues[0] == 0) {
                            if (n == 0) {
                                valuesSB = [];
                                valuesSB.push("".concat(addedLocalization, "\u00D7").concat(temp));
                                valuesPctSB = [];
                                valuesPctSB.push("".concat(addedLocalization, "\u00D7").concat(tempPct));
                            }
                            else {
                                valuesSB.push(" + ".concat(addedLocalization, "\u00D7").concat(temp));
                                valuesPctSB.push(" + ".concat(addedLocalization, "\u00D7").concat(tempPct));
                            }
                        }
                        else {
                            valuesSB.push("[ + ".concat(addedLocalization, "\u00D7").concat(temp, "]"));
                            valuesPctSB.push("[ + ".concat(addedLocalization, "\u00D7").concat(tempPct, "]"));
                        }
                        n++;
                    }
                }
                else {
                    // 显示计算后的数值
                    var hasOperation = false;
                    var n = 0;
                    for (var addedName in addedAttributeValues) {
                        var addedValue = addedValues[addedName];
                        if (addedValue == undefined) {
                            continue;
                        }
                        var _j = ComposeValues(addedValue, level, onlyCurrentLevelValue, showValues.length, className, composeNumberToString), temp_1 = _j[0], tempPct_1 = _j[1];
                        if (onlyCurrentLevelValue ? level > 0 && showValues.length > 0 && showValues[Clamp(level, 1, showValues.length) - 1] == 0 : simplifyShowValues.length == 1 && simplifyShowValues[0] == 0) {
                            if (n == 0) {
                                valuesSB = [];
                                valuesSB.push("".concat(temp_1));
                                valuesPctSB = [];
                                valuesPctSB.push("".concat(tempPct_1));
                            }
                            else {
                                hasOperation = true;
                                valuesSB.push(" + ".concat(temp_1));
                                valuesPctSB.push(" + ".concat(tempPct_1));
                            }
                        }
                        else {
                            hasOperation = true;
                            valuesSB.push("[ + ".concat(temp_1, "]"));
                            valuesPctSB.push("[ + ".concat(tempPct_1, "]"));
                        }
                        n++;
                    }
                    var _k = ComposeValues(values, level, onlyCurrentLevelValue, showValues.length, className, valueNumberToString), temp = _k[0], tempPct = _k[1];
                    if (hasOperation) {
                        valuesSB.push(" = ".concat(temp));
                        valuesPctSB.push(" = ".concat(tempPct));
                    }
                    else {
                        valuesSB = [];
                        valuesSB.push("".concat(temp));
                        valuesPctSB = [];
                        valuesPctSB.push("".concat(tempPct));
                    }
                }
                // 显示最大最小值
                if (showExtra) {
                    if (minValues != undefined) {
                        var minLocalization = GetLocalization("dota_ability_special_variable_min", "");
                        if (minLocalization != "") {
                            var _l = ComposeValues(minValues, level, onlyCurrentLevelValue, showValues.length, className), temp = _l[0], tempPct = _l[1];
                            valuesSB.push("[".concat(minLocalization).concat(temp, "]"));
                            valuesPctSB.push("[".concat(minLocalization).concat(tempPct, "]"));
                        }
                    }
                    if (maxValues != undefined) {
                        var maxLocalization = GetLocalization("dota_ability_special_variable_max", "");
                        if (maxLocalization != "") {
                            var _m = ComposeValues(maxValues, level, onlyCurrentLevelValue, showValues.length, className), temp = _m[0], tempPct = _m[1];
                            valuesSB.push("[".concat(maxLocalization).concat(temp, "]"));
                            valuesPctSB.push("[".concat(maxLocalization).concat(tempPct, "]"));
                        }
                    }
                }
            }
            // 乘区显示
            if (abilityValue.IsMultiplicative == true) {
                var mark = GetLocalization("dota_ability_variable_mult_mark", "");
                if (mark != "") {
                    valuesSB.push(mark);
                    valuesPctSB.push(mark);
                }
            }
            var replacing = isPercent ? valuesPctSB.join("") : valuesSB.join("");
            text = text.substring(0, match.index + offset) + replacing + text.substring(match.index + offset + match[0].length);
            offset += replacing.length - match[0].length;
            next = matches.next();
        };
        while (!next.done) {
            _loop_5();
        }
    };
    for (var valueName in abilityValues) {
        _loop_2(valueName);
    }
    return text;
}
function GetAbilityUpgradeName(abilityUpgradeID) {
    var _a;
    var t = (_a = KeyValues.AbilityUpgradesKv[abilityUpgradeID]) !== null && _a !== void 0 ? _a : KeyValues.ItemUpgradesKv[abilityUpgradeID];
    if (t == undefined)
        return "";
    var textSB = [];
    var type = t.type;
    switch (type) {
        case "ABILITY_UPGRADES_TYPE_UNIQUE":
            break;
        case "ABILITY_UPGRADES_TYPE_VALUE":
            break;
        default:
            break;
    }
    return textSB.join("");
}
function GetAbilityUpgradeDescription(abilityUpgradeID, abilityUpgradeData) {
    var _a, _b, _c;
    var t = (_b = (_a = KeyValues.AbilityUpgradesKv[abilityUpgradeID]) !== null && _a !== void 0 ? _a : KeyValues.ItemUpgradesKv[abilityUpgradeID]) !== null && _b !== void 0 ? _b : abilityUpgradeData;
    if (t == undefined)
        return "";
    var type = t.type;
    if (type == undefined)
        return "";
    var abilityName = t.ability_name;
    if (abilityName == undefined)
        return "";
    var textSB = [];
    switch (type) {
        case "ABILITY_UPGRADES_TYPE_UNIQUE":
            var unique = t.unique;
            var abilityValues = {};
            if (typeof t.AbilityValues == "object") {
                for (var valueName_1 in t.AbilityValues) {
                    var element = t.AbilityValues[valueName_1];
                    abilityValues[valueName_1] = FormatAbilityValueData(element);
                }
            }
            var description = GetLocalization("DOTA_Tooltip_Ability_".concat(abilityName, "_unique_").concat(unique, "_description"), "");
            if (description != "") {
                textSB.push(ReplaceValues(description, abilityValues));
            }
            break;
        case "ABILITY_UPGRADES_TYPE_VALUE":
            var valueName = t.value_name;
            if (valueName == undefined) {
                break;
            }
            var valueKeyName = (_c = t.value_key_name) !== null && _c !== void 0 ? _c : "value";
            if (typeof valueKeyName != "string") {
                break;
            }
            var valueText = GetLocalization("DOTA_Tooltip_ability_upgrade_".concat(abilityUpgradeID, "_").concat(valueName), "");
            if (valueText == "") {
                valueText = GetLocalization("DOTA_Tooltip_Ability_".concat(abilityName, "_").concat(valueName), "").replace(/[:：\s]/g, "");
                if (valueText == "") {
                    valueText = GetLocalization("dota_ability_special_variable_".concat(valueName), "");
                    if (valueText != "") {
                        var isNegative = valueText.substring(valueText.length - 1) == "*";
                        if (isNegative) {
                            valueText = valueText.substring(0, valueText.length - 1);
                        }
                    }
                    else {
                        valueText = GetLocalization("dota_ability_attribute_".concat(valueName.replace("item_", "")), "");
                    }
                }
            }
            if (valueText == "") {
                break;
            }
            var isPercent = void 0;
            if (valueText[0] == "%") {
                isPercent = true;
                valueText = valueText.substring(1);
            }
            else {
                isPercent = t.operator == "ABILITY_UPGRADES_OP_MUL";
            }
            textSB.push(valueText);
            if (valueKeyName != "value") {
                var valueKeyText = GetLocalization("dota_ability_special_variable".concat(valueKeyName, "_full"), "");
                if (valueKeyText != "") {
                    textSB.push(valueKeyText);
                }
            }
            var _d = ComposeValues([toFiniteNumber(t.operator_value)]), number = _d[0], numberPct = _d[1];
            textSB.unshift("".concat(toFiniteNumber(t.operator_value) >= 0 ? "+" : "-", " ").concat(isPercent ? numberPct : number, " "));
            break;
        default:
            break;
    }
    return textSB.join("");
}
function FormatAbilityValueData(data) {
    var _a;
    var t = {
        value: [0]
    };
    if (typeof data == "object") {
        for (var k in data) {
            var v = data[k];
            var key = k.replace(/\s/g, "");
            if (key == "") {
                continue;
            }
            var value = toFiniteString(v);
            if (value == "") {
                continue;
            }
            switch (key) {
                // 数值处理
                case "value":
                case "_attack_damage":
                case "_spell_power":
                case "_armor":
                case "_health":
                case "_str":
                case "_agi":
                case "_int":
                case "_primary":
                case "_all":
                case "_attack_range":
                case "_min":
                case "_max":
                    var values = SimplifyValuesArray(value.split(" ").map(function (a) { return toFiniteNumber(a); }));
                    if (key == "value") {
                        t[key] = values;
                    }
                    else if (key == "_min" || key == "_max") {
                        if (values.length > 0) {
                            t[key] = values;
                        }
                    }
                    else {
                        if (values.length > 0 && !(values.length == 1 && values[0] == 0)) {
                            t[key] = values;
                        }
                    }
                    break;
                // 布尔值处理
                case "IsProbability":
                case "IsMultiplicative":
                case "affected_by_aoe_increase":
                case "CalculateSpellDamageTooltip":
                case "RequiresScepter":
                case "RequiresShard":
                case "TooltipOnly":
                case "dynamic_value":
                case "operator_mul":
                case "operator_negative":
                    t[key] = value == "true" || toFiniteNumber(value) >= 1;
                    break;
                // 字符串处理
                case "operator_ability_name":
                case "operator_key_name":
                    t[key] = value != undefined ? String(value) : undefined;
                    break;
                // 枚举处理
                case "DamageTypeTooltip":
                    var enums = value.split("|");
                    for (var _i = 0, enums_1 = enums; _i < enums_1.length; _i++) {
                        var e = enums_1[_i];
                        if (e == "DAMAGE_TYPE_NONE" ||
                            e == "DAMAGE_TYPE_PHYSICAL" ||
                            e == "DAMAGE_TYPE_MAGICAL" ||
                            e == "DAMAGE_TYPE_PURE") {
                            var i = DAMAGE_TYPES[e];
                            if (i == undefined) {
                                continue;
                            }
                            t[key] = ((_a = t[key]) !== null && _a !== void 0 ? _a : 0) + i;
                        }
                    }
                    break;
            }
        }
    }
    else {
        var value = toFiniteString(data);
        if (value != "") {
            t.value = SimplifyValuesArray(value.split(" ").map(function (a) { return toFiniteNumber(a); }));
        }
    }
    if (t.value == undefined) {
        t.value = [0];
    }
    else if (t.value.length <= 0) {
        t.value.push(0);
    }
    return t;
}
function GetAbilityTalentAllText(abilityName, talentName, level, onlyCurrentLevelValue) {
    var _a, _b, _c, _d, _e;
    if (level === void 0) { level = -1; }
    if (onlyCurrentLevelValue === void 0) { onlyCurrentLevelValue = false; }
    var t = (_b = (_a = KeyValues.HeroAbilityTalentKv[abilityName]) === null || _a === void 0 ? void 0 : _a[talentName]) !== null && _b !== void 0 ? _b : (_c = KeyValues.GeneSuitKv[abilityName]) === null || _c === void 0 ? void 0 : _c[talentName];
    var result = {
        attributes: "",
        description: "",
        extra_attributes: "",
        extradescription: "",
    };
    if (t == undefined)
        return result;
    if (abilityName == undefined)
        return result;
    var abilityValues = {};
    if (typeof t.AbilityValues == "object") {
        for (var valueName in t.AbilityValues) {
            var element = t.AbilityValues[valueName];
            abilityValues[valueName] = FormatAbilityValueData(element);
        }
    }
    var pushNewLine = function (sb, text) {
        if (sb.length != 0) {
            sb.push("<br>");
        }
        sb.push(text);
    };
    var sb_attributes = [];
    var sb_description = [];
    var sb_extra_attributes = [];
    var sb_extradescription = [];
    for (var _i = 0, _f = Object.keys(abilityValues); _i < _f.length; _i++) {
        var valueName = _f[_i];
        var abilityValue = abilityValues[valueName];
        if (valueName == t.ValueName)
            continue;
        if (abilityValue.value == undefined)
            continue;
        if (abilityValue.value.length <= 0)
            continue;
        // 动态数值不会隐藏
        if (abilityValue.value.length == 1 && abilityValue.value[0] == 0 && abilityValue.dynamic_value != true) {
            var skip = true;
            for (var key in abilityValue) {
                if (key[0] == "_") {
                    var factors = abilityValue[key];
                    if (factors != undefined && factors.length > 0 && !(factors.length == 1 && factors[0] == 0)) {
                        skip = false;
                        break;
                    }
                }
            }
            if (skip) {
                continue;
            }
        }
        // 如果仅显示当前等级数值，则需要检查当前等级的数值是否有用。动态数值不会隐藏
        if (onlyCurrentLevelValue == true && abilityValue.dynamic_value != true) {
            if (level <= 0)
                continue;
            if (abilityValue.value[Clamp(level - 1, 0, abilityValue.value.length)] == 0) {
                var skip = true;
                for (var key in abilityValue) {
                    if (key[0] == "_") {
                        var factors = abilityValue[key];
                        if (factors != undefined && factors.length > 0) {
                            var factor = factors[Clamp(level - 1, 0, factors.length)];
                            if (factor != 0) {
                                skip = false;
                                break;
                            }
                        }
                    }
                }
                if (skip) {
                    continue;
                }
            }
        }
        var valueLocalization = void 0;
        if (valueName == "abilitydamage") {
            valueLocalization = GetLocalization("AbilityDamage", "");
        }
        else {
            valueLocalization = GetLocalization("dota_tooltip_ability_".concat(abilityName, "_").concat(valueName), "");
        }
        // 天赋属性处理
        if (valueLocalization == "" && valueName.substring(0, 7) == "talent_") {
            var attributeLocalization = GetLocalization("dota_ability_attribute_".concat(valueName.substring(7)), "");
            if (attributeLocalization != "") {
                var isPercentage_1 = attributeLocalization.substring(0, 1) == "%";
                var isNegative = attributeLocalization.substring(attributeLocalization.length - 1) == "*";
                valueLocalization = "".concat(isPercentage_1 ? "%" : "").concat(isNegative ? "-" : "+").concat(attributeLocalization.substring(isPercentage_1 ? 1 : 0, isNegative ? attributeLocalization.length - 1 : attributeLocalization.length));
            }
        }
        // 技能升级处理
        if (valueLocalization == "" && valueName.substring(0, 9) == "operator_") {
            var operatorValueName = valueName.substring(9);
            var operatorAbilityName = (_d = abilityValue.operator_ability_name) !== null && _d !== void 0 ? _d : abilityName;
            var operatorKeyName = (_e = abilityValue.operator_key_name) !== null && _e !== void 0 ? _e : "value";
            if (typeof operatorKeyName == "string") {
                var attributeLocalization = GetLocalization("DOTA_Tooltip_Ability_".concat(operatorAbilityName, "_").concat(operatorValueName), "").replace(/[:：\s]/g, "");
                if (attributeLocalization == "") {
                    attributeLocalization = GetLocalization("DOTA_Tooltip_Ability_".concat(operatorAbilityName, "_unique_").concat(talentName, "_").concat(operatorValueName), "").replace(/[:：\s]/g, "");
                }
                if (attributeLocalization == "") {
                    attributeLocalization = GetLocalization("dota_ability_special_variable_".concat(operatorValueName), "");
                }
                if (attributeLocalization != "") {
                    var isPercentage_2 = attributeLocalization.substring(0, 1) == "%";
                    var isNegative = attributeLocalization.substring(attributeLocalization.length - 1) == "*";
                    var abilityNameLoc = GetLocalization("DOTA_Tooltip_Ability_".concat(operatorAbilityName), "");
                    attributeLocalization = (abilityNameLoc != "" ? "<span class='ability_name'>" + abilityNameLoc + "</span>" : "") + attributeLocalization.substring(isPercentage_2 ? 1 : 0, isNegative ? attributeLocalization.length - 1 : attributeLocalization.length) + (operatorKeyName != "value" ? GetLocalization("dota_ability_special_variable".concat(operatorKeyName, "_full"), "") : "");
                    valueLocalization = "".concat(isPercentage_2 || abilityValue.operator_mul ? "%" : "").concat(isNegative ? "-" : "+").concat(attributeLocalization);
                }
            }
        }
        if (valueLocalization == "") {
            continue;
        }
        var isPercentage = valueLocalization.substring(0, 1) == "%";
        if (isPercentage) {
            valueLocalization = valueLocalization.substring(1);
        }
        var hasSign = valueLocalization.search(/[\+\-]/g) == 0;
        if (hasSign) {
            var value = abilityValue.value.length > 0 ? abilityValue.value[Clamp(level - 1, 0, abilityValue.value.length - 1)] : 0;
            var sign = valueLocalization.substring(0, 1);
            var isNegative = false;
            if (value < 0 && sign == "+") {
                sign = "-";
                isNegative = true;
            }
            else if (value > 0 && sign == "-") {
                sign = "+";
                isNegative = true;
            }
            valueLocalization = valueLocalization.substring(1);
            pushNewLine(sb_attributes, "".concat(sign, " %").concat(valueName, "%").concat(isPercentage ? "%" : "", " ").concat(isNegative ? "<font color='#e03e2e'>" : "").concat(valueLocalization).concat(isNegative ? "</font>" : ""));
        }
        else {
            pushNewLine(sb_extra_attributes, "".concat(valueLocalization, " %").concat(valueName, "%").concat(isPercentage ? "%" : ""));
        }
    }
    {
        var unique = talentName;
        var description = GetLocalization("DOTA_Tooltip_Ability_".concat(abilityName, "_unique_").concat(unique, "_description"), "");
        if (description != "") {
            pushNewLine(sb_description, description);
        }
    }
    {
        // 需求
        var requires = t.Requires;
        if (requires != undefined) {
            var requiresTextList = [];
            for (var _g = 0, _h = String(requires).replaceAll(/\s/g, "").split(";"); _g < _h.length; _g++) {
                var a = _h[_g];
                var _j = a.split("-"), name = _j[0], level_1 = _j[1];
                var text = GetLocalization("DOTA_AbilityTalentTooltip_RequiresTalent", "");
                if (text == "")
                    break;
                var talentNameLoc = GetLocalization("DOTA_Tooltip_Ability_".concat(abilityName, "_unique_").concat(name), "");
                if (talentNameLoc == "")
                    continue;
                text = text.replace("%s0", talentNameLoc);
                text = text.replace("%s1", String(toFiniteNumber(level_1, 1)));
                requiresTextList.push(text);
            }
            if (requiresTextList.length > 0) {
                pushNewLine(sb_extradescription, GetLocalization("DOTA_AbilityTalentTooltip_Requires") + "<br>" + requiresTextList.join("<br>"));
            }
        }
        // 互斥
        var conflict = t.Conflict;
        if (conflict != undefined) {
            var conflictTextList = [];
            for (var _k = 0, _l = String(conflict).replaceAll(/\s/g, "").split(";"); _k < _l.length; _k++) {
                var a = _l[_k];
                var _m = a.split("-"), name = _m[0], level_2 = _m[1];
                var text = GetLocalization("DOTA_AbilityTalentTooltip_ConflictTalent", "");
                if (text == "")
                    break;
                var talentNameLoc = GetLocalization("DOTA_Tooltip_Ability_".concat(abilityName, "_unique_").concat(name), "");
                if (talentNameLoc == "")
                    continue;
                text = text.replace("%s0", talentNameLoc);
                conflictTextList.push(text);
            }
            if (conflictTextList.length > 0) {
                pushNewLine(sb_extradescription, GetLocalization("DOTA_AbilityTalentTooltip_Conflict") + "<br>" + conflictTextList.join("<br>"));
            }
        }
    }
    result.attributes = ReplaceValues(sb_attributes.join(""), abilityValues, level, {
        OnlyCurrentLevelValue: onlyCurrentLevelValue,
        IsDescription: false,
    });
    result.description = ReplaceValues(sb_description.join(""), abilityValues, level, {
        OnlyCurrentLevelValue: onlyCurrentLevelValue,
        IsDescription: false,
    });
    result.extra_attributes = ReplaceValues(sb_extra_attributes.join(""), abilityValues, level, {
        OnlyCurrentLevelValue: onlyCurrentLevelValue,
        IsDescription: false,
    });
    result.extradescription = sb_extradescription.join("");
    return result;
}
