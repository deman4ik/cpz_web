export const USER_SIGNALS_HEADERS_SCHEMA = {
    robot_code: {
        Header: "Robot Code",
        width: 262,
        orderSchema: { field: "robot", subfield: "code" },
        visible: true
    },
    id: {
        Header: "Signal ID",
        width: 324,
        visible: true
    },
    user_name: {
        Header: "User",
        width: 152,
        orderSchema: { field: "user", subfield: "name" },
        visible: true
    },
    user_id: {
        Header: "User ID",
        width: 324,
        orderSchema: { field: "user", subfield: "id" },
        visible: true
    },
    subscribed_at: {
        Header: "Subscribed",
        width: 190,
        visible: true
    },
    volume: {
        Header: "Volume",
        width: 125,
        visible: true
    }
};

export const REACT_TABLE_COLUMNS = Object.entries(USER_SIGNALS_HEADERS_SCHEMA).map(([key, val]) => ({
    ...val,
    accessor: key
}));
