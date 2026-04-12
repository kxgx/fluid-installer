import React, { useEffect } from "react";
import { Alert, Col, Form, Row } from "react-bootstrap";
import { Config, Stepping } from "../../../model/Config";
import TextField from "../../../components/fields/TextField";
import ToolTip from "../../../components/tooltip/ToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";

const DEFAULT_CONFIG: Stepping = {
    engine: "RMT",
    idle_ms: 250,
    pulse_us: 4,
    dir_delay_us: 0,
    disable_delay_us: 0
};

type SteppingGroupProps = {
    config?: Config;
    setValue?: (config: Stepping) => void;
};

const SteppingGroup = ({ config, setValue = () => {} }: SteppingGroupProps) => {
    const { t } = useTranslation();
    useEffect(() => {
        if (!config?.stepping) {
            setValue(DEFAULT_CONFIG);
        }
    }, [config?.stepping]);

    const showI2soWarning =
        !config?.i2so &&
        (config?.stepping?.engine?.toUpperCase() === "I2S_STATIC" ||
            config?.stepping?.engine?.toUpperCase() === "I2S_STREAM");

    return (
        <div style={{ marginBottom: "48px" }}>
            <h4>{t("panel.configuration.stepping-engine")}</h4>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm="4">
                    {t("panel.configuration.stepping-engine")}{" "}
                    <ToolTip>
                        {t("panel.configuration.stepping-engine-tooltip")}
                    </ToolTip>
                </Form.Label>
                <Col sm="8">
                    <Form.Select
                        aria-label={t("panel.configuration.stepping-engine")}
                        value={config?.stepping?.engine?.toUpperCase()}
                        onChange={(event) =>
                            setValue({
                                ...config?.stepping,
                                ...{ engine: event.target.value }
                            })
                        }
                    >
                        <option id={"RMT"} value={"RMT"}>
                            {t("panel.configuration.stepping-rmt-option")}
                        </option>
                        <option id={"TIMED"} value={"TIMED"}>
                            {t("panel.configuration.stepping-timed-option")}
                        </option>
                        <option id={"I2S_STATIC"} value={"I2S_STATIC"}>
                            {t(
                                "panel.configuration.stepping-i2s-static-option"
                            )}
                        </option>
                        <option id={"I2S_STREAM"} value={"I2S_STREAM"}>
                            {t(
                                "panel.configuration.stepping-i2s-stream-option"
                            )}
                        </option>
                    </Form.Select>

                    {showI2soWarning && (
                        <Form.Text muted>
                            <Alert
                                variant="warning"
                                style={{ marginTop: "16px" }}
                            >
                                <FontAwesomeIcon
                                    color="warning"
                                    icon={faWarning as IconDefinition}
                                />{" "}
                                {t("panel.configuration.stepping-i2so-warning")}
                            </Alert>
                        </Form.Text>
                    )}
                </Col>
            </Form.Group>

            <TextField
                label={t("panel.configuration.stepping-idle-time")}
                value={config?.stepping?.idle_ms ?? 250}
                unit={"ms"}
                setValue={(value) =>
                    setValue({
                        ...config?.stepping,
                        ...{ idle_ms: Number(value) }
                    })
                }
                helpText={t("panel.configuration.stepping-idle-time-help")}
            />
            <TextField
                label={t("panel.configuration.stepping-pulse-time")}
                value={config?.stepping?.pulse_us ?? 4}
                unit={"μs"}
                setValue={(value) =>
                    setValue({
                        ...config?.stepping,
                        ...{ pulse_us: Number(value) }
                    })
                }
                helpText={t("panel.configuration.stepping-pulse-time-help")}
            />
            <TextField
                label={t("panel.configuration.stepping-direction-delay")}
                value={config?.stepping?.dir_delay_us ?? 0}
                unit={"μs"}
                setValue={(value) =>
                    setValue({
                        ...config?.stepping,
                        ...{ dir_delay_us: Number(value) }
                    })
                }
                helpText={t(
                    "panel.configuration.stepping-direction-delay-help"
                )}
            />
            <TextField
                label={t("panel.configuration.stepping-disable-delay")}
                value={config?.stepping?.disable_delay_us ?? 0}
                unit={"μs"}
                setValue={(value) =>
                    setValue({
                        ...config?.stepping,
                        ...{ disable_delay_us: Number(value) }
                    })
                }
                helpText={t("panel.configuration.stepping-disable-delay-help")}
            />
        </div>
    );
};

export default SteppingGroup;
