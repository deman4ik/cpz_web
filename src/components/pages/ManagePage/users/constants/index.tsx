import React from "react";
import { SET_USER_STATUS } from "graphql/manage/users/mutations";
import { ColumnsArraySchema, buildDisabledCheckboxCell, CallMode, InputType } from "components/pages/ManagePage/utils";

export const USERS_TABLE_COLUMNS: ColumnsArraySchema = [
    {
        Header: "Account Info",
        id: "account_info",
        disableSortBy: true,
        columns: [
            {
                Header: "Name",
                accessor: "name",
                width: 130
            },
            {
                Header: "ID",
                accessor: "id",
                width: 190
            },
            {
                Header: "Email",
                accessor: "email",
                width: 250
            },
            {
                Header: "Status",
                accessor: "status",
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
                accessor: "telegram_username"
            },
            {
                Header: "ID",
                accessor: "telegram_id"
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
                width: 85,
                fieldSchema: { field: "user_robots_aggregate", subfield: "count" }
            },
            {
                Header: "Signals",
                accessor: "user_signals",
                width: 85,
                fieldSchema: { field: "user_signals_aggregate", subfield: "count" }
            },
            {
                Header: "API Keys",
                accessor: "user_api_keys",
                width: 85,
                fieldSchema: { field: "user_exchange_accs_aggregate", subfield: "count" }
            },
            {
                Header: "Active Subs",
                accessor: "user_subs",
                width: 85,
                fieldSchema: { field: "user_subs_aggregate", subfield: "count" }
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
                Cell: buildDisabledCheckboxCell,
                width: 75,
                fieldSchema: { field: "settings" }
            },
            {
                Header: "Telegram",
                accessor: "signals_telegram_notifications",
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
                Cell: buildDisabledCheckboxCell,
                width: 75,
                fieldSchema: { field: "settings" }
            },
            {
                Header: "Telegram",
                accessor: "trading_telegram_notifications",
                Cell: buildDisabledCheckboxCell,
                width: 95,
                fieldSchema: { field: "settings" }
            }
        ]
    }
];
