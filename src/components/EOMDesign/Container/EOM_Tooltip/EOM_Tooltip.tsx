import classNames from "classnames";
import { ParentComponent, mergeProps, splitProps } from "solid-js";
import { ADDON_NAME, EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Tooltip.less";

/** 新的弹窗通用样式 */
export const EOM_Tooltip: ParentComponent<EOM_Attribute> = (props) => {
	const merged = mergeProps({
		type: ADDON_NAME,
	}, props);
	const [local, others] = splitProps(merged, ["children", "type"]);
	return (
		<Panel {...EOMProps(others, { className: "EOM_Tooltip " + local.type })} onactivate={() => { }} onload={(self) => { self.AddClass("EOM_PopupMainShow"); }}>
			{local.children}
		</Panel>
	);
};

export const EOM_TooltipBG: ParentComponent<EOM_Attribute> = (props) => {
	const merged = mergeProps({
		type: ADDON_NAME,
	}, props);
	const [local, others] = splitProps(merged, ["children", "type"]);
	return (
		<Panel {...EOMProps(props, { className: "EOM_TooltipBG " + local.type, })} >
		</Panel>
	);
};

export const EOM_TooltipHeader: ParentComponent<EOM_Attribute> = (props) => {
	const merged = mergeProps({
		type: ADDON_NAME,
	}, props);
	const [local, others] = splitProps(merged, ["children", "type"]);
	return (
		<Panel {...EOMProps(others, { className: "EOM_TooltipHeader " + local.type })}>
			{local.children}
		</Panel>
	);
};
export const EOM_TooltipDivder: ParentComponent<EOM_Attribute & { type: "Horizontal" | "Vertical"; }> = (props) => {
	const [local, others] = splitProps(props, ["children", "type"]);
	return (
		<Panel {...EOMProps(others, { className: classNames("EOM_TooltipDivder", local.type) })} />
	);
};