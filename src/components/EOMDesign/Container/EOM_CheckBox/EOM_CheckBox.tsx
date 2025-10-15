import classNames from "classnames";
import { mergeProps, splitProps } from "solid-js";
import { EOMProps } from "../../EOMDesign";
import "./EOM_CheckBox.less";

export const EOM_CheckBox = (props: { text: string, checked?: boolean } & PanelAttributes) => {
    const merged = mergeProps({ checked: false }, props)
    const [local, others] = splitProps(merged, ["checked", "text"])
    return <Panel {...EOMProps(others, { className: classNames("EOM_CheckBox", { Checked: local.checked }) })}>
        <Panel id="CheckBox" >
            <Panel id="CheckBoxTick" />
        </Panel>
        <Label text={local.text} />
    </Panel>
}

