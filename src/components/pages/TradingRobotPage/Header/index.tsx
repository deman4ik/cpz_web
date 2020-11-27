import React, { memo } from "react";

import { HeaderButton } from "./HeaderButton";
import { HeaderStatsSection } from "./HeaderStatsSection";
import { capitalize } from "config/utils";
import styles from "./styles/index.module.css";
import { MessageAlert } from "assets/icons/svg";
import { color } from "config/constants";

interface Props {
    robotData: any;
    subscribe: (variables: any) => void;
}

const _PageHeader: React.FC<Props> = ({ robotData, subscribe }) => {
    const { userRobot, robot } = robotData;

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.headerName}>
                    <div className={styles.robotNameWrapper}>
                        <div className={styles.robotName}>{robot.name}</div>
                    </div>
                    <HeaderButton subscribe={subscribe} robotData={robotData} />
                </div>
            </div>
            <HeaderStatsSection robotData={robotData} />

            {userRobot?.message && (
                <div className={styles.headerMessage}>
                    <MessageAlert color={color.negative} style={{ minWidth: 22 }} size={22} />
                    <div>{capitalize(userRobot.message || null)}</div>
                </div>
            )}
        </div>
    );
};

export const PageHeader = memo(_PageHeader);
