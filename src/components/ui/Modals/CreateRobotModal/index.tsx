/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo, memo } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { ROBOT } from "graphql/local/queries";
import { GET_USER_EXCHANGES_WITH_MARKETS } from "graphql/profile/queries";
import { USER_ROBOT_CREATE, USER_ROBOT_START } from "graphql/robots/mutations";
import { CREATE_ROBOT, ACTION_ROBOT } from "graphql/local/mutations";
import { exchangeName } from "config/utils";
import { StepWizard } from "components/basic";
import { CreateRobotStep1 } from "./CreateRobotStep1";
import { CreateRobotStep2 } from "./CreateRobotStep2";
import { CreateRobotStep3 } from "./CreateRobotStep3";
import { ErrorLine, LoadingIndicator } from "components/common";
import { getLimits, calculateCurrency } from "../helpers";
import { event } from "libs/gtag";
import styles from "../index.module.css";

interface Props {
    onClose: () => void;
    code?: string;
    width: number;
}
const steps = ["Choose Exchange API Keys", "Enter trading amount", "Start Trading Robot"];
const _CreateRobotModal: React.FC<Props> = ({ onClose, code, width }) => {
    const [inputKey, setInputKey] = useState("");
    const [inputVolumeAsset, setInputVolumeAsset] = useState("0");
    const [inputVolumeCurrency, setInputVolumeCurrency] = useState("0");
    const [formError, setFormError] = useState("");
    const [newRobotId, setNewRobotId] = useState("");

    const [step, setStep] = useState(1);
    const { data: dataRobot } = useQuery(ROBOT);

    const handleOnNext = () => {
        setStep(step + 1);
    };

    const handleOnBack = () => {
        setStep(step - 1);
    };

    const variables = {
        exchange: !dataRobot ? null : dataRobot.robot.subs.exchange,
        asset: !dataRobot ? null : dataRobot.robot.subs.asset,
        currency: !dataRobot ? null : dataRobot.robot.subs.currency
    };

    const _refetchQueries = [
        {
            query: GET_USER_EXCHANGES_WITH_MARKETS,
            variables
        }
    ];

    const { data, loading } = useQuery(GET_USER_EXCHANGES_WITH_MARKETS, {
        variables,
        skip: !dataRobot
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

    const limits = useMemo(() => (!loading && data ? getLimits(data) : { asset: { min: 0, max: 0 }, price: 0 }), [
        loading,
        data
    ]);

    const handleOnCreate = () => {
        userRobotCreate({
            variables: {
                robotId: dataRobot.robot.id,
                volume: Number(inputVolumeAsset),
                userExAccId: inputKey
            }
        }).then((response) => {
            if (response.data.userRobotCreate.success) {
                setNewRobotId(response.data.userRobotCreate.result);
                createRobot({
                    variables: {
                        volume: Number(inputVolumeAsset),
                        robotInfo: {
                            robotId: dataRobot.robot.id,
                            userRobotId: response.data.userRobotCreate.result,
                            code
                        }
                    }
                }).then(() => {
                    event({
                        action: "create",
                        category: "Robots",
                        label: "create",
                        value: dataRobot.robot.id
                    });
                    handleOnNext();
                });
            } else {
                setFormError(response.data.userRobotCreate.error);
            }
        });
    };

    const handleOnStart = () => {
        userRobotStart({
            variables: { id: newRobotId }
        }).then((response) => {
            if (response.data.userRobotStart.success) {
                actionOnRobot({
                    variables: {
                        robot: dataRobot.robot,
                        message: "started"
                    }
                }).then(() => {
                    event({
                        action: "start",
                        category: "Robots",
                        label: "start",
                        value: dataRobot.robot.id
                    });
                    onClose();
                });
            } else {
                setFormError(response.data.userRobotStart.error);
            }
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
            setInputVolumeAsset(dataRobot.robot.subs.volume);
            setInputVolumeCurrency(calculateCurrency(dataRobot.robot.subs.volume, limits.price));
        }
    }, [dataPicker]);

    return (
        <>
            {loading || createRobotLoading || startLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <div className={styles.wizardContainer}>
                        <StepWizard steps={steps} activeStep={step} height={90} titleWidth={200} width={width} />
                    </div>
                    <ErrorLine formError={formError} />
                    {step === 1 && dataPicker && (
                        <CreateRobotStep1
                            dataPicker={dataPicker}
                            exchange={variables.exchange}
                            selectedKey={inputKey}
                            refetchQueries={_refetchQueries}
                            hasError={!!formError}
                            onClose={onClose}
                            setFormError={setFormError}
                            handleOnNext={handleOnNext}
                            handleOnChangeExchange={handleOnChangeExchange}
                        />
                    )}
                    {step === 2 && (
                        <CreateRobotStep2
                            handleOnCreate={handleOnCreate}
                            handleOnBack={handleOnBack}
                            asset={dataRobot ? dataRobot.robot.subs.asset : ""}
                            limits={limits}
                            volumeAsset={inputVolumeAsset}
                            volumeCurrency={inputVolumeCurrency}
                            setInputVolumeAsset={setInputVolumeAsset}
                            setInputVolumeCurrency={setInputVolumeCurrency}
                        />
                    )}
                    {step === 3 && (
                        <CreateRobotStep3
                            robotName={dataRobot ? dataRobot.robot.name : null}
                            handleOnStart={handleOnStart}
                            onClose={onClose}
                        />
                    )}
                </>
            )}
        </>
    );
};

export const CreateRobotModal = memo(_CreateRobotModal);
