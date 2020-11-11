import React from "react";
//utils
import { STATUS_COLORS } from "config/constants";
import { buildRobotChartCell } from "components/pages/ManagePage/utils";
import { formatDate } from "config/utils";

export const BACKTESTS_TABLE_COLUMNS = [
    {
        Header: "Robot Info",
        id: "robot_info",
        disableSortBy: false,
        columns: [
            {
                Header: "Robot ID",
                accessor: (v) => v.robot.id,
                isVisible: true,
                width: 262
            },
            {
                Header: "Robot Code",
                accessor: (v) => v.robot.code,
                isVisible: true,
                width: 262
            },
            {
                Header: "Availability",
                accessor: (v) => v.robot.available,
                isVisible: true,
                width: 100
            },
            {
                Header: "Status",
                accessor: (v) => v.robot.status,
                isVisible: true,
                Cell: ({ value }: { value: number }): JSX.Element => (
                    <div style={{ color: STATUS_COLORS[value] }}>{value}</div>
                ),
                width: 100
            }
        ]
    },
    {
        Header: "Back Test Info",
        id: "backtest_info",
        disableSortBy: false,
        columns: [
            {
                Header: "Date From",
                accessor: (v) => formatDate(v.date_from),
                isVisible: true,
                width: 200
            },
            {
                Header: "Date To",
                accessor: (v) => formatDate(v.date_to),
                isVisible: true,
                width: 200
            },
            {
                Header: "Completed",
                accessor: (v) => `${v.completed_percent}%`,
                isVisible: true,
                width: 100
            },
            {
                Header: "Processed Bars",
                accessor: "processed_bars",
                isVisible: true,
                width: 150
            },
            {
                Header: "Bars Left",
                accessor: "left_bars",
                isVisible: true,
                width: 100
            },
            {
                Header: "Total Bars",
                accessor: "total_bars",
                isVisible: true,
                width: 100
            },
            {
                Header: "Error",
                accessor: (v) => v.errors || "No errors",
                isVisible: true,
                width: 100
            },
            {
                Header: "Local",
                accessor: (v) => (v.settings.local ? "Yes" : "No"),
                isVisible: true,
                width: 100
            },
            {
                Header: "Asset",
                accessor: "asset",
                isVisible: true,
                width: 80
            },
            {
                Header: "Populate History",
                accessor: (v) => (v.settings.populateHistory ? "Yes" : "No"),
                isVisible: true,
                width: 150
            },
            {
                Header: "Save Logs",
                accessor: (v) => (v.settings.saveLogs ? "Yes" : "No"),
                isVisible: true,
                width: 150
            },
            {
                Header: "Save Positions",
                accessor: (v) => (v.settings.savePositions ? "Yes" : "No"),
                isVisible: true,
                width: 150
            },
            {
                Header: "Save Signals",
                accessor: (v) => (v.settings.saveSignals ? "Yes" : "No"),
                isVisible: true,
                width: 150
            },
            {
                Header: "Finished At",
                accessor: (v) => formatDate(v.finished_at),
                isVisible: true,
                width: 200
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
            },
            {
                Header: "Last Position Exit Date",
                accessor: (v) => formatDate(v.last_position_exit_date),
                isVisible: true,
                sortSchema: { field: "stats", subfield: "trades_count" },
                width: 250
            }
        ]
    }
];
