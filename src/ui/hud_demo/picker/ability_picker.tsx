import { createSignal, For, ParentComponent, splitProps } from "solid-js";
import { EOM_BaseButton } from "../../../components/EOMDesign/Input/EOM_Button/EOM_Button";
import { EOM_Breadcrumb } from "../../../components/EOMDesign/Navigation/EOM_Breadcrumb/EOM_Breadcrumb";
import { FireEvent, SelectionContainer } from "../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import { Pinyin } from "../pinyin";

/** 技能选择 */
export const EOM_DebugTool_AbilityPicker: ParentComponent<{
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
	const [rarity, setRarity] = createSignal("ALL");
	const visible = (abilityname: string) => {
		if (local.filterFunc) {
			if (!local.filterFunc(toggleType(), abilityname)) {
				return false;
			}
		}

		if (rarity() != "ALL" && GameUI.CustomUIConfig().AbilitiesKv[abilityname].Rarity != rarity().toLowerCase()) {
			return false;
		}

		if (filterWord() != "") {
			let reg = new RegExp(filterWord(), "gim");
			let localized = GetLocalization("#DOTA_Tooltip_ability_" + abilityname);
			if (
				abilityname.search(reg) == -1
				&& localized.search(new RegExp(filterWord(), "gim")) == -1
				&& !Pinyin.test(reg, localized)
			) {
				return false;
			}
		}

		return true;
	};
	return (
		<SelectionContainer
			eventName={local.eventName}
			title={local.title}
			toggleList={local.toggleList}
			onSearch={text => setFilterWord(text)}
			onToggleType={text => {
				setToggleType(text);
				setRarity("ALL");
			}}
			onChangeRawMode={rawMode => setRawMode(rawMode)}
			canScroll={false}
		>
			<Panel width="100%" height="100%" margin="-6px" backgroundColor="#00000066" flowChildren="down">
				<EOM_Breadcrumb list={["ALL", "0", "1", "2", "3", "4", "5"]} marginLeft="6px" marginTop="10px" onChange={(index, itemName) => setRarity(itemName)} />
				<Panel class="EOM_DebugTool_AbilityPicker" marginTop="10px" flowChildren="right-wrap" width="100%" scroll="y" >
					<For each={local.itemNames}>
						{(abilityname, index) => {
							return (
								<EOM_BaseButton visible={visible(abilityname)} class="EOM_DebugTool_AbilityPickerItem" width="64px" flowChildren="down" onactivate={self => FireEvent(local.eventName, abilityname)} onmouseover={p => CustomUIConfig.ShowAbilityTooltip<AbilityTooltip>(p, { abilityname: abilityname, onlycurrentlevelvalue: false })} onmouseout={p => CustomUIConfig.HideAbilityTooltip(p)}>
									<DOTAAbilityImage abilityname={abilityname} showtooltip={false} />
									<Label class="EOM_DebugTool_AbilityPickerItemName" text={rawMode() ? abilityname : "#DOTA_Tooltip_ability_" + abilityname} />
								</EOM_BaseButton>
							);
						}}
					</For>

				</Panel>
			</Panel >
		</SelectionContainer>
	);
};