import { createMemo, Match, ParentComponent, Switch } from "solid-js";
import { useSimpleProps } from "../../EOMDesign";
import "./EOM_Button.less";

interface EOM_ButtonAttribute extends TextButtonAttributes {
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
	const { local, others } = useSimpleProps(props, {
		localKeys: ["icon", "color", "size", "loading", "loadingStyle", "children", "enabled", "text", "html", "vars"] as const,
		componentClass: [
			"EOM_Button",
			props.loading ? "Loading" : "",
			props.loadingStyle == "Refresh" ? "Loading_Refresh" : "Loading_Spinner",
			`color-${props.enabled == false ? "Gray" : (props.color || "Gold")}`,
			`size-${props.size || "Normal"}`
		]
	});
	const enabled = createMemo(() => local.loading ? false : local.enabled);
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

export const EOM_BaseButton: ParentComponent<PanelAttributes> = (props) => {
	const { local, others } = useSimpleProps(props, {
		localKeys: ["children"] as const,
		componentClass: ["EOM_BaseButton"]
	});
	return (
		<Button {...others}>
			{local.children}
		</Button>
	);
};

export const EOM_CloseButton: ParentComponent<PanelAttributes> = (props) => {
	const { local, others } = useSimpleProps(props, {
		localKeys: ["children"] as const,
		componentClass: ["EOM_CloseButton"]
	});
	return <EOM_BaseButton {...others}>
		{local.children}
	</EOM_BaseButton>;
};

interface EOM_IconAttribute extends PanelAttributes<Button> {
	icon: JSX.Element;
}
export const EOM_IconButton: ParentComponent<EOM_IconAttribute> = (props) => {
	const { local, others } = useSimpleProps(props, {
		localKeys: ["icon", "children"] as const,
		componentClass: ["EOM_IconButton"]
	});
	return (
		<Button {...others}>
			{local.icon}
			{local.children}
		</Button>
	);
};