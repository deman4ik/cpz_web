import React from "react";
import exp from "constants";

/*Схема тайтлов для данных*/
export const USER_TITLES_SCHEME = {
    name: { title: "Name" },
    id: { title: "Id" },
    email: { title: "Email" },
    telegram: {
        title: "Telegram",
        telegram_username: "Username:",
        telegram_id: "Id:"
    },
    roles: {
        title: "Roles",
        defaultRole: "Default:",
        allowedRoles: "Allowed:"
    },
    settings: {
        title: "Settings",
        notifications: "Notifications Signals: ",
        trading: "Trading: "
    },
    entries: {
        title: "Entries",
        user_robots: "Robots: ",
        user_signals: "Signals: ",
        user_exchange_accs: "Keys: "
    },
    status: { title: "Status" },
    created_at: { title: "Created" }
};

export const CENTRED_CELL: React.CSSProperties = { textAlign: "center" };

export const HEADER_TABLE_DATA = [
    {
        text: USER_TITLES_SCHEME.name.title
    },
    {
        text: USER_TITLES_SCHEME.id.title
    },
    {
        text: USER_TITLES_SCHEME.email.title
    },
    {
        text: USER_TITLES_SCHEME.telegram.title
    },
    {
        text: USER_TITLES_SCHEME.roles.title
    },
    {
        text: USER_TITLES_SCHEME.settings.title
    },
    {
        text: USER_TITLES_SCHEME.entries.title
    },
    {
        text: USER_TITLES_SCHEME.status.title
    },
    {
        text: <div style={CENTRED_CELL}> {USER_TITLES_SCHEME.created_at.title}</div>
    }
];

export const COLUMNS_WIDTH = ["10%", "13%", "14.02%", "12%", "14%", "15.02%", "9%", "4.5%", "9%"];

export const REGEXS = {
    telegram_id: /^\d{9}/g,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
};

/*filters and sort*/
export interface InitialFiltersInterface {
    order: {
        name: string | null;
        order_by: {} | { [key: string]: { count: string } };
    };
    filters: any;
}

/*filters*/
export const USERS_FILTERS_VARIANTS = {
    email: { email: { _is_null: false } },
    telegram: { telegram_id: { _is_null: false } },
    active: { status: { _eq: 1 } },
    notActive: { status: { _eq: 0 } },
    robots: { user_robots: { equity: { _is_null: false } } },
    signals: { user_signals: { equity: { _is_null: false } } },
    keys: { user_exchange_accs: { exchange: { _gt: "0" } } }
};

export const USERS_FILTERS = {
    contacts: {
        label: "Contacts:",
        filters: [
            {
                name: "With Email",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.email
            },
            {
                name: "With Telegram",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.telegram
            }
        ]
    },
    statuses: {
        label: "Status:",
        filters: [
            {
                name: "Active",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.active
            },
            {
                name: "Not Active",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.notActive
            }
        ]
    },
    user_stats: {
        label: "Stats:",
        filters: [
            {
                name: "With Robots",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.robots
            },
            {
                name: "With Signals",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.signals
            },
            {
                name: "With Keys",
                active: false,
                filterValue: USERS_FILTERS_VARIANTS.keys
            }
        ]
    }
};

/*filters initial state*/
export const INITIAL_FILTERS: InitialFiltersInterface = {
    order: {
        name: null,
        order_by: {}
    },
    filters: USERS_FILTERS
};
