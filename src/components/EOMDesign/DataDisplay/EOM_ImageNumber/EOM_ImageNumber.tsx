import classNames from "classnames";
import { For, mergeProps, ParentComponent, splitProps } from "solid-js";
import "./EOM_ImageNumber.less";

interface EOMImageNumberAttribute extends PanelAttributes {
	value: number,
	type: "1" | "2" | "3" | "4" | "5" | "6",
}

export const EOM_ImageNumber: ParentComponent<EOMImageNumberAttribute> = (props) => {
	const merged = mergeProps(props, { class: "EOM_ImageNumber" + props.type });
	const [local, others] = splitProps(merged, ["value", "type"]);
	return (
		<Panel {...others}>
			<For each={String(local.value).split("")}>
				{(num, index) => <Image class={classNames("EOM_NUM", "EOM_NUM_" + num)} />}
			</For>
		</Panel>
	);
};