import React, { memo } from "react";

import { HeaderButton } from "./HeaderButton";
import { HeaderStatsSection } from "./HeaderStatsSection";
import { capitalize } from "config/utils";
import styles from "./styles/index.module.css";

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
                <div className={styles.headerMessage}>{capitalize(userRobot || null)}</div>
            </div>
            <HeaderStatsSection robotData={robotData} />
        </div>
    );
};

export const PageHeader = memo(_PageHeader);
