import { CLabel } from "../../../GenericPanel/GenericPanel";
import { EOM_IconButton } from "../../Input/EOM_Button/EOM_Button";
import "./EOM_Dota2Menu.less";

/**
 * dota2左上角两个菜单按钮
 */
export const EOM_Dota2Menu = (props: {
	type?: "Tui9" | "C4";
}) => {
	return (
		<Panel id="EOM_Dota2Menu" className={props.type}>
			{/* 官方的两个按钮 */}
			<Panel id="Dota2Button">
				<EOM_IconButton className={props.type ?? "Dota2Button"} icon={<Image id="Return" />} onactivate={self => $.DispatchEvent("DOTAHUDShowDashboard", self)} tooltip_text="#DOTA_HUD_BackToDashboard" >
					<Image id="ReturnHover" />
					<CLabel className="MenuLabel" text={"返回"} />
				</EOM_IconButton>
				<EOM_IconButton className={props.type ?? "Dota2Button"} icon={<Image id="Setting" />} onactivate={self => $.DispatchEvent("DOTAShowSettingsPopup", self)} tooltip_text="#DOTA_HUD_Settings" >
					<Image id="SettingHover" />
					<CLabel className="MenuLabel" text={"设置"} />
				</EOM_IconButton>
			</Panel>
		</Panel>
	);
};