import { createSignal, mergeProps, ParentProps, splitProps } from "solid-js";
import { EOM_Attribute, EOMProps } from "../../EOMDesign";
import { EOM_BaseButton } from "../../Input/EOM_Button/EOM_Button";
import "./Pagination_T12.less";

interface Pagination_T12_Attribute extends EOM_Attribute {
	/** 总页数 */
	pageCount: number,
	/** 初始页数 */
	defaultPage?: number,
	/** 更改事件 */
	onChange?: (page: number) => void,
	handler?: (ref: Pagination_T12_Ref) => void,
}

interface Pagination_T12_Ref {
	SetPage: (page: number) => void,
}

export function Pagination_T12(props: ParentProps<Pagination_T12_Attribute>) {
	const merged = mergeProps({
		defaultPage: 1,
	}, props);
	const [local, others] = splitProps(merged, ["pageCount", "defaultPage", "onChange", "handler", "classList"]);

	const [page, _SetPage] = createSignal(local.defaultPage);
	function SetPage(page: number) {
		local.onChange?.(page);
		_SetPage(page);
	}

	local.handler?.({
		SetPage
	});

	return (
		<Panel {...EOMProps(others, { class: "Pagination_T12" })}>
			<EOM_BaseButton id="LeftArrow" enabled={page() > 1} onactivate={() => SetPage(page() - 1)} />
			<Label id="PageLabel" text={`${page()}/${local.pageCount}`} />
			<EOM_BaseButton id="RightArrow" enabled={page() < local.pageCount} onactivate={() => SetPage(page() + 1)} />
		</Panel>
	);
}