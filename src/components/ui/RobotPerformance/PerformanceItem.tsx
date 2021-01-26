import React from "react";
import dynamic from "next/dynamic";
import { ChevronRightIcon } from "assets/icons/svg";
import { formatMoney, getColorForMoney, valueWithSign } from "config/utils";
import styles from "./PerformanceItem.module.css";

interface Props {
    item: any;
    onRedirectToDetailView: (path: string) => void;
    compact?: boolean;
    noShadow?: boolean;
}

const DynamicAreaChart = dynamic(() => import("components/charts/AreaChart"));

export const PerformanceItem: React.FC<Props> = ({
    item,
    onRedirectToDetailView,
    compact = false,
    noShadow = false
}) => {
    const handleOnClick = () => {
        onRedirectToDetailView(item.path);
    };

    const statsSeciton = (
        <>
            <div className={!compact ? styles.col : styles.inlineText} style={{ flex: 15 }}>
                {compact && <span className={styles.secondaryText}>Win Rate:&nbsp;</span>}
                {`${item.winRate} %`}
            </div>
            <div
                className={!compact ? styles.col : styles.inlineText}
                style={{ color: getColorForMoney(item.maxDrawdown), flex: 15 }}>
                {compact && <span className={styles.secondaryText}>Max Drawdown:&nbsp;</span>}
                {`${formatMoney(item.maxDrawdown)} $`}
            </div>
            <div className={!compact ? styles.col : styles.inlineText} style={{ flex: 10 }}>
                {compact && <span className={styles.secondaryText}>Trades Count:&nbsp;</span>}
                {item.tradesCount}
            </div>
        </>
    );

    return (
        <div className={styles.tableRow} style={noShadow ? { borderTopWidth: 0 } : {}}>
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
            <div className={styles.col} style={{ color: getColorForMoney(item.profit), flex: 15 }}>
                {item.profit ? `${valueWithSign(formatMoney(item.profit))} $` : null}
            </div>
            {compact ? (
                <div className={styles.col} style={{ flex: 15 }}>
                    {statsSeciton}
                </div>
            ) : (
                statsSeciton
            )}
        </div>
    );
};
