import React, { memo, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { event } from "libs/gtag";
import { ROBOT } from "graphql/local/queries";
import { GET_MARKETS } from "graphql/common/queries";
import { EDIT_SIGNAL, SUBSCRIBE_TO_SIGNALS } from "graphql/signals/mutations";
import { SUBSCRIBE } from "graphql/local/mutations";
import { Modal } from "components/basic";
import { buildSettings, getLimitsForSignal } from "../helpers";
import { ModalButtons } from "components/pages/SignalRobotPage/Modals/ModalsButtons";
import { SubscribeModalContent } from "components/ui/Modals/SubscribeModal/SubscribeModalContent";
import { Input, InputTypes, InputValues } from "components/ui/Modals/types";
import { useSubscribeModal } from "components/ui/Modals/SubscribeModal/useSubscribeModal";

interface Props {
    actionType?: string;
    setTitle: (title: string) => void;
    onClose: (needsRefreshing?: boolean) => void;
    isOpen: boolean;
    title: string;
    inputs?: Input[];
}

const inputs = [{ type: InputTypes.assetStatic }, { type: InputTypes.currencyDynamic }];

const _SubscribeModal: React.FC<Props> = ({ actionType, setTitle, onClose, isOpen, title }) => {
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
            currency: !robotData ? null : robotData?.robot.subs.currency
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
        errors
    } = useSubscribeModal({
        limits,
        inputs
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
        setTitle(`${actionType === "edit" ? "Edit" : "Follow"} ${robotData.robot.name}`);
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
