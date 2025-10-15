import classNames from "classnames";
import { For, ParentComponent, createEffect, createSignal, mergeProps, on, splitProps } from "solid-js";
import { CLabel, Portal } from "../../../EOMChildren";
import { ADDON_NAME, EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_MultiDropDown.less";


const [showDropDown, setShowDropDown] = createSignal("");
/** 找到最顶层 */
let menuRoot: Panel;

const createDropDownContainer = (panel: Panel) => {
    const layoutFile = panel.layoutfile;
    while (panel.GetParent() != undefined && panel.GetParent()?.layoutfile == layoutFile) {
        panel = panel.GetParent() as Panel;
    }
    let EOM_MultiDropDownContainer = panel.FindChildTraverse("EOM_MultiDropDownContainer") as Panel;
    /** 创建一个全屏的DropDown容器 */
    if (panel != undefined && EOM_MultiDropDownContainer == undefined) {
        EOM_MultiDropDownContainer = $.CreatePanel("Panel", panel, "EOM_MultiDropDownContainer", { style: "width: 100%; height: 100%; z-index: 99999;" });
        EOM_MultiDropDownContainer.visible = false;
        EOM_MultiDropDownContainer.SetPanelEvent("onactivate", () => {
            setShowDropDown("");
            // 隐藏DropDown
            EOM_MultiDropDownContainer.visible = false;
            // EOM_MultiDropDownContainer.FindChildrenWithClassTraverse("DropDownPanelList").forEach(p => p.visible = false);
        });
    }

    menuRoot = EOM_MultiDropDownContainer;

    return menuRoot;
};

// @ts-ignore
interface EOM_MultiDropDown extends EOM_Attribute {
    /** 没有初始选择时显示的文字 */
    placeholder: string;
    /** 初始选择 */
    index?: number;
    /** 菜单位置，默认在下面 */
    menuPosition?: "top" | "bottom",
    /** 当选择改变时 */
    onChange?: (index: Record<number, boolean>) => void;
    /** 选项 */
    options: string[] | number[];
    /** 重置signal用 */
    reset?: boolean,
    /** 处理文本回调 */
    localizeFunc?: (key: string) => string;
    /** 暴露给外部的接口 */
    ref?: EOM_MultiDropDown_ref;
};

export interface EOM_MultiDropDown_ref {
    reset: () => void;
}

export const EOM_MultiDropDown: ParentComponent<EOM_MultiDropDown> = (props) => {
    let myMenu: Panel | undefined;
    const [mountRef, setMountRef] = createSignal<Panel>();

    const mergerd = mergeProps({ id: DoUniqueString("EOM_MultiDropDown"), menuPosition: "bottom" }, props);
    const [local, others] = splitProps(mergerd, ["index", "placeholder", "onChange", "reset", "id", "menuPosition", "options", "ref"]);
    const DropDownID = local.id;
    const defaultSelection = (() => {
        let res: Record<number | string, boolean> = {};
        Object.values(local.options).forEach(option => {
            res[option] = false;
        });
        return res;
    })();

    const [selectList, setSelectList] = createSignal<Record<number | string, boolean>>(defaultSelection);

    createEffect(() => {
        if (local.onChange) {
            local.onChange(selectList());
        }
    });

    createEffect(on(() => local.reset, () => {
        setSelectList(defaultSelection);
    }));

    const toggleMenu = (pBtn: Button) => {
        if (!pBtn?.IsValid()) return;
        setMountRef(createDropDownContainer(pBtn));
        if (!myMenu?.IsValid()) return;

        setShowDropDown(id => id == DropDownID ? "" : DropDownID);

        if (myMenu.visible) {
            menuRoot.visible = true;
            $.Schedule(0, () => {
                if (pBtn && myMenu && myMenu.IsValid()) {
                    myMenu.SetFocus();
                    let minWidth = Math.max(myMenu.actuallayoutwidth, pBtn.actuallayoutwidth) / myMenu.actualuiscale_x;
                    myMenu.style.minWidth = minWidth + "px";
                    const childItems = myMenu.FindChildrenWithClassTraverse("EOM_MultiDropDownMenuItem");
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
    };

    const selectCount = () => Object.values(selectList()).filter(item => item).length;

    if (local.ref) {
        let refData: EOM_MultiDropDown_ref = {
            reset() {
                setSelectList(defaultSelection);
            },
        };
        (local.ref as any)(refData);
    }

    return (
        <Button id={local.id} {...EOMProps(others, {
            className: classNames("EOM_MultiDropDown", ADDON_NAME),
        })}
            onactivate={(self) => {
                toggleMenu(self);
            }}
        >
            <CLabel id="EOM_MultiDropDown_placeholder" text={selectCount() != 0 ? local.placeholder : "#All"} dialogVariables={{ count: selectCount() }} />
            <Panel id="EOM_MultiDropDown_arrow" classList={{ reverse: showDropDown() != DropDownID }} />
            {/* 下拉菜单 */}
            <Portal mount={mountRef()} >
                <Panel ref={myMenu} id={DropDownID + "_EOM_MultiDropDownMenu"} class="DropDownPanelList" visible={showDropDown() == DropDownID}>
                    <For each={local.options}>
                        {(item) => {
                            const localize = () => {
                                if (props.localizeFunc) {
                                    return props.localizeFunc(item.toString());
                                }
                                return item;
                            };
                            return <Panel id={item.toString()} className={classNames("EOM_MultiDropDownMenuItem", { Selected: selectList()[item] })} onactivate={() => {
                                setSelectList((prev) => prev = { ...prev, [item]: !prev[item] });
                            }}>
                                <Panel id="OptionIcon" />
                                <Label id="OptionText" text={localize()} html />
                            </Panel>;
                        }}
                    </For>
                </Panel>
            </Portal>
        </Button>
    );
};