import React, { memo } from "react";
import dynamic from "next/dynamic";

import { PrimaryButton } from "components/basic";
import { getStats, formatMoney, valueWithSign, getVolumeWithUnit } from "config/utils";
import styles from "./SignalsListCard.module.css";

interface Props {
    robot: any;
}

const DynamicAreaChart = dynamic(() => import("components/charts/AreaChart"));

// TODO: extract robot deconstruction
const _SignalsListCard: React.FC<Props> = ({ robot }) => {
    const { robot_settings, currency, asset } = robot;
    const { equity, profit, winRate, maxDrawdown, tradesCount } = getStats(robot);
    const money = <div className={styles.primaryText}>{formatMoney(profit)} $</div>;
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.row}>
                    <div className={styles.nameCol}>
                        <div className={styles.primaryText}>{robot.name}</div>
                        <span className={styles.wide}>{money}</span>
                    </div>
                    <div className={`${styles.numberCol} ${styles.profitCol}`}>
                        <div className={styles.secondaryText}>
                            <div className={styles.label}>{getVolumeWithUnit(robot_settings, { currency, asset })}</div>
                        </div>
                        <span className={styles.mobile}>{money}</span>
                    </div>
                </div>
            </div>
            <div className={styles.chartStat}>
                <div className={styles.chartCol}>{equity && <DynamicAreaChart height={120} data={equity} />}</div>
                <div className={styles.statCol}>
                    <div className={styles.statRow}>
                        <div className={styles.label}>Win Rate</div>
                        <div className={styles.statValue}>{Math.round(winRate)} %</div>
                    </div>
                    <div className={styles.statRow}>
                        <div className={styles.label}>Max Drawdown</div>
                        <div className={styles.statValue}>{formatMoney(maxDrawdown)} $</div>
                    </div>
                    <div className={styles.statRow}>
                        <div className={styles.label}>Trades Count</div>
                        <div className={styles.statValue}>{tradesCount}</div>
                    </div>
                </div>
            </div>
            <div className={styles.btns}>
                {robot.signals && (
                    <PrimaryButton
                        type="primary"
                        title="Subscribe to Signals"
                        href={`/signals/robot/${robot.code}`}
                        mini
                    />
                )}
                {robot.trading && (
                    <PrimaryButton
                        type="secondary"
                        title="Start Trading"
                        href={`/robots/robot/${robot.code}`}
                        className={styles.btn}
                        mini
                    />
                )}
            </div>
        </div>
    );
};

export const SignalsListCard = memo(_SignalsListCard);
