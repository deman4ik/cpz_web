import { ColumnsArraySchema } from "../../utils";

export const USER_SIGNALS_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "Robot",
        disableSortBy: true,
        columns: [
            {
                Header: "Code",
                accessor: "robot_code",
                isVisible: true,
                width: 262,
                orderSchema: { field: "robot", subfield: "code" }
            }
        ]
    },
    {
        Header: "Signal",
        disableSortBy: true,
        columns: [
            {
                Header: "ID",
                accessor: "id",
                isVisible: true,
                width: 324
            }
        ]
    },
    {
        Header: "User",
        disableSortBy: true,
        columns: [
            {
                Header: "Name",
                accessor: "user_name",
                isVisible: true,
                width: 152,
                orderSchema: { field: "user", subfield: "name" }
            },
            {
                Header: "ID",
                accessor: "user_id",
                isVisible: true,
                width: 324,
                orderSchema: { field: "user", subfield: "id" }
            }
        ]
    },
    {
        Header: "Info",
        disableSortBy: true,
        columns: [
            {
                Header: "Subscribed",
                accessor: "subscribed_at",
                isVisible: true,
                width: 190
            },
            {
                Header: "Volume",
                accessor: "volume",
                isVisible: true,
                width: 125
            }
        ]
    }
];
