import classNames from 'classnames';
import { ParentComponent, Show, mergeProps, splitProps } from 'solid-js';
import { EOM_Panel } from '../../Container/EOM_Panel/EOM_Panel';
import { ADDON_NAME, EOMProps, EOM_Attribute } from '../../EOMDesign';
import { EOM_IconButton } from '../../Input/EOM_Button/EOM_Button';
import { EOM_Image } from '../EOM_Image/EOM_Image';
import "./EOM_Currency.less";

export interface EOM_CurrencyAttribute extends EOM_Attribute {
	/** 是否有反馈 */
	hasFeedback?: boolean;
	/** 图标 */
	icon?: string;
	/** 值 */
	value?: number;
	/** wash-color */
	onaddbuttonactivate?: (self: Panel) => void;
	/** 样式类型 */
	type?: "Default" | "P2" | "Tui7" | "C4" | "Tui12";
}

export const EOM_Currency: ParentComponent<EOM_CurrencyAttribute> = (props) => {
	const merged = mergeProps({ hasFeedback: false, type: ADDON_NAME }, props);
	const [local, others] = splitProps(merged, ["hasFeedback", "type", "icon", "value", "onaddbuttonactivate"]);
	return (
		<Panel {...EOMProps(others, { className: classNames("EOM_Currency", local.type) })}>
			<Show when={local.hasFeedback}>
				<TextButton className="EOM_Feedback" text="#StoreRechargeReport" onactivate={(pSelf) => {
					// pSelf.enabled = false;
					// Request("OrderSupplement", {}, (tData) => {
					// 	pSelf.enabled = true;
					// 	if (tData.status == 1 && tData.msg == "success") {
					// 		Popups.Show("error_message", { title: "#OrderSupplementTitle", msg: "#" + tData.msg });
					// 	} else {
					// 		Popups.Show("error_message", { title: "#OrderSupplementTitle", msg: "#" + tData.msg });
					// 	}
					// });
				}} />
			</Show>
			<EOM_Panel className="EOM_CurrencyContainer" >
				<EOM_Image className="EOM_CurrencyIconBG" >
					<EOM_Panel className="EOM_CurrencyIcon" backgroundImage={local.icon} />
				</EOM_Image>
				<Panel className="EOM_CurrencyLabelContainer">
					<Label text={local.value} />
				</Panel>
				<Show when={local.onaddbuttonactivate != undefined}>
					<EOM_IconButton className="EOM_CurrencyRecharge" icon={<EOM_Image />} onactivate={local.onaddbuttonactivate} />
				</Show>
			</EOM_Panel>
		</Panel>
	);
};
