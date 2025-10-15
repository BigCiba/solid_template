import classNames from "classnames";
import { ParentComponent, createSignal, mergeProps, onCleanup, onMount, splitProps, untrack } from "solid-js";
import { EOM_Popup } from "../../components/EOMDesign/Container/EOM_Popup/EOM_Popup";
import { ADDON_NAME, EOMProps, EOM_Attribute } from "../../components/EOMDesign/EOMDesign";

export interface PopupProps {
	/** 当前Popup的ID，销毁用的 */
	PopupID: string,
	/** popup组 */
	group?: string;
}

interface BasePopupProperty extends EOM_Attribute {
	/** 可选标题 */
	title?: string;
	/** 预设的窗口大小，如果传入了长宽该属性无效 */
	size?: "normal" | "small" | "large";
	/** 点击外部空白区域的时候是否关闭 */
	closeOnClickOuter?: boolean;
	/** 按下Esc的时候是否关闭 */
	closeOnEsc?: boolean;
	/** 是否在销毁时自动销毁同group的popup */
	closeGroup?: boolean;
	/** 当前Popup的ID，如果传入已经存在的ID就会更新popup而不是重新创建一个，销毁时也是根据ID销毁 */
	PopupID: string,
	/** 当前Popup所属的组，可以用ClosePupupGroup批量销毁同组Popup */
	group?: string;
	/** 隐藏关闭按钮 */
	hideClose?: boolean;
	/** 样式 */
	type?: "Tui7" | "Tui3" | "P2" | "C4" | "Tui10" | "Custom";
}

export const BasePopup: ParentComponent<BasePopupProperty> = (props) => {
	const merged = mergeProps({
		size: "normal",
		closeOnClickOuter: true,
		closeOnEsc: true,
		closeGroup: true,
		hideClose: false,
		type: ADDON_NAME
	}, props);
	const [local, others] = splitProps(merged, ["children", "id", "title", "size", "closeOnClickOuter", "closeOnEsc", "closeGroup", "PopupID", "group", "hideClose", "type"]);
	const onClickOuter = () => {
		if (local.closeOnClickOuter) {
			closePopup(local.PopupID);
		}
	};
	const onEsc = () => {
		if (local.closeOnEsc) {
			closePopup(local.PopupID);
		}
	};
	onMount(() => {
		/** 监听事件显示面板 */
		const id = GameEvents.Subscribe("client_side_event", (eventData: any) => {
			if ("close_popup_fadeout" == eventData.event_name) {
				let data = eventData.event_data as {
					PopupID?: string,
					group?: string;
				};
				if (data.PopupID) {
					if (local.PopupID == data.PopupID) {
						setPopupShow(false);
						setPopupClose(true);
					}
				} else if (data.group) {
					if (local.group == data.group) {
						setPopupShow(false);
						setPopupClose(true);
					}
				}
			}
		});
		onCleanup(() => GameEvents.Unsubscribe(id));
	});
	const [popupShow, setPopupShow] = createSignal(false);
	const [popupClose, setPopupClose] = createSignal(false);
	return (
		<Button id={local.PopupID} {...EOMProps(others, { className: "PopupContainer" })} onactivate={self => onClickOuter()} onload={self => { setPopupShow(true); self.SetFocus(); }} oncancel={self => onEsc()} >
			<EOM_Popup id={local.id ?? "EOM_PopupMain"} type={local.type} popType="PopupType_PopOut" size={local.size as "normal"} title={local.title} className={classNames({ EOM_PopupMainShow: popupShow(), EOM_PopupMainClose: popupClose() })} hideClose={local.hideClose} align="center center" onClose={() => {
				closePopup(local.PopupID);
			}} >
				{untrack(() => local.children)}
			</EOM_Popup>
		</Button>
	);
};

export const PopupBox: ParentComponent<EOM_Attribute> = (props) => {
	const [local, others] = splitProps(props, ["children"]);
	return (
		<Panel {...EOMProps(others, {
			className: "PopupBox"
		})} >
			{local.children}
		</Panel>
	);
};