/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
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

const STATES = {
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

            let profit;
            let performance;
            switch (key) {
                case "user":
                    innerComponent = (
                        <DefaultCellWrapper>
                            {robot?.user?.name && <p>{robot.user.name}</p>}
                            <p>
                                <span>{robot.user.id}</span>
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
                            {robot?.robot?.name && <p>{robot.robot.name}</p>}
                            <p>
                                <span>{robot.robot.id}</span>
                            </p>
                            {robot?.settings?.volume && <p>{robot?.settings?.volume}</p>}
                        </DefaultCellWrapper>
                    );
                    cellsAggregated[key] = {
                        title: TITLES_SCHEME.robot.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "performance":
                    profit = robot?.equity && robot?.equity?.profit ? robot?.equity?.profit : 0;
                    performance = robot?.equity && robot?.equity?.changes ? robot?.equity?.changes : [];

                    innerComponent = performance?.length ? (
                        <DefaultCellWrapper>
                            <RobotChartCell
                                style={{ paddingRight: "25px" }}
                                perfomance={performance}
                                profit={profit}
                                height={120}
                            />
                        </DefaultCellWrapper>
                    ) : null;

                    cellsAggregated[key] = {
                        title: TITLES_SCHEME.performance.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "statistics":
                    innerComponent = robot?.equity ? (
                        <DefaultCellWrapper>
                            {getItemsFromTitles(robot.equity, TITLES_SCHEME.statistics.stats)}
                        </DefaultCellWrapper>
                    ) : null;

                    cellsAggregated.statistics = {
                        title: TITLES_SCHEME.statistics.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "activity":
                    innerComponent = (
                        <DefaultCellWrapper>
                            <p>
                                <span>{TITLES_SCHEME.activity.status}</span>
                                {robot.status}
                                {robot[STATES[robot.status]] && `: ${formatDate(robot[STATES[robot.status]])}`}
                            </p>
                            <p>{formatDate(robot.created_at)}</p>
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

export const formatData = (data) => {
    return data.map((signal) => {
        const row = {};
        Object.defineProperty(row, "id", { value: signal.id, writable: false });
        Object.defineProperty(row, "robot_code", { value: signal.robot.code, writable: false });
        Object.defineProperty(row, "user_name", { value: signal?.user?.name, writable: false });
        Object.defineProperty(row, "user_id", { value: signal.user.id, writable: false });
        Object.defineProperty(row, "subscribed_at", { value: formatDate(signal.subscribed_at), writable: false });
        Object.defineProperty(row, "volume", { value: parseFloat(signal.volume), writable: false });
        return row;
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
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
