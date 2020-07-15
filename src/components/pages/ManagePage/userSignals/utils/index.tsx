import React from "react";
// components
import { DefaultCellWrapper, RobotChartCell } from "components/basic/SearchTable/components/cells";
import { DefaultNotDesktopView } from "components/basic/SearchTable/components/notDesktop";
// constants
import { USER_SIGNALS_TITLES_SCHEME } from "../constants";
// utils
import { formatDate } from "config/utils";

const cellStyles: React.CSSProperties = {
    padding: "10px 5px 10px 0"
};

/**
 * Форматирвоание строк пользовательских сигналов
 * @param data - array user signals
 */
export const userSignalsFormat = (data: Array<any>) => {
    return data.map((signal) => {
        const signalItem = { cells: [], NotDesktopView: DefaultNotDesktopView };
        const cellsAggregated: any = {};
        Object.keys(USER_SIGNALS_TITLES_SCHEME).forEach((key) => {
            let innerComponent;
            switch (key) {
                case "code":
                    innerComponent = (
                        <DefaultCellWrapper style={{ ...cellStyles }}>{signal.robot.code}</DefaultCellWrapper>
                    );
                    cellsAggregated.code = {
                        title: USER_SIGNALS_TITLES_SCHEME.code.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "user_name":
                    innerComponent = <DefaultCellWrapper style={cellStyles}>{signal.user.name}</DefaultCellWrapper>;
                    cellsAggregated.user_name = {
                        title: USER_SIGNALS_TITLES_SCHEME.user_name.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "user_id":
                    innerComponent = <DefaultCellWrapper style={cellStyles}>{signal.user.id}</DefaultCellWrapper>;
                    cellsAggregated.user_id = {
                        title: USER_SIGNALS_TITLES_SCHEME.user_id.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "subscribe_at":
                    innerComponent = (
                        <DefaultCellWrapper style={cellStyles}>{formatDate(signal.subscribe_at)}</DefaultCellWrapper>
                    );
                    cellsAggregated.subscribe_at = {
                        title: USER_SIGNALS_TITLES_SCHEME.subscribe_at.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "volume":
                    innerComponent = <DefaultCellWrapper style={cellStyles}>{signal.volume}</DefaultCellWrapper>;
                    cellsAggregated.volume = {
                        title: USER_SIGNALS_TITLES_SCHEME.volume.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                default:
                    if (Object.prototype.hasOwnProperty.call(signal, key)) {
                        innerComponent = <DefaultCellWrapper style={cellStyles}>{signal[key]}</DefaultCellWrapper>;
                        cellsAggregated[key] = {
                            title: USER_SIGNALS_TITLES_SCHEME[key].title,
                            notDesktopVal: innerComponent,
                            component: innerComponent
                        };
                    }
            }
            signalItem.cells.push(cellsAggregated[key]);
        });
        return signalItem;
    });
};

export const getSearchWhere = (value: string) => ({
    _or: [{ user: { name: { _like: `%${value}%` } } }, { robot: { name: { _like: `%${value}%` } } }]
});
