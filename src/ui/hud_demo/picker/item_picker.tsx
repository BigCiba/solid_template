import { createSignal, For, ParentComponent, splitProps } from "solid-js";
import { EOM_BaseButton } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_Breadcrumb } from "../../../components/EOMDesign/Navigation/EOM_Breadcrumb/EOM_Breadcrumb";
import { FireEvent, SelectionContainer } from "../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { Pinyin } from "../pinyin";

/** 选择物品 */
export const EOM_DebugTool_ItemPicker: ParentComponent<{
	/** 事件名 */
	eventName: string;
	/** 列表 */
	itemNames?: string[];
	/** 窗口标题 */
	title: string;
	/** 分类 */
	toggleList?: {
		/** type是分类，后面实际显示的描述 */
		[toggleType: string]: string;
	};
	/** 过滤器 */
	filterFunc?: (toggleType: string, itemName: string) => boolean;
}> = (props) => {
	const [local, other] = splitProps(props, ["eventName", "title", "toggleList", "filterFunc", "itemNames"]);
	const [filterWord, setFilterWord] = createSignal("");
	const [toggleType, setToggleType] = createSignal("");
	const [rawMode, setRawMode] = createSignal(false);
	const [rarity, setRarity] = createSignal(0);
	const visiable = (abilityname: string) => {
		if (local.filterFunc) {
			if (!local.filterFunc(toggleType(), abilityname)) {
				return false;
			}
		}
		if (rarity() != 0 && GameUI.CustomUIConfig().ItemsKv[abilityname].Rarity != (rarity() - 1)) {
			return false;
		}
		if (filterWord() != "") {
			let regExp;
			try {
				regExp = new RegExp(filterWord(), "gim");
			} catch (error) {
				return true;
			}
			let localized = GetLocalization("#DOTA_Tooltip_ability_" + abilityname);
			if (
				abilityname.search(regExp) != -1
				|| localized.search(regExp) != -1
				|| GetLocalization("#DOTA_Tooltip_ability_" + abilityname + "_Description", "").search(regExp) != -1
				|| Pinyin.test(regExp, localized)
			) {
				return true;
			}
			let abilityValues = CustomUIConfig.ItemsKv[abilityname].AbilityValues;
			let s: Record<string, Partial<AbilityValueData>> = {};
			if (typeof abilityValues == "object") {
				for (const k in abilityValues) {
					s[k] = FormatAbilityValueData(abilityValues[k]);
					if (k.search(regExp) != -1) {
						return true;
					}
					let key;
					if (k.substring(0, 5) == "item_") {
						key = k.substring(5);
					} else if (k.substring(0, 9) == "devoured_") {
						key = k.substring(9);
					}
					if (key != undefined && key.search(regExp) != -1 || GetLocalization("#dota_ability_attribute_" + key, "").search(regExp) != -1) {
						return true;
					}
					let t = abilityValues[k];
					if (typeof t == "object") {
						for (let key in t) {
							key = key.replaceAll(/\s/g, "");
							if (key.search(regExp) != -1 || GetLocalization("#dota_ability_special_variable" + key, "").search(regExp) != -1) {
								return true;
							}
						}
					}
				}

				let description = GetLocalization(`dota_tooltip_ability_${abilityname}_description`, "");
				if (description != "") {
					description = ReplaceValues(description, s);
					if (description.search(regExp) != -1) {
						return true;
					}
				}
			}
			return false;
		}
		return true;
	};

	return (
		<SelectionContainer
			eventName={local.eventName}
			title={local.title}
			toggleList={local.toggleList}
			onSearch={text => setFilterWord(text)}
			onToggleType={text => setToggleType(text)}
			onChangeRawMode={rawMode => setRawMode(rawMode)}
			canScroll={false}
		>
			<Panel width={"100%"} height="100%" margin="-6px" backgroundColor="#00000066" flowChildren="down">
				<EOM_Breadcrumb list={["ALL", "1级", "2级", "3级", "4级", "5级", "6级", "7级"]} marginLeft="6px" marginTop="10px" onChange={(index) => setRarity(index)} />
				<Panel className="EOM_DebugTool_AbilityPicker" marginTop="10px" flowChildren="right-wrap" width="100%" scroll="y" >
					<For each={local.itemNames}>
						{(abilityname, index) =>
							<EOM_BaseButton
								visible={visiable(abilityname)}
								className="EOM_DebugTool_AbilityPickerItem"
								width="64px"
								flowChildren="down"
								onactivate={self => FireEvent(local.eventName, abilityname)}
								onmouseover={p => CustomUIConfig.ShowAbilityTooltip<AbilityShopItemTooltip>(p, { abilityname: abilityname, guidename: "", entityindex: -1 as EntityIndex, onlycurrentlevelvalue: false })}
								onmouseout={p => CustomUIConfig.HideAbilityTooltip(p)}
								oncontextmenu={self => {
									if (rawMode()) {
										$.DispatchEvent("CopyStringToClipboard", abilityname, null);
									} else {
										$.DispatchEvent("CopyStringToClipboard", GetLocalization("#DOTA_Tooltip_ability_" + abilityname), null);
									}
								}}
							>
								<DOTAItemImage itemname={abilityname} showtooltip={false} />
								<Label className="EOM_DebugTool_AbilityPickerItemName" text={rawMode() ? abilityname : ("#" + abilityname)} />
							</EOM_BaseButton>}
					</For>
				</Panel>
			</Panel >
		</SelectionContainer>
	);
};