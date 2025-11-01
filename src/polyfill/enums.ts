/** 支付类型 */
enum PayType {
	MONEY = 0,
	MOON = 100001,
	STAR = 100002,
	SHARD = 100003,
	COIN = 110001,
}

/** 玩家登录状态 */
enum PlayerLoginState {
	None,
	Success, // 登录成功
	NoPermission, // 无许可证
	Banned // 无许可证
}

/** 游戏阶段 */
enum GameStage {
	None,
	GameStart, // 游戏开始
	HeroSelection, // 选择英雄
	BeforeHeroSpawn, // 英雄创建完成前，用于处理一些英雄创建前的处理，以免英雄创建出来报错
	PreGame, // 准备游戏阶段
	GameInProgress, // 游戏进行
	ChallengeTime, // 挑战时间
	PostGame, // 结束阶段
	GameRestart, // 游戏重开
	HeroReselection, // 英雄重选
	HookGame, // 挂机模式
	FirstBattle, // 首次剧情战斗
}
