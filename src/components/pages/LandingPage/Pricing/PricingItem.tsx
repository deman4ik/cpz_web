import React from "react";
import { PrimaryButton } from "components/basic";
import { PricingItemType } from "../types";
import styles from "./PricingItem.module.css";

interface Props {
    item: PricingItemType;
    title: string;
}

export const PricingItem: React.FC<Props> = ({ item, title }) => {
    const isActive = item && item.title === title;
    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.colBody}>
                    <div className={styles.iconWrapper}>
                        <img src={item.icon} alt={item.title} />
                    </div>
                    <div className={styles.colTitle}>{item.title}</div>
                    <div className={`${styles.colHighlite} ${isActive && styles.active}`}>
                        <div className={styles.colText}>{item.text}</div>
                    </div>
                    <p className={styles.colPrice}>$ {item.price}</p>
                    <p className={styles.colSubPrice}>save $ {item.savePrice}</p>
                </div>
                <div className={styles.colFooter}>
                    <PrimaryButton
                        className={styles.headerBtn}
                        title={item.button}
                        type={item.buttonType}
                        href={item.href}
                    />
                </div>
            </div>
        </div>
    );
};
