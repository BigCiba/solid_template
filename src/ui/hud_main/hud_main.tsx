import { render } from "@bigciba/solid-panorama-runtime";
import { EOM_Countdown } from "../../components/EOMDesign/DataDisplay/EOM_Countdown/EOM_Countdown";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";

function HudMain() {
	return <Panel align="center center" flowChildren="down">
		<EOM_Button />
		<EOM_Countdown endTime={1762099200} />
	</Panel>;
}

render(HudMain, $.GetContextPanel());