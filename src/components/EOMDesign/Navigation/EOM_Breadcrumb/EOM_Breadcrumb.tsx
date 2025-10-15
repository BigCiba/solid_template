import { For, ParentComponent, createSignal, mergeProps, splitProps } from "solid-js";
import { CLabel, TabButton } from "../../../EOMChildren";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Breadcrumb.less";

interface EOM_BreadcrumbAttribute extends EOM_Attribute {
	list: string[];
	/** 默认选中的index */
	defaultSelected?: number;
	/** 通过传入的属性控制选择项而不是组件自动控制 */
	selected?: number;
	/** 组，同组会一起切换，不填会自动生成一个不重复的字符串 */
	group?: string;
	/** 激活方式，点击切换或者鼠标经过切换 */
	activateType?: "onhover" | "onactivate";
	/** 改变时回调 */
	onChange?: (index: number, text: string) => void;
}

export const EOM_Breadcrumb: ParentComponent<EOM_BreadcrumbAttribute> = (props) => {
	const merged = mergeProps({ list: [], defaultSelected: 0, activateType: "onactivate", group: "EOM_Breadcrumb" + Math.random() }, props);
	const [local, others] = splitProps(merged, ["children", "list", "defaultSelected", "selected", "group", "activateType"]);
	const { defaultSelected, list, group, selected, activateType } = local;
	const [selectedIndex, setSelectedIndex] = createSignal((defaultSelected != undefined) ? Math.min(local.list.length - 1, Math.max(0, defaultSelected - 1)) : undefined);

	const onHover = (index: number) => {
		if (activateType == "onhover") {
			onSelect(index);
		}
	};
	const onSelect = (index: number) => {
		setSelectedIndex(index);
		if (others.onChange) {
			others.onChange(index, list[index]);
		}
	};

	return (
		<Panel {...EOMProps(others, {
			className: "EOM_Breadcrumb"
		})}>
			<For each={local.list}>
				{(name, index) => {
					if (index() > 0) {
						return (
							<>
								<CLabel className="EOM_BreadcrumbSeparator" text="/" />
								<TabButton selected={selected != undefined ? selected - 1 == index() : selectedIndex() == index()} group={group} onactivate={() => onSelect(index())} text={name} onmouseover={() => onHover(index())} />
							</>
						);
					} else {
						return <TabButton selected={selected != undefined ? selected - 1 == index() : selectedIndex() == index()} group={group} onactivate={() => onSelect(index())} text={name} onmouseover={() => onHover(index())} />;
					}
				}}
			</For>
		</Panel>
	);
};