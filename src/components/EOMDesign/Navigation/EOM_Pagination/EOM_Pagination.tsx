import classNames from "classnames";
import { ParentComponent, createSignal, mergeProps, splitProps } from "solid-js";
import { CLabel, TabButton } from "../../../EOMChildren";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Pagination.less";

interface EOM_PaginationAttribute extends EOM_Attribute {
	/** 当前页数左右两侧显示的数量 */
	boundaryCount?: number,
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
export const EOM_Pagination: ParentComponent<EOM_PaginationAttribute> = (props) => {
	const merged = mergeProps({
		defaultPage: 1,
		boundaryCount: 1,
		showArrow: true,
		showJumpButton: false,
	}, props);
	const [local, others] = splitProps(merged, ["boundaryCount", "pageCount", "defaultPage", "page", "onChange", "showArrow", "showJumpButton"]);
	const [page, setPage] = createSignal(local.defaultPage);
	const [group, setGroup] = createSignal(Number(Math.random().toString().substring(3, 3) + Date.now()).toString(36) + "_EOM_Pagination");
	/** 变更页数 */
	const changePage = (page: number) => {
		if (local.onChange) {
			local.onChange(page);
		}
		setPage(page);
	};
	const { boundaryCount, pageCount, showJumpButton } = local;
	return (
		<Panel {...EOMProps(others, {
			className: classNames("EOM_Pagination", { ShowArrow: local.showArrow })
		})}>
			<Button className="EOM_Pagination_Button EOM_Pagination_LeftArrow" enabled={page() > 1} onactivate={() => changePage(Math.max(1, page() - 1))} />
			{(() => {
				let res: JSX.Element[] = [];
				let showCount = boundaryCount * 2 + 3;
				let num1 = showCount - 1;
				let num2 = pageCount - showCount + 2;
				if (pageCount <= showCount + 2) {
					for (let index = 0; index < pageCount; index++) {
						res.push(<TabButton group={group()} selected={page() == index + 1} text={String(index + 1)} className="EOM_Pagination_Button" onactivate={() => changePage(index + 1)} />);
					}
				} else {
					res.push(<TabButton group={group()} selected={page() == 1} text={String(1)} className="EOM_Pagination_Button" onactivate={() => changePage(1)} />);
					let startIndex = Math.min(Math.max(2, page() - boundaryCount - 1), pageCount - showCount);
					for (let index = startIndex; index < Math.min(startIndex + showCount, pageCount); index++) {
						// 第一个元素
						if (index == startIndex) {
							if (page() > num1) {
								res.push(
									<Panel enabled={false} className="EOM_Pagination_Button" >
										<CLabel text="..." />
									</Panel>
								);
							} else {
								res.push(<TabButton group={group()} selected={page() == index} text={String(index)} className="EOM_Pagination_Button" onactivate={() => changePage(index)} />);
							}
						}
						// 末尾元素
						else if (index == startIndex + showCount - 1) {
							if (page() < num2) {
								res.push(
									<Panel enabled={false} className="EOM_Pagination_Button" >
										<CLabel text="..." />
									</Panel>
								);
							} else {
								res.push(<TabButton group={group()} selected={page() == index} text={String(index)} className="EOM_Pagination_Button" onactivate={() => changePage(index)} />);
							}
						} else {
							res.push(<TabButton group={group()} selected={page() == index} text={String(index)} className="EOM_Pagination_Button" onactivate={() => changePage(index)} />);
						}
					}
					res.push(<TabButton group={group()} selected={page() == pageCount} text={String(pageCount)} className="EOM_Pagination_Button" onactivate={() => changePage(pageCount)} />);
				}
				return res;
			})()}
			<Button className="EOM_Pagination_Button EOM_Pagination_RightArrow" enabled={page() < pageCount} onactivate={() => changePage(Math.min(pageCount, page() + 1))} />
			{showJumpButton &&
				<>
					<Panel className="EOM_Pagination_JumpExtry">
						<TextEntry text={String(page)} multiline={false} textmode="numeric" oninputsubmit={self => {
							let text = Number(self.text);
							if (Number.isInteger(text)) {
								if (text >= 1 && text <= pageCount) {
									changePage(text);
								}
							}
						}} />
					</Panel>
					<CLabel text={" / " + pageCount} className="EOM_Pagination_JumpLabel" />
				</>
			}
		</Panel>
	);
};