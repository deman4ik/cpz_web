import React from "react";
// components
import { DefaultCellWrapper, RobotChartCell } from "components/basic/SearchTable/components/cells";
import { DefaultNotDesktopView } from "components/basic/SearchTable/components/notDesktop";
// constants
import { TITLES_SCHEME } from "components/pages/ManagePage/userRobots/constants";
// utils
import { formatDate } from "config/utils";
import { getItemsFromTitles } from "../../utils";
// types
import { filtersProps } from "../../common/OrderModalInner/types";
import { ROBOTS_TITLES_SCHEME } from "components/pages/ManagePage/robots/constants";

const STATUSES = {
    stopped: "stopped_at",
    started: "started_at"
};

/**
 * Форматирвоание строк роботов
 * @param data - array robots
 */
export const formatRobotsRows = (data: Array<any>) => {
    return data.map((robot) => {
        const robotItem = { cells: [], NotDesktopView: DefaultNotDesktopView };
        const cellsAggregated: any = {};
        Object.keys(TITLES_SCHEME).forEach((key) => {
            let innerComponent;
            /*vars data*/
            let profit;
            let performance;
            switch (key) {
                case "user":
                    innerComponent = (
                        <DefaultCellWrapper>
                            <p>
                                <span>{TITLES_SCHEME.user.name}</span>
                                {robot.user.name}
                            </p>
                            <p>
                                <span>{TITLES_SCHEME.user.id}</span>
                                {robot.user.id}
                            </p>
                        </DefaultCellWrapper>
                    );
                    cellsAggregated[key] = {
                        title: TITLES_SCHEME.user.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "robot":
                    innerComponent = (
                        <DefaultCellWrapper>
                            <p>
                                <span>{TITLES_SCHEME.robot.name}</span>
                                {robot.robot.name}
                            </p>
                            <p>
                                <span>{TITLES_SCHEME.robot.id}</span>
                                {robot.robot.id}
                            </p>
                            <p>
                                <span>{TITLES_SCHEME.robot.volume}</span>
                                {robot.robot.robot_settings.volume}
                            </p>
                        </DefaultCellWrapper>
                    );
                    cellsAggregated[key] = {
                        title: TITLES_SCHEME.robot.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "statistics":
                    profit = robot?.robot?.equity && robot?.robot?.equity?.profit ? robot?.robot?.equity?.profit : 0;
                    performance =
                        robot?.robot?.equity && robot?.robot?.equity?.changes ? robot?.robot?.equity?.changes : [];

                    innerComponent = performance?.length ? (
                        <DefaultCellWrapper>
                            {robot.equity?.tradesCount &&
                                getItemsFromTitles(robot.equity, ROBOTS_TITLES_SCHEME.statistics.stats)}
                            <RobotChartCell
                                style={{ paddingRight: "25px" }}
                                perfomance={performance}
                                profit={profit}
                                height={120}
                            />
                        </DefaultCellWrapper>
                    ) : null;

                    cellsAggregated[key] = {
                        title: TITLES_SCHEME.statistics.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "activity":
                    innerComponent = (
                        <DefaultCellWrapper>
                            <p>
                                <span>{TITLES_SCHEME.activity.status}</span>
                                {robot.status}{" "}
                                {robot[STATUSES[robot.status]] && `| ${formatDate(robot[STATUSES[robot.status]])}`}
                            </p>
                            <p>
                                <span>{TITLES_SCHEME.activity.date}</span>
                                {formatDate(robot.created_at)}
                            </p>
                        </DefaultCellWrapper>
                    );
                    cellsAggregated[key] = {
                        title: TITLES_SCHEME.robot.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                default:
                    if (Object.prototype.hasOwnProperty.call(robot, key)) {
                        innerComponent = <DefaultCellWrapper>{robot[key]}</DefaultCellWrapper>;
                        cellsAggregated[key] = {
                            title: TITLES_SCHEME[key].title,
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

export const getSearchWhere = (value: string) => ({
    _or: [{ user: { name: { _like: `%${value}%` } } }, { robot: { name: { _like: `%${value}%` } } }]
});

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
