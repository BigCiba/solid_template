下面把**UI ↔ 客户端 Lua 本地通信**也并入一份完整的《Dota 2 自定义通信指南》。你可以直接把这份 Markdown 放进仓库的 docs/ 下给团队使用。

---

# Dota 2 自定义通信总览（NetTables / GameEvents / UI↔客户端Lua）

> 这是一份工程实践导向的速用手册：覆盖**可持久状态**（NetTables）、**一次性事件**（两套 GameEvent 路线），以及**UI↔客户端 Lua 的本地通信**，并附带硬性限制、选型建议与最小可用代码。

---

## 0. 选型速览（该用哪种？）

| 场景                                   | 推荐通道                                                | 核心理由                  | 关键限制                                                                                 |
| ------------------------------------ | --------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------ |
| UI 要随时读到的**持久状态**（排行榜、背包镜像、连线重建）     | **Custom Net Tables**                               | 状态可查询、断线重连自动重建        | **单次更新 ≤ 16,384 字节**；某个 key 更新会**整块广播该 key 的值**。([developer.valvesoftware.com][1])   |
| UI 与服务器**交互/回执**（点对点、按队伍或全体）         | **CustomGameEventManager（CGEM）**                    | 免声明、易做“只发给某玩家/某队伍/全体” | 仍应保持 payload 小；官方将其描述为对 `custom_events.txt` 的增强替代。([developer.valvesoftware.com][2]) |
| **全局广播**、与**引擎事件体系**对齐（需要在文件里声明字段类型） | **`.gameevents`/`custom_events.txt` + Listen/Fire** | 预声明型、与内建事件同路          | **事件名 ≤32、无空格；整条事件总字节 < 1024**；固定数据类型与保留键。([developer.valvesoftware.com][3])         |
| **UI ↔ 客户端 Lua 本地通信**（不走网络）          | **SendEventClientSide / FireGameEventLocal**        | 同一台客户端内往返，零网络延迟       | 本地有效，不会广播；仍建议小 payload。([developer.valvesoftware.com][4])                            |

---

## 1) Custom Net Tables（可查询的持久状态）

**要点**

* 服务器写：`CustomNetTables:SetTableValue(table, key, value)`；**key 为字符串**，value 为可序列化 Lua 表。([developer.valvesoftware.com][5])
* 客户端读：`GetTableValue / GetAllTableValues / SubscribeNetTableListener`。
* **硬性限制**：单次更新最大 **16,384 B**，超出会报错；某个 key 改动会把**该 key 的“整块值”**广播至所有客户端。([developer.valvesoftware.com][1])

**实践**

* 按“更新频率/玩家粒度”拆 key；把**大而少变**与**小而高频**分离，避免反复整块重发。([developer.valvesoftware.com][5])

---

## 2) GameEvents 路线 A：**CustomGameEventManager（免声明，推荐做 UI 交互）**

**用途**：UI ↔ 服务器双向、并可按**玩家/队伍/全体**定向下发。
**接口**：

* UI：`GameEvents.SendCustomGameEventToServer(name, data)`。([developer.valvesoftware.com][4])
* 服务器监听：`CustomGameEventManager:RegisterListener(name, fn)`。
* 服务器下发：`Send_ServerToPlayer / Send_ServerToTeam / Send_ServerToAllClients`。([developer.valvesoftware.com][6])
* **官方定位**：比 `custom_events.txt` 更强、更易用的替代体系。([developer.valvesoftware.com][2])

**最小示例**

```js
// Panorama -> Server
GameEvents.SendCustomGameEventToServer("ui_buy", { item: "relic_01", count: 1 });
```

```lua
-- Server
CustomGameEventManager:RegisterListener("ui_buy", function(_, ev)
  local p = PlayerResource:GetPlayer(ev.PlayerID)
  if p then
    CustomGameEventManager:Send_ServerToPlayer(p, "server_ack_buy", { ok = true })
  end
end)
```

**建议**：重要交互走可靠（默认）；只对目标玩家/队伍下发，避免全体广播。

---

## 3) GameEvents 路线 B：**`.gameevents`/`custom_events.txt`（预声明 + Listen/Fire）**

**用途**：与内建事件同路的**全局广播**自定义事件（需在文件中声明字段与类型）。
**硬性限制（引擎规范）**：

* 事件名**无空格、≤ 32 字符**、大小写敏感；
* **整条事件总字节 < 1024**（包含键名与值）；
* 支持的键值类型：`string / bool / byte / short / long / float / uint64 / local`；
* 保留键：`local / unreliable / suppress / time / eventid`。([developer.valvesoftware.com][3])

**最小示例**

```kv
// custom.gameevents
"CustomEvents"
{
  "pui_error_msg" { "error" "string" }
}
```

```lua
-- 服务器全局广播
FireGameEvent("pui_error_msg", { error = "Not enough gold" })
```

```js
// 客户端订阅
GameEvents.Subscribe("pui_error_msg", e => { $.Msg(e.error); });
```

> `ListenToGameEvent/FireGameEvent` 的入门说明见官方教程页。([developer.valvesoftware.com][7])

**何时选 B**：你想要**与引擎内建事件统一**的全局广播语义，且能接受 1 KB 的载荷上限与预声明维护成本。([developer.valvesoftware.com][3])

---

## 4) **UI ↔ 客户端 Lua 本地通信**（不经服务器）

> 在同一台客户端内的 UI 与客户端 Lua 之间零网络往返，适合轻量本地桥接（例如 UI 内部工具/调试面板与 `IsClient()` 侧 Lua）。

**两端 API**

* **UI → 客户端 Lua**：`GameEvents.SendEventClientSide(name, data)`（仅客户端侧有效的 gameeventmanager 发送）。([developer.valvesoftware.com][4])
* **客户端 Lua → UI**：`FireGameEventLocal(name, kv)`（**本地触发**，不广播）。([developer.valvesoftware.com][8])
* 客户端 Lua 监听：`ListenToGameEvent(name, fn, nil)`；可用 `IsClient()` 保护只在客户端注册。([developer.valvesoftware.com][7])

**最小双向示例**

```kv
// scripts/custom.gameevents （可选：为本地事件也做字段声明）
"CustomEvents"
{
  "ui_to_client" { "text" "string" }
  "client_to_ui" { "msg"  "string" }
}
```

```js
// Panorama：发给客户端 Lua（本地）
GameEvents.SendEventClientSide("ui_to_client", { text: "ping" });
// Panorama：订阅来自客户端 Lua 的本地回传
GameEvents.Subscribe("client_to_ui", d => $.Msg("Lua says:", d.msg));
```

```lua
-- vscripts/client_init.lua
if IsClient() then
  ListenToGameEvent("ui_to_client", function(_, d)
    print("UI->Lua:", d.text)
    FireGameEventLocal("client_to_ui", { msg = "pong" }) -- 回 UI
  end, nil)
end
```

**注意**

* 这是**本地**通道，不会穿过网络；需要跨端（到服务器/其他玩家）请改走 CGEM。([developer.valvesoftware.com][2])
* 仍保持小载荷，避免把它当“大数据管道”。

---

## 5) 设计与性能清单

* **事件做触发，表做状态**：持续可查询的数据放 NetTables；一次性交互/回执用 GameEvents。([developer.valvesoftware.com][5])
* **控制载荷**：

  * NetTables：单次更新 < **16 KB**（建议 12–14 KB 留余量）。([developer.valvesoftware.com][1])
  * GameEvents：遵循 **< 1 KB** 的引擎总长度约束（预声明路线）；CGEM 也建议维持小载荷。([developer.valvesoftware.com][3])
* **定向下发**：能明确目标时优先 `Send_ServerToPlayer/ToTeam`，少用“全体广播”。([developer.valvesoftware.com][6])
* **键名与类型**：短键名 + 枚举/索引代替长串；严格遵循支持的类型与保留键规则（预声明路线）。([developer.valvesoftware.com][3])
* **节流与合并**：UI 侧对高频输入做 debounce/throttle；服务器侧对高频事件做合并。
* **安全校验**：服务器 listener 对来自客户端的数据一律白名单/范围校验。
* **UI 本地链路**：工具化/调试/动画桥接可走本地（SendEventClientSide ↔ FireGameEventLocal），**跨端**请改走 CGEM。([developer.valvesoftware.com][4])

---

## 6) 调试与排错

* **vconsole** 观察事件：在 Panorama 里打印 `$.Msg(...)`；Lua 里 `print(...)`。
* **确认注册**：

  * NetTables：表名需存在、key 为字符串。([developer.valvesoftware.com][5])
  * 预声明事件：`.gameevents` 中事件名/字段类型正确；注意**事件名长度/空格限制**。([developer.valvesoftware.com][3])
* **体积护栏**：在服务器合并补丁前先 `json.encode` 粗估大小，超阈值就拆分/分批。
* **客户端/服务器侧混淆**：区分 `IsClient()` 与 `IsServer()`，不要在错误的侧注册/发送。([developer.valvesoftware.com][9])

---

## 7) API 速查链接

* **Custom Net Tables**（16KB 限制、按 key 整块广播）([developer.valvesoftware.com][1])
* **Custom Game Events（CGEM 概述）**（新系统，替代 `custom_events.txt`）([developer.valvesoftware.com][2])
* **内建/预声明事件规范**（事件名≤32、无空格、总字节<1024、类型/保留键）([developer.valvesoftware.com][3])
* **Panorama JS API（GameEvents / NetTables）**（`SendCustomGameEventToServer` / `SendEventClientSide` / `Subscribe`）([developer.valvesoftware.com][4])
* **Lua Scripting API（CCustomGameEventManager.Send_ServerToPlayer 等）**([developer.valvesoftware.com][6])
* **ListenToGameEvent 教程**（入门监听示例）([developer.valvesoftware.com][7])
* **FireGameEventLocal**（本地触发，不广播）([developer.valvesoftware.com][8])