import classNames from "classnames";
import { ParentComponent, mergeProps, splitProps } from "solid-js";
import { ADDON_NAME, EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Separator.less";

export interface EOM_SeparatorAttribute extends EOM_Attribute {
	// 仅用于调节C4款式的长度
	size?: "normal" | "short" | "symmetric" | "symmetric_long";
	// 长度
	length?: "fit-children" | `fill-parent-flow(${number})` | `${number}px` | `${number}%` | string;
	// 方向， (C4 默认水平方向，不支持垂直方向)
	direction?: "vertical" | "horizontal";
	/** 预设的款式 */
	type?: "C4" | "default";
}

/** 分割线 */
export const EOM_Separator: ParentComponent<EOM_SeparatorAttribute> = (props) => {
	const merged = mergeProps({ type: ADDON_NAME, size: "normal", direction: "horizontal" }, props);
	const [local, others] = splitProps(merged, ["type", "direction", "length", "size"]);
	const defaultStyle = () => {
		if (local.direction == "horizontal") {
			return { width: local.length };
		} else if (local.direction == "vertical") {
			return { height: local.length };
		}
		return {};
	};
	return (
		<Panel {...EOMProps(others, {
			className: classNames("EOM_Separator", local.direction, local.type, "Size_" + local.size),
			style: defaultStyle()
		})} />
	);
};