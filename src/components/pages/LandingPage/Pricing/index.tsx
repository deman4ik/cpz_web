import React, { memo, useState } from "react";
import { PricingItem } from "./PricingItem";
import { ButtonGroup } from "./ButtonGroup";
import { pricingContent, subscriptionPlan } from "./helper";
import styles from "./index.module.css";

const _Pricing = () => {
    const subsOptionsSorted = subscriptionPlan[0].options.slice().sort((a, b) => a.sort_order - b.sort_order);
    const [buttonTitle, setButtonTitle] = useState(subsOptionsSorted[1].name);
    const [plan, setPlan] = useState(subsOptionsSorted[1]);
    const handleButton = (item) => {
        setButtonTitle(item.name);
        setPlan(item);
    };

    return (
        <>
            <h2 className={styles.title}>Pricing</h2>
            <p className={styles.benefits}>
                {`Get access to all the available features at a single, affordable price.\nFree trial available after sign up.\nNo credit card required.`}
            </p>
            <div className={styles.pricing}>
                <p className={styles.billed}>Billed for</p>
                <ButtonGroup handleButton={handleButton} options={subsOptionsSorted} title={buttonTitle} />
                <div className={styles.grid}>
                    {pricingContent.map((item) => (
                        <PricingItem key={item.title} item={item} plan={plan} title={buttonTitle} />
                    ))}
                </div>
            </div>
        </>
    );
};

export const Pricing = memo(_Pricing);
