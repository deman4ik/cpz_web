/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { ColumnsSchema, buildRobotChartCell } from "../../utils";

export const TABLE_COLUMNS: ColumnsSchema = [
    {
        Header: "Activity",
        columns: [
            {
                Header: "Created",
                accessor: "created_at",
                width: 140
            },
            {
                Header: "Stopped",
                accessor: "stopped_at",
                width: 140
            },
            {
                Header: "Status",
                accessor: "status",
                width: 95
            }
        ]
    },
    {
        Header: "Robot Info",
        columns: [
            {
                Header: "Robot Code",
                accessor: "robot_code",
                orderSchema: { field: "robot", subfield: "name" },
                width: 150
            },
            {
                Header: "Robot ID",
                accessor: "robot_id",
                orderSchema: { field: "robot", subfield: "id" },
                isVisible: false,
                width: 180
            },
            {
                Header: "Volume",
                accessor: "volume",
                orderSchema: { field: "settings" },
                width: 95
            }
        ]
    },
    {
        Header: "Statistics",
        columns: [
            {
                Header: "Performance",
                accessor: "performance",
                orderSchema: { field: "equity" },
                width: 155,
                Cell: buildRobotChartCell
            },
            {
                Header: "Last Profit",
                accessor: "lastProfit",
                orderSchema: { field: "equity" },
                width: 115
            },
            {
                Header: "Profit",
                accessor: "profit",
                orderSchema: { field: "equity" },
                width: 90
            },
            {
                Header: "Trades",
                accessor: "tradesCount",
                orderSchema: { field: "equity" },
                width: 95
            },
            {
                Header: "W/R",
                accessor: "winRate",
                orderSchema: { field: "equity" },
                width: 80
            }
        ]
    },
    {
        Header: "User Info",
        columns: [
            {
                Header: "User Name",
                accessor: "user_name",
                orderSchema: { field: "user", subfield: "name" },
                width: 120
            },
            {
                Header: "User ID",
                accessor: "user_id",
                orderSchema: { field: "user", subfield: "id" },
                isVisible: false,
                width: 175
            }
        ]
    }
];
