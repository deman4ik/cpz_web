import React from "react";

import { RobotIcon, ChartLineIcon, EmailIcon } from "assets/icons/svg";
import { Tooltip } from "components/ui/Tooltip";
import { CheckBox } from "components/basic";
import { color } from "config/constants";
import { capitalize } from "config/utils";
import styles from "./Notify.module.css";

interface Props {
    item: any;
    isLast: boolean;
    toggleNotification: (key: string, name: string) => void;
}
const components = {
    robot: RobotIcon,
    chartline: ChartLineIcon,
    news: EmailIcon
};

export const Notify: React.FC<Props> = ({ item, toggleNotification, isLast }) => {
    const SpecificIcon = components[item.icon] || components.robot;
    return (
        <>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div className={styles.titleRow}>
                        <SpecificIcon color={color.accent} size={24} />
                        <div className={styles.titleText}>{item.title}</div>
                        <div className={styles.toolTip}>
                            <Tooltip message={item.message} location={isLast ? "right" : "left"} direction="up" />
                        </div>
                    </div>
                    <div className={styles.checkboxGroup}>
                        {item.checkboxes.map(
                            (checkbox) =>
                                checkbox.name !== "email" && ( // TODO (back): implement email notifications
                                    <div className={styles.checkBoxWrapper} key={`${item.key}.${checkbox.name}`}>
                                        <CheckBox
                                            checked={checkbox.isActive}
                                            onClick={() => toggleNotification(item.key, checkbox.name)}
                                            label={capitalize(checkbox.name)}
                                            isLoading={checkbox.isLoading}
                                            disabled={checkbox.disabled}
                                        />
                                    </div>
                                )
                        )}
                    </div>
                </div>
            </div>
            {!isLast ? <div className={styles.separator} /> : null}
        </>
    );
};
