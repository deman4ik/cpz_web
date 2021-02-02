import React, { FC, memo } from "react";

import { PricingItem } from "./PricingItem";
import { pricingContent } from "../helpers";
import styles from "./index.module.css";

export const Pricing: FC = () => (
    <>
        <h2 className={styles.title}>Pricing</h2>
        <div className={styles.support}>
            <div className={styles.grid}>
                {pricingContent.map((item) => (
                    <PricingItem key={item.title} item={item} />
                ))}
            </div>
        </div>
    </>
);
