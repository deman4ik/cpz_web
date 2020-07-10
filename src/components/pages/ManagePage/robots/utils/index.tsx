import React from "react";
// components
import RobotCellText from "components/pages/ManagePage/robots/components/RobotCellText";
import RobotsNotDesktopView from "components/pages/ManagePage/robots/components/RobotsNotDesktopView";
// constants
import { ROBOTS_TITLES_SCHEME } from "components/pages/ManagePage/robots/constants";

/**
 * Форматирвоание строк роботов
 * @param data - array robots
 */
export const formatRobotsRows = (data: Array<any>) => {
    /*Форматирование  и обработка данных в таблице*/
    return data.map((robot) => {
        const robotItem = { cells: [], NotDesktopView: RobotsNotDesktopView };
        const cellsAggregated: any = {};
        Object.keys(ROBOTS_TITLES_SCHEME).forEach((key) => {
            let innerComponent;
            switch (key) {
                case "info":
                    const { id, code, status } = robot;
                    innerComponent = (
                        <RobotCellText>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.info.id}</span> {id}
                            </p>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.info.code}</span> {code}
                            </p>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.info.status}</span> {status}
                            </p>
                        </RobotCellText>
                    );
                    cellsAggregated.info = {
                        title: ROBOTS_TITLES_SCHEME.info.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "settings":
                    const { settings } = robot;
                    innerComponent = "";
                    if (settings) {
                        const { volume, requiredHistoryMaxBars, strategyParameters } = settings;
                        innerComponent = (
                            <RobotCellText>
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
                            </RobotCellText>
                        );
                    }
                    cellsAggregated.settings = {
                        title: ROBOTS_TITLES_SCHEME.settings.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "types":
                    const { signals, trading } = robot;
                    const robotTypesArray = [
                        {
                            name: "Signals",
                            value: signals
                        },
                        {
                            name: "Trading",
                            value: trading
                        }
                    ]
                        .filter(({ value }) => value)
                        .map(({ name }) => name);

                    innerComponent = (
                        <RobotCellText>
                            {robotTypesArray.length ? robotTypesArray.join(" | ") : robotTypesArray[0]}
                        </RobotCellText>
                    );
                    cellsAggregated.types = {
                        title: ROBOTS_TITLES_SCHEME.types.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;

                case "entries":
                    innerComponent = (
                        <RobotCellText>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.entries.user_robots}</span>
                                {robot.user_robots.length}
                            </p>
                            <p>
                                <span>{ROBOTS_TITLES_SCHEME.entries.user_signals}</span>
                                {robot.user_signals.length}
                            </p>
                        </RobotCellText>
                    );

                    cellsAggregated.entries = {
                        title: ROBOTS_TITLES_SCHEME.entries.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "statistics":
                    cellsAggregated.statistics = {
                        title: ROBOTS_TITLES_SCHEME.statistics.title,
                        notDesktopVal: "Заглушка",
                        component: "Заглушка"
                    };
                    break;
            }
            robotItem.cells.push(cellsAggregated[key]);
        });
        return robotItem;
    });
};
