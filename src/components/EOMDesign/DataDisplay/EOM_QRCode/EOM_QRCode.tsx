import { ParentComponent, createSignal, splitProps } from "solid-js";
import { GenericPanel2 } from "../../../EOMChildren";
import { EOMProps, EOM_Attribute } from "../../EOMDesign";
import qrcodegen from "./qrcodegen";

interface EOM_QRCodeAttribute extends EOM_Attribute {
	value: string,
	qrcodesize: number,
	imageSrc?: string;
}
/** 二维码 */
export const EOM_QRCode: ParentComponent<EOM_QRCodeAttribute> = (props) => {
	const [local, others] = splitProps(props, ["value", "qrcodesize", "imageSrc"]);
	const { value, qrcodesize, imageSrc } = local;
	const [qrcode, setQrcode] = createSignal(qrcodegen.QrCode.encodeText(local.value, qrcodegen.QrCode.Ecc.QUARTILE));
	const defaultStyle = () => {
		let size = qrcode().size;
		const pixSize = Math.floor(qrcodesize / size);
		return {
			width: qrcodesize + pixSize * 2 + "px",
			height: qrcodesize + pixSize * 2 + "px",
			backgroundColor: "white"
		};
	};
	let size = qrcode().size;
	const pixSize = Math.floor(qrcodesize / size);
	return (
		<Panel {...EOMProps(others, { style: defaultStyle() })} >
			<GenericPanel2 type="UICanvas" style={{ width: `${size * pixSize}px`, height: `${size * pixSize}px`, horizontalAlign: "center", verticalAlign: "center" }} onload={(canvas: any) => {
				canvas.ClearJS("#00000000");
				for (let x = 0; x < size; ++x) {
					for (let y = 0; y < size; ++y) {
						if (qrcode().getModule(x, y)) {
							canvas.DrawSoftLinePointsJS(2, [
								x * pixSize, (y + 0.5) * pixSize,
								(x + 1) * pixSize, (y + 0.5) * pixSize
							], pixSize, 0, "#000000");
						}
					}
				}
			}} />
			{imageSrc &&
				<Image src={imageSrc} style={{ backgroundColor: "white", width: qrcodesize * 0.28 + "px", height: qrcodesize * 0.28 + "px", horizontalAlign: "center", verticalAlign: "center", zIndex: 100 }} />
			}
		</Panel>
	);
};