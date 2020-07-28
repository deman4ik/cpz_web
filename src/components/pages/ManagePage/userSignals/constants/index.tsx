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
