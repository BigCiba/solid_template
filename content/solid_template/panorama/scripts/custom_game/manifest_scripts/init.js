"use strict";

GameUI.CustomUIConfig().CommandUniqueSuffix = String(Math.floor(Date.now() / 1000));
GameEvents.SendEventClientSide("send_command_unique_suffix", {
	str: GameUI.CustomUIConfig().CommandUniqueSuffix
});

var offsetX = null;
var offsetY = null;
var Draggable = false;
var DragPanel = null;
function DragCallback() {
	var isLeftPressed = GameUI.IsMouseDown(0);
	if (isLeftPressed && DragPanel != null) {
		let position = GameUI.GetCursorPosition();
		if (offsetX == null || offsetY == null) {
			offsetX = DragPanel.GetPositionWithinWindow().x - position[0];
			offsetY = DragPanel.GetPositionWithinWindow().y - position[1];
			DragPanel.style.align = "left top";
			DragPanel.style.margin = "0px 0px 0px 0px";
		}
		if (offsetX != null && offsetY != null) {
			DragPanel.SetPositionInPixels((position[0] + offsetX) / DragPanel.actualuiscale_x, (position[1] + offsetY) / DragPanel.actualuiscale_y, 0);
		}
	}
	else {
		offsetX = null;
		offsetY = null;
	}
	if (Draggable || isLeftPressed) {
		$.Schedule(Game.GetGameFrameTime(), DragCallback);
	}
	else {
		DragPanel = null;
	}
}
GameUI.CustomUIConfig()._PopupTempData = GameUI.CustomUIConfig()._PopupTempData ?? {};
GameUI.CustomUIConfig().StartDrag = function (panel) {
	Draggable = true;
	DragPanel = panel;
	DragCallback();
};
GameUI.CustomUIConfig().EndDrag = function () {
	Draggable = false;
};
if (GameUI.CustomUIConfig()._HUDRoot_ == undefined) {
	GameUI.CustomUIConfig()._HUDRoot_ = $.GetContextPanel();
}

function EmitSoundForPlayer(tData) {
	Game.EmitSound(tData.soundname);
}

function OnErrorMessage({ message, sound = "General.CastFail_Custom" }) {
	GameUI.SendCustomHUDError(message, sound);
}

function OnSelectUnits({ units }) {
	let b = false;
	let a = units.split(",");
	for (let index = 0; index < a.length; index++) {
		let iEntIndex = Number(a[index]);
		if (isFinite(iEntIndex) && Entities.IsValidEntity(iEntIndex) && Entities.IsControllableByPlayer(iEntIndex, Players.GetLocalPlayer()) && Entities.IsSelectable(iEntIndex)) {
			if (!b) {
				b = true;
				GameUI.SelectUnit(-1, false);
			}
			GameUI.SelectUnit(iEntIndex, true);
		}
	}
}

function Update() {
	$.Schedule(1, () => {
		GameEvents.SendEventClientSide("send_command_unique_suffix", {
			str: GameUI.CustomUIConfig().CommandUniqueSuffix
		});
		Update();
	});
}

(function () {
	Update();
	GameEvents.Subscribe("error_message", OnErrorMessage);
	GameEvents.Subscribe("emit_sound_for_player", EmitSoundForPlayer);
	GameEvents.Subscribe("select_units", OnSelectUnits);

	let HUD = $.GetContextPanel()?.GetParent()?.GetParent();
	if (HUD) {
		let PausedInfo = HUD?.FindChildTraverse("PausedInfo");
		if (PausedInfo) {
			PausedInfo.style.visibility = "collapse";
		}
		let ButtonBar = HUD?.FindChildTraverse("ButtonBar");
		if (ButtonBar) {
			ButtonBar.style.visibility = "collapse";
		}
		let PreGame = HUD.FindChildTraverse("PreGame");
		if (PreGame) {
			PreGame.enabled = false;
			PreGame.style.opacity = "0";
		}
		let stackable_side_panels = HUD.FindChildTraverse("stackable_side_panels");
		if (stackable_side_panels) {
			stackable_side_panels.style.visibility = "collapse";
		}
	}

	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_TIMEOFDAY, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_HEROES, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FLYOUT_SCOREBOARD, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_PANEL, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ACTION_MINIMAP, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PANEL, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_SHOP, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_ITEMS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_QUICKBUY, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_COURIER, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_PROTECT, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_INVENTORY_GOLD, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_SUGGESTEDITEMS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_SHOP_COMMONITEMS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_TEAMS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_GAME_NAME, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_CLOCK, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_HERO_SELECTION_HEADER, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_MENU_BUTTONS, true);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_BACKGROUND, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_RADIANT_TEAM, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_DIRE_TEAM, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR_SCORE, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_ENDGAME_CHAT, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_QUICK_STATS, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_PREGAME_STRATEGYUI, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_KILLCAM, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_FIGHT_RECAP, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, false);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_CUSTOMUI_BEHIND_HUD_ELEMENTS, true);
	GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_AGHANIMS_STATUS, false);
})();
