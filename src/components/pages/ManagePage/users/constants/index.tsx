import React from "react";

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
        user_exchange_accs: "Exchange: "
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
