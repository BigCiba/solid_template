'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');

function HudMain() {
  return (() => {
    const _el$ = libs.createElement("Panel", {
      align: "center center",
      flowChildren: "down"
    }, null);
    libs.setProp(_el$, "align", "center center");
    libs.setProp(_el$, "flowChildren", "down");
    return _el$;
  })();
}
libs.render(HudMain, $.GetContextPanel());
