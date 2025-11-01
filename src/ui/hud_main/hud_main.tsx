import { render } from "@bigciba/solid-panorama-runtime";
import { EOM_Button } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_Breadcrumb } from "../../components/EOMDesign/Navigation/EOM_Breadcrumb/EOM_Breadcrumb";

function HudMain() {
	return <Panel align="center center" flowChildren="down">
		<EOM_Button />
		<EOM_Breadcrumb list={["asd", "sasd", "asds", "afsd"]} />
	</Panel>;
}

render(HudMain, $.GetContextPanel());