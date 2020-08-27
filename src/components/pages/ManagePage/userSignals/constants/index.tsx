const id_widths = {
    minWidth: 125,
    width: 175,
    maxWidth: 220
};
const val_widths = {
    minWidth: 100,
    width: 120,
    maxWidth: 150
};
export const USER_SIGNALS_TITLES_SCHEME = {
    signal_robot: {
        ...id_widths,
        Header: "Signal Robot",
        disableFilters: true
    },
    robot_id: {
        ...id_widths,
        Header: "Robot ID",
        disableFilters: true
    },
    user: {
        ...val_widths,
        Header: "User",
        disableFilters: true
    },
    user_id: {
        ...id_widths,
        Header: "User ID",
        disableFilters: true
    },
    subscribe_at: {
        ...val_widths,
        Header: "Subscribed",
        disableFilters: true,
        sortType: (rowA, rowB, id) => {
            return new Date(rowA.values[id]) > new Date(rowB.values[id]) ? -1 : 1;
        }
    },
    volume: {
        ...val_widths,
        Header: "Volume",
        filter: "between",
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
