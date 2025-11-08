import { reloadable } from "./lib/tstl-utils";

@reloadable
class MGame extends CModule {
	/** 游戏暂停 */
	private _isPause = false;
	/** 游戏难度 */
	private _difficulty = 1;
	/** 游戏难度上限 */
	private _maxDifficulty = 1;
	/** 玩家数量 */
	private _playerCount = 1;
	/** 游戏胜利 */
	private _gameSuccess = false;
	init(reload: boolean) {
		GameEvent("game_rules_state_change", function (...args) { return this.OnGameRulesStateChange(...args); }, this);
		if (!reload) {
			if (IsServer()) {
			}
		}
	}
	GetDifficulty() {
		return this._difficulty;
	}

	GetMaxDifficulty() {
		return this._maxDifficulty;
	}

	/**
	 * 遍历有玩家的队伍
	 * @param funcCallBack 回调，返回true的话会break遍历
	 */
	EachTeamsWithPlayer(funcCallBack: (iTeamNumber: DOTATeam_t) => boolean | void) {
		for (const iTeamNumber of $range(DOTATeam_t.DOTA_TEAM_FIRST, DOTATeam_t.DOTA_TEAM_CUSTOM_7, 1)) {
			let iPlayerCount = PlayerResource.GetPlayerCountForTeam(iTeamNumber);
			if (iPlayerCount > 0) {
				if (funcCallBack(iTeamNumber) == true) {
					break;
				}
			}
		}
	}
	/**
	 * 遍历玩家
	 * @param funcCallBack 回调，返回true的话会break遍历
	 * @param iTeamNumber 队伍，缺省则会遍历所有队伍的玩家
	 */
	EachPlayer(funcCallBack: (iPlayerID: PlayerID, iTeamNumber: DOTATeam_t, n: number) => boolean | void, iTeamNumber?: DOTATeam_t) {
		if (iTeamNumber == undefined) {
			this.EachTeamsWithPlayer(function (_iTeamNumber) {
				for (const n of $range(1, PlayerResource.GetPlayerCountForTeam(_iTeamNumber), 1)) {
					let iPlayerID = PlayerResource.GetNthPlayerIDOnTeam(_iTeamNumber, n);
					if (PlayerResource.IsValidPlayerID(iPlayerID)) {
						if (funcCallBack(iPlayerID, _iTeamNumber, n) == true) {
							break;
						}
					}
				}
			});
		} else {
			for (const n of $range(1, PlayerResource.GetPlayerCountForTeam(iTeamNumber), 1)) {
				let iPlayerID = PlayerResource.GetNthPlayerIDOnTeam(iTeamNumber, n);
				if (PlayerResource.IsValidPlayerID(iPlayerID)) {
					if (funcCallBack(iPlayerID, iTeamNumber, n) == true) {
						break;
					}
				}
			}
		}
	}
	/**
	 * 获取有效玩家数量
	 * @param iTeamNumber 队伍，缺省则会计算所有队伍的有效玩家
	 * @returns 有效玩家数量
	 */
	GetValidPlayerCount(iTeamNumber?: DOTATeam_t) {
		let n = 0;
		this.EachPlayer((iPlayerID) => {
			let hHero = PlayerResource.GetSelectedHeroEntity(iPlayerID);
			if (IsValid(hHero)) {
				n = n + 1;
			}
		}, iTeamNumber);
		return n;
	}

	/**
	 * 获取玩家在队伍中的位置，为防止玩家ID很大，返回值从1开始而不是像玩家ID一样从0开始
	 * @param playerID
	 * @returns
	 */
	GetPlayerTeamSlot(playerID: PlayerID | number) {
		let team = PlayerResource.GetTeam(playerID as PlayerID);
		for (const i of $range(1, PlayerResource.GetPlayerCountForTeam(team), 1)) {
			let slotPlayerID = PlayerResource.GetNthPlayerIDOnTeam(team, i);
			if (slotPlayerID != playerID) continue;
			return i;
		}
		return 0;
	}
	GetPlayerCount() {
		let n = 0;
		this.EachPlayer(iPlayerID => {
			n++;
		});
		return n;
	}

	IsPause() {
		return this._isPause;
	}

	Pause(bFlag: boolean) {
		this._isPause = bFlag;
		PauseGame(this._isPause);
		this.UpdateCustomPause();
	}
	private UpdateCustomPause() {
		CustomNetTables.SetTableValue("common", "custom_pause", {
			pause: this._isPause,
		});
	}

	/** 设置游戏成功失败 */
	SetGameResult(success: boolean) {
		this._gameSuccess = success;
		let t = CustomNetTables.GetNetData("common", "values") ?? {
			difficulty: 1,
			player_count: 1,
			boss_round: 0,
			is_attacking: 0,
		};
		t.game_success = success;
		CustomNetTables.SetNetData("common", "values", t);
	}
	GetGameResult() {
		return this._gameSuccess;
	}

	private OnGameRulesStateChange(events: EventProperties<object>) {
		let state = GameRules.State_Get();

		// 游戏初始化
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP) {
			if (!IsInToolsMode()) {
				if (!IsDedicatedServer() || GameRules.IsCheatMode()) {
					let bb = 1;
					while (true) {
						bb = bb + 1;
					}
				}
			}
		}
		// 选择英雄
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_HERO_SELECTION) {
		}
		// 策略时间
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_STRATEGY_TIME) {
		}
		// 准备阶段
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_PRE_GAME) {
		}
		// 游戏开始
		if (state == DOTA_GameState.DOTA_GAMERULES_STATE_GAME_IN_PROGRESS) {
			GameRules.SetTimeOfDay(0.26);
		}
	}
}
declare global {
	/** @ServerOnly */
	var Game: MGame;
}
Game ??= new MGame();