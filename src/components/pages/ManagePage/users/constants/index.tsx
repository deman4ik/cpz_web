import { SET_USER_STATUS } from "graphql/manage/users/mutations";
import React from "react";
import { ColumnsArraySchema, buildDisabledCheckboxCell, CallMode, InputType } from "../../utils";

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
                width: 85,
                mutation: SET_USER_STATUS,
                mutationInputOptions: [
                    { label: "Blocked", value: -1 },
                    { label: "New", value: 0 },
                    { label: "Enabled", value: 1 }
                ],
                mutationInputType: InputType.select,
                mutationCallMode: CallMode.single
            },
            {
                Header: "Roles",
                accessor: "roles",
                isVisible: true,
                Cell: ({ value }: { value: any }): JSX.Element => (
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
                width: 85,
                fieldSchema: { field: "user_robots_aggregate", subfield: "count" }
            },
            {
                Header: "Signals",
                accessor: "user_signals",
                isVisible: true,
                width: 85,
                fieldSchema: { field: "user_signals_aggregate", subfield: "count" }
            },
            {
                Header: "API Keys",
                accessor: "user_api_keys",
                isVisible: true,
                width: 85,
                fieldSchema: { field: "user_exchange_accs_aggregate", subfield: "count" }
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
                Cell: buildDisabledCheckboxCell,
                width: 75,
                fieldSchema: { field: "settings" }
            },
            {
                Header: "Telegram",
                accessor: "signals_telegram_notifications",
                isVisible: true,
                Cell: buildDisabledCheckboxCell,
                width: 95,
                fieldSchema: { field: "settings" }
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
                Cell: buildDisabledCheckboxCell,
                width: 75,
                fieldSchema: { field: "settings" }
            },
            {
                Header: "Telegram",
                accessor: "trading_telegram_notifications",
                isVisible: true,
                Cell: buildDisabledCheckboxCell,
                width: 95,
                fieldSchema: { field: "settings" }
            }
        ]
    }
];
