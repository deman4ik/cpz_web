import React, { memo, useState } from "react";

import { PricingItem } from "./PricingItem";
import { ButtonGroup } from "./ButtonGroup";
import { pricingContent } from "./helpres";
import styles from "./index.module.css";

const _Pricing = () => {
    const [buttonTitle, setButtonTitle] = useState("Trial period");

    const handleButton = (title) => {
        setButtonTitle(title);
    };

    return (
        <>
            <h2 className={styles.title}>Pricing</h2>
            <div className={styles.pricing}>
                <ButtonGroup
                    buttons={["1 month", "6 months", "1 year", "2 years"]}
                    handleButton={handleButton}
                    title={buttonTitle}
                />

                <div className={styles.grid}>
                    {pricingContent.map((item) => (
                        <PricingItem key={item.title} item={item} title={buttonTitle} />
                    ))}
                </div>
            </div>
        </>
    );
};

export const Pricing = memo(_Pricing);
