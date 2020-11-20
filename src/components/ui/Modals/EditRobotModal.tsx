/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ROBOT } from "graphql/local/queries";
import { GET_MARKETS } from "graphql/common/queries";
import { USER_ROBOT_EDIT } from "graphql/robots/mutations";
import { Button, Modal } from "components/basic";
import { buildSettings, getLimits, limitsPropToType } from "./helpers";
import { robotVolumeTypeOptions } from "./constants";
import styles from "./index.module.css";
import { SubscribeModalContent } from "components/ui/Modals/SubscribeModal/SubscribeModalContent";
import { useSubscribeModal } from "components/ui/Modals/SubscribeModal/useSubscribeModal";
import { AddRobotInputsMap } from "components/ui/Modals/constants";
import { AuthContext } from "libs/hoc/context";

interface Props {
    onClose: (changesMade?: boolean) => void;
    isOpen: boolean;
    title: string;
    type: string;
    setTitle: (title: string) => void;
    code?: string;
}
const inputs = AddRobotInputsMap;

const _EditRobotModal: React.FC<Props> = ({ onClose, isOpen, title, setTitle, type }) => {
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

    const limits = useMemo(() => !loading && data && getLimits(data, limitsPropToType[type]), [loading, data]);

    const subscribeModalProps = useSubscribeModal({
        limits,
        inputs,
        robotData
    });
    const { inputValues, volumeType, precision, errors } = subscribeModalProps;

    const [userRobotEdit, { loading: editRobotLoading }] = useMutation(USER_ROBOT_EDIT);

    const handleOnSubmit = () => {
        const settings = buildSettings({ volumeType, inputValues, precision });
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
        setTitle(`Edit ${robotData?.robot.name || "Robot"}`);
    }, [robotData]);

    useEffect(() => {
        setFormError("");
    }, [isOpen]);

    const enabled = !(loading || editRobotLoading);
    return (
        <Modal isOpen={isOpen} onClose={() => onClose()} title={title}>
            <>
                <SubscribeModalContent
                    {...subscribeModalProps}
                    volumeTypeOptions={robotVolumeTypeOptions}
                    robotData={robotData}
                    formError={formError}
                    inputs={inputs}
                    onKeyPress={onKeyPress}
                    enabled={enabled}
                />
                <div className={styles.btns}>
                    <Button
                        className={styles.btn}
                        isLoading={!enabled}
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
