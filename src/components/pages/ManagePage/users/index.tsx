import React from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import SearchTable from "components/basic/SearchTable";

const headerData = [
    {
        text: "User name"
    },
    {
        text: "User Id"
    },
    {
        text: "Email"
    },
    {
        text: "Telegram username"
    },
    {
        text: "Date created"
    },
    {
        text: "Roles"
    },
    {
        text: "Status"
    },
    {
        text: "User Robots"
    },
    {
        text: "User Signals"
    },
    {
        text: "User Exchange Access"
    }
];

const tableBody = [
    {
        cells: [
            {
                component: "User name"
            },
            {
                component: "User Id"
            },
            {
                component: "Email"
            },
            {
                component: "Telegram username"
            },
            {
                component: "Date created"
            },
            {
                component: "Roles"
            },
            {
                component: "Status"
            },
            {
                component: "User Robots"
            },
            {
                component: "User Signals"
            },
            {
                component: "User Exchange Access"
            }
        ]
    },
    {
        cells: [
            {
                component: "User name"
            },
            {
                component: "User Id"
            },
            {
                component: "Email"
            },
            {
                component: "Telegram username"
            },
            {
                component: "Date created"
            },
            {
                component: "Roles"
            },
            {
                component: "Status"
            },
            {
                component: "User Robots"
            },
            {
                component: "User Signals"
            },
            {
                component: "User Exchange Access"
            }
        ]
    }
];

const columnsWidth = ["10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%", "10%"];

const ManageUsers = () => {
    const { width } = useWindowDimensions();

    return (
        <Template title="Dashboard" subTitle="Users dashboard" width={width}>
            <SearchTable headerData={headerData} columnsWidth={columnsWidth} tableBody={tableBody} />
        </Template>
    );
};

export default ManageUsers;
