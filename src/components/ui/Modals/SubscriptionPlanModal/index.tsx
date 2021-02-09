/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import { useMutation } from "@apollo/client";
import { SET_USER_SUB } from "graphql/profile/mutations";
import { Button } from "components/basic";
import { LoadingIndicator, ErrorLine } from "components/common";
import { HTMLButtonTypes } from "components/basic/Button/types";

import styles from "./index.module.css";

interface Props {
    dataPicker: any; // Todo any
    selectedKey: string;
    enabled: boolean;
    variables: any; // Todo any
    formError?: string;
    handleOnNext: () => void;
    setFormError: (error: string) => void;
    onClose: (changesMade?: boolean) => void;
}

const _SubscriptionPlan: React.FC<Props> = ({ dataPicker, handleOnNext, setFormError, formError, enabled }) => {
    const { subscriptions, subscription_options } = dataPicker;

    const [createUserSub] = useMutation(SET_USER_SUB);

    const handleOnSubscription = ({ subscription_id, code }) => {
        createUserSub({
            variables: {
                subscriptionId: subscription_id,
                subscriptionOption: code
            }
        }).catch(({ message }) => {
            setFormError(message);
            setTimeout(() => handleOnNext(), 2000);
        });
    };

    return (
        <>
            <div className={styles.plan}>
                {enabled &&
                    subscription_options &&
                    subscription_options.map((item, index) => (
                        <div key={index} className={styles.planCard}>
                            <h3 className={styles.planName}>{item.name}</h3>
                            <p>
                                {item.amount} {item.unit}
                            </p>
                            <p>{subscriptions[0].description}</p>
                            <b className={styles.planPrice}>
                                $ {item.price_total.toFixed(1)}
                                {item.discount === null || `(-${item.discount} %)`}
                            </b>
                            <p>$ {item.price_month.toFixed(1)} per month</p>
                            <Button
                                buttonType={HTMLButtonTypes.button}
                                style={{ width: 140, margin: "0 auto" }}
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
            <ErrorLine formError={formError} style={{ margin: 0 }} />
        </>
    );
};

export const SubscriptionPlan = memo(_SubscriptionPlan);
