import React from "react";
import { DynamicDataCell } from "../backtests/DynamicDataCell";
import { ColumnsArraySchema } from "../utils";

export const ERROR_EVENTS_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "Meta",
        id: "meta",
        columns: [
            {
                Header: "ID",
                accessor: "id",
                width: 200
            },
            {
                Header: "Created at",
                accessor: "created_at",
                width: 230
            },
            {
                Header: "Updated at",
                accessor: "updated_at",
                width: 230
            }
        ]
    },
    {
        Header: "Event Info",
        id: "event_info",
        columns: [
            {
                Header: "Event ID",
                accessor: "event_id",
                width: 230
            },
            {
                Header: "Topic",
                accessor: "topic",
                width: 270
            },
            {
                Header: "Timestamp",
                accessor: "timestamp",
                width: 220
            },
            {
                Header: "Type",
                accessor: "type",
                width: 365
            },
            {
                Header: "Data",
                accessor: "data",
                width: 400,
                Cell: ({ value }: { value: any }): JSX.Element => <DynamicDataCell value={value} />
            }
        ]
    }
];
