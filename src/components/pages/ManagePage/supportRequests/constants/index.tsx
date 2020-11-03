import { Button } from "components/basic";
import React from "react";
//utils
import { ColumnsArraySchema } from "../../utils";

export const USER_REQUESTS_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "User info",
        id: "user_info",
        columns: [
            { Header: "ID", accessor: "user_id" },
            {
                Header: "Name",
                accessor: "user_name"
            }
        ]
    },
    {
        Header: "Messages",
        id: "messages_info",
        columns: [
            {
                Header: "Time",
                accessor: "timestamp"
            },
            {
                Header: "Count",
                accessor: "messages_count"
            },
            {
                Header: "Last message",
                accessor: "message",
                Cell: () => <Button title="→" />
            }
        ]
    }
];
