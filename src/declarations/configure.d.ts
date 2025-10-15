declare interface CustomUIConfig {
	info_shop_product: Record<string, StoreItemData>;
	info_item_prop: Record<string, BackpackItemProps>;
	soul_stone: Record<string, SoulStoneProps>;
	account_level: Record<string, AccountLevelProps>;
	equip: Record<string, EquipmentProps>;
	equip_cost_model: Record<string, EquipCostModelProps>;
	equip_suit: {
		[suit_id: string]: {
			id: number,
			quality: number,
			suit_part: string;
		} & Record<string, number | string>;
	};
	entry_attribute_quality_value: Record<string, EntryAttributeQualityValue>;
	account_vip: Record<string, AccountVipProps>;
	account_free_reward: Record<string, AccountFreeRewardProps>;
	gem: {
		[cls: number]: {
			[attribute_num: number]: {
				class: number,
				attribute_num: number,
				break: string,
				inlay_consume: string;
				inlay_consume_add1: string;
				inlay_consume_add2: string;
				inlay_regret: string;
				build: string;
				consume: string;
				consume_add: string;
			};
		};
	};
	info_service_hero: Record<string, InfoServiceHero>;
	hero_lv_exp: Record<number, {
		level: number,
		level_relife: number,
		condition: number,
		exp: number,
		tupo: number,
		tupo_cost: Record<string, number>;
		tupo_attribute: number;
		score: number;
	}>;
	hero_skill: {
		[ability: string]: {
			[level: number]: {
				/** 英雄等级限制 */
				condition_hero_lv: number,
				/** 英雄星级限制 */
				condition_hero_star: number,
				/** 评分 */
				score: number;
			};
		};
	};
	hero_lv_grow: Record<string, {
		[lv: number]: {
			attribute: Record<string, number>,
		};
	}>;
	info_hero_bundle: {
		[id: string]: {
			/** 获得几个英雄才算羁绊解锁了 */
			num: number,
			heroid: Record<number, string>,
		};
	};
	bundle_effect: {
		[id: string]: {
			[type: string]: {
				[order: string]: {
					param_1: number,
					param_2: number,
					/** 特权id */
					buff_id?: Record<number, string>,
					/** 属性 */
					attribute: Record<string, number>,
					score: number,
				};
			};
		};
	};
	drawcards: Record<string, DrawCardConfig>;
	/** 抽卡奖励详情，和drawcards的dropid对应 */
	drawcards_pond: {
		[pond_id: string]: {
			pond_id: number;
			drop_quality: string;
			drop_id: number;
			drop_num_min: number;
			drop_num_max: number;
			drop_weight: number;
			lucky: number;
			double_lucky: number;
		}[];
	};
	service_privilege: Record<string, {
		quality: string,
		hide: number,
		attribute: Record<string, number>,
		/** 特权效果 */
		privilege_effect?: Record<number, string>,
		score: number,
	}>;
	/** BP赛季信息 */
	bp_season: {
		[season: number]: {
			sid: number,
			start_time: number,
			end_time: number,
			max_level: number,
			plus_item_id: number,
		};
	};
	/** BP每级奖励 */
	bp_rewards: {
		[season: number]: {
			[level: number]: BPRewardConfig;
		};
	};
	/** BP每级经验 */
	bp_level_exp: {
		[season: number]: {
			[level: number]: { exp: number; };
		};
	};
	/** 各种系统的任务都在这里 */
	task: Record<string, TaskConfig>;
	courier: Record<string, CourierConfig>;
	/** 英雄星际 */
	hero_star_effect: {
		[hero_id: string]: {
			[star: string]: {
				buff_id: string,
				name: string,
				attribute: Record<string, number>;
				score: number,
			};
		};
	};
	/** 英雄星级消耗整卡数量 */
	hero_star: {
		[star: string]: {
			star_up: number,
		};
	};
	/** 信使星级 */
	courier_effect: {
		[courier_id: string]: {
			[star: string]: {
				buff_id: string,
				name: string,
				attribute: Record<string, number>,
				score: number,
			};
		};
	};
	// 属性表
	attribute_list_client: {
		[id: string]: {
			id: number,
			attribute_name: string,
			name: string,
			order: number;
			fight: number;
			decimal: number,
			type?: string;
			equip_type: string;
		};
	};
	// // 槽位强化数据
	// equip_enhancement: {
	// 	[level: string]: {
	// 		target_level: number,
	// 		consume: string,
	// 		base_add: number,
	// 		advanced_add: number;
	// 		exclusive_add: number;
	// 		change_base: number;
	// 		change_add: number;
	// 		change_max: number;
	// 	};
	// };
	// 装备强化数据
	equip_strengthen: {
		[level: string]: {
			level: number;
			consume: string;
		};
	};
	// 装备强化数据
	equip_strengthen_effect: {
		[attribute: string]: {
			attribute: string;
			value_add: number;
		};
	};
	// 装备萃取
	equip_extraction: {
		[rarity: string]: {
			class: number;
			rarity: number;
			extraction_quantity: string;
			extraction_extra: string;
			extraction_consume: string;
			extraction_consume_add1: string;
		};

	};
	// 装备后端配置
	equip_setting: {
		[setting: string]: {
			setting: string,
			value: number,
			name: string;
		};
	};
	// 装备后端配置
	gene_setting: {
		[setting: string]: {
			setting: string,
			value: number,
			name: string;
		};
	};
	// 词条等级加成
	equip_level: {
		[level: string]: {
			attribute_level: number;
			increase_rate: number;
		};
	};
	// 基因合成
	gene_fusion: {
		[rarity: string]: FusionData;

	};
	// 基因词条等级加成
	gene_level: {
		[level: string]: {
			attribute_level: number;
			increase_rate: number;
		};
	};
	activity_login: {
		[activity_id: number]: {
			[day: number]: {
				rewards: string;
			};
		};
	};
	activity_data: {
		[activity_id: string]: {
			activity_id: number;
			type: number;
			name: string;
			tokens: string;
			config: string;
			template: string;
			in_tool: number;
			sort: number;
			show: number;
			start_time: number;
			end_time: number;
		};
	};
	/** 圣衣基础属性 */
	sirius_attri_level: {
		[sirius_id: string]: {
			[sirius_level: string]: {
				sirius_name: string;
				level_attribute: Record<string, number>;
			};
		};
	};
	/** 槽位属性 */
	sirius_attri_slot: {
		[sirius_id: string]: {
			[sirius_slot: string]: {
				sirius_name: string;
				attribute: Record<string, number>;
			};
		};
	};
	/** 圣衣等级经验 */
	sirius_upgrade: {
		[sirius_level: string]: {
			sirius_level: number;
			total_slot_level_min: number;
			total_slot_level_max: number;
		};
	};
	info_item_privilege: any;
	copymap_rewards_choice: {
		[id: string]: {
			choice: number;
			cost: Record<string, number>;
		};
	};
	mainline_progress: {
		[progress: string]: {
			copymap_id: number;
			/** 星宫部位等级上限 */
			slot_level_max: string;
		};
	};
	dayreward: {
		[num: string]: {
			task_num: number,
			rewards: Record<string, number>,
		};
	};
	ability_proficiency: {
		[level: string]: {
			level: number,
			exp: number,
		};
	};
	info_recommend: {
		[id: string]: {
			id: string;
			name: string;
			type: string;
			active: string;
			param_1: string;
			param_2: string;
			src: string;
		};
	};
	info_item_cosmetic: {
		[id: string]: {
			id: string;
			name: string;
			type: string;
			rarity: string;
			default: number;
			show_location: number;
			attribute: Record<string, number>;
			privilege_id: string;
			particle: string;
			model: string;
			hero_id?: number,
			preview_map: string;
			map: string
		};
	};
	activity_moonstone: {
		[activity_id: string]: {
			[num: string]: {
				activity_id: number,
				reward_id: number,
				num: number,
				rewards: Record<string, number>,
			};
		};
	};
	goddess_level: Record<number, {
		level: number,
		exp: number,
	}>;
	goddess_talent: Record<string, {
		talent_point: string;
		locklevel: number;
		max_level: number,
		requires: string,
	}>;
	goddess_talent_effect: Record<string, {
		quality: number,
		attribute: string,
		max_level: number,
		value: string,
		is_server: number,
		privilege_effect: string,
		score: number,
	}>;
	info_item_collection: {
		[id: string]: {
			id: string;
			name: string;
			type: string;
			rarity: string;
			fish_name: string;
			attribute: Record<string, number>;
			privilege_id: string;
			difficult?: number;
		};
	};
	info_collection_exp: {
		[type: string]: {
			[level: string]: {
				exp: number;
				level: number;
			};
		};
	};
	info_collection_reward: {
		[type: string]: {
			[total_level: string]: {
				exp: number;
				total_level: number;
				rewards: Record<string, number>;
			};
		};
	};
	version: {
		[version: string]: { major: number; };
	};
	copymap_rewards: {
		[copymap_id: string]: {
			copymap_id: number;
			first_rewards: string;
			equipment_card_quality_base_weights: string;
		};
	};
	activity_starsea: {
		[activity_id: string]: {
			[reward_id: string]: {
				activity_id: number;
				reward_id: number;
				rarity: number;
				show: number;
				product_id: number;
				rewards: Record<string, number>;
			};
		};
	};
	activity_championtrail_setting: {
		[activity_id: string]: {
			activity_id: number,
			daily_reward: string;
		};
	},
	activity_championtrail_reward_point: {
		[activity_id: string]: {
			[rarity: string]: {
				point: number;
				rewards: string;
			};
		};
	},
	activity_championtrail_reward_final: {
		[activity_id: string]: {
			[point: string]: {
				rewards: string;
			};
		};
	};
	ingame_equipment_levelup_exp: {
		[level: string]: {
			level: number,
			exp: number,
		};
	};
	info_item_ingame_equipment_exp: {
		[item_id: string]: {
			item_id: number,
			ingame_equipment_id: string,
		};
	};
	ingame_equipment_total_level_award: {
		[rarity: string]: {
			[slot: string]: {
				slot: number,
				rarity: number,
				total_level: number,
			};
		};
	};
	artifact_upgrade: Record<number, {
		upgrade_base: string;
	}>;
	artifact_setting: ArtifactSettings;
	artifact_devour: Record<number, {
		devour_base: string;
	}>;
	artifact_awake: {
		[i_class: number]: {
			[rarity: number]: {
				awake_base: string,
				awake_add: string,
			};
		};
	};
	artifact_forge_pool_entry: Record<string, {
		effect: string,
		value_1: number,
		value_2: number,
	}>;
	activity_championtrail_rank_reward_hero: {
		[activity_id: string]: Record<string, Record<string, {
			activity_id: number;
			hero_rank: number,
			hero_id: number;
			rewards: string,//道具id;num
		}>>;
	};
	activity_championtrail_rank_reward_all: {
		[activity_id: string]: Record<string, {
			rewards: string,//道具id;num
		}>;
	};
	activity_collect_rewards: {
		[activity_id: string]: {
			[index: string]: {
				activity_id: number,
				reward_id: number,
				num: number,
				rewards: string;
			};
		};
	};
}
declare interface StoreItemData {
	pay_type: number;
	origin_price: number;
	real_price: number;
	discount: number;
	tag: string;
	show_type: number;
	buff_condition: number;
	vip: number;
	title: number;
	rarity: number;
	img: string;
	particle: string;
	orderby: number;
	start_time: number;
	end_time: number;
	hide: number;
	limit_type: number;
	limit_count: number;
	overseas_originprice: number;
	overseas_realprice: number;
	russia_originprice: number;
	russia_realprice: number;
	first_pay: number;
	id: number;
	items: Record<string, number>;
}

declare interface FusionData {
	class: number;
	rarity: number;
	fusion_consume: string;
	fusion_consume_add1: string;
	fusion_consume_add2: string;
	fusion_regret: string;
}
declare interface StoreItemProps {
	itemId: number;
	/** 物品名称 */
	itemName: string;
	/** 物品名称 */
	itemCount: number;
	/** 中间标签 */
	tagName?: "free" | "used" | "vip";
	/** 稀有度，会加边框 */
	rarity?: 0 | 1 | 2 | 3;
	/** 倒计时 */
	end_time?: number;
	// rarity?: "n" | "r" | "sr" | "ssr";
	/** 标签 */
	labels?: {
		/** 类型，打折，活动，皮肤碎片 */
		type: "discount" | "activity" | "limit" | "skin_debris";
		/** 显示的文字，传翻译后的文本 */
		label: string;
		/** 倒计时 */
		countdown?: number;
	}[];
	/** 商品图 */
	itemImage: string;
	/** 按钮属性 */
	button?: {
		color: "Green" | "Blue" | "Red" | "Purple" | "Gold" | "Gray";
		text: string;
		icon?: any;
	};
	owned: boolean;
	enabled?: boolean;
	orgin_price?: string;
	/** 购买物品回调 */
	onBuyItem?: () => void;
}

declare interface BackpackItemProps {
	id: number;
	name: string;
	quality: number;
	tab: number;
	use_numlimit: number;
	is_sell: number;
	sell_price: number;
	price_num: number;
	expire_type: number;
	expire_time: number;
	use_func: string;
	use_func_param_1: number;
	use_func_param_2: number;
}
declare interface AccountLevelProps {
	id: number;
	exp: number;
	unlock: string;
	attribute: Record<string, number>;
	rewards: Record<string, number>;
	score: number;
}
declare interface EquipmentProps {
	"id": number,
	"class": number,
	"rarity": number,
	"part": number,
	"name": string,
	"base_attribute": number,
	"base_level": "1_30|2_30",
	"base_id": number,
	"advanced_attribute": number,
	"advanced_level": "1_30|2_30",
	"advanced_id": number,
	"exclusive_attribute": "0_30|1_30",
	"exclusive_level": "1_30|2_30",
	"exclusive_id": number,
	"break": string;
}
declare interface GemProps {
	id: number,
	name: string,
	level: number,
	color: number,
	attribute_id: string,
	attribute_value: number,
	need_item: number,
	item_num: number,
	success_rate: number,
}

declare interface SoulStoneProps {
	id: number;
	part: number;
	level: number;
	quality: number;
	name: string;
	desc: string;
	score: number;
	getway: string;
	base_num: string;
}

declare interface EquipCostModelProps {
	[lv: string]: {
		cost: string;
	};
}

declare interface EntryAttributeQualityValue {
	[quality: string]: {
		init: number;
		max: number;
		add_value: number;
	};
}
declare interface AccountVipProps {
	id: number;
	exp: number;
	icon: string;
	attribute: Record<string, number>;
	rewards: Record<string, number>;
	vip_shop_id: number;
	account_exp_add: number;
	privilege: string;
	score: number;
}
declare interface AccountFreeRewardProps {
	id: number;
	rewards: Record<string, number>;
	vip_points_show: number;
}

interface InfoServiceHero {
	id: number,
	name: string,
	unlock: number,
	type: number,
	element_type: number,
	recruit_item: number,
	recruit_item_num: number,
	star_2: number,
	star_3: number,
	star_4: number,
	star_5: number,
	lv_grow: number,
	star_coeff: Record<number, number>,
	quality_coeff: Record<number, number>,
}

interface DrawCardConfig {
	id: number,
	open_time: number,
	period: number,
	end_time: number,
	/** 抽卡券ID */
	item: number,
	/** ssr概率 */
	drop_ssr: number,
	drop_sr: number,
	drop_r: number,
	drop_n: number,
	/** 幸运值上限 */
	lucky_up: number,
	/** 自选保底概率 */
	lucky_choose: number,
	/** 英雄还是信使 */
	type: string;
	/** 是否显示在抽卡界面（hud_draw） */
	show: number;
	/** 是否显示许愿单按钮 */
	choose: number;
	/** 卡池UI排序 */
	order: number;
	/** 1抽消耗资源 */
	one_num: number;
	/** 10抽消耗资源 */
	ten_num: number;
	/** 多个卡池共用一个幸运值 */
	inheritance_lucky: number;
	/** 兑换商城 */
	store_tag: string;
}

interface BPRewardConfig {
	level: number,
	item_id: number,
	amounts: number,
	plus: number,
	/** 稀有度 */
	values: number,
}

interface TaskConfig {
	task_id: number,
	/** 任务类型-1日常2主线3成就4战令5活动 */
	type: number,
	/** 任务要完成的事情类型 */
	event_id: number,
	/** 任务完成的目标次数 */
	target: number,
	param_1: number,
	param_2: number,
	param_3: number,
	/** 任务奖励 */
	rewards: Record<string, number>,
	pre_task: number,
	/** 关联活动ID，在战令里=赛季 */
	activity_id: number;
	/** 任务的翻译文本默认由event_id确定，若=1则由task_id确定 */
	task_description: number;
	achievement_group: number;
	achievement_hidden: number;
	achievement_icon: string;
	/** 未启用的成就暂时在前端隐藏 */
	achievement_disable: number;
	achievement_sort: number;
	buff_condition: number;
}

interface CourierConfig {
	id: number,
	unlock: number,
	quality: number,
	attribute_id: string,
	in_tool: number,
	attribute_value: Record<number, number>,
	previewid: string,
	skin: string,
	draw_scale: number,
	cost: Record<number, number>,
}

type ArtifactSettings = {
	"artifact_devour": {
		"value": "1",
	},
	"artifact_upgrade_max": {
		"value": "17",
	},
	"artifact_roll": {
		"value": "1400|1400|1400|1200|900|600|500|300|200|120",
	},
	"artifact_ticket_roll": {
		"setting": "artifact_ticket_roll",
		"value": "70|70|60|60|60|50|50|40|30|15",
	};
};