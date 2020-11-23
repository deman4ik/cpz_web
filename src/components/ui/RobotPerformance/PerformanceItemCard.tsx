import React from "react";
import dynamic from "next/dynamic";

import { Button } from "components/basic";
import { formatMoney, colorAction } from "config/utils";
import styles from "./PerformanceItemCard.module.css";
import { WinRateStatistics } from "components/ui/RobotsItems/WinRateStatistics";

interface Props {
    item: any;
    onRedirectToDetailView: (path: string) => void;
}

const DynamicAreaChart = dynamic(() => import("../../charts/AreaChart"));

export const PerformanceItemCard: React.FC<Props> = ({ item, onRedirectToDetailView }) => {
    const handleOnPress = () => {
        onRedirectToDetailView(item.path);
    };
    console.log(item);
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
                <WinRateStatistics
                    classNames={{ container: styles.statCol, wrapper: styles.statRow }}
                    winRate={item.winRate}
                    maxDrawdown={item.maxDrawdown}
                    tradesCount={item.tradesCount}
                />
            </div>
        </div>
    );
};
