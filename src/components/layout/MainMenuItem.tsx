/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { memo } from "react";

import {
    RobotIcon,
    AssignmentIcon,
    MultiLineChartIcon,
    NotificationsIcon,
    HelpIcon,
    TelegramIcon
} from "assets/icons/svg";
import { NotificationCounter } from "components/ui/NotificationCounter";
import { PageType } from "config/types";
import styles from "./MainMenu.module.css";

interface Props {
    item: any;
    active: boolean;
    handleOnClick: (path: string, external: boolean) => void;
}

const components = {
    robot: RobotIcon,
    signals: MultiLineChartIcon,
    notifications: NotificationsIcon,
    profile: AssignmentIcon,
    help: HelpIcon,
    telegram: TelegramIcon
};

const _MainMenuItem: React.FC<Props> = ({ item, active, handleOnClick }) => {
    const styleText = [styles.mainMenuItemText, active ? styles.menuActive : styles.menuInactive];
    const SpecificIcon = components[item.icon];

    const handleOnClickLink = () => {
        handleOnClick(item.route ? item.route : item.href, !item.route);
    };

    return (
        <div className={styles.mainMenuItemWrapper}>
            <div
                className={`${styles.mainMenuItem}${active ? ` ${styles.menuItemActive}` : ""}`}
                onClick={handleOnClickLink}>
                <SpecificIcon color={active ? "white" : "rgba(255, 255, 255, 0.68)"} />
                {item.label === PageType.notifications && <NotificationCounter />}
                <div className={styles.itemLabel}>
                    <div className={styleText.join(" ")}>{item.label}</div>
                </div>
            </div>
        </div>
    );
};

export const MainMenuItem = memo(_MainMenuItem);
