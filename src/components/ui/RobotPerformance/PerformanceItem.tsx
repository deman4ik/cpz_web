import React from "react";
import dynamic from "next/dynamic";

import { ChevronRightIcon } from "assets/icons/svg";
import { formatMoney, colorAction } from "config/utils";
import styles from "./PerformanceItem.module.css";

interface Props {
    item: any;
    onRedirectToDetailView: (path: string) => void;
}

const DynamicAreaChart = dynamic(() => import("../../charts/AreaChart"));

export const PerformanceItem: React.FC<Props> = ({ item, onRedirectToDetailView }) => {
    const handleOnClick = () => {
        onRedirectToDetailView(item.path);
    };

    return (
        <div className={styles.tableRow}>
            <div className={styles.col} style={{ flex: 0.8 }}>
                <div className={styles.wraperBlock} onClick={handleOnClick}>
                    <div className={styles.wraperName}>
                        <div className={[styles.tableCellText, styles.cellWidth].join(" ")}>{item.name}</div>
                        <div className={styles.cellProfit} style={colorAction(item.profit > 0)}>
                            {item.profit ? `${item.profit > 0 ? "+" : ""}${formatMoney(item.profit)} $` : null}
                        </div>
                    </div>
                    <ChevronRightIcon color="white" size={26} />
                </div>
            </div>
            <div className={styles.col} style={{ flex: 0.85 }}>
                {item?.equity?.length ? <DynamicAreaChart height={120} data={item.equity} /> : null}
            </div>
            <div className={styles.col} style={{ flex: 0.05 }} />
            <div className={styles.col} style={{ flex: 0.9 }}>
                {item.winRate || item.winRate === 0 ? (
                    <>
                        <div className={styles.statisticsElement}>
                            <div className={styles.secondaryText}>Win Rate&nbsp;</div>
                            <div className={styles.statisticsText}>{`${item.winRate} %`}</div>
                        </div>
                        <div className={styles.statisticsElement} style={{ marginTop: 6 }}>
                            <div className={styles.secondaryText}>Max Drawdown&nbsp;</div>
                            <div className={styles.statisticsText} style={colorAction(item.maxDrawdown > 0)}>
                                {`${formatMoney(item.maxDrawdown)} $`}
                            </div>
                        </div>
                        <div className={styles.statisticsElement} style={{ marginTop: 6 }}>
                            <div className={styles.secondaryText}>Trades Count&nbsp;</div>
                            <div className={styles.statisticsText}>{item.tradesCount}</div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};
