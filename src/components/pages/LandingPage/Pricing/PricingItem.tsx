import React from "react";
import { PlanetIcon } from "assets/icons/svg";
import { PrimaryButton } from "components/basic";
import { PricingItemType } from "../types";
import styles from "./PricingItem.module.css";

interface Props {
    item: PricingItemType;
    title: string;
}

const components = {
    planet: PlanetIcon
};

export const PricingItem: React.FC<Props> = ({ item, title }) => {
    const SpecificIcon = components[item.icon];
    const isActive = item && item.title === title;

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.colBody}>
                    <div className={styles.iconWrapper}>
                        <SpecificIcon key={item.title} colors={item.iconColors} />
                    </div>
                    <div className={styles.colTitle}>{item.title}</div>
                    <div className={`${styles.colHighlite} ${isActive && styles.active}`}>
                        <div className={styles.colText}>{item.text}</div>
                    </div>
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
