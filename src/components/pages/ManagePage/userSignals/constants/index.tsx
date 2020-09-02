import { ColumnsSchema } from "../../utils";

export const TABLE_COLUMNS: ColumnsSchema = [
    {
        Header: "Robot",
        columns: [
            {
                Header: "Code",
                accessor: "robot_code",
                width: 262,
                orderSchema: { field: "robot", subfield: "code" }
            }
        ]
    },
    {
        Header: "Signal",
        columns: [
            {
                Header: "ID",
                accessor: "id",
                width: 324
            }
        ]
    },
    {
        Header: "User",
        columns: [
            {
                Header: "Name",
                accessor: "user_name",
                width: 152,
                orderSchema: { field: "user", subfield: "name" }
            },
            {
                Header: "ID",
                accessor: "user_id",
                width: 324,
                orderSchema: { field: "user", subfield: "id" }
            }
        ]
    },
    {
        Header: "Info",
        columns: [
            {
                Header: "Subscribed",
                accessor: "subscribed_at",
                width: 190
            },
            {
                Header: "Volume",
                accessor: "volume",
                width: 125
            }
        ]
    }
];
