export const USER_SIGNALS_TITLES_SCHEME = {
    id: {
        title: "Signal ID"
    },
    code: {
        title: "Code"
    },
    user_name: {
        title: "User Name"
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

export const COLUMNS_WIDTH = ["20.6%", "18.6%", "10.6%", "22.6%", "16.6%", "10.6%"];

/*HEAD TITLES*/
export const HEADER_TABLE_DATA = Object.keys(USER_SIGNALS_TITLES_SCHEME).map((key) => ({
    text: USER_SIGNALS_TITLES_SCHEME[key].title
}));
