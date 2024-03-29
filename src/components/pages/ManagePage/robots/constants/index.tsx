import React from "react";
//utils
import { ColumnsArraySchema, buildRobotChartCell, buildDisabledCheckboxCell } from "components/pages/ManagePage/utils";
import { STATUS_COLORS } from "config/constants";
import { DynamicDataCell } from "components/pages/ManagePage/backtests/DynamicDataCell";

export const ROBOT_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "Robot Info",
        id: "robot_info",
        disableSortBy: true,
        columns: [
            {
                Header: "Code",
                accessor: "name",
                width: 262
            },
            {
                Header: "ID",
                accessor: "id",
                width: 262
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: ({ value }: { value: number }): JSX.Element => (
                    <div style={{ color: STATUS_COLORS[value] }}>{value}</div>
                ),
                width: 100
            },
            {
                Header: "Availability",
                accessor: "available",
                width: 150
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
                Cell: buildRobotChartCell,
                fieldSchema: { field: "stats", subfield: "equity_avg" },
                width: 200
            },
            {
                Header: "Profit",
                accessor: "profit",
                fieldSchema: { field: "stats", subfield: "net_profit" },
                width: 90
            },
            {
                Header: "W/R",
                accessor: "winRate",
                fieldSchema: { field: "stats", subfield: "win_rate" },
                width: 90
            },
            {
                Header: "Max Drawdown",
                accessor: "maxDrawdown",
                fieldSchema: { field: "stats", subfield: "max_drawdown" },
                width: 125
            },
            {
                Header: "Trades",
                accessor: "tradesCount",
                fieldSchema: { field: "stats", subfield: "trades_count" },
                width: 90
            }
        ]
    },
    {
        Header: "Settings",
        id: "settings",
        disableSortBy: true,
        columns: [
            {
                Header: "Volume",
                accessor: "volume",
                fieldSchema: { field: "robot_settings", subfield: "robot_settings" },
                width: 100
            },
            {
                Header: "Amount Type",
                accessor: "volumeType",
                width: 120
            },
            {
                Header: "Strategy Settings",
                accessor: "strategy_settings",
                Cell: ({ value }: { value: any }): JSX.Element => <DynamicDataCell value={value} />,
                width: 250
            }
        ]
    },
    {
        Header: "Types",
        id: "types",
        disableSortBy: true,
        columns: [
            {
                Header: "Signals",
                accessor: "signals",
                Cell: buildDisabledCheckboxCell,
                width: 90
            },
            {
                Header: "Trading",
                accessor: "trading",
                Cell: buildDisabledCheckboxCell,
                width: 90
            }
        ]
    },
    {
        Header: "Entries",
        id: "entries",
        disableSortBy: true,
        columns: [
            {
                Header: "Robots",
                accessor: "user_robots",
                fieldSchema: { field: "user_robots_aggregate", subfield: "count" },
                width: 90
            },
            {
                Header: "Signals",
                accessor: "user_signals",
                fieldSchema: { field: "user_signals_aggregate", subfield: "count" },
                width: 90
            }
        ]
    }
];
