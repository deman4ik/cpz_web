/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ROBOT } from "graphql/local/queries";
import { GET_MARKETS } from "graphql/common/queries";
import { USER_ROBOT_EDIT } from "graphql/robots/mutations";
import { Button, Modal } from "components/basic";
import { buildSettings, getLimitsForRobot } from "./helpers";
import { robotVolumeTypeOptions } from "./constants";
import styles from "./index.module.css";
import { SubscribeModalContent } from "components/ui/Modals/SubscribeModal/SubscribeModalContent";
import { useSubscribeModal } from "components/ui/Modals/SubscribeModal/useSubscribeModal";
import { AddRobotInputsMap } from "components/ui/Modals/constants";
import { AuthContext } from "libs/hoc/context";
import { ModalLoading } from "components/ui/Modals/ModalLoading";

interface Props {
    onClose: (changesMade?: boolean) => void;
    isOpen: boolean;
    title: string;
    setTitle: (title: string) => void;
    code?: string;
}
const inputs = AddRobotInputsMap;

const _EditRobotModal: React.FC<Props> = ({ onClose, isOpen, title, setTitle }) => {
    const { authState } = useContext(AuthContext);

    const [formError, setFormError] = useState("");
    const { data: robotData } = useQuery(ROBOT);
    const { exchange, asset, currency } = robotData?.robot.subs || {};
    const { data, loading, refetch } = useQuery(GET_MARKETS, {
        variables: {
            exchange,
            asset,
            currency,
            user_id: authState.user_id
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
        inputs,
        robotData
    });
    const [userRobotEdit, { loading: editRobotLoading }] = useMutation(USER_ROBOT_EDIT);

    const handleOnSubmit = () => {
        const settings = buildSettings({ volumeType, inputValues });
        userRobotEdit({
            variables: {
                id: robotData?.robot.userRobotId,
                settings
            }
        })
            .then((response) => {
                if (response.data.userRobotEdit.result !== "OK") {
                    setFormError(response.data.userRobotEdit.error);
                }
                refetch().catch((e) => console.error(e));
                onClose(true);
            })
            .catch((e) => {
                setFormError(e.message);
            });
    };

    const onKeyPress = (e) => {
        if (e.nativeEvent.key === "Enter" && !errors.length) {
            handleOnSubmit();
        }
    };

    useEffect(() => {
        setTitle(`Edit ${robotData.robot.name}`);
    }, []);

    useEffect(() => {
        setFormError("");
    }, [isOpen]);

    const enabled = !(loading || editRobotLoading);
    return (
        <Modal isOpen={isOpen} onClose={() => onClose()} title={title}>
            {!enabled && <ModalLoading />}
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
        </Modal>
    );
};

export const EditRobotModal = memo(_EditRobotModal);
