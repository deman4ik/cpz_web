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
            { Header: "ID", accessor: "id", isVisible: true, width: 310 },
            {
                Header: "Name",
                accessor: "name",
                isVisible: true
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
                isVisible: true,
                width: 80
            },
            {
                Header: "Time",
                accessor: "timestamp",
                isVisible: true,
                width: 175,
                orderSchema: { field: "messages", subfield: "timestamp" }
            },
            {
                Header: "Last message",
                accessor: "message",
                isVisible: true,
                width: 450,
                orderSchema: { field: "messages", subfield: "data" },
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
