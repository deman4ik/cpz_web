/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { ColumnsArraySchema, buildRobotChartCell } from "../../utils";

import { STATUS_COLORS } from "config/constants";

export const USER_ROBOTS_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "Activity",
        id: "activity",
        disableSortBy: true,
        columns: [
            {
                Header: "Created",
                accessor: "created_at",
                isVisible: true,
                width: 140
            },
            {
                Header: "Stopped",
                accessor: "stopped_at",
                isVisible: true,
                width: 140
            },
            {
                Header: "Status",
                accessor: "status",
                isVisible: true,
                Cell: ({ value }) => <div style={{ color: STATUS_COLORS[value] }}>{value}</div>,
                width: 95
            }
        ]
    },
    {
        Header: "Robot Info",
        id: "robot_info",
        disableSortBy: true,
        columns: [
            {
                Header: "Robot Code",
                accessor: "robot_code",
                isVisible: true,
                orderSchema: { field: "robot", subfield: "name" },
                width: 150
            },
            {
                Header: "Robot ID",
                accessor: "robot_id",
                isVisible: true,
                orderSchema: { field: "robot", subfield: "id" },
                width: 180
            },
            {
                Header: "Volume",
                accessor: "volume",
                isVisible: true,
                orderSchema: { field: "settings" },
                width: 95
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
                orderSchema: { field: "stats" },
                width: 155,
                Cell: buildRobotChartCell
            },
            {
                Header: "Last Profit",
                accessor: "lastProfit",
                isVisible: true,
                orderSchema: { field: "stats" },
                width: 115
            },
            {
                Header: "Profit",
                accessor: "profit",
                isVisible: true,
                orderSchema: { field: "stats" },
                width: 90
            },
            {
                Header: "Trades",
                accessor: "tradesCount",
                isVisible: true,
                orderSchema: { field: "stats" },
                width: 95
            },
            {
                Header: "W/R",
                accessor: "winRate",
                isVisible: true,
                orderSchema: { field: "stats" },
                width: 80
            }
        ]
    },
    {
        Header: "User Info",
        id: "user_info",
        disableSortBy: true,
        columns: [
            {
                Header: "User Name",
                accessor: "user_name",
                isVisible: true,
                orderSchema: { field: "user", subfield: "name" },
                width: 120
            },
            {
                Header: "User ID",
                accessor: "user_id",
                isVisible: true,
                orderSchema: { field: "user", subfield: "id" },
                width: 175
            }
        ]
    }
];
