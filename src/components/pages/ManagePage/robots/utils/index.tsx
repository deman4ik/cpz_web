import React from "react";
// components
import { DefaultCellWrapper, RobotChartCell } from "components/basic/SearchTable/components/cells";
import { DefaultNotDesktopView } from "components/basic/SearchTable/components/notDesktop";
// constants
import { ROBOTS_TITLES_SCHEME } from "components/pages/ManagePage/robots/constants";
// types
import { filtersProps } from "../../common/OrderModalInner/types";

/**
 * Форматирвоание строк роботов
 * @param data - array robots
 */
export const formatRobotsRows = (data: Array<any>) => {
    /*Форматирование  и обработка данных в таблице*/
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
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.info.id}</span> {robot.id}
                            </p>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.info.name}</span> {robot.name}
                            </p>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.info.status}</span> {robot.status}
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
                                {strategyParameters &&
                                    Object.keys(strategyParameters).map((itemKey) => (
                                        <p key={itemKey}>
                                            <span>{ROBOTS_TITLES_SCHEME.settings.strategyParameters[itemKey]}</span>
                                            {strategyParameters[itemKey]}
                                        </p>
                                    ))}
                                {requiredHistoryMaxBars && (
                                    <p>
                                        <span>{ROBOTS_TITLES_SCHEME.settings.volume}</span>
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
                            {robotTypesArray.length ? robotTypesArray.join(" | ") : robotTypesArray[0]}
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
                                {robot.user_robots.length}
                            </p>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.entries.user_signals}</span>
                                {robot.user_signals.length}
                            </p>
                        </DefaultCellWrapper>
                    );

                    cellsAggregated.entries = {
                        title: ROBOTS_TITLES_SCHEME.entries.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "statistics":
                    profit = robot?.equity && robot?.equity?.profit ? robot?.equity?.profit : 0;
                    performance = robot?.equity && robot?.equity?.changes ? robot?.equity?.changes : [];

                    innerComponent = performance?.length ? (
                        <RobotChartCell
                            style={{ paddingRight: "25px" }}
                            perfomance={performance}
                            profit={profit}
                            height={120}
                        />
                    ) : null;

                    cellsAggregated.statistics = {
                        title: ROBOTS_TITLES_SCHEME.statistics.title,
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

export const getWhereSearch = (value: string) => ({ name: { _like: `%${value}%` } });

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
