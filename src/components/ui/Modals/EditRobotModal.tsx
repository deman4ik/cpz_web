/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, memo } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { ROBOT } from "graphql/local/queries";
import { GET_MARKETS } from "graphql/common/queries";
import { USER_ROBOT_EDIT } from "graphql/robots/mutations";
import { LoadingIndicator } from "components/common";
import { Button, Modal } from "components/basic";
import { getLimitsForRobot, buildSettings } from "./helpers";
import { robotVolumeTypeOptions } from "./constants";
import styles from "./index.module.css";
import { SubscribeModalContent } from "components/ui/Modals/SubscribeModal/SubscribeModalContent";
import { useSubscribeModal } from "components/ui/Modals/SubscribeModal/useSubscribeModal";
import { AddRobotInputsMap } from "components/ui/Modals/constants";

interface Props {
    onClose: (changesMade?: boolean) => void;
    isOpen: boolean;
    title: string;
    setTitle: (title: string) => void;
    code?: string;
}
const inputs = AddRobotInputsMap;

const _EditRobotModal: React.FC<Props> = ({ onClose, isOpen, title }) => {
    const [formError, setFormError] = useState("");
    const { data: robotData } = useQuery(ROBOT);

    const { data, loading } = useQuery(GET_MARKETS, {
        variables: {
            exchange: robotData.robot.subs.exchange,
            asset: robotData.robot.subs.asset,
            currency: robotData.robot.subs.currency
        },
        skip: !robotData
    });

    const limits = useMemo(() => !loading && data && getLimitsForRobot(data), [loading, data]);

    const {
        inputValues,
        setInputValues,
        parsedLimits,
        validate,
        volumeType,
        setVolumeType,
        errors
    } = useSubscribeModal({
        limits,
        inputs
    });
    const [userRobotEdit, { loading: editRobotLoading }] = useMutation(USER_ROBOT_EDIT);

    const handleOnSubmit = () => {
        const settings = buildSettings({ volumeType, inputValues });
        userRobotEdit({
            variables: {
                id: robotData.robot.userRobotId,
                settings
            }
        }).then((response) => {
            if (response.data.userRobotEdit.result !== "OK") {
                setFormError(response.data.userRobotEdit.error);
            }
            onClose(true);
        });
    };

    const onKeyPress = (e) => {
        if (e.nativeEvent.key === "Enter" && !errors.length) {
            handleOnSubmit();
        }
    };

    const enabled = !(loading || editRobotLoading);
    return (
        <Modal isOpen={isOpen} onClose={() => onClose()} title={title}>
            {!enabled ? (
                <LoadingIndicator />
            ) : (
                <>
                    <SubscribeModalContent
                        volumeTypeOptions={robotVolumeTypeOptions}
                        robotData={robotData}
                        formError={formError}
                        inputValues={inputValues}
                        setInputValues={setInputValues}
                        validate={validate}
                        inputs={inputs}
                        setVolumeType={setVolumeType}
                        volumeType={volumeType}
                        parsedLimits={parsedLimits}
                        onKeyPress={onKeyPress}
                        enabled={enabled}
                    />
                    <div className={styles.btns}>
                        <Button
                            className={styles.btn}
                            title="Save"
                            icon="check"
                            type="success"
                            disabled={errors.length > 0}
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
                </>
            )}
        </Modal>
    );
};

export const EditRobotModal = memo(_EditRobotModal);
