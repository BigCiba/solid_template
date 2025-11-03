import { createSignal } from "solid-js";
import { EOM_Icon } from "../../../components/EOMDesign/DataDisplay/EOM_Icon/EOM_Icon";
import { FireEvent, ToggleSelection } from "../../../components/EOMDesign/other/EOM_DebugTool/EOM_DebugTool";
import "./service_add_item.less";

// 普通按钮
export const Service_AddToken = () => {
	let refEntry: TextEntry | undefined;

	function AddToken() {
		let num = refEntry?.text;
		if (num) {
			FireEvent("AddServiceToken", `${itemID()}|${num}`);
		}
	}

	const [itemID, setItemID] = createSignal("");
	useClientSideEvent("ServicePickItem", (data) => {
		setItemID(data.itemID);
	});
	return (
		<Panel id="Service_AddToken" flowChildren="right" onactivate={() => AddToken()}>
			<TextButton class="DemoButton HotKeyValid FireEvent" text={itemID() == "" ? "后端物品ID" : GetLocalization("#" + itemID())} onactivate={() => ToggleSelection("ServiceAddItem")} >
				<EOM_Icon type="ArrowSolidRight" width="10px" height="16px" align="right center" style={{ marginRight: "4px" }} />
			</TextButton>
			<TextEntry ref={refEntry} id="Service_TextEntry" placeholder="数量" textmode="numeric"
				onload={self => self.SetDisableFocusOnMouseDown(false)}
				oncancel={self => $.DispatchEvent("DropInputFocus", self)}
				oninputsubmit={self => {
					AddToken();
					$.DispatchEvent("DropInputFocus", self);
				}}
			/>
		</Panel>
	);
};