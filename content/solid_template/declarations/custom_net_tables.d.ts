declare interface Table {
	[x: string]: any;
}
declare interface CustomNetTableDeclarations {
	common: {
		settings: {
			is_local_host: boolean,
			is_in_tools_mode: boolean,
			is_cheat_mode: boolean,
			[x: string]: any;
		};
		custom_pause: {
			pause: boolean,
			frozen?: boolean,
		};
		demo_settings: {
			[x: string]: any;
		};
		client_ability: {
			_: EntityIndex;
		};
		// 游戏阶段
		game_state: {
			state: T12GameState,
			start_time: number,
			end_time: number,
		};
		/** 新手引导进度 */
		Tutorial0: Record<string, number>;
		game_data: {
			champion_mode: boolean;
		};
	};
	ability_upgrades_list: Record<string, { json: string; }>;
	ability_upgrades_result: Record<string, { json: string; }>;
	request_0: Record<string, { result: string, nowStep: number, maxStep: number; }>;
	request_1: Record<string, { result: string, nowStep: number, maxStep: number; }>;
	request_2: Record<string, { result: string, nowStep: number, maxStep: number; }>;
	request_3: Record<string, { result: string, nowStep: number, maxStep: number; }>;
	service: Table;
	property_system: Table;
}
declare interface PlayerDataType {
	info: {
		player_id: number, // 玩家ID
		steamID: number, // steamID
		hero_name: string, // 英雄名字
		hero_entity_index: EntityIndex, // 英雄实体index
		team_nth: number, // 队伍位置
		courier_name: string, // 信使名字
		courier_entity_index: EntityIndex, // 信使实体index
	};
	resource: {
		gold: number, // 金币
		crystal: number, // 魂晶
		score: number, // 荣耀
	};
	privilege: Record<string, number>;
	main_task: {
		taskName: string;
		taskTarget: {
			type: "TASK_STAGE_TYPE_PICK" | "TASK_STAGE_TYPE_TALK" | "TASK_STAGE_TYPE_KILL";
			name: string;
			count: number;
			target: number;
		}[];
		taskReward: {
			// weight: number;
			isFDReward: boolean;
			type: "TASK_REWARD_TYPE_ITEM" | "TASK_REWARD_TYPE_ATTRIBUTE" | "TASK_REWARD_TYPE_ATTRIBUTE_CURRENT" | "TASK_REWARD_TYPE_ITEM_DROP" | "TASK_REWARD_TYPE_NPC" | "TASK_REWARD_TYPE_RESOURCE";
			reward: {
				name: string;
				count: number;
			}[];
		}[];
	};
	/** 通用选择 */
	common_selection: CommonSelectionData;
	/** 钓鱼状态 */
	fish_state: {
		state: number;
	};
	/** 渔获 */
	fish_resource: { resource: number; };
	/** 渔获商店 */
	fish_shop: Record<string, FishShopItem>;
	/** 技能等级 */
	fish_ability_data: {
		[abilityName: string]: {
			level: number;
			upgrade: string[];
		};
	};
	/** 鱼塘参数 */
	fish_pool_data: Record<string, number>;
	/** 鱼塘buff参数 */
	fish_buff_data: Record<string, {
		duration: number,
		max_duration: number,
		src: string;
	}>;
	/** 土豆商店 */
	brotato_shop: Record<string, BrotatoShopItem>;
	/** 土豆玩法状态 */
	brotato_state: {
		state: boolean;
		shop_lock: boolean;
		shop_level: number;
	};
	hero_selection: {
		difficulty: number,
		hero: string,
		ready: boolean,
		hook_mode: boolean;
	};
	// 眼泪升级
	tear_select_upgrade: {
		type: UpgradeType;
		upgrades: ShardUpgrade[] | ScepterUpgrade[];
	} | undefined;
	/** 遗骸锻造相关 */
	divine_state: {
		exchange_count: number;
		/** 各种遗骸的数量 */
		divine_count: Record<string, number>;
		/** 各种遗骸是否解锁 */
		divine_unlock: Record<string, boolean>;
	};
	npc?: {
		entindex: EntityIndex,
		name: string,
		locked: boolean,
		text?: string,
		textEndTime?: number,
	}[];
	settlement: {
		rewards?: string;
		equipments?: string;
		artifacts?: string;
	};
	dps: Record<string, Partial<Record<DAMAGE_TYPES, number>>>;
	god_faith_level: Record<number, number>;
	hero_info?: {
		hero_name: string,
		hero_entindex: EntityIndex,
		hero_level: number,
		hero_star: number,
	};
	hero_equip?: Record<number, Equipment>;
	hero_gene?: Record<number, Equipment>;
	hero_equipped_artifact?: Record<string, ArtifactProps>;
	forge_dungeon_privilege?: Record<string, number>;
}

interface ShardUpgrade {
	attr: string,
	value: number;
}
declare enum UpgradeType {
	Shard,
	Scepter,
	Replace,
}

type ScepterUpgrade = string;

/**
 * 方便json格式化的定义
 */
interface NetDataDeclarations {
	common: {
		// 游戏的全局信息
		values: {
			difficulty: number,
			player_count: number,
			boss_round: 0 | 1,
			is_attacking: 0 | 1,
			game_success?: boolean,
		};
		// 游戏阶段
		game_state: {
			state: T12GameState,
			start_time: number,
			end_time: number,
		};
		// 冠军挑战词条
		level_entries: Record<string, number>;
		// 冠军挑战词条
		default_level_entries: Record<string, number>;
		// 回合阶段
		round_state: {
			round_number: number,
			prep_end_time: number,
			timed_round_end_time?: number,
		};
		/** 登录进度 */
		login_state: Partial<Record<PlayerID, {
			state: PlayerLoginState,
			steps: {
				login: boolean,
				equipment: boolean,
				tasks: boolean,
				activities: boolean,
			},
		}>>;
		/** 游戏常量 */
		constant: {
			BROTATO_REFRESH_COST: number;
			LastDifficulty: number;
			CHAMPION_TRIAL_MAX_LEVEL: Record<string, number>;
			CHAMPION_LEVEL_BONUS_PCT: number;
			DIVINE_FORGE_CONFIGS: {
				exchange_level: 100,
				exchange_count: 0.2,
				forge_cost_level: 200,
			};
			DEVOUR_CONFIG: Record<DevourType, number>;
			ABILITY_PROFICIENCY_PCT: number;
			ATTRIBUTE_STRENGTH_HP: number;
			ATTRIBUTE_STRENGTH_HP_REGEN: number;
			ATTRIBUTE_AGILITY_ATTACK_DAMAGE: number;
			ATTRIBUTE_INTELLECT_SPELL_POWER: number;
			ATTRIBUTE_INTELLECT_MANA: number;
			ATTRIBUTE_INTELLECT_MANA_REGEN: number;
			ATTRIBUTE_PRIMARY_DAMAGE_PERCENT: number;
			// BROTATO_UPGRADE_COST: number[];
		};
		/** 特殊随机配方 */
		special_divine_forges: {
			list: [string, string, string],
			unlock?: boolean,
		}[],

		first_battle_skip_player: Record<string, boolean>,

		/** 局外副本 */
		challenge_dungeon: {
			end_time: number,
			boss: boolean,
			buff_stack: number,
			title: string,
			description: string,
			vars?: Record<string, string | number>;
		};
		// 诸神挑战
		player_select_god: Record<number, string>;
		gods_list: Record<string, number>;
		// 挂机经验
		player_get_exp: Record<number, number>;
		// 重开确认
		restart_confirm?: {
			comfirm_player: Record<number, number>;
			end_time: number;
		};
		/** 熔炉副本 */
		forge_dungeon_prepare: {
			show: boolean,
			totalTime: number,
			endTime: number,
			maxTicket: number,
			players: Record<number, {
				/** 第0~4格槽位内放入的门票 */
				ticketList: Record<string, ArtifactTicketProps>,
				part: number,
				ready?: boolean,
			}>;
			validParts: Record<number, boolean>;
		};
		bp_season: {
			season: number;
		};
	};
	unit: Record<string, {
		devoured_items?: EntityIndex[],
		devoured_item_entindex?: Record<string, true>,
		devoured_item_names?: Record<string, number>,
		devoured_item_count?: Partial<Record<DevourType, number>>,
	}>;
	dropped_item: Record<string, {
		expiry_time?: number;
		charges?: number;
	}>;
	player_data_0: PlayerDataType;
	player_data_1: PlayerDataType;
	player_data_2: PlayerDataType;
	player_data_3: PlayerDataType;
	dialog_event: Record<string, Record<number, {
		name: string;
		cost: {
			/** 实际被百分比修改后的消耗值 */
			value: number;
			/** 记录原始消耗值 */
			rawValue: number;
			type: "gold" | "crystal" | "score";
		}[];
		enable: boolean;
		auto_cast: boolean;
		autocastable: boolean;
		toggle_enabled: boolean;
		timer?: number;
		image?: string;
		level?: number;
		maxLevel?: number;
		faith_level?: number;
		faith_reward?: {
			name: string;
			count?: number;
			type: string;
		};
		vars: Record<string, string | number | AttributeValue>;
		description?: string;
		override_tooltip?: {
			type: "item" | "ability";
			name: string;
		};
	}>>;
	ability_values: Record<string, Record<string, Record<string, Partial<AbilityValueData>>>>;
	ability_values_2: Record<string, Record<string, Partial<AbilityValueData>>>;
	ability_uniques: Record<string, Record<string, Record<string, number>>>;
	ability_uniques_2: Record<string, Record<string, number>>;
	ability_values_data: Record<string, Record<string, any>>;

	player_key_values: Record<string, {
		type: string;
		key: string;
		value: string;
	}>;

	/** 代币 */
	player_tokens: Record<string, {
		token_id: number,
		amounts: number,
	}>;
	/** 道具 */
	player_props: Record<string, {
		id: number;
		prop_id: number;
		expire_time: number;
		amounts: number;
	}>;
	/** 邮件 */
	player_mails: Record<string, MailData>;
	/** 账号 */
	player_account_level: PlayerAccountLevel;
	/** 装备 */
	// player_equipments: Record<string, Equipment>; // Record<装备ID, 装备数据>
	/** 装备 */
	player_equipments_hide: Record<string, string[]>; // Record<物品ID, 装备ID[]>
	/** 魂石 */
	// player_soul_stones: Record<string, Equipment>;
	/** 萃石头 */
	// player_gems: Record<string, Gem>; // Record<装备ID, 装备数据>
	// // 已装备装备
	// player_suit_equip: {
	// 	[suit: string]: {
	// 		[part: string]: number; // 装备ID
	// 	};
	// };
	// // 玩家选择的套装
	// player_suit: {
	// 	[suit_type: string]: {
	// 		suit_type: number;
	// 		suit: number;
	// 	};
	// };
	// 英雄装备
	// player_hero_equip: {
	// 	[hero_id: string]: {
	// 		[part: string]: number; // 装备ID
	// 	};
	// };
	player_hero_equip_suit: {
		[hero_id: string]: {
			[suit_id: string]: {
				[part: string]: number;
			}; // 装备ID
		};
	};
	// 槽位强化等级
	player_equip_part_level: {
		[part: string]: {
			part: number,
			level: number;
			// fail_count: number;
		};
	};
	// 萃石嵌入结果数据
	player_equipment_inlay_result: {
		[equipment_id: string]: {
			equipment_id: number,
			gem_id: number,
			base_attribute_data: string,
			advanced_attribute_data: string,
			exclusive_attribute_data: string;
			// {"base" | "advanced": {[gem_attribute_index : equip_attribute_index]} }
			inlay_details: string;
		};
	};
	// 基因合成结果
	player_equipment_fusion_result: {
		[inherit_equipment_id: string]: {
			inherit_equipment_id: number,
			other_equipment_id: number,
			base_attribute_data: string,
			advanced_attribute_data: string,
			exclusive_attribute_data: string,
			fusion_details: string;
		};
	};
	// 装备升级结果
	player_upgrade_equipment_rarity_result: {
		[upgrade_equipment_id: string]: {
			base_attribute_data: string,
			advanced_attribute_data: string,
			main_attribute_data: string,
			upgrade_details: {},
			exclusive_attribute_data: string,
		};
	};
	player_unread_new_ids: {
		[type: string]: {
			[id: string]: boolean;
		};
	};

	player_vip: PlayerVip;
	player_daily_rewards_receive_data: PlayerDailyRewardsReceiveData;
	player_account_level_rewards: PlayerAccountLevelRewardsData;
	player_shop_product_limit: Record<number, number>;
	player_heros: Record<string, {
		skills: Record<string, number>,
		level: number,
		extra_level_exp: number,
		total_level_exp: number,
		star: number,
		extra_star_exp: number,
		total_star_exp: number,
		quality: number,
		used_talent_points: number,
		talents: string,
		compass_task_used: number;
		equip_suit: number;
	}>;
	player_lucky: Record<string, {
		pool_id: number,
		lucky_value: number,
		lucky_choice: number,
	}>;
	player_card_lucky: Record<string, {
		lucky_id: number,
		lucky_value: number,
	}>;
	player_card_lucky_choice: Record<string, {
		pool_id: number,
		lucky_choice: number,
	}>;
	player_buff: Record<string, {
		buff_type: number,
		buff_id: number,
		is_equip: boolean,
		permanent: boolean,
		expire_time: number,
	}>;
	player_data: {
		first_login_time: number,
		last_login_time: number,
		lang: string,
		total_login_days: number,
	};
	player_battle_pass: {
		xp: number,
		total_xp: number,
		level: number,
		plus: number;
	};
	player_battle_pass_receive_records: Record<number, boolean>;
	player_tasks: Record<string, ServiceTaskInfo>;
	player_daily_task_box_receive_record: Record<string, {
		day: number,
		task_num: number,
	}>;
	player_ability_proficiencies: Record<string, {
		level: number,
		extra_exp: number,
	}>;
	player_ingame_equipment_proficiencies: Record<string, {
		level: number,
		extra_exp: number,
	}>;
	player_ingame_equipment_proficiency_data: Record<string, {
		total_level: number,
		rarity: number,
	}>;
	player_ingame_equipment_slot: Record<string, {
		rarity: number,
		slot: number,
		ingame_equipment_id: string,
	}>;
	player_couriers: Record<string, {
		courier_id: number,
		star: number,
		exp: number,
		extra_exp: number,
		equipped: number,
	}>;
	player_game_boxes: Record<string, {
		id: number,
		// match_id: number,
		// wave: number,
		box_id: number,
		amounts: number,
		// fail_count: number,
	}>;
	player_game_data: {
		mainline_progress: number,
	};
	player_login_activity_data: {
		step: number,
		last_receive_time: number,
		closed: boolean,
		next_can_receive: boolean,
	};
	player_sirius: Record<string, {
		sirius_id: number,
		level: number,
		total_exp: number,
		slot1: number,
		slot2: number,
		slot3: number,
		slot4: number,
		slot5: number,
		slot6: number,
		in_upgrade: boolean,
		// attributes: string,
		suit_id: number;
		upgrade_attribute: string;
	}>;
	player_sirius_suit: Record<string, {
		sirius_id: number,
		suit_id: number,
		attributes: string,
	}>;
	player_hero_exp_pool: {
		exp_count: number;
	};
	player_equipment_card: {
		free_turn_over_chance: number;
		turn_over_times: number;
		levelup_quality: Record<string, number>;
		origin_quality: Record<string, number>;
		cards?: {
			index: number,
			card_index: number,
			equipment_item_id: number,
			equipment_details: string,
			levelup: boolean,
			amounts: number,
		}[];
	};
	player_ornament: Record<string, {
		ornament_id: number,
		slot_id: number,
		hero_id: number,
		equipped: boolean,
		expire_time: number,
		permanent: boolean;
	}>;
	player_moonstone_activity_data: {
		activity_id: number,
		total_num: number,
		extra_num: number,
		round: number,
		received: string;
	}[];
	open_shop: {
		value: boolean;
	};
	player_goddess: {
		goddess_level: number,
		goddess_exp: number,
		goddess_extra_exp: number,
		massage_times: number,
		last_massage_time: number,
		/** TODO: */
		talents: string,
		used_talent_points: number,
	};
	player_collection: Record<string, {
		collection_id: number,
		exp: number,
		total_exp: number,
		level: number,
	}>;
	player_collection_data: Record<string, {
		collection_type: string,
		total_level: number,
		received: number[];
	}>;
	version: {
		value: number;
	};
	player_map_first_pass: Record<string, {
		map_id: number;
	}>;
	player_challenge_activity_data: Record<string, {
		activity_id: number;
		score: number;
		daily_rewards_last_receive_time: number;
		daily_rewards_can_receive: boolean;
		received_rewards: number[];
	}>;
	player_starsea_activity_data: Record<string, {
		activity_id: 301,
		step: 0;
	}>;
	player_equipments_simplify: Record<string, string>; // Record<装备ID, "equipemnt_item_id, 主属性, 强化等级, 是否已装备, 是否锁定, 镶嵌状态, 融合状态,装备分数">
	player_gems_simplify: Record<string, string>; // Record<装备ID, "equipemnt_item_id, 是否锁定,used, total_build_count, remaining_build_count, attribute_count, 分数">

	player_artifact_tickets: Record<string, any[]>;
	player_artifacts: Record<string, any[]>;
	player_artifacts_about_to_get: Record<string, any[]>;
	player_hero_artifact_suit: {
		[hero_id: string]: {
			[suit_id: string]: {
				[part: string]: number;
			}; // 装备ID
		};
	};
	player_collect_activity_data: Record<string, {
		activity_id: number;
		progress: number;
		received_rewards: number[];
	}>;
	player_drop_activity_data: Record<string, {
		drop_num: number;
		drop_limit: number;
	}>;
	info_products: Record<string, {
		product_id: number,
		start_time: number,
		end_time: number;
	}>;
	info_activities: Record<string, {
		activity_id: number,
		start_time: number,
		end_time: number;
	}>;
	info_cards: Record<string, {
		card_id: number,
		start_time: number,
		end_time: number;
	}>;
}

/** 邮件数据结构 */
declare interface MailData {
	/** 邮件ID */
	mail_id: number,
	/** 分类 */
	category: string,
	/** 标题 */
	title: string,
	/** 英文标题 */
	title_en: string,
	/** 俄语标题 */
	title_ru: string,
	/** 简短标题 */
	sub_title: string,
	/** 简短英文标题 */
	sub_title_en: string,
	/** 简短俄语标题 */
	sub_title_ru: string,
	/** 内容 */
	content: string,
	/** 英文内容 */
	content_en: string,
	/** 俄语内容 */
	content_ru: string,
	/** 开始时间 */
	// start_time: number,
	/** 过期时间 */
	expire_time: number,
	/** 奖励 */
	items: {
		item_id: string,
		amounts: number,

	}[],
	/** 状态，0：未阅读，1：已读，2：已领取，9：已删除 */
	step: number,
}
declare type CommonSelectionImageType = "custom" | "item" | "item_like" | "ability" | "ability_like";

declare interface CommonSelectionData {
	/** 名字 */
	name?: string;
	/** 描述 */
	description?: string;
	description_options?: {
		ReplaceValuesOption?: ReplaceValuesOption;
		level?: number;
	};
	/** 数值 */
	vars?: Record<string, number | string>;
	/** 数值 */
	AbilityValues?: Record<string, AbilityValueData>;
	/** 不填图标 */
	src?: string;
	/** 类型 */
	ImageType?: CommonSelectionImageType;
	/** 技能升级ID */
	AbilityUpgradeID?: string;
	/** 选项列表 */
	selections: CommonSelectionOption[];

	// 是否可以点击选项
	CardDisable?: 0 | 1;
}

declare interface CommonSelectionOption {
	index?: number;
	/** 名字 */
	name: string;
	/** 描述 */
	description?: string;
	description_options?: {
		ReplaceValuesOption?: ReplaceValuesOption;
		level?: number;
	};
	/** 数值 */
	vars?: Record<string, string | number>;
	/** 属性 */
	attributes?: Record<string, AttributeValue>;
	/** 数值 */
	AbilityValues?: Record<string, AbilityValueData>;
	/** 不填图标 */
	src?: string;
	/** 物品名字，描述会显示物品属性 */
	itemname?: string;
	/** 类型 */
	ImageType?: CommonSelectionImageType;
	/** 是否为按钮 */
	isButton?: 0 | 1;
	/** 按钮颜色 */
	buttonColor?: "Green" | "Blue" | "Red" | "Purple" | "Gold" | "Gray";
	/** 技能升级ID */
	AbilityUpgradeID?: string[];
	/** 技能升级 */
	AbilityUpgrade?: {
		type: "ABILITY_UPGRADES_TYPE_VALUE" | "ABILITY_UPGRADES_TYPE_UNIQUE";
		ability_name: string;
		operator?: "ABILITY_UPGRADES_OP_ADD" | "ABILITY_UPGRADES_OP_MUL";
		operator_value?: number;
		value_name?: string;
		value_key_name?: string;
		unique?: string;
		AbilityValues?: Record<string, number | Record<string, number>>;
		max_count?: number;
	};
	/** 回调 */
	callback?: (index: number, option: CommonSelectionOption) => void | false;

	/** 重roll */
	isReroll?: 0 | 1;
}

interface FishShopItem {
	name: string;
	cost: number[];
	limit?: number;
	src: string;
	count: number;
	cooldown: number;
	cooldownRemaining: number;
	sort: number;
}
interface BrotatoShopItem {
	name: string;
	cost: number[];
	limit?: number;
	src: string;
	count: number;
	sort: number;
	costType: string;
	shopType: string;
	rarity: number;
	soldOut: boolean;
	hide: boolean;
	cooldown?: number;
	readyTime?: number;
	vars: Record<string, number>;
	overrideItem?: string;
}

interface RewardItem {
	item_id: string;
	equipment_ids: string[];
	amounts: number;
	extra_tag?: string;
}

interface ServiceTaskInfo {
	task_id: number,
	extra_id: number,
	start_time: number,
	end_time: number,
	progress: number,
	target: number,
	receive_progress: number;
}
interface RankInfo {
	member: string,
	rank: number,
	team_extra_data?: {
		extra_data: {
			mainline_progress?: string;
			challenge_mode?: string;
			ornament_score: string;
		};
	};
	player_extra_data?: {
		[uid: string]: {
			extra_data: {
				avatar_frame: string,
				mainline_progress: string;
			};
		};
	};
}