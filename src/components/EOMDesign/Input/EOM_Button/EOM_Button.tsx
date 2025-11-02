import classNames from "classnames";
import { createMemo, Match, mergeProps, ParentComponent, splitProps, Switch } from "solid-js";
import "./EOM_Button.less";

interface EOM_ButtonAttribute extends LabelLikeAttributes<Button> {
	/** 图标 */
	icon?: JSX.Element;
	/** 设置按钮颜色 */
	color?: "Green" | "Blue" | "Red" | "Purple" | "Gold" | "Gray";
	/** 预设大小 */
	size?: "Small" | "Normal" | "Large";
	/** loading */
	loading?: boolean;
	/** loading样式 */
	loadingStyle?: "Spinner" | "Refresh";
}

export const EOM_Button: ParentComponent<EOM_ButtonAttribute> = (props) => {
	const mergedClass = classNames(
		"EOM_Button",
		props.loading ? "Loading" : "",
		props.loadingStyle == "Refresh" ? "Loading_Refresh" : "Loading_Spinner",
		`color-${props.enabled == false ? "Gray" : (props.color || "Gold")}`,
		`size-${props.size || "Normal"}`,
		props.class
	);
	const merged = mergeProps({ loading: false, color: "Gold", size: "Normal" }, props, { class: mergedClass });
	const [local, others] = splitProps(merged, ["loading", "icon", "color", "size", "children", "text", "html", "vars"]);
	const enabled = createMemo(() => local.loading ? false : props.enabled);
	return (
		<EOM_BaseButton {...others} enabled={enabled()}>
			<Panel class="EOM_Button_Content">
				<Switch fallback={local.icon}>
					<Match when={local.loading == true}>
						<Image class="EOM_Button_LoadingIcon" />
					</Match>
				</Switch>
				<Label
					visible={local.text != undefined}
					text={local.text}
					html={local.html}
					vars={local.vars}
				/>
			</Panel>
			{local.children}
		</EOM_BaseButton>
	);
};

export const EOM_BaseButton: ParentComponent<PanelAttributes<Button>> = (props) => {
	const merged = mergeProps(props, { class: classNames("EOM_BaseButton", props.class) });
	const [local, others] = splitProps(merged, ["children"]);

	return (
		<Button {...others}>
			{local.children}
		</Button>
	);
};

export const EOM_CloseButton: ParentComponent<PanelAttributes<Button>> = (props) => {
	const merged = mergeProps(props, { class: classNames("EOM_CloseButton", props.class) });
	const [local, others] = splitProps(merged, ["children"]);
	return <EOM_BaseButton {...others}>
		{local.children}
	</EOM_BaseButton>;
};

interface EOM_IconAttribute extends PanelAttributes<Button> {
	icon: JSX.Element;
}
export const EOM_IconButton: ParentComponent<EOM_IconAttribute> = (props) => {
	const merged = mergeProps(props, { class: classNames("EOM_IconButton", props.class) });
	const [local, others] = splitProps(merged, ["children", "icon"]);
	return (
		<Button {...others}>
			{local.icon}
			{local.children}
		</Button>
	);
};