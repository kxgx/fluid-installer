import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    Col,
    Form,
    InputGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Image
} from "react-bootstrap";
import Button from "../../components/button";
import ConfigService, {
    ConfigBoard,
    ConfigFile
} from "../../services/ConfigService";
import { Config } from "../../model/Config";
import { fileDataToConfig } from "../../utils/utils";
import AlertMessage from "../../components/alertmessage/AlertMessage";

type Props = {
    show: boolean;
    defaultFilename: string;
    createNew: boolean;
    onCreate: (filename: string, content?: string) => void;
    onCancel: () => void;
};

const CreateFileModal = ({
    show,
    defaultFilename,
    createNew,
    onCancel,
    onCreate
}: Props) => {
    const { t } = useTranslation();
    const [filename, setFileName] = useState(defaultFilename);
    const [boards, setBoards] = useState<ConfigBoard[]>([]);
    const [createFromTemplate, setCreateFromTemplate] = useState(false);
    const [selectedBoard, setSelectedBoard] = useState<
        ConfigBoard | undefined
    >();
    const [selectedConfig, setSelectedConfig] = useState<
        ConfigFile | undefined
    >();
    const [content, setContent] = useState<string>("");
    const [config, setConfig] = useState<Config | undefined>();
    const [configError, setConfigError] = useState<boolean>(false);

    useEffect(() => {
        ConfigService.getBoards().then((boards) => {
            setBoards(boards);
        });
    }, []);

    useEffect(() => {
        setContent("");
        if (!selectedConfig || !selectedConfig.url) {
            return;
        }
        fetch(selectedConfig.url).then((response) => {
            setConfigError(false);
            response
                .text()
                .then(setContent)
                .catch((error) => {
                    setConfigError(true);
                    console.error("Could not load config", error);
                });
        });
    }, [selectedConfig]);

    useEffect(() => {
        setConfig(undefined);

        if (content) {
            try {
                setConfig(fileDataToConfig(content));
            } catch (error) {
                console.error("Error loading config", error);
            }
        }
    }, [content]);

    return (
        <Modal show={show} size="xl" scrollable={true} centered={false}>
            <ModalHeader>
                {t("page.file-browser.create-new-config")}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="6">
                        <Form.Label>{t("page.file-browser.upload")}</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type={"text"}
                                placeholder={"config.yaml"}
                                value={filename}
                                onChange={(event) =>
                                    setFileName(event.target.value)
                                }
                            />
                        </InputGroup>
                    </Col>
                </Row>

                {createNew && (
                    <>
                        <Row>
                            <Col sm="12" xl="6">
                                <InputGroup style={{ marginTop: "20px" }}>
                                    <Form.Check
                                        type="switch"
                                        label="从模板创建"
                                        onChange={(event) =>
                                            setCreateFromTemplate(
                                                event.target.checked
                                            )
                                        }
                                    />
                                </InputGroup>

                                {createFromTemplate && (
                                    <AlertMessage
                                        variant="info"
                                        style={{ marginTop: "20px" }}
                                    >
                                        <p>
                                            These configuration files are
                                            contributed by users and might not
                                            be up to date. Please recheck the
                                            configuration before use.
                                            <br />
                                            To modify or adding new templates,
                                            visit this{" "}
                                            <a
                                                href="https://github.com/bdring/fluidnc-config-files"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                GitHub 页面
                                            </a>
                                            .
                                        </p>
                                    </AlertMessage>
                                )}
                            </Col>
                        </Row>
                        {createFromTemplate && (
                            <>
                                <Row>
                                    <Col sm="6">
                                        <Form.Label
                                            style={{ marginTop: "20px" }}
                                        >
                                            主板
                                        </Form.Label>
                                        <Form.Select
                                            onChange={(event) => {
                                                const newBoard = boards.find(
                                                    (board) =>
                                                        board.name ===
                                                        event.target.value
                                                );
                                                setSelectedBoard(newBoard);
                                                setSelectedConfig(
                                                    newBoard?.files?.length
                                                        ? newBoard.files?.[0]
                                                        : undefined
                                                );
                                            }}
                                        >
                                            <option></option>
                                            {boards.map((board, index) => (
                                                <option
                                                    key={board.name + index}
                                                    value={board.name}
                                                >
                                                    {board.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <Form.Label
                                            style={{ marginTop: "20px" }}
                                        >
                                            配置模板
                                        </Form.Label>
                                        <Form.Select
                                            onChange={(event) =>
                                                setSelectedConfig(
                                                    selectedBoard.files.find(
                                                        (file) =>
                                                            file.name ===
                                                            event.target.value
                                                    )
                                                )
                                            }
                                            value={selectedConfig?.name}
                                        >
                                            {selectedBoard?.files.map(
                                                (file, index) => (
                                                    <option
                                                        key={file.name + index}
                                                        value={file.name}
                                                    >
                                                        {file.name}
                                                    </option>
                                                )
                                            )}
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "20px" }}>
                                    <Col>
                                        {selectedBoard?.logoUrl && (
                                            <Image
                                                width={180}
                                                src={selectedBoard?.logoUrl}
                                                alt="Board logo"
                                                style={{ marginBottom: "20px" }}
                                            />
                                        )}
                                        <h2>{config?.name?.toString()}</h2>
                                        <p>{config?.meta?.toString()}</p>
                                        {configError && (
                                            <AlertMessage>
                                                配置文件似乎无效...
                                            </AlertMessage>
                                        )}
                                    </Col>
                                    <Col>
                                        {selectedBoard?.boardImageUrl && (
                                            <Image
                                                src={
                                                    selectedBoard?.boardImageUrl
                                                }
                                                rounded
                                                fluid
                                                alt="Board picture"
                                            />
                                        )}
                                    </Col>
                                </Row>
                            </>
                        )}
                    </>
                )}
            </ModalBody>
            <ModalFooter>
                <Button onClick={onCancel}>
                    {t("modal.installer.cancel")}
                </Button>
                <Button
                    buttonType="btn-success"
                    onClick={() => onCreate(filename, content)}
                >
                    {t("modal.installer.continue")}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateFileModal;
