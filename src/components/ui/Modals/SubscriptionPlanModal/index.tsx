/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState, memo } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { SET_USER_SUB } from "graphql/profile/mutations";
import { GET_SUBSCRIPTIONS } from "graphql/profile/queries";
import { ButtonPrice } from "components/pages/LandingPage/Pricing/ButtonPrice";
import { LoadingIndicator, ErrorLine } from "components/common";
import { Button } from "components/basic";
import { HTMLButtonTypes } from "components/basic/Button/types";

import styles from "./index.module.css";

interface Props {
    enabled: boolean;
    subsName?: boolean;
    handleOnNext?: () => void;
    handleOnClose?: () => void;
}

const _SubscriptionPlan: React.FC<Props> = ({ enabled, handleOnNext, handleOnClose }) => {
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

    const subscriptionOptionsSorted =
        subscription_options && subscription_options.slice().sort((a, b) => a.sort_order - b.sort_order);

    const [subName, setSubName] = useState("1 month");
    const [subPlan, setPlan] = useState({
        price_total: 0,
        discount: 0,
        price_month: 0,
        name: "",
        subscription_id: "",
        code: "",
        unit: "",
        highlight: false
    });
    const handleOnButton = (card) => {
        console.log(card.highlight);
        setSubName(card.name);
        setPlan(card);
    };

    // console.log(`userSubs`, userSubs);

    return (
        <div className={styles.planContainer}>
            <h3 className={styles.planName}>{subscriptions && subscriptions[0].name}</h3>
            <div className={styles.buttonGroup}>
                {subscriptionOptionsSorted &&
                    subscriptionOptionsSorted.map((plan) => (
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
                {enabled && subscriptionOptionsSorted && (
                    <div className={styles.planCard}>
                        {/* <PrimaryButton
                                // className={styles.headerBtn}
                                title={item.name}
                                type={planColors[index]}
                                href="#"
                            /> */}
                        {/* <p>
                                {item.amount} {item.unit}
                            </p> */}
                        <p>{subscriptions[0].description}</p>
                        <b className={styles.planPrice}>
                            $ {subPlan.price_total}&nbsp;
                            {subPlan.discount === null || `(-${subPlan.discount} %)`}
                        </b>
                        <p>
                            $ {subPlan.price_month} per {subPlan.unit}
                        </p>
                        <Button
                            buttonType={HTMLButtonTypes.button}
                            style={{ width: 140, margin: "0 auto" }}
                            title="Subscribe"
                            type="success"
                            size="small"
                            width={260}
                            isUppercase
                            disabled={subPlan.highlight}
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
