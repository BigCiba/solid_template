
import { reloadable } from "../lib/tstl-utils";

declare type DemoEvents = {
	playerID: PlayerID,
	unit: CBaseEntity & CDOTA_BaseNPC | undefined,
	position: Vector,
	str: string,
	[x: string]: any;
};

@reloadable
class CDemo extends CModule {
	[x: string | number | symbol]: any;
	free_spells: boolean = false;
	init(bReload: boolean): void {
		if (!bReload) {
			SendToServerConsole("sv_cheats 1");
			SendToServerConsole("dota_ability_debug 0");
		}

		GameEvent("player_chat", function (...args) { return this.OnPlayerChat(...args); }, this);
		// GameEvent("game_rules_state_change", function (...args) { return this.OnGameRulesStateChange(...args); }, this);
		// GameEvent("custom_npc_first_spawned", function (...args) { return this.OnNPCFirstSpawned(...args); }, this);
		CustomUIEvent("DemoEvent", function (data) {
			let eventName = data.event_name;
			let playerID = data.player_id ?? -1;
			let unit = EntIndexToHScript((data.unit ?? - 1) as EntityIndex);
			let position = data.position != undefined ? Vector(data.position["0"], data.position["1"], data.position["2"]) : vec3_invalid;
			let str = data.str;
			if (typeof eventName == "string" && typeof this[eventName] == "function") {
				let params: DemoEvents = {
					playerID: playerID,
					unit: unit as CDOTA_BaseNPC,
					position: position,
					str: str,
				};
				for (let [k, v] of pairs(data)) {
					if (k != "event_name" && k != "player_id" && k != "unit" && k != "position" && k != "str") {
						params[k] = v;
					}
				}
				this[eventName](params);
			}
		}, this);
	}

	/** 保存配置 */
	private SaveConfig(iPlayerID: PlayerID, config: Table) {
		const handle = CreateHTTPRequestScriptVM("POST", "http://150.158.155.234:8001/v1/other/save-custom-gameconfig");
		handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
		handle.SetHTTPRequestHeaderValue("Authorization", "28EF96C3DAE7B3743D8854C57099BF38DEF9539F");
		handle.SetHTTPRequestRawPostBody("application/json", json.encode({ uid: PlayerResource.GetSteamAccountID(iPlayerID), game: "tui12", config: json.encode(config) }));
		handle.SetHTTPRequestAbsoluteTimeoutMS(3000);
		handle.Send((response) => {
			PrintLongStr(`StatusCode: ${response.StatusCode}\tBody: ${response.Body}`, "http://150.158.155.234:8001/v1/other/save-custom-gameconfig");
		});
	}
	/** 加载配置 */
	private LoadConfig() {
		// Game.EachPlayer((iPlayerID) => {
		// 	if (!PlayerResource.IsFakeClient(iPlayerID)) {
		// 		const handle = CreateHTTPRequestScriptVM("POST", "http://150.158.155.234:8001/v1/other/get-custom-gameconfig");
		// 		handle.SetHTTPRequestHeaderValue("Content-Type", "application/json;charset=utf-8");
		// 		handle.SetHTTPRequestHeaderValue("Authorization", "28EF96C3DAE7B3743D8854C57099BF38DEF9539F");
		// 		handle.SetHTTPRequestRawPostBody("application/json", json.encode({ uid: PlayerResource.GetSteamAccountID(iPlayerID), game: "tui12" }));
		// 		handle.SetHTTPRequestAbsoluteTimeoutMS(3000);
		// 		handle.Send((response) => {
		// 			PrintLongStr(`StatusCode: ${response.StatusCode}\tBody: ${response.Body}`, "http://150.158.155.234:8001/v1/other/get-custom-gameconfig");
		// 			if (response.StatusCode != 200) return;
		// 			const [data] = json.decode(response.Body);
		// 			if (data == undefined) return;
		// 			if (data.code != 0) return;
		// 			if (data?.data?.config == undefined) return;
		// 			[this.m_tToolSetting[iPlayerID]] = json.decode(data.data.config);
		// 			this.UpdateSettings();
		// 		});
		// 	}
		// }, PLAYER_TEAM);
	}
	/** 更新 */
	UpdateSettings() {
		const settings = {
			free_spells: this.free_spells,
		};
		CustomNetTables.SetTableValue("common", "demo_settings", settings);
	}
	private OnPlayerChat(events: EventProperties<PlayerChatEvent>) {
		if (!IsInToolsMode()) {
			return;
		}
		let playerID = events.playerid;
		let text = string.lower(events.text);
		let teamOnly = events.teamonly == 1;

		let tokens = string.split(text, " ");
		let cmd = tokens[0];
		let args: any[] = [];
		for (let i = 1; i < tokens.length; i++) {
			const tmp = tonumber(tokens[i]);
			if (tmp) {
				table.insert(args, tmp);
			} else {
				table.insert(args, tokens[i]);
			}
		}

		if (text == "0") {
			SendToServerConsole("cl_ent_text");
		}
		if (text == "1") {
			SendToServerConsole("ent_text");
		}
		if (text == "2") {
			SendToServerConsole("ent_kill");
		}
	}

	//----------------------游戏----------------------
	/** 主机速度 */
	ChangeHostTimescale(data: DemoEvents) {
		SendToServerConsole("host_timescale " + data.str);
	}
	Standby(data: DemoEvents) {
		// 注册属性
		// PropertySystem.RegisterProperty({
		// 	id: 'attack_damage',
		// 	scope: PropertyScope.UNIT,
		// 	valueType: PropertyValueType.NUMBER,
		// 	aggregation: AggregationStrategy.SUM,
		// });
		PropertySystem.AddStaticProperty(
			PropertyScope.UNIT,
			data.unit!.GetEntityIndex(),
			"attack_damage",
			"item_sword_1234",  // sourceId
			50
		);
		this.print(PropertySystem.GetPropertyValueFromNetTable(PropertyScope.UNIT, data.unit!.GetEntityIndex(), "attack_damage"));
	}

	//----------------------英雄----------------------
	/** 刷新状态 */
	Refresh(data: DemoEvents) {
		let heroes = HeroList.GetAllHeroes();
		for (const hero of heroes) {
			const particleID = ParticleManager.CreateParticle("particles/items2_fx/refresher.vpcf", ParticleAttachment_t.PATTACH_ROOTBONE_FOLLOW, hero);
			ParticleManager.ReleaseParticleIndex(particleID);
			hero.EmitSound("DOTA_Item.Refresher.Activate");
			for (let index = 0; index < hero.GetAbilityCount() - 1; index++) {
				let ability = hero.GetAbilityByIndex(index);
				if (ability) {
					ability.EndCooldown();
					ability.RefreshCharges();
				}
			}
			for (let index = 0; index < DOTA_ITEM_MAX - 1; index++) {
				let item = hero.GetItemInSlot(index);
				if (item) {
					item.EndCooldown();
					item.RefreshCharges();
				}
			}
			hero.SetHealth(hero.GetMaxHealth());
			hero.SetMana(hero.GetMaxMana());
		}
	}

	/** 无限技能 */
	FreeSpells(data: DemoEvents) {
		SendToServerConsole("toggle dota_ability_debug");
		this.free_spells = !this.free_spells;
		this.UpdateSettings();
	}
	/** 升级 */
	LevelUp(data: DemoEvents) {
		const hero = data.unit as CDOTA_BaseNPC_Hero;
		if (IsValid(hero) && hero?.IsRealHero()) {
			hero.HeroLevelUp(false);
			// const level = toFiniteNumber(tData.str, 1) as number;
			// const unitLevel = hUnit.GetLevel();
			// const targetLevel = math.min(unitLevel + level, HERO_MAX_LEVEL);
			// if (targetLevel > unitLevel) {
			// 	PlayerData.AddExperience(iPlayerID, HERO_XP_PER_LEVEL_TABLE[targetLevel - 1] - hUnit.GetCurrentXP());
			// }
		}
	}

	//----------------------其他----------------------
	/** 重开游戏 */
	Restart(data: DemoEvents) {
		print("Restart");
	}
	/** 重载KV */
	ReloadKeyValue(data: DemoEvents) {
		GameRules.Playtesting_UpdateAddOnKeyValues();
		FireGameEvent("client_reload_game_keyvalues", {});
	}
	/** 重载脚本 */
	ReloadScript(data: DemoEvents) {
		SendToServerConsole("cl_script_reload");
		SendToServerConsole("script_reload");
	}
	RefreshServicePressed(data: DemoEvents) {
		print("RefreshServicePressed");
		// Service.DebugRefreshData();
	}
}

declare global {
	var Demo: CDemo;
}
Demo ??= new CDemo();