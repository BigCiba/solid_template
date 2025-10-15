import classNames from "classnames";
import { Index, ParentComponent, Show, batch, createEffect, createSignal, mergeProps, on, onCleanup, onMount, splitProps, untrack } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import { CLabel } from "../../../EOMChildren";
import { ADDON_NAME, EOMProps, EOM_Attribute } from "../../EOMDesign";
import { EOM_CloseButton } from "../../Input/EOM_Button/EOM_Button";
import "./EOM_MenuLayout.less";

/** 【store】 */
export const useEOM_MenuLayout = (eventName: string) => {
	const [show, setShow] = createSignal(false);
	const [menuName, setMenuName] = createSignal(false);
	onMount(() => {
		let gameEventIDList: GameEventListenerID[] = [];
		// 切换窗口
		gameEventIDList.push(useToggleWindow(eventName, show, setShow));

		onCleanup(() => {
			for (const id of gameEventIDList) {
				GameEvents.Unsubscribe(id);
			}
		});
	});
	return {
		show,
		setShow,
	};
};

export interface EOM_MenuLayoutProps extends EOM_Attribute {
	// 隐藏或显示
	show: boolean;
	/** 面板名字，用来关闭界面 */
	name: string;
	/** 预设的款式 */
	type?: "Tui12";

	backgroundChildren?: JSX.Element[];
	renderOnShow?: boolean;
	close?: () => void;
}

/** 【布局】全屏的二级界面，拥有导航菜单栏 */
export const EOM_MenuLayout: ParentComponent<EOM_MenuLayoutProps> = (props) => {
	const merged = mergeProps({ type: ADDON_NAME, renderOnShow: false }, props);
	const [local, others] = splitProps(merged, ["children", "renderOnShow", "type", "name", "show", "close"]);
	return (
		<Panel {...EOMProps(others, {
			className: classNames("EOM_MenuLayout", local.type, { Show: local.show }),
		})} onactivate={() => { }}>
			{props.backgroundChildren}
			<Image id="TopBottomBG" hittest={false} />
			<EOM_CloseButton onactivate={self => {
				if (local.close != undefined) {
					local.close();
				} else {
					GameEvents.SendEventClientSide("custom_ui_toggle_windows", { window_name: local.name, state: 0 });
				}
			}} />
			<Show when={(!local.renderOnShow || props.show)}>
				{untrack(() => local.children)}
			</Show>
		</Panel>
	);
};

export interface EOM_MenuLayout_MenuProps extends EOM_Attribute {
	/** 二级菜单 */
	menuList: Record<string, string[]>;
	/** 切换菜单的回调 */
	onToggleMenu?: (menu: string, menu2?: string) => void;
	/** 预设的款式 */
	type?: "Tui12";
	/** 指定选择某个menu，功能可以是指定初始选择，也可以通过更新该值在外部控制当前选择项 */
	selectedMenu?: string;
	selectedMenu2?: string;
	menuName?: string;
	/** 按键的专属角标 */
	mark_icon?: (menu: string, menu2?: string) => JSX.Element | undefined;
	show?: boolean;
}
function getCombineMenuTag(menu: string, menu2?: string) {
	return `${menu}&${menu2}`;
}
function splitCombineMenuTag(unique: string) {
	let [menu, menu2] = unique.split("&");
	return [menu, menu2];
}
function registerMenuMarkStore(menuName?: string): [Record<string, string | null>, SetStoreFunction<Record<string, string | null>>] {
	if (menuName) {
		const context = $.GetContextPanel();
		if (context?.IsValid()) {
			let storeGroup = LoadData(context, `menuMarkStore`) as [get: Record<string, string | null>, set: SetStoreFunction<Record<string, string | null>>];
			if (storeGroup == undefined) {
				storeGroup = createStore<Record<string, string | null>>({});
				SaveData(context, `menuMarkStore`, storeGroup);
			}
			return storeGroup;
		}
	}
	return [{}, () => { }];
};
/** 【布局】菜单栏 */
export const EOM_MenuLayout_Menu: ParentComponent<EOM_MenuLayout_MenuProps> = (props) => {
	const merged = mergeProps({ type: ADDON_NAME, menuList: [] }, props);
	const [local, others] = splitProps(merged, ["type", "menuList", "onToggleMenu", "selectedMenu", "selectedMenu2", "menuName", "mark_icon", "show"]);
	const [menuSelected, setMenuSelected] = createSignal(Object.keys(local.menuList)[0] ?? "");

	let [markNewInfo, setMarkNewInfo] = registerMenuMarkStore(local.menuName);
	createEffect(on(() => local.menuName, v => {
		[markNewInfo, setMarkNewInfo] = registerMenuMarkStore(v);
	}));
	const [exclamationList, setExclamationList] = createSignal<string[]>([]);
	const sLanguage = $.Language().toLowerCase();
	//const [tMenuSelected2, setMenuSelected2] = createStore<Record<string, string>>({});
	//const getMenuSelected2 = () => {
	//	let result: Record<string, string> = {};
	//	if (local.menuList != undefined) {
	//		for (const key in local.menuList) {
	//			const element = local.menuList[key];
	//			result[key] = element[0];
	//		}
	//	}

	//	return result;
	//};
	const [menuSelected2, setMenuSelected2] = createStore<Record<string, string>>({});
	let opened = false;
	const hideAllMark = () => {
		if (markNewInfo) {
			if (local.menuName) {
				for (const combineTag in markNewInfo) {
					const [menu, menu2] = splitCombineMenuTag(combineTag);
					if (markNewInfo[combineTag]) {
						// clickNewMark({
						// 	menu: local.menuName,
						// 	tag: menu,
						// });
					}
					setMarkNewInfo(combineTag, null);
				}
			}
		}
		setExclamationList([]);
	};
	createEffect(on(() => local.show, v => {
		if (!v && opened) {
			batch(() => {
				hideAllMark();
			});
		} else if (v) {
			opened = true;
		}
	}));
	// createEffect(on(menuSelected, menu_1 => {
	// 	$.Schedule(0.1, () => {
	// 		checkExclamation(menu_1);
	// 	});
	// }));
	// createEffect(on(() => menuSelected2, _menuSelected2 => {
	// 	let menu1 = menuSelected();
	// 	let menu2 = _menuSelected2[menuSelected()];
	// 	$.Schedule(0.1, () => {
	// 		checkExclamation(menu1, menu2);
	// 	});
	// }));
	createEffect(() => {
		if (local.onToggleMenu) {
			//print("onToggleMenu")
			//print(menuSelected(), menuSelected2[menuSelected()])
			local.onToggleMenu(menuSelected(), menuSelected2[menuSelected()]);
		}
		// if (markNewInfo[menuSelected()] != undefined) {
		// 	GameEvents.SendCustomEventToServer("click_new_mark", { mid: markNewInfo[menuSelected()] });
		// 	setMarkNewInfo({ [menuSelected()]: undefined });
		// }
	});
	createEffect(on(() => local.selectedMenu, () => {
		if (local.selectedMenu != undefined) {
			setMenuSelected(local.selectedMenu);
		}
	}));
	createEffect(on(() => local.menuList, (list) => {
		let result: Record<string, string> = {};
		if (list) {
			for (const key in list) {
				const element = list[key];
				result[key] = element[0];
			}
			setMenuSelected2(result);
		}
	}))

	createEffect(on(() => local.selectedMenu2, (menu) => {
		if (menu != undefined && menu != "") {
			setMenuSelected2(menuSelected(), menu);
		}
	}));

	// new_mark_info标记
	// const updateNewMarkInfo = (data: NetDataDeclarations["player_new_mark"]) => {
	// 	if (data) {
	// 		batch(() => {
	// 			for (const mid in data) {
	// 				const state = data[mid];
	// 				const kv = KeyValues.NewMarkInfoKv[mid];
	// 				if (kv != undefined) {
	// 					if (kv.menu_button != undefined && kv.menu_button == local.menuName && kv.tag_id != undefined && local.menuList[kv.tag_id] != undefined) {
	// 						let menu2Tag: string | undefined;
	// 						if (kv.benchmark != undefined && local.menuList[kv.tag_id].length > 0) {
	// 							menu2Tag = local.menuList[kv.tag_id].find(v => v.includes(kv.benchmark));
	// 						}
	// 						let unique1 = getCombineMenuTag(kv.tag_id);
	// 						let unique2 = getCombineMenuTag(kv.tag_id, menu2Tag);
	// 						if (state) {
	// 							if (markNewInfo[unique1] === undefined) {
	// 								setMarkNewInfo(unique1, kv.type);
	// 							}
	// 							if (menu2Tag && markNewInfo[unique2] === undefined) {
	// 								setMarkNewInfo(unique2, kv.type);
	// 							}
	// 						} else {
	// 							if (markNewInfo[unique1]) {
	// 								setMarkNewInfo(unique1, null);
	// 							}
	// 							if (menu2Tag && markNewInfo[unique2]) {
	// 								setMarkNewInfo(unique2, null);
	// 							}
	// 						}
	// 					}
	// 				}
	// 			}
	// 		});
	// 	}
	// };

	// onMount(() => {
	// 	let gameEventIDList: GameEventListenerID[] = [];
	// 	let netTableIDList: NetTableListenerID[] = [];
	// 	gameEventIDList.push(GameEvents.Subscribe("custom_ui_exclamation", (event) => {
	// 		if (Object.keys(props.menuList).includes(event.name) || Object.values(props.menuList).some(v => v.includes(event.name))) {
	// 			setExclamationList(exclamationList().concat([event.name]));
	// 		}
	// 	}));
	// 	if (local.menuName != undefined) {
	// 		netTableIDList.push(useServiceNetTable("player_new_mark", (data) => {
	// 			updateNewMarkInfo(data);
	// 		}, Players.GetLocalPlayer()));
	// 		gameEventIDList.push(useClientSideEvent("create_new_mark_info", (data: Record<string, boolean>) => {
	// 			updateNewMarkInfo(data);
	// 		}));
	// 	}

	// 	onCleanup(() => {
	// 		hideAllMark();
	// 		gameEventIDList.forEach(id => GameEvents.Unsubscribe(id));
	// 	});
	// });
	// const checkExclamation = (_menu: string, _menu2?: string) => {
	// 	batch(() => {
	// 		let menu = getCombineMenuTag(_menu);
	// 		let menu2 = getCombineMenuTag(_menu, _menu2);
	// 		if (local.menuName != undefined) {
	// 			if (menu2 && markNewInfo[menu2]) {
	// 				if (markNewInfo[menu]) {
	// 					setMarkNewInfo(menu, null);
	// 				}
	// 				setMarkNewInfo(menu2, null);
	// 				clickNewMark({
	// 					menu: local.menuName,
	// 					tag: _menu,
	// 					benchmark: _menu2,
	// 				});
	// 			} else {
	// 				if (markNewInfo[menu]) {
	// 					setMarkNewInfo(menu, null);
	// 					clickNewMark({
	// 						menu: local.menuName,
	// 						tag: _menu,
	// 					});
	// 				}
	// 			}
	// 		}
	// 		if (exclamationList().length > 0) {
	// 			let index = exclamationList().indexOf(menu);
	// 			let list = [...exclamationList()];
	// 			let flag = false;
	// 			if (index != -1) {
	// 				list.splice(index, 1);
	// 				flag = true;
	// 			}
	// 			if (menu2) {
	// 				let index = exclamationList().indexOf(menu2);
	// 				if (index != -1) {
	// 					list.splice(index, 1);
	// 					flag = true;
	// 				}
	// 			}
	// 			if (flag) {
	// 				setExclamationList(list);
	// 			}
	// 		}
	// 	});
	// };

	const [_key, SetKey] = createSignal(1);
	onMount(() => {
		let gameEventIDList: GameEventListenerID[] = [];
		let netTableIDList: NetTableListenerID[] = [];
		gameEventIDList.push(CustomUIConfig.SubscribeRedPointChange((menuName) => {
			SetKey(k => k + 1);
		}, props.menuName));
	});

	return (
		<Panel {...EOMProps(others, {
			className: classNames("EOM_MenuLayout_Menu", local.type),
		})} hittest={false}>
			<Index each={Object.keys(local.menuList)}>
				{(menu, index) => {
					const menuIcon = () => {
						if (local.mark_icon) {
							return local.mark_icon(menu());
						}
					};
					const hasSecondaryMenu = () => {
						return local.menuList[menu()] != undefined && local.menuList[menu()].length > 0;
					};

					const red = () => props.menuName && _key() > 0 && CustomUIConfig.GetRedPoint(props.menuName, menu());

					let refMenu: Panel | undefined;
					createEffect((old?: boolean) => {
						let selected = menuSelected() == menu();
						if (old != selected && selected && refMenu?.IsValid()) {
							$.Schedule(0.1 + Game.GetGameFrameTime(), () => {
								if (!refMenu?.IsValid()) return;
								let parent = refMenu.GetParent();
								if (!parent?.IsValid()) return;
								let position = refMenu.GetPositionWithinAncestor(parent);
								if (position.y + refMenu.actuallayoutheight > parent.actuallayoutheight) {
									refMenu.ScrollParentToMakePanelFit(2, false);
								}
							});
						}
						return old;
					});

					return (<>
						<Panel id={menu()} className={classNames("TabButton", { HasSecondaryMenu: hasSecondaryMenu(), Selected: menuSelected() == menu() })} onactivate={self => {
							// if (menu() == menuSelected()) {
							// 	setMenuSelected("");
							// } else {
							// checkExclamation(menuSelected());
							// const old_menu = menuSelected();
							setMenuSelected(menu());
							// console.log("setMenuSelected", menu());
							// checkExclamation(old_menu);
							// checkExclamation(menu());

							// batch(() => {
							// 	checkExclamation(menu(), menuSelected());
							// 	setMenuSelected(menu());
							// });
							// }
							// if (local.menuName != undefined && markNewInfo[menu()]) {
							// 	clickNewMark({
							// 		menu: local.menuName,
							// 		tag: menu()
							// 	}, self);
							// }
							// @ts-ignore
							// self.FindChildTraverse("SelectedParticle")?.ReloadScene();
						}}>
							{/* <Image className="TabBackgroundActive" /> */}
							{menuIcon}
							{/* <Switch>
								<Match when={markNewInfo[getCombineMenuTag(menu())]}>
									<MenuMarkIcon type={markNewInfo[getCombineMenuTag(menu())]! == "new" ? "new_large" : markNewInfo[getCombineMenuTag(menu())]!} />
								</Match>
								<Match when={exclamationList().includes(menu())}>
									<MenuMarkIcon type={"default"} />
								</Match>
							</Switch> */}
							{/* <DOTAParticleScenePanel id="SelectedParticle" particleName="particles/ui/store/label_interaction_fx.vpcf" lookAt="0 0 0" cameraOrigin="0 0 100" fov="20" /> */}

							<Image className="TabIcon" />
							<CLabel className={classNames("TabLabel", sLanguage)} text={"#" + menu()} html />
							<Show when={hasSecondaryMenu()}>
								<Image className="TabBackgroundArrow" />
							</Show>
							<Show when={red()}>
								<Image id="RedMark" hittest={false} />
							</Show>
						</Panel>
						<Show when={hasSecondaryMenu()}>
							<Panel ref={refMenu} className={classNames("SecondaryContainer", { Selected: menuSelected() == menu() })}>
								<Index each={local.menuList?.[menu()] ?? []}>
									{(menu2, index2) => {
										const menu2Icon = () => {
											if (local.mark_icon) {
												return local.mark_icon(menu(), menu2());
											}
										};
										const markType = () => {
											return markNewInfo[getCombineMenuTag(menu(), menu2())];
										};

										const red2 = () => props.menuName && _key() > 0 && CustomUIConfig.GetRedPoint(props.menuName, menu(), menu2());

										return (
											<Panel className={classNames("SecondaryMenuButton", { Selected: menuSelected2[menu()] == menu2() })} onactivate={self => {
												// checkExclamation(menuSelected(), menuSelected2[menuSelected()]);
												// const old_menu = menuSelected();
												// const old_menu2 = menuSelected2[old_menu];
												setMenuSelected2({ [menu()]: menu2() });
												// checkExclamation(old_menu, old_menu2);
												// checkExclamation(menu(), menu2());
												// batch(() => {
												// });

												// if (local.menuName != undefined) {
												// 	let benchmark = Object.keys(markNewInfo).find(v => menu2().includes(v));
												// 	if (benchmark) {
												// 		clickNewMark({
												// 			menu: local.menuName,
												// 			tag: menu(),
												// 			benchmark,
												// 		}, self);
												// 	}
												// }
												// let index = exclamationList().indexOf(menu());
												// if (index != -1) {
												// 	let list = [...exclamationList()];
												// 	list.splice(index, 1);
												// 	setExclamationList(list);
												// }
											}}>
												<Image className="SecondaryBackgroundActive" />
												<Image className="SecondaryCheckBox" />
												<CLabel className={classNames(sLanguage)} text={"#" + menu2()} html />
												{menu2Icon()}
												{/* <Switch>
													<Match when={markNewInfo[getCombineMenuTag(menu(), menu2())]}>
														<MenuMarkIcon type={markNewInfo[getCombineMenuTag(menu(), menu2())] as "new"} />
													</Match>
													<Match when={exclamationList().includes(menu())}>
														<MenuMarkIcon type={"default"} />
													</Match>
												</Switch> */}
												<Show when={red2()}>
													<Image id="RedMark" hittest={false} />
												</Show>
											</Panel>
										);
									}}
								</Index>
							</Panel>
						</Show>
					</>);
				}}
			</Index>
		</Panel>
	);
};

export interface EOM_MenuLayout_ContentProps extends EOM_Attribute {
	/** 预设的款式 */
	type?: "Tui12";
	/** 是否可见 */
	show?: boolean;
}
/** 【布局】内容页 */
export const EOM_MenuLayout_Content: ParentComponent<EOM_MenuLayout_ContentProps> = (props) => {
	const merged = mergeProps({ type: ADDON_NAME, show: true }, props);
	const [local, others] = splitProps(merged, ["children", "show", "type"]);
	return (
		<Panel {...EOMProps(others, {
			className: classNames("EOM_MenuLayout_Content", local.type, { Show: local.show }),
		})} hittest={false}>
			{untrack(() => local.children)}
		</Panel>
	);
};