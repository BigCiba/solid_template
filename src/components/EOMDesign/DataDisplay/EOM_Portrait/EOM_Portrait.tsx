import { ParentComponent, Show, children, createEffect, on, splitProps } from "solid-js";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Portrait.less";

export interface EOM_PortraitAttribute extends EOM_Attribute {
	/** 单位名字 */
	unitname?: string;
	/** portraits.txt中找到该模型配置的背景 */
	model?: string;
}

export const EOM_Portrait: ParentComponent<EOM_PortraitAttribute> = (props) => {
	const [local, others] = splitProps(props, ["children", "unitname", "model"]);
	const resolved = children(() => local.children);
	let HUDBG: ScenePanel | undefined;
	let HUD: ScenePanel | undefined;
	const unitModel = () => {
		if (local.unitname != undefined) {
			let KV = KeyValues.UnitsKv[local.unitname] ?? KeyValues.CosmeticsKv[local.unitname];
			if (KV) {
				return (KV.Model ?? KV.resource) as string ?? local.model;
			}
		}
		return local.model;
	};
	let HUDLoaded = false;
	const setBG = (model?: string) => {
		if (model != undefined && HUDBG != undefined && HUDBG.IsValid() && HUDBG.SetUnit != undefined) {
			HUDBG.SetUnit(model, "", true);
		}
	};
	createEffect(on(() => ({ unitname: local.unitname, model: local.model }), () => {
		if (HUD?.IsValid()) {
			HUD.ReloadScene();
		}
		setBG(unitModel());
	}));
	return (
		<Panel {...EOMProps(others, { className: "EOM_Portrait" })}>
			<DOTAScenePanel className="CustomHeroPortraitHUDBG" hittest={false} ref={HUDBG} onload={self => {
				if (HUDLoaded) return;
				HUDLoaded = true;
				setBG(unitModel());
			}} />
			<Show when={local.unitname != undefined}>
				<DOTAScenePanel className="CustomHeroPortraitHUD" map={"portraits/" + local.unitname} ref={HUD} camera="camera_1" light="portrait_light" particleonly={false} hittest={false} />
			</Show>
			{resolved()}
		</Panel>
	);
};