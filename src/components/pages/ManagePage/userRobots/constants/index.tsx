import React from "react";
// components
import { DefaultCellWrapper, RobotChartCell } from "components/basic/SearchTable/components/cells";
import { DefaultNotDesktopView } from "components/basic/SearchTable/components/notDesktop";

export const TITLES_SCHEME = {
    user: {
        title: "User Info",
        name: "Name: ",
        id: "ID: "
    },
    robot: {
        title: "Robot Info",
        name: "Name: ",
        id: "ID: ",
        volume: "Volume: "
    },
    statistics: {
        title: "Statistics"
    },
    activity: {
        title: "Activity",
        status: "Status: ",
        date: "Created: "
    }
};

export const COLUMNS_WIDTH = ["25%", "20%", "30%", "20%"];

/*HEAD TITLES*/
export const TABLE_HEADER_DATA = Object.keys(TITLES_SCHEME).map((key) => ({
    text: TITLES_SCHEME[key].title
}));
