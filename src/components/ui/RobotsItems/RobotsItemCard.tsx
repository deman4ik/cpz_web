import React, { useContext } from "react";
import Router from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SignalItem } from "../RobotsList/types";
import { RobotsButtonItemCard, RobotItemStatusBlock } from ".";
import { formatVariables } from "./helpers";
import { Button } from "components/basic";
import { AuthContext } from "providers/authContext";
import { WinRateStatistics } from "./WinRateStatistics";
import { DataCard } from "../DataCard";
import styles from "./RobotsItemCard.module.css";

interface Props {
    item: SignalItem;
    displayType: string;
    robotSubscribe: (variables: any) => void;
}

const DynamicAreaChart = dynamic(() => import("components/charts/AreaChart"));

export const RobotsItemCard: React.FC<Props> = ({ item, displayType, robotSubscribe }) => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);

    const subscribeToggle = () => {
        if (!isAuth) {
            Router.push("/auth/login");
        } else {
            robotSubscribe(formatVariables(item, "", displayType));
        }
    };

    const handleOnPressChangeVolume = () => {
        robotSubscribe(formatVariables(item, "edit"));
    };

    const handleOnPressDelete = () => {
        robotSubscribe(formatVariables(item, "delete"));
    };

    return (
        <DataCard
            header={
                <Link href={`/${displayType}/robot/${item.code}`}>
                    <a>
                        <div className={styles.row}>
                            <div className={styles.headerCol}>
                                {item.name}
                                <div className={styles.footerRow}>
                                    <div className={styles.secondaryText}>
                                        {item.displayedVolume || `${item.volume} ${item.asset}`}
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
                    </a>
                </Link>
            }
            body={
                <div className={styles.chartStat}>
                    <div className={styles.chartCol}>
                        {item.performance && item.performance.length ? (
                            <DynamicAreaChart height={120} data={item.performance} />
                        ) : null}
                    </div>
                    <div className={styles.statCol}>
                        {!item.tradesCount ? (
                            <div className={styles.emptyStats}>
                                <div />
                            </div>
                        ) : (
                            <WinRateStatistics
                                classNames={{ container: styles.statCol, wrapper: styles.statRow }}
                                profit={item.profit}
                                winRate={item.winRate}
                                maxDrawdown={item.maxDrawdown}
                                tradesCount={item.tradesCount}
                            />
                        )}
                    </div>
                </div>
            }
            footer={
                <div className={styles.footerRow}>
                    <div className={`${styles.col} ${styles.statsWrapper}`}>
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
            }
        />
    );
};
