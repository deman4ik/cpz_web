export const TITLES_SCHEME = {
    robot: {
        title: "Robot Info",
        name: "Name: ",
        id: "ID: ",
        volume: "Volume: "
    },
    user: {
        title: "User Info",
        name: "Name: ",
        id: "ID: "
    },
    performance: {
        title: "Performance"
    },
    statistics: {
        title: "Statistics",
        stats: {
            profit: "Profit: ",
            winRate: "Win Rate: ",
            maxDrawdown: "Max Drawdon: ",
            tradesCount: "Trades count: "
        }
    },
    activity: {
        title: "Activity",
        status: "Status: ",
        date: "Created: "
    }
};

export const COLUMNS_WIDTH = ["27.5%", "27.5%", "15%", "15%", "15%"];

/*HEAD TITLES*/
export const TABLE_HEADER_DATA = Object.keys(TITLES_SCHEME).map((key) => ({
    text: TITLES_SCHEME[key].title
}));
