import React from "react";
import dayjs from "libs/dayjs";
import * as Sets from "./NotificationsSets";
import * as SetsCard from "./NotificationsSetsCard";
import { color, DOCS_URL, SUPPORT_URL } from "config/constants";

const actionTypes = ["long", "closeLong", "closeShort"];
const actionSignals = ["long", "short"];
export const actionName = (action) => (actionTypes.includes(action) ? "BUY" : "SELL");
export const actionIcon = (action) => (actionTypes.includes(action) ? "arrowup" : "arrowdown");
export const actionColor = (action) => (actionTypes.includes(action) ? color.positive : color.negative);
export const actionOpen = (action) => actionSignals.includes(action);

export const parseNotifications = (notifications: Array<any>): any =>
    notifications
        .map((notification) => {
            const { type, data, timestamp, readed, id } = notification;
            return {
                id,
                type,
                data,
                timestamp,
                readed
            };
        })
        .sort((a, b) => a.timestamp - b.timestamp);

const messageMap = {
    "user-robot.failed": "failed",
    "user-robot.started": "robot",
    "user-robot.stopped": "robot",
    "user-robot.paused": "robot",
    "user-robot.resumed": "robot",
    "user-robot.trade": "robotTrade",
    "user-robot.error": "error",
    "signal.trade": "signalTrade",
    "signal-trade.new": "signalTrade",
    "signal.alert": "signalAlert",
    "signal-alert.new": "signalAlert",
    "order.error": "error",
    "message.support-reply": "message",
    "message.broadcast": "message",
    "user_ex_acc.error": "user",
    "user_sub.error": "errorUserSub",
    "user_sub.status": "statusUserSub",
    "user_payment.status": "statusUserPayment"
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
        "message.support-reply",
        "user_payment.status",
        "user_sub.status"
    ],
    signals: ["signal.trade", "signal.alert", "signal-trade.new", "signal-alert.new"],
    trading: ["user-robot.trade"],
    error: ["order.error", "user_ex_acc.error", "user_sub.error"]
};

export const showMessage = (item, onClick: () => void, card = false): JSX.Element => {
    const setFunc = card ? SetsCard : Sets;

    const messages = {
        failed: () => setFunc.failedSet(item, onClick),
        message: () => setFunc.messageSet(item),
        robotTrade: () => setFunc.robotTradeSet(item, onClick),
        error: () => setFunc.errorSet(item, onClick),
        signalAlert: () => setFunc.signalAlertSet(item, onClick),
        robot: () => setFunc.robotSet(item, onClick),
        signalTrade: () => setFunc.signalTradeSet(item, onClick),
        user: () => setFunc.userSet(item, onClick),
        errorUserSub: () => setFunc.errorUserSubSet(item, onClick),
        statusUserSub: () => setFunc.statusUserSubSet(item, onClick),
        statusUserPayment: () => setFunc.statusUserPaymentSet(item, onClick)
    };

    const messageType = messageMap[item.type];

    if (messageType) return messages[messageType]();
    console.warn(`Unknown message type encountered: '${item.type}'`);
    return null;
};

export const getRedirectionLink = (item) => {
    const links = {
        failed: () => ({ link: `${DOCS_URL}${SUPPORT_URL}`, redirect: true }),
        message: () => ({ link: `${DOCS_URL}${SUPPORT_URL}`, redirect: true }),
        robotTrade: () => ({
            link: `/robots/robot/${item.data.robotCode}`,
            redirect: false
        }),
        error: () => ({ link: `/robots/robot/${item.data.robotCode}`, redirect: true }),
        signalAlert: () => ({
            link: `/signals/robot/${item.data.robotCode}`,
            redirect: false
        }),
        robot: () => ({
            link: `/robots/robot/${item.data.robotCode}`,
            redirect: false
        }),
        signalTrade: () => ({
            link: `/signals/robot/${item.data.robotCode}`,
            redirect: false
        }),
        user: () => ({ link: "/profile", redirect: true }),
        errorUserSub: () => ({ link: "/#", redirect: true }),
        statusUserSub: () => ({ link: "/#", redirect: true }),
        statusUserPayment: () => ({ link: "/profile/payment-history", redirect: true })
    };

    return links[messageMap[item.type]]();
};

export const getTextStatusExpiredOrCanceled = (): JSX.Element => (
    <p>
        All robots are <b>stopping</b> now! If&nbsp;there are any <b>open positions</b> they will be
        <b>canceled</b> (closed) with current market prices and potentially may cause profit
        <b>losses</b>!
    </p>
);

export const getTextStatusExpiring = (item: any): JSX.Element => (
    <>
        <p>
            Expires in&nbsp; {`${dayjs.utc().diff(item?.data.activeTo || item?.data.trialEnded, "day")}`} days. Please
            renew you subscription.
        </p>
        <p>
            After subscription expires all robots will be&nbsp;<b>stopped</b>! If&nbsp;there are any
            <b>open positions</b> they will be&nbsp;<b>canceled</b> (closed) with current market prices and potentially
            may cause profit <b>losses</b>!
        </p>
    </>
);
