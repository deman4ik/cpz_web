export const USER_SIGNALS_HEADERS_SCHEME = {
    signal_robot: {
        Header: "Signal Robot",
        width: 262
    },
    robot_id: {
        Header: "Robot ID",
        width: 324
    },
    user: {
        Header: "User",
        width: 152
    },
    user_id: {
        Header: "User ID",
        width: 324
    },
    subscribed_at: {
        Header: "Subscribed",
        width: 190
    },
    volume: {
        Header: "Volume",
        width: 125
    }
};

export const COLUMNS_WIDTH = ["20%", "20%", "10%", "25%", "15%", "10%"];

/*HEAD TITLES*/
export const HEADER_TABLE_DATA = Object.keys(USER_SIGNALS_HEADERS_SCHEME).map((key) => ({
    text: USER_SIGNALS_HEADERS_SCHEME[key].Header
}));

export const REACT_TABLE_COLUMNS = Object.entries(USER_SIGNALS_HEADERS_SCHEME).map(([key, val]) => ({
    ...val,
    accessor: key
}));
