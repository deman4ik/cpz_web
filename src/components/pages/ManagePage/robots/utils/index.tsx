/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// components
import { DefaultCellWrapper, RobotChartCell } from "components/basic/SearchTable/components/cells";
import { DefaultNotDesktopView } from "components/basic/SearchTable/components/notDesktop";

// types
import { filtersProps } from "../../common/OrderModalInner/types";

// utils
import { getItemsFromTitles, defineProperty } from "../../utils";

// constants
import { STATUSES_COLORS, ROBOTS_AVAILABLE_CODES } from "config/constants";

/**
 * Форматирвоание строк роботов
 * @param data - array robots
 */
export const formatRobotsRows = (data: Array<any>) => {
    return data.map((robot) => {
        const robotItem = { cells: [], NotDesktopView: DefaultNotDesktopView };
        const cellsAggregated: any = {};
        Object.keys(ROBOTS_TITLES_SCHEME).forEach((key) => {
            let innerComponent;
            /*data vars*/
            let robotTypesArray;
            let profit;
            let performance;

            switch (key) {
                case "info":
                    innerComponent = (
                        <DefaultCellWrapper>
                            {robot?.name && <p>{robot.name}</p>}
                            <p>
                                <span>{robot.id}</span>
                            </p>
                            <p
                                style={{
                                    color: STATUSES_COLORS[robot.status] ? STATUSES_COLORS[robot.status] : "#ffffff"
                                }}>
                                {robot.status}
                            </p>
                        </DefaultCellWrapper>
                    );
                    cellsAggregated.info = {
                        title: ROBOTS_TITLES_SCHEME.info.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "settings":
                    innerComponent = "";
                    if (robot?.settings) {
                        const { volume, requiredHistoryMaxBars, strategyParameters } = robot?.settings;
                        innerComponent = (
                            <DefaultCellWrapper>
                                {volume && (
                                    <p>
                                        <span>{ROBOTS_TITLES_SCHEME.settings.volume}</span>
                                        {volume}
                                    </p>
                                )}
                                {strategyParameters && (
                                    <div style={{ paddingTop: "10px" }}>
                                        {Object.keys(strategyParameters).map((itemKey) => (
                                            <p key={itemKey}>
                                                <span>{ROBOTS_TITLES_SCHEME.settings.strategyParameters[itemKey]}</span>
                                                {strategyParameters[itemKey]}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                {requiredHistoryMaxBars && (
                                    <p>
                                        <span>{ROBOTS_TITLES_SCHEME.settings.requiredHistoryMaxBars}</span>
                                        {requiredHistoryMaxBars}
                                    </p>
                                )}
                            </DefaultCellWrapper>
                        );
                    }
                    cellsAggregated.settings = {
                        title: ROBOTS_TITLES_SCHEME.settings.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "types":
                    robotTypesArray = [
                        {
                            name: "Signals",
                            value: robot.signals
                        },
                        {
                            name: "Trading",
                            value: robot.trading
                        }
                    ]
                        .filter(({ value }) => value)
                        .map(({ name }) => name);

                    innerComponent = (
                        <DefaultCellWrapper>
                            {robotTypesArray.length
                                ? robotTypesArray.map((item) => <p key={item}>{item}</p>)
                                : robotTypesArray[0]}
                        </DefaultCellWrapper>
                    );
                    cellsAggregated.types = {
                        title: ROBOTS_TITLES_SCHEME.types.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;

                case "entries":
                    innerComponent = (
                        <DefaultCellWrapper>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.entries.user_robots}</span>
                                {robot.user_robots_aggregate.aggregate.count}
                            </p>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.entries.user_signals}</span>
                                {robot.user_signals_aggregate.aggregate.count}
                            </p>
                        </DefaultCellWrapper>
                    );

                    cellsAggregated.entries = {
                        title: ROBOTS_TITLES_SCHEME.entries.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "performance":
                    profit = robot?.equity && robot?.equity?.profit ? robot?.equity?.profit : 0;
                    performance = robot?.equity && robot?.equity?.changes ? robot?.equity?.changes : [];
                    innerComponent = performance?.length ? (
                        <RobotChartCell
                            style={{ paddingRight: "25px" }}
                            performance={performance}
                            profit={profit}
                            height={120}
                        />
                    ) : null;

                    cellsAggregated.performance = {
                        title: ROBOTS_TITLES_SCHEME.performance.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "statistics":
                    innerComponent = robot?.equity ? (
                        <DefaultCellWrapper>
                            {getItemsFromTitles(robot.equity, ROBOTS_TITLES_SCHEME.statistics.stats)}
                        </DefaultCellWrapper>
                    ) : null;

                    cellsAggregated.statistics = {
                        title: ROBOTS_TITLES_SCHEME.statistics.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "available":
                    innerComponent = (
                        <DefaultCellWrapper>
                            <p>
                                {ROBOTS_AVAILABLE_CODES[robot.available]
                                    ? ROBOTS_AVAILABLE_CODES[robot.available]
                                    : robot.avaliable}
                            </p>
                        </DefaultCellWrapper>
                    );
                    cellsAggregated.available = {
                        title: ROBOTS_TITLES_SCHEME.available.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                default:
                    if (Object.prototype.hasOwnProperty.call(robot, key)) {
                        innerComponent = <DefaultCellWrapper>{robot[key]}</DefaultCellWrapper>;
                        cellsAggregated[key] = {
                            title: ROBOTS_TITLES_SCHEME[key].title,
                            notDesktopVal: innerComponent,
                            component: innerComponent
                        };
                    }
                    break;
            }
            robotItem.cells.push(cellsAggregated[key]);
        });
        return robotItem;
    });
};

export const formatData = ({ robots }) => {
    return robots.map((robot) => {
        const row = {};
        defineProperty(row, "asset", robot.asset);
        defineProperty(row, "available", robot.available);
        defineProperty(row, "currency", robot.currency);

        defineProperty(row, "performance", robot.equity?.changes);
        defineProperty(row, "lastProfit", robot.equity?.lastProfit);
        defineProperty(row, "maxDrawdown", robot.equity?.maxDrawdown);
        defineProperty(row, "profit", robot.equity?.profit);
        defineProperty(row, "tradesCount", robot.equity?.tradesCount);
        defineProperty(row, "winRate", robot.equity?.winRate);

        defineProperty(row, "exchange", robot.exchange);
        defineProperty(row, "id", robot.id);
        defineProperty(row, "name", robot.name);

        defineProperty(row, "requiredHistoryMaxBars", robot.strategyParameters?.requiredHistoryMaxBars);
        defineProperty(row, "adxHigh", robot.strategyParameters?.adxHigh);
        defineProperty(row, "lookback", robot.strategyParameters?.lookback);
        defineProperty(row, "adxPeriod", robot.strategyParameters?.adxPeriod);
        defineProperty(row, "orderStopLoss", robot.strategyParameters?.orderStopLoss);
        defineProperty(row, "orderTakeProfit", robot.strategyParameters?.orderTakeProfit);
        defineProperty(row, "volume", robot.volume);

        defineProperty(row, "signals", robot.signals);
        defineProperty(row, "status", robot.status);
        defineProperty(row, "strategy", robot.strategy);
        defineProperty(row, "timeframe", robot.timeframe);

        defineProperty(row, "deviationExit", robot.trade_settings?.deviation?.exit);
        defineProperty(row, "deviationEntry", robot.trade_settings?.deviation?.entry);
        defineProperty(row, "multiPosition", robot.trade_settings?.multiPosition);
        defineProperty(row, "orderTimeout", robot.trade_settings?.orderTimeout);
        defineProperty(row, "slippageEntryCount", robot.trade_settings?.slippage?.entry?.count);
        defineProperty(row, "slippageEntryStepPercent", robot.trade_settings?.slippage?.entry?.stepPercent);
        defineProperty(row, "slippageExitCount", robot.trade_settings?.slippage?.exit?.count);
        defineProperty(row, "slippageExitStepPercent", robot.trade_settings?.slippage?.exit?.stepPercent);

        defineProperty(row, "trading", robot.trade_settings?.trading);
        return row;
    });
};

export const getSearchOptions = (value: string) => ({ name: { _ilike: `%${value}%` } });

export const aggregateRobotsFilters = (filtersObject: filtersProps | undefined) => {
    let where = null;
    if (filtersObject) {
        Object.keys(filtersObject).forEach((key) => {
            const filters = filtersObject[key].filters
                .filter(({ active }) => Boolean(active))
                .map(({ filterValue }) => filterValue);
            if (filters.length) {
                where = { ...where, [key]: { _in: filters } };
            }
        });
    }
    return where;
};
