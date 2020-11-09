import React, { memo } from "react";

import { HeaderButton } from "./HeaderButton";
import { HeaderStatsSection } from "./HeaderStatsSection";
import { Tooltip } from "components/ui/Tooltip";

import styles from "./styles/index.module.css";

interface Props {
    robotData: any;
    subscribe: (variables: any) => void;
}

const _Header: React.FC<Props> = ({ robotData, subscribe }) => {
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
            </div>
        </>
    );
};

export const Header = memo(_Header);
