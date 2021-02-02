import React, { useContext } from "react";
import Router from "next/router";
import Link from "next/link";
// helpers
import { formatVariables } from "./helpers";
// types
import { SignalItem } from "../RobotsList/types";
// components
import { ChevronRightIcon } from "assets/icons/svg";
import { RobotItemStatusBlock, RobotsButtonItem } from ".";
import AreaChart from "components/charts/AreaChart";
// styles
import styles from "./RobotsItem.module.css";
// context
import { AuthContext } from "providers/authContext";
import { WinRateStatistics } from "components/ui/RobotsItems/WinRateStatistics";
import { ProfitItem } from "components/ui/RobotsItems/ProfitItem";

interface Props {
    item: SignalItem;
    robotSubscribe: (variables: any) => void;
    displayType: string;
    lastItem: boolean;
}

export const RobotsItem: React.FC<Props> = ({ item, robotSubscribe, displayType, lastItem }) => {
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

    const { profit, performance } = item;

    return (
        <div className={`${styles.itemContainer}${!lastItem ? ` ${styles.itemContainerMargin}` : ""}`}>
            <Link href={`/${displayType}/robot/${item.code}`}>
                <a>
                    <div className={styles.cellName}>
                        <div className={styles.cellNameWrap}>
                            <div className={styles.primaryText}>{item.name}</div>
                            <div className={styles.profitWrap}>
                                <div className={styles.secondaryText}>{item.displayedVolume || ""}</div>
                            </div>
                        </div>
                        <ChevronRightIcon color="white" size={26} />
                    </div>
                </a>
            </Link>
            <div className={styles.cellPerformance}>
                {performance && performance.length ? <AreaChart height={120} data={performance} /> : null}
            </div>
            <div style={{ flex: 0.2 }} />
            <ProfitItem profit={profit !== 0 ? profit : null} />
            <div className={styles.cellStatistics}>
                <WinRateStatistics
                    classNames={{ container: styles.statsWrapper, wrapper: styles.statisticsElement }}
                    winRate={item.winRate || 0}
                    maxDrawdown={item.maxDrawdown}
                    tradesCount={item.tradesCount}
                />
            </div>

            <div className={styles.cellStatus}>
                <RobotItemStatusBlock item={item} displayType={displayType} />
            </div>
            <RobotsButtonItem
                isSubscribed={item.isSubscribed}
                robotStatus={item.user_robots?.status}
                displayType={displayType}
                subscribeToggle={subscribeToggle}
                handleOnPressDelete={handleOnPressDelete}
                handleOnPressChangeVolume={handleOnPressChangeVolume}
            />
        </div>
    );
};
