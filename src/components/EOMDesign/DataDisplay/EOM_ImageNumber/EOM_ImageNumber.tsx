import classNames from "classnames";
import { For, ParentComponent, splitProps } from "solid-js";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_ImageNumber.less";

interface EOMImageNumberAttribute extends EOM_Attribute {
	value: number,
	type: "1" | "2" | "3" | "4" | "5" | "6",
}

export const EOM_ImageNumber: ParentComponent<EOMImageNumberAttribute> = (props) => {
	const [local, others] = splitProps(props, ["value", "type"]);
	return (
		<Panel {...EOMProps(others, {
			className: classNames("EOM_ImageNumber" + local.type),
		})}
		>
			<For each={String(local.value).split("")}>
				{(num, index) => <Image className={classNames("EOM_NUM", "EOM_NUM_" + num)} />}
			</For>
		</Panel>
	);
};