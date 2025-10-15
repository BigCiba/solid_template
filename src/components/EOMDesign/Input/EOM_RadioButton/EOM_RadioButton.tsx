import { ParentComponent, Show, splitProps } from "solid-js";
import { CLabel, TabButton } from "../../../EOMChildren";
import { EOMProps } from "../../EOMDesign";
import "./EOM_RadioButton.less";

export const EOM_RadioButton: ParentComponent<RadioButtonAttributes> = (props) => {
	const [local, other] = splitProps(props, ["text", "html"]);
	return (
		<TabButton {...EOMProps(other, {
			className: "EOM_RadioButton"
		})}>
			<Image id="EOM_RadioBox" />
			<Show when={local.text}>
				<CLabel text={local.text} html={local.html} />
			</Show>
		</TabButton>
	);
};