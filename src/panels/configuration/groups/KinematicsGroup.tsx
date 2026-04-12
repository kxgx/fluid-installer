import React from "react";
import { Config } from "../../../model/Config";
import SelectField from "../../../components/fields/SelectField";
import TextField from "../../../components/fields/TextField";
import BooleanField from "../../../components/fields/BooleanField";
import { useTranslation } from "react-i18next";

type KinematicsGroupProps = {
    config?: Config;
    setValue?: (config: Config) => void;
};

const KinematicsGroup = ({
    config,
    setValue = () => {}
}: KinematicsGroupProps) => {
    const { t } = useTranslation();
    return (
        <>
            <h4>{t("panel.configuration.kinematics")}</h4>
            <SelectField
                label={t("panel.configuration.kinematics-type")}
                value={
                    config?.kinematics
                        ? Object.keys(config.kinematics)[0]
                        : undefined
                }
                setValue={(value) => {
                    const newConfig = {
                        ...config!
                    };

                    if (Object.keys(config.kinematics)[0] !== value && value) {
                        newConfig.kinematics = {
                            Cartesian: undefined,
                            corexy: undefined,
                            WallPlotter: undefined,
                            midtbot: undefined,
                            parallel_delta: undefined
                        };
                        newConfig.kinematics[value] = {};
                    }

                    setValue(newConfig);
                }}
                options={[
                    {
                        name: "Cartesian",
                        value: "Cartesian"
                    },
                    {
                        name: "CoreXY",
                        value: "corexy"
                    },
                    {
                        name: "midtbot",
                        value: "midtbot"
                    },
                    {
                        name: "parallel_delta",
                        value: "parallel_delta"
                    },
                    {
                        name: "WallPlotter",
                        value: "WallPlotter"
                    }
                ]}
                helpText={t("panel.configuration.kinematics-help")}
            />

            {config?.kinematics?.WallPlotter && (
                <>
                    <TextField
                        label={t("panel.configuration.kinematics-left-axis")}
                        value={config?.kinematics?.WallPlotter?.left_axis ?? 0}
                        setValue={(value) => {
                            config.kinematics.WallPlotter.left_axis = isNaN(
                                +value
                            )
                                ? 0
                                : +value;
                            setValue(config);
                        }}
                    />

                    <TextField
                        label={t(
                            "panel.configuration.kinematics-left-anchor-x"
                        )}
                        value={
                            config?.kinematics?.WallPlotter?.left_anchor_x ??
                            -100
                        }
                        setValue={(value) => {
                            config.kinematics.WallPlotter.left_anchor_x =
                                +value;
                            setValue(config);
                        }}
                        unit="mm"
                    />

                    <TextField
                        label={t(
                            "panel.configuration.kinematics-left-anchor-y"
                        )}
                        value={
                            config?.kinematics?.WallPlotter?.left_anchor_y ??
                            -100
                        }
                        setValue={(value) => {
                            config.kinematics.WallPlotter.left_anchor_y =
                                +value;

                            setValue(config);
                        }}
                        unit="mm"
                    />

                    <TextField
                        label={t("panel.configuration.kinematics-right-axis")}
                        value={config?.kinematics?.WallPlotter?.right_axis ?? 1}
                        setValue={(value) => {
                            config.kinematics.WallPlotter.right_axis = isNaN(
                                +value
                            )
                                ? 0
                                : +value;
                            setValue(config);
                        }}
                    />

                    <TextField
                        label={t(
                            "panel.configuration.kinematics-right-anchor-x"
                        )}
                        value={
                            config?.kinematics?.WallPlotter?.right_anchor_x ??
                            100
                        }
                        setValue={(value) => {
                            config.kinematics.WallPlotter.right_anchor_x =
                                +value;
                            setValue(config);
                        }}
                        unit="mm"
                    />

                    <TextField
                        label={t(
                            "panel.configuration.kinematics-right-anchor-y"
                        )}
                        value={
                            config?.kinematics?.WallPlotter?.right_anchor_y ??
                            100
                        }
                        setValue={(value) => {
                            config.kinematics.WallPlotter.right_anchor_y =
                                +value;
                            setValue(config);
                        }}
                        unit="mm"
                    />

                    <TextField
                        label={t(
                            "panel.configuration.kinematics-segment-length"
                        )}
                        value={
                            config?.kinematics?.WallPlotter?.segment_length ??
                            10
                        }
                        setValue={(value) => {
                            config.kinematics.WallPlotter.segment_length =
                                +value;
                            setValue(config);
                        }}
                        unit="mm"
                    />
                </>
            )}

            {config?.kinematics?.parallel_delta && (
                <>
                    <TextField
                        label={t("panel.configuration.kinematics-crank")}
                        value={
                            config?.kinematics?.parallel_delta?.crank_mm ?? 70
                        }
                        setValue={(value) => {
                            config.kinematics.parallel_delta.crank_mm = isNaN(
                                +value
                            )
                                ? 0
                                : +value;

                            setValue(config);
                        }}
                        unit="mm"
                    />
                    <TextField
                        label={t(
                            "panel.configuration.kinematics-base-triangle"
                        )}
                        value={
                            config?.kinematics?.parallel_delta
                                ?.base_triangle_mm ?? 179.437
                        }
                        setValue={(value) => {
                            config.kinematics.parallel_delta.base_triangle_mm =
                                isNaN(+value) ? 0 : +value;

                            setValue(config);
                        }}
                        unit="mm"
                    />
                    <TextField
                        label={t("panel.configuration.kinematics-linkage")}
                        value={
                            config?.kinematics?.parallel_delta?.linkage_mm ??
                            133.5
                        }
                        setValue={(value) => {
                            config.kinematics.parallel_delta.linkage_mm = isNaN(
                                +value
                            )
                                ? 0
                                : +value;

                            setValue(config);
                        }}
                        unit="mm"
                    />
                    <TextField
                        label={t(
                            "panel.configuration.kinematics-end-effector-triangle"
                        )}
                        value={
                            config?.kinematics?.parallel_delta
                                ?.end_effector_triangle_mm ?? 86.603
                        }
                        setValue={(value) => {
                            config.kinematics.parallel_delta.end_effector_triangle_mm =
                                isNaN(+value) ? 0 : +value;

                            setValue(config);
                        }}
                        unit="mm"
                    />
                    <TextField
                        label={t(
                            "panel.configuration.kinematics-segment-length"
                        )}
                        value={
                            config?.kinematics?.parallel_delta
                                ?.kinematic_segment_len_mm ?? 1
                        }
                        setValue={(value) => {
                            config.kinematics.parallel_delta.kinematic_segment_len_mm =
                                isNaN(+value) ? 0 : +value;

                            setValue(config);
                        }}
                        unit="mm"
                    />
                    <TextField
                        label={t("panel.configuration.kinematics-homing-mpos")}
                        value={
                            config?.kinematics?.parallel_delta
                                ?.homing_mpos_radians ?? 0
                        }
                        setValue={(value) => {
                            config.kinematics.parallel_delta.homing_mpos_radians =
                                isNaN(+value) ? 0 : +value;

                            setValue(config);
                        }}
                        unit="radians"
                    />
                    <BooleanField
                        label={t("panel.configuration.kinematics-soft-limits")}
                        value={
                            config?.kinematics?.parallel_delta?.soft_limits ??
                            false
                        }
                        setValue={(value) => {
                            config.kinematics.parallel_delta.soft_limits =
                                value;

                            setValue(config);
                        }}
                    />
                    <TextField
                        label={t("panel.configuration.kinematics-max-z")}
                        value={
                            config?.kinematics?.parallel_delta?.max_z_mm ?? 0
                        }
                        setValue={(value) => {
                            config.kinematics.parallel_delta.max_z_mm = isNaN(
                                +value
                            )
                                ? 0
                                : +value;

                            setValue(config);
                        }}
                        unit="mm"
                    />
                    <BooleanField
                        label={t("panel.configuration.kinematics-use-servos")}
                        value={
                            config?.kinematics?.parallel_delta?.use_servos ??
                            true
                        }
                        setValue={(value) => {
                            config.kinematics.parallel_delta.use_servos = value;

                            setValue(config);
                        }}
                    />
                </>
            )}
        </>
    );
};

export default KinematicsGroup;
