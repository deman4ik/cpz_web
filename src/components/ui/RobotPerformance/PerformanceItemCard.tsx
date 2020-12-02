import React from "react";
import dynamic from "next/dynamic";

import { Button } from "components/basic";
import styles from "./PerformanceItemCard.module.css";
import { WinRateStatistics } from "components/ui/RobotsItems/WinRateStatistics";
import { DataCard } from "components/ui/DataCard";

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
        <DataCard
            header={
                <div className={styles.row} onClick={handleOnPress}>
                    <div className={styles.col}>{item.name}</div>
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
            }
            body={
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
                        profit={item.profit}
                        winRate={item.winRate}
                        maxDrawdown={item.maxDrawdown}
                        tradesCount={item.tradesCount}
                    />
                </div>
            }
        />
    );
};
