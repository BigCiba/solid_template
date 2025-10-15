import { ParentComponent, createSignal, splitProps } from "solid-js";
import { EOM_Image } from "../../DataDisplay/EOM_Image/EOM_Image";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import { EOM_IconButton } from "../EOM_Button/EOM_Button";
import { EOM_TextEntry } from "../EOM_TextEntry/EOM_TextEntry";
import "./EOM_SearchBox.less";

interface EOM_SearchBoxAttribute extends EOM_Attribute {
	/**
	 * 变化时回调函数
	 * @param self 输入组件
	 * @param previousText 变化前的文本
	 * @param changedText 变化后的文本
	 */
	onChange?: (self: TextEntry, previousText: string, changedText: string) => void;
	/** 搜索回调 */
	onSearch?: (text: string) => void;
	/** 是否每次输入都更新搜索结果 */
	searchOnInput?: boolean;
}


export const EOM_SearchBox: ParentComponent<EOM_SearchBoxAttribute & TextEntryAttributes> = (props) => {
	const [local, others] = splitProps(props, ["children", "onChange", "oninputsubmit", "text", "searchOnInput", "onSearch"]);

	const [value, setValue] = createSignal(local.text ?? "");
	const onSearch = (text?: string) => {
		if (local.onSearch) {
			local.onSearch(text ?? value());
		}
	};
	const onChange = (text: string) => {
		setValue(text);
		if (local.searchOnInput) {
			onSearch(text);
		}
	};
	return (
		<Panel {...EOMProps(others, {
			className: "EOM_SearchBox",
			style: {
				/** 多行要加这个才会换行 */
				whiteSpace: props.multiline ? "normal" : undefined
			}
		})} >
			<EOM_TextEntry placeholder="#DOTA_Search" onChange={self => onChange(self.text)} oninputsubmit={self => onSearch(self.text)} />
			<Image id="SearchIcon" />
		</Panel>
	);
};