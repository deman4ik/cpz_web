import React, { memo } from "react";
import dynamic from "next/dynamic";

import { PrimaryButton } from "components/basic";
import { moneyFormat, valueWithSign } from "config/utils";
import styles from "./SignalsListCard.module.css";

interface Props {
    robot: any;
}

const DinamicAreaChart = dynamic(() => import("components/charts/AreaChart"));

const _SignalsListCard: React.FC<Props> = ({ robot }) => {
    const money = <div className={styles.primaryText}>{moneyFormat(robot.equity.profit)} $</div>;

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
                            <div className={styles.label}>
                                {robot.robot_settings.volume} {robot.asset}
                            </div>
                        </div>
                        <span className={styles.mobile}>{money}</span>
                        <div
                            className={`${styles.lastProfit} ${
                                robot.equity.lastProfit < 0 ? styles.negative : styles.positive
                            }`}>
                            {valueWithSign(moneyFormat(robot.equity.lastProfit))} $
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.chartStat}>
                <div className={styles.chartCol}>
                    {robot.equity.changes && (
                        <DinamicAreaChart height={120} positive={robot.equity.profit > 0} data={robot.equity.changes} />
                    )}
                </div>
                <div className={styles.statCol}>
                    <div className={styles.statRow}>
                        <div className={styles.label}>Win Rate</div>
                        <div className={styles.statValue}>{Math.round(robot.statistics.winRate.all)} %</div>
                    </div>
                    <div className={styles.statRow}>
                        <div className={styles.label}>Max Drawdown</div>
                        <div className={styles.statValue}>{moneyFormat(robot.statistics.maxDrawdown.all)} $</div>
                    </div>
                    <div className={styles.statRow}>
                        <div className={styles.label}>Trades Count</div>
                        <div className={styles.statValue}>{robot.statistics.tradesCount.all}</div>
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
