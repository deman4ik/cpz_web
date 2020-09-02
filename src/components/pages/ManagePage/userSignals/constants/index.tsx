export const USER_SIGNALS_HEADERS_SCHEMA = {
    robot_code: {
        Header: "Robot Code",
        width: 262,
        orderSchema: { field: "robot", subfield: "code" },
        isVisible: true
    },
    id: {
        Header: "Signal ID",
        width: 324,
        isVisible: true
    },
    user_name: {
        Header: "User",
        width: 152,
        orderSchema: { field: "user", subfield: "name" },
        isVisible: true
    },
    user_id: {
        Header: "User ID",
        width: 324,
        orderSchema: { field: "user", subfield: "id" },
        isVisible: true
    },
    subscribed_at: {
        Header: "Subscribed",
        width: 190,
        isVisible: true
    },
    volume: {
        Header: "Volume",
        width: 125,
        isVisible: true
    }
};

export const TABLE_DATA_COLUMNS = Object.entries(USER_SIGNALS_HEADERS_SCHEMA).map(([key, val]) => ({
    ...val,
    accessor: key
}));
