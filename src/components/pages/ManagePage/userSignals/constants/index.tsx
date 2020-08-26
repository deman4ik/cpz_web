export const USER_SIGNALS_TITLES_SCHEME = {
    signal_robot: {
        title: "Signal Robot"
    },
    robot_id: {
        title: "Robot ID"
    },
    user: {
        title: "User"
    },
    user_id: {
        title: "User ID"
    },
    subscribe_at: {
        title: "Subscribed"
    },
    volume: {
        title: "Volume"
    }
};

export const COLUMNS_WIDTH = ["20%", "20%", "10%", "25%", "15%", "10%"];

/*HEAD TITLES*/
export const HEADER_TABLE_DATA = Object.keys(USER_SIGNALS_TITLES_SCHEME).map((key) => ({
    text: USER_SIGNALS_TITLES_SCHEME[key].title
}));

export const REACT_TABLE_COLUMNS = Object.entries(USER_SIGNALS_TITLES_SCHEME).map(([key, val]) => ({
    Header: val.title,
    accessor: key
}));
