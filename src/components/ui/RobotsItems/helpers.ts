export const statusTypes = {
    paused: "start",
    stopped: "start",
    started: "stop",
    stopping: "start"
};

const buttonName = {
    stopped: "Start",
    started: "Started",
    paused: "Paused",
    stopping: "Stopping"
};

const hoverTitle = {
    paused: "Resume",
    started: "Stop"
};

const hoverIcon = {
    paused: "check",
    started: "close"
};

const hoverType = {
    paused: "success",
    started: "negative"
};

export const formatVariables = (item, buttonType: string, displayType?: string) => {
    const { status } = item.user_robots;
    const subscribeAction = item.isSubscribed ? "unsubscribe" : "subscribe";
    const actionByRobotStatus = status ? statusTypes[status] : "create";
    const actionByRobotType = displayType === "signals" ? subscribeAction : actionByRobotStatus;

    const type = displayType ? actionByRobotType : buttonType;

    return {
        variables: {
            cache: item.cache,
            robot: { id: item.id, name: item.name, userRobotId: item.user_robots.id, code: item.code },
            subs: {
                settings: item.settings,
                exchange: item.exchange,
                asset: item.asset,
                currency: item.currency
            },
            type,
            isVisible: true
        }
    };
};

export const displayData = {
    signals: {
        title: (checker) => (checker ? "Following" : "Follow"),
        icon: (checker) => (checker ? "check" : "plus"),
        type: (checker) => (checker ? "success" : "primary"),
        hoverTitle: (checker) => (checker ? "Following" : "Unfollow"),
        hoverIcon: (checker) => (checker ? "check" : "minus"),
        hoverType: (checker) => (checker ? "success" : "negative")
    },
    robots: {
        title: (checker) => (!checker ? "Add" : buttonName[checker]),
        icon: (checker) => (checker ? (checker === "paused" ? "close" : "check") : "plus"),
        type: (checker) => (checker ? (checker === "paused" ? "negative" : "success") : "primary"),
        hoverTitle: (checker) => hoverTitle[checker],
        hoverIcon: (checker) => hoverIcon[checker],
        hoverType: (checker) => hoverType[checker]
    }
};
