import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import { EOM_Panel } from "../../Container/EOM_Panel/EOM_Panel";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import "./EOM_Loading.less";

export interface EOM_LoadingAttribute extends EOM_Attribute {
	type?: "Wave" | "Matrix" | "PointSpin";
	color?: string;
}
export const EOM_Loading = (props: EOM_LoadingAttribute) => {
	const merged = mergeProps({ color: "#fff" }, props);
	const [local, others] = splitProps(merged, ["type", "color"]);

	const { type = "Wave", color } = local;
	if (type == "Wave") {
		return (
			<Panel {...EOMProps(others, {
				className: classNames("EOM_Loading", type),
			})}>
				<Image className="WaveCol1" style={{ backgroundColor: color }} />
				<Image className="WaveCol2" style={{ backgroundColor: color }} />
				<Image className="WaveCol3" style={{ backgroundColor: color }} />
				<Image className="WaveCol4" style={{ backgroundColor: color }} />
				<Image className="WaveCol5" style={{ backgroundColor: color }} />
				<Image className="WaveCol6" style={{ backgroundColor: color }} />
				<Image className="WaveCol7" style={{ backgroundColor: color }} />
				<Image className="WaveCol8" style={{ backgroundColor: color }} />
			</Panel>
		);
	} else if (type == "Matrix") {
		return (
			<Panel {...EOMProps(others, {
				className: classNames("EOM_Loading", type),
			})}>
				<EOM_Panel width="100%" height="100%" flowChildren="down">
					<EOM_Panel width="100%" height="25%" className="Row1" flowChildren="right">
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
					</EOM_Panel>
					<EOM_Panel width="100%" height="25%" className="Row2" flowChildren="right">
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
					</EOM_Panel>
					<EOM_Panel width="100%" height="25%" className="Row3" flowChildren="right">
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
					</EOM_Panel>
					<EOM_Panel width="100%" height="25%" className="Row4" flowChildren="right">
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
						<Image style={{ backgroundColor: color }} />
					</EOM_Panel>
				</EOM_Panel>
			</Panel>
		);
	} else if (type == "PointSpin") {
		return (
			<Panel {...EOMProps(others, {
				className: classNames("EOM_Loading", type),
			})}>
				<Image className="Point1" style={{ backgroundColor: color }} />
				<Image className="Point2" style={{ backgroundColor: color }} />
				<Image className="Point3" style={{ backgroundColor: color }} />
				<Image className="Point4" style={{ backgroundColor: color }} />
			</Panel>
		);
	}
};