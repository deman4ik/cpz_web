/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
// components
import { DefaultCellWrapper } from "components/basic/SearchTable/components/cells";
import { DefaultNotDesktopView } from "components/basic/SearchTable/components/notDesktop";
// constants
import { USER_SIGNALS_HEADERS_SCHEME } from "../constants";
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
        Object.keys(USER_SIGNALS_HEADERS_SCHEME).forEach((key) => {
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
                        title: USER_SIGNALS_HEADERS_SCHEME.signal_robot.Header,
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
                        title: USER_SIGNALS_HEADERS_SCHEME.user.Header,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "subscribe_at":
                    innerComponent = (
                        <DefaultCellWrapper style={cellStyles}>{formatDate(signal.subscribed_at)}</DefaultCellWrapper>
                    );
                    cellsAggregated.subscribe_at = {
                        title: USER_SIGNALS_HEADERS_SCHEME.subscribe_at.Header,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                case "volume":
                    innerComponent = <DefaultCellWrapper style={cellStyles}>{signal.volume}</DefaultCellWrapper>;
                    cellsAggregated.volume = {
                        title: USER_SIGNALS_HEADERS_SCHEME.volume.Header,
                        component: innerComponent,
                        notDesktopVal: innerComponent
                    };
                    break;
                default:
                    if (Object.prototype.hasOwnProperty.call(signal, key)) {
                        innerComponent = <DefaultCellWrapper style={cellStyles}>{signal[key]}</DefaultCellWrapper>;
                        cellsAggregated[key] = {
                            title: USER_SIGNALS_HEADERS_SCHEME[key].Header,
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

export const rtUserSignalsFormat = (data: Array<any>) => {
    return data.map((signal) => {
        const row = {};
        Object.defineProperty(row, "signal_robot", { value: signal.robot.code, writable: false });
        Object.defineProperty(row, "robot_id", { value: signal.id, writable: false });
        Object.defineProperty(row, "user", { value: signal?.user?.name, writable: false });
        Object.defineProperty(row, "user_id", { value: signal.user.id, writable: false });
        Object.defineProperty(row, "subscribed_at", { value: formatDate(signal.subscribed_at), writable: false });
        Object.defineProperty(row, "volume", { value: parseFloat(signal.volume), writable: false });
        return row;
    });
};

export const getSearchWhere = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
