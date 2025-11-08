import { reloadable } from "../lib/tstl-utils";

/** 手柄 */
@reloadable
class CGamepad extends CModule {
	init(bReload: boolean): void {
		if (!bReload) {

		}
		this.print("Gamepad initialized");
		if (IsServer()) {
			ListenToGameEvent("pui_error_msg", (data) => {
				this.print(`PUI Error Server: ${data.error}`);
			}, undefined);
		}
		if (IsClient()) {
			this.RegisterGamepadInputs();
		}
	}
	RegisterGamepadInputs() {
		print("Registering gamepad inputs");
		for (let index = 1; index <= 32; index++) {
			const name = "joy" + index;
			this.RegisterCommand(name);
		}
		this.RegisterCommand("Z AXIS POS");
		this.RegisterCommand("Z AXIS NEG");
		this.RegisterCommand("pov_up");
		this.RegisterCommand("pov_right");
		this.RegisterCommand("pov_down");
		this.RegisterCommand("pov_left");
	}
	RegisterCommand(name: string) {
		const command = DoUniqueString(name);
		Convars.RegisterCommand("+" + command, (name, ...args) => {
			print(name, args);
		}, "", 0);
		Convars.RegisterCommand("-" + command, (name, ...args) => {
			print(name, args);
		}, "", 0);
		SendToConsole(`bind ${name} +${command}`);
	}

}

declare global {
	var Gamepad: CGamepad;
}

Gamepad ??= new CGamepad();