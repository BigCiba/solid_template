'use strict'; const exports = {}; GameUI.__loadModule('EOM_Button', exports); const require = GameUI.__require;

var libs = require('./libs.js');

const EOM_Button = props => {
  const mergedClass = libs.classNames("EOM_Button", props.loading ? "Loading" : "", props.loadingStyle == "Refresh" ? "Loading_Refresh" : "Loading_Spinner", `color-${props.enabled == false ? "Gray" : props.color || "Gold"}`, `size-${props.size || "Normal"}`, props.class);
  const merged = libs.mergeProps({
    loading: false,
    color: "Gold",
    size: "Normal"
  }, props, {
    class: mergedClass
  });
  const [local, others] = libs.splitProps(merged, ["loading", "icon", "color", "size", "children", "text", "html", "vars"]);
  const enabled = libs.createMemo(() => local.loading ? false : props.enabled);
  return libs.createComponent(EOM_BaseButton, libs.mergeProps$1(others, {
    get enabled() {
      return enabled();
    },
    get children() {
      return [(() => {
        const _el$ = libs.createElement("Panel", {
            "class": "EOM_Button_Content"
          }, null),
          _el$3 = libs.createElement("Label", {
            get text() {
              return local.text;
            },
            get html() {
              return local.html;
            },
            get vars() {
              return local.vars;
            }
          }, _el$);
        libs.insert(_el$, libs.createComponent(libs.Switch, {
          get fallback() {
            return local.icon;
          },
          get children() {
            return libs.createComponent(libs.Match, {
              get when() {
                return local.loading == true;
              },
              get children() {
                return libs.createElement("Image", {
                  "class": "EOM_Button_LoadingIcon"
                }, null);
              }
            });
          }
        }), _el$3);
        libs.effect(_p$ => {
          const _v$ = local.text != undefined,
            _v$2 = local.text,
            _v$3 = local.html,
            _v$4 = local.vars;
          _v$ !== _p$._v$ && (_p$._v$ = libs.setProp(_el$3, "visible", _v$, _p$._v$));
          _v$2 !== _p$._v$2 && (_p$._v$2 = libs.setProp(_el$3, "text", _v$2, _p$._v$2));
          _v$3 !== _p$._v$3 && (_p$._v$3 = libs.setProp(_el$3, "html", _v$3, _p$._v$3));
          _v$4 !== _p$._v$4 && (_p$._v$4 = libs.setProp(_el$3, "vars", _v$4, _p$._v$4));
          return _p$;
        }, {
          _v$: undefined,
          _v$2: undefined,
          _v$3: undefined,
          _v$4: undefined
        });
        return _el$;
      })(), libs.memo(() => local.children)];
    }
  }));
};
const EOM_BaseButton = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_BaseButton", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children"]);
  return (() => {
    const _el$4 = libs.createElement("Button", others, null);
    libs.spread(_el$4, others, true);
    libs.insert(_el$4, () => local.children);
    return _el$4;
  })();
};
const EOM_IconButton = props => {
  const merged = libs.mergeProps(props, {
    class: libs.classNames("EOM_IconButton", props.class)
  });
  const [local, others] = libs.splitProps(merged, ["children", "icon"]);
  return libs.createComponent(EOM_BaseButton, libs.mergeProps$1(others, {
    get children() {
      return [libs.memo(() => local.icon), libs.memo(() => local.children)];
    }
  }));
};

exports.EOM_BaseButton = EOM_BaseButton;
exports.EOM_Button = EOM_Button;
exports.EOM_IconButton = EOM_IconButton;
