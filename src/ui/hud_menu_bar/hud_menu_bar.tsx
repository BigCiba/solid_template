import { insert, render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { createSignal, For, onCleanup, onMount, Show, splitProps } from "solid-js";
import { EOM_BaseButton } from "../../components/EOMDesign/Input/EOM_Button/EOM_Button";

const menus: string[] = [
	"setting",
	"mail",
	"store",
	"activity",
	"handbook",
	"draw",
	"rank",
];


/** 下拉快捷 */
const dropdownMenus: Record<string, string[]> = {
	setting: ["MenuButton_setting", "MenuDropDown_Dota2Setting"],
};

const dropdownCallback: Record<string, () => void> = {
	MenuDropDown_Dota2Setting: () => $.DispatchEvent("DOTAShowSettingsRebornPopup", $.GetContextPanel())
};

const [selectName, setSelectName] = createSignal("");
let DropContainer: Panel | undefined;
let DropContent: Panel | undefined;
const showDropDown = (panel?: Panel, name?: string) => {
	if (DropContainer == undefined || !DropContainer.IsValid()) return;
	if (panel != undefined) {
		if (name != undefined && dropdownMenus[name] != undefined) {
			let position = panel.GetPositionWithinWindow();
			let dropX = position.x / DropContainer.actualuiscale_x - 100 + 23;
			if (DropContent != undefined) {
				DropContainer.SetPositionInPixels(Math.max(0, dropX), 0, 0);
				if (dropX < 0) {
					DropContainer.FindChild("MarginTop")!.style.transform = `translateX(${dropX}px)`;
				} else {
					DropContainer.FindChild("MarginTop")!.style.transform = `translateX(0px)`;
				}
				DropContent.RemoveAndDeleteChildren();
				for (const dropName of dropdownMenus[name]) {
					insert(DropContent, <DropdownItem menuName={name} dropName={dropName} />);
				}
			}
			SaveData(DropContainer, "targetPanel", panel);
		} else {
			LoadData<Panel>(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
			DropContainer.RemoveClass("Show");
			return;
		}
	}
	LoadData<Panel>(DropContainer, "targetPanel")?.AddClass("ShowDropDown");
	DropContainer.AddClass("Show");
};
const hideDropDown = () => {
	if (!DropContainer?.IsValid()) return;
	LoadData<Panel>(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
	DropContainer.RemoveClass("Show");
};

const [redData, SetRed] = createSignal<Record<string, boolean>>((() => {
	let res: Record<string, boolean> = {};
	// menus.forEach(menu => {
	// 	res[menu] = CustomUIConfig.GetRedPoint(menu);
	// });
	return res;
})());

const MenuBar = () => {
	onMount(() => {
		let gameEventListeners: GameEventListenerID[] = [];
		gameEventListeners.push(GameEvents.Subscribe("custom_ui_toggle_windows", (eventData) => {
			const name = eventData.window_name.replace("MenuButton_", "");
			if (eventData.state == undefined) {
				if (selectName() == name) {
					setSelectName("");
				} else {
					setSelectName(name);
				}
			} else {
				if (eventData.state == 1) {
					setSelectName(name);
				} else {
					setSelectName("");
				}
			}
		}));
		// gameEventListeners.push(CustomUIConfig.SubscribeRedPointChange((key) => {
		// 	// print(key);
		// 	SetRed(oldData => {
		// 		let old = oldData[key];
		// 		let newState = CustomUIConfig.GetRedPoint(key);
		// 		if (old == newState) {
		// 			return oldData;
		// 		}
		// 		return { ...oldData, [key]: newState };
		// 	});
		// }));
		onCleanup(() => {
			for (const id of gameEventListeners) {
				GameEvents.Unsubscribe(id);
			}
		});
	});

	return (
		<Panel id="MenuMain" hittest={false}>
			<Panel id="MenuBar" hittest={false}>
				<MenuButton name="Return" onactivate={self => $.DispatchEvent("DOTAHUDShowDashboard", self)} />
				<For each={menus}>
					{menu => {
						return <MenuButton name={menu}
							red={redData()[menu] == true}
						/>;
					}}
				</For>
			</Panel>
			<Panel id="DropContainer" ref={DropContainer} hittest={false}>
				<Panel id="MarginTop" onmouseover={self => showDropDown()} onmouseout={self => hideDropDown()} />
				<Panel id="DropMain" onmouseover={self => showDropDown()} onmouseout={self => hideDropDown()} ref={DropContent} />
			</Panel>
		</Panel>
	);
};

const MenuButton = (props: {
	name: string,
	red?: boolean,
} & PanelAttributes<Button>) => {
	const [local, other] = splitProps(props, ["name", "hittest", "onactivate"]);
	const selected = () => selectName() == local.name;

	return (
		<EOM_BaseButton id={props.name} class="MenuButton" onactivate={local.onactivate ?? (self => {
			GameEvents.SendEventClientSide("custom_ui_toggle_windows", { window_name: "MenuButton_" + local.name, state: selected() ? 0 : 1 });
		})} onmouseover={self => {
			showDropDown(self, local.name);
		}} onmouseout={self => {
			hideDropDown();
		}}>
			<Panel class={classNames("BGImage", "FrontImage", local.name, { Selected: selected() })} />
			<Panel class={classNames("BGImage", "HoverImage", local.name, { Selected: selected() })} />
			<Label class={classNames("MenuLabel", local.name, { Selected: selected() })} text={"#MenuButton_" + local.name} />
			<Show when={props.red}>
				<Panel id="RedPoint" />
			</Show>
		</EOM_BaseButton>
	);
};

const DropdownItem = (props: { menuName: string, dropName: string; }) => {
	return <EOM_BaseButton class="DropdownItem" onactivate={self => {
		if (dropdownCallback[props.dropName] != undefined) {
			dropdownCallback[props.dropName]();
		} else {
			GameEvents.SendEventClientSide("custom_ui_toggle_windows", { window_name: "MenuButton_" + props.menuName, state: 1 });
			clientSideEvent("toggle_window_tag", { window_name: "MenuButton_" + props.menuName, menu: props.dropName });
		}
		hideDropDown();
	}}>
		<Label text={"#" + props.dropName} />
		{/* <Show when={CustomUIConfig.GetRedPoint(props.menuName, props.dropName)}>
			<Panel id="DropdownRedPoint" hittest={false} />
		</Show> */}
	</EOM_BaseButton>;
};

render(() => <MenuBar />, $.GetContextPanel());