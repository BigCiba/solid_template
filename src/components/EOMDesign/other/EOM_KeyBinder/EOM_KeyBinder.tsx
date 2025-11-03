import classNames from "classnames";

import { ParentComponent, Show, createEffect, createSignal, mergeProps, splitProps } from "solid-js";
import "./EOM_KeyBinder.less";

/** 面板上的按键绑定 */
export const Key2Command: { [key: string]: string; } = {
	key_Backquote: "`",
	key_Tab: "TAB",
	key_Capslock: "CAPSLOCK",
	key_Space: "SPACE",
	key_Minus: "-",
	key_Equal: "=",
	key_Backspace: "BACKSPACE",
	//无效 key_BracketLeft: "[",
	//无效 key_BracketRight: "]",
	key_Backslash: "\\",
	key_Semicolon: ";",
	//无效 key_Quote: "'",
	key_Comma: ",",
	key_Period: ".",
	key_Slash: "/",
	// key_Ctrl: "CTRL",
	key_Enter: "RETURN",
	key_1: "1",
	key_2: "2",
	key_3: "3",
	key_4: "4",
	key_5: "5",
	key_6: "6",
	key_7: "7",
	key_8: "8",
	key_9: "9",
	key_0: "0",
	key_F1: "F1",
	key_F2: "F2",
	key_F3: "F3",
	key_F4: "F4",
	key_F5: "F5",
	key_F6: "F6",
	key_F7: "F7",
	key_F8: "F8",
	key_F9: "F9",
	key_F10: "F10",
	key_F11: "F11",
	key_F12: "F12",

	key_Q: "Q",
	key_W: "W",
	key_E: "E",
	key_R: "R",
	key_T: "T",
	key_Y: "Y",
	key_U: "U",
	key_I: "I",
	key_O: "O",
	key_P: "P",
	key_A: "A",
	key_S: "S",
	key_D: "D",
	key_F: "F",
	key_G: "G",
	key_H: "H",
	key_J: "J",
	key_K: "K",
	key_L: "L",
	key_Z: "Z",
	key_X: "X",
	key_C: "C",
	key_V: "V",
	key_B: "B",
	key_N: "N",
	key_M: "M",

	// key_pad_a: "KEYPADA",
	// key_pad_b: "KEYPADB",
	// key_pad_x: "KEYPADX",
	// key_pad_y: "KEYPADY",
	// 有效，但是不知道是哪个按键
	// key_pad_1: "KEYPAD1",
	// key_pad_2: "KEYPAD2",
	// key_pad_3: "KEYPAD3",
	// key_pad_4: "KEYPAD4",
	// key_pad_5: "KEYPAD5",
	// key_pad_6: "KEYPAD6",
	// key_pad_7: "KEYPAD7",
	// key_pad_8: "KEYPAD8",
	// key_pad_9: "KEYPAD9",
	// key_pad_0: "KEYPAD0",
};

/** 全局按键绑定 */
export const KeyCode: { [key: string]: string; } = {
	key_Q: "Q",
	key_W: "W",
	key_E: "E",
	key_R: "R",
	key_T: "T",
	key_Y: "Y",
	key_U: "U",
	key_I: "I",
	key_O: "O",
	key_P: "P",
	key_A: "A",
	key_S: "S",
	key_D: "D",
	key_F: "F",
	key_G: "G",
	key_H: "H",
	key_J: "J",
	key_K: "K",
	key_L: "L",
	key_Z: "Z",
	key_X: "X",
	key_C: "C",
	key_V: "V",
	key_B: "B",
	key_N: "N",
	key_M: "M",

	key_Backquote: "`",
	key_Tab: "TAB",
	key_Capslock: "CAPSLOCK",
	key_Shift: "SHIFT",
	// key_Ctrl: "CTRL",
	//无效 Alt: "ALT",
	key_Space: "SPACE",
	key_Minus: "-",
	key_Equal: "=",
	key_Backspace: "BACKSPACE",
	key_BracketLeft: "[",
	key_BracketRight: "]",
	key_Backslash: "\\",
	//无效 Semicolon: ";",
	key_Quote: "'",
	key_Comma: ",",
	key_Period: ".",
	key_Slash: "/",
	//无效 Enter: "RETURN",

	key_Printscreen: "PRINTSCREEN",
	key_ScrollLock: "SCROLLLOCK",
	key_Pause: "PAUSE",
	//无效 Insert: "INSERT",
	key_Home: "HOME",
	//无效 Delete: "DELETE",
	key_End: "END",
	//无效 PageUp: "PAGEUP",
	//无效 PageDown: "PAGEDOWN",
	//无效 Up: "UP",
	//无效 Down: "DOWN",
	//无效 Left: "LEFT",
	//无效 Right: "RIGHT",

	key_Digit1: "1",
	key_Digit2: "2",
	key_Digit3: "3",
	key_Digit4: "4",
	key_Digit5: "5",
	key_Digit6: "6",
	key_Digit7: "7",
	key_Digit8: "8",
	key_Digit9: "9",
	key_Digit0: "0",

	// S1_UP: "S1_UP",
	// S1_DOWN: "S1_DOWN",
	// S1_LEFT: "S1_LEFT",
	// S1_RIGHT: "S1_RIGHT",
	// A_BUTTON: "A_BUTTON",
	// B_BUTTON: "B_BUTTON",
	// X_BUTTON: "X_BUTTON",
	// Y_BUTTON: "Y_BUTTON",
	// L_SHOULDER: "L_SHOULDER",
	// R_SHOULDER: "R_SHOULDER",
	// L_TRIGGER: "L_TRIGGER",
	// R_TRIGGER: "R_TRIGGER",
	// X_AXIS: "X_AXIS",

	// Keypad1: "KEYPAD1",
	// Keypad2: "KEYPAD2",
	// Keypad3: "KEYPAD3",
	// Keypad4: "KEYPAD4",
	// Keypad5: "KEYPAD5",
	// Keypad6: "KEYPAD6",
	// Keypad7: "KEYPAD7",
	// Keypad8: "KEYPAD8",
	// Keypad9: "KEYPAD9",
	// Keypad0: "KEYPAD0",
	// KeypadPeriod: "KEYPAD.",
	// NumLock: "NUMLOCK",
	//无效 KeypadDivide: "KEYPAD/",
	//无效 KeypadMultiply: "KEYPAD*",
	//无效 KeypadSubtract: "KEYPAD-",
	//无效 KeypadAdd: "KEYPAD+",
	//无效 KeypadEnter: "KEYPAD ENTER",

	key_1: "1",
	key_2: "2",
	key_3: "3",
	key_4: "4",
	key_5: "5",
	key_6: "6",
	key_7: "7",
	key_8: "8",
	key_9: "9",
	key_0: "0",

	key_Esc: "ESCAPE",
	key_F1: "F1",
	key_F2: "F2",
	key_F3: "F3",
	key_F4: "F4",
	key_F5: "F5",
	key_F6: "F6",
	key_F7: "F7",
	key_F8: "F8",
	key_F9: "F9",
	key_F10: "F10",
	key_F11: "F11",
	key_F12: "F12",
};

export enum KeyBinderType {
	/** 默认的普通样式 */
	Normal = 0,
	/** 技能样式 */
	Ability,
	/** 物品样式 */
	Item,
}

interface EOM_KeyBinderProps extends PanelAttributes {
	type?: KeyBinderType,
	text?: string | string[],
	initDropIndex?: number,
	initKey?: string,
	tooltip?: string,
	onChange?: (key: string, bInit: boolean, dropIndex: number) => void,
	/** 响应的动作 */
	callback: () => void;
}

export const EOM_KeyBinder: ParentComponent<EOM_KeyBinderProps> = (props) => {
	const merged = mergeProps({
		type: KeyBinderType.Normal,
		text: "",
		initKey: "",
		initDropIndex: 0,
	}, props, {
		class: classNames("SettingsKeyBinder", "BindingRow", {
			HeroAbilityBindAbilityButton: props.type == KeyBinderType.Ability,
			ItemBindButton: props.type == KeyBinderType.Item,
		})
	});
	const [local, others] = splitProps(merged, ["callback", "onChange", "initKey", "initDropIndex", "text", "tooltip", "type"]);

	let panel: Panel | undefined;
	let eventKey: string | undefined;

	const [keyName, setKeyName] = createSignal(local.initKey ?? "");
	const dropIndex = () => local.initDropIndex;

	const OnActivate = (self: Panel) => {
		$.DispatchEvent("SetInputFocus", self);
	};
	const OnFocus = (self: Panel) => {
		SaveData(self, "keybind", keyName());
		setKeyName("");
		self.AddClass("selected");
		self.FindChildTraverse("BindingLabelContainer")?.SetHasClass("ActiveBindButton", self.BHasClass("selected"));
	};
	const OnBlur = (self: Panel) => {
		setKeyName(LoadData(self, "keybind"));
		self.RemoveClass("selected");
		self.FindChildTraverse("BindingLabelContainer")?.SetHasClass("ActiveBindButton", self.BHasClass("selected"));
	};
	const OnCancel = (self: Panel) => {
		$.DispatchEvent("DropInputFocus", self);
	};
	createEffect(() => {
		if (panel && panel.IsValid()) {
			const current_initKey = local.initKey;
			setKeyName(current_initKey ?? "");
			if (LoadData(panel, "keybind") != current_initKey && current_initKey != "") {
				local.onChange?.(current_initKey, true, local.initDropIndex ? local.initDropIndex - 1 : 0);
				RegisterKeyEvent(current_initKey, local.callback);
			}
			SaveData(panel, "keybind", current_initKey);
		}
	});

	const OnLoad = (self: Panel) => {
		if (LoadData(self, "keybind") != local.initKey && local.initKey != "") {
			local.onChange?.(local.initKey, true, local.initDropIndex ? local.initDropIndex - 1 : 0);
			if (eventKey) UnregisterKeyEvent(eventKey);
			eventKey = RegisterKeyEvent(local.initKey, local.callback);
		}
		SaveData(self, "keybind", local.initKey);
		for (const key in Key2Command) {
			let command = Key2Command[key];
			$.RegisterKeyBind(self as Panel, key, () => {
				if (self.IsValid()) {
					setKeyName(command);
					SaveData(self, "keybind", command);
					OnCancel(self);
					if (typeof local.text == "string") {
						local.onChange?.(command, false, dropIndex());
						if (eventKey) UnregisterKeyEvent(eventKey);
						eventKey = RegisterKeyEvent(command, local.callback);
					}
					if (Array.isArray(local.text)) {
						const childList = self.FindChildTraverse("title")?.Children();
						if (childList) {
							for (let index = 0; index < childList.length; index++) {
								const element = childList[index];
								if (element.IsValid() && element.visible && element.BHasClass("EOM_DropDownChild")) {
									local.onChange?.(command, false, index);
									if (eventKey) UnregisterKeyEvent(eventKey);
									eventKey = RegisterKeyEvent(command, local.callback);
								}
							}
						}
					}
				}
			});
		}
	};
	const OnClear = (self: Panel) => {
		let pSelf = self.FindAncestor("LabelFXContainer")?.GetParent();
		if (pSelf) {
			SaveData(pSelf, "keybind", "");
			setKeyName("");

			if (eventKey) UnregisterKeyEvent(eventKey);
			local.onChange?.("", false, dropIndex());

			OnCancel(pSelf);
		}
	};
	return (
		<Panel
			id="EOM_KeyBinder"
			ref={panel}
			onactivate={self => OnActivate(self)}
			onfocus={self => OnFocus(self)}
			onblur={self => OnBlur(self)}
			oncancel={self => OnCancel(self)}
			onload={self => OnLoad(self)}
			tooltip={local.tooltip}
			{...others} >
			<Show when={typeof local.text == "string"}>
				<Label id="title" text={local.text as string} class="BindingRowLabel" html={true} />
			</Show>
			<Panel id="LabelFXContainer">
				<Panel id="BindingLabelContainer" >
					<Label id="mod" text="" class="BindingRowButton" />
					<Label id="dash" text="-" class="BindingRowButton" />
					<Label id="value" text={GetLocalization("#" + keyName()) == "#" + keyName() ? keyName() : ("#" + keyName())} class="BindingRowButton" />
				</Panel>
				<Button class="ClearKeybinding" onactivate={self => OnClear(self)} />
			</Panel>

		</Panel>
	);
};