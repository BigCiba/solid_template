import { mergeProps, ParentComponent, splitProps } from "solid-js";
import "./EOM_RadioButton.less";

export const EOM_CheckBox: ParentComponent<ToggleButtonAttributes> = (props) => {
	const merged = mergeProps(props, { class: "EOM_CheckBox" });
	const [local, other] = splitProps(merged, ["text"]);
	return (
		<ToggleButton {...other}>
			<Label text={local.text} />
		</ToggleButton>
	);
};