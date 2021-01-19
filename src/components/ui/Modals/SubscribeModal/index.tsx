import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { event } from "libs/gtag";
import { ROBOT } from "graphql/local/queries";
import { GET_MARKETS_SIGNALS } from "graphql/common/queries";
import { EDIT_SIGNAL, SUBSCRIBE_TO_SIGNALS } from "graphql/signals/mutations";
import { Modal } from "components/basic";
import { buildSettings, getLimitsForSignal } from "../helpers";
import { AddRobotInputsMap, volumeTypeOptions } from "../constants";
import { ModalButtons } from "components/pages/SignalRobotPage/Modals/ModalsButtons";
import { SubscribeModalContent } from "components/ui/Modals/SubscribeModal/SubscribeModalContent";
import { Input } from "components/ui/Modals/types";
import { useSubscribeModal } from "components/ui/Modals/SubscribeModal/useSubscribeModal";
import { AuthContext } from "providers/authContext";
import Router from "next/router";
import { RobotsType, RobotDataType } from "config/types";
import { useQueryWithAuth } from "hooks/useQueryWithAuth";

interface Props {
    actionType?: string;
    setTitle: (title: string) => void;
    onClose: (needsRefreshing?: boolean) => void;
    isOpen: boolean;
    type: RobotsType;
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
    //queries
    const { data: robotData } = useQuery<RobotDataType>(ROBOT(RobotsType.signals));

    const { name, code, id, subs } = robotData?.robot || {};
    const asset = robotData?.robot.subs.asset;

    const { data: limitsData, loading } = useQueryWithAuth(true, GET_MARKETS_SIGNALS, {
        variables: {
            exchange: !robotData ? null : subs.exchange,
            asset: !robotData ? null : asset,
            currency: !robotData ? null : subs.currency,
            user_id
        }
    });

    //utilities
    const limits = useMemo(() => !loading && limitsData && getLimitsForSignal(limitsData), [loading, limitsData]);

    const subscribeModalProps = useSubscribeModal({
        limits,
        inputs,
        robotData
    });

    const { inputValues, volumeType, errors, precision } = subscribeModalProps;

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
        setTitle(`${actionType === "edit" ? "Edit" : "Follow"} ${name}`);
    }, [setTitle, actionType, name]);

    //validation
    const enabled = !editLoading && !subscribeLoading;

    //handlers
    const onSubmit = async () => {
        const settings = buildSettings({ volumeType, inputValues, precision });
        const variables = {
            robotId: id,
            settings
        };
        if (actionType === "edit") {
            edit({ variables })
                .then((res) => {
                    if (res.data.userSignalEdit.result) {
                        // writeToCache(settings);
                        onClose(true);
                    }
                })
                .catch((e) => console.error(e));
        } else
            subscribe({ variables })
                .then((res) => {
                    if (res.data.userSignalSubscribe.result) {
                        // writeToCache(settings);
                        event({
                            action: "subscribe",
                            category: "Signals",
                            label: "subscribe",
                            value: id
                        });
                        onClose(true);
                        Router.push(`/signals${code ? `/robot/${code}` : ""}`);
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
                {...subscribeModalProps}
                volumeTypeOptions={volumeTypeOptions}
                inputs={inputs}
                robotData={robotData}
                onKeyPress={onKeyPress}
                enabled={enabled}
                formError={formError}
            />
        </Modal>
    );
};

export const SubscribeModal = memo(_SubscribeModal);
