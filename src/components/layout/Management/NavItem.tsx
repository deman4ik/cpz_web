import React, { memo } from "react";

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
    MessageAlert,
    MenuIcon,
    BackBurger,
    DeadLetter,
    AlertCircle
} from "assets/icons/svg";
import { NotificationCounter } from "components/ui/NotificationCounter";
import { PageType } from "config/types";

interface Props {
    item: any;
    active: boolean;
    handleOnClick: (path: string, external: boolean) => void;
    styles: any;
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
    managementSupport: MessageAlert,
    menu: MenuIcon,
    backBurger: BackBurger,
    deadLetter: DeadLetter,
    error: AlertCircle
};

const _NavItem: React.FC<Props> = ({ item, active, handleOnClick, styles }) => {
    const SpecificIcon = components[item.icon];

    const handleOnClickLink = () => {
        handleOnClick(item.route ? item.route : item.href, !item.route);
    };

    return (
        <div className={styles.itemWrapper}>
            <div className={`${styles.item} ${active ? ` ${styles.activeItem}` : ""}`} onClick={handleOnClickLink}>
                <div
                    style={{
                        height: 24,
                        width: 24
                    }}>
                    <SpecificIcon color={active ? "white" : "rgba(255, 255, 255, 0.68)"} width={24} height={24} />
                </div>
                {item.label === PageType.notifications && <NotificationCounter />}
                <div className={styles.itemLabel}>
                    <div className={`${styles.itemText}`}>{item.label}</div>
                </div>
            </div>
        </div>
    );
};

export const NavItem = memo(_NavItem);
