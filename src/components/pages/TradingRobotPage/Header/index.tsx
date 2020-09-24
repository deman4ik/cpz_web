import React, { memo } from "react";

import { HeaderButton } from "./HeaderButton";
import { HeaderStatsSection } from "./HeaderStatsSection";
import { HeaderTabs } from "./HeaderTabs";
import { capitalize } from "config/utils";
import styles from "./styles/index.module.css";
import { TabType } from "config/types";

interface Props {
    robotData: any;
    activeTab: any;
    setActiveTab: (activeTab: TabType) => void;
    robotSubscribe: (variables: any) => void;
}

const _PageHeader: React.FC<Props> = ({ robotData, activeTab, setActiveTab, robotSubscribe }) => {
    const { userRobot, robot } = robotData;

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.headerName}>
                    <div className={styles.robotNameWrapper}>
                        <div className={styles.robotName}>{robot.name}</div>
                    </div>
                    <HeaderButton robotSubscribe={robotSubscribe} robotData={robotData} />
                </div>
                <div className={styles.headerMessage}>{capitalize(userRobot || null)}</div>
            </div>
            <HeaderStatsSection robotData={robotData} />
            <HeaderTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isOwnedByUser={robotData.robot.isOwnedByUser}
            />
        </div>
    );
};

export const PageHeader = memo(_PageHeader);
