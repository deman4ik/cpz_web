import React, { useEffect, useRef, memo } from "react";
import { PrimaryButton } from "components/basic";
import { PricingItemType, PricingPlanItemType } from "../types";
import styles from "./PricingItem.module.css";

interface Props {
    item: PricingItemType;
    plan: PricingPlanItemType;
    title: string;
}

export const _PricingItem: React.FC<Props> = ({ item, plan, title }) => {
    const isActive = item && item.title === title;

    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const prevCount = usePrevious(plan.price_month);
    const isAdvancedPlan = item.title === "Advanced plan";

    return (
        <div className={styles.row}>
            <div className={`${styles.col} ${item.highlite && styles.colHighliteMore}`}>
                <div className={styles.colBody}>
                    <div className={styles.iconWrapper}>
                        <img src={item.icon} alt={item.title} />
                    </div>
                    <div className={styles.colTitle}>{item.title}</div>
                    <div
                        className={`${styles.colHighlite} ${isActive && styles.active}`}
                        style={{ borderColor: `${item.borderColor}` }}>
                        <div className={styles.colText}>{item.text}</div>
                    </div>
                    {item.price && (
                        <>
                            <p className={styles.colSubPrice}>{isAdvancedPlan && prevCount && `$ ${prevCount}`}</p>
                            <p className={styles.colPrice}>$ {isAdvancedPlan ? plan.price_month : item.price}</p>
                        </>
                    )}
                </div>
                <div className={styles.colFooter}>
                    <PrimaryButton
                        className={item.href ? styles.headerBtn : styles.headerBtnNoLink}
                        title={item.button}
                        type={item.buttonType}
                        href={item.href}
                        style={{ backgroundColor: `${item.buttonBackgroundColor}` }}
                    />
                </div>
            </div>
        </div>
    );
};

export const PricingItem = memo(_PricingItem);
