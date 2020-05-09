/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, memo } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { ROBOT } from "../../../graphql/local/queries";
import { GET_MARKETS } from "../../../graphql/common/queries";
import { EDIT_ROBOT } from "../../../graphql/local/mutations";
import { USER_ROBOT_EDIT } from "../../../graphql/robots/mutations";
import { ErrorLine, LoadingIndicator } from "../../common";
import { Button, Input } from "../../basic";
import { moneyFormat } from "../../../config/utils";
import { getLimits, calculateCurrency, calculateAsset } from "./helpers";
import { color } from "../../../config/constants";
import styles from "./index.module.css";

interface Props {
    onClose: () => void;
    setTitle: (title: string) => void;
    code?: string;
}

const _EditRobotModal: React.FC<Props> = ({ onClose, code, setTitle }) => {
    const [formError, setFormError] = useState("");
    const { data: dataRobot } = useQuery(ROBOT);
    const [inputVolumeAsset, setInputVolumeAsset] = useState("0");
    const [inputVolumeCurrency, setInputVolumeCurrency] = useState("0");

    const { data, loading } = useQuery(GET_MARKETS, {
        variables: {
            exchange: dataRobot.robot.subs.exchange,
            asset: dataRobot.robot.subs.asset,
            currency: dataRobot.robot.subs.currency
        },
        skip: !dataRobot
    });

    const limits = useMemo(() => (!loading && data ? getLimits(data) : { asset: { min: 0, max: 0 }, price: 0 }), [
        loading,
        data
    ]);

    useEffect(() => {
        if (dataRobot) {
            setInputVolumeAsset(dataRobot.robot.subs.volume);
            setInputVolumeCurrency(calculateCurrency(dataRobot.robot.subs.volume, limits.price));
            setTitle(`Edit ${dataRobot ? dataRobot.robot.name : ""}`);
        }
    }, [dataRobot, limits]);

    const handleOnChangeAsset = (value: string) => {
        setInputVolumeAsset(value);
        setInputVolumeCurrency(calculateCurrency(value, limits.price));
    };

    const handleOnChangeCurrency = (value: string) => {
        setInputVolumeCurrency(value);
        setInputVolumeAsset(calculateAsset(value, limits.price));
    };

    const [userRobotEdit, { loading: editRobotLoading }] = useMutation(USER_ROBOT_EDIT);
    const [editRobot] = useMutation(EDIT_ROBOT);

    const handleOnSubmit = () => {
        userRobotEdit({
            variables: {
                id: dataRobot.robot.userRobotId,
                volume: Number(inputVolumeAsset)
            }
        }).then((response) => {
            if (response.data.userRobotEdit.success) {
                editRobot({
                    variables: {
                        robot: dataRobot.robot,
                        volume: Number(inputVolumeAsset),
                        code
                    }
                });
            } else {
                setFormError(response.data.userRobotEdit.error);
            }
            onClose();
        });
    };
    const isValid = () => Number(inputVolumeAsset) >= limits.asset.min && Number(inputVolumeAsset) <= limits.asset.max;
    const handleOnKeyPress = (e) => {
        if (e.nativeEvent.key === "Enter" && isValid()) {
            handleOnSubmit();
        }
    };

    return (
        <>
            {loading || editRobotLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    {formError && <ErrorLine formError={formError} />}
                    <div className={styles.container}>
                        <div className={styles.bodyTitle}>
                            Please enter desired trading amount in&nbsp;
                            <span style={{ color: color.white }}>{dataRobot ? dataRobot.robot.subs.asset : ""}</span>
                        </div>
                        <div className={styles.form}>
                            <div className={[styles.bodyText, styles.formComment].join(" ")}>
                                <div className={styles.value_group}>
                                    <div className={styles.label}>Minimum value is&nbsp;</div>
                                    <div className={styles.value_row}>
                                        <span>{moneyFormat(limits.asset.min, 3)}</span>&nbsp;
                                        <span style={{ color: "white" }}>
                                            {dataRobot ? dataRobot.robot.subs.asset : ""}
                                        </span>
                                        &nbsp;≈&nbsp;{calculateCurrency(limits.asset.min.toString(), limits.price)}
                                        &nbsp;$
                                    </div>
                                </div>
                            </div>
                            <div className={styles.fieldset}>
                                <div className={styles.input_group}>
                                    <div className={styles.volume}>
                                        <Input
                                            error={!isValid()}
                                            type="number"
                                            width={150}
                                            value={inputVolumeAsset}
                                            selectTextOnFocus
                                            right
                                            onChangeText={(value) => handleOnChangeAsset(value)}
                                            onKeyPress={handleOnKeyPress}
                                        />
                                        <span className={styles.volume_text}>
                                            {dataRobot ? dataRobot.robot.subs.asset : ""}
                                        </span>
                                    </div>
                                    <span className={styles.delimiter} style={{ marginTop: 3 }}>
                                        ≈
                                    </span>
                                    <div className={styles.volume} style={{ marginTop: 3 }}>
                                        <Input
                                            type="number"
                                            value={`${inputVolumeCurrency}`}
                                            width={150}
                                            right
                                            onKeyPress={handleOnKeyPress}
                                            onChangeText={(value) => handleOnChangeCurrency(value)}
                                        />
                                        <span className={styles.volume_text}>$</span>
                                    </div>
                                </div>
                                <div className={styles.btns}>
                                    <Button
                                        className={styles.btn}
                                        title="Save"
                                        icon="check"
                                        type="success"
                                        disabled={!isValid()}
                                        isUppercase
                                        onClick={handleOnSubmit}
                                    />
                                    <Button
                                        className={styles.btn}
                                        title="Cancel"
                                        icon="close"
                                        type="dimmed"
                                        isUppercase
                                        onClick={onClose}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export const EditRobotModal = memo(_EditRobotModal);
