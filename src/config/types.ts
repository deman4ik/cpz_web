export enum PageType {
    robots = "Robots",
    signals = "Signals",
    notifications = "Notifications",
    profile = "Profile",
    robotStats = "Robot Stats",
    support = "Support",
    community = "Community",
    dashboard = "Dashboard",
    users = "Users",
    manageRobots = "Robots",
    userRobots = "User Robots",
    userSignals = "User Signals",
    supportRequests = "Support Requests"
}

export enum TabType {
    trading,
    myStatistic,
    publicStatistic
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
