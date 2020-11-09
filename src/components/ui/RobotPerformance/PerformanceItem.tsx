import React from "react";
import dynamic from "next/dynamic";

import { ChevronRightIcon } from "assets/icons/svg";
import { formatMoney, getColor } from "config/utils";
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
            <div className={styles.col} style={{ flex: 20 }}>
                <div className={styles.wraperBlock} onClick={handleOnClick}>
                    <div className={styles.wraperName}>
                        <div className={[styles.tableCellText, styles.cellWidth].join(" ")}>{item.name}</div>
                    </div>
                    <ChevronRightIcon color="white" size={26} />
                </div>
            </div>
            <div className={styles.col} style={{ flex: 24 }}>
                {item?.equity?.length ? <DynamicAreaChart height={100} data={item.equity} /> : null}
            </div>
            <div className={styles.col} style={{ flex: 1 }} />
            <div className={styles.col} style={{ color: getColor(item.profit < 0), flex: 15 }}>
                {item.profit ? `${item.profit > 0 ? "+" : ""}${formatMoney(item.profit)} $` : null}
            </div>
            <div className={styles.col} style={{ flex: 15 }}>
                {`${item.winRate} %`}
            </div>
            <div className={styles.col} style={{ color: getColor(item.maxDrawdown < 0), flex: 15 }}>
                {`${formatMoney(item.maxDrawdown)} $`}
            </div>
            <div className={styles.col} style={{ flex: 10 }}>
                {item.tradesCount}
            </div>
        </div>
    );
};
