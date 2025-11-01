'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');

const menus = ["setting", "mail", "store", "activity", "handbook", "draw", "rank"];
const dropdownMenus = {
  setting: ["MenuButton_setting", "MenuDropDown_Dota2Setting"]
};
const dropdownCallback = {
  MenuDropDown_Dota2Setting: () => $.DispatchEvent("DOTAShowSettingsRebornPopup", $.GetContextPanel())
};
const [selectName, setSelectName] = libs.createSignal("");
let DropContainer;
let DropContent;
const showDropDown = (panel, name) => {
  if (DropContainer == undefined || !DropContainer.IsValid()) return;
  if (panel != undefined) {
    if (name != undefined && dropdownMenus[name] != undefined) {
      let position = panel.GetPositionWithinWindow();
      let dropX = position.x / DropContainer.actualuiscale_x - 100 + 23;
      if (DropContent != undefined) {
        DropContainer.SetPositionInPixels(Math.max(0, dropX), 0, 0);
        if (dropX < 0) {
          DropContainer.FindChild("MarginTop").style.transform = `translateX(${dropX}px)`;
        } else {
          DropContainer.FindChild("MarginTop").style.transform = `translateX(0px)`;
        }
        DropContent.RemoveAndDeleteChildren();
        for (const dropName of dropdownMenus[name]) {
          libs.insert(DropContent, libs.createComponent(DropdownItem, {
            menuName: name,
            dropName: dropName
          }));
        }
      }
      SaveData(DropContainer, "targetPanel", panel);
    } else {
      LoadData(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
      DropContainer.RemoveClass("Show");
      return;
    }
  }
  LoadData(DropContainer, "targetPanel")?.AddClass("ShowDropDown");
  DropContainer.AddClass("Show");
};
const hideDropDown = () => {
  if (!DropContainer?.IsValid()) return;
  LoadData(DropContainer, "targetPanel")?.RemoveClass("ShowDropDown");
  DropContainer.RemoveClass("Show");
};
const [redData, SetRed] = libs.createSignal((() => {
  let res = {};
  return res;
})());
const MenuBar = () => {
  libs.onMount(() => {
    let gameEventListeners = [];
    gameEventListeners.push(GameEvents.Subscribe("custom_ui_toggle_windows", eventData => {
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
    libs.onCleanup(() => {
      for (const id of gameEventListeners) {
        GameEvents.Unsubscribe(id);
      }
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", {
        id: "MenuMain",
        hittest: false
      }, null),
      _el$2 = libs.createElement("Panel", {
        id: "MenuBar",
        hittest: false
      }, _el$),
      _el$3 = libs.createElement("Panel", {
        id: "DropContainer",
        hittest: false
      }, _el$),
      _el$4 = libs.createElement("Panel", {
        id: "MarginTop"
      }, _el$3),
      _el$5 = libs.createElement("Panel", {
        id: "DropMain"
      }, _el$3);
    libs.insert(_el$2, libs.createComponent(MenuButton, {
      name: "Return",
      onactivate: self => $.DispatchEvent("DOTAHUDShowDashboard", self)
    }), null);
    libs.insert(_el$2, libs.createComponent(libs.For, {
      each: menus,
      children: menu => {
        return libs.createComponent(MenuButton, {
          name: menu,
          get red() {
            return redData()[menu] == true;
          }
        });
      }
    }), null);
    const _ref$ = DropContainer;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$3) : DropContainer = _el$3;
    libs.setProp(_el$4, "onmouseover", self => showDropDown());
    libs.setProp(_el$4, "onmouseout", self => hideDropDown());
    const _ref$2 = DropContent;
    typeof _ref$2 === "function" ? libs.use(_ref$2, _el$5) : DropContent = _el$5;
    libs.setProp(_el$5, "onmouseover", self => showDropDown());
    libs.setProp(_el$5, "onmouseout", self => hideDropDown());
    return _el$;
  })();
};
const MenuButton = props => {
  const [local, other] = libs.splitProps(props, ["name", "hittest", "onactivate"]);
  const selected = () => selectName() == local.name;
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    get id() {
      return props.name;
    },
    "class": "MenuButton",
    get onactivate() {
      return local.onactivate ?? (self => {
        GameEvents.SendEventClientSide("custom_ui_toggle_windows", {
          window_name: "MenuButton_" + local.name,
          state: selected() ? 0 : 1
        });
      });
    },
    onmouseover: self => {
      showDropDown(self, local.name);
    },
    onmouseout: self => {
      hideDropDown();
    },
    get children() {
      return [(() => {
        const _el$6 = libs.createElement("Panel", {
          get ["class"]() {
            return libs.classNames("BGImage", "FrontImage", local.name, {
              Selected: selected()
            });
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$6, "class", libs.classNames("BGImage", "FrontImage", local.name, {
          Selected: selected()
        }), _$p));
        return _el$6;
      })(), (() => {
        const _el$7 = libs.createElement("Panel", {
          get ["class"]() {
            return libs.classNames("BGImage", "HoverImage", local.name, {
              Selected: selected()
            });
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$7, "class", libs.classNames("BGImage", "HoverImage", local.name, {
          Selected: selected()
        }), _$p));
        return _el$7;
      })(), (() => {
        const _el$8 = libs.createElement("Label", {
          get ["class"]() {
            return libs.classNames("MenuLabel", local.name, {
              Selected: selected()
            });
          },
          get text() {
            return "#MenuButton_" + local.name;
          }
        }, null);
        libs.effect(_p$ => {
          const _v$ = libs.classNames("MenuLabel", local.name, {
              Selected: selected()
            }),
            _v$2 = "#MenuButton_" + local.name;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$8, "class", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$8, "text", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$8;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return props.red;
        },
        get children() {
          return libs.createElement("Panel", {
            id: "RedPoint"
          }, null);
        }
      })];
    }
  });
};
const DropdownItem = props => {
  return libs.createComponent(EOM_Button.EOM_BaseButton, {
    "class": "DropdownItem",
    onactivate: self => {
      if (dropdownCallback[props.dropName] != undefined) {
        dropdownCallback[props.dropName]();
      } else {
        GameEvents.SendEventClientSide("custom_ui_toggle_windows", {
          window_name: "MenuButton_" + props.menuName,
          state: 1
        });
        clientSideEvent("toggle_window_tag", {
          window_name: "MenuButton_" + props.menuName,
          menu: props.dropName
        });
      }
      hideDropDown();
    },
    get children() {
      const _el$0 = libs.createElement("Label", {
        get text() {
          return "#" + props.dropName;
        }
      }, null);
      libs.effect(_$p => libs.setProp(_el$0, "text", "#" + props.dropName, _$p));
      return _el$0;
    }
  });
};
libs.render(() => libs.createComponent(MenuBar, {}), $.GetContextPanel());
