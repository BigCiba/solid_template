import { render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { ParentComponent, children, mergeProps, onCleanup, onMount, splitProps } from "solid-js";
import { CLabel } from "../../../EOMChildren";
import { ADDON_NAME, EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_DropDown.less";

/** 找到最顶层 */
let menuRoot: Panel;

const createDropDownContainer = (panel: Panel) => {
	// const layoutFile = panel.layoutfile;
	while (panel.GetParent() != undefined) {
		panel = panel.GetParent() as Panel;
	}
	let EOM_DropDownContainer = panel.FindChildTraverse("EOM_DropDownContainer") as Panel;
	/** 创建一个全屏的DropDown容器 */
	if (panel != undefined && EOM_DropDownContainer == undefined) {
		EOM_DropDownContainer = $.CreatePanel("Panel", panel, "EOM_DropDownContainer", { style: "width: 100%; height: 100%; z-index: 99999;" });
		EOM_DropDownContainer.visible = false;
		EOM_DropDownContainer.SetPanelEvent("onactivate", () => {
			// 隐藏DropDown
			EOM_DropDownContainer.visible = false;
			EOM_DropDownContainer?.FindChildrenWithClassTraverse("EOM_DropDownMenu").forEach((child) => {
				child.visible = false;
			});
		});

	}

	menuRoot = EOM_DropDownContainer;
};

interface EOM_DropDownProp extends EOM_Attribute {
	/** 没有初始选择时显示的文字 */
	placeholder?: string;
	/** 初始选择 */
	index?: number;
	/** 样式类型 */
	type?: string;
	/** 菜单位置，默认在下面 */
	menuPosition?: "top" | "bottom",
	/** 当选择改变时 */
	onChange?: (index: number, item: LabelPanel) => void;
	/** 当清除选项 */
	onClear?: () => void;
};
function doUniqueString(str: string) {
	if (GameUI.CustomUIConfig()._Record_UniqueString == undefined) {
		GameUI.CustomUIConfig()._Record_UniqueString = 0;
	}
	let result = "_" + Math.random().toString().substring(3, 3) + GameUI.CustomUIConfig()._Record_UniqueString + "_" + str;
	GameUI.CustomUIConfig()._Record_UniqueString++;
	return result;
}
export const EOM_DropDown: ParentComponent<EOM_DropDownProp> = (props) => {
	const mergerd = mergeProps({ id: doUniqueString("EOM_DropDown"), menuPosition: "bottom", type: ADDON_NAME, index: 0 }, props);
	const [local, others] = splitProps(mergerd, ["children", "index", "placeholder", "onChange", "onClear", "type", "id", "menuPosition"]);

	const childrens = children(() => props.children);
	let selfRef: Button | undefined;
	let myMenu: Panel | undefined;
	onMount(() => {
		if (selfRef) {
			for (let index = 0; index < selfRef.GetChildCount(); index++) {
				const child = selfRef.GetChild(index);
				if (child && child.id != "EOM_DropDown_placeholder" && child.id != "EOM_DropDown_arrow") {
					child.visible = (index == local.index);
				}
			}
			createDropDownContainer(selfRef);
		}
	});

	onCleanup(() => {
		if (myMenu && myMenu.IsValid()) {
			render(() => <></>, myMenu);
		}
	});

	const onChange = (childIndex: number, c: LabelPanel) => {
		if (local.onChange) {
			local.onChange(childIndex, c);
		}
		if (selfRef) {
			for (let index = 0; index < selfRef.GetChildCount(); index++) {
				const c = selfRef.GetChild(index);
				if (index != childIndex) {
					if (c && c.id != "EOM_DropDown_placeholder" && c.id != "EOM_DropDown_arrow") {
						c.visible = false;
					}
				}
			}
		}
	};

	const onClear = () => {
		if (local.onClear) {
			local.onClear();
		}
	};

	const createDropDown = (pBtn: Button) => {
		if (myMenu == undefined && selfRef) {
			myMenu = $.CreatePanel("Panel", selfRef, `${local.id}_DropDownMenu`);
			myMenu.AddClass("EOM_DropDownMenu");
			myMenu.AddClass(local.type);
			myMenu.visible = true;

			for (let childIndex = 0; childIndex < childrens().length; childIndex++) {
				let content = $.CreatePanel("TabButton", myMenu, '', {
					class: "EOM_DropDownMenuItem",
					group: "EOM_DropDownMenuItem",
				});
				content.SetPanelEvent("onblur", () => {
					// toggleMenu(pBtn, false);
				});
				content.SetPanelEvent("onactivate", () => {
					let bClear = false;
					if (pBtn) {
						for (let index = 0; index < pBtn.GetChildCount(); index++) {
							const c = pBtn.GetChild(index) as LabelPanel;
							if (c && c.id != "EOM_DropDown_arrow" && c.id != "EOM_DropDown_Clear") {
								c.visible = index == childIndex;
								if (c.visible) {
									onChange(childIndex, c);
								}
							}
							if (c && c.id == "EOM_DropDown_Clear" && index == childIndex) {
								bClear = true;
								c.visible == false;
								onClear();
							}
						}
						if (bClear) {
							(pBtn.FindChildTraverse("EOM_DropDown_placeholder") as Panel).visible = true;
						}
					}
					toggleMenu(pBtn, false);
				});
				render(() => childrens()[childIndex], content);
			}
			if (menuRoot != undefined) {
				myMenu.SetParent(menuRoot);
			}
			myMenu.visible = false;
		}
	};

	const toggleMenu = (pBtn: Button, state?: boolean) => {
		if (myMenu == undefined || !myMenu.IsValid()) {
			createDropDown(pBtn);
		}
		if (pBtn && myMenu?.IsValid()) {
			myMenu.visible = state == undefined ? !myMenu.visible : state;
			if (menuRoot != undefined) {
				menuRoot.visible = myMenu.visible;
			}
			myMenu.SetHasClass("EOM_DropDownMenuShow", myMenu.visible);
			if (myMenu.visible) {
				myMenu.SetFocus();
				$.Schedule(0.06, () => {
					if (pBtn && myMenu) {
						let minWidth = Math.max(myMenu.actuallayoutwidth, pBtn.actuallayoutwidth) / myMenu.actualuiscale_x;
						myMenu.style.minWidth = minWidth + "px";
						const childItems = myMenu.FindChildrenWithClassTraverse("EOM_DropDownMenuItem");
						if (childItems && childItems.length > 0) {
							childItems.forEach(item => {
								item.style.width = (minWidth - 4 /* border的宽度 */) + "px";
							});
						}

						let vPos = pBtn.GetPositionWithinWindow();
						let menuPosition = local.menuPosition;
						let x = vPos.x;
						let y = Math.max(0, menuPosition == "bottom"
							? vPos.y + pBtn.actuallayoutheight + 2
							: vPos.y - myMenu.actuallayoutheight - 2
						);
						let maxHeight = Math.max(0, (menuPosition == "bottom" ? Game.GetScreenHeight() - y : vPos.y) - 8);
						myMenu.style.maxHeight = (maxHeight / myMenu.actualuiscale_y) + "px";
						if (myMenu.actuallayoutheight > maxHeight) {
							y = Math.max(0, menuPosition == "bottom" ? y : vPos.y - maxHeight);
						}

						myMenu.SetPositionInPixels(
							x / myMenu.actualuiscale_x,
							y / myMenu.actualuiscale_y,
							0
						);
					}
				});
			}
		}
	};

	return (
		<Button ref={selfRef} id={local.id} {...EOMProps(others, {
			className: classNames("EOM_DropDown", local.type),
		})}
			onactivate={(self) => {
				toggleMenu(self);
			}}
		>
			{local.children}
			<CLabel id="EOM_DropDown_placeholder" text={(local.index == undefined && local.placeholder) ? local.placeholder : ""} />
			<Image id="EOM_DropDown_arrow" />
		</Button>
	);
};