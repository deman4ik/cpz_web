import React, { memo } from "react";
import { PrimaryButton } from "components/basic";
import styles from "./PricingCard.module.css";

export const _PricingCard = ({ card, currentPlan, basePrice, buttonName }): any => {
    const isActive = card && card.name === buttonName;
    const isAdvancedPlan = card.highlite && card.name;
    const isOneMonth = currentPlan.name === "1 month";

    return (
        <div className={styles.row}>
            <div className={`${styles.col} ${card.highlite && styles.colHighliteMore}`}>
                <div className={styles.colBody}>
                    <div className={styles.iconWrapper}>
                        <img src={card.icon} alt={card.card} />
                    </div>
                    <div className={styles.colTitle}>{card.name}</div>
                    <div
                        className={`${styles.colHighlite} ${isActive && styles.active}`}
                        style={{ borderColor: `${card.borderColor}` }}>
                        <div className={styles.colText}>{card.text}</div>
                    </div>
                    <div className={styles.colPriceWrapper}>
                        {card.price && (
                            <>
                                {isAdvancedPlan && !isOneMonth && <p className={styles.colSubPrice}>${basePrice}</p>}
                                <p className={styles.colPrice}>
                                    $ {isAdvancedPlan ? currentPlan.price_month : card.price}
                                </p>
                                <p className={styles.colPricePerMonth}>per month</p>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.colFooter}>
                    <PrimaryButton
                        className={card.href ? styles.headerBtn : styles.headerBtnNoLink}
                        title={card.buttonName}
                        type={card.buttonType}
                        href={card.href}
                        style={{ backgroundColor: `${card.buttonBackgroundColor}` }}
                    />
                </div>
            </div>
        </div>
    );
};

export const PricingCard = memo(_PricingCard);
