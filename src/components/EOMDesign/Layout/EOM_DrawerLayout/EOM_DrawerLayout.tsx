import { createRenderEffect, createSignal, Show, splitProps, untrack } from "solid-js";
import { CLabel } from "../../../EOMChildren";
import { EOM_Attribute, EOMProps } from "../../EOMDesign";
import { EOM_CloseButton } from "../../Input/EOM_Button/EOM_Button";
import "./EOM_DrawerLayout.less";
import { EOM_Panel } from "../../Container/EOM_Panel/EOM_Panel";

export interface EOM_DrawerLayoutProps extends EOM_Attribute {
	title: string,
	show: boolean,
	onclose?: () => void;
}

export function EOM_DrawerLayout(props: EOM_DrawerLayoutProps) {
	const [local, others] = splitProps(props, ["children", "show", "title", "onclose"]);
	const [show, setShow] = createSignal(local.show);
	createRenderEffect(() => {
		setShow(props.show);
	});

	return (
		<Panel {...EOMProps(others, { class: "EOM_DrawerLayout", classList: { DrawerVisible: show() } })} >
			<EOM_CloseButton id="EOM_DrawerLayoutClose" onactivate={() => { setShow(false); local.onclose?.(); }} />
			<Show when={local.title}>
				<Panel id="TitleContainer" hittest={false}>
					<CLabel text={local.title} />
				</Panel>
			</Show>
			<EOM_Panel id="DrawerContents" onactivate={() => { }}>
				{untrack(() => local.children)}
			</EOM_Panel>
		</Panel>
	);
}