import React from "react";
import dynamic from "next/dynamic";

import { formatMoney, colorAction } from "config/utils";
import { SignalItem } from "../RobotsList/types";
import { RobotsButtonItemCard, RobotItemStatusBlock } from ".";
import { formatVariables } from "./helpers";
import { Button } from "components/basic";
import styles from "./RobotsItemCard.module.css";

interface Props {
    item: SignalItem;
    displayType: string;
    onRedirectToDetailView: (code: string) => void;
    robotSubscribe: (variables: any) => void;
}

const DinamicAreaChart = dynamic(() => import("components/charts/AreaChart"));

export const RobotsItemCard: React.FC<Props> = ({ item, displayType, robotSubscribe, onRedirectToDetailView }) => {
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
        <div className={styles.container}>
            <div className={styles.headerCard} onClick={handleOnPressDetails}>
                <div className={styles.row}>
                    <div className={styles.col}>
                        <div className={styles.statValue} style={{ marginBottom: 2 }}>
                            {item.name}
                        </div>
                        <div className={styles.footerRow}>
                            <div className={styles.secondaryText}>
                                {item.volume ? `${item.volume} ` : ""}
                                {item.asset}
                            </div>
                            <div className={styles.primaryText} style={colorAction(item.profit > 0)}>
                                {item.profit !== 0 && `${item.profit > 0 ? "+" : ""}${formatMoney(item.profit)} $`}
                            </div>
                        </div>
                    </div>
                    <div className={styles.col}>
                        <Button
                            title="details"
                            isUppercase
                            responsive
                            size="small"
                            style={{ paddingLeft: 0, paddingRight: 0 }}
                            icon="chevronright"
                        />
                    </div>
                </div>
            </div>
            <div className={styles.chartStat}>
                <div className={styles.chartCol}>
                    {item.performance && item.performance.length ? (
                        <DinamicAreaChart height={120} data={item.performance} />
                    ) : (
                        <div className={styles.emptyChart} />
                    )}
                </div>
                <div className={styles.statCol}>
                    {!item.winRate ? (
                        <div className={styles.emptyStats}>
                            <div />
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
            <div className={styles.footerCart}>
                <div className={styles.footerRow}>
                    <div className={styles.col}>
                        <RobotItemStatusBlock item={item} displayType={displayType} />
                    </div>
                    <RobotsButtonItemCard
                        isSubscribed={item.isSubscribed}
                        robotStatus={item.user_robots.status}
                        displayType={displayType}
                        subscribeToggle={subscribeToggle}
                        handleOnPressDelete={handleOnPressDelete}
                        handleOnPressChangeVolume={handleOnPressChangeVolume}
                    />
                </div>
            </div>
        </div>
    );
};
