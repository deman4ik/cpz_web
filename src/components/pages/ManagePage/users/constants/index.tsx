import React from "react";
import { ColumnsArraySchema, buildCheckBoxCell } from "../../utils";

export const USERS_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "Account Info",
        id: "account_info",
        disableSortBy: true,
        columns: [
            {
                Header: "Name",
                accessor: "name",
                isVisible: true,
                width: 130
            },
            {
                Header: "ID",
                accessor: "id",
                isVisible: true,
                width: 190
            },
            {
                Header: "Email",
                accessor: "email",
                isVisible: true,
                width: 250
            },
            {
                Header: "Status",
                accessor: "status",
                isVisible: true,
                width: 85
            },
            {
                Header: "Roles",
                accessor: "roles",
                isVisible: true,
                Cell: ({ value }) => (
                    <div>
                        <div>{value.default}</div>
                        <div>[ {value.allowed.join(", ")} ]</div>
                    </div>
                )
            },
            {
                Header: "Created",
                accessor: "created_at",
                isVisible: true,
                width: 180
            }
        ]
    },
    {
        Header: "Telegram account",
        id: "telegram_account",
        disableSortBy: true,
        columns: [
            {
                Header: "Username",
                accessor: "telegram_username",
                isVisible: true
            },
            {
                Header: "ID",
                accessor: "telegram_id",
                isVisible: true
            }
        ]
    },
    {
        Header: "Entries",
        id: "entries",
        disableSortBy: true,
        columns: [
            {
                Header: "Robots",
                accessor: "user_robots",
                isVisible: true,
                width: 85
            },
            {
                Header: "Signals",
                accessor: "user_signals",
                isVisible: true,
                width: 85
            },
            {
                Header: "API Keys",
                accessor: "user_api_keys",
                isVisible: true,
                width: 85
            }
        ]
    },
    {
        Header: "Signals settings",
        id: "signals_settings",
        disableSortBy: true,
        columns: [
            {
                Header: "Email",
                accessor: "signals_email_notifications",
                isVisible: true,
                Cell: buildCheckBoxCell,
                width: 75
            },
            {
                Header: "Telegram",
                accessor: "signals_telegram_notifications",
                isVisible: true,
                Cell: buildCheckBoxCell,
                width: 95
            }
        ]
    },
    {
        Header: "Trading settings",
        id: "trading_settings",
        disableSortBy: true,
        columns: [
            {
                Header: "Email",
                accessor: "trading_email_notifications",
                isVisible: true,
                Cell: buildCheckBoxCell,
                width: 75
            },
            {
                Header: "Telegram",
                accessor: "trading_telegram_notifications",
                isVisible: true,
                Cell: buildCheckBoxCell,
                width: 95
            }
        ]
    }
];
