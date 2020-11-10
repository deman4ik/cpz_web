import React from "react";
//utils
import { STATUS_COLORS } from "config/constants";
import { buildRobotChartCell } from "components/pages/ManagePage/utils";

export const BACKTESTS_TABLE_COLUMNS = [
    {
        Header: "Back Test Info",
        id: "backtest_info",
        disableSortBy: false,
        columns: [
            {
                Header: "Robot ID",
                accessor: "robot_id",
                isVisible: true,
                width: 262
            },
            {
                Header: "Robot Name",
                accessor: "name",
                isVisible: true,
                width: 262
            },
            {
                Header: "ID",
                accessor: "id",
                isVisible: true,
                width: 262
            },
            {
                Header: "Asset",
                accessor: "asset",
                isVisible: true,
                width: 80
            },
            {
                Header: "Strategy",
                accessor: "strategy",
                isVisible: true,
                width: 180
            },
            {
                Header: "Time Frame",
                accessor: "timeframe",
                isVisible: true,
                width: 130
            },
            {
                Header: "Exchange",
                accessor: "exchange",
                isVisible: true,
                width: 100
            },
            {
                Header: "Status",
                accessor: "status",
                isVisible: true,
                Cell: ({ value }: { value: number }): JSX.Element => (
                    <div style={{ color: STATUS_COLORS[value] }}>{value}</div>
                ),
                width: 100
            }
        ]
    },
    {
        Header: "Statistics",
        id: "statistics",
        disableSortBy: true,
        columns: [
            {
                Header: "Performance",
                accessor: "performance",
                isVisible: true,
                Cell: buildRobotChartCell,
                sortSchema: { field: "stats", subfield: "equity_avg" },
                width: 200
            },
            {
                Header: "Profit",
                accessor: "profit",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "net_profit" },
                width: 90
            },
            {
                Header: "W/R",
                accessor: "winRate",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "win_rate" },
                width: 90
            },
            {
                Header: "Max Drawdown",
                accessor: "maxDrawdown",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "max_drawdown" },
                width: 125
            },
            {
                Header: "Trades",
                accessor: "tradesCount",
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 90
            }
        ]
    }
];
