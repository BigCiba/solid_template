declare interface UpperNotificationData extends NotificationData {
	type?: "Normal" | "Warning";
	title?: string;
	override?: 0 | 1;
}
declare interface NotificationData {
	message: string;
	message_duration?: number;
	player_id?: PlayerID;
	player_id2?: PlayerID;
	teamnumber?: DOTATeam_t;
	team_only?: 0 | 1;
	panorama_class?: "CombatIconBase" | "CombatIconReward" | "CombatIconFishing" | "CombatIconWeapon" | string;
	[x: string]: any;
}
declare interface NotificationHelpData {
	/** 文本 */
	sText: string;
	/** 技能名列表 */
	tAbilities?: Table;
	/** 物品名列表 */
	tItems?: Table;
	/** 图片路径列表 */
	tImages?: Table;
	/** 顶层添加的样式 */
	sPanoramaClass?: Table;
	/** 可选对话显示持续时间，默认5秒 */
	flDuration?: number;
	/** 面板ID，重复ID会覆盖 */
	sPanelID: string;
	/** 绑定的面板ID，不填就是绝对位置 */
	sBindPanelID: string;
	/** 出现的绝对位置比如：135,224TODO:填百分比等功能 */
	sPosition?: string;
	/** 出现的位置比如：left，默认为top */
	sDirection: string;
	[x: string]: any;
}
declare interface CustomGameEventDeclarations {
	DemoEvent: {
		event_name: string,
		player_id: PlayerID,
		unit: EntityIndex,
		position: [number, number, number],
		str: string,
		[x: string]: any,
	};
	/**
	 * 切换暂停
	 */
	CustomTogglePause: {};
	/**
	 * 请求事件
	 */
	server_request_event: {
		event: string,
		data: string,
		queueIndex: string,
	};
	/**
	 * 请求事件结果
	 */
	server_request_event_result: {
		result: string,
		queueIndex: string,
		maxStep: number,
		nowStep: number,
	};
	/**
	 * 取消请求事件
	 */
	cancel_server_request_event: {
		queueIndex: string,
	};
	/**
	 * 更新镜头
	 */
	update_player_camera: {
		position_x: number,
		position_y: number,
		position_z: number,
		camera_data: string,
		left_top: string,
		right_top: string,
		left_bottom: string,
		right_bottom: string,
		x_n: number,
		y_n: number,
	};

	/** notification相关事件 */
	notification_upper: UpperNotificationData;
	notification_combat: NotificationData;
	notification_chat_line: NotificationData;
	notification_help: NotificationHelpData;
	notification_close_help: { sPanelID: string; };

	/** UI调用接口 */
	call_action: { actionName: keyof ServiceActionConfig, params: ServiceActionConfig[keyof ServiceActionConfig]["params"]; };

	/** 获得道具 */
	ReceiveRewards: { json: string;[x: string]: any; };

	error_message: {
		message: string,
		sound: string,
	};
	/** 前往主线任务 */
	go_main_task: {};

	select_diffculty: { difficulty: number; };
	hero_selection_ready: {
		level_entries?: Record<string, number>; //冠军试炼词条
	};
	select_hero: { hero_name: string; };
	hook_mode: {};

	/**
	 * 拾取物品
	 */
	pick_up_item: { entindex: EntityIndex, dropped_item: EntityIndex; };
	/** 选择单位 */
	select_units: { units: string; };
	/**
	 * 对掉落物品施放技能
	 */
	cast_ability_on_dropped_item: { ability: EntityIndex, target: EntityIndex; };
	exchange_ability: { abilities: EntityIndex[], bookIndex: EntityIndex; };
	exchange_ability_confirm: { abilitiyIndex: EntityIndex, bookIndex: EntityIndex; };
	lock_item: { item: EntityIndex, unit: EntityIndex, flag: boolean; };
	/** 通用选择 */
	common_selection: { index: number; };
	move_item_to_training: { item: EntityIndex, unit: EntityIndex; };
	move_item_to_courier: { item: EntityIndex, unit: EntityIndex; };
	move_item_to_hero: { item: EntityIndex, unit: EntityIndex; };
	/** 购买渔获商店 */
	fish_shop_buy: { item: string; };
	fish_resource: { value: number, type: string, level: number, fishName: string; };
	fish_item: { level: number; };
	/** 重开游戏 */
	restart_game: {
		type: number; // 1:投降 2:结算后重开
	};
	restart_confirm: { result: number; };
	/** 土豆相关 */
	brotato_refresh: {};
	brotato_lock: {};
	brotato_buy: { item: string; };
	toggle_dialog_event_autocast: {
		npc: EntityIndex;
		slot: number;
	};
	select_upgrade: {
		index: number;
	};
	replace_upgrade: {
		index: number;
	};
	give_up_select_upgrade: {};
	/** 支付订单的结果 */
	payment_success: {
		order_id: string;
	};
	payment_on_close_popup: {
		status: 0 | 1,
		order_ids: string[],
	};
	/** 下一回合 */
	next_round: {};
	/** 下一回合 */
	give_up_dungeon: {};
	/** 魂晶兑换遗骸 */
	convert_soul_divine: {
		name: string,
	};
	Custom_MoveCamera: {
		pos: [number, number, number],
	};
	fishing_start: {};
	item_tears_of_athena: { item: EntityIndex; caster: EntityIndex; };

	show_entity_conversation: {
		entity: number,
		id: string,
	};
	show_normal_conversation: {
		id: string;
	};
	show_group_conversation: {
		id: string;
	};
	white_screen: {};
	// finish_conversation: {}
	/** 打造物品 */
	craft_item: {};

	set_camera_distance: { value: number; };
	set_camera_pitch: { value: number, lerp?: number; };
	set_camera_height: { value: number, lerp?: number; };
	set_camera_yaw: { value: number, lerp?: number; };

	set_camera_target: { entindex: number, lerp?: number, lock?: number; };

	move_camera: { position: string, lerp: number; };
	/** 重铸物品 */
	reforge: { caster: EntityIndex; };
	/** 合成物品 */
	fusion: { caster: EntityIndex; };
	/** 交换技能 */
	swap_abilities: { ability_index_1: EntityIndex, ability_index_2: EntityIndex; };
	/** 移动技能到试炼场 */
	move_book_ability_to_training: { ability: EntityIndex, unit: EntityIndex; };
	/** 移动技能到信使 */
	move_book_ability_to_courier: { ability: EntityIndex, unit: EntityIndex; };
	/** 位置掉落技能 */
	drop_book_ability_at_position: { ability: EntityIndex, unit: EntityIndex, position: [number, number, number]; };
	/** 移动技能到物品栏 */
	move_book_ability_to_inventory: { ability: EntityIndex, unit: EntityIndex, slot: number; };
	/** 移动技能书到技能栏 */
	move_ability_book_to_abilities: { item: EntityIndex, unit: EntityIndex, ability: EntityIndex; };
	npc_share_selected: { npc: EntityIndex; };
	npc_share_unselected: { npc: EntityIndex; };
	ShowPlaceName: {
		text: string,
		duration: number,
	};
	equipment_draw_reset: {};
	login_use_cdkey: { cdkey: string; };
	select_god: { name: string; };
	select_god_ready: {};
	add_level_entry: {
		name: string,
		level: number;
	};
	confirm_level_entry: {
		entries: Record<string, number>;
	};
	load_default_level_entry: {};
	spawn_fish_chest: { count: number; };

	play_first_battle_movie: {};
	skip_first_battle: {};
	NewbieClose: {};
	NewbieReceive: {};
	debug_first_battle: {};
	give_first_battle_chest: {};
	use_first_battle_chest: {};
	clear_level_entries: {};

	/** 自定义网表 */
	request_net_data: { id: string, key: keyof NetDataDeclarations, bindPlayerID?: PlayerID; };
	/** 自定义网表数据流 */
	net_data_stream: {
		/** 网表的key */
		key: string,
		/** 标记 */
		id: string,
		/** 拆分数据的第几段 */
		step: number,
		/** 数据流 */
		data: string,
		/** 这个数据流的所属玩家ID */
		bindPlayerID: PlayerID,
		/** 是否最后一段数据 */
		done?: 0 | 1;
		/** 是否数据作废 */
		deleted?: boolean;
		/** 是否覆盖数据 */
		override?: boolean;
	};

	// 强制复活英雄
	force_respawn_hero: {};

	/** 准备完成 */
	forge_dungeon_ready: {};
	forge_dungeon_ticket_add: {
		index: number,
		ticket_id: string,
	};
	forge_dungeon_ticket_remove: {
		index: number,
	};
	forge_dungeon_select_part: {
		part: number,
	};
	settle_artifact_show_data: {
		artifact_id: number,
		forge_id?: number[],
		get_awake_chance?: number,
	}[];
	updata_equip_data: {
		data: string;
	};
}

declare interface GameEventDeclarations {
	pui_error_msg: { error: string; };
	trigger_start_touch: { trigger_name: string, activator_entindex: EntityIndex, caller_entindex: EntityIndex; };
	trigger_end_touch: { trigger_name: string, activator_entindex: EntityIndex, caller_entindex: EntityIndex; };
	send_command_unique_suffix: { str: string; };
	custom_entity_removed: { entindex: EntityIndex; };
	custom_npc_first_spawned: { entindex: EntityIndex; };
	custom_crit_msg: { victim: EntityIndex, attacker: EntityIndex, damage_type: DAMAGE_TYPES, damage: string, scale: number; };
	custom_inventory_contents_changed: { EntityIndex: EntityIndex; };
	custom_get_ability_special_value: { ability_ent_index: EntityIndex, level: number, key_name: string | "cooldown" | "mana_cost" | "gold_cost"; };
	custom_get_unit_data: { unit_ent_index: EntityIndex, function_name: string; };
	custom_get_eom_modifier_property: { unit_ent_index: EntityIndex, property: string, params_json?: string; };
	custom_get_player_data: { player_id: PlayerID, function_name: string; };

	/** 切换自定义技能窗口 */
	client_side_event: { event_name: string, event_data: any; };
	/**
	 * 矢量技能事件
	 */
	custom_vector_ability: { type: PlayerID, ability_ent_index: EntityIndex, x: number, y: number, z: number; };
	client_request_event: { event: string, data: string, queueIndex?: string; };
	custom_ability_key_event: { event_name: string, phase: number; };
	/**
	 * 更新镜头
	 */
	update_player_camera: {
		position_x: number,
		position_y: number,
		position_z: number,
		camera_data: string,
		left_top: string,
		right_top: string,
		left_bottom: string,
		right_bottom: string,
		x_n: number,
		y_n: number,
	};
	/**
	 * 伤害特效
	 */
	custom_damage_msg: {
		victim: EntityIndex,
		attacker: EntityIndex,
		damage_type: DAMAGE_TYPES,
		ability: EntityIndex,
		damage: string,
		/**
		 * 0为非暴击，1为暴击，2为技能暴击
		 */
		crit_type: 0 | 1 | 2;
		scale: number;
	};
	/**
	 * 治疗和回魔特效
	 */
	custom_heal: {
		target: EntityIndex,
		source: EntityIndex,
		is_mana_add: boolean,
		amount: string,
		scale: number;
	};
	/** 阶段切换 */
	custom_game_state_change: { state_name: string, life_cycle: "Start" | "End"; };
	call_lua_client_action: { func_name: string, json: string; };
	custom_command_unique: { command: string, unique: string; };
	/** 通知客户端属性更新· */
	attribute_update: { entindex: EntityIndex, key: number, value: number; };
	/** 客户端重连时请求一次所有的属性 */
	relaod_attribute: { entindex: EntityIndex, data?: string; };
	uba_confirm_game_settings: { difficulty: number, player_count: number; };
	uba_update_round: { round: number; };
	custom_hover_item: { item_entindex: EntityIndex; };
	custom_click_hover_item: { item_entindex: EntityIndex; };
	custom_hover_valid_item: { item_entindex: EntityIndex; };
	/** 切换UI窗口 */
	custom_ui_toggle_windows: { window_name: string, state?: 0 | 1, data?: any; };
	/** 钓鱼相关 */
	create_fish: { name: string, start: string, direction: string, speed: number; };
	/** 打开计分板事件 */
	custom_ui_toggle_flyout_scoreboard: { visible: boolean; };
	wait_scene_entity_load: { name: string, key: string, data: string; };
	play_athena_animation: { anim: string; };
}

declare interface ServerRequestEventDeclarations {
	a: {
		params: {
		},
		results: {
		};
	};
	product_buy: {
		params: {
			pid: number,
			amounts: number,
		},
		results: {
			status: number,
			msg?: string,
		};
	};
	order_create: {
		params: {
			/** payments.kv里的id */
			pay_id: string,
			/** 订单页面上的标题 */
			title: string,
			/** 订单页面上的秒速 */
			body: string,
			/** 商品ID */
			pid: number,
			/** 商品数量 */
			amounts: number,
			/** 支付类型 */
			pay_type?: PaymentType,
			/** passion用的 */
			pmid?: string,
			/** 地区 */
			country?: string,
		},
		results: {
			status: number,
			data: {
				payment_order: {
					order_id: string,
					order_link: string,
				};
			};
		};
	};
	/** 装备强化 */
	strength_equipment: {
		params: {
			/** 从0开始的 */
			equipment_id: number,
		},
		results: {
			code: number,
		};
	};
	/** 装备洗练 */
	succinct_equipment: {
		params: {
			/** 从0开始的 */
			equipment_id: number,
		},
		results: {
			code: number,
		};
	};
	/** 装备继承 */
	inherit_equipment: {
		params: {
			/** 从0开始的 */
			origin_equipment_id: number,
			target_equipment_id: number,
			origin_entry_index: number[],
			target_entry_index: number[],
		},
		results: {
			code: number,
		};
	};
	// 装备分解
	break_equipment: {
		params: {
			equipment_id: number[];
		},
		results: {
			code: number,
		};
	};
	/** 圣物分解 */
	break_gene: {
		params: {
			equipment_id: number[];
		},
		results: {
			code: number,
		};
	};
	// 装备穿戴/卸下
	hero_equip: {
		params: {
			equipment_id: number,
			suit_id: number;
			hero_id: number,
			part: number,
		},
		results: {
			code: number,
		};
	};
	/** 招募英雄 */
	summon_hero: {
		params: {
			hero_id: number,
		},
		results: {
			code: number,
		};
	};
	/** 英雄升级 */
	hero_level_exp_up: {
		params: {
			hero_id: number,
			exp_value: number;
		},
		results: {
			code: number,
		};
	};
	/** 英雄升星 */
	hero_star_exp_up: {
		params: {
			hero_id: number,
			props: {
				id: number;
				amounts: number;
			}[];
		},
		results: {
			code: number,
		};
	};
	/** 英雄升级技能 */
	hero_skill_up: {
		params: {
			hero_id: number,
			skill_id: number;
		},
		results: {
			code: number,
		};
	};
	/** 英雄升级技能 */
	hero_exchange_piece: {
		params: {
			hero_id: number,
			amounts: number;
		},
		results: {
			code: number,
		};
	};
	/** 英雄升级品质 */
	hero_quality_up: {
		params: {
			hero_id: number,
		},
		results: {
			code: number,
		};
	};
	/** 抽卡 */
	draw_card: {
		params: {
			count: number,
			id: number,
		},
		results: {
			code: number,
			items_list: {
				item_id: number,
				amounts: number,
				rarity: string,
				origin_item_id?: number,
			}[];
		};
	};
	/** bp领取奖励 */
	bp_receive_rewards: {
		params: {
			level?: number,
			plus?: number,
			receive_all?: boolean,
		},
		results: {
			code: number,
		};
	};
	/** 领取任务奖励 */
	receive_task_rewards: {
		params: {
			task_id: number,
			extra_id?: number,
		},
		results: {
			code: number,
		};
	};
	/** 装卸信使 */
	equip_courier: {
		params: {
			courier_id: number,
		},
		results: {
			code: number,
		};
	};
	/** 信使升星 */
	courier_up_star: {
		params: {
			courier_id: number,
		},
		results: {
			code: number,
		};
	};
	// 刷新装备
	refresh_equipment: {
		params: {},
		results: {
			code: number,
		};
	};
	// 锁定装备
	lock_equipment: {
		params: {
			equipment_id: number[];
			lock: boolean;
		},
		results: {
			code: number,
		};
	};
	// 锁定萃石
	lock_gem: {
		params: {
			gem_id: number[];
			lock: boolean;
		},
		results: {
			code: number,
		};
	};
	// 装备栏位强化
	equipment_slot_enhance: {
		params: {
			part: number,
		},
		results: {
			code: number,
			success: boolean;
		};
	};
	// 装备萃取
	equipment_extract: {
		params: {
			equipment_id: number,
			lock_base?: number[],
			lock_advanced?: number[];
			toast_delay?: number;
		},
		results: {
			code: number,
			gem: Gem;
			extra_gem?: Gem;
			player_extract_equipment_result: {
				base_index: number[],
				advanced_index: number[];
			};
		};
	};
	// 装备碎片嵌入
	equipment_gem_inlay: {
		params: {
			equipment_id: number,
			gem_id: number,
			lock_base?: number[],
			lock_advanced?: number[];
		},
		results: {
			code: number,
		};
	};
	// 装备碎片嵌入确认
	equipment_gem_inlay_confirm: {
		params: {
			equipment_id: number,
			result: boolean;
		},
		results: {
			code: number,
		};
	};
	// 碎片锻造
	gem_build: {
		params: {
			gem_id: number;
		},
		results: {
			code: number,
			player_build_gem_result: {
				base_index: number[],
				advanced_index: number[];
			};
		};
	};
	// 碎片分解
	gem_break: {
		params: {
			gem_id: number[];
		},
		results: {
			code: number,
		};
	};
	// 基因合成
	gene_fusion: {
		params: {
			equipment_id1: number;
			equipment_id2: number;
			lock_base1?: number[];
			lock_base2?: number[];
		},
		results: {
			code: number,
		};
	};
	// 圣物升级
	gene_upgrade: {
		params: {
			equipment_id: number;
			consume_equipment_id: number;
		},
		results: {
			code: number,
		};
	};
	// 基因合成确认
	gene_fusion_confirm: {
		params: {
			inherit_equipment_id: number;
			other_equipment_id: number;
			result: boolean;
			regret_equipment_id?: number;
		},
		results: {
			code: number,
			eid: number;
		};
	};
	// 装备强化
	equip_strengthen: {
		params: {
			equipment_id: number,
		},
		results: {
			code: number,
		};
	};
	// 更改装备套装
	// change_suit: {
	// 	params: {
	// 		suit_type: number;
	// 		suit: number;
	// 	},
	// 	results: {
	// 		code: number,
	// 	};
	// };

	sirius_levelup: {
		params: {
			sirius_id: number,
		};
		results: {
			code: number,
		};
	};
	call_action_request: {
		params: {
			action: keyof ServiceActionConfig,
			action_params: any,
		},
		results: {};
	};
	get_equipment_detail: {
		params: {
			ids: string[];
		};
		results: Record<string, Equipment>;
	};
	get_gem_detail: {
		params: {
			ids: string[];
		};
		results: Record<string, Gem>;
	};
	get_equipment_list: {
		params: {
			entries: string[]; // 筛选词条id数组
		};
		results: {
			ids: string[];
		};
	};
	get_entry_level_equipment_list: {
		params: {
			entry_level: number;
		};
		results: {
			ids: string[];
		};
	};
	get_gem_list: {
		params: {
			entries: string[]; // 筛选词条id数组
		};
		results: {
			ids: string[];
		};
	};
	get_artifact_ticket_detail: {
		params: {
			id: string[],
			ticket_owner?: PlayerID,
		},
		results: Record<string, ArtifactTicketProps>;
	};
	get_artifact_detail: {
		params: {
			id: string[],
			about_to_get?: boolean,
		},
		results: Record<string, ArtifactProps>;
	};
	// 穿戴/卸下
	hero_artifact_equip: {
		params: {
			artifact_id: number,
			suit_id: number;
			hero_id: number,
			part: number,
		},
		results: {
			code: number,
		};
	};
	// 分解
	destroy_artifacts: {
		params: {
			ids: number[],
			type: "artifact" | "ticket";
		};
		results: {
			code: number,
		};
	};
	filter_artifact_by_attr: {
		params: {
			attr: string[],
		},
		results: {
			ids?: string[],
		};
	};
	filter_artifact_ticket_by_attr: {
		params: {
			attr: string[],
		},
		results: {
			ids?: string[],
		};
	};
}

declare type DetailedAttributeProperty = {
	value: number;
	baseValue?: number; // 基础值，如果有基础值，则会显示为额外值，按下alt显示总值
	precision?: number; // 精度，保留位数
	criticalValue?: number; // 关键临界值，用于区别是否显示为红色值的区别
	text?: string; // 使用自定义文本，默认使用"dota_ability_attribute_"+name的字段
	isPercentage?: boolean; // 是否为百分比数值，仅在当自定义文本启用时有作用，因为默认的字段本地化内含"%"来区别百分比数值
	isNegative?: boolean; // 是否为正值为负面，仅在当自定义文本启用时有作用，因为默认的字段本地化内含"*"来区别正值为负面
};

declare interface ClientRequestEventDeclarations {
	register_key_event: {
		params: {
			key_name: string,
		},
		results: {
			event_name: string,
		};
	};
	unregister_key_event: {
		params: {
			event_name: string,
		},
		results: {
			success: boolean,
		};
	};
	register_ability_key_event: {
		params: {
			slot: number,
			key_name: string,
			quick_cast: boolean,
		},
		results: {
			event_name: string,
		};
	};
	unregister_ability_key_event: {
		params: {
			event_name: string,
		},
		results: {
			success: boolean,
		};
	};
	get_camera_entity: {
		params: {
			position: [number, number, number];
		},
		results: {
			entindex: EntityIndex,
		};
	};
	call_lua_client_function: {
		params: {
			func_name: string,
			args_json: string,
		},
		results: {
			value: any,
		};
	};
	get_unit_ability_values_and_uniques: {
		params: {
			unit: EntityIndex,
			ability_name: string,
			ability_entity_index?: EntityIndex,
		},
		results: {
			values?: Record<string, Partial<AbilityValueData>>,
			uniques?: Record<string, number>,
			cooldown_reduction?: number,
			mana_cost_percent?: number,
			adaptive_damage_type?: DAMAGE_TYPES,
			item_subtitle?: string,
			data?: Record<string, any>;
		};
	};
	get_unit_added_attribute_values: {
		params: {
			unit?: EntityIndex,
		},
		results: {
			value: Record<string, number> | undefined,
		};
	};
	get_unit_lower_hud_refresh_data: {
		params: {
			unit: EntityIndex,
			panelAbilities: EntityIndex[],
			hero: EntityIndex,
			overheadUnits: EntityIndex[],
			playerHeroes: EntityIndex[],
		},
		results: {
			attack_damage: number,
			base_attack_damage: number,
			spell_power: number,
			base_spell_power: number,
			armor: number,
			base_armor: number,
			init_armor: number,
			health: number,
			health_regen: number,
			mana: number,
			mana_regen: number,
			primary_attribute: number,
			str: number,
			base_str: number,
			agi: number,
			base_agi: number,
			int: number,
			base_int: number,
			all_barrier: number,
			max_all_barrier: number,
			physical_barrier: number,
			max_physical_barrier: number,
			magical_barrier: number,
			max_magical_barrier: number,
			no_health_bar: boolean,

			exp_gain_pct: number,
			kill_gold: number,
			kill_score: number,
			kill_crystal: number,
			kill_gold_pct: number,
			kill_score_pct: number,
			kill_crystal_pct: number,
			gold_per_sec: number,
			crystal_per_sec: number,
			score_per_sec: number,

			abilityManaCostPercents: Record<EntityIndex, number>,
			abilityChargeRestoreTimes: Record<EntityIndex, number>,
			abilityProgressModifierNames: Record<EntityIndex, string>,

			hero_devour_equip_count: number,
			hero_devour_equip_pct: number,
			hero_devour_casting_count: number,
			hero_devour_casting_2_count: number,
			hero_devour_casting_3_count: number,
			hero_devour_casting_4_count: number,

			overheadUnitData?: Record<EntityIndex, {
				all_barrier: number,
				max_all_barrier: number,
				physical_barrier: number,
				max_physical_barrier: number,
				magical_barrier: number,
				max_magical_barrier: number,
				armor: number,
				init_armor: number,
				no_health_bar: boolean,
			}>,

			playerHeroesData?: Record<EntityIndex, {
				attack_power_level: number,
				defense_power_level: number,
			}>,
		};
	};
	get_player_detailed_attributes: {
		params: {
			hero: EntityIndex,
			playerID: PlayerID,
		},
		results: {
			primary_attribute: Attributes,
			str: DetailedAttributeProperty,
			str_amp: number;
			agi: DetailedAttributeProperty,
			agi_amp: number;
			int: DetailedAttributeProperty,
			int_amp: number;
			attack_damage: DetailedAttributeProperty,
			attack_damage_amp: number;
			spell_power: DetailedAttributeProperty,
			spell_power_amp: number;
			health: DetailedAttributeProperty,
			health_amp: number;

			attack: Record<string, DetailedAttributeProperty>,
			defence: Record<string, DetailedAttributeProperty>,
			farm: Record<string, DetailedAttributeProperty>,
			other: Record<string, DetailedAttributeProperty>,

			order_by: Record<string, number>;
		};
	};
	get_fish_ent: {
		params: {
		},
		results: {
			entindex: EntityIndex,
			fishEntList: Record<string, EntityIndex>,
		};
	};
	get_unit_stats_data: {
		params: {
			unit: EntityIndex,
		},
		results: {
			// 攻击
			attack_damage: number,
			base_attack_damage: number,
			attack_damage_amp: number,
			crit_chance: number,
			crit_damage: number,
			mana: number,
			mana_regen: number,
			// 防御
			armor: number,
			base_armor: number,
			armor_damage_reduction: number,
			health: number,
			base_health: number,
			health_amp: number,
			health_regen: number,
			damage_reduction: number,
			damage_block: number,
			counter_chance: number,
			// 能力
			spell_power: number,
			base_spell_power: number,
			spell_power_amp: number,
			cooldown_reduction: number,
			mana_cost: number,
			cast_range_bonus: number,
			armor_reduction: number,
			summoned_damage: number,
			summoned_attack_speed: number,
			summoned_amount: number,
			// 其他
			physical_damage: number,
			magical_damage: number,
			splash_radius: number,
			splash_damage: number,
			lifesteal_chance: number,
			physical_lifesteal: number,
			magical_lifesteal: number,
			// 属性
			primary_attribute: number,
			str: number,
			base_str: number,
			str_amp: number,
			agi: number,
			base_agi: number,
			agi_amp: number,
			int: number,
			base_int: number,
			int_amp: number,
		};
	};
	/* 客户端网络请求 */
	get_iso_code: {
		params: {
			uid: string,
			response_key: string,
		},
		results: {};
	};
	portraits_full_body_loadout: {
		params: {
			unitname: string,
		};
		results: {};
	};
}

/**
 * Scene场景加载完成数据
 */
declare interface SceneEntityLoadData {
	portraits_full_body_loadout: {
		unitname: string;
		camera?: string;
	};
	portraits_mvp: {
		unitname: string;
	};
	courier: {
		id: number,
		scale?: number,
		camera?: string,
	};
	fish: {
		fish_name: string,
		scale?: number,
		camera?: string,
	};
	athena: {
		skin_id?: string;
		base_id?: string;
	};
}