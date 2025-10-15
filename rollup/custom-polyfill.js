// Auto-generated from src/polyfill/ (click.js, index.ts, init.js, netdata.js, red_point.js, request.js)

// ========== 来自 click.js ==========
{
"use strict";
var iRecordVectorAbility = -1;
function StartVectorAbility(iAbility) {
    var aCursorPosition = GameUI.GetCursorPosition();
    var vWorldPosition = Game.ScreenXYToWorld(aCursorPosition[0], aCursorPosition[1]);
    if (vWorldPosition[0] == 3.4028234663852886e+38) {
        return;
    }
    iRecordVectorAbility = iAbility;
    GameEvents.SendEventClientSide("custom_vector_ability", {
        type: 0,
        ability_ent_index: iAbility,
        x: vWorldPosition[0],
        y: vWorldPosition[1],
        z: vWorldPosition[2],
    });
    var funcUpdate = function () {
        var iActiveAbility = Abilities.GetLocalPlayerActiveAbility();
        var aCursorPosition = GameUI.GetCursorPosition();
        var vWorldPosition = Game.ScreenXYToWorld(aCursorPosition[0], aCursorPosition[1]);
        if (iActiveAbility != iAbility) {
            GameEvents.SendEventClientSide("custom_vector_ability", {
                type: 2,
                ability_ent_index: iAbility,
                x: -1,
                y: -1,
                z: -1,
            });
            iRecordVectorAbility = -1;
        }
        else {
            GameEvents.SendEventClientSide("custom_vector_ability", {
                type: 1,
                ability_ent_index: iAbility,
                x: vWorldPosition[0] == 3.4028234663852886e+38 ? -1 : vWorldPosition[0],
                y: vWorldPosition[1] == 3.4028234663852886e+38 ? -1 : vWorldPosition[1],
                z: vWorldPosition[2] == 3.4028234663852886e+38 ? -1 : vWorldPosition[2],
            });
            $.Schedule(Game.GetGameFrameTime(), funcUpdate);
        }
    };
    funcUpdate();
}
(function () {
    Game.AddCommand("start_vector_ability" + GameUI.CustomUIConfig().CommandUniqueSuffix, function (_, sAbilityIndex) {
        var iAbility = Number(sAbilityIndex);
        if (iRecordVectorAbility != iAbility && (Abilities.GetBehavior(iAbility) & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING) {
            if (GameUI.GetClickBehaviors() == CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_VECTOR_CAST) {
                StartVectorAbility(iAbility);
            }
        }
    }, "", 67108864);
    if (!GameUI.CustomUIConfig().tMouseEvents) {
        GameUI.CustomUIConfig().tMouseEvents = {};
    }
    var CONSUME_EVENT = true;
    var CONTINUE_PROCESSING_EVENT = false;
    GameUI.SetMouseCallback(function (sEventName, iValue) {
        var bResult = CONTINUE_PROCESSING_EVENT;
        var aKeys = Object.keys(GameUI.CustomUIConfig().tMouseEvents);
        aKeys.sort(function (a, b) { return GameUI.CustomUIConfig().tMouseEvents[a].iPriority - GameUI.CustomUIConfig().tMouseEvents[b].iPriority; });
        for (var index = aKeys.length - 1; index >= 0; index--) {
            var sKey = aKeys[index];
            var tMouseEvent = GameUI.CustomUIConfig().tMouseEvents[sKey];
            if (typeof (tMouseEvent.fCallback) == "function") {
                var bCallbackResult = tMouseEvent.fCallback({
                    event_name: sEventName,
                    value: iValue,
                    result: bResult,
                });
                if (typeof (bCallbackResult) == "boolean") {
                    bResult = bResult || bCallbackResult;
                }
            }
            else {
                delete GameUI.CustomUIConfig().tMouseEvents[sKey];
                aKeys.splice(index, 1);
            }
        }
        if (bResult == CONTINUE_PROCESSING_EVENT) {
            if (GameUI.GetClickBehaviors() == CLICK_BEHAVIORS.DOTA_CLICK_BEHAVIOR_CAST) {
                var iAbility = Abilities.GetLocalPlayerActiveAbility();
                if (iAbility != -1 && (Abilities.GetBehavior(iAbility) & DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING) == DOTA_ABILITY_BEHAVIOR.DOTA_ABILITY_BEHAVIOR_VECTOR_TARGETING) {
                    StartVectorAbility(iAbility);
                }
            }
        }
        return bResult;
    });
    GameUI.CustomUIConfig().SubscribeMouseEvent = function (sName, fCallback, iPriority) {
        var tMouseEvent = { fCallback: fCallback, iPriority: iPriority };
        GameUI.CustomUIConfig().tMouseEvents[sName] = tMouseEvent;
    };
    GameUI.CustomUIConfig().UnsubscribeMouseEvent = function (sName) {
        delete GameUI.CustomUIConfig().tMouseEvents[sName];
    };
})();
}

// ========== 来自 index.ts ==========
{
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
}

// ========== 来自 init.js ==========
{
"use strict";
var _a;
GameUI.CustomUIConfig().CommandUniqueSuffix = String(Math.floor(Date.now() / 1000));
GameEvents.SendEventClientSide("send_command_unique_suffix", {
    str: GameUI.CustomUIConfig().CommandUniqueSuffix
});
var offsetX = null;
var offsetY = null;
var Draggable = false;
var DragPanel = null;
function DragCallback() {
    var isLeftPressed = GameUI.IsMouseDown(0);
    if (isLeftPressed && DragPanel != null) {
        var position = GameUI.GetCursorPosition();
        if (offsetX == null || offsetY == null) {
            offsetX = DragPanel.GetPositionWithinWindow().x - position[0];
            offsetY = DragPanel.GetPositionWithinWindow().y - position[1];
            DragPanel.style.align = "left top";
            DragPanel.style.margin = "0px 0px 0px 0px";
        }
        if (offsetX != null && offsetY != null) {
            DragPanel.SetPositionInPixels((position[0] + offsetX) / DragPanel.actualuiscale_x, (position[1] + offsetY) / DragPanel.actualuiscale_y, 0);
        }
    }
    else {
        offsetX = null;
        offsetY = null;
    }
    if (Draggable || isLeftPressed) {
        $.Schedule(Game.GetGameFrameTime(), DragCallback);
    }
    else {
        DragPanel = null;
    }
}
GameUI.CustomUIConfig()._PopupTempData = (_a = GameUI.CustomUIConfig()._PopupTempData) !== null && _a !== void 0 ? _a : {};
GameUI.CustomUIConfig().StartDrag = function (panel) {
    Draggable = true;
    DragPanel = panel;
    DragCallback();
};
GameUI.CustomUIConfig().EndDrag = function () {
    Draggable = false;
};
if (GameUI.CustomUIConfig()._HUDRoot_ == undefined) {
    GameUI.CustomUIConfig()._HUDRoot_ = $.GetContextPanel();
}
function EmitSoundForPlayer(tData) {
    Game.EmitSound(tData.soundname);
}
function OnErrorMessage(_a) {
    var message = _a.message, _b = _a.sound, sound = _b === void 0 ? "General.CastFail_Custom" : _b;
    GameUI.SendCustomHUDError(message, sound);
}
function OnSelectUnits(_a) {
    var units = _a.units;
    var b = false;
    var a = units.split(",");
    for (var index = 0; index < a.length; index++) {
        var iEntIndex = Number(a[index]);
        if (isFinite(iEntIndex) && Entities.IsValidEntity(iEntIndex) && Entities.IsControllableByPlayer(iEntIndex, Players.GetLocalPlayer()) && Entities.IsSelectable(iEntIndex)) {
            if (!b) {
                b = true;
                GameUI.SelectUnit(-1, false);
            }
            GameUI.SelectUnit(iEntIndex, true);
        }
    }
}
function Update() {
    $.Schedule(1, function () {
        GameEvents.SendEventClientSide("send_command_unique_suffix", {
            str: GameUI.CustomUIConfig().CommandUniqueSuffix
        });
        Update();
    });
}
(function () {
    var _a, _b;
    Update();
    GameEvents.Subscribe("error_message", OnErrorMessage);
    GameEvents.Subscribe("emit_sound_for_player", EmitSoundForPlayer);
    GameEvents.Subscribe("select_units", OnSelectUnits);
    var HUD = (_b = (_a = $.GetContextPanel()) === null || _a === void 0 ? void 0 : _a.GetParent()) === null || _b === void 0 ? void 0 : _b.GetParent();
    if (HUD) {
        var PausedInfo = HUD === null || HUD === void 0 ? void 0 : HUD.FindChildTraverse("PausedInfo");
        if (PausedInfo) {
            PausedInfo.style.visibility = "collapse";
        }
        var ButtonBar = HUD === null || HUD === void 0 ? void 0 : HUD.FindChildTraverse("ButtonBar");
        if (ButtonBar) {
            ButtonBar.style.visibility = "collapse";
        }
        var PreGame = HUD.FindChildTraverse("PreGame");
        if (PreGame) {
            PreGame.enabled = false;
            PreGame.style.opacity = "0";
        }
        var stackable_side_panels = HUD.FindChildTraverse("stackable_side_panels");
        if (stackable_side_panels) {
            stackable_side_panels.style.visibility = "collapse";
        }
    }
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_COMMONITEMS, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_HEADER, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_SCORE, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME_CHAT, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_KILLCAM, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FIGHT_RECAP, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, false);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS, true);
    GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_AGHANIMS_STATUS, false);
})();
}

// ========== 来自 netdata.js ==========
{
var _a, _b, _c, _d, _e, _f;
/** NetData */
/** 用来接收数据 */
GameUI.CustomUIConfig().NET_DATA_STREAM = (_a = GameUI.CustomUIConfig().NET_DATA_STREAM) !== null && _a !== void 0 ? _a : {};
/** 用来记录分段步数 */
GameUI.CustomUIConfig().NET_DATA_STREAM_STEP = (_b = GameUI.CustomUIConfig().NET_DATA_STREAM_STEP) !== null && _b !== void 0 ? _b : {};
/** 用来记录传输中的数据，防止重复请求 */
GameUI.CustomUIConfig().NET_DATA_STREAM_KEY = (_c = GameUI.CustomUIConfig().NET_DATA_STREAM_KEY) !== null && _c !== void 0 ? _c : {};
/** UI缓存，减少重复请求 */
GameUI.CustomUIConfig().NET_DATA_CACHE = (_d = GameUI.CustomUIConfig().NET_DATA_CACHE) !== null && _d !== void 0 ? _d : {};
/** 记录已经被删除的请求uniqueID */
GameUI.CustomUIConfig().NET_DATA_DELETED_ID = (_e = GameUI.CustomUIConfig().NET_DATA_DELETED_ID) !== null && _e !== void 0 ? _e : {};
/** 客户端全局数据 */
GameUI.CustomUIConfig().CLIENT_GLOBAL_DATA = (_f = GameUI.CustomUIConfig().CLIENT_GLOBAL_DATA) !== null && _f !== void 0 ? _f : {};
// $.Msg("NetData init");
if (GameUI.CustomUIConfig().NET_DATA_LISTENER != undefined) {
    GameEvents.Unsubscribe(GameUI.CustomUIConfig().NET_DATA_LISTENER);
}
var safeParse = function (str) {
    try {
        return JSON.parse(str);
    }
    catch (error) {
        error.message += '\n\tparams={str:' + str.length + '}';
        return null;
    }
};
/** net_data 前端 */
var NETDATA_SPECIAL_RECONSTRUCT = {};
/** NetData */
GameUI.CustomUIConfig().NET_DATA_LISTENER = GameEvents.Subscribe("net_data_stream", function (data) {
    var _a;
    var _b, _c;
    if (data.deleted) {
        delete GameUI.CustomUIConfig().NET_DATA_STREAM[data.id];
        delete GameUI.CustomUIConfig().NET_DATA_STREAM_STEP[data.id];
        if (GameUI.CustomUIConfig().NET_DATA_DELETED_ID[data.id] != undefined) {
            $.CancelScheduled(GameUI.CustomUIConfig().NET_DATA_DELETED_ID[data.id]);
        }
        GameUI.CustomUIConfig().NET_DATA_DELETED_ID[data.id] = $.Schedule(10, function () {
            delete GameUI.CustomUIConfig().NET_DATA_DELETED_ID[data.id];
        });
    }
    else {
        if (GameUI.CustomUIConfig().NET_DATA_DELETED_ID[data.id] != undefined) {
            return;
        }
        if (GameUI.CustomUIConfig().NET_DATA_STREAM[data.id] == undefined) {
            GameUI.CustomUIConfig().NET_DATA_STREAM[data.id] = [];
            GameUI.CustomUIConfig().NET_DATA_STREAM_STEP[data.id] = 0;
        }
        if (data.done == 1) {
            GameUI.CustomUIConfig().NET_DATA_STREAM_STEP[data.id] = data.step + 1;
        }
        GameUI.CustomUIConfig().NET_DATA_STREAM[data.id][data.step] = data.data;
        if (GameUI.CustomUIConfig().NET_DATA_STREAM_STEP[data.id] > 0 && GameUI.CustomUIConfig().NET_DATA_STREAM[data.id].length == GameUI.CustomUIConfig().NET_DATA_STREAM_STEP[data.id]) {
            var f = false;
            for (var i = 0; i < GameUI.CustomUIConfig().NET_DATA_STREAM[data.id].length; i++) {
                if (!(typeof (GameUI.CustomUIConfig().NET_DATA_STREAM[data.id][i]) == "string" && GameUI.CustomUIConfig().NET_DATA_STREAM[data.id][i].length > 0)) {
                    f = true;
                }
            }
            if (!f) {
                var result = safeParse(GameUI.CustomUIConfig().NET_DATA_STREAM[data.id].join(''));
                if (result !== null) {
                    if (typeof NETDATA_SPECIAL_RECONSTRUCT[data.key] == "function") {
                        result = NETDATA_SPECIAL_RECONSTRUCT[data.key](result);
                    }
                    (_a = (_b = GameUI.CustomUIConfig().NET_DATA_CACHE)[_c = data.key + data.bindPlayerID]) !== null && _a !== void 0 ? _a : (_b[_c] = {});
                    // $.Msg("netdata"," ", data.key," ", data.override)
                    GameUI.CustomUIConfig().NET_DATA_CACHE[data.key + data.bindPlayerID] = data.override == 1 ? result : ServiceTableOverride(GameUI.CustomUIConfig().NET_DATA_CACHE[data.key + data.bindPlayerID], result);
                    GameEvents.SendEventClientSide("custom_net_data_changed_client", { key: data.key, PlayerID: data.bindPlayerID });
                }
                delete GameUI.CustomUIConfig().NET_DATA_STREAM[data.id];
                delete GameUI.CustomUIConfig().NET_DATA_STREAM_STEP[data.id];
                delete GameUI.CustomUIConfig().NET_DATA_STREAM_KEY[data.key + data.bindPlayerID];
            }
        }
    }
});
function ServiceTableOverride(mainTable, table) {
    for (var k in table) {
        var v = table[k];
        if (typeof v == "object") {
            if (typeof mainTable[k] == "object") {
                mainTable[k] = ServiceTableOverride(mainTable[k], v);
            }
            else {
                mainTable[k] = ServiceTableOverride({}, v);
            }
        }
        else {
            if (v == "nil") {
                delete mainTable[k];
            }
            else {
                mainTable[k] = v;
            }
        }
    }
    return mainTable;
}
}

// ========== 来自 red_point.js ==========
{
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var RedNode = /** @class */ (function () {
    function RedNode(parent, child) {
        this.state = false;
        this.children = {};
        this.parent = parent;
        if (child) {
            this.children = child;
        }
    }
    RedNode.prototype.SetState = function (b) {
        if (Object.keys(this.children).length > 0) {
            if (Game.IsInToolsMode()) {
                $.Msg("!!!!!!!!!! try set node with children");
            }
            return;
        }
        if (this.state != b) {
            this.state = b;
            if (this.parent) {
                if (this.state != this.parent.state) {
                    this.parent.UpdateState();
                }
            }
            return true;
        }
    };
    RedNode.prototype.UpdateState = function () {
        var newState = Object.values(this.children).some(function (c) { return c.state == true; });
        if (newState != this.state) {
            this.state = newState;
            if (this.parent && this.state != this.parent.state) {
                this.parent.UpdateState();
            }
        }
    };
    return RedNode;
}());
var CustomUIConfig = GameUI.CustomUIConfig();
if (CustomUIConfig.RedPointRootNodes == undefined) {
    CustomUIConfig.RedPointRootNodes = {};
}
if (CustomUIConfig.RedPointEasyMap == undefined) {
    CustomUIConfig.RedPointEasyMap = {};
}
CustomUIConfig.SetRedPoint = function (state, rootKey) {
    var _keys = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        _keys[_i - 2] = arguments[_i];
    }
    var node = CustomUIConfig.RedPointRootNodes[rootKey];
    var easyKey = rootKey;
    if (node == undefined) {
        node = new RedNode();
        CustomUIConfig.RedPointRootNodes[rootKey] = node;
        CustomUIConfig.RedPointEasyMap[easyKey] = node;
    }
    for (var _a = 0, _keys_1 = _keys; _a < _keys_1.length; _a++) {
        var k = _keys_1[_a];
        easyKey += "$" + k;
        var n = node.children[k];
        if (n == undefined) {
            n = new RedNode(node);
            node.children[k] = n;
            CustomUIConfig.RedPointEasyMap[easyKey] = n;
        }
        node = n;
    }
    var changed = node.SetState(state);
    if (changed) {
        GameEvents.SendEventClientSide("client_side_event", {
            event_name: "red_point_changed",
            event_data: rootKey
        });
    }
};
CustomUIConfig.SubscribeRedPointChange = function (callback, rootKey) {
    return GameEvents.Subscribe("client_side_event", function (data) {
        if (data.event_name == "red_point_changed") {
            if (rootKey == undefined || data.event_data == rootKey) {
                callback(data.event_data);
            }
        }
    });
};
CustomUIConfig.GetRedPoint = function (rootKey) {
    var _a;
    var keys = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        keys[_i - 1] = arguments[_i];
    }
    var easyKey = __spreadArray([rootKey], keys, true).join("$");
    return ((_a = CustomUIConfig.RedPointEasyMap[easyKey]) === null || _a === void 0 ? void 0 : _a.state) == true;
};
// $.Msg("red point init ok");
}

// ========== 来自 request.js ==========
{
if (GameUI.CustomUIConfig()._Request_QueueIndex == undefined) {
    GameUI.CustomUIConfig()._Request_QueueIndex = 0;
}
if (GameUI.CustomUIConfig()._Request_Table == undefined) {
    GameUI.CustomUIConfig()._Request_Table = {};
}
if (GameUI.CustomUIConfig()._Request_Result == undefined) {
    GameUI.CustomUIConfig()._Request_Result = {};
}
if (GameUI.CustomUIConfig()._Request_Listener != undefined) {
    GameEvents.Unsubscribe(GameUI.CustomUIConfig()._Request_Listener);
}
function Think() {
    var playerID = Players.GetLocalPlayer();
    if (playerID == -1) {
        $.Schedule(0, Think);
    }
    else {
        GameUI.CustomUIConfig()._Request_Listener = CustomNetTables.SubscribeNetTableListener("request_".concat(playerID), function (tableName, queueIndex, data) {
            var index = queueIndex.replaceAll("_____".concat(data.nowStep), "");
            if (GameUI.CustomUIConfig()._Request_Result[index] == undefined) {
                GameUI.CustomUIConfig()._Request_Result[index] = {};
            }
            GameUI.CustomUIConfig()._Request_Result[index][data.nowStep] = data.result;
            var bFinished = true;
            for (var i = data.maxStep; i > 0; i--) {
                var a = GameUI.CustomUIConfig()._Request_Result[index][i];
                if (a == undefined) {
                    bFinished = false;
                }
            }
            if (!bFinished)
                return;
            var func = GameUI.CustomUIConfig()._Request_Table[index];
            delete GameUI.CustomUIConfig()._Request_Table[index];
            if (!func)
                return;
            var s = "";
            for (var i = 1; i <= data.maxStep; i++) {
                s += GameUI.CustomUIConfig()._Request_Result[index][i];
            }
            try {
                func(JSON.parse(s));
            }
            catch (error) {
            }
            // func(JSON.parse(data.result));
            GameEvents.SendCustomEventToServer("cancel_server_request_event", {
                queueIndex: index
            });
            delete GameUI.CustomUIConfig()._Request_Result[index];
        });
    }
}
Think();
}
