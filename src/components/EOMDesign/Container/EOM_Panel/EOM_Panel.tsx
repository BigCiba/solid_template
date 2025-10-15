import { ParentComponent, splitProps, untrack } from "solid-js";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Panel.less";

export const EOM_Panel: ParentComponent<EOM_Attribute> = (props) => {
	const [local, others] = splitProps(props, ["children"]);
	return (
		<Panel
			{...EOMProps(others, {
				class: "EOM_Panel",
			})}
		>
			{untrack(() => local.children)}
		</Panel>
	);
};