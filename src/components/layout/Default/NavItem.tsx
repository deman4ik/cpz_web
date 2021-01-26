import React, { memo } from "react";
import Link from "next/link";

import {
    RobotIcon,
    AssignmentIcon,
    MultiLineChartIcon,
    NotificationsIcon,
    HelpIcon,
    TelegramIcon,
    DashBoard,
    Users,
    ListBulleted,
    AccountStar,
    AccountDetails,
    MessageAlert
} from "assets/icons/svg";
import { NotificationCounter } from "components/ui/NotificationCounter";
import { PageType } from "config/types";

import styles from "./styles/NavBar.module.css";

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
    telegram: TelegramIcon,
    dashboard: DashBoard,
    users: Users,
    manageRobots: ListBulleted,
    userSignals: AccountStar,
    userRobots: AccountDetails,
    managementSupport: MessageAlert
};

const _NavItem: React.FC<Props> = ({ item, active, handleOnClick }) => {
    const SpecificIcon = components[item.icon];

    const handleOnClickLink = () => {
        handleOnClick(item.route ? item.route : item.href, !item.route);
    };

    const path = item.route ? `/${item.route}` : item.href;

    return (
        <div className={styles.itemWrapper}>
            {item && item.route ? (
                <Link href={path}>
                    <a>
                        <div
                            className={`${styles.item}${active ? ` ${styles.activeItem}` : ""}`}
                            onClick={handleOnClickLink}>
                            <SpecificIcon
                                color={active ? "white" : "rgba(255, 255, 255, 0.68)"}
                                width={24}
                                height={24}
                            />
                            {item.label === PageType.notifications && <NotificationCounter />}
                            <div className={styles.itemLabel}>
                                <div className={styles.itemText}>{item.label}</div>
                            </div>
                        </div>
                    </a>
                </Link>
            ) : (
                <a href={path}>
                    <div
                        className={`${styles.item}${active ? ` ${styles.activeItem}` : ""}`}
                        onClick={handleOnClickLink}>
                        <SpecificIcon color={active ? "white" : "rgba(255, 255, 255, 0.68)"} width={24} height={24} />
                        {item.label === PageType.notifications && <NotificationCounter />}
                        <div className={styles.itemLabel}>
                            <div className={styles.itemText}>{item.label}</div>
                        </div>
                    </div>
                </a>
            )}
        </div>
    );
};

export const NavItem = memo(_NavItem);
