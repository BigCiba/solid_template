import { render } from "@bigciba/solid-panorama-runtime";
import classNames from "classnames";
import { ComponentProps, For, Show, mergeProps, onCleanup, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { EOM_Panel } from "../../components/EOMDesign/Container/EOM_Panel/EOM_Panel";
import { Popup_AthenaGetGift } from "./athena_get_gift/athena_get_gift";
import { Popup_BackpackUseItem } from "./backpack_use_item/backpack_use_item";
import { PopupProps } from "./base_popup";
import { Popup_BPTask } from "./bp_task/bp_task";
import { Popup_ChooseDrawLucky } from "./choose_draw_lucky/choose_draw_lucky";
import { Popup_CommonConfirm } from "./common_confirm/common_confirm";
import { Popup_ExchangeAbility } from "./exchange_ability/exchange_ability";
import { Popup_ExchangeHeroPiece } from "./exchange_hero_piece/exchange_hero_piece";
import { Popup_GemCompose } from "./gem/gem";
import { Popup_GeneSuitHandbook } from "./gene_suit_handbook/gene_suit_handbook";
import { Popup_HeroAbilityTalent } from "./hero_ability_talent/hero_ability_talent";
import { Popup_Newbie } from "./newbie/newbie";
import { Popup_Progress } from "./progress/progress";
import { Popup_RestartConfirm } from "./restart_confirm/restart_confirm";
import { Popup_StoreBuyItem } from "./store_buy_item/store_buy_item";
import { Popup_StoreBuyItemResult } from "./store_buy_item_result/store_buy_item_result";
import { Popup_PaymentOversea, Popup_StoreMoneyPayment } from "./store_money_payment/store_money_payment";
import { Popup_VipReward } from "./vip_reward/vip_reward";

/** 不同的popup要在这里定义一下 */
const PopupComponents = {
	ExchangeAbility: Popup_ExchangeAbility,
	StoreBuyItem: Popup_StoreBuyItem,
	StoreBuyItemResult: Popup_StoreBuyItemResult,
	StoreMoneyPayment: Popup_StoreMoneyPayment,
	StoreMoneyPaymentOversea: Popup_PaymentOversea,
	CommonConfirm: Popup_CommonConfirm,
	BackpackUseItem: Popup_BackpackUseItem,
	VipReward: Popup_VipReward,
	GemCompose: Popup_GemCompose,
	ExchangeHeroPiece: Popup_ExchangeHeroPiece,
	BPTask: Popup_BPTask,
	Progress: Popup_Progress,
	GeneSuitHandbook: Popup_GeneSuitHandbook,
	ChooseDrawLucky: Popup_ChooseDrawLucky,
	HeroAbilityTalent: Popup_HeroAbilityTalent,
	RestartConfirm: Popup_RestartConfirm,
	AthenaGetGift: Popup_AthenaGetGift,
	Newbie: Popup_Newbie,
};
const StaticPopup: string[] = [
];

declare global {
	type PopupComponents = typeof PopupComponents;
	type PopupName = keyof PopupComponents;

	type GetPopupProps<T extends PopupName> = Omit<ComponentProps<PopupComponents[T]>, keyof PopupProps> & { PopupID?: string; group?: string; };

	// 写到CustomUIConfig里以解决重载代码顺序造成引用还是旧代码的问题
	interface CustomUIConfig {
		/** 开启Popup，可以传入回调函数的版本 */
		showPopup: <T extends PopupName>(
			name: T,
			props: GetPopupProps<T>
		) => string;

		setPopupData: <T extends PopupName>(PopupID: string, props: Partial<GetPopupProps<T>>) => void;
	}
}

const Popups = () => {
	const [popupData, setPopupData] = createStore<Record<string, any>>({});

	CustomUIConfig.showPopup = function (popupName, props) {
		const PopupID = StaticPopup.includes(popupName) ? popupName : (props.PopupID ?? DoUniqueString("Popup"));
		setPopupData(PopupID, { ...props, ...{ popupName, PopupID } });
		return PopupID;
	};
	CustomUIConfig.setPopupData = function (PopupID, props) {
		if (popupData[PopupID]) {
			setPopupData(PopupID, Object.assign({}, mergeProps(popupData[PopupID], props)));
		}
	};

	onMount(() => {
		/** 监听事件显示面板 */
		const id = GameEvents.Subscribe("client_side_event", (eventData: any) => {
			if ("show_popup" == eventData.event_name) {
				let data = (JSON.parse(eventData.event_data)) as {
					PopupID: string,
					popupName: string;
				};
				if (data.popupName && PopupComponents[data.popupName as PopupName]) {
					setPopupData(data.PopupID, data);
				} else {
					console.error("invalid popupName: " + data.popupName);
				}
			}
			if ("close_popup" == eventData.event_name) {
				let data = eventData.event_data as {
					PopupID?: string,
					group?: string;
				};
				if (data.PopupID) {
					setPopupData(data.PopupID, undefined);
				}
			}
		});
		onCleanup(() => GameEvents.Unsubscribe(id));
	});
	return (
		<EOM_Panel id="Popups" hittest={false} className={classNames({ ShowPopup: Object.keys(popupData).length > 0 })}>
			<For each={Object.keys(popupData)}>
				{(PopupID, index) => {
					return <Show when={popupData[PopupID].popupName}>
						{PopupComponents[popupData[PopupID].popupName as PopupName](popupData[(PopupID)])}
					</Show>;
				}}
			</For>
		</EOM_Panel>
	);
};

render(() => Popups(), $.GetContextPanel());
