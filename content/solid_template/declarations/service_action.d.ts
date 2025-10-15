declare interface ServiceActionConfig {
	"/v1/log/report": {
		params: {
			/** 类型 */
			level: string,
			/** 报错内容 */
			message: string,
			/** 玩家id */
			uid?: string,
		};
		result: {
			code: number,
			data: {};
		};
	};
	/** 登录 */
	"/v1/player/login": {
		params: {
			/** 玩家ID */
			uid?: number,
		};
		result: {
			code: number,
			message?: string,
			data: {
				/** 玩家代币 */
				player_tokens: {
					/** 代币ID */
					token_id: number;
					/** 代币数量 */
					amounts: number;
				}[];
				/** 背包道具 */
				player_props: {
					id: number;
					prop_id: number;
					expire_time: number;
					amounts: number;
				}[];
				/** VIP */
				player_vip: PlayerVip;
				player_account_level: PlayerAccountLevel;
				player_account_level_rewards: {
					// rids:
				};
				player_daily_rewards_receive_data: {
					consecutive_free_rewards_receive_count: number;
					can_receive_free: boolean;
					can_receive_vip: boolean;
				};
				player_heros: {
					hero_id: number;
					skills: Record<number, number>;
					level: number;
					extra_level_exp: number;
					total_level_exp: number;
					star: number;
					extra_star_exp: number;
					total_star_exp: number;
				}[];
				player_sirius: SiriusData[];
				is_register: boolean;
			};
		};
	};
	/** 验证码 */
	"/v1/white_list/add": {
		params: {
			key: string,
		};
		result: {
			code: number,
			data: {};
		};
	};
	"/v1/key/save": {
		params: {
			/** 玩家ID */
			uid?: number,
			/** 类型 */
			type: string,
			/** 键 */
			key: string,
			/** 值 */
			value: string,
		};
		result: {
			code: number,
			data: {
				player_key_values: {
					type: string;
					key: string;
					value: string;
				}[];
			};
		};
	};
	"/v1/key/fetch": {
		params: {
			/** 玩家ID */
			uid?: number,
			/** 类型 */
			type: string,
		};
		result: {
			code: number,
			data: {
				player_key_values: {
					type: string;
					key: string;
					value: string;
				}[];
			};
		};
	};
	/** 获取商品限购信息 */
	"/v1/shop/limit": {
		params: {
		};
		result: {
			code: number,
			data: {
				player_shop_product_limit: PlayerShopProductLimit[],
			};
		};
	};
	// 创建订单，真金白银付费
	"/v1/shop/create_order": {
		params: {
			/** 玩家ID */
			uid?: number,
			/** 订单页面上的标题 */
			title: string,
			/** 订单页面上的描述 */
			body: string,
			/** 商品ID */
			pid: number,
			/** 商品数量 */
			amounts: number,
			/** 支付等级 */
			pay_type?: PaymentType,
			/** passion用的 */
			pmid?: string,
			/** 地区 */
			country?: string,
		};
		result: {
			code: number,
			data: {
				payment_order: {
					/** 订单号 */
					order_id: string,
					/** 链接 */
					order_link: string,
				};
			};
		};
	};
	/** 查询订单 */
	"/v1/shop/query_order": {
		params: {
			/** 玩家ID */
			uid?: number,
			/** 订单号 */
			order_id: string,
		};
		result: {
			code: number,
			data: {};
			reason: string,
			message: string,
		};
	};
	/** 货币购买 */
	"/v1/shop/buy": {
		params: {
			/** 玩家ID */
			uid?: number,
			/** 商品ID */
			pid: number,
			/** 商品数量 */
			amounts: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 补单 */
	"/v1/shop/supplement_orders": {
		params: {
		},
		result: {
			code: number,
			data: {
			},
		},
	};
	/** 每日免费奖励领取 */
	"/v1/daily_rewards/receive_reward": {
		params: {
			receive_type: number,//0-都领取 1-免费奖励 2-vip免费奖励
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 领取账号等级奖励 */
	"/v1/account_level/receive_reward": {
		params: {
			level_ids: number[];
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 召唤英雄*/
	"/v1/hero/summon": {
		params: {
			hero_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 英雄升星*/
	"/v1/hero/star_up": {
		params: {
			hero_id: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 英雄技能升级*/
	"/v1/hero/skill_up": {
		params: {
			hero_id: number,
			skill_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 英雄等级突破*/
	"/v1/hero/level_tupo": {
		params: {
			hero_id: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/hero/exchange_hero_piece": {
		params: {
			hero_id: number,
			amounts: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};

	/** 英雄升级*/
	"/v1/hero/level_exp_up": {
		params: {
			hero_id: number,
			exp_value: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 英雄升级品质*/
	"/v1/hero/quality_up": {
		params: {
			hero_id: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 修改英雄天赋*/
	"/v1/hero/change_talent": {
		params: {
			hero_id: number,
			talents: Record<string, number>;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 重置英雄天赋*/
	"/v1/hero/reset_talent": {
		params: {
			hero_id: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 卡池抽奖 */
	"/v1/card/draw": {
		params: {
			/** 几连抽 */
			draw_type: number;
			pool_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {
				add_items: Record<string, {
					item_id: number,
					amounts: number,
					rarity: string,
				}[]>;
			};
		};
	};
	//装备穿戴/卸下
	"/v1/equip/equip": {
		params: {
			part: number;
			hero_id: number,
			suit_id: number;
			equipment_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//英雄换装
	"/v1/hero/change_suit": {
		params: {
			hero_id: number,
			suit_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//获取所有装备
	"/v1/equip/fetch_all": {
		params: {
			only_equipped?: boolean;
		};
		result: {
			code: number,
			message?: string,
			data: {
				player_equipments: Equipment[];
			};
		};
	};
	// 装备栏强化
	"/v1/equip/enhance": {
		params: {
			part: number;
		},
		result: {
			code: number,
			message?: string,
			data: any;
		};
	};
	//装备分解
	"/v1/equip/destory_common_equipment": {
		params: {
			equipment_id: number[];
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//圣物分解
	"/v1/equip/destory_gene_equipment": {
		params: {
			equipment_id: number[];
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 装备萃取
	"/v1/equip/extract": {
		params: {
			equipment_id: number,
			lock_base?: number[];
			lock_advanced?: number[];
			extra_lock_chance: number;
		},
		result: {
			code: number,
			message?: string,
			data: {
				player_gems: Gem[];
				player_extract_equipment_result: {
					base_index: number[],
					advanced_index: number[];
				};
			};
		};
	};
	// 碎片嵌入
	"/v1/gem/inlay": {
		params: {
			equipment_id: number,
			gem_id: number,
			lock_base?: number[];
			lock_advanced?: number[];
			extra_lock_chance: number;
		},
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 碎片嵌入确认
	"/v1/gem/inlay_confirm": {
		params: {
			equipment_id: number,
			result: boolean;
		},
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 碎片锻造
	"/v1/gem/build": {
		params: {
			gem_id: number,
		},
		result: {
			code: number,
			message?: string,
			data: {
				player_build_gem_result: {
					base_index: number[],
					advanced_index: number[];
				};
			};
		};
	};
	// 碎片分解
	"/v1/gem/destory": {
		params: {
			gem_id: number[],
		},
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 碎片锁定
	"/v1/gem/lock": {
		params: {
			gem_id: number[],
			lock: boolean;
		},
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 装备合成
	"/v1/equip/fusion": {
		params: {
			equipment_id1: number,
			equipment_id2: number,
			lock_base1?: number[];
			lock_base2?: number[];
			extra_lock_chance: number,
		},
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 装备合成确认
	"/v1/equip/fusion_confirm": {
		params: {
			inherit_equipment_id: number;
			other_equipment_id: number;
			result: boolean;
			regret_equipment_id?: number;
		},
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 装备强化
	"/v1/equip/strengthen": {
		params: {
			equipment_id: number,
		},
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};

	// // 更改装备套装
	// "/v1/equip/change_suit": {
	// 	params: {
	// 		suit_type: number;
	// 		suit: number;
	// 	},
	// 	result: {
	// 		code: number,
	// 		message?: string,
	// 		data: {};
	// 	};
	// };
	// 装备锁定
	"/v1/equip/lock": {
		params: {
			equipment_id: number[];
			lock: boolean;
		},
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//出售道具
	"/v1/prop/sell": {
		params: {
			id: number;
			amounts: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//使用道具
	"/v1/prop/use": {
		params: {
			id: number;
			amounts: number;
			pick_item_id?: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//添加物品
	"/v1/gm/add_item": {
		params: {
			add_items: {
				item_id: number,
				amounts: number;
			}[];
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 邮件列表
	"/v1/mails/fetch": {
		params: {
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 邮件操作
	"/v1/mails/operate": {
		params: {
			mail_id?: number,
			operate_type: number,
			step: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	// 波次结算
	"/v1/settle/mainline_wave": {
		params: {
			match_id: number;
			wave: number;
		};
		result: {
			code: number,
			message?: string,
			data: {
				add_items: {
					common: RewardItem[];
				};
				player_equipment_card: {
					free_turn_over_chance: number;
					turn_over_times: number;
					levelup_quality: Record<string, number>;
					origin_quality: Record<string, number>;
				};
			};
		};
	};
	// 结算
	"/v1/settle/mainline_match": {
		params: {
			match_id: number;
			max_wave: number;
			high_quality_lucky_value: number;
			extra_drop_lucky_value: number;
			power: string;
			ability_proficiency?: Record<string, number>;
			is_mvp: boolean;
			/** 额外一次免费翻牌 */
			extra_free_turn_over_chance: number;
		};
		result: {
			code: number,
			message?: string,
			data: {
				add_items: {
					common: RewardItem[];
				};
				player_equipment_card: {
					free_turn_over_chance: number;
					turn_over_times: number;
					levelup_quality: Record<string, number>;
					origin_quality: Record<string, number>;
				};
			};
		};
	};
	"/v1/battle_pass/fetch": {
		params: {
			season: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/battle_pass/receive_rewards": {
		params: {
			season: number,
			level?: number,
			plus?: number,
			receive_all?: boolean,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/task/fetch": {
		params: {
			task_type: number,
			activity_id?: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/task/receive_task_rewards": {
		params: {
			task_id: number,
			extra_id?: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/task/batch_receive_task_rewards": {
		params: {
			task_type: number,
			activity_id?: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/task/receive_daily_task_box": {
		params: {
			day: number,
			task_num: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/task/report": {
		params: {
			events: {
				param1: number,
				param2: number | string,
				param3: number,
				amounts: number,
			}[],
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/courier/equip": {
		params: {
			courier_id: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/courier/star_up": {
		params: {
			courier_id: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/player/heart_beat": {
		params: {
			match_id: number,
			extra_exp_percent: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/settle/match_begin": {
		params: {
			match_id: number,
			/** 难度 */
			map_id: number,
			players: { uid: number, hero_id: number; }[];
			difficulty_level: number,
			difficulty_tags: string,
			challenge_activity_id: number;
			version: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/settle/extra_map": {
		params: {
			match_id: number,
			level: number,
			extra_gold_percent: number,
			extra_exp_percent: number,
			extra_400505_percent: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/game_box/levelup": {
		params: {
			id: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/game_box/open": {
		params: {
			id: number,
			high_quality_lucky_value: number,
			extra_drop_lucky_value: number,
		};
		result: {
			code: number,
			message?: string,
			data: {
				player_equipments: Equipment[];
			};
		};
	};
	"/v1/activity/data": {
		params: {
			activity_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/activity/receive_rewards": {
		params: {
			activity_id: number;
			reward_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/new/read": {
		params: {
			type: string;
			ids: number[];
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/sirius/levelup": {
		params: {
			sirius_id: number,
			extra_sirius_gain: number,
		};
		result: {
			code: number,
			message?: string,
			data: {
				player_sirius: SiriusData[];
			};
		};
	};
	"/v1/sirius/levelup_check": {
		params: {
			sirius_id: number;
			suit_id: number;
			pick: boolean;
			pick_id: number;
			replace_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {
				player_sirius: SiriusData[];
			};
		};
	};
	"/v1/settle/sirius": {
		params: {
			match_id: number;
			boss_id: number;
			remaining_boss_hp_percent: number;
			extra_drop_max_num: number;
		};
		result: {
			code: number,
			message?: string,
			data: {
				player_sirius: SiriusData[];
			};
		};
	};
	"/v1/card/choose_lucky": {
		params: {
			pool_id: number;
			lucky_choice: number;
		};
		result: {
			code: number,
			message?: string,
			data: {
			};
		};
	};
	"/v1/settle/turn_over_equipment_card": {
		params: {
			card_index: number;
		};
		result: {
			code: number,
			message?: string,
			data: {
				player_equipment_card: {
					turn_over_times: number,
					cards: {
						card_index: number,
						equipment_item_id: number,
						levelup: boolean,
					}[];
				};
			};
		};
	};
	"/v1/settle/show_equipment_card": {
		params: {};
		result: {
			code: number,
			message?: string,
			data: {
				player_equipment_card: {
					turn_over_times: number,
					cards: {
						card_index: number,
						equipment_item_id: number,
						levelup: boolean,
					}[];
				};
			};
		};
	};
	"/v1/settle/add_turn_over_equipment_card_chance": {
		params: {};
		result: {
			code: number,
			message?: string,
			data: {
				player_equipment_card: {
					turn_over_times: number,
					cards: {
						card_index: number,
						equipment_item_id: number,
						levelup: boolean,
					}[];
				};
			};
		};
	};
	"/v1/statistics/report": {
		params: {
			match_id: number,
			boss_kill_time?: Record<string, number>,
			round_data?: Record<number, {
				score: number,
				gold: number,
				crystal: number,
				strength: number,
				agility: number,
				intellect: number,
				attack_damage: number,
				spell_power: number,
				health: number,
				armor: number,
				crit_damage: number,
				crit_chance: number,
				physical_damage: number,
				magical_damage: number,
			}>;
			skills: string[];
			swallow_equips: string[];
			wear_equips: string[];
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/cdkey/receive": {
		params: {
			key: string,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/ornament/fetch": {
		params: {
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/ornament/equip": {
		params: {
			slot_id: number,
			hero_id?: number,
			ornament_id: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	},
	"/v1/settle/godstrail": {
		params: {
			match_id: number,
			god_id: number;
			extra_drop_num: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/leaderboard/fetch": {
		params: {
			leaderboard_type: string;
			lang: string;
			// extra_id: number;
			extra_ids?: number[];
			start: number;
			end: number;
			player_num: number;
		};
		result: {
			code: number,
			message?: string,
			data: {
				player_leaderboard_data: {
					leaderboard_data: {
						member: string,
						rank: number,
						team_extra_data?: {
							extra_data: {
								mainline_progress: string;
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
					}[];
					self_data: {
						member: string,
						rank: number,
						team_extra_data?: {
							extra_data: {
								mainline_progress: string;
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
					};
				};
			};
		};
	};
	"/v1/player/set_lang": {
		params: {
			lang: string;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/goddess/level_up": {
		params: {
			props: { id: number, amounts: number; }[];
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/goddess/massage": {
		params: {
			massage_level: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/goddess/change_talent": {
		params: {
			talents: Record<string, number>,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/goddess/reset_talent": {
		params: {
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/collection/receive_reward": {
		params: {
			collection_type: string,
			level: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/collection/get_fish": {
		params: {
			fish_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/collection/get_tartarus": {
		params: {
			tartarus_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/collection/levelup": {
		params: {
			type: string;
			collection_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/activity/batch_receive_rewards": {
		params: {
			activity_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/equip/destory_common_equipment_compensate": {
		params: {
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/equip/upgrade_rarity": {
		params: {
			equipment_id: number;
			consume_equipment_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/equip/upgrade_rarity_confirm": {
		params: {
			equipment_id: number;
			result: boolean;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/ingame/equipment_levelup": {
		params: {
			ingame_equipment_id?: string;
			now_level?: number;
			use_universal_shards?: boolean;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/ingame/equipment_slot": {
		params: {
			ingame_equipment_id?: string;
			slot: number;
			rarity: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 副本开始放入门票 */
	"/v1/settle/artifact_map_begin": {
		params: {
			match_id: number;
			ticket_ids?: number[];
			part: Record<string, number>;
			player_privileges?: {
				[player: string]: Record<string, number>;
			};
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 每层结算 */
	"/v1/settle/artifact_map": {
		params: {
			match_id: number;
			level: number;
			// uid:number;
			materials_extra_drop_lucky_value: number,
			artifact_ticket_extra_drop_lucky_value: number,
			artifact_ticket_high_quality_lucky_value: number,
			artifact_ticket_red_attribute_extra_lucky_value: number,
			artifact_awake_lucky_value: number,
			artifact_ticket_extra_durability: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	/** 最后结算 */
	"/v1/settle/receive_artifact_reward": {
		params: {
			// uid:number;
		};
		result: {
			code: number,
			message?: string,
			data: {
				player_artifacts?: {
					id: number,
				}[];
			};
		};
	};
	//穿戴/卸下
	"/v1/equip/artifact": {
		params: {
			part: number;
			hero_id: number,
			suit_id: number;
			artifact_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//分解
	"/v1/artifact/destory_artifact": {
		params: {
			artifact_id: number[];
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//门票分解
	"/v1/artifact/destory_ticket": {
		params: {
			artifact_ticket_id: number[];
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//词条升阶
	"/v1/artifact/class_up": {
		params: {
			artifact_id: number,
			base_attribute_index: number[],
			advanced_attribute_index: number[],
			exclusive_attribute_index: number[],
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//吞噬词条
	"/v1/artifact/swallow": {
		params: {
			artifact_id: number,
			swallow_artifact_id: number,
			replace_base_attribute_index: number[],
			swallow_base_attribute_index: number[],
			replace_advanced_attribute_index: number[],
			swallow_advanced_attribute_index: number[],
			extra_swallow_count: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//上锁/解锁
	"/v1/artifact/lock": {
		params: {
			artifact_id: number[],
			lock: boolean,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//门票上锁/解锁
	"/v1/artifact/lock_ticket": {
		params: {
			artifact_ticket_id: number[],
			lock: boolean,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//觉醒
	"/v1/artifact/awake": {
		params: {
			artifact_id: number,
			extra_awake_choice: number,
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	//觉醒确认
	"/v1/artifact/awake_check": {
		params: {
			artifact_id: number,
			choice: number,
			pick_index: number[],
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/sirius/change_suit": {
		params: {
			sirius_id: number;
			suit_id: number;
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/server/info": {
		params: {
		};
		result: {
			code: number,
			message?: string,
			data: {};
		};
	};
	"/v1/settle/mainline_match/resettle": {
		params: {
		};
		result: {
			code: number,
			message?: string,
			data: {
				add_items: {
					common: RewardItem[];
				};
				player_equipment_card: {
					free_turn_over_chance: number;
					turn_over_times: number;
					levelup_quality: Record<string, number>;
					origin_quality: Record<string, number>;
				};
			};
		};
	};
}
interface PlayerAccountLevel {
	account_exp: number;
	account_level: number;
	account_level_extra_exp: number;
}
interface PlayerVip {
	/** VIP经验 */
	vip_exp: number;
	/** VIP等级 */
	vip_level: number;
	/** TODO: */
	vip_level_extra_exp: number;
}
interface PlayerDailyRewardsReceiveData {
	/** 连续登录天数 */
	consecutive_free_rewards_receive_count: number;
	/** 每日奖励 */
	can_receive_free: boolean;
	/** vip奖励 */
	can_receive_vip: boolean;
}
interface PlayerShopProductLimit {
	pid: number,
	count: number,
	time: number,
}
interface PlayerAccountLevelRewardsData {
	rids: Record<string, boolean>,
}
interface SiriusData {
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
	upgrade_attribute: string;
	suit_id: number;
}