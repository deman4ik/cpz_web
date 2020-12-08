import React from "react";
import Router from "next/router";
import { OpenPositionsItem } from "./OpenPositionsItem";
import { OpenPositionsItemCard } from "./OpenPositionsItemCard";
import { DummyCards } from "components/common";
import styles from "./OpenPositionsTable.module.css";
import { formatMoney, getColor, getColorForMoney, valueWithSign } from "config/utils";

const cardWidth = 310;

type Props = {
    width: number;
    mobile: boolean;
    type: string;
    asset: any;
};

const OpenPositionsTable = ({ width, mobile, type, asset }: Props): JSX.Element => {
    const handleRedirectToDetailView = (code: string) => {
        Router.push(`/${type}/robot/${code}`);
    };

    const countDummyCards = (dataLength) => {
        const cardsInARow = width - 200 <= 0 ? 1 : Math.floor((width - 200) / cardWidth);
        const module = dataLength % cardsInARow;
        return module ? cardsInARow - module : 0;
    };
    console.log(asset);
    return (
        <>
            {!mobile ? (
                <>
                    <div className={`${styles.tableHeader} ${styles.tableGridRow}`}>
                        <div className={styles.wrapper}>
                            <div className={styles.tableHeaderText}>Position</div>
                        </div>
                        <div className={styles.wrapper}>
                            <div className={styles.tableHeaderText}>Entry</div>
                        </div>
                        <div className={styles.wrapper}>
                            <div className={styles.tableHeaderText}>
                                Amount:&nbsp;
                                <span
                                    className={styles.headerValueSpan}
                                    style={{
                                        color: getColor(asset.volume <= 0)
                                    }}>
                                    {`${valueWithSign(asset.volume)} ${asset.asset}`}
                                </span>
                            </div>
                        </div>
                        <div className={styles.wrapper}>
                            <div className={styles.tableHeaderText}>
                                Unrealized Profit:&nbsp;
                                <span
                                    className={styles.headerValueSpan}
                                    style={{
                                        color: getColorForMoney(asset.profit)
                                    }}>
                                    {`${valueWithSign(formatMoney(asset.profit))} $`}
                                </span>
                            </div>
                        </div>
                    </div>
                    {asset.robots.map((item, idx) => (
                        <OpenPositionsItem key={idx} item={item} onRedirectToDetailView={handleRedirectToDetailView} />
                    ))}
                </>
            ) : (
                <div key={asset.value} className={styles.cardItemsContainer}>
                    {asset.robots.map((item, idx) => (
                        <OpenPositionsItemCard
                            key={idx}
                            item={item}
                            onRedirectToDetailView={handleRedirectToDetailView}
                        />
                    ))}
                    {DummyCards(countDummyCards(asset.robots.length), cardWidth)}
                </div>
            )}
        </>
    );
};

export default OpenPositionsTable;
