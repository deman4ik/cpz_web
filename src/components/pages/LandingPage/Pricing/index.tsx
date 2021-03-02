import React, { memo, useState } from "react";
import { PricingCard } from "./PricingCard";
import { ButtonGroup } from "./ButtonGroup";
import { pricingContent, subscriptionPlan } from "./helper";
import styles from "./index.module.css";

const optionsSorted = subscriptionPlan[0].options.slice().sort((a, b) => a.sort_order - b.sort_order);

const _Pricing = () => {
    const PLAN_NAMES = { "1 month": 0, "6 months": 1 };
    const [buttonName, setButtonName] = useState(optionsSorted[PLAN_NAMES["6 months"]].name);
    const [currentPlan, setCurrentPlan] = useState(optionsSorted[PLAN_NAMES["6 months"]]);
    const basePrice = optionsSorted[PLAN_NAMES["1 month"]].price_month;

    const handleOnButton = (card) => {
        setButtonName(card.name);
        setCurrentPlan(card);
    };

    return (
        <div className={styles.pricing}>
            <h2 className={styles.title}>Plans &amp; pricing</h2>
            <p className={styles.benefits}>
                {`Get access to all the available features at a single, affordable price.\nFree trial available after sign up.\nNo credit card required.`}
            </p>
            <div className={styles.billedContainer}>
                <p className={styles.billed}>Billed for</p>
                <ButtonGroup
                    handleOnButton={handleOnButton}
                    options={optionsSorted}
                    free
                    buttonName={buttonName}
                    style={{ fontSize: 18 }}
                />
            </div>
            <div className={styles.grid}>
                {pricingContent.map((card) => (
                    <PricingCard
                        key={card.name}
                        card={card}
                        currentPlan={currentPlan}
                        basePrice={basePrice}
                        buttonName={buttonName}
                    />
                ))}
            </div>
        </div>
    );
};

export const Pricing = memo(_Pricing);
