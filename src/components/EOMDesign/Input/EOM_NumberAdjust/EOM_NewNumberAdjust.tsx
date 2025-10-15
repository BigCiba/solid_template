import { createRenderEffect, createSignal, mergeProps, ParentComponent, splitProps } from "solid-js";
import { EOM_Attribute, EOMProps } from "../../EOMDesign";
import { EOM_BaseButton } from "../EOM_Button/EOM_Button";
import "./EOM_NewNumberAdjust.less";

interface EOM_NewNumberAdjustAttribute extends EOM_Attribute {
    changeFilter?: (old: number, newVar: number) => boolean | number;
    /**
     * 变化时回调函数
     * @param self 输入组件
     * @param changedText 变化后的文本
     */
    onChange?: (self: TextEntry, changedText: number) => void;
    /** value仅作为初始化值使用，而此输入值变化时会改变TextEntry的当前值 */
    effectValue?: number;
}

export const EOM_NewNumberAdjust: ParentComponent<EOM_NewNumberAdjustAttribute & NumberEntryAttributes> = (props) => {
    const merged = mergeProps({
        min: 0,
        max: 1000000,
    }, props);
    const [local, others] = splitProps(merged, ["children", "effectValue", "value", "min", "max", "onChange", "onvaluechanged", "changeFilter"]);
    const [value, _setValue] = createSignal<number>(local.effectValue ?? local.value ?? local.min);
    function setValue(number: number) {
        if (local.changeFilter) {
            let res = local.changeFilter(value(), number);
            if (typeof (res) == "number") {
                _setValue(res);
            } else if (res == true) {
                _setValue(number);
            }
        } else {
            _setValue(number);
        }
    }

    createRenderEffect(() => {
        if (local.effectValue !== undefined) {
            _setValue(local.effectValue);
        }
    });

    let eventEnable = true;
    return <Panel
        {...EOMProps(others, {
            class: "EOM_NewNumberAdjust",
        })}
    >
        <EOM_BaseButton enabled={value() > local.min} onactivate={self => {
            if (value() == undefined) {
                setValue(local.min);
            } else if (value() > local.min) {
                setValue(value() - 1);
            }
        }}>
            <Image id="Sub" />
        </EOM_BaseButton>
        <TextEntry text={value().toString()} textmode="numeric" ontextentrychange={self => {
            if (eventEnable) {
                eventEnable = false;
                if (self.text != "") {
                    if (!self.text.includes("-")) {
                        setValue(Math.max(local.min, Math.min(local.max, Number(self.text))));
                        self.text = value().toString();
                        if (local.onChange) {
                            local.onChange(self, value());
                        }
                    } else {
                        self.text = value().toString();
                    }
                }
                eventEnable = true;
            }
        }} />
        <EOM_BaseButton enabled={value() < local.max} id="Right" onactivate={self => {
            if (value() == undefined) {
                setValue(local.max);
            } else if (value() < local.max) {
                setValue(value() + 1);
            }
        }}>
            <Image id="Add" />
        </EOM_BaseButton>
        {local.children}
    </Panel>;
};