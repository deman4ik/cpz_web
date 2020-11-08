import React from "react";
import Router from "next/router";

// constants
import { SCREEN_TYPE } from "config/constants";

// components
import { OpenPositionsItem } from "./OpenPositionsItem";
import { OpenPositionsItemCard } from "./OpenPositionsItemCard";
import { DummyCards } from "components/common";

//hooks
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";

import styles from "./OpenPositionsTable.module.css";

const cardWidth = 310;

type Props = {
    displayType: string;
    asset: any;
};

const OpenPositionsTable = ({ displayType, asset }: Props): JSX.Element => {
    const { width } = useWindowDimensions();
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);

    const handleRedirectToDetailView = (code: string) => {
        Router.push(`/${displayType}/robot/${code}`);
    };

    const countDummyCards = (dataLength) => {
        const cardsInARow = width - 200 <= 0 ? 1 : Math.floor((width - 200) / cardWidth);
        const module = dataLength % cardsInARow;
        return module ? cardsInARow - module : 0;
    };

    return (
        <>
            {isDesktopView ? (
                <>
                    <div className={styles.tableHeader}>
                        <div className={styles.wrapper} style={{ flex: 0.3 }}>
                            <div className={styles.tableHeaderText}>Position</div>
                        </div>
                        <div className={styles.wrapper} style={{ flex: 0.2 }}>
                            <div className={styles.tableHeaderText}>Entry</div>
                        </div>
                        <div className={styles.wrapper} style={{ flex: 0.2 }}>
                            <div className={styles.tableHeaderText}>Amount</div>
                        </div>
                        <div className={styles.wrapper} style={{ flex: 0.3 }}>
                            <div className={styles.tableHeaderText}>Unrealized Profit</div>
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
