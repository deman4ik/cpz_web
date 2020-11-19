import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { event } from "libs/gtag";
import { ROBOT } from "graphql/local/queries";
import { GET_MARKETS } from "graphql/common/queries";
import { EDIT_SIGNAL, SUBSCRIBE_TO_SIGNALS } from "graphql/signals/mutations";
import { SUBSCRIBE } from "graphql/local/mutations";
import { Modal } from "components/basic";
import { buildSettings, getLimitsForSignal } from "../helpers";
import { AddRobotInputsMap, volumeTypeOptions } from "../constants";
import { ModalButtons } from "components/pages/SignalRobotPage/Modals/ModalsButtons";
import { SubscribeModalContent } from "components/ui/Modals/SubscribeModal/SubscribeModalContent";
import { Input } from "components/ui/Modals/types";
import { useSubscribeModal } from "components/ui/Modals/SubscribeModal/useSubscribeModal";
import { AuthContext } from "libs/hoc/context";
import Router from "next/router";

interface Props {
    actionType?: string;
    setTitle: (title: string) => void;
    onClose: (needsRefreshing?: boolean) => void;
    isOpen: boolean;
    title: string;
    inputs?: Input[];
}

const inputs = AddRobotInputsMap;

const _SubscribeModal: React.FC<Props> = ({ actionType, setTitle, onClose, isOpen, title }) => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);
    //local states
    const [formError, setFormError] = useState("");
    // mutations
    const [subscribe, { loading: subscribeLoading, error: subscribeError }] = useMutation(SUBSCRIBE_TO_SIGNALS);
    const [edit, { loading: editLoading, error: editError }] = useMutation(EDIT_SIGNAL);
    const [cacheSubscription] = useMutation(SUBSCRIBE);
    //queries
    const { data: robotData } = useQuery(ROBOT);

    const asset = robotData?.robot.subs.asset;
    const { data: limitsData, loading } = useQuery(GET_MARKETS, {
        variables: {
            exchange: !robotData ? null : robotData?.robot.subs.exchange,
            asset: !robotData ? null : asset,
            currency: !robotData ? null : robotData?.robot.subs.currency,
            user_id
        },
        skip: !robotData
    });

    //utilities
    const limits = useMemo(() => !loading && limitsData && getLimitsForSignal(limitsData), [loading, limitsData]);

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

    const writeToCache = (settings) => {
        cacheSubscription({
            variables: {
                cache: robotData?.robot.cache,
                settings,
                type: actionType,
                chartData: robotData?.ChartData
            }
        }).catch((e) => console.error(e));
    };

    //hooks
    useEffect(() => {
        let ref = null;
        if (!subscribeLoading && !editLoading && (subscribeError || editError)) {
            setFormError(subscribeError?.graphQLErrors[0].message || editError?.graphQLErrors[0].message);
            ref = setTimeout(() => setFormError(""), 5000);
        }
        return () => clearTimeout(ref);
    }, [editError, editLoading, subscribeError, subscribeLoading]);

    useEffect(() => {
        setTitle(`${actionType === "edit" ? "Edit" : "Follow"} ${robotData?.robot.name}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setTitle, actionType]);

    //validation
    const enabled = !editLoading && !subscribeLoading;

    //handlers
    const onSubmit = () => {
        const settings = buildSettings({ volumeType, inputValues });
        const variables = {
            robotId: robotData?.robot.id,
            settings
        };
        if (actionType === "edit") {
            edit({ variables })
                .then((res) => {
                    if (res.data.userSignalEdit.result === "OK") {
                        writeToCache(settings);
                        onClose(true);
                    }
                })
                .catch((e) => console.error(e));
        } else
            subscribe({ variables })
                .then((res) => {
                    if (res.data.userSignalSubscribe.result === "OK") {
                        writeToCache(settings);
                        event({
                            action: "subscribe",
                            category: "Signals",
                            label: "subscribe",
                            value: robotData?.robot.id
                        });
                        onClose(true);
                        Router.push(`/signals/robot/${robotData?.robot.code}`);
                    }
                })
                .catch((e) => console.error(e));
    };

    const onKeyPress = (e) => {
        if (e.key === "Enter" && !errors.length) {
            onSubmit();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={() => onClose()}
            title={title}
            footer={
                <ModalButtons
                    okTitle={actionType === "edit" ? "Apply" : "OK"}
                    cancelTitle="Cancel"
                    disabled={errors.length}
                    onOk={onSubmit}
                    onCancel={onClose}
                    isLoading={!enabled}
                />
            }>
            <SubscribeModalContent
                minAmounts={minAmounts}
                volumeTypeOptions={volumeTypeOptions}
                inputValues={inputValues}
                setInputValues={setInputValues}
                validate={validate}
                inputs={inputs}
                setVolumeType={setVolumeType}
                volumeType={volumeType}
                parsedLimits={parsedLimits}
                robotData={robotData}
                onKeyPress={onKeyPress}
                enabled={enabled}
                formError={formError}
            />
        </Modal>
    );
};

export const SubscribeModal = memo(_SubscribeModal);
