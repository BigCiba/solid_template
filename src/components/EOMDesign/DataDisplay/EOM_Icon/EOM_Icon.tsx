import classNames from "classnames";
import { ParentComponent, mergeProps, splitProps } from "solid-js";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Icon.less";

export interface EOM_IconAttribute extends EOM_Attribute {
	/** 资源路径 */
	src?: string;
	/** 旋转角度 */
	rotate?: number;
	/** 是否有旋转动画，默认两秒 */
	spin?: boolean;
	/** 旋转方向 */
	spinDirection?: "normal" | "reverse" | "alternate" | "alternate-reverse" | "initial" | "inherit";
	/** 旋转动画时间，有该参数可以省略spin属性 */
	spinDuration?: number;
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
	const merged = mergeProps({ size: "32" }, props);
	const [local, others] = splitProps(props, ["children", "rotate", "spin", "spinDirection", "spinDuration", "shadow", "size", "type", "extraType"]);
	return (
		<Panel
			{...EOMProps(others, {
				className: classNames("EOM_Icon", { ["EOM_Icon" + local.type]: local.type != undefined, }, local.extraType, "Size" + merged.size, {
					EOM_IconSpin: local.spin || local.spinDuration,
					EOM_IconShadow: local.shadow,
				}),
				style: {
					preTransformRotate2d: (local.rotate != undefined) ? local.rotate + "deg" : undefined,
					animationDuration: (local.spinDuration != undefined) ? local.spinDuration + "s" : undefined,
					animationDirection: local.spinDirection
				}
			})}
		>
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