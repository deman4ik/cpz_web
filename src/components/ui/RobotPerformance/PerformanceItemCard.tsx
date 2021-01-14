import React from "react";
import dynamic from "next/dynamic";
import { Button } from "components/basic";
import styles from "./PerformanceItemCard.module.css";
import { DataCard } from "components/ui/DataCard";
import StatsContainer from "components/pages/ManagePage/dashBoard/components/UserStats/StatsContainer";
import { formatMoney, getColor, getColorForMoney, valueWithSign } from "config/utils";

interface Props {
    item: any;
    onRedirectToDetailView: (path: string) => void;
    titlePrefix?: string;
}

const DynamicAreaChart = dynamic(() => import("../../charts/AreaChart"));

export const PerformanceItemCard: React.FC<Props> = ({ item, onRedirectToDetailView, titlePrefix }) => {
    const handleOnPress = () => {
        onRedirectToDetailView(item.path);
    };
    return (
        <DataCard
            header={
                <div className={styles.row} onClick={handleOnPress}>
                    <div className={styles.col}>{`${titlePrefix ? `${titlePrefix} ` : ""}${item.name}`}</div>
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
                            <DynamicAreaChart height={130} data={item.equity} />
                        ) : (
                            <div className={styles.emptyChart} />
                        )}
                    </div>
                    <StatsContainer
                        data={[
                            {
                                title: "Profit",
                                value: (
                                    <span style={{ color: getColorForMoney(item.profit) }}>
                                        {valueWithSign(formatMoney(item.profit))} $
                                    </span>
                                )
                            },
                            {
                                title: "Win Rate",
                                value: <span style={{ color: "white" }}>{item.winRate} %</span>
                            },
                            {
                                title: "Max Drawdown",
                                value: (
                                    <span style={{ color: getColorForMoney(item.maxDrawdown) }}>
                                        {valueWithSign(formatMoney(item.maxDrawdown))} $
                                    </span>
                                )
                            },
                            { title: "Trades", value: item.tradesCount }
                        ]}
                        itemFontSize="var(--normal3)"
                    />
                </div>
            }
        />
    );
};
