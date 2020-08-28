import React from "react";

import { RobotIcon, AssignmentIcon, MultiLineChartIcon, NotificationsIcon, HelpIcon } from "assets/icons/svg";
import { NotificationCounter } from "../ui/NotificationCounter";
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
    help: HelpIcon
};

export const MainMenuItemMobile: React.FC<Props> = ({ item, active, handleOnClick }) => {
    const SpecificIcon = components[item.icon];

    const handleOnClickLink = () => {
        handleOnClick(item.route, false);
    };

    return (
        <div className={styles.mainMenuItemWrapper}>
            <div className={styles.mainMenuItem} onClick={handleOnClickLink}>
                <i style={{ backgroundSize: 28 }}>
                    <SpecificIcon color={active ? "#fff" : "rgba(255, 255, 255, 0.68)"} size={28} />
                </i>
                {item.label === PageType.notifications && <NotificationCounter />}
            </div>
        </div>
    );
};
