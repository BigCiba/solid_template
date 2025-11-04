import { render } from "@bigciba/solid-panorama-runtime";

function HudMain() {
	return <Panel align="center center" flowChildren="down">
		<Label text="Hello, HUD Main!" />
	</Panel>;
}

render(HudMain, $.GetContextPanel());