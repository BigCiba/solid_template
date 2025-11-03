import classNames from "classnames";
import { For, Match, ParentComponent, Show, Switch, children, createEffect, createMemo, createSignal, mergeProps, onCleanup, onMount, splitProps } from "solid-js";
import { createStore } from "solid-js/store";
import { useNetTable } from "solid-panorama-all-in-jsx/events.macro";
import { EOM_Icon } from "../../DataDisplay/EOM_Icon/EOM_Icon";
import { EOM_BaseButton, EOM_Button, EOM_IconButton } from "../../Input/EOM_Button/EOM_Button";
import { EOM_DropDown } from "../../Input/EOM_DropDown/EOM_DropDown";
import { EOM_TextEntry } from "../../Input/EOM_TextEntry/EOM_TextEntry";
import { EOM_Breadcrumb } from "../../Navigation/EOM_Breadcrumb/EOM_Breadcrumb";
import { EOM_KeyBinder, Key2Command } from "../EOM_KeyBinder/EOM_KeyBinder";
import "./EOM_DebugTool.less";

interface EOM_DebugToolAttribute extends PanelAttributes {
	/** 面板的方向 */
	direction: "top" | "right" | "left";
	/** 展开按钮的位置 */
	expandButtonAlign?: "top" | "bottom" | "left" | "right";
	/** 容器元素 */
	containerElement?: JSX.Element[];
	/** 分页标签 */
	tabList?: string[];
}

const [player_key_values, setKeyValue] = createSignal<any>({});
const playerConfig = createMemo(() => {
	const result: Record<string, any> = {};
	for (const key in player_key_values()) {
		const element = player_key_values()[key];
		if (element.type == "demo_setting") {
			result[key] = element.value;
		}
	}
	return result;
});

/** 主面板 */
export const EOM_DebugTool: ParentComponent<EOM_DebugToolAttribute> = (props) => {
	// const [fps, setFps] = createSignal("0");
	// const [fpsRecord, setFpsRecord] = createSignal(0);
	// const [fpsCount, setFpsCount] = createSignal(0);

	const [minimized, setMinimized] = createSignal(true);
	const [manualShowPanel, setManualShowPanel] = createSignal(false);
	const [direction, setDirection] = createSignal("left");
	const [tabIndex, setTabIndex] = createSignal(0);
	const demoSetting = useNetTable("common", "demo_settings");
	const Update = () => {
		// setFpsRecord(fpsRecord() + Game.GetGameFrameTime());
		// setFpsCount(fpsCount() + 1);
		// if (fpsRecord() > 1 && fpsCount() != 0) {
		// 	setFps((fpsCount() / fpsRecord()).toFixed(0));
		// 	setFpsRecord(0);
		// 	setFpsCount(0);
		// }
		if (!manualShowPanel()) {
			if (minimized() == GameUI.IsAltDown() && playerConfig()["alt_tool"]) {
				setMinimized(!GameUI.IsAltDown());
			}
		} else {
			if (GameUI.IsAltDown() && playerConfig()["alt_tool"]) {
				setManualShowPanel(false);
			}
		}
	};
	// const timer = setInterval(Update, Game.GetGameFrameTime());
	// onCleanup(() => clearInterval(timer));
	return (
		<Panel id="EOM_DebugTool" hittest={false} >
			{props.containerElement}
			<EOM_DebugTool_Setting />
			<Panel id="EOM_DebugToolControlPanel" class={classNames("ControlPanel", {
				Minimized: minimized(),
				DirectionLeft: direction() == "left",
				DirectionRight: direction() == "right",
				DirectionTop: direction() == "top",
			})} hittest={false}>
				<Panel class={"ControlPanelContainer TabShow" + tabIndex()}>
					<Panel class="ControlPanelTitle">
						<Panel class="CategoryHeaderFilledFront" />
						{/* <Label class="CategoryHeader" text={`工具(FPS:${fps()})`} /> */}
						<Switch fallback={<Label class="CategoryHeader" text={`工具`} />}>
							<Match when={props.tabList != undefined && props.tabList.length > 0}>
								<EOM_Breadcrumb class="CategoryHeader" list={props.tabList!} onChange={(index, text) => setTabIndex(index)} />
							</Match>
						</Switch>
						<Panel class="CategoryHeaderFilledNext" />
						<EOM_IconButton class="CategoryHeaderIcon" tooltip="切换布局" verticalAlign="center" icon={<EOM_Icon type="Popout" size="24" />} >
							<EOM_DropDown id="ToggleSize" onChange={(index, item) => { setDirection(item.id); SaveConfig("direction", item.id); }}>
								<Label text={"左侧"} id="left" />
								<Label text={"上方"} id="top" />
								<Label text={"右侧"} id="right" />
							</EOM_DropDown>
						</EOM_IconButton>
						<EOM_IconButton class="CategoryHeaderIcon" tooltip="重载数据" verticalAlign="center" icon={<EOM_Icon type="Refresh" size="24" />} onactivate={() => {
							// @ts-ignore
							GameEvents.SendEventClientSide("client_side_event", { event_name: "RefreshDebugToolData", event_data: JSON.stringify({}) });
						}} />
						<EOM_IconButton class="CategoryHeaderIcon" tooltip="设置" verticalAlign="center" icon={<EOM_Icon type="Gear" size="24" onactivate={() => ToggleSelection("EOM_DebugTool_Setting")} />} />
					</Panel>
					{props.children}
				</Panel>
				<Panel id="ExpandButtonContainer" verticalAlign="center" >
					<Button id="ExpandButton" onactivate={() => {
						setManualShowPanel(minimized());
						setMinimized(!minimized());
					}} >
						<EOM_Icon type="ArrowRight" width="8px" height="14px" align="center center" preTransformRotate2d={(minimized() ? (props.direction == "top" ? 90 : 0) : (props.direction == "top" ? 270 : 180)) + "deg"} />
					</Button>
				</Panel>
			</Panel>
		</Panel>
	);
};

/** 设置界面 */
function EOM_DebugTool_Setting() {
	const [deleteMode, setDeleteMode] = createSignal(false);
	const [customKeyBindCount, setCustomKeyBindCount] = createSignal(0);
	const [eventNameList, setEventNameList] = createSignal<string[]>([]);
	const [buttonTextList, setButtonTextList] = createSignal<string[]>([]);
	const [buttonTypeList, setButtonTypeList] = createSignal<string[]>([]);

	const demoSetting = useNetTable("common", "demo_settings");
	// createEffect(() => {
	// 	console.log(demoSetting());

	// });
	const defaultSettingList = ["ReloadScriptButtonPressed"];
	const RegisterDemoButton = (key: string, eventName: string, bInit: boolean) => {
		return;
		if (key && key != undefined) {
			RegisterKeyEvent(key, () => {
				const EOM_DebugTool = $.GetContextPanel().FindChildTraverse("EOM_DebugTool");
				if (EOM_DebugTool) {
					const demoButtonList = EOM_DebugTool.FindChildrenWithClassTraverse("HotKeyValid") as TextButton[];
					demoButtonList.map((element) => {
						if (element.id == eventName.replace("hotkey_", "")) {
							const index = eventNameList().indexOf(eventName.replace("hotkey_", ""));
							if (index > -1) {
								const buttonType = buttonTypeList()[index];
								if (buttonType == "FireEvent") {
									// FireEvent(eventName.replace("hotkey_", ""));
									$.DispatchEvent("Activated", element, "mouse");
								} else if (buttonType == "ToggleSelection") {
									// ToggleSelection(eventName.replace("hotkey_", ""));
									$.DispatchEvent("Activated", element, "mouse");
								}
							}
						}
					});
				}
			});
			if (!bInit) {
				FireEvent("ChangeToolSettingKeyBind", eventName + "," + key);
			}
			setCustomKeyBindCount(0);
		}
	};
	const RegisterHotkey = (eventName: string) => {
		const EOM_DebugTool = $.GetContextPanel().FindChildTraverse("EOM_DebugTool");
		if (EOM_DebugTool) {
			const demoButtonList = EOM_DebugTool.FindChildrenWithClassTraverse("HotKeyValid") as TextButton[];
			demoButtonList.map((element) => {
				if (element.id == eventName.replace("hotkey_", "")) {
					const index = eventNameList().indexOf(eventName.replace("hotkey_", ""));
					if (index > -1) {
						const buttonType = buttonTypeList()[index];
						if (buttonType == "FireEvent") {
							// FireEvent(eventName.replace("hotkey_", ""));
							$.DispatchEvent("Activated", element, "mouse");
						} else if (buttonType == "ToggleSelection") {
							// ToggleSelection(eventName.replace("hotkey_", ""));
							$.DispatchEvent("Activated", element, "mouse");
						}
					}
				}
			});
		}
	};
	const RegisterKeyBind = (key: string, onkeydown?: () => void, onkeyup?: () => void) => {
		if (key && key != "") {
			const sCommand = key + (Date.now() / 1000);
			Game.CreateCustomKeyBind(Key2Command[key], "+" + sCommand);
			Game.AddCommand("+" + sCommand, () => {
				if (onkeydown) {
					onkeydown();
				}
			}, "", 67108864);
			Game.AddCommand("-" + sCommand, () => {
				if (onkeyup) {
					onkeyup();
				}
			}, "", 67108864);
		}
	};
	/** 添加一个键位绑定 */
	const addKeyBind = (self: Panel) => {
		setCustomKeyBindCount(customKeyBindCount() + 1);
		findHotKeyValidButton(self);
	};
	/** 寻找可以绑定的按钮 */
	const findHotKeyValidButton = (self: Panel) => {
		const root = self.FindAncestor("EOM_DebugTool");
		let eventList: string[] = [];
		let textList: string[] = [];
		let typeList: string[] = [];
		if (root) {
			const demoButtonList = root.FindChildrenWithClassTraverse("HotKeyValid") as TextButton[];
			demoButtonList.map((element) => {
				eventList.push(element.id);
				textList.push(element.text);
				typeList.push((() => {
					let result = "";
					if (element.BHasClass("FireEvent")) {
						result = "FireEvent";
					} else if (element.BHasClass("ToggleSelection")) {
						result = "ToggleSelection";
					}
					return result;
				})());
			});
			setEventNameList(eventList);
			setButtonTextList(textList);
			setButtonTypeList(typeList);
		}
	};
	const OnLoad = (self: Panel) => {
		findHotKeyValidButton(self);
	};
	return (
		<SelectionContainer
			eventName={"EOM_DebugTool_Setting"}
			title={"调试工具设置"}
			width="500px"
			height="700px"
			hasRawMode={false}
			hasToggleSize={false}
			hasFilter={false}
		>
			<Panel id="EOM_DebugTool_Setting" class="EOM_DebugTool_Setting" flowChildren="down" width="100%" height="100%">{/* 面板热键 */}
				{/* 面板热键 */}
				<Panel flowChildren="down" width="100%" marginTop="12px" onload={self => OnLoad(self)}>
					<SettingToggleButton selected={playerConfig()["alt_tool"]} settingName="alt_tool" text="ALT切换调试工具" />
					{/* <ToggleButton class="HotKeyValid FireEvent" selected={playerConfig()["alt_tool"]} onactivate={self => {
						SaveConfig("alt_tool", self.IsSelected());
						// SaveConfig({ ["alt_tool"]: self.IsSelected() ? "1" : "0" });
					}} text={"ALT切换调试工具"} /> */}
					{/* <Label text="面板热键" class="SectionHeader" />
					<Panel class="SectionHeaderLine" /> */}
					{/* 默认设置 */}
					<For each={defaultSettingList}>
						{(eventName, index) => {
							const hotkey = () => playerConfig()[eventName];
							return <EOM_KeyBinder text={buttonTextList()[eventNameList().indexOf(eventName)]} initKey={hotkey()} onChange={(key, init) => {
								if (!init) {
									// FireEvent("ChangeToolSettingKeyBind", eventName + "," + key);
									SaveConfig(eventName, key);
								};
							}} callback={() => RegisterHotkey(eventName)} />;
						}}
					</For>
					{/* 已保存的自定义热键设置 */}
					<For each={Object.keys(playerConfig())}>
						{(eventName, index) => {
							if (eventName.indexOf("hotkey_") != -1 && defaultSettingList.indexOf(eventName.replace("hotkey_", "")) == -1) {
								return (
									<Panel width="100%" height="36px" flowChildren="right" class={classNames("CanRemoveKeyBind", { deleteMode: deleteMode })}>
										<EOM_IconButton verticalAlign="center" icon={<Image src="s2r://panorama/images/control_icons/x_close_png.vtex" />} onactivate={self => {
											// FireEvent("ChangeToolSettingKeyBind", "_delete_" + eventName);
											SaveConfig(eventName, "");
										}} />
										<EOM_KeyBinder text={buttonTextList()} initDropIndex={eventNameList().indexOf(eventName.replace("hotkey_", "")) + 1} initKey={playerConfig()[eventName]} onChange={(key, init) => {
											if (!init) {
												SaveConfig(eventName, key);
												// FireEvent("ChangeToolSettingKeyBind", eventName + "," + key);
											};
										}} callback={() => RegisterHotkey(eventName)} />
									</Panel>
								);
							}
						}}
					</For>
					{/* 添加热键 */}
					{[...Array(customKeyBindCount)].map((_, index) => {
						if (buttonTextList.length > 0) {
							return (
								<Panel width="100%" height="36px" flowChildren="right" class={classNames("CanRemoveKeyBind", { deleteMode: deleteMode })}>
									<EOM_IconButton verticalAlign="center" icon={<Image src="s2r://panorama/images/control_icons/x_close_png.vtex" />} onactivate={self => setCustomKeyBindCount(customKeyBindCount() - 1)} />
									<EOM_KeyBinder text={buttonTextList()} onChange={(key, bInit, dropIndex) => {
										if (eventNameList()[dropIndex]) {
											if (key && key != "") {
												RegisterDemoButton(key, "hotkey_" + eventNameList()[dropIndex], bInit);
											}
										}
									}} callback={() => { }} />
								</Panel>
							);
						}
					})}
					{/* <Panel width="100%">
						<EOM_Button margin="4px 8px" class="AddNewKeyBind" type="Text" text="+ 按键绑定" onactivate={(self: Panel) => addKeyBind(self)} />
						{!deleteMode() &&
							<EOM_Button margin="4px 8px" class="AddNewKeyBind" horizontalAlign="right" type="Text" text="- 删除绑定" onactivate={(self: Panel) => setDeleteMode(true)} />
						}
						{deleteMode() &&
							<EOM_Button margin="4px 8px" class="AddNewKeyBind" horizontalAlign="right" type="Text" text="取消" onactivate={(self: Panel) => setDeleteMode(false)} />
						}
					</Panel> */}
				</Panel>
				<EOM_Button verticalAlign="bottom" class="OutlineButton" text="清空设置" onactivate={() => {
					{
						for (const key in playerConfig()) {
							const element = playerConfig()[key];
							SaveConfig(key, "");
						}
						// FireEvent("ChangeToolSettingKeyBind", "_clear_all_config")
					}; setCustomKeyBindCount(0);
				}} />
			</Panel>
		</SelectionContainer>
	);
}
const SettingToggleButton = (props: {
	settingName: string;
	text: string;
	selected?: boolean | string;
}) => {
	const tooltip = GetLocalization(`${props.settingName}_Description`);
	const [selected, setSelected] = createSignal(props.selected);
	createEffect(() => {
		setSelected(props.selected);
	});
	return <Button class={classNames("ToggleButton SettingToggleButton", {
		selected: selected()
	})} onactivate={self => {
		setSelected(!selected());
		SaveConfig(props.settingName, props.selected ? "FALSE" : "TRUE");
		// callAction("/v1/key/save", { type: "setting", key: props.settingName, value: props.selected ? "FALSE" : "TRUE" });
	}} tooltip_text={tooltip == "" ? undefined : tooltip}>
		<Panel class="TickBox" />
		<Panel class="SettingToggleLabel">
			<Label text={props.text} />
		</Panel>
	</Button>;
};
export function EOM_DebugTool_Category(props: {
	/** 标题 */
	title: string,
	/** 自动排版根据col数进行分列排版，默认为2 */
	col?: number,
	/** 是否使用手动排版，默认为false */
	layout?: boolean,
	children?: JSX.Element[],
	/** 分页 */
	tabIndex?: number,
}) {
	const col = () => props.col ?? 2;
	const childs = children(() => props.children).toArray();

	return (
		<Panel class={classNames("Category", "TabIndex" + (props.tabIndex ?? ""), { SingleCol: col() <= 1 })}>
			<Panel class="CategoryHeader">
				<Label class="CategoryHeaderLabel" text={props.title} />
				<Panel width="fill-parent-flow(1)" />
				{/* <EOM_Switch horizontalAlign="right" checkedChildren="1列" unCheckedChildren="2列" checked={col == 1 ? true : false} onChange={(checked) => { SaveConfig({ ["ctg_col_" + this.props.title]: checked ? 1 : 2 }); this.setState({ col: checked ? 1 : 2 }); }} /> */}
			</Panel>
			<Panel class="CategoryButtonContainer">
				<Show when={!(props.layout ?? false)} fallback={props.children}>
					<For each={Array.from({ length: Math.ceil(childs.length / col()) })}>
						{(child, rowIndex) => <Panel class="Row">
							<For each={Array.from({ length: col() })}>
								{(_, idx) => {
									let childIndex = rowIndex() * col() + idx();
									return childs[childIndex];
								}}
							</For>
						</Panel>}
					</For>
				</Show>
			</Panel>
		</Panel>
	);
}
export function FireEvent(sEventName: string, str: string = "", extraParams?: Table) {
	if (!(Players.GetLocalPlayer() == -1 || Players.IsSpectator(Players.GetLocalPlayer()) || Players.IsLocalPlayerLiveSpectating())) {
		const params: Table = {
			event_name: sEventName,
			player_id: Players.GetLocalPlayer(),
			unit: Players.GetLocalPlayerPortraitUnit(),
			position: GameUI.GetCameraLookAtPosition(),
			str: str,
		};
		if (extraParams) {
			Object.entries(extraParams).forEach(([key, value]) => {
				params[key] = value;
			});
		}
		// @ts-ignore
		GameEvents.SendCustomEventToServer("DemoEvent", params);
	}
}

function SaveConfig(key: string, value: string | boolean) {
	if (value == true) {
		value = "TRUE";
	}
	if (value == false) {
		value = "FALSE";
	}
	console.log("saveConfig");
	callAction("/v1/key/save", {
		type: "demo_setting",
		key,
		value: String(value)
	});

	// @ts-ignore
	// GameEvents.SendCustomEventToServer("DemoEvent", {
	// 	event_name: "SaveConfig",
	// 	player_id: Players.GetLocalPlayer(),
	// 	unit: Players.GetLocalPlayerPortraitUnit(),
	// 	position: GameUI.GetCameraLookAtPosition(),
	// 	str: JSON.stringify(config),
	// });
};

/** 切换面板 */
export function ToggleSelection(sPickerName: string) {
	let aPickerList = $.GetContextPanel().FindChildrenWithClassTraverse("SelectionContainer");
	if (aPickerList !== null) {
		for (const iterator of aPickerList) {
			if (iterator.id == sPickerName) {
				iterator.ToggleClass("Show");
			}
			else if (iterator.BHasClass("LockWindow") == false) {
				iterator.SetHasClass("Show", false);
			}
		}
	}
}
export function CompilePopups(tooltips: string[]) {
	// const name: string[] = [
	// ];

	// name.forEach(n => {
	// 	$.DispatchEvent(
	// 		"UIShowCustomLayoutPopupParameters",
	// 		n,
	// 		`file://{resources}/layout/custom_game/${n}.xml`,
	// 		"");
	// });

	for (const k of tooltips) {
		$.DispatchEvent("UIShowCustomLayoutTooltip", $.GetContextPanel(), k, "file://{resources}/layout/custom_game/" + k + ".xml");
		$.Schedule(0.1, () => {
			$.DispatchEvent("UIHideCustomLayoutTooltip", $.GetContextPanel(), k);
		});
	}

	const context_menu: string[] = [
	];
	context_menu.forEach(src => {
		let pContextMenu = $.CreatePanel("ContextMenuScript", $.GetContextPanel(), "");

		let pContentsPanel = pContextMenu.GetContentsPanel();
		pContentsPanel.BLoadLayout(src, false, false);
	});
	$.Schedule(0.1, () => {
		$.DispatchEvent("DismissAllContextMenus");
	});
}


// 普通按钮
export const DemoButton: ParentComponent<{
	eventName: string,
	str?: string,
	text: string,
	onactivate?: () => void,
	color?: "RedButton" | "GreenButton" | "QuitButton";
}> = (props) => {
	const onactivate = props.onactivate ?? (() => FireEvent(props.eventName, props.str));
	return <TextButton id={props.eventName} class={classNames("DemoButton", "HotKeyValid", "FireEvent", props.color)} text={props.text} onactivate={onactivate} />;
};

// 切换按钮
export const DemoToggle: ParentComponent<{
	eventName: string,
	str?: string,
	selected?: boolean,
	text: string;
}> = (props) => {
	const selected = props.selected ?? false;
	return (
		<ToggleButton id={props.eventName} class="HotKeyValid FireEvent" selected={selected} onactivate={self => { FireEvent(props.eventName, self.IsSelected() ? "1" : "0"); }} text={props.text} />
	);
};
// 文本输入按钮
export const DemoTextEntry: ParentComponent<{
	eventName: string,
	text: string,
	defaultValue?: string;
	onClick?: (value: string) => void;
}> = (props) => {
	return (
		<TextButton class="DemoTextEntry" flowChildren="right" onactivate={(self) => {
			let TextEntry = self.FindChildTraverse("DemoTextEntry") as TextEntry;
			FireEvent(props.eventName, TextEntry.text);
			if (props.onClick) {
				props.onClick(TextEntry.text);
			}
		}} text={props.text}>
			<TextEntry id="DemoTextEntry" text={props.defaultValue} onload={self => {
				self.SetDisableFocusOnMouseDown(false);
			}} oninputsubmit={(self) => {
				FireEvent(props.eventName, self.text);
				if (props.onClick) {
					props.onClick(self.text);
				}
				$.DispatchEvent("DropInputFocus", self);
			}} oncancel={self => {
				$.DispatchEvent("DropInputFocus", self);
			}} >
			</TextEntry>
		</TextButton>
	);
};
export const DemoSlider: ParentComponent<{
	text: string,
	min: number,
	max: number,
	defaultValue: number,
	onChange: (value: number) => void;
}> = (props) => {
	const [value, setValue] = createSignal(props.defaultValue);
	return (
		<Panel class="DemoSlider">
			<Panel flowChildren="right">
				<Label class="Title" text={props.text} />
				<Label class="Value" text={value().toFixed(0)} />
			</Panel>
			<Slider class="HorizontalSlider" value={(props.defaultValue - props.min) / (props.max - props.min)} direction="horizontal" onvaluechanged={self => {
				props.onChange(self.value * (props.max - props.min) + props.min);
				setValue(self.value * (props.max - props.min) + props.min);
			}} onload={self => {
				props.onChange(self.value * (props.max - props.min) + props.min);
			}} />
		</Panel>
	);
};

/** 打开一个面板 */
export const DemoSelectionButton: ParentComponent<{ eventName: string, text: string; }> = (props) => {
	return (
		<TextButton id={props.eventName} class="DemoButton HotKeyValid ToggleSelection" text={props.text} onactivate={() => {
			ToggleSelection(props.eventName);
		}}>
			<EOM_Icon type="ArrowSolidRight" width="10px" height="16px" align="right center" marginRight="4px" />
		</TextButton>
	);
};

/** 选择容器 */
interface SelectContainerAttribute extends PanelAttributes {
	/** 事件名 */
	eventName: string,
	/** 标题 */
	title: string,
	/** 子元素 */
	itemNames?: string[],

	/** 筛选选项 */
	toggleList?: object,

	// 初始状态
	defaultLock?: boolean,
	defaultRawMode?: boolean,

	//是否显示控件
	hasRawMode?: boolean,
	hasToggleSize?: boolean,
	hasLock?: boolean,
	hasFilter?: boolean,
	hasDragable?: boolean,
	canScroll?: boolean;

	/** 搜索回调 */
	onSearch?: (text: string) => void;
	/** 分类回调 */
	onToggleType?: (text: string) => void;
	/** 更改显示模式回调 */
	onChangeRawMode?: (rawMode: boolean) => void;
}

export const SelectionContainer: ParentComponent<SelectContainerAttribute> = (props) => {
	const merged = mergeProps({ canScroll: false }, props);
	const [local, others] = splitProps(merged, [
		"eventName", "title", "itemNames", "toggleList", "defaultLock", "defaultRawMode", "hasRawMode", "hasToggleSize", "hasLock", "hasFilter", "hasDragable", "onSearch", "onToggleType", "onChangeRawMode", "canScroll"
	]);
	const [lock, setLock] = createSignal(local.defaultLock ?? false);
	const [rawMode, setRawMode] = createSignal(local.defaultRawMode ?? false);
	const [hasToggleList, setHasToggleList] = createSignal(Object.keys(local.toggleList ?? {}).length > 0);
	const [size, setSize] = createSignal({
		width: props.width ?? "864px",
		height: props.height ?? "620px"
	});
	// 切换显示模式
	const toggleRawMode = () => {
		setRawMode(!rawMode());
		if (local.onChangeRawMode) {
			local.onChangeRawMode(rawMode());
		}
	};
	// 切换窗口大小
	const toggleSize = (sizeText: string[]) => {
		setSize({
			width: sizeText[0] + "px",
			height: sizeText[1] + "px",
		});
		SaveConfig("size_" + local.eventName, sizeText[0] + "px" + "," + sizeText[1] + "px");
	};
	// 拖拽相关
	let dragable = false;
	let dragPanel: Panel & { offsetX?: number, offsetY?: number; } | undefined = undefined;
	const dragStart = (panel: Panel & { dragable?: boolean; }) => {
		if (local.hasDragable != false) {
			dragable = true;
			let parent = panel.FindAncestor(local.eventName);
			if (parent) {
				dragPanel = parent;
				dragTimer();
			}
		}
	};
	const dragTimer = () => {
		if (dragable) {
			if (dragPanel != undefined && dragPanel.IsValid()) {
				if (GameUI.IsMouseDown(0)) {
					let position = GameUI.GetCursorPosition();
					if (dragPanel.offsetX == undefined || dragPanel.offsetY == undefined) {
						dragPanel.offsetX = dragPanel.GetPositionWithinWindow().x - position[0];
						dragPanel.offsetY = dragPanel.GetPositionWithinWindow().y - position[1];
						dragPanel.style.align = "left top";
						dragPanel.style.margin = "0px 0px 0px 0px";
					}
					if (dragPanel.offsetX != undefined && dragPanel.offsetY != undefined) {
						dragPanel.SetPositionInPixels((position[0] + dragPanel.offsetX) / dragPanel.actualuiscale_x, (position[1] + dragPanel.offsetY) / dragPanel.actualuiscale_y, 0);
					}
				} else {
					dragPanel.offsetX = undefined;
					dragPanel.offsetY = undefined;
				}
				$.Schedule(Game.GetGameFrameTime(), dragTimer);
			}
		} else {
			dragPanel = undefined;
		}
	};
	return (
		<Panel id={local.eventName} class={classNames("SelectionContainer", { LockWindow: lock() })} hittest={true} width={size().width} height={size().height}>
			<Panel id="SelectionPicker" >
				<Panel id="SelectionPickerHeader" onactivate={() => { }} onmouseover={self => dragStart(self)} onmouseout={self => dragable = false} >
					<Label id="SelectionTitle" text={local.title} />
					<Panel class="FillWidth" />
					{local.hasFilter != false &&
						<Panel id="SelectionSearch" class="SearchBox" >
							<Show when={hasToggleList()}>
								<EOM_DropDown placeholder="筛选" onChange={(index, item) => {
									if (local.onToggleType) {
										local.onToggleType(Object.keys(local.toggleList ?? {})[index - 1]);
									}
								}} onClear={() => {
									if (local.onToggleType) {
										local.onToggleType("");
									}
								}}>
									<Label id="EOM_DropDown_Clear" text="X 清除筛选" />
									<For each={Object.keys(local.toggleList ?? {})}>
										{(key, index) => (
											// @ts-ignore
											<Label text={local.toggleList?.[key] ?? ""} />
										)}
									</For>
								</EOM_DropDown>
							</Show>
							<TextEntry id="SelectionSearchTextEntry" borderLeftWidth={hasToggleList() ? "0px" : "1px"} placeholder="#DOTA_Search" onload={self => {
								self.SetDisableFocusOnMouseDown(false);
							}} oninputsubmit={(self) => {
								if (local.onSearch) {
									local.onSearch(self.text);
								}
							}} ontextentrychange={(self) => {
								if (self.text == "") {
									if (local.onSearch) {
										local.onSearch("");
									}
								}
							}} />
						</Panel>
					}
					{/* 功能按钮 */}
					{local.hasRawMode != false &&
						<Panel class="CodeModeLabel" tooltip={"查看内部编码"} tooltipPosition="top" height="28px" verticalAlign="center">
							<TextButton fontSize="20px" width="27px" height="27px" marginTop="2px" text={rawMode() ? "汉" : "Aa"} onactivate={() => toggleRawMode()} />
						</Panel>
					}
					{local.hasToggleSize != false &&
						<EOM_IconButton width="30px" tooltip={"切换窗口大小"} tooltipPosition="top" icon={<EOM_Icon type="ArrowExpand" />} >
							<EOM_DropDown id="ToggleSize" onChange={(index, item) => { toggleSize(item.text.split("x")); }}>
								<Label text={"1280x720"} />
								<Label text={"864x620"} />
								<Label text={"620x360"} />
								<Label text={"620x620"} />
							</EOM_DropDown>
						</EOM_IconButton>
					}
					{local.hasLock != false &&
						<EOM_IconButton width="28px" verticalAlign="center" tooltip={"锁定窗口"} tooltipPosition="top" class={classNames("LockIconButton", { Unlock: !lock() })} icon={<EOM_Icon verticalAlign="center" width="28px" height="28px" type="LockSmall" />} onactivate={() => setLock(!lock())} />
					}
					<EOM_IconButton width="28px" verticalAlign="center" tooltip={"关闭窗口"} tooltipPosition="top" icon={<EOM_Icon type="XClose" />} onactivate={() => ToggleSelection(local.eventName)} />
				</Panel>
				{/* 物品列表 */}
				<Panel id="SelectionList" overflow={local.canScroll ? "squish scroll" : "clip"} >
					{props.children}
				</Panel>
			</Panel>
		</Panel>
	);
};

export const EOM_DebugTool_TextPicker: ParentComponent<{
	/** 事件名 */
	eventName: string;
	/** 列表 */
	itemNames?: string[];
	/** 窗口标题 */
	title: string;
	/** 分类 */
	toggleList?: {
		/** type是分类，后面实际显示的描述 */
		[toggleType: string]: string;
	};
	/** 过滤器 */
	filterFunc?: (toggleType: string, itemName: string) => boolean;
	// 切换toggle callback
	toggleCallback?: (toggleType: string) => void;
	// event额外参数
	extraEventParams?: Table;
	// 特殊tooltipText
	tooltipText?: (str: string) => string;
}> = (props) => {
	const [rawMode, setRawMode] = createSignal(false);
	const [filterWord, setFilterWord] = createSignal("");
	const [toggleType, setToggleType] = createSignal("");
	const visiable = (itemName: string) => {
		if (props.filterFunc) {
			if (!props.filterFunc(toggleType(), itemName)) {
				return false;
			}
		}
		if (itemName.search(filterWord()) == -1 && GetLocalization("#" + itemName,).search(filterWord()) == -1) {
			return false;
		}
		return true;
	};
	createEffect(() => {
		if (props.toggleCallback) {
			if (toggleType() != "") {
				props.toggleCallback(toggleType());
			}
		}
	});
	return (
		<SelectionContainer
			eventName={props.eventName}
			title={props.title}
			hasFilter
			toggleList={props.toggleList}
			onChangeRawMode={rawMode => setRawMode(rawMode)}
			onSearch={text => setFilterWord(text)}
			onToggleType={text => setToggleType(text)}
		// width="620px"
		// height="360px"
		>
			<Panel class="EOM_DebugTool_TextPicker" flowChildren="right-wrap" width="100%" height="100%" scroll="y" >
				<For each={props.itemNames}>
					{(itemName, index) => <TextButton visible={visiable(itemName)} class="EOM_DebugTool_TextPickerItem" text={rawMode() ? itemName : ("#" + itemName)} tooltip_text={props.tooltipText ? props.tooltipText(itemName) : "#" + itemName + "_description"} onactivate={self => FireEvent(props.eventName, itemName, props.extraEventParams)} />}
				</For>
			</Panel>
		</SelectionContainer>
	);
};

/** 技能选择 */
export const EOM_DebugTool_AbilityPicker: ParentComponent<{
	/** 事件名 */
	eventName: string;
	/** 列表 */
	itemNames?: string[];
	/** 窗口标题 */
	title: string;
	/** 分类 */
	toggleList?: {
		/** type是分类，后面实际显示的描述 */
		[toggleType: string]: string;
	};
	/** 过滤器 */
	filterFunc?: (toggleType: string, itemName: string) => boolean;
}> = (props) => {
	const [local, other] = splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "itemNames"]);
	const [filterWord, setFilterWord] = createSignal("");
	const [toggleType, setToggleType] = createSignal("");
	const [rawMode, setRawMode] = createSignal(false);
	return (
		<SelectionContainer
			eventName={local.eventName}
			title={local.title}
			toggleList={local.toggleList}
			onSearch={text => setFilterWord(text)}
			onToggleType={text => setToggleType(text)}
			onChangeRawMode={rawMode => setRawMode(rawMode)}
		>
			<Panel class="EOM_DebugTool_AbilityPicker" flowChildren="right-wrap" width="100%" scroll="y" >
				{local.itemNames?.map((abilityname, index) => {
					if (local.filterFunc) {
						if (!local.filterFunc(toggleType(), abilityname)) {
							return;
						}
					}
					if (filterWord() != "") {
						if (abilityname.search(new RegExp(filterWord(), "gim")) == -1 && GetLocalization("#DOTA_Tooltip_ability_" + abilityname).search(new RegExp(filterWord(), "gim")) == -1) {
							return;
						}
					}
					return (
						<EOM_BaseButton class="EOM_DebugTool_AbilityPickerItem" width="64px" flowChildren="down" onactivate={self => FireEvent(local.eventName, abilityname)} onmouseover={p => CustomUIConfig.ShowAbilityTooltip<AbilityTooltip>(p, { abilityname: abilityname })} onmouseout={p => CustomUIConfig.HideAbilityTooltip(p)}>
							<DOTAAbilityImage abilityname={abilityname} showtooltip={false} />
							<Label class="EOM_DebugTool_AbilityPickerItemName" text={rawMode() ? abilityname : "#DOTA_Tooltip_ability_" + abilityname} />
						</EOM_BaseButton>
					);
				})}
			</Panel>
		</SelectionContainer>
	);
};

/** 选择物品 */
export const EOM_DebugTool_ItemPicker: ParentComponent<{
	/** 事件名 */
	eventName: string;
	/** 列表 */
	itemNames?: string[];
	/** 窗口标题 */
	title: string;
	/** 分类 */
	toggleList?: {
		/** type是分类，后面实际显示的描述 */
		[toggleType: string]: string;
	};
	/** 过滤器 */
	filterFunc?: (toggleType: string, itemName: string) => boolean;
}> = (props) => {
	const [local, other] = splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "itemNames"]);
	const [filterWord, setFilterWord] = createSignal("");
	const [toggleType, setToggleType] = createSignal("");
	const [rawMode, setRawMode] = createSignal(false);
	const visiable = (abilityname: string) => {
		if (local.filterFunc) {
			if (!local.filterFunc(toggleType(), abilityname)) {
				return false;
			}
		}
		if (filterWord() != "") {
			if (abilityname.search(new RegExp(filterWord(), "gim")) == -1 && GetLocalization("#DOTA_Tooltip_ability_" + abilityname).search(new RegExp(filterWord(), "gim")) == -1) {
				return false;
			}
		}
		return true;
	};

	return (
		<SelectionContainer
			eventName={local.eventName}
			title={local.title}
			toggleList={local.toggleList}
			onSearch={text => setFilterWord(text)}
			onToggleType={text => setToggleType(text)}
			onChangeRawMode={rawMode => setRawMode(rawMode)}
			canScroll={false}
		>
			<Panel width={"100%"} height="100%" margin="-6px" backgroundColor="#00000066" >
				<Panel class="EOM_DebugTool_AbilityPicker" marginTop="10px" paddingTop="30px" flowChildren="right-wrap" width="100%" scroll="y" >
					<For each={local.itemNames}>
						{(abilityname, index) => <EOM_BaseButton visible={visiable(abilityname)} class="EOM_DebugTool_AbilityPickerItem" width="64px" flowChildren="down" onactivate={self => FireEvent(local.eventName, abilityname)} onmouseover={p => CustomUIConfig.ShowAbilityTooltip<AbilityShopItemTooltip>(p, { abilityname: abilityname, guidename: "", entityindex: -1 as EntityIndex })} onmouseout={p => CustomUIConfig.HideAbilityTooltip(p)}>
							<DOTAItemImage itemname={abilityname} showtooltip={false} />
							<Label class="EOM_DebugTool_AbilityPickerItemName" text={rawMode() ? abilityname : "#DOTA_Tooltip_ability_" + abilityname} />
						</EOM_BaseButton>}
					</For>
				</Panel>
			</Panel >
		</SelectionContainer>
	);
};

export const EOM_UnitInfo: ParentComponent = (props) => {
	let panel: Panel | undefined;
	const [tabIndex, setTabIndex] = createSignal(0);
	const [unitInfo, setUnitInfo] = createStore({
		entIndex: -1 as EntityIndex,
		name: "",
		className: "",
		position: "0 0 0",
		forward: "0 0 0",
		health: "0",
		maxHealth: "0",
		mana: 0,
		maxMana: 0,
		attack: "0",
		attackrange: "0",
		armor: "0",
		reducePct: "0",
		attackSpeed: 0,
		baseAttackTime: "0",
		movespeed: "0",
		cooldown: "0%",
		hullRadius: 0,
		vision: "0",
		outgoingPhysical: "",
		outgoingMagical: "",
		critChance: "",
		critDamage: "",
		lifesteal: "",
		phylifesteal: "",
		maglifesteal: "",
		goldPct: "",
		crystalPct: "",
		scorePct: "",
		respawn: "",
		summonPct: "",
		AttackPerKill: "",
		PowerPerKill: "",
		HealthPerKill: "",
		StrPerKill: "",
		AgiPerKill: "",
		IntPerKill: "",
		AttackPerSec: "",
		PowerPerSec: "",
		HealthPerSec: "",
		StrPerSec: "",
		AgiPerSec: "",
		IntPerSec: "",
		AttackPerAttack: "",
		PowerPerAttack: "",
		HealthPerAttack: "",
		StrPerAttack: "",
		AgiPerAttack: "",
		IntPerAttack: "",
		physicalPerMin: "",
		magicalPerMin: "",
		critDamagePerMin: "",
		dropLucky: "",
		rarityLucky: "",
		monster: "",
		modifiers: {} as string[],
		abilities: [] as AbilityEntityIndex[],
		devouredList: [] as ItemEntityIndex[],

		// 英雄相关
		isHero: false,
		str: "0",
		agi: "0",
		int: "0",
	});
	const Update = () => {
		const entIndex = Players.GetLocalPlayerPortraitUnit();
		if (entIndex != -1 && panel?.FindAncestor("EOM_UnitInfo")?.BHasClass("Show")) {
			// const position = Entities.GetAbsOrigin(entIndex);
			// const forward = Entities.GetForward(entIndex);

			// const healthPct = Entities.GetHealth(entIndex) / Entities.GetMaxHealth(entIndex);
			// const minHealth = Entities.IsAlive(entIndex) ? 1 : 0;
			// const maxHealth = toFiniteNumber(Entities.GetUnitData(entIndex, "GetHealth"));
			// const healthLabel = FormatNumber(Math.max(minHealth, Math.floor(healthPct * maxHealth)));
			// const maxHealthLabel = FormatNumber(Math.floor(maxHealth));

		}
	};
	const onDragStart = (source: Panel, dragCallbacks: IDragCallbacks) => {
		const displayPanel = $.CreatePanel("Image", source, "DragPanel", { src: "panel://" + source.id });
		dragCallbacks.displayPanel = displayPanel;
		SaveData(displayPanel, "abilityname", source.id.replace("Drag", ""));
		return true;
	};
	const onDragDrop = (source: Panel, draggedPanel: Panel) => {
		if (source.BHasClass("DOTAAbilityImage")) {
			const targetAbility = source.id.replace("Drag", "");
			const draggedAbility = LoadData(draggedPanel, "abilityname");
			if (draggedAbility != targetAbility) {
				FireEvent("UnitInfoSwitchAbility", draggedAbility + "," + targetAbility);
			}
		}
	};
	const onDragEnd = (source: Panel, draggedPanel: Panel) => {
		draggedPanel.DeleteAsync(-1);
	};

	onMount(() => {
		const timer = setInterval(Update, 100);
		onCleanup(() => clearInterval(timer));
	});
	return (
		<SelectionContainer
			eventName={"EOM_UnitInfo"}
			title={"单位信息面板"}
			width="480px"
			height="620px"
			hasRawMode={false}
			hasToggleSize={false}
			hasFilter={false}
		>
			<Panel width="100%" height="100%" ref={panel}>
				<EOM_Breadcrumb list={["实体信息", "Modifier", "技能", "吞噬物品"]} onChange={(index, name) => {
					setTabIndex(index);
				}} />
				<Panel id="EntInfo" class="UnitInfoTab" classList={{ Show: tabIndex() == 0 }}>
					<EOM_UnitInfoRow key="实体ID" value={unitInfo.entIndex} />
					<EOM_UnitInfoRow key="实体名" value={unitInfo.name} />
					<EOM_UnitInfoRow key="实体类名" value={unitInfo.className} />
					<EOM_UnitInfoRow key="位置" value={unitInfo.position} eventName="UnitInfoPosition" />
					<EOM_UnitInfoRow key="朝向" value={unitInfo.forward} eventName="UnitInfoForward" />
					<EOM_UnitInfoRow key="生命" value={unitInfo.health + " / " + unitInfo.maxHealth} eventType="Add" eventName="UnitInfoHealth" />
					<EOM_UnitInfoRow key="魔法" value={unitInfo.mana + " / " + unitInfo.maxMana} eventType="Add" eventName="UnitInfoMana" />
					<EOM_UnitInfoRow key="攻击力" value={unitInfo.attack} eventType="Add" eventName="UnitInfoAttack" />
					<EOM_UnitInfoRow key="攻速" value={unitInfo.attackSpeed} eventType="Add" eventName="UnitInfoAttackSpeed" />
					<EOM_UnitInfoRow key="攻击间隔" value={unitInfo.baseAttackTime} eventName="UnitInfoAttackTime" />
					<EOM_UnitInfoRow key="攻击距离" value={unitInfo.attackrange} eventType="Add" eventName="UnitInfoAttackRange" />
					<EOM_UnitInfoRow key="物理输出" value={`${unitInfo.outgoingPhysical} (+${unitInfo.physicalPerMin}%每分钟)`} eventType="Add" eventName="UnitInfoPhysicalDamage" />
					<EOM_UnitInfoRow key="魔法输出" value={`${unitInfo.outgoingMagical} (+${unitInfo.physicalPerMin}%每分钟)`} eventType="Add" eventName="UnitInfoMagicalDamage" />
					<EOM_UnitInfoRow key="暴击率" value={unitInfo.critChance} eventName="UnitInfoCritChance" />
					<EOM_UnitInfoRow key="暴击伤害" value={`${unitInfo.critDamage} (+${unitInfo.critDamagePerMin}%每分钟)`} eventName="UnitInfoCritDamage" />
					<EOM_UnitInfoRow key="护甲" value={unitInfo.armor} eventType="Add" eventName="UnitInfoArmor" />
					<EOM_UnitInfoRow key="受到伤害" value={unitInfo.reducePct} />
					<EOM_UnitInfoRow key="移速" value={unitInfo.movespeed} eventName="UnitInfoMoveSpeed" />
					<EOM_UnitInfoRow key="冷却缩减" value={unitInfo.cooldown} eventType="Add" eventName="UnitInfoCooldownReduction" />
					<EOM_UnitInfoRow key="碰撞体积" value={unitInfo.hullRadius} />
					<EOM_UnitInfoRow key="视野" value={unitInfo.vision} />
					<Show when={unitInfo.isHero}>
						<EOM_UnitInfoRow key="力量" value={unitInfo.str} eventType="Add" eventName="UnitInfoStrength" />
						<EOM_UnitInfoRow key="敏捷" value={unitInfo.agi} eventType="Add" eventName="UnitInfoAgility" />
						<EOM_UnitInfoRow key="智力" value={unitInfo.int} eventType="Add" eventName="UnitInfoIntellect" />
						<EOM_UnitInfoRow key="吸血概率" value={unitInfo.lifesteal} />
						<EOM_UnitInfoRow key="物理吸血" value={unitInfo.phylifesteal} />
						<EOM_UnitInfoRow key="魔法吸血" value={unitInfo.maglifesteal} />
						<EOM_UnitInfoRow key="金币百分比" value={unitInfo.goldPct} />
						<EOM_UnitInfoRow key="荣耀百分比" value={unitInfo.scorePct} />
						<EOM_UnitInfoRow key="复活时间" value={unitInfo.respawn} />
						<EOM_UnitInfoRow key="攻击成长" value={`击杀：${unitInfo.AttackPerKill} | 每秒：${unitInfo.AttackPerSec} | 攻击：${unitInfo.AttackPerAttack}`} />
						<EOM_UnitInfoRow key="法强成长" value={`击杀：${unitInfo.PowerPerKill} | 每秒：${unitInfo.PowerPerSec} | 攻击：${unitInfo.PowerPerAttack}`} />
						<EOM_UnitInfoRow key="生命成长" value={`击杀：${unitInfo.HealthPerKill} | 每秒：${unitInfo.HealthPerSec} | 攻击：${unitInfo.HealthPerAttack}`} />
						<EOM_UnitInfoRow key="力量成长" value={`击杀：${unitInfo.StrPerKill} | 每秒：${unitInfo.StrPerSec} | 攻击：${unitInfo.StrPerAttack}`} />
						<EOM_UnitInfoRow key="敏捷成长" value={`击杀：${unitInfo.AgiPerKill} | 每秒：${unitInfo.AgiPerSec} | 攻击：${unitInfo.AgiPerAttack}`} />
						<EOM_UnitInfoRow key="智力成长" value={`击杀：${unitInfo.IntPerKill} | 每秒：${unitInfo.IntPerSec} | 攻击：${unitInfo.IntPerAttack}`} />
						<EOM_UnitInfoRow key="召唤伤害" value={unitInfo.summonPct} />
						<EOM_UnitInfoRow key="金币怪数量" value={unitInfo.monster} />
						<EOM_UnitInfoRow key="掉落幸运" value={unitInfo.dropLucky} />
						<EOM_UnitInfoRow key="稀有度幸运" value={unitInfo.rarityLucky} />
					</Show>
				</Panel>
				<Panel id="ModifierList" class="UnitInfoTab" classList={{ Show: tabIndex() == 1 }}>
					<Panel class="EOM_UnitInfoModifierRow">
						<Label class="EOM_UnitInfoModifierName" text="名" />
						<Label class="EOM_UnitInfoModifierCount" text="层数" />
						<Label class="EOM_UnitInfoModifierAction" text="操作" />
					</Panel>
					<For each={unitInfo.modifiers}>
						{(modifier, index) => {
							const [name, count] = modifier.split(",");
							return <EOM_UnitInfoModifierRow name={name} count={count} />;
						}}
					</For>
				</Panel>
				<Panel id="AbilityList" class="UnitInfoTab" classList={{ Show: tabIndex() == 2 }}>
					<For each={unitInfo.abilities}>
						{(abilityIndex, index) => {
							if (abilityIndex != -1) {
								const abilityName = Abilities.GetAbilityName(abilityIndex);
								const abilityentityindex = abilityIndex;
								return <Panel class="AbilityActionPanel">
									<Panel id={"Drag" + abilityName} draggable
										onDragStart={onDragStart}
										onDragDrop={onDragDrop}
										onDragEnd={onDragEnd}
									>
										<DOTAAbilityImage id={"Drag" + abilityName} class="DOTAAbilityImage" abilityname={abilityName} showtooltip={false} onmouseover={(p) => CustomUIConfig.ShowAbilityTooltip<AbilityEntityTooltip>(p, { abilityentityindex: abilityentityindex })} onmouseout={(p) => CustomUIConfig.HideAbilityTooltip(p)} />
									</Panel>
									<Button class="AbilityActionButton DemoButton GreenButton" onactivate={self => FireEvent("UnitInfoUpgradeAbility", String(abilityIndex))}>
										<Label text="升级" />
									</Button>
									<Button class="AbilityActionButton DemoButton RedButton" onactivate={self => FireEvent("UnitInfoRemoveAbility", String(abilityIndex))}>
										<Label text="删除" />
									</Button>
								</Panel>;
							}
						}}
					</For>
				</Panel>
				<Panel id="DevouredList" class="UnitInfoTab" classList={{ Show: tabIndex() == 3 }}>
					<For each={unitInfo.devouredList}>
						{(itemIndex, index) => {
							if (itemIndex != -1) {
								const abilityName = Abilities.GetAbilityName(itemIndex);
								const abilityentityindex = itemIndex;
								return <Panel class="DevouredItemActionPanel">
									<DOTAItemImage id={"Drag" + abilityName} itemname={abilityName} showtooltip={false} onmouseover={(p) => CustomUIConfig.ShowAbilityTooltip<AbilityEntityTooltip>(p, { abilityentityindex: abilityentityindex, entityindex: unitInfo.entIndex })} onmouseout={(p) => CustomUIConfig.HideAbilityTooltip(p)} />
									<Button class="DevouredItemActionButton DemoButton GreenButton" onactivate={self => FireEvent("UnitInfoReleaseDevouredItem", String(itemIndex))}>
										<Label text="吐出" />
									</Button>
									<Button class="DevouredItemActionButton DemoButton RedButton" onactivate={self => FireEvent("UnitInfoRemoveDevouredItem", String(itemIndex))}>
										<Label text="删除" />
									</Button>
								</Panel>;
							}
						}}
					</For>
				</Panel>
			</Panel>
		</SelectionContainer>
	);
};

/** 单位信息面板实体信息行 */
const EOM_UnitInfoRow: ParentComponent<{
	key: string,
	value: string | number,
	eventName?: string,
	eventType?: string,
}> = (props) => {
	let label: LabelPanel | undefined;
	let entry: TextEntry | undefined;
	const [edit, setEdit] = createSignal(false);
	return <Panel class="EOM_UnitInfoRow" classList={{ Editable: props.eventName != undefined, Editing: edit() }}>
		<Label class="EOM_UnitInfoKey" text={props.key} />
		<Label ref={label} class="EOM_UnitInfoValue" visible={!edit()} text={props.value} />
		<EOM_TextEntry ref={entry} class="EOM_UnitInfoValue" visible={edit()} oninputsubmit={self => {
			FireEvent(props.eventName!, self.text);
			setEdit(false);
			$.DispatchEvent("DropInputFocus", self);
		}} />
		<Image class="EOM_UnitInfoEdit" classList={{ Add: props.eventType == "Add" }} onactivate={self => {
			if (!edit() && entry && label && props.eventType == undefined) {
				entry.text = label.text;
			}
			setEdit(!edit());
			entry?.SetFocus();
			entry?.SetFocus();
		}} />
	</Panel>;
};

/** 单位信息面板状态信息行 */
const EOM_UnitInfoModifierRow: ParentComponent<{
	name: string,
	count: string;
}> = (props) => {
	return <Panel class="EOM_UnitInfoModifierRow" tooltip_text={props.name}>
		<Label class="EOM_UnitInfoModifierName" text={props.name} />
		<Label class="EOM_UnitInfoModifierCount" text={props.count} />
		<Panel class="EOM_UnitInfoModifierAction">
			<Button class="ModifierActionButton DemoButton GreenButton" onactivate={self => FireEvent("UnitInfoRefreshModifier", props.name)}>
				<Label text="刷新" />
			</Button>
			<Button class="ModifierActionButton DemoButton RedButton" onactivate={self => FireEvent("UnitInfoRemoveModifier", props.name)}>
				<Label text="移除" />
			</Button>
		</Panel>
	</Panel>;
};