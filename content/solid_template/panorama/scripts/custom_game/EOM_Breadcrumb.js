'use strict'; const exports = {}; GameUI.__loadModule('EOM_Breadcrumb', exports); const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');

const EOM_Breadcrumb = props => {
  const {
    local,
    others
  } = EOM_Button.useSimpleProps(props, {
    defaultValues: {
      list: [],
      defaultSelected: 0,
      activateType: "onactivate",
      group: "EOM_Breadcrumb" + Math.random()
    },
    localKeys: ["children", "list", "defaultSelected", "selected", "group", "activateType"],
    componentClass: ["EOM_Breadcrumb"]
  });
  const {
    defaultSelected,
    list,
    group,
    selected,
    activateType
  } = local;
  const [selectedIndex, setSelectedIndex] = libs.createSignal(defaultSelected != undefined ? Math.min(local.list.length - 1, Math.max(0, defaultSelected - 1)) : undefined);
  const onHover = index => {
    if (activateType == "onhover") {
      onSelect(index);
    }
  };
  const onSelect = index => {
    setSelectedIndex(index);
    if (props.onChange) {
      props.onChange(index, list[index]);
    }
  };
  return (() => {
    const _el$ = libs.createElement("Panel", others, null);
    libs.spread(_el$, others, true);
    libs.insert(_el$, libs.createComponent(libs.For, {
      get each() {
        return local.list;
      },
      children: (name, index) => [libs.memo((() => {
        const _c$ = libs.memo(() => index() > 0);
        return () => _c$() && (() => {
          const _el$3 = libs.createElement("Label", {
            text: "/"
          }, null);
          libs.setProp(_el$3, "className", "EOM_BreadcrumbSeparator");
          return _el$3;
        })();
      })()), (() => {
        const _el$2 = libs.createElement("TabButton", {
          get selected() {
            return selected !== undefined ? selected - 1 === index() : selectedIndex() === index();
          },
          group: group,
          text: name
        }, null);
        libs.setProp(_el$2, "group", group);
        libs.setProp(_el$2, "text", name);
        libs.setProp(_el$2, "onactivate", () => onSelect(index()));
        libs.setProp(_el$2, "onmouseover", () => onHover(index()));
        libs.effect(_$p => libs.setProp(_el$2, "selected", selected !== undefined ? selected - 1 === index() : selectedIndex() === index(), _$p));
        return _el$2;
      })()]
    }));
    return _el$;
  })();
};

exports.EOM_Breadcrumb = EOM_Breadcrumb;
