import { reloadable } from "../lib/tstl-utils";

@reloadable
class MSettings extends CModule {
	init(reload: boolean) {
		if (IsServer()) {
			let GameMode = GameRules.GetGameModeEntity();
			GameMode.SetInnateMeleeDamageBlockAmount(0);
			GameMode.SetInnateMeleeDamageBlockPerLevelAmount(0);
			GameMode.SetInnateMeleeDamageBlockPercent(0);
			GameMode.SetUnseenFogOfWarEnabled(false);
			GameRules.SetHeroRespawnEnabled(true);
			GameMode.SetFogOfWarDisabled(false);
			GameMode.SetFixedRespawnTime(1);
			GameRules.SetCustomGameAllowBattleMusic(false);
			GameRules.SetCustomGameAllowHeroPickMusic(false);
			GameRules.SetCustomGameAllowMusicAtGameStart(true);
			GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_GOODGUYS, 4);
			GameRules.SetCustomGameTeamMaxPlayers(DOTATeam_t.DOTA_TEAM_BADGUYS, 0);
			GameRules.SetFirstBloodActive(false);
			GameRules.SetGoldPerTick(0);
			GameRules.SetGoldTickTime(99999);
			GameRules.SetHeroSelectionTime(0);
			GameRules.SetHeroSelectPenaltyTime(0);
			GameRules.SetHideKillMessageHeaders(true);
			GameRules.SetPostGameTime(3000);
			GameRules.SetPreGameTime(0);
			GameRules.SetSameHeroSelectionEnabled(true);
			GameRules.SetShowcaseTime(0);
			GameRules.SetStartingGold(0);
			GameRules.SetStrategyTime(0);
			GameRules.SetTimeOfDay(0.26);
			GameRules.SetUseBaseGoldBountyOnHeroes(false);
			GameRules.SetUseCustomHeroXPValues(true);
			GameRules.SetSuggestItemsEnabled(false);
			GameMode.DisableHudFlip(true);
			GameMode.SetAlwaysShowPlayerNames(false);
			GameMode.SetAnnouncerDisabled(true);
			GameMode.SetCameraZRange(0, 20000);
			GameMode.SetCustomBackpackCooldownPercent(1);
			GameMode.SetCustomBackpackSwapCooldown(0);
			GameMode.SetCustomBuybackCooldownEnabled(true);
			GameMode.SetCustomBuybackCostEnabled(true);
			GameMode.SetBuybackEnabled(false);
			GameMode.SetCameraDistanceOverride(1300);
			GameMode.SetCustomGameForceHero("npc_dota_hero_axe");
			GameMode.SetUseCustomHeroLevels(true);
			GameMode.SetCustomHeroMaxLevel(100);
			GameMode.SetCustomXPRequiredToReachNextLevel([0, 10000]);
			GameMode.SetDaynightCycleDisabled(true);
			GameMode.SetDeathOverlayDisabled(true);
			GameMode.SetGoldSoundDisabled(false);
			GameMode.SetSendToStashEnabled(false);
			GameMode.SetCanSellAnywhere(false);
			GameMode.SetAllowNeutralItemDrops(false);
			GameMode.SetRandomHeroBonusItemGrantDisabled(true);
			GameMode.SetRecommendedItemsDisabled(true);
			GameMode.SetNeutralStashEnabled(false);

			GameMode.SetHudCombatEventsDisabled(true);
			GameMode.SetKillingSpreeAnnouncerDisabled(true);
			GameMode.SetLoseGoldOnDeath(false);
			GameMode.SetMaximumAttackSpeed(5000);
			GameMode.SetMinimumAttackSpeed(1);
			GameMode.SetPauseEnabled(true);
			GameMode.SetRecommendedItemsDisabled(true);
			GameMode.SetSelectionGoldPenaltyEnabled(false);
			GameMode.SetStashPurchasingDisabled(true);
			GameMode.SetStickyItemDisabled(true);
			GameMode.SetTPScrollSlotItemOverride("item_back");
			GameMode.SetGiveFreeTPOnDeath(false);
			GameMode.SetWeatherEffectsDisabled(true);
			GameMode.SetForcedHUDSkin("default");
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_DAMAGE, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_HP, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_STRENGTH_HP_REGEN, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_DAMAGE, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_ARMOR, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_AGILITY_ATTACK_SPEED, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_DAMAGE, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_MANA, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_MANA_REGEN, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_INTELLIGENCE_MAGIC_RESIST, 0);
			GameMode.SetCustomAttributeDerivedStatValue(AttributeDerivedStats.DOTA_ATTRIBUTE_ALL_DAMAGE, 0);

			GameMode.SetGoldSoundDisabled(true);
			if (IsInToolsMode()) {
				GameRules.LockCustomGameSetupTeamAssignment(false);
				GameRules.EnableCustomGameSetupAutoLaunch(false);
				GameRules.SetCustomGameSetupAutoLaunchDelay(3);
			} else {
				GameRules.LockCustomGameSetupTeamAssignment(false);
				GameRules.EnableCustomGameSetupAutoLaunch(true);
			}
			GameRules.SetUseUniversalShopMode(true);
		}
	}
}

declare global {
	var Settings: MSettings;
}
Settings ??= new MSettings();