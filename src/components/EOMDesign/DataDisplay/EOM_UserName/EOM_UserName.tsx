import { ParentComponent, children, createEffect, createMemo, createSignal, mergeProps, on, onCleanup, onMount, splitProps } from "solid-js";
import { CLabel } from "../../../EOMChildren";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";

interface EOM_UserNameAttribute extends EOM_Attribute {
	/** 长id */
	steamid?: string;
	/** 短id */
	accountid?: string;
	/** 是否显示工会 */
	showgGild?: boolean;
}

const EOM_UserName_old: ParentComponent<EOM_UserNameAttribute> = (props) => {
	const merged = mergeProps({ showgGild: false }, props);
	const [local, others] = splitProps(merged, ["children", "steamid", "accountid", "showgGild"]);
	const resolved = children(() => local.children);
	const [username, setUsername] = createSignal("???");
	const retryCount = 3;
	createEffect(() => {
		let longID: string | undefined;
		let count = 0;
		if (local.steamid) {
			longID = local.steamid;
		} else if (local.accountid) {
			longID = steam_3_64(local.accountid);
		}
		function requestName() {
			if (longID == undefined) return;
			if (count < retryCount) {
				count += 1;
				let result = SteamFriends.RequestPersonaName(longID, (v: any) => {
					$.Schedule(0.1, () => {
						requestName();
					});
				});
				setUsername(result);
			}
		}
		requestName();
	});

	return (
		<Panel {...EOMProps(others, {
			className: "EOM_UserName",
		})}>
			<CLabel text={username()} />
			{resolved()}
		</Panel>
	);
};

export const EOM_UserName: ParentComponent<EOM_UserNameAttribute> = (props) => {
	const merged = mergeProps({ showgGild: false }, props);
	const [local, others] = splitProps(merged, ["children", "steamid", "accountid", "showgGild"]);
	const resolved = children(() => local.children);

	const showgGild = createMemo(() => local.showgGild);
	let userNamePanel: UserName | undefined;
	const [username, setUserName] = createSignal("");

	let p_timer = -1;
	const updateName = () => {
		if (p_timer != -1) {
			clearInterval(p_timer);
		}
		// 开启计时器
		p_timer = setInterval(() => {
			if (userNamePanel != undefined && userNamePanel.IsValid()) {
				let label = userNamePanel.GetChild(0) as LabelPanel;
				let gild = label.text.match(/\[.*?\]/g);
				if (gild && gild.length > 0) {
					let lastMatch = gild[gild.length - 1];
					let updatedText = label.text.replace(lastMatch, "");
					setUserName(updatedText);
				}
				if (gild && gild[gild.length - 1]) {
					setUserName(label.text.replace(gild[gild.length - 1], ""));
				} else {
					setUserName(label.text);
				}
			}
		}, 10);
	};
	onMount(() => {
		// 更新accountid
		let interval_id = setInterval(() => {
			if (userNamePanel != undefined && userNamePanel.IsValid()) {
				if (local.accountid) {
					userNamePanel.accountid = local.accountid.toString();
				}
				if (local.showgGild == false) {
					userNamePanel.visible = false;
					updateName();
				} else {

				}

				// 在userNamePanel load 之后清除计时器
				clearInterval(interval_id);
				interval_id = -1;
			}
		}, 10);
		onCleanup(() => {
			if (interval_id != -1) {
				clearInterval(interval_id);
			}
			if (p_timer = -1) {
				clearInterval(p_timer);
			}
		});
	});

	createEffect(on(showgGild, show_gild => {
		if (userNamePanel) {
			if (!show_gild) {
				userNamePanel.visible = false;
				updateName();
			} else {
				userNamePanel.visible = true;
				if (p_timer != -1) {
					clearInterval(p_timer);
					p_timer == -1;
				}
			}
		}
	}));

	createEffect(() => {
		if (userNamePanel && local.accountid != undefined) {
			userNamePanel.accountid = local.accountid.toString();
		}
	});

	return (
		<Panel {...EOMProps(others, {
			className: "EOM_UserName",
		})}>
			<CLabel text={username()} />
			<DOTAUserName ref={userNamePanel} steamid={local.steamid} hittest={false} />
			{resolved()}
		</Panel>
	);
};