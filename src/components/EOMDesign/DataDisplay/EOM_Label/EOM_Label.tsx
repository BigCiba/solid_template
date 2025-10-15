import classNames from "classnames";
import { ParentComponent, children, splitProps } from "solid-js";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Label.less";

interface EOM_LabelAttribute extends EOM_Attribute {
	/** 字体大小 */
	fontSize?: `${number}px`;
	/** 字体样式 */
	fontFamily?: "defaultFont" | "monospaceNumbersFont" | "titleFont" | "monospaceFont" | "diretideFont";
	/** 字体颜色 */
	color?: string,
	/** 预设样式 */
	type?: "Title" | "Normal" | "Money" | "Tip";
	/** 下划线。划掉等装饰 */
	textDecoration?: "none" | "underline" | "line-through";
	textShadow?: string;
	textOverflow?: 'ellipsis' | 'clip' | 'shrink' | null;
}

export const EOM_Label: ParentComponent<EOM_LabelAttribute & LabelAttributes> = (props) => {
	const [local, others] = splitProps(props, ["children", "fontSize", "fontFamily", "color", "type", "textDecoration", "textShadow", "textOverflow"]);
	const resolved = children(() => local.children);
	return (
		<Label
			{...EOMProps(others, {
				className: classNames("EOM_Label", {
					EOM_LabelTitle: local.type == "Title",
					EOM_LabelNormal: local.type == "Normal",
					EOM_LabelMoney: local.type == "Money",
					EOM_LabelTip: local.type == "Tip",
				}),
				style: {
					fontSize: local.fontSize,
					fontFamily: local.fontFamily,
					color: local.color,
					textShadow: local.textShadow,
					textDecoration: local.textDecoration,
					textOverflow: local.textOverflow,
				}
			})}
		>
			{resolved()}
		</Label>
	);
};