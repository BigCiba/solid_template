import { ParentComponent, createEffect, on, splitProps } from "solid-js";
import { CDOTAScenePanel } from "../../../EOMChildren";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";

interface EOM_ParticleSceneProps extends EOM_Attribute {
	particleName: string;
}
export const EOM_ParticleScene: ParentComponent<EOM_ParticleSceneProps> = (props) => {
	let scene: ScenePanel | undefined = undefined;
	const [local, other] = splitProps(props, ["particleName"]);
	createEffect(on(() => local.particleName, () => {
		if (scene) {
			(scene as ScenePanel).ReloadScene();
		}
	}));
	return (
		<CDOTAScenePanel ref={scene} {...EOMProps(other, { className: "EOM_ParticleScene" })} particleonly={false} allowrotation light="preview_light" camera="preview_camera" map="scene/particle_preview" onload={self => {
			self.FireEntityInput("root", "RunScriptCode", `ParticleManager:CreateParticle("${local.particleName}", 0, thisEntity)`);
		}} />
	);
};