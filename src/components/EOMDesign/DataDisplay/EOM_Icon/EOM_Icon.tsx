import classNames from "classnames";
import { ParentComponent } from "solid-js";
import { useSimpleProps } from "../../EOMDesign";
import "./EOM_Icon.less";

export interface EOM_IconAttribute extends PanelAttributes {
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
	const { local, others } = useSimpleProps(props, {
		defaultValues: { size: "32" },
		localKeys: ["children", "rotate", "spin", "spinDirection", "spinDuration", "shadow", "size", "type", "extraType"] as const,
		componentClass: classNames("EOM_Icon", { ["EOM_Icon" + props.type]: props.type != undefined, }, props.extraType, "Size" + props.size, {
			EOM_IconSpin: props.spin || props.spinDuration,
			EOM_IconShadow: props.shadow,
		})
	});
	return (
		<Panel
			{...others}
			style={{
				preTransformRotate2d: (local.rotate != undefined) ? local.rotate + "deg" : undefined,
				animationDuration: (local.spinDuration != undefined) ? local.spinDuration + "s" : undefined,
				animationDirection: local.spinDirection
			}}
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