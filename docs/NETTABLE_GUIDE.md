# Dota 2 自定义网表（Custom Net Tables）使用说明

> 本文面向 Dota 2 自定义游戏作者，系统介绍网表的用途、读写方式、硬性限制与最佳实践，并给出可直接复用的代码片段与排错建议。

---

## 1. 网表是什么？适用场景

**Custom Net Tables（简称“网表/NetTables”）**是从**服务器（Lua/VScript）到客户端（Panorama JS）**的**持久键值存储**：

* 与自定义 GameEvent 相比，网表是**可随时查询的状态**，玩家掉线重连后会自动重建。([developer.valvesoftware.com][1])
* 典型用法：排行榜/计分板数据、玩家持久属性、可本地渲染的配置、UI 所需的缓变状态等。
* **不适合**高频瞬态数据（如每帧位置/血量变化）；这类用 GameEvent 更合适。([developer.valvesoftware.com][1])

---

## 2. 基本结构与注册

网表按“**表名 → key → 值**”组织：

* **表名需预先注册**在 `scripts/custom_net_tables.txt`（KV3 语法）。([developer.valvesoftware.com][1])
* **key 必须是字符串**；**同一张表可拥有任意数量的字符串 key**，每个 key 映射为一个（可嵌套的）Lua 表。([developer.valvesoftware.com][1])

**KV3 示例（`scripts/custom_net_tables.txt`）**：

```kv3
// kv3
{
  custom_net_tables =
  [
    "player_data",
    "round_state"
  ]
}
```

（语法与示例源于 Valve 开发者文档。） ([developer.valvesoftware.com][1])

---

## 3. 读写 API（Lua ↔ Panorama）

### 3.1 服务器写入（Lua/VScript）

```lua
-- 写入或更新指定表的某个 key
CustomNetTables:SetTableValue("player_data", "p_" .. playerID, {
  level = 7,
  gold  = 1234
})
```

* 当**某个 key 的值发生变化时，会把该 key 的“整个值”广播到所有客户端**（不影响同表内其它 key）。([developer.valvesoftware.com][1])

### 3.2 客户端读取与订阅（Panorama JS）

```js
// 读取整个表
const all = CustomNetTables.GetAllTableValues("player_data");

// 读取单个 key
const one = CustomNetTables.GetTableValue("player_data", "p_0");

// 订阅变化
function onPlayerDataChanged(tableName, key, value) {
  $.Msg("NetTable changed:", tableName, key, value);
}
CustomNetTables.SubscribeNetTableListener("player_data", onPlayerDataChanged);
```

* 可随时 `GetAllTableValues / GetTableValue` 查询当前值；
* 可用 `SubscribeNetTableListener` 订阅表内任意 key 的变化回调；
* 对应 API 由 Panorama 文档提供。([developer.valvesoftware.com][2])

> **客户端只读**：Panorama 无法直接写网表，若需上行请用自定义 GameEvent（`GameEvents.SendCustomGameEventToServer/ToClient/ToAllClients` 等）。([developer.valvesoftware.com][2])

---

## 4. 硬性限制与行为特性（必须了解）

* **单次更新大小上限：16,384 字节（16 KB）**
  若一次 `SetTableValue` 触发的更新包超过该大小，引擎会报错并导致崩溃。([developer.valvesoftware.com][1])

* **广播粒度：按 key 的“整块值”**
  某个 key 改动将**整块值**下发到所有客户端；频繁变动字段应拆入独立 key，避免把大对象反复整块重发。([developer.valvesoftware.com][1])

* **时延是客观存在**
  服务器改网表到客户端看到更新之间存在网络时延；不要将**强一致、实时**逻辑建立在网表上。([developer.valvesoftware.com][1])

> 文档未声明“表的数量上限”；实践中受内存与带宽约束，建议**表名与 key 总量保持精简**。([developer.valvesoftware.com][1])

---

## 5. 设计与性能最佳实践

1. **按更新频率拆 key**

* 把**大对象**切分：把“很少变化的静态字段”和“经常变化的小字段”分到不同 key；
* 以玩家为单位：`player_data` 下用 `p_<id>` 做 key（例：`p_0`, `p_1`），便于仅重发单个玩家块。([developer.valvesoftware.com][1])

2. **控制单次负载**

* 估算序列化后体积，给自己留余量（实务建议 < 12–14 KB/次）；超大块用**多 key 分批**。**硬上限为 16 KB/次**。([developer.valvesoftware.com][1])

3. **高频瞬态用 GameEvent**

* 技能按键、临时提示、一次性交互等，走 GameEvent（还能**只发给单个客户端**）。([developer.valvesoftware.com][2])

4. **只放可序列化数据**

* 避免把函数、实体句柄等不可序列化对象直接塞进网表；用可还原的标识（实体 index、短字符串）代替。

5. **前端做缓存与脏标记**

* 订阅回调里只更新受影响的 UI 区域；对大表先做浅比较/脏标记再刷新。

---

## 6. 代码模板与工具化

### 6.1 服务器侧：按玩家分片的更新工具

```lua
local function SetPlayerData(playerID, patch)
  local key = "p_" .. tostring(playerID)
  local cur = CustomNetTables:GetTableValue("player_data", key) or {}
  -- 合并小补丁，避免整块构造
  for k,v in pairs(patch) do cur[k] = v end

  -- （可选）体积守护：需要项目内可用的 json.encode
  -- local encoded = json.encode(cur)
  -- if #encoded > 14000 then
  --   print(string.format("[NetTable] oversize warning: key=%s size=%d", key, #encoded))
  -- end

  CustomNetTables:SetTableValue("player_data", key, cur)
end
```

> 说明：这里用“合并补丁”的方式保持 key 的整块值小而稳定；如需**分批**，可把大字段再拆成 `p_<id>_a`, `p_<id>_b` 等多个 key。

### 6.2 客户端侧：统一订阅与分派

```js
(function () {
  const watchers = {};
  function watchKey(key, fn) {
    (watchers[key] ||= []).push(fn);
    const cur = CustomNetTables.GetTableValue("player_data", key);
    if (cur) fn(cur);
  }
  CustomNetTables.SubscribeNetTableListener("player_data", (_, key, value) => {
    (watchers[key] || []).forEach(fn => fn(value));
  });

  // 使用示例
  watchKey("p_0", (v) => {
    $("#GoldLabel").text = String(v.gold || 0);
  });
})();
```

> 说明：把订阅包装成“小总线”，便于每个 UI 组件只关心自己的 key。

---

## 7. 常见问题（FAQ）

**Q1：能不能只把某个 key 发给某个客户端？**
A：**网表更新会广播给所有客户端**，不支持只发给一个人；若有私有数据或点对点消息，请用 `GameEvents.SendCustomGameEventToClient`。([developer.valvesoftware.com][1])

**Q2：表名/表数量有上限吗？**
A：文档未给出硬上限；实际由内存与网络负载约束。请保持表名与 key 命名清晰、数量可控。([developer.valvesoftware.com][1])

**Q3：为什么我只改了一个字段，客户端好像收到了“大块更新”？**
A：因为广播粒度是“该 key 的**整块值**”，请把高频字段拆到独立 key。([developer.valvesoftware.com][1])

**Q4：客户端订阅不到更新或延迟很高？**
A：检查是否正确注册表名、是否写入了相应 key；网络时延客观存在，UI 逻辑需容忍异步。([developer.valvesoftware.com][1])

---

## 8. 清单（落地检查）

* [ ] 已在 `scripts/custom_net_tables.txt` 注册所有顶层表名（KV3）。([developer.valvesoftware.com][1])
* [ ] 每张表按**更新频率**拆 key，避免把大静态字段与小频繁字段放在同一 value 上。([developer.valvesoftware.com][1])
* [ ] 单次更新体积有守护（建议 < 14 KB；绝对上限 16 KB）。([developer.valvesoftware.com][1])
* [ ] 高频/一次性消息走 GameEvent，必要时只发给特定客户端。([developer.valvesoftware.com][2])
* [ ] Panorama 端只读网表，订阅回调里做**局部刷新**与缓存。([developer.valvesoftware.com][2])

---

## 9. 参考资料

* Valve Developer Community — **Custom Nettables**（含注册示例、16KB 限制、广播粒度、延迟说明与 Lua/JS 示例）。([developer.valvesoftware.com][1])
* Valve Developer Community — **Panorama Javascript API（CustomNetTables & GameEvents）**。([developer.valvesoftware.com][2])

---

如果你把**当前项目的网表结构/字段与更新频率**丢给我，我可以直接帮你做**key 拆分方案与体积守护**（确保每次更新稳在 16KB 以内），并产出可用的 Lua/JS 工具函数。

[1]: https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Custom_Nettables "Custom Nettables - Valve Developer Community"
[2]: https://developer.valvesoftware.com/wiki/Dota_2_Workshop_Tools/Panorama/Javascript/API2 "Dota 2 Workshop Tools/Panorama/Javascript/API2 - Valve Developer Community"
