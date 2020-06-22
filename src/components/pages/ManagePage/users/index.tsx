import React from "react";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
import SearchTable from "components/basic/SearchTable";
import UserCellText from "./components/UserCellText";
import UserCellNotDesktopView from "./components/UserNotDesktopView";

const USER_SCHEME = {
    name: "User name",
    id: "User id",
    email: "Email",
    telegram_username: "Telegram username",
    roles: "Roles",
    created_at: "Date created",
    status: "Status",
    user_robots: "Robots",
    user_signals: "Signals",
    user_exchange_accs: "Exchange"
};

const centerdCell: React.CSSProperties = { textAlign: "center" };

const headerData = [
    {
        text: <div>{USER_SCHEME.name}</div>
    },
    {
        text: <div>{USER_SCHEME.id}</div>
    },
    {
        text: <div>{USER_SCHEME.email}</div>
    },
    {
        text: <div>{USER_SCHEME.telegram_username}</div>
    },
    {
        text: <div>{USER_SCHEME.roles}</div>
    },
    {
        text: <div>{USER_SCHEME.created_at}</div>
    },
    {
        text: <div style={centerdCell}>{USER_SCHEME.status}</div>
    },
    {
        text: <div style={centerdCell}>{USER_SCHEME.user_robots}</div>
    },
    {
        text: <div style={centerdCell}>{USER_SCHEME.user_signals}</div>
    },
    {
        text: <div style={centerdCell}>{USER_SCHEME.user_exchange_accs}</div>
    }
];

const tableRows = [
    {
        cells: [
            {
                title: USER_SCHEME.name,
                notDesktopVal: "modecrywork",
                component: <UserCellText>modecrywork</UserCellText>
            },
            {
                title: USER_SCHEME.id,
                notDesktopVal: "b6d0e992-f716-42d5-b69c-6a0b29ef4172",
                component: <UserCellText>b6d0e992-f716-42d5-b69c-6a0b29ef4172</UserCellText>
            },
            {
                title: USER_SCHEME.email,
                notDesktopVal: "modecrywork@gmail.com",
                component: <UserCellText>modecrywork@gmail.com</UserCellText>
            },
            {
                title: USER_SCHEME.telegram_username,
                notDesktopVal: "@modecry",
                component: <UserCellText>@modecry</UserCellText>
            },
            {
                title: USER_SCHEME.roles,
                notDesktopVal: "test",
                component: (
                    <UserCellText>
                        Default: User <br />
                        Allowed: User, Manager
                    </UserCellText>
                )
            },
            {
                title: USER_SCHEME.created_at,
                notDesktopVal: "01.01.2020",
                component: <UserCellText>01.01.2020</UserCellText>
            },
            {
                title: USER_SCHEME.status,
                notDesktopVal: "Active",
                component: <UserCellText style={centerdCell}>Active</UserCellText>
            },
            {
                title: USER_SCHEME.user_robots,
                notDesktopVal: "15",
                component: <UserCellText style={centerdCell}>15</UserCellText>
            },
            {
                title: USER_SCHEME.user_signals,
                notDesktopVal: "32",
                component: <UserCellText style={centerdCell}>32</UserCellText>
            },
            {
                title: USER_SCHEME.user_exchange_accs,
                notDesktopVal: "15",
                component: <UserCellText style={centerdCell}>15</UserCellText>
            }
        ],
        NotDesktopView: UserCellNotDesktopView
    },
    {
    cells: [
      {
        title: USER_SCHEME.name,
        notDesktopVal: "modecrywork",
        component: <UserCellText>modecrywork</UserCellText>
      },
      {
        title: USER_SCHEME.id,
        notDesktopVal: "b6d0e992-f716-42d5-b69c-6a0b29ef4172",
        component: <UserCellText>b6d0e992-f716-42d5-b69c-6a0b29ef4172</UserCellText>
      },
      {
        title: USER_SCHEME.email,
        notDesktopVal: "modecrywork@gmail.com",
        component: <UserCellText>modecrywork@gmail.com</UserCellText>
      },
      {
        title: USER_SCHEME.telegram_username,
        notDesktopVal: "@modecry",
        component: <UserCellText>@modecry</UserCellText>
      },
      {
        title: USER_SCHEME.roles,
        notDesktopVal: "test",
        component: (
          <UserCellText>
            Default: User <br />
            Allowed: User, Manager
          </UserCellText>
        )
      },
      {
        title: USER_SCHEME.created_at,
        notDesktopVal: "01.01.2020",
        component: <UserCellText>01.01.2020</UserCellText>
      },
      {
        title: USER_SCHEME.status,
        notDesktopVal: "Active",
        component: <UserCellText style={centerdCell}>Active</UserCellText>
      },
      {
        title: USER_SCHEME.user_robots,
        notDesktopVal: "15",
        component: <UserCellText style={centerdCell}>15</UserCellText>
      },
      {
        title: USER_SCHEME.user_signals,
        notDesktopVal: "32",
        component: <UserCellText style={centerdCell}>32</UserCellText>
      },
      {
        title: USER_SCHEME.user_exchange_accs,
        notDesktopVal: "15",
        component: <UserCellText style={centerdCell}>15</UserCellText>
      }
    ],
    NotDesktopView: UserCellNotDesktopView
  },
    {
    cells: [
      {
        title: USER_SCHEME.name,
        notDesktopVal: "modecrywork",
        component: <UserCellText>modecrywork</UserCellText>
      },
      {
        title: USER_SCHEME.id,
        notDesktopVal: "b6d0e992-f716-42d5-b69c-6a0b29ef4172",
        component: <UserCellText>b6d0e992-f716-42d5-b69c-6a0b29ef4172</UserCellText>
      },
      {
        title: USER_SCHEME.email,
        notDesktopVal: "modecrywork@gmail.com",
        component: <UserCellText>modecrywork@gmail.com</UserCellText>
      },
      {
        title: USER_SCHEME.telegram_username,
        notDesktopVal: "@modecry",
        component: <UserCellText>@modecry</UserCellText>
      },
      {
        title: USER_SCHEME.roles,
        notDesktopVal: "test",
        component: (
          <UserCellText>
            Default: User <br />
            Allowed: User, Manager
          </UserCellText>
        )
      },
      {
        title: USER_SCHEME.created_at,
        notDesktopVal: "01.01.2020",
        component: <UserCellText>01.01.2020</UserCellText>
      },
      {
        title: USER_SCHEME.status,
        notDesktopVal: "Active",
        component: <UserCellText style={centerdCell}>Active</UserCellText>
      },
      {
        title: USER_SCHEME.user_robots,
        notDesktopVal: "15",
        component: <UserCellText style={centerdCell}>15</UserCellText>
      },
      {
        title: USER_SCHEME.user_signals,
        notDesktopVal: "32",
        component: <UserCellText style={centerdCell}>32</UserCellText>
      },
      {
        title: USER_SCHEME.user_exchange_accs,
        notDesktopVal: "15",
        component: <UserCellText style={centerdCell}>15</UserCellText>
      }
    ],
    NotDesktopView: UserCellNotDesktopView
  }
];

const columnsWidth = ["10%", "13%", "16%", "10%", "15%", "8%", "7%", "7%", "7%", "7%"];

const ManageUsers = () => {
    const { width } = useWindowDimensions();

    return (
        <Template title="Dashboard" subTitle="Search users" width={width}>
            <SearchTable headerData={headerData} columnsWidth={columnsWidth} tableRows={tableRows} />
        </Template>
    );
};

export default ManageUsers;
