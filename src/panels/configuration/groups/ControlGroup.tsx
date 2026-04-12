import React from "react";
import { Form } from "react-bootstrap";
import { ControlConfig, PinConfig } from "../../../model/Config";
import PinField from "../../../components/fields/PinField";
import { Board } from "../../../model/Boards";
import CollapseSection from "../../../components/collapsesection/CollapseSection";
import { useTranslation } from "react-i18next";

type ControlProps = {
    board: Board;
    control?: ControlConfig;
    setValue: (controlConfig?: ControlConfig) => void;
    usedPins: Map<string, PinConfig>;
};

const ControlGroup = ({ board, control, setValue, usedPins }: ControlProps) => {
    const { t } = useTranslation();
    return (
        <div style={{ marginBottom: "48px" }}>
            <h4>
                {t("panel.configuration.control")}
                <Form.Check
                    type="switch"
                    style={{ display: "inline", marginLeft: "16px" }}
                    checked={!!control}
                    onChange={() => {
                        if (control) {
                            setValue(undefined);
                        } else {
                            setValue({});
                        }
                    }}
                ></Form.Check>
            </h4>

            <CollapseSection show={!!control}>
                <PinField
                    label={t("panel.configuration.control-safety-door-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.safety_door_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ safety_door_pin: pin.toString() }
                        });
                    }}
                    helpText={t(
                        "panel.configuration.control-safety-door-pin-help"
                    )}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.control-reset-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.reset_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ reset_pin: pin.toString() }
                        });
                    }}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.control-feed-hold-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.feed_hold_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ feed_hold_pin: pin.toString() }
                        });
                    }}
                    helpText={t(
                        "panel.configuration.control-feed-hold-pin-help"
                    )}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.control-cycle-start-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.cycle_start_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ cycle_start_pin: pin.toString() }
                        });
                    }}
                    helpText={t(
                        "panel.configuration.control-cycle-start-pin-help"
                    )}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.control-macro-0-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.macro0_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ macro0_pin: pin.toString() }
                        });
                    }}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.control-macro-1-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.macro1_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ macro1_pin: pin.toString() }
                        });
                    }}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.control-macro-2-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.macro2_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ macro2_pin: pin.toString() }
                        });
                    }}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.control-macro-3-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.macro3_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ macro3_pin: pin.toString() }
                        });
                    }}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.control-fault-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.fault_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ fault_pin: pin.toString() }
                        });
                    }}
                    helpText={t("panel.configuration.control-fault-pin-help")}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.control-estop-pin")}
                    board={board}
                    value={PinConfig.fromString(control?.estop_pin)}
                    setValue={(pin) => {
                        setValue({
                            ...control,
                            ...{ estop_pin: pin.toString() }
                        });
                    }}
                    helpText={t("panel.configuration.control-estop-pin-help")}
                    usedPins={usedPins}
                />
            </CollapseSection>
        </div>
    );
};

export default ControlGroup;
