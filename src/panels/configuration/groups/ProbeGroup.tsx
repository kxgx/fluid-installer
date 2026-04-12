import React from "react";
import { Form } from "react-bootstrap";
import { Pin, PinConfig, Probe } from "../../../model/Config";
import { Board } from "../../../model/Boards";
import PinField from "../../../components/fields/PinField";
import BooleanField from "../../../components/fields/BooleanField";
import CollapseSection from "../../../components/collapsesection/CollapseSection";
import { useTranslation } from "react-i18next";

type ProbeProps = {
    board: Board;
    probe?: Probe;
    setValue: (probe?: Probe) => void;
    usedPins: Map<string, PinConfig>;
};

const ProbeGroup = ({ probe, setValue, board, usedPins }: ProbeProps) => {
    const { t } = useTranslation();
    return (
        <div style={{ marginBottom: "48px" }}>
            <h4>
                {t("panel.configuration.probe")}
                <Form.Check
                    type="switch"
                    style={{ display: "inline", marginLeft: "16px" }}
                    checked={!!probe}
                    onChange={() => {
                        if (probe) {
                            setValue(undefined);
                        } else {
                            setValue({
                                pin: Pin.NO_PIN,
                                toolsetter_pin: Pin.NO_PIN,
                                check_mode_start: false,
                                hard_stop: false
                            });
                        }
                    }}
                ></Form.Check>
            </h4>

            <CollapseSection show={!!probe}>
                <PinField
                    board={board}
                    label={t("panel.configuration.probe-pin")}
                    value={PinConfig.fromString(probe?.pin)}
                    setValue={(value) => {
                        setValue({
                            ...probe,
                            ...{ pin: value.toString() }
                        });
                    }}
                    usedPins={usedPins}
                />
                <PinField
                    board={board}
                    label={t("panel.configuration.probe-tool-setter-pin")}
                    value={PinConfig.fromString(probe?.toolsetter_pin)}
                    setValue={(value) => {
                        setValue({
                            ...probe,
                            ...{ toolsetter_pin: value.toString() }
                        });
                    }}
                    helpText={t(
                        "panel.configuration.probe-tool-setter-pin-help"
                    )}
                    usedPins={usedPins}
                />
                <BooleanField
                    label={t("panel.configuration.probe-check-mode-start")}
                    value={probe?.check_mode_start}
                    setValue={(value) => {
                        setValue({
                            ...probe,
                            ...{ check_mode_start: Boolean(value) }
                        });
                    }}
                    helpText={t(
                        "panel.configuration.probe-check-mode-start-help"
                    )}
                />
                <BooleanField
                    label={t("panel.configuration.probe-hard-stop")}
                    value={probe?.hard_stop}
                    setValue={(value) => {
                        setValue({
                            ...probe,
                            ...{ hard_stop: Boolean(value) }
                        });
                    }}
                    helpText={t("panel.configuration.probe-hard-stop-help")}
                />
            </CollapseSection>
        </div>
    );
};

export default ProbeGroup;
