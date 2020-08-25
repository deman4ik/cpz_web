import { DefaultCellWrapper } from "components/basic/SearchTable/components/cells";
import React from "react";

export const USER_SIGNALS_TITLES_SCHEME = {
    signal_robot: {
        title: "Signal Robot"
    },
    user: {
        title: "User"
    },
    subscribe_at: {
        title: "Subscribed"
    },
    volume: {
        title: "Volume"
    }
};

export const COLUMNS_WIDTH = ["30%", "30%", "30%", "10%"];

/*HEAD TITLES*/
export const HEADER_TABLE_DATA = Object.keys(USER_SIGNALS_TITLES_SCHEME).map((key) => ({
    text: USER_SIGNALS_TITLES_SCHEME[key].title
}));

export const REACT_TABLE_COLUMNS = Object.entries(USER_SIGNALS_TITLES_SCHEME).map(([key, val]) => ({
    Header: val.title,
    accessor: key,
    Cell: ({ value: { children, style } }) => <DefaultCellWrapper style={style}>{children}</DefaultCellWrapper>,
    sortType: (a, b) => {
        console.log(a, b);
        return a.sortByVal > b.sortByVal ? -1 : 1;
    }
}));
