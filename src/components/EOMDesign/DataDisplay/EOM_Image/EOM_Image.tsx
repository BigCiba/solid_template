import { ParentComponent, mergeProps, splitProps } from "solid-js";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Image.less";

export interface EOM_ImageAttribute extends EOM_Attribute {
	/** 旋转角度 */
	rotate?: number;
}
export const EOM_Image: ParentComponent<EOM_ImageAttribute & ImageAttributes> = (props) => {
	const [local, others] = splitProps(props, ["children", "rotate"]);
	return (
		<Image
			{...EOMProps(others, {
				className: "EOM_Image",
				style: {
					preTransformRotate2d: (local.rotate != undefined) ? local.rotate + "deg" : undefined,
				}
			})}
		>
			{local.children}
		</Image>
	);
};

export interface EOM_AbilityImageAttribute extends EOM_Attribute {
	/** 图片 */
	textureName?: string;
}
/** 直接调用技能图标 */
export const EOM_AbilityImage: ParentComponent<EOM_AbilityImageAttribute & ImageAttributes> = (props) => {
	const [local, others] = splitProps(mergeProps({ textureName: "" }, props), ["children", "textureName"]);
	return (
		<Image
			{...EOMProps(others, {
				className: "EOM_AbilityImage",
			})}
			src={`file://{images}/spellicons/${local.textureName}.png`} scaling="stretch-to-fit-y-preserve-aspect"
		>
			<Image class="EOM_AbilityImageRaw" src={`raw://resource/flash3/images/spellicons/${local.textureName}.png`} scaling="stretch-to-fit-y-preserve-aspect" />
			{local.children}
		</Image>
	);
};
export interface EOM_ItemImageAttribute extends EOM_Attribute {
	/** 图片 */
	textureName?: string;
}
/** 直接调用物品图标 */
export const EOM_ItemImage: ParentComponent<EOM_ItemImageAttribute & ImageAttributes> = (props) => {
	const [local, others] = splitProps(mergeProps({ textureName: "" }, props), ["children", "textureName"]);
	const realTexture = () => local.textureName.replace("item_", "");
	return (
		<Image
			{...EOMProps(others, {
				className: "EOM_ItemImage",
			})}
			src={`file://{images}/items/${realTexture()}.png`} scaling="stretch-to-fit-y-preserve-aspect"
		>
			<Image class="EOM_ItemImageRaw" src={`raw://resource/flash3/images/items/${realTexture()}.png`} scaling="stretch-to-fit-y-preserve-aspect" />
			{local.children}
		</Image>
	);
};