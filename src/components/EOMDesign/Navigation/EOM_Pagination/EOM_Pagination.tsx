import classNames from "classnames";
import { For, ParentComponent, Show, createSignal, mergeProps, splitProps } from "solid-js";
import { EOM_BaseButton } from "../../Input/EOM_Button/EOM_Button";
import "./EOM_Pagination.less";

interface EOM_PaginationAttribute extends PanelAttributes {
	/** 总页数 */
	pageCount: number,
	/** 初始页数 */
	defaultPage?: number,
	/** 指定页数 */
	page?: number,
	/** 更改事件 */
	onChange?: (page: number) => void,
	/** 显示箭头部件 */
	showArrow?: boolean;
	/** 显示跳转部件 */
	showJumpButton?: boolean;
}

/** 分页组件 */
export const EOM_Pagination: ParentComponent<PanelAttributes & EOM_PaginationAttribute> = (props) => {
	const merged = mergeProps({
		defaultPage: 1,
		showArrow: true,
		showJumpButton: false,
	}, props, { class: classNames("EOM_Pagination", { ShowArrow: props.showArrow }) });
	const [local, others] = splitProps(merged, ["pageCount", "defaultPage", "page", "onChange", "showArrow", "showJumpButton"]);
	const [page, setPage] = createSignal(local.defaultPage);
	const [group, setGroup] = createSignal(Number(Math.random().toString().substring(3, 3) + Date.now()).toString(36) + "_EOM_Pagination");
	/** 变更页数 */
	const changePage = (page: number) => {
		if (local.onChange) {
			local.onChange(page);
		}
		setPage(page);
	};
	return (
		<Panel {...others}>
			<EOM_BaseButton visible={local.showArrow} enabled={page() != 1} onactivate={() => setPage(page() - 1)} className="PageButton PageLeft">
				<Image className="BG" />
				<Image className="PageArrow" />
			</EOM_BaseButton>
			<For each={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}>
				{(i) => {
					return <EOM_BaseButton onactivate={() => setPage(i)} className={classNames("PageButton", { Selected: page() == i })}>
						<Image className="BG" />
						<Label text={i} />
					</EOM_BaseButton>;
				}}
			</For>
			<EOM_BaseButton visible={local.showArrow} enabled={page() != local.pageCount} onactivate={() => setPage(page() + 1)} className="PageButton PageRight">
				<Image className="BG" />
				<Image className="PageArrow" />
			</EOM_BaseButton>
			<Show when={local.showJumpButton}>
				<Panel className="EOM_Pagination_JumpExtry">
					<TextEntry text={String(page)} multiline={false} textmode="numeric" oninputsubmit={self => {
						let text = Number(self.text);
						if (Number.isInteger(text)) {
							if (text >= 1 && text <= local.pageCount) {
								changePage(text);
							}
						}
					}} />
				</Panel>
				<Label text={" / " + local.pageCount} className="EOM_Pagination_JumpLabel" />
			</Show>
		</Panel>
	);
};