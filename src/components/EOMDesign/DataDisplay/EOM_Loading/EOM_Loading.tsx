import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import "./EOM_Loading.less";

export interface EOM_LoadingAttribute extends PanelAttributes {
	type?: "Wave" | "Matrix" | "PointSpin";
	color?: string;
}
export const EOM_Loading = (props: EOM_LoadingAttribute) => {
	const merged = mergeProps({ color: "#fff" }, props, { class: classNames("EOM_Loading", props.type) });
	const [local, others] = splitProps(merged, ["type", "color"]);

	const { type = "Wave", color } = local;
	if (type == "Wave") {
		return (
			<Panel {...others}>
				<Image class="WaveCol1" backgroundColor={color} />
				<Image class="WaveCol2" backgroundColor={color} />
				<Image class="WaveCol3" backgroundColor={color} />
				<Image class="WaveCol4" backgroundColor={color} />
				<Image class="WaveCol5" backgroundColor={color} />
				<Image class="WaveCol6" backgroundColor={color} />
				<Image class="WaveCol7" backgroundColor={color} />
				<Image class="WaveCol8" backgroundColor={color} />
			</Panel>
		);
	} else if (type == "Matrix") {
		return (
			<Panel {...others}>
				<Panel width="100%" height="100%" flowChildren="down">
					<Panel width="100%" height="25%" class="Row1" flowChildren="right">
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
					</Panel>
					<Panel width="100%" height="25%" class="Row2" flowChildren="right">
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
					</Panel>
					<Panel width="100%" height="25%" class="Row3" flowChildren="right">
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
					</Panel>
					<Panel width="100%" height="25%" class="Row4" flowChildren="right">
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
						<Image backgroundColor={color} />
					</Panel>
				</Panel>
			</Panel>
		);
	} else if (type == "PointSpin") {
		return (
			<Panel {...others}>
				<Image class="Point1" backgroundColor={color} />
				<Image class="Point2" backgroundColor={color} />
				<Image class="Point3" backgroundColor={color} />
				<Image class="Point4" backgroundColor={color} />
			</Panel>
		);
	}
};