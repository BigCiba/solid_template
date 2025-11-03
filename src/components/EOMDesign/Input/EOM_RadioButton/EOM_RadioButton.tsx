import { mergeProps, ParentComponent, splitProps } from "solid-js";
import "./EOM_RadioButton.less";

export const EOM_RadioButton: ParentComponent<RadioButtonAttributes> = (props) => {
	const merged = mergeProps(props, { class: "EOM_RadioButton" });
	const [local, other] = splitProps(merged, ["text"]);
	return (
		<RadioButton {...other}>
			<Label text={local.text} />
		</RadioButton>
	);
};