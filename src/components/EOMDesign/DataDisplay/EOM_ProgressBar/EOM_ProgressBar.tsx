import { ParentComponent, children, createMemo, mergeProps, splitProps } from "solid-js";
import { EOM_Panel } from "../../Container/EOM_Panel/EOM_Panel";
import { ADDON_NAME, EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_ProgressBar.less";

interface EOM_ProgressBarAttribute extends EOM_Attribute {
	/** 当前是否选中 */
	// checked?: boolean,
	/** 值 */
	value?: number,
	min?: number,
	max?: number,
	/** 变化时回调函数 */
	onChange?: (checked: boolean) => void,
	type?: "Tui12";
}

export const EOM_ProgressBar: ParentComponent<EOM_ProgressBarAttribute> = (props) => {
	const merged = mergeProps({ value: 0, min: 0, max: 100, type: ADDON_NAME }, props);
	const [local, others] = splitProps(merged, ["children", "value", "min", "max", "type"]);
	const resolved = children(() => local.children);

	// const { value, min, max } = local;
	const width = createMemo(() => {
		if (local.max == 0) {
			return 100;
		}
		return Clamp(Round(finiteNumber(((local.value - local.min) / (local.max - local.min) * 100)), 2), 0, 100);
	});
	return (
		<Panel {...EOMProps(others, {
			className: "EOM_ProgressBar " + local.type,
		})}>
			<EOM_Panel className="EOM_ProgressBar_Left" width={width() + "%"} >
			</EOM_Panel>
			<EOM_Panel className="EOM_ProgressBar_Right" width={(100 - width()) + "%"}>
			</EOM_Panel>
			{resolved()}
		</Panel>
	);
};