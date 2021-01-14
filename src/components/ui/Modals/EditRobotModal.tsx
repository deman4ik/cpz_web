/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { ROBOT } from "graphql/local/queries";
import { queriesToRobotTypeMap } from "graphql/common/queries";
import { Button, Modal } from "components/basic";
import { buildSettings, getLimits, limitsPropToType } from "./helpers";
import { volumeTypeOptionsMap } from "./constants";
import styles from "./index.module.css";
import { SubscribeModalContent } from "components/ui/Modals/SubscribeModal/SubscribeModalContent";
import { useSubscribeModal } from "components/ui/Modals/SubscribeModal/useSubscribeModal";
import { AddRobotInputsMap } from "components/ui/Modals/constants";
import { AuthContext } from "libs/hoc/context";
import { EDIT_SIGNAL } from "graphql/signals/mutations";
import { RobotsType } from "config/types";
import { USER_ROBOT_EDIT } from "graphql/robots/mutations";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";

interface Props {
    onClose: (changesMade?: boolean) => void;
    isOpen: boolean;
    title: string;
    type: string;
    setTitle: (title: string) => void;
    code?: string;
}
const inputs = AddRobotInputsMap;

const queryToEditType = {
    [RobotsType.signals]: EDIT_SIGNAL,
    [RobotsType.robots]: USER_ROBOT_EDIT
};
const mapPropToType = {
    [RobotsType.robots]: "userRobotEdit",
    [RobotsType.signals]: "userSignalEdit"
};
const _EditRobotModal: React.FC<Props> = ({ onClose, isOpen, title, setTitle, type }) => {
    const { authState } = useContext(AuthContext);

    const [formError, setFormError] = useState("");
    const { data: robotData } = useQuery(ROBOT(type));

    const { exchange, asset, currency } = robotData?.robot.subs || {};
    const { data, loading, refetch } = useQueryWithAuth(true, queriesToRobotTypeMap[type], {
        variables: {
            id: robotData?.robot.user_ex_acc_id,
            exchange,
            asset,
            currency,
            user_id: authState.user_id
        }
    });

    const limits = useMemo(() => !loading && data && getLimits(data, limitsPropToType[type]), [loading, data]);

    const subscribeModalProps = useSubscribeModal({
        limits,
        inputs,
        robotData
    });
    const { inputValues, volumeType, precision, errors } = subscribeModalProps;

    const [userRobotEdit, { loading: editRobotLoading }] = useMutation(queryToEditType[type]);

    const handleOnSubmit = () => {
        const settings = buildSettings({ volumeType, inputValues, precision });
        const prop = mapPropToType[type];
        userRobotEdit({
            variables: {
                robotId: robotData?.robot.userRobotId || robotData?.robot.id,
                settings
            }
        })
            .then((response) => {
                const { data: responseData } = response;
                if (!responseData[prop].result) {
                    setFormError(responseData[prop].error);
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
                    volumeTypeOptions={volumeTypeOptionsMap[type]}
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
