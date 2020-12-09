import { ColumnsArraySchema } from "../../utils";

export const USER_SIGNALS_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "Robot",
        id: "robot",
        disableSortBy: true,
        columns: [
            {
                Header: "Code",
                accessor: "robot_code",
                width: 262,
                fieldSchema: { field: "robot", subfield: "code" }
            }
        ]
    },
    {
        Header: "Signal",
        id: "signal",
        disableSortBy: true,
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
        id: "user",
        disableSortBy: true,
        columns: [
            {
                Header: "Name",
                accessor: "user_name",
                width: 152,
                fieldSchema: { field: "user", subfield: "name" }
            },
            {
                Header: "ID",
                accessor: "user_id",
                width: 324,
                fieldSchema: { field: "user", subfield: "id" }
            }
        ]
    },
    {
        Header: "Info",
        id: "info",
        disableSortBy: true,
        columns: [
            {
                Header: "Subscribed",
                accessor: "subscribed_at",
                width: 190
            },
            {
                Header: "Volume",
                accessor: "volume",
                width: 125,
                fieldSchema: { field: "user_signal_settings", subfield: "signal_settings" }
            },
            {
                Header: "Volume Type",
                accessor: "volumeType",
                width: 140,
                fieldSchema: { field: "user_signal_settings", subfield: "signal_settings" }
            }
        ]
    }
];
