import React from "react";
import { Form } from "react-bootstrap";
import { Homing } from "../../../model/Config";
import BooleanField from "../../../components/fields/BooleanField";
import TextField from "../../../components/fields/TextField";
import CollapseSection from "../../../components/collapsesection/CollapseSection";
import { useTranslation } from "react-i18next";

type HomingProps = {
    homing?: Homing;
    setValue: (motor?: Homing) => void;
};

const HomingGroup = ({ homing, setValue }: HomingProps) => {
    const { t } = useTranslation();
    return (
        <>
            <h5>
                Homing
                <Form.Check
                    style={{ display: "inline", marginLeft: "16px" }}
                    type="switch"
                    checked={!!homing}
                    onChange={() => {
                        if (homing) {
                            setValue(undefined);
                        } else {
                            setValue({
                                cycle: -1
                            });
                        }
                    }}
                ></Form.Check>
            </h5>

            <CollapseSection show={!!homing}>
                <TextField
                    label={t("panel.configuration.homing-cycle")}
                    value={Number(homing?.cycle ?? -1)}
                    setValue={(value) => {
                        setValue({
                            ...homing,
                            ...{ cycle: Number(value) }
                        });
                    }}
                />
                <TextField
                    label={t("panel.configuration.homing-position")}
                    value={Number(homing?.mpos_mm ?? 0)}
                    setValue={(value) => {
                        setValue({
                            ...homing,
                            ...{ mpos_mm: Number(value) }
                        });
                    }}
                    unit="mm"
                    helpText={t("panel.configuration.homing-position-help")}
                />
                <BooleanField
                    label={t("panel.configuration.homing-positive-direction")}
                    value={homing?.positive_direction ?? true}
                    setValue={(value) => {
                        setValue({
                            ...homing,
                            ...{ positive_direction: Boolean(value) }
                        });
                    }}
                    helpText={t(
                        "panel.configuration.homing-positive-direction-help"
                    )}
                />
            </CollapseSection>
        </>
    );
};

export default HomingGroup;
