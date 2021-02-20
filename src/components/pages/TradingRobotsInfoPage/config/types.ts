import { ReactNode } from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { DeviceContextType } from "providers/deviceContext";

// export type NextPageProps = any;
export type NextPageProps = Partial<{
    children: ReactNode;
    accessToken: string;
    apollo: ApolloClient<NormalizedCacheObject>;
    device: DeviceContextType;
}>;

export enum PageType {
    robots = "Robots",
    signals = "Signals",
    openPositoins = "Open Positoins",
    notifications = "Notifications",
    profile = "Profile",
    robotStats = "Robot Stats",
    manageRobotsStats = "Robots Performance",
    manageUserRobotsStats = "User Robots Performance",
    manageBackTest = "Back Test",
    support = "Support",
    community = "Community",
    dashboard = "Dashboard",
    users = "Users",
    manageRobots = "Robots",
    manageBacktests = "Back Tests",
    userRobots = "User Robots",
    userSignals = "User Signals",
    managementSupport = "Support",
    deadLetters = "Dead Letters",
    errors = "Errors"
}

export enum RobotsType {
    signals = "signals",
    robots = "robots"
}

export enum PositionDirection {
    short = "short",
    long = "long"
}

export interface DeviceProps {
    isMobile: boolean;
}

export type RobotStats = {
    equity: [{ x: number; y: number }];
    profit: number;
    winRate: number;
    maxDrawdown: number;
    tradesCount: number;
};

export enum VolumeType {
    assetStatic,
    currencyDynamic
}

export type RobotSettings = {
    volumeType: VolumeType;
    volume?: number;
    volumeInCurrency?: number;
};

type OrderByOption = "desc" | "asc";
export type OrderBy = { [x: string]: { [y: string]: OrderByOption } | OrderByOption };

export enum UserStatus {
    blocked = -1,
    new = 0,
    enabled = 1
}
