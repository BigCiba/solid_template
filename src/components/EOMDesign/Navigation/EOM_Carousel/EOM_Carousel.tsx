import classNames from "classnames";
import { For, ParentComponent, createSignal, mergeProps, onMount, splitProps } from "solid-js";
import "./EOM_Carousel.less";

interface EOM_CarouselAttribute extends PanelAttributes {
	/** 自动滚动 */
	autoplay?: boolean;
	/** 自动滚动间隔 */
	autoplayInterval?: number;
	/** TODO:渐变方式 */
	easing?: "linear";
	/** 滚动或者渐隐TODO:现在只有fade */
	effect?: "scrollx" | "fade";
	/** 切换面板的回调 */
	onChange?: (formIndex: number, toIndex: number) => void;
}

/** 走马灯组件，比如商店滚动的宣传图 */
export const EOM_Carousel: ParentComponent<EOM_CarouselAttribute> = (props) => {
	const children = Array.isArray(props.children) ? props.children : [props.children];
	const merged = mergeProps({
		autoplay: false,
		autoplayInterval: 5,
		easing: "linear",
		effect: "fade",
	}, props, { class: classNames("EOM_Carousel", props.effect) });
	const [local, others] = splitProps(merged, ["autoplay", "autoplayInterval", "easing", "effect", "onChange"]);
	const [selectedIndex, setSelectedIndex] = createSignal(1);
	const [count, setCount] = createSignal(0);
	onMount(() => {
		setCount(children.length);
	});
	const autoPlay = (self: Panel) => {
		$.Schedule(local.autoplayInterval, () => {
			if (selectedIndex() == count()) {
				setSelectedIndex(1);
			} else {
				setSelectedIndex(selectedIndex() + 1);
			}
			if (self.IsValid()) {
				autoPlay(self);
			}
		});
	};

	return (
		<Panel {...others} onload={self => {
			if (LoadData(self, "bReload") == undefined) {
				autoPlay(self);
				SaveData(self, "bReload", "true");
			}
		}}>

			<For each={children}>
				{(child, index) => <Panel id={"EOM_CarouselChild_" + index()} class={classNames("EOM_CarouselChild", { Show: selectedIndex() == index() + 1 })}>
					{child}
				</Panel>}
			</For>
			<Panel class="EOM_CarouselNav">
				{/* <EOM_Pagination showArrow={false} pageCount={count} showJumpButton={false} page={selectedIndex} onChange={(page) => {
					this.setState({ selectedIndex: page });
				}} /> */}
			</Panel>
		</Panel>
	);
};
