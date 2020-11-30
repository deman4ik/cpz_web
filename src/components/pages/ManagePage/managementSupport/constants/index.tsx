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
            {
                Header: "ID",
                accessor: "id",
                width: 310,
                fieldSchema: { field: "user", subfield: "id" }
            },
            {
                Header: "Name",
                accessor: "name",
                fieldSchema: { field: "user", subfield: "name" }
            }
        ]
    },
    {
        Header: "Messages",
        id: "messages_info",
        columns: [
            {
                Header: "Count",
                accessor: "messages_count",
                width: 80
            },
            {
                Header: "Time",
                accessor: "timestamp",
                width: 175,
                fieldSchema: { field: "lastMessage", subfield: "timestamp" }
            },
            {
                Header: "Last message",
                accessor: "message",
                width: 450,
                fieldSchema: { field: "lastMessage", subfield: "data" },
                Cell: ({
                    cell: {
                        row: {
                            original: { id }
                        }
                    },
                    value
                }) => {
                    return (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                            <div
                                style={{
                                    backgroundColor: "var(--lightBg)",
                                    width: "80%",
                                    height: "100%",
                                    borderRadius: "2px",
                                    padding: "8px"
                                }}>
                                {value}
                            </div>
                            <div>
                                <a href={`/manage/support/${id}`}>
                                    <Button title="Reply" type="primary" />
                                </a>
                            </div>
                        </div>
                    );
                }
            }
        ]
    }
];
