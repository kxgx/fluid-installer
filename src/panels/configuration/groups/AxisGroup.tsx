import React from "react";
import { Container, Form } from "react-bootstrap";
import { Axis, Config, PinConfig } from "../../../model/Config";
import TextField from "../../../components/fields/TextField";
import MotorGroup from "./MotorGroup";
import { Boards } from "../../../model/Boards";
import BooleanField from "../../../components/fields/BooleanField";
import HomingGroup from "./HomingGroup";
import CollapseSection from "../../../components/collapsesection/CollapseSection";
import { useTranslation } from "react-i18next";

type SelectFieldProps = {
    config: Config;
    axisLabel: string;
    axis?: Axis;
    setValue?: (axis?: Axis) => void;
    usedPins: Map<string, PinConfig>;
};

const DEFAULT_CONFIG: Axis = {
    steps_per_mm: 80,
    max_rate_mm_per_min: 1000,
    acceleration_mm_per_sec2: 25,
    max_travel_mm: 1000
};

const AxisGroup = ({
    config,
    axisLabel,
    axis,
    setValue = () => {},
    usedPins
}: SelectFieldProps) => {
    const { t } = useTranslation();
    return (
        <Container>
            <h4>
                {axisLabel}-axis
                <Form.Check
                    style={{ display: "inline", marginLeft: "16px" }}
                    type="switch"
                    checked={!!axis}
                    onChange={() => {
                        if (axis) {
                            setValue(undefined);
                        } else {
                            setValue(DEFAULT_CONFIG);
                        }
                    }}
                ></Form.Check>
            </h4>

            {axis && (
                <>
                    <CollapseSection show={!!axis}>
                        <TextField
                            label={t("panel.configuration.axis-steps-per-mm")}
                            value={axis.steps_per_mm ?? 80}
                            placeholder={t(
                                "panel.configuration.axis-steps-per-mm"
                            )}
                            setValue={(value) =>
                                setValue({
                                    ...axis,
                                    ...{ steps_per_mm: Number(value) }
                                })
                            }
                        />
                        <TextField
                            label={t("panel.configuration.axis-max-rate")}
                            value={axis.max_rate_mm_per_min ?? 1000}
                            placeholder={t("panel.configuration.axis-max-rate")}
                            unit="mm/min"
                            setValue={(value) =>
                                setValue({
                                    ...axis,
                                    ...{ max_rate_mm_per_min: Number(value) }
                                })
                            }
                        />
                        <TextField
                            label={t("panel.configuration.axis-acceleration")}
                            value={axis.acceleration_mm_per_sec2 ?? 25}
                            placeholder={t(
                                "panel.configuration.axis-acceleration"
                            )}
                            unit="mm/sec²"
                            setValue={(value) =>
                                setValue({
                                    ...axis,
                                    ...{
                                        acceleration_mm_per_sec2: Number(value)
                                    }
                                })
                            }
                        />
                        <TextField
                            label={t("panel.configuration.axis-max-travel")}
                            value={axis.max_travel_mm ?? 1000.0}
                            placeholder={t(
                                "panel.configuration.axis-max-travel"
                            )}
                            unit="mm"
                            setValue={(value) =>
                                setValue({
                                    ...axis,
                                    ...{ max_travel_mm: Number(value) }
                                })
                            }
                        />
                        <BooleanField
                            label={t("panel.configuration.axis-soft-limits")}
                            value={axis?.soft_limits ?? false}
                            setValue={(value) =>
                                setValue({
                                    ...axis,
                                    ...{ soft_limits: Boolean(value) }
                                })
                            }
                            helpText={t(
                                "panel.configuration.axis-soft-limits-help"
                            )}
                        />
                    </CollapseSection>
                    <br />
                    <br />
                    <HomingGroup
                        homing={axis?.homing}
                        setValue={(value) => {
                            setValue({
                                ...axis,
                                ...{ homing: value }
                            });
                        }}
                    />
                    <br />
                    <br />

                    <MotorGroup
                        config={config}
                        label={t("panel.configuration.axis-motor-1")}
                        board={Boards[0]}
                        motor={axis?.motor0}
                        setValue={(value) => {
                            setValue({ ...axis, ...{ motor0: value } });
                        }}
                        usedPins={usedPins}
                    />
                    <br />
                    <br />

                    <MotorGroup
                        config={config}
                        label={t("panel.configuration.axis-motor-2")}
                        board={Boards[0]}
                        motor={axis?.motor1}
                        setValue={(value) => {
                            setValue({ ...axis, ...{ motor1: value } });
                        }}
                        usedPins={usedPins}
                    />
                </>
            )}

            <br />
        </Container>
    );
};

export default AxisGroup;
