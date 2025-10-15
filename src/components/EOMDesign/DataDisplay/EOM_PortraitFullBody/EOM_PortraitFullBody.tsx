import { ParentComponent, Show, children, mergeProps, splitProps } from "solid-js";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_PortraitFullBody.less";

export interface EOM_PortraitFullBodyAttribute extends EOM_Attribute {
	/** 单位名字 */
	unitname?: string;
	/** portraits.txt中找到该模型配置的背景 */
	// model?: string;
	yawmax?: number;
	yawmin?: number;
	allowrotation?: boolean;
	particleonly?: boolean;
	showPedestal?: boolean;
}

export const EOM_PortraitFullBody: ParentComponent<EOM_PortraitFullBodyAttribute> = (props) => {
	const merged = mergeProps({ allowrotation: true, yawmax: 40, yawmin: -160, particleonly: false, showPedestal: true }, props);
	const [local, others] = splitProps(merged, ["children", "unitname", "allowrotation", "yawmax", "yawmin", "particleonly", "showPedestal"]);
	const resolved = children(() => local.children);
	return (
		<Panel {...EOMProps(others, { className: "EOM_PortraitFullBody" })}>
			{/* <Show when={local.model != undefined}>
				<DOTAScenePanel className="CustomHeroPortraitHUDBG" hittest={false} />
			</Show> */}
			<Show when={local.unitname != undefined}>
				<DOTAScenePanel className="CustomHeroPortraitHUD" yawmax={local.yawmax} yawmin={local.yawmin} allowrotation={local.allowrotation} map={"full_body/" + local.unitname} camera="camera_1" light="portrait_light" particleonly={local.particleonly} onload={self => {
					// if (local.model != undefined) {
					// 	(self.GetParent()?.GetChild(0) as ScenePanel)?.SetUnit(local.model ?? "", "", true);
					// }
					if (!local.showPedestal) {

						self.FireEntityInput('pedestal', 'TurnOff', '');
						// self.FireEntityInput('pedestal_small', 'TurnOn', '');
						// self.FireEntityInput('pedestal_large', 'TurnOn', '');
					}
				}} />
			</Show>
			{resolved()}
		</Panel>
	);
};