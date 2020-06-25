/*Схема тайтлов для данных*/
import React from "react";

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

export const COLUMNS_WIDTH = ["10.5%", "13%", "13.07%", "12%", "14%", "15.02%", "9%", "4.5%", "9%"];
