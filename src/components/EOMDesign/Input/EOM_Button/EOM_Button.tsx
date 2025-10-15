import classNames from "classnames";
import { Component, ParentComponent, Show, children, mergeProps, splitProps, untrack } from "solid-js";
import { CLabel } from "../../../EOMChildren";
import { EOM_Icon } from "../../DataDisplay/EOM_Icon/EOM_Icon";
import { ADDON_NAME, EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Button.less";

interface EOM_ButtonAttribute extends EOM_Attribute {
	/** 图标 */
	icon?: JSX.Element;
	/** 设置按钮载入状态 */
	loading?: boolean;
	/**
	 * 设置按钮类型
	 * - Default按钮支持"Green" | "Blue" | "Red" | "Purple" | "Gold"颜色
	 * - Primary按钮支持"Gray" | "Black" | "Blue" | "DarkBlue" | "Red"
	 * - Bevel按钮支持"Green" | "DarkGreen" | "Bronze" | "Plus"颜色
	 * - Store按钮支持"Direct" | "InBundle" | "InTreasure" | "AdditionalDropInTreasure" | "DotaPlus" | "Market" | "ShardsPurchase" | "Gift" | "Season_Winter2017" | "Season_International2016" | "Season_Fall2016" | "Season_International2017" | "Season_International2018" | "Season_International2019" | "Season_International2020" | "Season_Spring2021"
	 * */
	type?: "Default" | "Primary" | "Bevel" | "Store" | "Text" | "Outline" | "Tui9" | "Tui6" | "Tui7" | "Tui3" | "P2" | "C4" | "C4glass";
	/** 设置按钮颜色 */
	// color?: "Green" | "Blue" | "Red" | "Purple" | "Gold" | "DarkGreen" | "Bronze" | "Plus" | string;
	color?: "Green" | "Blue" | "Red" | "Purple" | "Gold" | "Gray";
	// Tui12预设大小
	size?: "Small" | "Normal" | "Large";
}
export const EOM_Button: ParentComponent<EOM_ButtonAttribute & TextButtonAttributes> = (props) => {
	const merged = mergeProps({ loading: false, type: ADDON_NAME, color: "Purple", size: "Normal" }, props);
	const [local, others] = splitProps(props, ["loading", "icon", "type", "color", "size", "children", "backgroundImage", "text", "html"]);
	const _icon = children(() => local.icon);
	const resolved = children(() => local.children);
	// const [enable, setEnable] = createSignal(local.enabled == undefined ? !merged.loading : local.enabled);
	return (
		<Button
			{...EOMProps(others, {
				className: classNames(props.className, "EOM_Button", merged.type, merged.size, merged.color, { Loading: merged.loading }),
				style: {
					backgroundImage: local.backgroundImage,
				},
			})}
		// enabled={enable()}
		>
			<Panel className="EOM_Button_Text">
				{_icon()}
				<Show when={local.text}>
					<CLabel text={local.text} html={local.html} vars={merged.vars} dialogVariables={merged.dialogVariables} />
				</Show>
				{resolved()}
			</Panel>
		</Button>
	);
};


export const EOM_BaseButton: ParentComponent<EOM_Attribute & LabelLikeAttributes<Button>> = (props) => {
	const [local, others] = splitProps(props, ["children", "text", "html"]);
	return (
		<Button
			{...EOMProps(others, {
				className: "EOM_Button EOM_BaseButton",
			})}
		>
			{untrack(() => local.children)}
			<Show when={local.text}>
				<Label text={local.text} html={local.html} />
			</Show>
		</Button>
	);
};

interface EOM_IconAttribute extends EOM_Attribute {
	icon: JSX.Element;
}
export const EOM_IconButton: ParentComponent<EOM_IconAttribute & PanelAttributes<Button>> = (props) => {
	const [local, others] = splitProps(props, ["icon", "children"]);

	return (
		<Button
			{...EOMProps(others, {
				className: "EOM_IconButton",
			})}
		>
			{local.icon}
			{local.children}
		</Button>
	);
};

interface EOM_CloseButtonAttribute extends EOM_Attribute {
	type?: "Default" | "Gradient" | "Quit" | "P2" | "Tui9" | "Tui7" | "Tui3" | "C4" | "Tui12";
}
export const EOM_CloseButton: ParentComponent<EOM_CloseButtonAttribute & PanelAttributes<Button>> = (props) => {
	const merged = mergeProps({ type: ADDON_NAME }, props);
	const [local, others] = splitProps(merged, ["type", "children"]);

	return <Button
		{...EOMProps(others, {
			className: "EOM_IconButton EOM_CloseButton " + local.type,
		})}
	>
		{<EOM_Icon type="XClose" extraType={local.type} />}
		{local.children}
	</Button>;
};


interface EOM_DiamondButtonAttribute extends EOM_Attribute {
	type?: "C4",
	animation?: boolean,
	direction?: "up" | "down" | "left" | "right",
}
export const EOM_DiamondButton: Component<EOM_DiamondButtonAttribute & PanelAttributes<Button>> = (props) => {
	const merged = mergeProps({
		type: ADDON_NAME,
		direction: "right" as "right",
		animation: false
	}, props);
	const [local, others] = splitProps(merged, ["type", "direction", "animation"]);

	return (
		<Button {...EOMProps(others, {
			className: classNames("EOM_DiamondButton", local.direction, {
				animation: local.animation
			})
		})}>
			<Panel id="EOM_DiamondButton_Point" />
			<Panel id="EOM_DiamondButton_Arrow" />
		</Button>
	);
};