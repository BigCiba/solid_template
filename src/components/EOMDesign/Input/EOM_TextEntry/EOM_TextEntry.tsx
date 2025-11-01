import { ParentComponent, createSignal } from "solid-js";
import { useSimpleProps } from "../../EOMDesign";
import "./EOM_TextEntry.less";

interface EOM_TextEntryAttribute extends PanelAttributes {
	/**
	 * 变化时回调函数
	 * @param self 输入组件
	 * @param previousText 变化前的文本
	 * @param changedText 变化后的文本
	 */
	onChange?: (self: TextEntry, previousText: string, changedText: string) => void;
}
export const EOM_TextEntry: ParentComponent<EOM_TextEntryAttribute & TextEntryAttributes> = (props) => {
	const { local, others } = useSimpleProps(props, {
		localKeys: ["children", "onChange", "oninputsubmit", "text"] as const,
		componentClass: ["EOM_TextEntry"]
	});
	const [text, setText] = createSignal(local.text ?? "");
	return (
		<TextEntry {...others} style={{
			/** 多行要加这个才会换行 */
			whiteSpace: props.multiline ? "normal" : undefined
		}}
			ontextentrychange={self => {
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
			{local.children}
		</TextEntry>
	);
};