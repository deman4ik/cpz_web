import React, { memo, useMemo } from "react";

import { HeaderButton } from "./HeaderButton";
import { HeaderStatsSection } from "./HeaderStatsSection";
import { Tooltip } from "components/ui/Tooltip";

import styles from "./styles/index.module.css";
import { formatMoney } from "config/utils";
import { color } from "config/constants";
import {
    activeDays,
    getDisplayedVolume,
    getProfit,
    getSubscriptionDuration
} from "components/pages/SignalRobotPage/helpers";

interface Props {
    robotData: any;
    width: number;
    subscribe: (variables: any) => void;
}

const _Header: React.FC<Props> = ({ robotData, subscribe, width }) => {
    const { robot } = robotData;

    const { isUserSubscribed } = robot;
    const profit = getProfit(robotData);

    const statsSectionConfig = useMemo(() => {
        const config = [
            {
                label: "Profit",
                value: `${formatMoney(profit)} $`,
                valueColor: profit > 0 ? color.positive : color.negative
            },
            { label: "Amount", value: getDisplayedVolume(robotData) },
            { label: "Active", value: activeDays(robotData) },
            { label: "Volume Type", value: robot.volumeType }
        ];
        if (isUserSubscribed) {
            config.push({ label: "Subscribed", value: getSubscriptionDuration(robotData) });
        }
        return config;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [robotData, isUserSubscribed]);

    return (
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
            <HeaderStatsSection config={statsSectionConfig} width={width} />
        </div>
    );
};

export const Header = memo(_Header);
