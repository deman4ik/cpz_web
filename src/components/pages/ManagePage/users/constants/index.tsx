import React from "react";

/*Схема тайтлов для данных*/
export const USER_TITLES_SCHEME = {
    user: { title: "User" },
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
        text: USER_TITLES_SCHEME.user.title
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

export const COLUMNS_WIDTH = ["24%", "17%", "12%", "5%", "12%", "12%", "10%", "8%"];
