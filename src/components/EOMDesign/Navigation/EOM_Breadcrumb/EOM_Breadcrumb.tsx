import { For, ParentComponent, createSignal } from "solid-js";
import { useSimpleProps } from "../../EOMDesign";
import "./EOM_Breadcrumb.less";

interface EOM_BreadcrumbAttribute extends PanelAttributes {
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
	const { local, others } = useSimpleProps(props, {
		defaultValues: { list: [], defaultSelected: 0, activateType: "onactivate", group: "EOM_Breadcrumb" + Math.random() },
		localKeys: ["children", "list", "defaultSelected", "selected", "group", "activateType"] as const,
		componentClass: ["EOM_Breadcrumb"]
	});
	const { defaultSelected, list, group, selected, activateType } = local;
	const [selectedIndex, setSelectedIndex] = createSignal((defaultSelected != undefined) ? Math.min(local.list.length - 1, Math.max(0, defaultSelected - 1)) : undefined);

	const onHover = (index: number) => {
		if (activateType == "onhover") {
			onSelect(index);
		}
	};
	const onSelect = (index: number) => {
		setSelectedIndex(index);
		if (props.onChange) {
			props.onChange(index, list[index]);
		}
	};

	return (
		<Panel {...others}>
			<For each={local.list}>
				{(name, index) => (
					<>
						{index() > 0 && <Label className="EOM_BreadcrumbSeparator" text="/" />}
						<TabButton
							selected={selected !== undefined ? selected - 1 === index() : selectedIndex() === index()}
							group={group}
							text={name}
							onactivate={() => onSelect(index())}
							onmouseover={() => onHover(index())}
						/>
					</>
				)}
			</For>
		</Panel>
	);
};