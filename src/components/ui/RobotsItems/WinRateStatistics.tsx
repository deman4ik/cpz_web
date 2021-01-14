import React, { FC } from "react";
import { formatMoney, getColorForMoney, valueWithSign } from "config/utils";
import { StatisticElement } from "components/ui/RobotsItems/StatisticsElement";

interface WinRateStatisticsProps {
    profit?: number;
    winRate: number;
    maxDrawdown: number;
    tradesCount: number;
    classNames?: { container?: string; wrapper?: string };
}
export const WinRateStatistics: FC<WinRateStatisticsProps> = ({
    profit,
    winRate,
    maxDrawdown,
    tradesCount,
    classNames = {}
}) => {
    return (
        <>
            {winRate || winRate === 0 ? (
                <div className={classNames.container || ""}>
                    {profit && (
                        <StatisticElement
                            className={classNames.wrapper}
                            label="Profit"
                            value={profit ? `${valueWithSign(formatMoney(profit))} $` : null}
                            valueTextStyle={{ color: getColorForMoney(profit) }}
                        />
                    )}
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
