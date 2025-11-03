'use strict'; const require = GameUI.__require;

var libs = require('./libs.js');
var EOM_Button = require('./EOM_Button.js');

const EOM_Countdown = props => {
  const merged = libs.mergeProps({
    updateInterval: 1,
    timeDialogVariable: "countdown_time",
    text: "#countdown_time",
    onlyCoundown: true,
    short: false
  }, props, {
    class: "EOM_Countdown"
  });
  const [local, others] = libs.splitProps(merged, ["endTime", "updateInterval", "timeDialogVariable", "text", "onlyCoundown", "limitTime", "short"]);
  let ref;
  const refresh = () => {
    const diff = local.onlyCoundown ? Math.floor(local.endTime - Date.now() / 1000) : Math.floor(Math.abs(local.endTime - Date.now() / 1000));
    let days = Math.max(0, Math.floor(diff / 86400));
    let hours = Math.max(0, Math.floor(diff % 86400 / 3600));
    let minutes = Math.max(0, Math.floor(diff % 3600 / 60));
    const remainingSeconds = Math.max(0, diff % 60);
    if (local.limitTime != undefined) {
      if (local.limitTime.day != undefined && days >= local.limitTime.day) {
        days = local.limitTime.day;
        hours = 0;
        minutes = 0;
      } else if (local.limitTime.hours != undefined && hours >= local.limitTime.hours) {
        days = 0;
        hours = local.limitTime.hours;
        minutes = 0;
      } else if (local.limitTime.minutes != undefined && minutes >= local.limitTime.minutes) {
        days = 0;
        hours = 0;
        minutes = local.limitTime.minutes;
      }
    }
    if (ref?.IsValid()) {
      if (local.short) {
        let text = "";
        if (days > 0) {
          text += days.toString() + $.Localize("#day", ref);
        }
        text += hours.toString() + $.Localize("#hour", ref);
        if (days <= 0) {
          text += minutes.toString() + $.Localize("#min", ref);
        }
        ref.text = text;
      } else {
        ref.text = $.Localize(local.text, ref).replace("{day}", days.toString()).replace("{hour}", hours.toString().padStart(2, '0')).replace("{min}", minutes.toString().padStart(2, '0')).replace("{sec}", remainingSeconds.toString().padStart(2, '0'));
      }
    }
  };
  libs.onMount(() => {
    refresh();
    const timer = setInterval(() => {
      refresh();
    }, local.updateInterval * 1000);
    libs.onCleanup(() => {
      clearInterval(timer);
    });
  });
  return (() => {
    const _el$ = libs.createElement("Panel", others, null),
      _el$2 = libs.createElement("Label", {}, _el$);
    libs.spread(_el$, others, true);
    const _ref$ = ref;
    typeof _ref$ === "function" ? libs.use(_ref$, _el$2) : ref = _el$2;
    return _el$;
  })();
};

function HudMain() {
  return (() => {
    const _el$ = libs.createElement("Panel", {
      align: "center center",
      flowChildren: "down"
    }, null);
    libs.setProp(_el$, "align", "center center");
    libs.setProp(_el$, "flowChildren", "down");
    libs.insert(_el$, libs.createComponent(EOM_Button.EOM_Button, {}), null);
    libs.insert(_el$, libs.createComponent(EOM_Countdown, {
      endTime: 1762099200
    }), null);
    return _el$;
  })();
}
libs.render(HudMain, $.GetContextPanel());
