'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');
var EOM_Breadcrumb = require('./EOM_Breadcrumb.js');

function HudMain() {
  return (() => {
    const _el$ = libs.createElement("Panel", {
      align: "center center",
      flowChildren: "down"
    }, null);
    libs.setProp(_el$, "align", "center center");
    libs.setProp(_el$, "flowChildren", "down");
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_Button, {}), null);
    libs.insert(_el$, libs.createComponent(EOM_Breadcrumb.EOM_Breadcrumb, {
      list: ["asd", "sasd", "asds", "afsd"]
    }), null);
    return _el$;
  })();
}
libs.render(HudMain, $.GetContextPanel());
