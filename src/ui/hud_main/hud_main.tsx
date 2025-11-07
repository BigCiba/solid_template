import { render } from "@bigciba/solid-panorama-runtime";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";

const Key2Command: { [key: string]: string; } = {
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
	key_pad_1: "KEYPAD1",
	key_pad_2: "KEYPAD2",
	key_pad_3: "KEYPAD3",
	key_pad_4: "KEYPAD4",
	key_pad_5: "KEYPAD5",
	key_pad_6: "KEYPAD6",
	key_pad_7: "KEYPAD7",
	key_pad_8: "KEYPAD8",
	key_pad_9: "KEYPAD9",
	key_pad_0: "KEYPAD0",
	Pad_A: "1234",
	Pad_B: "1234",
	Pad_X: "1234",
	Pad_Y: "1234",
	Pad_Start: "1234",
	Pad_Back: "1234",
	// Pad_LShoulder: "1234",
	// Pad_RShoulder: "1234",
	Pad_LTrigger: "1234",
	Pad_RTrigger: "1234",
	// Pad_LThumb: "1234",
	// Pad_RThumb: "1234",
	// Pad_DPadUp: "1234",
	// Pad_DPadDown: "1234",
	// Pad_DPadLeft: "1234",
	// Pad_DPadRight: "1234",
};
function HudMain() {
	Game.AddCommand(`+test_gamepad`, () => {
		print("Gamepad Test Command Activated");
	}, "", 67108864);
	Game.AddCommand(`-test_gamepad`, () => {
		print("Gamepad Test Command Activated");
	}, "", 67108864);
	return <Panel align="center center" flowChildren="down" >
		<EOM_Button onactivate={self => {
			self.SetFocus();
		}} onload={self => {
			for (const k in Key2Command) {
				const v = Key2Command[k];
				$.RegisterKeyBind(self, k, (source: 'keyboard' | 'gamepad', presses: number, panel) => {
					print(`KeyCode pressed: ${k} => ${v}`, source, presses);
				});
				print(`KeyCode Binded: ${k} => ${v}`);
			}
			self.SetFocus();
		}} />
	</Panel>;
}

render(HudMain, $.GetContextPanel());