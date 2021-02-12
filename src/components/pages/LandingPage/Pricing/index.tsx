import React, { memo, useState } from "react";
import { PricingItem } from "./PricingItem";
import { ButtonGroup } from "./ButtonGroup";
import { pricingContent } from "./helper";
import styles from "./index.module.css";

const _Pricing = () => {
    const [buttonTitle, setButtonTitle] = useState("1 month");
    const handleOnButton = ({ textContent }) => setButtonTitle(textContent);

    return (
        <>
            <h2 className={styles.title}>Pricing</h2>
            <div className={styles.pricing}>
                <ButtonGroup handleOnButton={handleOnButton} title={buttonTitle} />
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
