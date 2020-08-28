export const USER_SIGNALS_TITLES_SCHEME = {
    signal_robot: {
        Header: "Signal Robot"
    },
    robot_id: {
        Header: "Robot ID"
    },
    user: {
        Header: "User"
    },
    user_id: {
        Header: "User ID"
    },
    subscribe_at: {
        Header: "Subscribed",
        sortType: (rowA, rowB, id) => {
            return new Date(rowA.values[id]) > new Date(rowB.values[id]) ? -1 : 1;
        }
    },
    volume: {
        Header: "Volume",
        sortType: "basic"
    }
};

export const COLUMNS_WIDTH = ["20%", "20%", "10%", "25%", "15%", "10%"];

/*HEAD TITLES*/
export const HEADER_TABLE_DATA = Object.keys(USER_SIGNALS_TITLES_SCHEME).map((key) => ({
    text: USER_SIGNALS_TITLES_SCHEME[key].Header
}));

export const REACT_TABLE_COLUMNS = Object.entries(USER_SIGNALS_TITLES_SCHEME).map(([key, val]) => ({
    ...val,
    accessor: key
}));
