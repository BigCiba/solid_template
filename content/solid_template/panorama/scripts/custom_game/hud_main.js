'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');

function HudMain() {
  return (() => {
    const _el$ = libs.createElement("Label", {
      text: "aaaaaaaaaaaaaaaaaaaaaaaa",
      align: "center center"
    }, null);
    libs.setProp(_el$, "align", "center center");
    return _el$;
  })();
}
libs.render(HudMain, $.GetContextPanel());
