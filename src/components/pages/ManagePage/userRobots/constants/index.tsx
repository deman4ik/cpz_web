import React from "react";
// components
import { DefaultCellWrapper, RobotChartCell } from "components/basic/SearchTable/components/cells";
import { DefaultNotDesktopView } from "components/basic/SearchTable/components/notDesktop";

export const TITLES_SCHEME = {
    user: {
        title: "User Info",
        name: "Name: ",
        id: "ID: "
    },
    robot: {
        title: "Robot Info",
        name: "Name: ",
        id: "ID: ",
        volume: "Volume: "
    },
    statistics: {
        title: "Statistics"
    },
    activity: {
        title: "Activity",
        status: "Status: ",
        date: "Created: "
    }
};

export const COLUMNS_WIDTH = ["25%", "20%", "30%", "20%"];

/*HEAD TITLES*/
export const TABLE_HEADER_DATA = Object.keys(TITLES_SCHEME).map((key) => ({
    text: TITLES_SCHEME[key].title
}));

export const FAKE_DATA = [
    {
        NotDesktopView: DefaultNotDesktopView,
        cells: [
            {
                title: TITLES_SCHEME.user.title,
                component: (
                    <DefaultCellWrapper>
                        <p>
                            <span>{TITLES_SCHEME.user.name}</span>
                            modecrywork
                        </p>
                        <p>
                            <span>{TITLES_SCHEME.user.id}</span>
                            b6d0e992-f716-42d5-b69c-6a0b29ef4172
                        </p>
                    </DefaultCellWrapper>
                ),
                notDesktopVal: "None"
            },
            {
                title: TITLES_SCHEME.robot.title,
                component: (
                    <DefaultCellWrapper>
                        <p>
                            <span>{TITLES_SCHEME.robot.name}</span>
                            BR2-1 Kraken BTC/USD 5m
                        </p>
                        <p>
                            <span>{TITLES_SCHEME.robot.id}</span>
                            19a14739-5b10-40aa-8e8a-e0c5f05960c5
                        </p>
                        <p>
                            <span>{TITLES_SCHEME.robot.volume}</span>
                            0.002
                        </p>
                    </DefaultCellWrapper>
                ),
                notDesktopVal: "None"
            },
            {
                title: TITLES_SCHEME.statistics.title,
                component: (
                    <DefaultCellWrapper>
                        <p>ЗАГЛУШКА</p>
                    </DefaultCellWrapper>
                ),
                notDesktopVal: "None"
            },
            {
                title: TITLES_SCHEME.activity.title,
                component: (
                    <DefaultCellWrapper>
                        <p>
                            <span>{TITLES_SCHEME.activity.status}</span>Started
                        </p>
                        <p>
                            <span>{TITLES_SCHEME.activity.date}</span>2020-03-10T16:50:51.013
                        </p>
                    </DefaultCellWrapper>
                ),
                notDesktopVal: "None"
            }
        ]
    }
];
