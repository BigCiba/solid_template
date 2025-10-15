import classNames from "classnames";
import { createSignal, splitProps } from "solid-js";
import "./EOM_ToggleButton.less";

interface EOM_ToggleButtonAttributes extends LabelLikeAttributes<Panel> {
	selected?: boolean;
	onselect?: EventHandler<Panel>;
	ondeselect?: EventHandler<Panel>;
	onchange?: (p: Panel, checked: boolean) => void;
}

export function EOM_ToggleButton(props: EOM_ToggleButtonAttributes) {
	const [local, others] = splitProps(props, ["class", "onactivate", "selected", "onselect", "ondeselect", "onchange", "text", "html"]);
	const [selected, SetSelected] = createSignal(local.selected ?? false);

	return (
		<Panel {...others} class={classNames(local.class, "EOM_ToggleButton")}
			checked={selected()}
			onactivate={p => {
				SetSelected(b => {
					let newVar = !b;
					if (newVar) {
						local.onselect?.(p);
					} else {
						local.ondeselect?.(p);
					}
					local.onchange?.(p, newVar);
					return newVar;
				});

				if (typeof local.onactivate == "function")
					local.onactivate?.(p);
			}}
		>
			<Panel id="ToggleBox">
				<Panel id="ToggleBoxRing" />
				<Panel id="ToggleBoxTick" />
			</Panel>
			<Label text={local.text ?? ""} html={local.html ?? false} />
		</Panel>
	);
}