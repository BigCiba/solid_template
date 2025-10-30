'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_BaseButton = props => {
  const [local, others] = libs.splitProps(props, ["children", "text", "html"]);
  return (() => {
    const _el$4 = libs.createElement("Button", libs.mergeProps({
      get ["class"]() {
        return libs.classNames("EOM_Button", "EOM_BaseButton", props.class);
      }
    }, others), null);
    libs.spread(_el$4, libs.mergeProps({
      get ["class"]() {
        return libs.classNames("EOM_Button", "EOM_BaseButton", props.class);
      }
    }, others), true);
    libs.insert(_el$4, () => libs.untrack(() => local.children), null);
    libs.insert(_el$4, libs.createComponent(libs.Show, {
      get when() {
        return local.text;
      },
      get children() {
        const _el$5 = libs.createElement("Label", {
          get text() {
            return local.text;
          },
          get html() {
            return local.html;
          }
        }, null);
        libs.effect(_p$ => {
          const _v$6 = local.text,
            _v$7 = local.html;
          _v$6 !== _p$._v$6 && (_p$._v$6 = libs.setProp(_el$5, "text", _v$6, _p$._v$6));
          _v$7 !== _p$._v$7 && (_p$._v$7 = libs.setProp(_el$5, "html", _v$7, _p$._v$7));
          return _p$;
        }, {
          _v$6: undefined,
          _v$7: undefined
        });
        return _el$5;
      }
    }), null);
    return _el$4;
  })();
};

const menus = [];
const dropdownMenus = {};
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
      DropContainer.SetPositionInPixels(position.x / DropContainer.actualuiscale_x - 100 + 29, 0, 0);
      if (DropContent != undefined) {
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
  menus.forEach(menu => {
    res[menu] = CustomUIConfig.GetRedPoint(menu);
  });
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
      libs.createElement("Panel", {
        id: "right_bottom"
      }, _el$5);
      libs.createElement("Panel", {
        id: "left_bottom"
      }, _el$5);
      libs.createElement("Panel", {
        id: "right_top"
      }, _el$5);
      libs.createElement("Panel", {
        id: "left_top"
      }, _el$5);
      libs.createElement("Panel", {
        id: "right_center"
      }, _el$5);
      libs.createElement("Panel", {
        id: "left_center"
      }, _el$5);
      libs.createElement("Panel", {
        id: "center_bottom"
      }, _el$5);
      libs.createElement("Panel", {
        id: "center_top"
      }, _el$5);
      libs.createElement("Panel", {
        id: "center_center"
      }, _el$5);
      const _el$13 = libs.createElement("Panel", {
        id: "DropContent"
      }, _el$5);
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
    libs.setProp(_el$5, "onmouseover", self => showDropDown());
    libs.setProp(_el$5, "onmouseout", self => hideDropDown());
    const _ref$2 = DropContent;
    typeof _ref$2 === "function" ? libs.use(_ref$2, _el$13) : DropContent = _el$13;
    return _el$;
  })();
};
const MenuButton = props => {
  const [local, other] = libs.splitProps(props, ["name", "hittest", "onactivate"]);
  const selected = () => selectName() == local.name;
  return libs.createComponent(EOM_BaseButton, libs.mergeProps({
    get id() {
      return props.name;
    },
    get className() {
      return $.Language().toLowerCase();
    }
  }, other, {
    hittest: false,
    get children() {
      return [(() => {
        const _el$14 = libs.createElement("Panel", {}, null);
        libs.effect(_$p => libs.setProp(_el$14, "className", libs.classNames("BGImage", "FrontImage", local.name, {
          Selected: selected()
        }), _$p));
        return _el$14;
      })(), (() => {
        const _el$15 = libs.createElement("Panel", {}, null);
        libs.effect(_$p => libs.setProp(_el$15, "className", libs.classNames("BGImage", "HoverImage", local.name, {
          Selected: selected()
        }), _$p));
        return _el$15;
      })(), (() => {
        const _el$16 = libs.createElement("Label", {
          get text() {
            return "#MenuButton_" + local.name;
          }
        }, null);
        libs.effect(_p$ => {
          const _v$ = libs.classNames("MenuLabel", local.name, {
              Selected: selected()
            }),
            _v$2 = "#MenuButton_" + local.name;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$16, "className", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$16, "text", _v$2, _p$._v$2));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined
        });
        return _el$16;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return props.red;
        },
        get children() {
          return libs.createElement("Panel", {
            id: "RedPoint"
          }, null);
        }
      }), (() => {
        const _el$18 = libs.createElement("Panel", {
          get onactivate() {
            return local.onactivate ?? (self => {
              GameEvents.SendEventClientSide("custom_ui_toggle_windows", {
                window_name: "MenuButton_" + local.name,
                state: selected() ? 0 : 1
              });
            });
          }
        }, null);
        libs.setProp(_el$18, "className", "Hitbox");
        libs.setProp(_el$18, "onmouseover", self => {
          let target = self.GetParent();
          target.AddClass("Hover");
          showDropDown(target, local.name);
        });
        libs.setProp(_el$18, "onmouseout", self => {
          let target = self.GetParent();
          target.RemoveClass("Hover");
          hideDropDown();
        });
        libs.effect(_$p => libs.setProp(_el$18, "onactivate", local.onactivate ?? (self => {
          GameEvents.SendEventClientSide("custom_ui_toggle_windows", {
            window_name: "MenuButton_" + local.name,
            state: selected() ? 0 : 1
          });
        }), _$p));
        return _el$18;
      })()];
    }
  }));
};
const DropdownItem = props => {
  return libs.createComponent(EOM_BaseButton, {
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
      return [(() => {
        const _el$19 = libs.createElement("Label", {
          get text() {
            return "#" + props.dropName;
          }
        }, null);
        libs.effect(_$p => libs.setProp(_el$19, "text", "#" + props.dropName, _$p));
        return _el$19;
      })(), libs.createComponent(libs.Show, {
        get when() {
          return CustomUIConfig.GetRedPoint(props.menuName, props.dropName);
        },
        get children() {
          return libs.createElement("Panel", {
            id: "DropdownRedPoint",
            hittest: false
          }, null);
        }
      })];
    }
  });
};
libs.render(() => libs.createComponent(MenuBar, {}), $.GetContextPanel());
