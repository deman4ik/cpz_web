import React, { memo } from "react";

import { HeaderButton } from "./HeaderButton";
import { HeaderStatsSection } from "./HeaderStatsSection";
import { Tooltip } from "components/ui/Tooltip";

import styles from "./styles/index.module.css";
import { HeaderTabs } from "./HeaderTabs";
import { TabType } from "config/types";

interface Props {
    robotData: any;
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    subscribe: (variables: any) => void;
    isUserSubscribed: boolean;
}

const _Header: React.FC<Props> = ({ robotData, activeTab, setActiveTab, subscribe, isUserSubscribed }) => {
    const { robot } = robotData;
    return (
        <>
            <div className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.headerName}>
                        <div className={styles.robotNameWrapper}>
                            <div className={styles.robotName}>{robot.name}</div>
                            <div className={styles.toolTip}>
                                <Tooltip message={robot.strategyByStrategy.description} direction="down" />
                            </div>
                        </div>
                        <HeaderButton subscribe={subscribe} robotData={robotData} />
                    </div>
                </div>
                <HeaderStatsSection robotData={robotData} />
                <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} isUserSubscribed={isUserSubscribed} />
            </div>
        </>
    );
};

export const Header = memo(_Header);
