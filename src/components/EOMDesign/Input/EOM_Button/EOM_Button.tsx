import classNames from "classnames";
import { ParentComponent, Show, mergeProps, splitProps, untrack } from "solid-js";
import "./EOM_Button.less";

interface EOM_ButtonAttribute extends PanelAttributes {
	/** 图标 */
	icon?: JSX.Element;
	/** 设置按钮载入状态 */
	loading?: boolean;
	/** 设置按钮颜色 */
	color?: "Green" | "Blue" | "Red" | "Purple" | "Gold" | "Gray";
	// Tui12预设大小
	size?: "Small" | "Normal" | "Large";
}
export const EOM_Button: ParentComponent<EOM_ButtonAttribute & TextButtonAttributes> = (props) => {
	const merged = mergeProps({ loading: false, color: "Purple", size: "Normal" }, props);
	const [local, others] = splitProps(props, ["loading", "icon", "color", "size", "children", "text", "html"]);
	return (
		<Button class={classNames("EOM_Button", props.class)} {...others}>
			<Panel class="EOM_Button_Text">
				{local.icon}
				<Label visible={local.text != undefined} text={local.text} html={local.html} vars={merged.vars} dialogVariables={merged.dialogVariables} />
			</Panel>
			{local.children}
		</Button>
	);
};


export const EOM_BaseButton: ParentComponent<PanelAttributes & LabelLikeAttributes<Button>> = (props) => {
	const [local, others] = splitProps(props, ["children", "text", "html"]);
	return (
		<Button class={classNames("EOM_Button", "EOM_BaseButton", props.class)} {...others}>
			{untrack(() => local.children)}
			<Show when={local.text}>
				<Label text={local.text} html={local.html} />
			</Show>
		</Button>
	);
};

interface EOM_IconAttribute extends PanelAttributes {
	icon: JSX.Element;
}
export const EOM_IconButton: ParentComponent<EOM_IconAttribute & PanelAttributes<Button>> = (props) => {
	const [local, others] = splitProps(props, ["icon", "children"]);

	return (
		<Button class={classNames("EOM_IconButton", "EOM_BaseButton", props.class)} {...others}>
			{local.icon}
			{local.children}
		</Button>
	);
};

interface EOM_CloseButtonAttribute extends PanelAttributes {
	type?: "Default" | "Gradient" | "Quit" | "P2" | "Tui9" | "Tui7" | "Tui3" | "C4" | "Tui12";
}
export const EOM_CloseButton: ParentComponent<EOM_CloseButtonAttribute & PanelAttributes<Button>> = (props) => {
	const [local, others] = splitProps(props, ["type", "children"]);

	return <Button class={classNames("EOM_CloseButton", props.class)} {...others}>
		{/* {<EOM_Icon type="XClose" extraType={local.type} />} */}
		{local.children}
	</Button>;
};
