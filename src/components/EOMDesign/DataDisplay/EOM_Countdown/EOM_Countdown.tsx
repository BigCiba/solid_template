import { ParentComponent, mergeProps, onCleanup, onMount, splitProps } from "solid-js";
import { CLabel } from "../../../EOMChildren";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";

export interface EOM_CountdownAttribute extends EOM_Attribute {
	endTime: number,
	/** @default 1 */
	updateInterval?: number;
	/** 文本 */
	text?: string;
	/** 限制 倒计时不会超过结束时间 */
	onlyCoundown?: boolean;
	/** 最大时间限制 */
	limitTime?: {
		day?: number,
		hours?: number,
		minutes?: number,
	};
	/** 最大时间限制 */
	short?: boolean;
}

export const EOM_Countdown: ParentComponent<EOM_CountdownAttribute> = (props) => {
	const merged = mergeProps({ updateInterval: 1, timeDialogVariable: "countdown_time", text: "#countdown_time", onlyCoundown: true, short: false }, props);
	const [local, others] = splitProps(merged, ["endTime", "updateInterval", "timeDialogVariable", "text", "onlyCoundown", "limitTime", "short"]);
	let ref: LabelPanel | undefined;
	const refresh = () => {
		const diff = local.onlyCoundown ? Math.floor((local.endTime - Date.now() / 1000)) : Math.floor((Math.abs(local.endTime - Date.now() / 1000))); // 差值，单位为秒
		let days = Math.max(0, Math.floor(diff / 86400)); // 天数
		let hours = Math.max(0, Math.floor((diff % 86400) / 3600)); // 小时数
		let minutes = Math.max(0, Math.floor((diff % 3600) / 60)); // 分钟数
		const remainingSeconds = Math.max(0, diff % 60); // 剩余的秒数
		if (local.limitTime != undefined) {
			if (local.limitTime.day != undefined && days >= local.limitTime.day) {
				days = local.limitTime.day;
				hours = 0;
				minutes = 0;
			} else if (local.limitTime.hours != undefined && hours >= local.limitTime.hours) {
				days = 0;
				hours = local.limitTime.hours;
				minutes = 0;
				// }
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
				ref.text = $.Localize(local.text, ref)
					.replace("{day}", days.toString())
					.replace("{hour}", hours.toString().padStart(2, '0'))
					.replace("{min}", minutes.toString().padStart(2, '0'))
					.replace("{sec}", remainingSeconds.toString().padStart(2, '0'));

			}
		}

	};
	onMount(() => {
		refresh();
		const timer = setInterval(() => {
			refresh();
		}, local.updateInterval! * 1000);
		onCleanup(() => {
			clearInterval(timer);
		});
	});
	return (
		<Panel {...EOMProps(others, { className: "EOM_Countdown" })} >
			<CLabel ref={ref} />
		</Panel>
	);
};
