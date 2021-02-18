import React, { memo } from "react";
import { PrimaryButton } from "components/basic";
import { PricingItemType, PricingPlanItemType } from "../types";
import styles from "./PricingCard.module.css";

interface Props {
    item: PricingItemType;
    plan: PricingPlanItemType;
    defaultPrice: string;
    title: string;
}

export const _PricingCard: React.FC<Props> = ({ item, plan, defaultPrice, title }) => {
    const isActive = item && item.title === title;

    const isAdvancedPlan = item.title === "Advanced plan";
    const isOneMonth = plan.name === "1 month";

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
                    <div className={styles.colPriceWrapper}>
                        {item.price && (
                            <>
                                {isAdvancedPlan && !isOneMonth && <p className={styles.colSubPrice}>${defaultPrice}</p>}
                                <p className={styles.colPrice}>$ {isAdvancedPlan ? plan.price_month : item.price}</p>
                                <p className={styles.colPricePerMonth}>per month</p>
                            </>
                        )}
                    </div>
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

export const PricingCard = memo(_PricingCard);
