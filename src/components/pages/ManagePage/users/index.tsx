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
import { getWhereVariables, formatUsers } from "./utils";
// constants
import { USER_TITLES_SCHEME, CENTRED_CELL, HEADER_TABLE_DATA,COLUMNS_WIDTH } from "./constants";
// graphql
import { GET_USERS } from "graphql/manage/queries";

const tableRows = [
    {
        cells: [
            {
                title: USER_TITLES_SCHEME.name.title,
                notDesktopVal: "modecrywork",
                component: <UserCellText>modecrywork</UserCellText>
            },
            {
                title: USER_TITLES_SCHEME.id.title,
                notDesktopVal: "dsadsadsadsadas",
                component: <UserCellText>b6d0e992-f716-42d5-b69c-6a0b29ef4172</UserCellText>
            },
            {
                title: USER_TITLES_SCHEME.email.title,
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
                title: USER_TITLES_SCHEME.status.title,
                notDesktopVal: "status",
                component: <UserCellText>active</UserCellText>
            },
            {
                title: USER_TITLES_SCHEME.created_at.title,
                notDesktopVal: "created_at",
                component: <UserCellText style={CENTRED_CELL}>10.15.2020</UserCellText>
            }
        ],
        NotDesktopView: UserCellNotDesktopView
    }
];


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
    if (data?.users?.length) {
        formatUsers(data.users);
    }
    return (
        <Template
            title="Dashboard"
            subTitle="Search users"
            width={width}
            toolbar={<SearchPanel callback={searchCallback} />}>
            <SearchTable headerData={HEADER_TABLE_DATA} columnsWidth={COLUMNS_WIDTH} tableRows={tableRows} />
        </Template>
    );
};

export default ManageUsers;
