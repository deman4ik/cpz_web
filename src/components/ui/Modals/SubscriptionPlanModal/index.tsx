/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, memo, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Button } from "components/basic";
import styles from "../index.module.css";
import { LoadingIndicator } from "components/common";
import { HTMLButtonTypes } from "components/basic/Button/types";
import gql from "graphql-tag";

interface Props {
    dataPicker: any; // Todo any
    selectedKey: string;
    enabled: boolean;
    variables: any; // Todo any
    hasError?: boolean;
    handleOnNext: () => void;
    setFormError: (error: string) => void;
    onClose: (changesMade?: boolean) => void;
}

const _SubscriptionPlan: React.FC<Props> = ({ dataPicker, handleOnNext, enabled }) => {
    const { subscriptions, subscription_options } = dataPicker;

    const USER_SUB = gql`
        mutation createUserSub($subscriptionId: uuid!, $subscriptionOption: String!) {
            createUserSub(subscriptionId: $subscriptionId, subscriptionOption: $subscriptionOption) {
                result
            }
        }
    `;

    const [createUserSub, { loading }] = useMutation(USER_SUB);

    const handleOnSubscription = ({ subscription_id, code }) => {
        createUserSub({
            variables: {
                subscriptionId: subscription_id,
                subscriptionOption: code
            }
        }).catch((error) => {
            handleOnNext();
            console.error(error);
        });
    };

    return (
        <div style={{ display: "flex" }}>
            {enabled &&
                subscription_options &&
                subscription_options.map((item, index) => (
                    <div key={index} style={{ color: "white", width: 180, padding: "0 10px", textAlign: "center" }}>
                        <h3 style={{ textTransform: "uppercase" }}>{item.name}</h3>
                        <p>{subscriptions[0].description}</p>
                        <b style={{ fontSize: 24 }}>
                            $ {item.price_total.toFixed(1)} (-{item.discount}%)
                        </b>
                        <p>$ {item.price_month.toFixed(1)} per month</p>
                        <Button
                            buttonType={HTMLButtonTypes.button}
                            style={{ width: 140, marginLeft: 10 }}
                            title="Subscribe"
                            type={`${item.sort_order === 1 ? "success" : "primary"}`}
                            size="small"
                            width={260}
                            isUppercase
                            onClick={() => handleOnSubscription(item)}
                        />
                    </div>
                ))}
            {!enabled && <LoadingIndicator />}
        </div>
    );
};

export const SubscriptionPlan = memo(_SubscriptionPlan);
