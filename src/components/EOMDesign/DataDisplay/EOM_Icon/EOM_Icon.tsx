import classNames from "classnames";
import { mergeProps, ParentComponent, splitProps } from "solid-js";
import "./EOM_Icon.less";

export interface EOM_IconAttribute extends PanelAttributes {
	/** 资源路径 */
	src?: string;
	/** 是否有旋转动画，默认两秒 */
	spin?: boolean;
	/** 描边 */
	shadow?: boolean;
	/** 常用尺寸 */
	size?: "16" | "24" | "32" | "48" | "64" | "96" | "128";
	/** 类型 */
	type?: EOM_IconType;
	/** 额外类型 */
	extraType?: string;
}
export const EOM_Icon: ParentComponent<EOM_IconAttribute & PanelAttributes<ImagePanel>> = (props) => {
	const merged = mergeProps({ size: "32" }, props, {
		class: classNames("EOM_Icon", { ["EOM_Icon" + props.type]: props.type != undefined, }, props.extraType, "Size" + props.size, {
			EOM_IconSpin: props.spin,
			EOM_IconShadow: props.shadow,
		})
	});
	const [local, others] = splitProps(merged, ["children", "spin", "shadow", "size", "type", "extraType"]);
	return (
		<Panel {...others}>
			{local.children}
		</Panel>
	);
};

type EOM_IconType =
	"Gear" |
	"Refresh" |
	"ArrowRight" |
	"ArrowSolidRight" |
	"ArrowExpand" |
	"Popout" |
	"LockSmall" |
	"XClose" |
	"Spinner";