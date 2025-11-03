import classNames from "classnames";
import { splitProps } from "solid-js";
import { EOM_Panel } from "../../Container/EOM_Panel/EOM_Panel";
import { EOMProps } from "../../EOMDesign";
import { EOM_Countdown, EOM_CountdownAttribute } from "./EOM_Countdown";
import "./EOM_CountdownWithIcon.less";

export const EOM_CountdownWithIcon = (props: EOM_CountdownAttribute) => {
    const [local, other] = splitProps(props, ["endTime", "updateInterval", "text", "onlyCoundown", "limitTime", "short"]);
    let now = () => Math.floor(Date.now() / 1000);
    return <EOM_Panel {...EOMProps(other, { className: classNames("EOM_CountdownWithIcon", { LowTime: now() > ((local.endTime ?? 0) - 24 * 60 * 60) }) })}>
        <Image className="CountDownIcon" />
        <EOM_Countdown {...local} />
    </EOM_Panel>;
};