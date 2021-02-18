import React, { memo, useState, useEffect } from "react";
import { PricingCard } from "./PricingCard";
import { ButtonGroup } from "./ButtonGroup";
import { usePricing } from "./usePricing";
import { pricingContent } from "./helper";
import styles from "./index.module.css";

const _Pricing = () => {
    const { options } = usePricing();

    const [buttonTitle, setButtonTitle] = useState("");
    const [buttonPeriods, setButtonPeriods] = useState([{ name: "", unit: "", free: "" }]);
    const [defaultPrice, setDefaultPrice] = useState("");
    const [subsPlans, setSubsPlans] = useState({ name: "", price_month: "", free_month: "" });

    useEffect(() => {
        if (!options || !options.length) return;

        const optionsSorted = options.slice().sort((a, b) => a.sort_order - b.sort_order);
        setButtonTitle(optionsSorted[1].name);
        setSubsPlans(optionsSorted[1]);
        setDefaultPrice(optionsSorted[0].price_month);
        setButtonPeriods(optionsSorted);
    }, [options]);

    const handleButton = (item) => {
        setButtonTitle(item.name);
        setSubsPlans(item);
    };

    return (
        <>
            <h2 className={styles.title}>Pricing</h2>
            <p className={styles.benefits}>
                {`Get access to all the available features at a single, affordable price.\nFree trial available after sign up.\nNo credit card required.`}
            </p>
            <div className={styles.pricing}>
                <p className={styles.billed}>Billed for</p>
                <ButtonGroup handleButton={handleButton} options={buttonPeriods} title={buttonTitle} />
                <div className={styles.grid}>
                    {pricingContent.map((item) => (
                        <PricingCard
                            key={item.title}
                            item={item}
                            plan={subsPlans}
                            defaultPrice={defaultPrice}
                            title={buttonTitle}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export const Pricing = memo(_Pricing);
