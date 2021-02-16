/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, memo } from "react";
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
    const { data: dataSubs, loading: dataLoading } = useQuery(GET_SUBSCRIPTIONS);
    const { subscriptions, subscription_options } = useMemo(() => (!dataLoading && dataSubs ? dataSubs : []), [
        dataLoading,
        dataSubs
    ]);

    const [createUserSub] = useMutation(SET_USER_SUB);

    const handleOnSubscription = ({ subscription_id, code }) => {
        createUserSub({
            variables: {
                subscriptionId: subscription_id,
                subscriptionOption: code
            }
        })
            .then(() => {
                if (handleOnClose) handleOnClose();
                if (handleOnNext) setTimeout(() => handleOnNext(), 2000);
            })
            .catch(({ message }) => setFormError(message));
    };

    const subsOptionsSorted =
        subscription_options && subscription_options.slice().sort((a, b) => a.sort_order - b.sort_order);

    const [subsActivePlan] =
        subscription_options && subscription_options.filter((option) => option.name === currentPlan);

    const [subsHighlightedPlan] =
        subscription_options && subscription_options.filter((option) => option.highlight === true);

    const [subName, setSubName] = useState(currentPlan || subsHighlightedPlan.name);
    const [subPlan, setPlan] = useState(subsActivePlan);
    const handleOnButton = (card) => {
        setSubName(card.name);
        setPlan(card);
    };

    return (
        <div className={styles.planContainer}>
            <h3 className={styles.planName}>{subscriptions && subscriptions[0].name}</h3>
            <div className={styles.buttonGroup}>
                {subsOptionsSorted &&
                    subsOptionsSorted.map((plan) => (
                        <ButtonPrice
                            key={plan.name}
                            title={plan.name}
                            classActive={plan.name === subName}
                            plan={plan}
                            handleOnButton={handleOnButton}
                        />
                    ))}
            </div>
            <div className={styles.plan}>
                {enabled && subsOptionsSorted && (
                    <div className={styles.planCard}>
                        <p className={styles.planDescription}>{subscriptions[0].description}</p>
                        {subPlan && (
                            <>
                                <b className={styles.planPrice}>
                                    $ {getPriceTotalWithNoZero(subPlan.price_total)}&nbsp;
                                    {subPlan.discount === null || `(-${subPlan.discount} %)`}
                                </b>
                                <p>
                                    $ {subPlan.price_month} per {subPlan.unit}
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
                            // disabled={status && subPlan.highlight}
                            onClick={() => handleOnSubscription(subPlan)}
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
