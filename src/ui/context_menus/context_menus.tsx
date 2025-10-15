import { render } from "@bigciba/solid-panorama-runtime";
import { batch, createEffect, createSignal, For, on, Show } from "solid-js";

declare global {
	// 写到CustomUIConfig里以解决重载代码顺序造成引用还是旧代码的问题
	interface CustomUIConfig {
		showContextMenu: (panel: Panel, menus: Record<string, Function>, offest?: [number, number]) => void;
	}
}

let targetPanel: Panel | undefined;
const [menus, setMenus] = createSignal<Record<string, Function> | undefined>(undefined, { equals: () => false });
const [offset, setOffset] = createSignal<[number, number]>([1, 0]);
CustomUIConfig.showContextMenu = (panel: Panel, menus: Record<string, Function>, offest: [number, number] = [1, 0]) => {
	targetPanel = panel;
	batch(() => {
		setMenus(menus);
		setOffset(offest);
	});
};

const ContextMenu = () => {
	const dismiss = () => {
		// print("dismiss")
		setMenus();
		targetPanel = undefined;
	};
	const updatePosition = (pSelf: Panel) => {
		if (!pSelf || !pSelf.IsValid()) return;
		if (!targetPanel || !targetPanel.IsValid()) return;

		let aTargetInfo = targetPanel.GetPositionWithinWindow();
		let offestXY = offset();

		let x = aTargetInfo.x + targetPanel.actuallayoutwidth * offestXY[0];
		let y = aTargetInfo.y + targetPanel.actuallayoutheight * offestXY[1];
		if (!(isFinite(x) && isFinite(y))) {
			return;
		}
		let fScreenWidth = Game.GetScreenWidth();
		let fScreenHeight = Game.GetScreenHeight();

		let newPos: [number, number, number] = [x, y, 0];
		// 顶部超过屏幕顶部
		if (y < 0) {
			newPos[1] = 0;
		}
		// 如果右边超出了屏幕，将菜单改为targetPanel的左边
		if (x + pSelf.actuallayoutwidth > fScreenWidth) {
			newPos[0] = aTargetInfo.x - pSelf.actuallayoutwidth;
		}
		// 底部超过屏幕底部
		if (y + pSelf.actuallayoutheight > fScreenHeight) {
			newPos[1] = fScreenHeight - pSelf.actuallayoutheight;
		}
		// 如果左边超出了屏幕，将菜单改为targetPanel的右边
		if (x < 0) {
			newPos[0] = aTargetInfo.x + targetPanel.actuallayoutwidth;
		}
		newPos[0] /= pSelf.actualuiscale_x;
		newPos[1] /= pSelf.actualuiscale_y;
		pSelf.SetPositionInPixels(...newPos);
	};
	let root: Panel | undefined;
	let list: Panel | undefined;
	createEffect(on(menus, (_menus) => {
		if (!root) return;
		if (!_menus) {
			root.ClearPanelEvent("onactivate");
			root.ClearPanelEvent("oncancel");
			root.ClearPanelEvent("oncontextmenu");
			root.hittest = false;
			return;
		}
		root.hittest = true;
		root.SetPanelEvent("onactivate", () => { dismiss(); });
		root.SetPanelEvent("oncancel", () => { dismiss(); });
		root.SetPanelEvent("oncontextmenu", () => { dismiss(); });
		if (list && list.IsValid()) {
			// list.style.opacity = "0"
			// $.Schedule(0.1, () => {
			// 	if (list && list.IsValid()) {
			// 		updatePosition(list)
			// 		list.style.opacity = "1"
			// 	}
			// })
		}
	}));
	return <Panel id="ContextMenuRoot" ref={root} >
		<Show when={menus()}>
			<Panel id="ContextMenuList" onload={(p) => {
				p.style.opacity = "0.0001";
				const wait = () => {
					if (!p.IsValid()) return;
					if (!p.IsSizeValid()) {
						$.Schedule(0, wait);
						return;
					}
					updatePosition(p);
					p.ClearPropertyFromCode("opacity");
					p.style.opacity = "1";
				};
				wait();
			}} >
				<For each={Object.keys(menus()!)}>
					{
						(s) => {
							return <Button id={s} onactivate={() => {
								menus()![s]();
								dismiss();
							}} >
								<Label text={s} />
							</Button>;
						}
					}
				</For>
			</Panel>
		</Show>
	</Panel>;
};

render(() => <ContextMenu />, $.GetContextPanel());
