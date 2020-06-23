import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import SearchTable from "components/basic/SearchTable";
import UserCellText from "./components/UserCellText";
import UserCellNotDesktopView from "./components/UserNotDesktopView";
import SearchPanel from "../common/SearchPanel";
// utils
import { getWhereVariables } from "./utils";
// graphql
import { GET_USERS } from "graphql/manage/queries";

const USER_TITLES_SCHEME = {
    name: "Name",
    id: "Id",
    email: "Email",
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
        notifications: "Notifications:",
        trading: "Trading:"
    },
    entries: {
        title: "Entries",
        user_robots: "Robots:",
        user_signals: "Signals:",
        user_exchange_accs: "Exchange:"
    },
    status: "Status",
    created_at: "Created"
};

const centerdCell: React.CSSProperties = { textAlign: "center" };

const headerData = [
    {
        text: USER_TITLES_SCHEME.name
    },
    {
        text: USER_TITLES_SCHEME.id
    },
    {
        text: USER_TITLES_SCHEME.email
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
        text: USER_TITLES_SCHEME.status
    },
    {
        text: <div style={centerdCell}> {USER_TITLES_SCHEME.created_at}</div>
    }
];

const tableRows = [
    {
        cells: [
            {
                title: USER_TITLES_SCHEME.name,
                notDesktopVal: "modecrywork",
                component: <UserCellText>modecrywork</UserCellText>
            },
            {
                title: USER_TITLES_SCHEME.id,
                notDesktopVal: "dsadsadsadsadas",
                component: <UserCellText>b6d0e992-f716-42d5-b69c-6a0b29ef4172</UserCellText>
            },
            {
                title: USER_TITLES_SCHEME.email,
                notDesktopVal: "modecry@gmail.com",
                component: <UserCellText>modecry@gmail.com</UserCellText>
            },
            {
                title: USER_TITLES_SCHEME.telegram.title,
                notDesktopVal: "telegram",
                component: (
                    <UserCellText>
                        Username: @modecry <br />
                        Id: 3345
                    </UserCellText>
                )
            },
            {
                title: USER_TITLES_SCHEME.roles.title,
                notDesktopVal: "roles",
                component: (
                    <UserCellText>
                        Default: user, manager, vip <br />
                        Allowed: user, manager, vip
                    </UserCellText>
                )
            },
            {
                title: USER_TITLES_SCHEME.settings.title,
                notDesktopVal: "settings",
                component: (
                    <UserCellText>
                        Notifications: email, telegram
                        <br />
                        Trading: email, telegram
                    </UserCellText>
                )
            },
            {
                title: USER_TITLES_SCHEME.entries.title,
                notDesktopVal: "entries",
                component: (
                    <UserCellText>
                        Robots: 14 <br />
                        Signals: 16
                        <br />
                        Exchange: 19
                    </UserCellText>
                )
            },
            {
                title: USER_TITLES_SCHEME.status,
                notDesktopVal: "status",
                component: <UserCellText>active</UserCellText>
            },
            {
                title: USER_TITLES_SCHEME.created_at,
                notDesktopVal: "created_at",
                component: <UserCellText style={centerdCell}>10.15.2020</UserCellText>
            }
        ],
        NotDesktopView: UserCellNotDesktopView
    }
];

const columnsWidth = ["10.5%", "13%", "13.07%", "12%", "14%", "15.02%", "9%", "4.5%", "9%"];

const ManageUsers = () => {
    const [filters, setFilters] = useState(getWhereVariables(""));
    const { width } = useWindowDimensions();
    const { loading, data } = useQuery(GET_USERS, {
        variables: { where: filters }
    });

    /*Коллбэк на поиск*/
    const searchCallback = (value) => {
        setFilters(getWhereVariables(value));
    };

    return (
        <Template
            title="Dashboard"
            subTitle="Search users"
            width={width}
            toolbar={<SearchPanel callback={searchCallback} />}>
            <SearchTable headerData={headerData} columnsWidth={columnsWidth} tableRows={tableRows} />
        </Template>
    );
};

export default ManageUsers;
