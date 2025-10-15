import classNames from 'classnames';
import { ParentComponent, mergeProps, splitProps } from 'solid-js';
import { ADDON_NAME, EOMProps, EOM_Attribute } from '../../EOMDesign';
import "./EOM_XP.less";
import { CImage, CLabel } from '../../../EOMChildren';

interface EOM_XPAttribute extends EOM_Attribute {
	level?: number;
	maxLevel?: number;
	exp?: number;
	maxExp?: number;
	type?: "Tui9" | "Tui3" | "C4";
}

export const EOM_XP: ParentComponent<EOM_XPAttribute> = (props) => {
	const merged = mergeProps({
		type: ADDON_NAME,
		level: 1,
		maxLevel: 100,
		exp: 100,
		maxExp: 100,
	}, props);
	const [local, others] = splitProps(merged, ["children", "level", "maxLevel", "exp", "maxExp", "type"]);
	let deg = 0;
	if (local.maxExp != 0) {
		deg = Math.max(0, 360 * (local.exp ?? 0) / Math.max(1, (local.maxExp ?? 1)));
	}
	return (
		<Panel {...EOMProps(others, { className: classNames("EOM_XP", local.type) })}>
			<CImage className="EOM_XPBorder" style={{ clip: `radial( 50.0% 50.0%, 0.0deg, ${Float(toFiniteNumber(deg))}deg)` }} />
			<CLabel className="EOM_XPLabel" text={local.level == local.maxLevel ? "MAX" : String(local.level)} />
		</Panel>
	);
};
