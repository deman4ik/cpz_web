/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { Button } from "components/basic";
//utils
import { ColumnsArraySchema } from "../../utils";

export const USER_REQUESTS_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "User info",
        id: "user_info",
        columns: [
            { Header: "ID", accessor: "user_id", isVisible: true },
            {
                Header: "Name",
                accessor: "user_name",
                isVisible: true
            }
        ]
    },
    {
        Header: "Messages",
        id: "messages_info",
        columns: [
            {
                Header: "Time",
                accessor: "timestamp",
                isVisible: true
            },
            {
                Header: "Count",
                accessor: "messages_count",
                isVisible: true
            },
            {
                Header: "Last message",
                accessor: "message",
                isVisible: true,
                Cell: ({
                    cell: {
                        row: {
                            original: { user_id }
                        }
                    }
                }) => (
                    <Button
                        title="→"
                        onClick={() => {
                            console.log(user_id);
                            //Router.push(`/manage/support/${user_id}`);
                        }}
                    />
                )
            }
        ]
    }
];
