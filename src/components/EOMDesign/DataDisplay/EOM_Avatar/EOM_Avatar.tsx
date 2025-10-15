import { ParentComponent, children, createEffect, mergeProps, onCleanup, onMount, splitProps } from 'solid-js';
import { EOMProps, EOM_Attribute } from '../../EOMDesign';
import "./EOM_Avatar.less";

interface EOM_AvatarAttribute extends EOM_Attribute {
	/** 长id */
	steamid?: string;
	/** 短id */
	accountid?: string;
	/** tooltip */
}

export const EOM_Avatar: ParentComponent<EOM_AvatarAttribute> = (props) => {
	let avatarImage: AvatarImage | undefined;
	const merged = mergeProps({ steamid: "-1", accountid: "-1", }, props);
	const [local, others] = splitProps(merged, ["children", "steamid", "accountid"]);
	const resolved = children(() => local.children);

	onMount(() => {
		// 首次初始化EOM_Avatar
		let interval_id = setInterval(() => {
			if (avatarImage != undefined && avatarImage?.IsValid()) {
				avatarImage.accountid = local.accountid.toString();
				clearInterval(interval_id);
				interval_id = -1;
			}
		}, 10);
		onCleanup(() => {
			if (interval_id != -1) {
				clearInterval(interval_id);
			}
		});
	});
	createEffect(() => {
		if (avatarImage != undefined && avatarImage?.IsValid()) {
			if (local.accountid) {
				avatarImage.accountid = local.accountid.toString();
			}
		}
	});
	return (
		<Panel {...EOMProps(others, {
			className: "EOM_Avatar",
		})}>
			<DOTAAvatarImage ref={avatarImage} steamid={local.steamid} style={{ width: "100%", height: "100%" }} hittest={false} />
			{resolved()}
		</Panel>
	);
};
