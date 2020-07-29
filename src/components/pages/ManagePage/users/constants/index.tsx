import React from "react";

/*Схема тайтлов для данных*/
export const USER_TITLES_SCHEME = {
    id: { title: "ID" },
    name: { title: "Name" },
    email: { title: "Email" },
    telegram: {
        title: "Telegram",
        telegram_username: "Username:",
        telegram_id: "Id:"
    },
    status: { title: "Status" },
    roles: {
        title: "Roles",
        defaultRole: "Default:",
        allowedRoles: "Allowed:"
    },
    created_at: { title: "Created" },
    entries: {
        title: "Entries",
        user_robots: "Robots: ",
        user_signals: "Signals: ",
        user_exchange_accs: "API Keys: "
    },
    settings: {
        title: "Settings",
        notifications: "Signals: ",
        trading: "Trading: "
    }
};

export const CENTRED_CELL: React.CSSProperties = { textAlign: "center" };

export const HEADER_TABLE_DATA = [
    {
        text: USER_TITLES_SCHEME.id.title
    },
    {
        text: USER_TITLES_SCHEME.name.title
    },
    {
        text: USER_TITLES_SCHEME.email.title
    },
    {
        text: USER_TITLES_SCHEME.telegram.title
    },
    {
        text: USER_TITLES_SCHEME.status.title
    },
    {
        text: USER_TITLES_SCHEME.roles.title
    },
    {
        text: USER_TITLES_SCHEME.created_at.title
    },
    {
        text: USER_TITLES_SCHEME.entries.title
    },
    {
        text: USER_TITLES_SCHEME.settings.title
    }
];

export const COLUMNS_WIDTH = ["17%", "10%", "16.02%", "10%", "6.5%", "11%", "11%", "7%", "10.02%"];

export const REGEXS = {
    telegram_id: /^\d{9}/g,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
};
