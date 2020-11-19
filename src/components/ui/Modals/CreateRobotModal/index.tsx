/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
// context
import { AuthContext } from "libs/hoc/context";

import { ROBOT } from "graphql/local/queries";
import { GET_USER_EXCHANGES_WITH_MARKETS } from "graphql/profile/queries";
import { USER_ROBOT_CREATE, USER_ROBOT_START } from "graphql/robots/mutations";
import { ACTION_ROBOT, CREATE_ROBOT } from "graphql/local/mutations";
import { exchangeName } from "config/utils";
import { StepWizard } from "components/basic";
import { CreateRobotStep1 } from "./CreateRobotStep1";
import { CreateRobotStep2 } from "./CreateRobotStep2";
import { CreateRobotStep3 } from "./CreateRobotStep3";
import { ErrorLine, LoadingIndicator } from "components/common";
import { buildSettings, getLimitsForRobot } from "../helpers";
import { robotVolumeTypeOptions } from "../constants";
import { event } from "libs/gtag";
import styles from "../index.module.css";
import { useSubscribeModal } from "components/ui/Modals/SubscribeModal/useSubscribeModal";
import { GET_MARKETS } from "graphql/common/queries";
import { SOMETHING_WENT_WRONG } from "config/constants";
import { AddRobotInputsMap } from "components/ui/Modals/constants";

interface Props {
    onClose: (changesMade: boolean) => void;
    code?: string;
    width: number;
}
const steps = ["Choose Exchange API Keys", "Enter trading amount", "Start Trading Robot"];

const inputs = AddRobotInputsMap;

const _CreateRobotModal: React.FC<Props> = ({ onClose, code, width }) => {
    /*User context*/
    const {
        authState: { user_id }
    } = useContext(AuthContext);
    const [inputKey, setInputKey] = useState("");
    const [formError, setFormError] = useState("");
    const [newRobotId, setNewRobotId] = useState("");
    const [step, setStep] = useState(1);

    const handleOnNext = () => {
        setStep(step + 1);
    };

    const handleOnBack = () => {
        setStep(step - 1);
    };

    const { data: robotData } = useQuery(ROBOT);
    const { exchange, asset, currency } = robotData?.robot.subs || {};

    const variables = {
        exchange: !robotData ? null : exchange,
        asset: !robotData ? null : asset,
        currency: !robotData ? null : currency
    };
    const { data, loading } = useQuery(GET_USER_EXCHANGES_WITH_MARKETS, {
        variables: { ...variables, user_id },
        skip: !robotData
    });
    const { data: limitsData, loading: limitsLoading } = useQuery(GET_MARKETS, {
        variables: {
            exchange: !robotData ? null : exchange,
            asset: !robotData ? null : asset,
            currency: !robotData ? null : currency,
            user_id
        },
        skip: !robotData
    });

    const handleOnChangeExchange = (value?: string) => {
        const key =
            value && data ? data.userExchange.find((item) => item.id === value) : data ? data.userExchange[0] : null;

        if (key && key.status === "invalid") {
            setFormError(`Your API Key ${key.name} is invalid! ${key.error || ""} Please update your API Key.`);
        } else {
            setFormError("");
        }
        setInputKey(value);
    };

    const [userRobotCreate, { loading: createRobotLoading }] = useMutation(USER_ROBOT_CREATE);
    const [createRobot] = useMutation(CREATE_ROBOT);
    const [actionOnRobot] = useMutation(ACTION_ROBOT);
    const [userRobotStart, { loading: startLoading }] = useMutation(USER_ROBOT_START);

    const limits = useMemo(() => !limitsLoading && limitsData && getLimitsForRobot(limitsData), [
        limitsLoading,
        limitsData
    ]);

    const {
        inputValues,
        setInputValues,
        parsedLimits,
        validate,
        volumeType,
        setVolumeType,
        minAmounts,
        errors
    } = useSubscribeModal({
        limits,
        inputs,
        robotData
    });

    const handleOnCreate = () => {
        const settings = buildSettings({ volumeType, inputValues });

        userRobotCreate({
            variables: {
                robotId: robotData.robot.id,
                settings,
                userExAccId: inputKey
            }
        }).then((response) => {
            if (response.data.userRobotCreate.result) {
                setNewRobotId(response.data.userRobotCreate.result);
                createRobot({
                    variables: {
                        settings,
                        robotInfo: {
                            robotId: robotData.robot.id,
                            userRobotId: response.data.userRobotCreate.result,
                            code
                        }
                    }
                }).then((res) => {
                    event({
                        action: "create",
                        category: "Robots",
                        label: "create",
                        value: robotData.robot.id
                    });
                });
            } else {
                setFormError(response.data.userRobotCreate.error);
            }
            handleOnNext();
        });
    };

    const onKeyPress = (e) => {
        if (e.key === "Enter" && !errors) {
            handleOnCreate();
        }
    };

    const handleOnStart = () => {
        userRobotStart({
            variables: { id: newRobotId }
        })
            .then((response) => {
                if (response.data.userRobotStart.result) {
                    actionOnRobot({
                        variables: {
                            robot: robotData.robot,
                            message: "started"
                        }
                    }).then(() => {
                        event({
                            action: "start",
                            category: "Robots",
                            label: "start",
                            value: robotData.robot.id
                        });
                    });
                    onClose(true);
                } else {
                    setFormError(response.data.userRobotStart.error);
                }
            })
            .catch((e) => {
                setFormError(e.message || SOMETHING_WENT_WRONG);
            });
    };

    const dataPicker = useMemo(
        () =>
            !loading && data && data.userExchange
                ? data.userExchange.map((item) => ({
                      label: exchangeName(item.name),
                      value: item.id
                  }))
                : [],
        [loading, data]
    );

    useEffect(() => {
        if (dataPicker.length) {
            setInputKey(data.userExchange[0].id);
            setFormError("");
            handleOnChangeExchange(data.userExchange[0].id);
        }
    }, [dataPicker]);

    const isValid = () => !errors.length;

    const enabled = !(loading || createRobotLoading || startLoading);
    return (
        <>
            {/*{!enabled && <ModalLoading />}*/}
            <>
                <div className={styles.wizardContainer}>
                    <StepWizard steps={steps} activeStep={step} height={90} titleWidth={200} width={width} />
                </div>
                <ErrorLine formError={formError} />
                {step === 1 && dataPicker && (
                    <CreateRobotStep1
                        enabled={enabled}
                        dataPicker={dataPicker}
                        selectedKey={inputKey}
                        variables={{ ...variables, user_id }}
                        hasError={!!formError}
                        onClose={onClose}
                        setFormError={setFormError}
                        handleOnNext={handleOnNext}
                        handleOnChangeExchange={handleOnChangeExchange}
                    />
                )}
                {step === 2 && (
                    <CreateRobotStep2
                        minAmounts={minAmounts}
                        volumeTypeOptions={robotVolumeTypeOptions}
                        inputs={inputs}
                        robotData={robotData}
                        formError={formError}
                        inputValues={inputValues}
                        setInputValues={setInputValues}
                        validate={validate}
                        setVolumeType={setVolumeType}
                        volumeType={volumeType}
                        parsedLimits={parsedLimits}
                        onKeyPress={onKeyPress}
                        enabled={enabled}
                        handleOnBack={handleOnBack}
                        handleOnCreate={handleOnCreate}
                        isValid={isValid()}
                    />
                )}
                {step === 3 && (
                    <CreateRobotStep3
                        enabled={enabled}
                        robotName={robotData ? robotData.robot.name : null}
                        handleOnStart={handleOnStart}
                        onClose={onClose}
                    />
                )}
            </>
        </>
    );
};

export const CreateRobotModal = memo(_CreateRobotModal);
