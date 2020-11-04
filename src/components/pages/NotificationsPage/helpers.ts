import * as Sets from "./NotificationsSets";
import * as SetsCard from "./NotificationsSetsCard";
import { color, DOCS_URL, SUPPORT_URL } from "config/constants";

const actionTypes = ["long", "closeShort"];
const actionSignals = ["long", "short"];
export const actionName = (action) => (actionTypes.includes(action) ? "BUY" : "SELL");
export const actionIcon = (action) => (actionTypes.includes(action) ? "arrowup" : "arrowdown");
export const actionColor = (action) => (actionTypes.includes(action) ? color.positive : color.negative);
export const actionOpen = (action) => actionSignals.includes(action);

export const getFormatData = (notifications) =>
    notifications.map((notification) => {
        const { type, data, user_robot, user_position, robot_position, robot, timestamp, readed, id } = notification;
        return {
            id,
            type,
            data,
            timestamp,
            readed,
            user_position,
            robot_position,
            robot: user_robot
                ? {
                      code: user_robot.robot.code,
                      name: user_robot.robot.name,
                      asset: user_robot.robot.asset
                  }
                : robot
                ? {
                      code: robot.code,
                      name: robot.name,
                      asset: robot.asset
                  }
                : null
        };
    });

const messageMap = {
    "user-robot.failed": "failed",
    "user-robot.started": "robot",
    "user-robot.stopped": "robot",
    "user-robot.paused": "robot",
    "user-robot.resumed": "robot",
    "user-robot.trade": "robotTrade",
    signal_trade: "signalTrade",
    signal_alert: "signalAlert",
    "order.error": "error",
    "message.support-reply": "message",
    "message.broadcast": "message",
    "user_ex_acc.error": "user"
};

export const headerSelectData = [
    { value: "all", label: "All" },
    { value: "message", label: "News" },
    { value: "status", label: "Status" },
    { value: "signals", label: "Signals" },
    { value: "trading", label: "Trading" },
    { value: "error", label: "Error" }
];

export const filters = {
    all: null,
    message: ["message.broadcast"],
    status: [
        "user-robot.failed",
        "user-robot.started",
        "user-robot.stopped",
        "user-robot.paused",
        "user-robot.resumed",
        "message.support-reply"
    ],
    signals: ["signal_trade", "signal_alert"],
    trading: ["user-robot.trade"],
    error: ["order.error", "user_ex_acc.error"]
};

export const showMessage = (item, onClick, card = false) => {
    const setFunc = card ? SetsCard : Sets;
    const messages = {
        failed: () => setFunc.failedSet(item, onClick),
        message: () => setFunc.messageSet(item),
        robotTrade: () => setFunc.robotTradeSet(item, onClick),
        error: () => setFunc.errorSet(item, onClick),
        signalAlert: () => setFunc.signalAlertSet(item, onClick),
        robot: () => setFunc.robotSet(item, onClick),
        signalTrade: () => setFunc.signalTradeSet(item, onClick),
        user: () => setFunc.userSet(item, onClick)
    };

    return messages[messageMap[item.type]]();
};

export const getRedirectionLink = (item) => {
    const links = {
        failed: () => ({ link: `${DOCS_URL}${SUPPORT_URL}`, redirect: true }),
        message: () => ({ link: `${DOCS_URL}${SUPPORT_URL}`, redirect: true }),
        robotTrade: () => ({
            link: `/robots/robot/${item.robot.code}`,
            redirect: false
        }),
        error: () => ({ link: `${DOCS_URL}${SUPPORT_URL}`, redirect: true }),
        signalAlert: () => ({
            link: `/signals/robot/${item.robot.code}`,
            redirect: false
        }),
        robot: () => ({
            link: `/robots/robot/${item.robot.code}`,
            redirect: false
        }),
        signalTrade: () => ({
            link: `/signals/robot/${item.robot.code}`,
            redirect: false
        }),
        user: () => ({ link: "/profile", redirect: true })
    };

    return links[messageMap[item.type]]();
};
