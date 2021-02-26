/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, memo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SET_USER_SUB } from "graphql/profile/mutations";
import { GET_SUBSCRIPTIONS } from "graphql/profile/queries";
import { ButtonGroup } from "components/pages/LandingPage/Pricing/ButtonGroup";
import { LoadingIndicator, ErrorLine } from "components/common";
import { Button } from "components/basic";
import { HTMLButtonTypes } from "components/basic/Button/types";
import { getPriceTotalWithNoZero } from "config/utils.ts";
import styles from "./index.module.css";

interface Props {
    enabled: boolean;
    subsName?: string;
    handleOnNext?: () => void;
    handleOnClose?: () => void;
    handleOnClick?: (arg: any) => void;
    currentPlan?: {
        name: string;
    };
}

const _SubscriptionPlan: React.FC<Props> = ({ enabled, handleOnNext, handleOnClose, handleOnClick, currentPlan }) => {
    const { loading, data } = useQuery(GET_SUBSCRIPTIONS);
    const [createUserSub] = useMutation(SET_USER_SUB);

    const [formError, setFormError] = useState("");
    const [plan, setPlan] = useState<any>();
    const [periods, setPeriods] = useState();
    const [subsPlan, setSubscriptionPlan] = useState({ name: "", description: "" });
    const [buttonName, setButtonName] = useState("6 months");

    useEffect(() => {
        if (loading || !data) return;

        const { subscriptions } = data;
        const { options } = subscriptions[0];
        setSubscriptionPlan(subscriptions[0]);

        const optionsSorted = options.slice().sort((a, b) => a.sort_order - b.sort_order);
        setPeriods(optionsSorted);

        const [highlightedPlan] = options.filter((option) => option.highlight === true);

        if (currentPlan && currentPlan.name) {
            setButtonName(currentPlan.name);
            setPlan(currentPlan);
            return;
        }

        setButtonName(highlightedPlan.name);
        setPlan(optionsSorted[1]);
    }, [data]);

    const handleOnSubscriptionPlan = ({ subscription_id, code }) => {
        createUserSub({
            variables: {
                subscriptionId: subscription_id,
                subscriptionOption: code
            }
        })
            .then(({ data: subscribedPlan }) => {
                console.log(`subscribedPlan`, subscribedPlan);
                handleOnClick(plan, subscribedPlan);
                if (handleOnClose) handleOnClose();
                if (handleOnNext) setTimeout(() => handleOnNext(), 2000);
            })
            .catch(({ message }) => setFormError(message));
    };

    const handleOnButton = (card) => {
        setButtonName(card.name);
        setPlan(card);
    };

    return (
        <div className={styles.planContainer}>
            <h3 className={styles.planName}>{subsPlan.name}</h3>
            <div className={styles.buttonGroup}>
                {periods && (
                    <ButtonGroup
                        handleOnButton={handleOnButton}
                        options={periods}
                        buttonName={buttonName}
                        style={{ marginBottom: 0 }}
                    />
                )}
            </div>
            <div className={styles.plan}>
                {enabled && subsPlan && (
                    <div className={styles.planCard}>
                        <p className={styles.planDescription}>{subsPlan.description}</p>

                        {plan && (
                            <div className={styles.planPriceWrapper}>
                                <p className={styles.planPrice}>
                                    $ {getPriceTotalWithNoZero(plan.price_total)}
                                    <span className={styles.planDiscount}>
                                        {plan.discount === null || `(-${plan.discount} %)`}
                                    </span>
                                </p>
                                <p>$ {plan.price_month} per month</p>
                            </div>
                        )}
                    </div>
                )}
                <Button
                    buttonType={HTMLButtonTypes.button}
                    style={{ maxWidth: 140, margin: "0 auto" }}
                    title="Subscribe"
                    type="success"
                    size="normal"
                    width={260}
                    isUppercase
                    onClick={() => handleOnSubscriptionPlan(plan)}
                />
                {!enabled && <LoadingIndicator />}
            </div>
            <ErrorLine formError={formError} style={{ margin: 0 }} />
        </div>
    );
};

export const SubscriptionPlan = memo(_SubscriptionPlan);
