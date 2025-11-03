import { ParentComponent, Show, mergeProps, splitProps } from 'solid-js';
import { EOM_IconButton } from '../../Input/EOM_Button/EOM_Button';
import "./EOM_Currency.less";

export interface EOM_CurrencyAttribute extends PanelAttributes {
	/** 是否有反馈 */
	hasFeedback?: boolean;
	/** 图标 */
	icon?: string;
	/** 值 */
	value?: number;
	/** wash-color */
	onaddbuttonactivate?: (self: Panel) => void;
}

export const EOM_Currency: ParentComponent<EOM_CurrencyAttribute> = (props) => {
	const merged = mergeProps({ hasFeedback: false }, props, { class: "EOM_Currency" });
	const [local, others] = splitProps(merged, ["hasFeedback", "icon", "value", "onaddbuttonactivate"]);
	return (
		<Panel {...others}>
			<Show when={local.hasFeedback}>
				<TextButton class="EOM_Feedback" text="#StoreRechargeReport" onactivate={(pSelf) => {
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
			<Panel class="EOM_CurrencyContainer" >
				<Image class="EOM_CurrencyIconBG" >
					<Panel class="EOM_CurrencyIcon" backgroundImage={local.icon} />
				</Image>
				<Panel class="EOM_CurrencyLabelContainer">
					<Label text={local.value} />
				</Panel>
				<Show when={local.onaddbuttonactivate != undefined}>
					<EOM_IconButton class="EOM_CurrencyRecharge" icon={<Image />} onactivate={local.onaddbuttonactivate} />
				</Show>
			</Panel>
		</Panel>
	);
};
