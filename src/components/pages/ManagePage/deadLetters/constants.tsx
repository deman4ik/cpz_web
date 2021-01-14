import React from "react";
import { DynamicDataCell } from "../backtests/DynamicDataCell";
import { ColumnsArraySchema } from "../utils";

export const DEAD_LETTERS_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "Meta",
        id: "meta",
        columns: [
            {
                Header: "ID",
                accessor: "id"
            },
            {
                Header: "Created at",
                accessor: "created_at"
            },
            {
                Header: "Updated at",
                accessor: "updated_at"
            }
        ]
    },
    {
        Header: "Event Info",
        id: "event_info",
        columns: [
            {
                Header: "Event ID",
                accessor: "event_id"
            },
            {
                Header: "Processed",
                accessor: "processed"
            },
            {
                Header: "Resent",
                accessor: "resend"
            },
            {
                Header: "Topic",
                accessor: "topic"
            },
            {
                Header: "Timestamp",
                accessor: "timestamp"
            },
            {
                Header: "Type",
                accessor: "type"
            },
            {
                Header: "Data",
                accessor: "data",
                Cell: ({ value }: { value: any }): JSX.Element => <DynamicDataCell value={value} />
            }
        ]
    }
];
