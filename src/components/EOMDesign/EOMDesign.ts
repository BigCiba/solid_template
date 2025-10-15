import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";

export const ADDON_NAME: any = "Tui12";

const SUPPORT_CSS_LIST: string[] = [
	"flowChildren",
	"width",
	"height",
	"tooltipPosition",
	"verticalAlign",
	"horizontalAlign",
	"align",
	"margin",
	"marginTop",
	"marginLeft",
	"marginBottom",
	"marginRight",
	"padding",
	"paddingTop",
	"paddingLeft",
	"paddingBottom",
	"paddingRight",
	"overflow",
	"backgroundImage",
	"backgroundSize",
	"backgroundColor",
	"washColor",
	"opacity",
	"opacity",
	"x",
	"y",
	"zIndex",
	"fontSize",
	"fontFamily",
	"textShadow",
	"textDecoration",
	"color",
	"scroll",
	"style",
];

export function EOMProps(props: any, defaultProps: {
	class?: string,
	className?: string,
	classList?: Record<string, boolean>,
	style?: any,
} = {}) {
	const [css, others] = splitProps(props, SUPPORT_CSS_LIST);
	// @ts-ignore
	const [combine, final] = splitProps(others, ["class", "classList", "className", "customTooltip", "tooltip", "titleTooltip"]);

	// overflow语法糖
	if (css.scroll != undefined) {
		css.overflow = getOverflow(css.scroll);
		delete css.scroll;
	}
	const [htmlStyle, htmlCss] = splitProps(css, ["style"]);
	let style = { style: htmlCss };

	if (htmlStyle.style != undefined) {
		style.style = Object.assign(style.style, { ...htmlStyle.style });
	}

	// 合并style
	defaultProps.style = Object.assign(Object.fromEntries(
		Object.entries(defaultProps.style ?? {}).filter(([key, value]) => value !== undefined)
	), style.style ?? {});

	// 合并class
	defaultProps.class = ((defaultProps.class ?? "") + " " + (props.class ?? ""));
	defaultProps.classList = Object.assign(defaultProps.classList ?? {}, props.classList ?? {});
	defaultProps.className = classNames(defaultProps.className ?? "", props.className ?? "");

	// tooltip
	// <Panel custom_tooltip={['Item', 'tooltip_example']} custom_tooltip_params={{ name: 'item_xxx' }} />
	// @ts-ignore
	// @ts-ignore
	if (combine.customTooltip != undefined) {
		// @ts-ignore
		defaultProps.custom_tooltip = [props.customTooltip.name, `file://{resources}/layout/custom_game/tooltips/${props.customTooltip.name}.xml`];
		// @ts-ignore
		defaultProps.custom_tooltip_params = props.customTooltip;
	}
	// @ts-ignore
	if (combine.tooltip != undefined) {
		// @ts-ignore
		defaultProps.tooltip_text = combine.tooltip;
	}

	return mergeProps(defaultProps, final);
}

function getOverflow(scroll: EOM_Attribute["scroll"]) {
	switch (scroll) {
		case "x":
			return "scroll squish";
		case "y":
			return "squish scroll";
		case "both":
			return "scroll scroll";
		case "none":
		case ["none", "none"]:
			return "squish squish";
		default:
			break;
	}
}

type EOM_PanelScroll = "clip" | "noclip" | "none" | "squish" | "scroll";

export interface EOM_Attribute extends PanelAttributes {
	children?: JSX.Element[];
	/** 宽 */
	width?: "fit-children" | `fill-parent-flow(${number})` | `height-percentage(${number}%)` | `${number}px` | `${number}%` | string;
	/** 高 */
	height?: "fit-children" | `fill-parent-flow(${number})` | `width-percentage(${number}%)` | `${number}px` | `${number}%` | string;
	/** 子元素排列方式 */
	flowChildren?: "right" | "right-wrap" | "down" | "down-wrap" | "left" | "left-wrap" | "up" | "up-wrap" | "none" | undefined,
	/** 对齐方式 */
	verticalAlign?: "top" | "bottom" | "middle" | "center",
	horizontalAlign?: "left" | "right" | "middle" | "center",
	align?: "left top" | "left center" | "left bottom" | "center top" | "center center" | "center bottom" | "right top" | "right center" | "right bottom",
	/** tooltip内容，根据传入参数自动适配title类型，传入name显示自定义tooltip */
	tooltip?: string | { title?: string, text?: string, name?: string; };
	/** title样式Tooltip */
	titleTooltip?: { title: string, text: string; };
	/** 自定义Tooltip */
	customTooltip?: { name: string; } & Record<string, any>;
	/** tooltip方位 */
	tooltipPosition?: string;
	/** margin */
	margin?: string;
	marginTop?: string;
	marginLeft?: string;
	marginBottom?: string;
	marginRight?: string;
	/** padding */
	padding?: string;
	paddingTop?: string;
	paddingLeft?: string;
	paddingBottom?: string;
	paddingRight?: string;
	/** 背景 */
	backgroundImage?: string;
	backgroundSize?: string;
	backgroundColor?: string;
	/** wash-color */
	washColor?: string;
	/** opacity */
	opacity?: string;
	/** 位置 */
	x?: string;
	y?: string;
	zIndex?: number;
	/** 滚动方向 */
	scroll?: "x" | "y" | "both" | EOM_PanelScroll | [EOM_PanelScroll, EOM_PanelScroll] | undefined,
	overflow?: string;
}