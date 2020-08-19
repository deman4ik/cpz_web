/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
// components
import { DefaultCellWrapper } from "components/basic/SearchTable/components/cells";
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
                case "signal_robot":
                    innerComponent = (
                        <DefaultCellWrapper style={{ ...cellStyles }}>
                            <p>{signal.robot.code}</p>
                            <p>
                                <span>{signal.id}</span>
                            </p>
                        </DefaultCellWrapper>
                    );
                    cellsAggregated.signal_robot = {
                        title: USER_SIGNALS_TITLES_SCHEME.signal_robot.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "user":
                    innerComponent = (
                        <DefaultCellWrapper style={cellStyles}>
                            {signal?.user?.name && <p>{signal.user.name}</p>}
                            <p>
                                <span>{signal.user.id}</span>
                            </p>
                        </DefaultCellWrapper>
                    );
                    cellsAggregated.user = {
                        title: USER_SIGNALS_TITLES_SCHEME.user.title,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "subscribe_at":
                    innerComponent = (
                        <DefaultCellWrapper style={cellStyles}>{formatDate(signal.subscribed_at)}</DefaultCellWrapper>
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
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
