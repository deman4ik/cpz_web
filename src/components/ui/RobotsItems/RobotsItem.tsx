/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import dynamic from "next/dynamic";

import { moneyFormat, colorAction } from "config/utils";
import { SignalItem } from "../RobotsList/types";
import { formatVariables } from "./helpers";
import { ChevronRightIcon } from "assets/icons/svg";
import { RobotItemStatusBlock, RobotsButtonItem } from ".";
import styles from "./RobotsItem.module.css";

interface Props {
    item: SignalItem;
    onRedirectToDetailView: (code: string) => void;
    robotSubscribe: (variables: any) => void;
    displayType: string;
    lastItem: boolean;
}

const DinamicAreaChart = dynamic(() => import("components/charts/AreaChart"));

export const RobotsItem: React.FC<Props> = ({
    item,
    robotSubscribe,
    displayType,
    onRedirectToDetailView,
    lastItem
}) => {
    const subscribeToggle = () => {
        robotSubscribe(formatVariables(item, "", displayType));
    };

    const handleOnPressChangeVolume = () => {
        robotSubscribe(formatVariables(item, "edit"));
    };

    const handleOnPressDelete = () => {
        robotSubscribe(formatVariables(item, "delete"));
    };

    const handleOnPressDetails = () => {
        onRedirectToDetailView(item.code);
    };

    return (
        <div className={`${styles.itemContainer}${!lastItem ? ` ${styles.itemContainerMargin}` : ""}`}>
            <div className={styles.cellName} onClick={handleOnPressDetails}>
                <div className={styles.cellNameWrap}>
                    <div className={styles.primaryText}>{item.name}</div>
                    <div className={styles.profitWrap}>
                        <div className={styles.secondaryText}>
                            {item.volume ? `${item.volume} ` : ""}
                            {item.asset}
                        </div>
                        <div className={styles.profitText} style={colorAction(item.profit > 0)}>
                            {item.profit !== 0 && `${item.profit > 0 ? "+" : ""}${moneyFormat(item.profit)} $`}
                        </div>
                    </div>
                </div>
                <ChevronRightIcon color="white" size={26} />
            </div>
            <div className={styles.cellPerformance}>
                {item.performance && item.performance.length ? (
                    <DinamicAreaChart height={120} positive={item.profit > 0} data={item.performance} />
                ) : null}
            </div>
            <div className={styles.cellStatistics}>
                {item.winRate ? (
                    <>
                        <div className={styles.statisticsElement}>
                            <div className={styles.secondaryText}>Win Rate&nbsp;</div>
                            <div className={styles.statisticsText}>{`${item.winRate} %`}</div>
                        </div>
                        <div className={styles.statisticsElement} style={{ marginTop: 6 }}>
                            <div className={styles.secondaryText}>Max Drawdown&nbsp;</div>
                            <div className={styles.statisticsText} style={colorAction(item.maxDrawdown > 0)}>
                                {`${moneyFormat(item.maxDrawdown)} $`}
                            </div>
                        </div>
                        <div className={styles.statisticsElement} style={{ marginTop: 6 }}>
                            <div className={styles.secondaryText}>Trades Count&nbsp;</div>
                            <div className={styles.statisticsText}>{item.tradesCount}</div>
                        </div>
                    </>
                ) : null}
            </div>
            <div className={styles.cellStatus}>
                <RobotItemStatusBlock item={item} displayType={displayType} />
            </div>
            <RobotsButtonItem
                isSubscribed={item.isSubscribed}
                robotStatus={item.user_robots.status}
                displayType={displayType}
                subscribeToggle={subscribeToggle}
                handleOnPressDelete={handleOnPressDelete}
                handleOnPressChangeVolume={handleOnPressChangeVolume}
            />
        </div>
    );
};
