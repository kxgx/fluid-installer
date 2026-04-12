import React from "react";
import {
    Pin,
    PinConfig,
    SDCard,
    SPI as SPIConfig
} from "../../../model/Config";
import PinField from "../../../components/fields/PinField";
import { Board } from "../../../model/Boards";
import { Form } from "react-bootstrap";
import CollapseSection from "../../../components/collapsesection/CollapseSection";
import { useTranslation } from "react-i18next";

type SPIProps = {
    board: Board;
    spi?: SPIConfig;
    sdcard?: SDCard;
    setValue: (spi?: SPIConfig, sdcard?: SDCard) => void;
    usedPins: Map<string, PinConfig>;
};

const SDCardGroup = ({ board, spi, sdcard, setValue, usedPins }: SPIProps) => {
    const { t } = useTranslation();
    return (
        <div style={{ marginBottom: "48px" }}>
            <h4>
                {t("panel.configuration.sdcard")}
                <Form.Check
                    type="switch"
                    style={{ display: "inline", marginLeft: "16px" }}
                    checked={!!sdcard}
                    onChange={() => {
                        if (sdcard) {
                            setValue(undefined, undefined);
                        } else {
                            setValue(
                                spi ?? {
                                    miso_pin: Pin.GPIO_19,
                                    mosi_pin: Pin.GPIO_23,
                                    sck_pin: Pin.GPIO_18
                                },
                                {
                                    card_detect_pin: Pin.NO_PIN,
                                    cs_pin: Pin.GPIO_5
                                }
                            );
                        }
                    }}
                ></Form.Check>
            </h4>

            <CollapseSection show={!!sdcard}>
                <PinField
                    label={t("panel.configuration.sdcard-miso-pin")}
                    board={board}
                    value={PinConfig.fromString(spi?.miso_pin)}
                    setValue={(misoPin) => {
                        setValue(
                            {
                                ...spi,
                                ...{ miso_pin: misoPin.toString() }
                            },
                            sdcard
                        );
                    }}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.sdcard-mosi-pin")}
                    board={board}
                    value={PinConfig.fromString(spi?.mosi_pin)}
                    setValue={(mosiPin) => {
                        setValue(
                            {
                                ...spi,
                                ...{ mosi_pin: mosiPin.toString() }
                            },
                            sdcard
                        );
                    }}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.sdcard-sck-pin")}
                    board={board}
                    value={PinConfig.fromString(spi?.sck_pin)}
                    setValue={(sckPin) => {
                        setValue(
                            {
                                ...spi,
                                ...{ sck_pin: sckPin.toString() }
                            },
                            sdcard
                        );
                    }}
                    usedPins={usedPins}
                />

                <PinField
                    label={t("panel.configuration.sdcard-card-detect-pin")}
                    board={board}
                    value={PinConfig.fromString(sdcard?.card_detect_pin)}
                    setValue={(value) => {
                        setValue(spi, {
                            ...sdcard,
                            ...{ card_detect_pin: value.toString() }
                        });
                    }}
                    usedPins={usedPins}
                />
                <PinField
                    label={t("panel.configuration.sdcard-cs-pin")}
                    board={board}
                    value={PinConfig.fromString(sdcard?.cs_pin)}
                    setValue={(value) => {
                        setValue(spi, {
                            ...sdcard,
                            ...{ cs_pin: value.toString() }
                        });
                    }}
                    usedPins={usedPins}
                />
            </CollapseSection>
        </div>
    );
};

export default SDCardGroup;
