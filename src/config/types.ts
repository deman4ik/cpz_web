export enum PageType {
    robots = "Robots",
    signals = "Signals",
    notifications = "Notifications",
    profile = "Profile",
    robotStats = "Robot Stats",
    support = "Support",
    community = "Community",
    dasHboard = "Dashboard",
    users = "Users",
    manageRobots = "Manage Robots",
    userRobots = "User Robots",
    userSignals = "User Signals"
}

export enum TabType {
    trading,
    myStatistic,
    publicStatistic
}

export interface DeviceProps {
    isMobile: boolean;
}
