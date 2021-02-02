import React from "react";

import { PlanetIcon } from "assets/icons/svg";
import { PrimaryButton } from "components/basic";
import { PricingItemType } from "../types";
import styles from "./PricingItem.module.css";

interface Props {
    item: PricingItemType;
}

const components = {
    planet: PlanetIcon
};

export const PricingItem: React.FC<Props> = ({ item }) => {
    const SpecificIcon = components[item.icon];

    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.colBody}>
                    <div className={styles.iconWrapper}>
                        <PlanetIcon key={item.title} colors={item.iconColors} />
                    </div>
                    <div className={styles.colTitle}>{item.title}</div>
                    <div className={styles.colText}>{item.text}</div>
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
