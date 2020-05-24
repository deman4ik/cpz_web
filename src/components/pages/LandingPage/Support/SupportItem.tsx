import React from "react";

import { RobotIcon, LiveHelpIcon, TelegramIcon } from "../../../../assets/icons/svg";
import { PrimaryButton } from "../../../basic";
import { SupportItemType } from "../types";
import styles from "./SupportItem.module.css";

interface Props {
    item: SupportItemType;
}

const components = {
    robot: RobotIcon,
    help: LiveHelpIcon,
    telegram: TelegramIcon
};

export const SupportItem: React.FC<Props> = ({ item }) => {
    const SpecificIcon = components[item.icon];
    return (
        <div className={styles.row}>
            <div className={styles.col}>
                <div className={styles.colBody}>
                    <div className={styles.iconWrapper}>
                        <SpecificIcon color={item.iconColor} size={70} />
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
