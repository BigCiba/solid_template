import { render } from '@bigciba/solid-panorama-runtime';
import { createSignal, onCleanup, onMount, Show } from 'solid-js';
import { useNetTable } from 'solid-panorama-all-in-jsx/events.macro';
import { DemoButton, DemoSelectionButton, DemoTextEntry, DemoToggle, EOM_DebugTool, EOM_DebugTool_Category, EOM_DebugTool_TextPicker, EOM_UnitInfo } from '../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool';
import { EOM_DebugTool_AbilityPicker } from './picker/ability_picker';
import { EOM_DebugTool_ItemPicker } from './picker/item_picker';

function Demo() {
	const demoSetting = useNetTable("common", "demo_settings");
	const setting = useNetTable("common", "settings");
	const CompileTooltip = () => {
		const list = KeyValues.TooltipList ?? [];
		list.forEach((item: string) => {
			console.log("CompileTooltip: ", item);
			ShowCustomTooltip($.GetContextPanel(), item, {});
		});
	};
	/** 获取英雄技能 */
	const getAbilityList = () => {
		let abilities: string[] = [];
		for (const sAbilityName in KeyValues.AbilitiesKv) {
			if (sAbilityName != "Version") {
				const tAbilityData = KeyValues.AbilitiesKv[sAbilityName];

				if (typeof (tAbilityData) != "object") continue;
				if (tAbilityData.AbilityType && tAbilityData.AbilityType == "DOTA_ABILITY_TYPE_ATTRIBUTES") continue;

				abilities.push(sAbilityName);
			}
		}
		return abilities;
	};
	/** 获取物品列表 */
	const getItemList = () => {
		let items = [];
		for (const itemName in KeyValues.ItemsKv) {
			if (itemName != "Version") {
				const itemData = KeyValues.ItemsKv[itemName];
				if (typeof (itemData) != "object") continue;
				if (itemData.ItemRecipe && Number(itemData.ItemRecipe) == 1) continue;

				items.push(itemName);
			}
		}

		items.sort();
		return items;
	};
	const getItemToggleList = () => {
		let itemToggleList: Table = {};
		for (const itemName in KeyValues.ItemsKv) {
			if (itemName != "Version") {
				const itemData = KeyValues.ItemsKv[itemName];
				if (typeof (itemData) != "object") continue;
				if (itemData.ItemRecipe && Number(itemData.ItemRecipe) == 1) continue;
				if (itemData.CustomItemType == undefined) continue;
				itemToggleList[itemData.CustomItemType] = GetLocalization(`#CustomItemType_${itemData.CustomItemType}`);
			}
		}

		return itemToggleList;
	};
	const itemFilter = (toggleType: string, itemName: string) => {
		if (toggleType == "") return true;
		return toggleType == KeyValues.ItemsKv[itemName]?.CustomItemType;
	};
	const getAbilityToggleList = () => {
		let itemToggleList: Table = {};
		for (const itemName in KeyValues.AbilitiesKv) {
			if (itemName != "Version") {
				const itemData = KeyValues.AbilitiesKv[itemName];
				if (typeof (itemData) != "object") continue;
				if (itemData.CustomAbilityType == undefined) continue;
				itemToggleList[itemData.CustomAbilityType] = GetLocalization(`#CustomAbilityType_${itemData.CustomAbilityType}`);
			}
		}
		itemToggleList["OTHER"] = "其他";
		return itemToggleList;
	};
	const abilityFilter = (toggleType: string, itemName: string) => {
		if (toggleType == "") return true;
		return toggleType == (KeyValues.AbilitiesKv[itemName].CustomAbilityType ?? "OTHER");
	};
	/** 获取英雄技能 */
	// const getAbilityUpgradeList = () => {
	// 	let list = new Set([...Object.keys(KeyValues.AbilityUpgradesKv), ...Object.keys(KeyValues.ItemUpgradesKv)]);
	// 	return Array.from(list);
	// };
	// const getAbilityUpgradeToggleList = () => {
	// 	let itemToggleList: Table = {};
	// 	for (const itemName in KeyValues.AbilityUpgradesKv) {
	// 		if (itemName != "Version") {
	// 			const itemData = KeyValues.AbilityUpgradesKv[itemName];
	// 			if (typeof (itemData) != "object") continue;
	// 			if (itemData.tag == undefined) continue;
	// 			itemToggleList[itemData.tag] = GetLocalization(`#AbilityUpgradeType_${itemData.tag}`);
	// 		}
	// 	}
	// 	for (const itemName in KeyValues.ItemUpgradesKv) {
	// 		if (itemName != "Version") {
	// 			const itemData = KeyValues.ItemUpgradesKv[itemName];
	// 			if (typeof (itemData) != "object") continue;
	// 			if (itemData.tag == undefined) continue;
	// 			itemToggleList[itemData.tag] = GetLocalization(`#AbilityUpgradeType_${itemData.tag}`);
	// 		}
	// 	}
	// 	itemToggleList["OTHER"] = "其他";
	// 	return itemToggleList;
	// };
	// const abilityUpgradeFilter = (toggleType: string, itemName: string) => {
	// 	if (toggleType == "") return true;
	// 	return toggleType == (KeyValues.AbilityUpgradesKv[itemName]?.tag ?? KeyValues.ItemUpgradesKv[itemName]?.tag ?? "OTHER");
	// };
	const getUnitList = () => {
		let units: string[] = [];
		for (const sUnitName in KeyValues.UnitsKv) {
			if (sUnitName != "Version") {
				const tAbilityData = KeyValues.UnitsKv[sUnitName];

				if (typeof (tAbilityData) != "object") continue;

				units.push(sUnitName);
			}
		}
		return units;
	};
	const getUnitToggleList = () => {
		let unitToggleList: Table = {};
		for (const itemName in KeyValues.UnitsKv) {
			if (itemName != "Version") {
				const itemData = KeyValues.UnitsKv[itemName];
				if (typeof (itemData) != "object") continue;
				if (itemData.Filter == undefined) continue;
				unitToggleList[itemData.Filter] = itemData.Filter;
			}
		}
		unitToggleList["OTHER"] = "其他";
		return unitToggleList;
	};
	const unitFilter = (toggleType: string, itemName: string) => {
		if (toggleType == "") return true;
		return toggleType == (KeyValues.UnitsKv[itemName].Filter ?? "OTHER");
	};

	/** 获取英雄列表 */
	const getCommonHeroList = () => {
		return Object.keys(KeyValues.HeroesKv);
	};

	const [abilityList, setAbilityList] = createSignal(getAbilityList());
	const [itemList, setItemList] = createSignal(getItemList());
	const [unitList, setUnitList] = createSignal(getUnitList());
	const [commonHeroList, setCommonHeroList] = createSignal(getCommonHeroList());
	// const [abilityUpgradeList, setAbilityUpgradeList] = createSignal(getAbilityUpgradeList());


	useClientSideEvent("RefreshDebugToolData", () => {
		setAbilityList([]);
		setItemList([]);
		setUnitList([]);
		setCommonHeroList([]);
		setAbilityList(getAbilityList());
		setItemList(getItemList());
		setUnitList(getUnitList());
		setCommonHeroList(getCommonHeroList());
		// setAbilityUpgradeList(getAbilityUpgradeList());
	});

	onMount(() => {
		const eventIdList: GameEventListenerID[] = [];
		onCleanup(() => {
			eventIdList.forEach(id => GameEvents.Unsubscribe(id));
		});
	});

	return (
		<Show when={true}>
			<EOM_DebugTool direction="left" tabList={["常用", "后端"]} containerElement={
				<>
					<EOM_DebugTool_AbilityPicker title="添加技能" eventName="AddAbility" itemNames={abilityList()} toggleList={getAbilityToggleList()} filterFunc={abilityFilter} />
					<EOM_DebugTool_ItemPicker title="添加物品" eventName="AddItem" itemNames={itemList()} toggleList={getItemToggleList()} filterFunc={itemFilter} />
					<EOM_DebugTool_TextPicker title="创建友方单位" eventName="CreateAlly" itemNames={unitList()} toggleList={getUnitToggleList()} filterFunc={unitFilter} />
					<EOM_DebugTool_TextPicker title="创建敌方单位" eventName="CreateEnemy" itemNames={unitList()} toggleList={getUnitToggleList()} filterFunc={unitFilter} />
					<EOM_DebugTool_TextPicker title="更换英雄" eventName="ChangeHero" itemNames={commonHeroList()} />
					{/* <EOM_DebugTool_TextPicker title="添加技能升级" eventName="AddAbilityUpgrade" itemNames={abilityUpgradeList()} toggleList={getAbilityUpgradeToggleList()} filterFunc={abilityUpgradeFilter} /> */}
					<EOM_UnitInfo />
				</>
			}>
				{/* 常用 */}
				<EOM_DebugTool_Category tabIndex={0} title="游戏" >
					<DemoTextEntry eventName="ChangeHostTimescale" text="主机速度" />
					<DemoButton eventName="Standby" text="测试按钮" />
				</EOM_DebugTool_Category>
				<EOM_DebugTool_Category tabIndex={0} title="技能和物品" >
					<DemoSelectionButton eventName="AddAbility" text="添加技能" />
					<DemoSelectionButton eventName="AddItem" text="添加装备" />
					<DemoSelectionButton eventName="AddAbilityUpgrade" text="添加技能升级" />
					<DemoButton eventName="RemoveGroundItemsPressed" text="删除地上物品" />
				</EOM_DebugTool_Category>
				<EOM_DebugTool_Category tabIndex={0} title="英雄" >
					<DemoButton eventName="Refresh" text="刷新状态" />
					<DemoToggle eventName="FreeSpells" text="无限技能" selected={demoSetting()?.free_spells == 1} />
					<DemoTextEntry eventName="LevelUp" text="升级" />
					<DemoSelectionButton eventName="ChangeHero" text="更换英雄" />
				</EOM_DebugTool_Category>
				<EOM_DebugTool_Category tabIndex={0} title="单位" >
					<DemoButton eventName="DummyTarget" text="创建木桩" />
					<DemoButton eventName="RemoveSpawnedUnits" text="移除目标" />
					<DemoSelectionButton eventName="CreateAlly" text="创建友方单位" />
					<DemoSelectionButton eventName="CreateEnemy" text="创建敌方单位" />
					<DemoButton eventName="ControlUnit" text="切换控制权" />
					<DemoSelectionButton eventName="EOM_UnitInfo" text="单位信息面板" />
				</EOM_DebugTool_Category>

				{/* 后端 */}
				<EOM_DebugTool_Category tabIndex={1} title="数据" >
					<DemoButton eventName="Login" text="重新登录" />
				</EOM_DebugTool_Category>



				<EOM_DebugTool_Category title="其他" >
					<DemoButton eventName="ReloadKeyValue" color="CyanButton" text="重载KV" />
					<DemoButton eventName="ReloadScript" color="GreenButton" text="重载脚本" />
					<DemoButton eventName="CompileTooltip" text="编译Popups" onactivate={() => CompileTooltip()} />
					<DemoButton eventName="Restart" color="RedButton" text="重开游戏" />
				</EOM_DebugTool_Category>
			</EOM_DebugTool>
		</Show>
	);
}

render(() => <Demo />, $.GetContextPanel());