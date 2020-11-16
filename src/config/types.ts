export enum PageType {
    robots = "Robots",
    signals = "Signals",
    notifications = "Notifications",
    profile = "Profile",
    robotStats = "Robot Stats",
    manageRobotsStats = "Robots Performance",
    manageUserRobotsStats = "User Robots Performance",
    support = "Support",
    community = "Community",
    dashboard = "Dashboard",
    users = "Users",
    manageRobots = "Robots",
    manageBacktests = "Back Tests",
    userRobots = "User Robots",
    userSignals = "User Signals",
    supportRequests = "Support Requests",
    deadLetters = "Dead Letters"
}

export enum RobotsType {
    signals = "signals",
    robots = "robots"
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
