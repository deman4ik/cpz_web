import React from "react";
import dynamic from "next/dynamic";

import { Button } from "components/basic";
import { formatMoney, colorAction } from "config/utils";
import styles from "./PerformanceItemCard.module.css";

interface Props {
    item: any;
    onRedirectToDetailView: (path: string) => void;
}

const DynamicAreaChart = dynamic(() => import("../../charts/AreaChart"));

export const PerformanceItemCard: React.FC<Props> = ({ item, onRedirectToDetailView }) => {
    const handleOnPress = () => {
        onRedirectToDetailView(item.path);
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerCard}>
                <div className={styles.row} onClick={handleOnPress}>
                    <div className={styles.col}>
                        <div className={styles.statValue} style={{ marginBottom: 5 }}>
                            {item.name}
                        </div>
                        {item.profit ? (
                            <div className={styles.primaryText} style={colorAction(item.profit > 0)}>
                                {`${item.profit > 0 ? "+" : ""}${formatMoney(item.profit)} $`}
                            </div>
                        ) : null}
                    </div>
                    <div className={styles.col}>
                        <Button
                            title="details"
                            isUppercase
                            size="small"
                            style={{ paddingLeft: 0, paddingRight: 0 }}
                            icon="chevronright"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.chartStat}>
                <div className={styles.chartCol}>
                    {item?.equity?.length ? (
                        <DynamicAreaChart height={120} data={item.equity} />
                    ) : (
                        <div className={styles.emptyChart} />
                    )}
                </div>
                <div className={styles.statCol}>
                    {item.winRate || item.winRate === 0 ? (
                        <>
                            <div className={styles.statRow}>
                                <div className={styles.label}>Win Rate</div>
                                <div className={styles.statValue}>{item.winRate} %</div>
                            </div>
                            <div className={styles.statRow}>
                                <div className={styles.label}>Max Drawdown</div>
                                <div className={styles.primaryText} style={colorAction(item.maxDrawdown > 0)}>
                                    {`${formatMoney(item.maxDrawdown)} $`}
                                </div>
                            </div>
                            <div className={styles.statRow}>
                                <div className={styles.label}>Trades Count</div>
                                <div className={styles.statValue}>{item.tradesCount}</div>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};
