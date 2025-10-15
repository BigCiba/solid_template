import classNames from "classnames";
import { ParentComponent, mergeProps, splitProps } from "solid-js";
import { CLabel } from "../../../EOMChildren";
import { ADDON_NAME, EOMProps, EOM_Attribute } from "../../EOMDesign";
import { EOM_CloseButton } from "../../Input/EOM_Button/EOM_Button";
import "./EOM_Popup.less";
import { GetLocalization } from "../../../../utils/localization";

interface EOM_Popup_Attribute extends EOM_Attribute {
	title?: string;
	type?: "Tui7" | "Tui3" | "P2" | "C4" | "Tui10" | "Tui12" | "Custom";
	/** 只适配C4 预设的窗口大小，如果传入了长宽该属性无效 */
	size?: "normal" | "small" | "large";
	popType?: "PopupType_LeftTop" | "PopupType_PopOut";
	/** 隐藏关闭按钮 */
	hideClose?: boolean;
	onClose?: () => void;
}

/** 新的弹窗通用样式 */
export const EOM_Popup: ParentComponent<EOM_Popup_Attribute & PanelAttributes> = (props) => {
	const merged = mergeProps({
		type: ADDON_NAME,
		popType: "PopupType_LeftTop",
		hideClose: false,
		size: "normal",
		onClose: () => { }
	}, props);
	const [local, others] = splitProps(merged, ["children", "title", "type", "size", "popType", "hideClose", "onClose"]);
	const { title, type, hideClose } = local;
	return (
		<Panel onactivate={() => { }} {...EOMProps(others, {
			className: classNames("EOM_PopupMain", local.popType, local.type, local.size)
		})}>
			{/* @ts-ignore */}
			<EOM_PopupBG type={type} hasTitle={(title != undefined && title != "")} size={local.size} />
			{(title != undefined && title != "") &&
				<CLabel className={classNames("EOM_PopupTitle", type)} text={GetLocalization(title)} />
			}
			{!hideClose &&
				<EOM_CloseButton type={local.type} onactivate={() => local.onClose()} />
				// <EOM_IconButton className={type} icon={<EOM_Icon type="XClose" extraType={local.type} />} onactivate={() => local.onClose()} />
			}
			<Panel hittest={false} className={classNames("EOM_PopupContent", type)}>
				{local.children}
			</Panel>
		</Panel>
	);
};

interface EOM_PopupBG_Attribute extends EOM_Attribute {
	hasTitle: boolean;
	type: "Tui7" | "Tui3" | "P2" | "C4" | "Tui10";
	/** 只适配C4 预设的窗口大小，如果传入了长宽该属性无效 */
	size?: "normal" | "small" | "large";
}


/** 拼接弹窗背景 */
export const EOM_PopupBG: ParentComponent<EOM_PopupBG_Attribute> = (props) => {
	const merged = mergeProps({
		type: ADDON_NAME,
		hasTitle: true,
		size: "Normal",
	}, props);
	const [local, others] = splitProps(merged, ["children", "type", "size", "hasTitle"]);
	return (
		<Panel {...EOMProps(others, {
			className: classNames("EOM_PopupBG", local.type, local.size)
		})} hittest={false} hittestchildren={false} >
			<Panel className="EOM_Texture" />
			{(local.hasTitle && local.type != "C4") &&
				<Panel className="EOM_TitleBG" />
			}
			{(local.hasTitle && local.type == "C4") &&
				<Panel className="EOM_TitleBG">
					<Panel className="EOM_Title_Color" />
					<Panel className="EOM_Title_HighLightLeft" />
					<Panel className="EOM_Title_HighLightRight" />
					<Panel className="EOM_Title_HighLightTop" />
					<Panel className="EOM_Title_HighLightBottom" />
					<Panel className="EOM_Title_Material" />
					<Panel className="EOM_Title_LeftBG" />
					<Panel className="EOM_Title_CenterBG" />
					<Panel className="EOM_Title_RightBG" />
				</Panel>
			}
			{local.type == "C4" &&
				<Panel className="EOM_Material" />
			}
			{local.type == "Tui10" &&
				<Panel className="EOM_TitleRect" />
			}
			<Panel className="EOM_HeaderBG" />
			<Panel className="EOM_LeftTopBG" />
			<Panel className="EOM_CenterTopBG" />
			<Panel className="EOM_RightTopBG" />
			<Panel className="EOM_LeftCenterBG" />
			<Panel className="EOM_CenterCenterBG" />
			<Panel className="EOM_RightCenterBG" />
			<Panel className="EOM_LeftBottomBG" />
			<Panel className="EOM_CenterBottomBG" />
			<Panel className="EOM_RightBottomBG" />
		</Panel>
	);
};