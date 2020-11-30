import React, { FC } from "react";
import { formatMoney, getColorForMoney } from "config/utils";
import { StatisticElement } from "components/ui/RobotsItems/StatisticsElement";

interface WinRateStatisticsProps {
    winRate: number;
    maxDrawdown: number;
    tradesCount: number;
    classNames?: { container?: string; wrapper?: string };
}
export const WinRateStatistics: FC<WinRateStatisticsProps> = ({
    winRate,
    maxDrawdown,
    tradesCount,
    classNames = {}
}) => {
    return (
        <>
            {winRate || winRate === 0 ? (
                <div className={classNames.container || ""}>
                    <StatisticElement label="Win Rate" value={`${winRate} %`} className={classNames.wrapper} />
                    <StatisticElement
                        className={classNames.wrapper}
                        label="Max Drawdown"
                        value={`${formatMoney(maxDrawdown)} $`}
                        valueTextStyle={{ color: getColorForMoney(maxDrawdown) }}
                    />
                    <StatisticElement label="Trades Count" value={tradesCount} className={classNames.wrapper} />
                </div>
            ) : null}
        </>
    );
};
