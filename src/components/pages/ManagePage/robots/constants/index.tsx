import React from "react";
//utils
import { ColumnsArraySchema, buildRobotChartCell, buildCheckBoxCell } from "../../utils";
import { STATUS_COLORS } from "config/constants";

export const ROBOT_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "Robot Info",
        id: "robot_info",
        disableSortBy: true,
        columns: [
            {
                Header: "Code",
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
                Header: "Status",
                accessor: "status",
                isVisible: true,
                Cell: ({ value }) => <div style={{ color: STATUS_COLORS[value] }}>{value}</div>,
                width: 100
            },
            {
                Header: "Availability",
                accessor: "available",
                isVisible: true,
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
                isVisible: true,
                Cell: buildRobotChartCell,
                orderSchema: { field: "equity" },
                width: 200
            },
            {
                Header: "Profit",
                accessor: "profit",
                isVisible: true,
                orderSchema: { field: "equity" },
                width: 90
            },
            {
                Header: "W/R",
                accessor: "winRate",
                isVisible: true,
                orderSchema: { field: "equity" },
                width: 90
            },
            {
                Header: "Max Drawdown",
                accessor: "maxDrawdown",
                isVisible: true,
                orderSchema: { field: "equity" },
                width: 125
            },
            {
                Header: "Trades",
                accessor: "tradesCount",
                isVisible: true,
                orderSchema: { field: "equity" },
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
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Max Bars",
                accessor: "requiredHistoryMaxBars",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Sma Size",
                accessor: "smaSize",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Dist Init",
                accessor: "distInit",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Lookback",
                accessor: "lookback",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Atr. Period",
                accessor: "atrPeriod",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Adjustment",
                accessor: "adjustment",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Adx High",
                accessor: "adxHigh",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Adx Period",
                accessor: "adxPeriod",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Trail Bars",
                accessor: "trailBars",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Adx",
                accessor: "adx",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Tick",
                accessor: "tick",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Ratio",
                accessor: "ratio",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Series Size",
                accessor: "seriesSize",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Order Stop Loss",
                accessor: "orderStopLoss",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
            },
            {
                Header: "Order Take Profit",
                accessor: "orderTakeProfit",
                isVisible: false,
                orderSchema: { field: "settings" },
                width: 100
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
                isVisible: true,
                Cell: buildCheckBoxCell,
                width: 90
            },
            {
                Header: "Trading",
                accessor: "trading",
                isVisible: true,
                Cell: buildCheckBoxCell,
                width: 90
            }
        ]
    },
    {
        // TODO: update order schema for these fields
        Header: "Entries",
        id: "entries",
        disableSortBy: true,
        columns: [
            {
                Header: "Robots",
                accessor: "user_robots",
                isVisible: true,
                orderSchema: { field: "user_robots_aggregate", subfield: "count" },
                width: 90
            },
            {
                Header: "Signals",
                accessor: "user_signals",
                isVisible: true,
                orderSchema: { field: "user_signals_aggregate", subfield: "count" },
                width: 90
            }
        ]
    }
];
