/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SET_USER_SUB } from "graphql/profile/mutations";
import { GET_SUBSCRIPTIONS } from "graphql/profile/queries";
import { ButtonPrice } from "components/pages/LandingPage/Pricing/ButtonPrice";
import { LoadingIndicator, ErrorLine } from "components/common";
import { Button } from "components/basic";
import { HTMLButtonTypes } from "components/basic/Button/types";
import { getPriceTotalWithNoZero } from "config/utils.ts";
import styles from "./index.module.css";

interface Props {
    enabled: boolean;
    subsName?: boolean;
    handleOnNext?: () => void;
    handleOnClose?: () => void;
    currentPlan?: string;
}

const _SubscriptionPlan: React.FC<Props> = ({ enabled, handleOnNext, handleOnClose, currentPlan }) => {
    const [formError, setFormError] = useState("");
    const { data } = useQuery(GET_SUBSCRIPTIONS);
    const [plan, setPlan] = useState<any>();
    const [planActive, setPlanActive] = useState("");
    const [periods, setPeriods] = useState([]);
    const [subsPlan, setSubscriptionPlan] = useState({ name: "", description: "" });

    useEffect(() => {
        if (!data) return;

        const { subscriptions, subscription_options } = data;
        setSubscriptionPlan(subscriptions[0]);

        const subsOptionsSorted = subscription_options.slice().sort((a, b) => a.sort_order - b.sort_order);
        setPlan(subsOptionsSorted[1]);
        setPeriods(subsOptionsSorted);

        const [highlightedPlan] = subscription_options.filter((option) => option.highlight === true);
        setPlanActive(highlightedPlan.name);
    }, [data]);

    const [createUserSub] = useMutation(SET_USER_SUB);

    const handleOnSubscriptionPlan = ({ subscription_id, code }) => {
        createUserSub({
            variables: {
                subscriptionId: subscription_id,
                subscriptionOption: code
            }
        })
            .then(({ data: subscribedPlan }) => {
                console.log(subscribedPlan);
                if (handleOnClose) handleOnClose();
                if (handleOnNext) setTimeout(() => handleOnNext(), 2000);
            })
            .catch(({ message }) => setFormError(message));
    };

    const handleOnButton = (card) => {
        setPlanActive(card.name);
        setPlan(card);
    };

    return (
        <div className={styles.planContainer}>
            <h3 className={styles.planName}>{subsPlan.name}</h3>
            <div className={styles.buttonGroup}>
                {periods.map((period) => (
                    <ButtonPrice
                        key={period.name}
                        title={period.name}
                        classActive={period.name === planActive}
                        plan={period}
                        handleOnButton={handleOnButton}
                    />
                ))}
            </div>
            <div className={styles.plan}>
                {enabled && subsPlan && (
                    <div className={styles.planCard}>
                        <p className={styles.planDescription}>{subsPlan.description}</p>

                        {plan && (
                            <>
                                <b className={styles.planPrice}>
                                    $ {getPriceTotalWithNoZero(plan.price_total)}&nbsp;
                                    {plan.discount === null || `(-${plan.discount} %)`}
                                </b>
                                <p>
                                    $ {plan.price_month} per {plan.unit}
                                </p>
                            </>
                        )}

                        <Button
                            buttonType={HTMLButtonTypes.button}
                            style={{ width: 140, margin: "0 auto" }}
                            title="Subscribe"
                            type="success"
                            size="small"
                            width={260}
                            isUppercase
                            onClick={() => handleOnSubscriptionPlan(plan)}
                        />
                    </div>
                )}
                {!enabled && <LoadingIndicator />}
            </div>
            <ErrorLine formError={formError} style={{ margin: 0 }} />
        </div>
    );
};

export const SubscriptionPlan = memo(_SubscriptionPlan);
