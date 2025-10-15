import classNames from "classnames";
import { ParentComponent, children, createSignal, splitProps } from "solid-js";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_TextEntry.less";

interface EOM_TextEntryAttribute extends EOM_Attribute {
	/**
	 * 变化时回调函数
	 * @param self 输入组件
	 * @param previousText 变化前的文本
	 * @param changedText 变化后的文本
	 */
	onChange?: (self: TextEntry, previousText: string, changedText: string) => void;
}
export const EOM_TextEntry: ParentComponent<EOM_TextEntryAttribute & TextEntryAttributes> = (props) => {
	const [local, others] = splitProps(props, ["children", "onChange", "oninputsubmit", "text"]);
	const resolved = children(() => local.children);
	const [text, setText] = createSignal(local.text ?? "");
	return (
		<TextEntry {...EOMProps(others, {
			className: classNames(props.className, "EOM_TextEntry"),
			style: {
				/** 多行要加这个才会换行 */
				whiteSpace: others.multiline ? "normal" : undefined
			}
		})} ontextentrychange={self => {
			if (local.onChange) {
				local.onChange(self, text(), self.text);
			}
			setText(self.text);
		}} oninputsubmit={self => {
			if (local.oninputsubmit) {
				local.oninputsubmit(self);
			}
			if (local.onChange) {
				local.onChange(self, text(), self.text);
			}
			setText(self.text);
		}} onload={(self) => {
			self.text = text();
			self.SetDisableFocusOnMouseDown(false);
			self.SetPanelEvent("onblur", () => {
				$.DispatchEvent("DropInputFocus", self);
			});
		}}
		>
			{resolved()}
		</TextEntry>
	);
};