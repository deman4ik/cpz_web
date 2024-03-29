/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
import { NotificationsNode } from "./NotificationsNode";
import { ArrowDownIcon, ArrowUpIcon } from "assets/icons/svg";
import {
    formatDate,
    capitalize,
    formatMoney,
    valueWithSign,
    colorDirection,
    getColorForMoney,
    getToUpperCase
} from "config/utils";
import {
    actionName,
    actionIcon,
    actionColor,
    actionOpen,
    getTextStatusExpiredOrCanceled,
    getTextStatusExpiring
} from "./helpers";
import styles from "./NotificationsSets.module.css";

export const failedSet = (item, onClick) => (
    <div className={styles.rowCard} style={{ flex: 1 }}>
        <div className={styles.textMessageCard}>{`${item.data.error} Robot`}&nbsp;</div>
        <div className={[styles.textAccentCard, styles.cursor].join(" ")} onClick={onClick}>
            {item.data.robotCode}&nbsp;
        </div>
        <div className={styles.textAccentCard}>{item.data.userRobotId}</div>
        <div className={styles.textMessageCard}>
            {`Error occurred while processing robot job ${item.data.jobType}.`}
        </div>
        <div className={styles.textMessageCard}>Please contact support.</div>
    </div>
);

export const messageSet = (item) => (
    <div className={[styles.messageRow, styles.textMessageCard].join(" ")}>
        <NotificationsNode
            message={`${item.type === "message.support-reply" ? "Support Team" : "Announcement"} - ${
                item.data.message
            }`}
        />
    </div>
);

export const robotTradeSet = (item, onClick) => (
    <div className={styles.rowCard}>
        {item.data.status === "open" ? (
            <>
                <div className={styles.row} style={{ justifyContent: "flex-start" }}>
                    <div className={styles.textMessageCard}>Trade&nbsp;</div>
                    <div className={[styles.textAccentCard, styles.cursor].join(" ")} onClick={onClick}>
                        {item.data.robotCode}&nbsp;
                    </div>
                    <div className={styles.textMessageCard}>{item.data.code}</div>
                </div>
                <div className={styles.row} style={{ flex: 1 }}>
                    <div className={styles.rowRobot}>
                        <div className={styles.colRobot}>
                            <div className={styles.textAccentCard}>Entry</div>
                            <div className={styles.textMessageCard} style={colorDirection(item.data.entryAction)}>
                                {capitalize(item.data.entryAction)}
                            </div>
                        </div>
                        <div className={styles.colRobot} style={{ marginTop: 5 }}>
                            <div className={styles.textAccentCard}>Price</div>
                            <div className={styles.textMessageCard}>{`${item.data.entryPrice} $`}</div>
                        </div>
                    </div>
                    <div className={styles.rowRobot}>
                        <div className={styles.colRobot}>
                            <div className={styles.textAccentCard}>Amount</div>
                            <div className={styles.textMessageCard}>
                                {`${item.data.entryExecuted} ${item.data.asset}`}
                            </div>
                        </div>
                        <div className={styles.colRobot} style={{ marginTop: 5 }}>
                            <div className={styles.textAccentCard}>Date</div>
                            <div className={styles.textMessageCard}>{formatDate(item.data.entryDate)}</div>
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <>
                <div className={styles.row} style={{ justifyContent: "flex-start" }}>
                    <div className={styles.textMessageCard}>Trade&nbsp;</div>
                    <div className={[styles.textAccentCard, styles.cursor].join(" ")} onClick={onClick}>
                        {item.data.robotCode}&nbsp;
                    </div>
                    <div className={styles.textMessageCard}>{item.data.code}</div>
                </div>
                <div className={styles.row} style={{ flex: 1 }}>
                    <div className={styles.rowRobot}>
                        <div className={styles.colRobot}>
                            <div className={styles.textAccentCard}>Exit</div>
                            <div className={styles.textMessageCard} style={colorDirection(item.data.exitAction)}>
                                {capitalize(item.data.exitAction)
                                    .split(/(?=[A-Z])/)
                                    .join(" ")}
                            </div>
                        </div>
                        <div className={styles.colRobot} style={{ marginTop: 5 }}>
                            <div className={styles.textAccentCard}>Price</div>
                            <div className={styles.textMessageCard}>{`${item.data.exitPrice} $`}</div>
                        </div>
                    </div>
                    <div className={styles.rowRobot}>
                        <div className={styles.rowRobotProfit}>
                            <div className={styles.colRobot}>
                                <div className={styles.textAccentCard}>Amount</div>
                                <div className={styles.textMessageCard}>
                                    {`${item.data.exitExecuted} ${item.data.asset}`}
                                </div>
                            </div>
                            <div className={styles.colRobot}>
                                <div className={styles.textAccentCard}>Profit</div>
                                <div
                                    className={styles.textMessageCard}
                                    style={{ color: getColorForMoney(item.data.profit) }}>
                                    {`${valueWithSign(formatMoney(item.data.profit))} $`}
                                </div>
                            </div>
                        </div>
                        <div className={styles.colRobot} style={{ marginTop: 5 }}>
                            <div className={styles.textAccentCard}>Date</div>
                            <div className={styles.textMessageCard}>{formatDate(item.data.exitDate)}</div>
                        </div>
                    </div>
                </div>
            </>
        )}
    </div>
);

export const errorSet = (item, onClick) => (
    <div className={styles.rowCard} style={{ flex: 1 }}>
        <div className={styles.row}>
            <div className={styles.textMessageCard}>Robot&nbsp;</div>
            <div className={[styles.textAccentCard, styles.cursor].join(" ")} onClick={onClick}>
                {item.data.robotCode}&nbsp;
            </div>
        </div>
        <div className={styles.textAccentCard}>{item.data.userRobotId}&nbsp;</div>
        <div className={styles.textMessageCard}>Error occurred while processing order</div>
        <div className={styles.row}>
            <div className={styles.textAccentCard}>{item.data.exId}&nbsp;</div>
            <div className={styles.textMessageCard}>{item.data.error}.&nbsp;</div>
        </div>
        <div className={styles.textMessageCard}>Please check your API Keys and Robot settings or contact support.</div>
    </div>
);

const components = {
    arrowdown: ArrowDownIcon,
    arrowup: ArrowUpIcon
};

export const signalAlertSet = (item, onClick) => {
    const SpecificIcon = components[actionIcon(item.data.action)];
    return (
        <div className={styles.rowCard} style={{ flex: 1 }}>
            <div className={styles.row} style={{ flexWrap: "wrap" }}>
                <div className={styles.textMessageCard}>Signal&nbsp;</div>
                <div className={[styles.textAccentCard, styles.cursor].join(" ")} onClick={onClick}>
                    {item.data.robotCode}&nbsp;
                </div>
                <div className={styles.textMessageCard}>{item.data.positionCode}</div>
            </div>
            <div className={styles.alertRow}>
                <div className={styles.colRobot}>
                    <div className={styles.textAccentCard}>Price</div>
                    <div className={styles.textMessageCard}>{`${formatMoney(item.data.price)} $`}</div>
                </div>
                <div className={styles.colRobot}>
                    <div className={styles.textAccentCard}>Amount</div>
                    <div className={styles.textMessageCard}>{item.data.volume}</div>
                </div>
                <div className={styles.colRobot}>
                    <div className={styles.textAccentCard}>Action</div>
                    <div className={styles.row}>
                        <div className={styles.textMessageCard}>{actionName(item.data.action)}</div>
                        <div style={{ marginTop: -1 }}>
                            <SpecificIcon color={actionColor(item.data.action)} size={16} />
                        </div>
                        <div className={styles.textMessageCard}>{capitalize(item.data.orderType)}&nbsp;</div>
                    </div>
                </div>
                <div className={styles.colRobot}>
                    <div className={styles.textAccentCard}>Date</div>
                    <div className={styles.textMessageCard}>{formatDate(item.data.timestamp)}</div>
                </div>
            </div>
        </div>
    );
};

export const robotSet = (item, onClick) => (
    <div className={styles.rowCard} style={{ flex: 1 }}>
        <div className={styles.row} style={{ flexWrap: "wrap" }}>
            <div className={styles.textMessageCard}>Robot&nbsp;</div>
            <div className={[styles.textAccentCard, styles.cursor].join(" ")} onClick={onClick}>
                {item.data.robotCode}&nbsp;
            </div>
            <div className={styles.textMessageCard}>{`is ${item.type.split(".")[1]}`}</div>
        </div>
        {item.data.message ? (
            <div className={[styles.messageRow, styles.textMessageCard].join(" ")}>{item.data.message}</div>
        ) : null}
    </div>
);

export const signalTradeSet = (item, onClick) => {
    return (
        <div className={styles.rowCard}>
            {actionOpen(item.data.action) ? (
                <>
                    <div className={styles.textMessageCard}>Signal Trade&nbsp;</div>
                    <div className={styles.row} style={{ justifyContent: "flex-start" }}>
                        <div className={[styles.textAccentCard, styles.cursor].join(" ")} onClick={onClick}>
                            {item.data.robotCode}&nbsp;
                        </div>
                        <div className={styles.textMessageCard}>{item.data.code}</div>
                    </div>
                    <div className={styles.alertRow}>
                        <div
                            className={styles.colRobot}
                            style={{ ...colorDirection(item.data.action), flexBasis: "100%", marginBottom: 5 }}>
                            <div className={styles.textAccentCard}>Entry</div>
                            <div className={styles.textMessageCard} style={colorDirection(item.data.action)}>
                                {capitalize(item.data.action)}
                            </div>
                        </div>
                        <div className={styles.colRobot}>
                            <div className={styles.textAccentCard}>Price</div>
                            <div className={styles.textMessageCard}>{`${formatMoney(item.data.price)} $`}</div>
                        </div>
                        <div className={styles.colRobot}>
                            <div className={styles.textAccentCard}>Amount</div>
                            <div className={styles.textMessageCard}>{item.data.volume}</div>
                        </div>
                        <div className={styles.colRobot}>
                            <div className={styles.textAccentCard}>Date</div>
                            <div className={styles.textMessageCard}>{formatDate(item.data.timestamp)}</div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.textMessageCard}>Signal Trade&nbsp;</div>
                    <div className={styles.row} style={{ justifyContent: "flex-start" }}>
                        <div className={[styles.textAccentCard, styles.cursor].join(" ")} onClick={onClick}>
                            {item.data.robotCode}&nbsp;
                        </div>
                        <div className={styles.textMessageCard}>{item.data.code}</div>
                    </div>
                    <div className={styles.row} style={{ flex: 1 }}>
                        <div className={styles.rowRobot}>
                            <div className={styles.colRobot}>
                                <div className={styles.textAccentCard}>Exit</div>
                                <div className={styles.textMessageCard} style={colorDirection(item.data.action)}>
                                    {capitalize(item.data.action)
                                        .split(/(?=[A-Z])/)
                                        .join(" ")}
                                </div>
                            </div>
                            <div className={styles.colRobot} style={{ marginTop: 5 }}>
                                <div className={styles.textAccentCard}>Price</div>
                                <div className={styles.textMessageCard}>{`${formatMoney(item.data.price)} $`}</div>
                            </div>
                            <div className={styles.colRobot} style={{ marginTop: 5 }}>
                                <div className={styles.textAccentCard}>Amount</div>
                                <div className={styles.textMessageCard}>{item.data.volume}</div>
                            </div>
                        </div>
                        <div className={styles.rowRobot}>
                            <div className={styles.colRobot}>
                                <div className={styles.textAccentCard}>Profit</div>
                                <div
                                    className={styles.textMessageCard}
                                    style={{ color: getColorForMoney(item.data.profit) }}>
                                    {`${valueWithSign(formatMoney(item.data.profit))} $`}
                                </div>
                            </div>
                            <div className={styles.colRobot} style={{ marginTop: 5 }}>
                                <div className={styles.textAccentCard}>Bars Held</div>
                                <div className={styles.textMessageCard}>{item.data.barsHeld}</div>
                            </div>
                            <div className={styles.colRobot} style={{ marginTop: 5 }}>
                                <div className={styles.textAccentCard}>Date</div>
                                <div className={styles.textMessageCard}>{formatDate(item.data.timestamp)}</div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export const userSet = (item, onClick) => (
    <div>
        <div className={styles.row}>
            <div className={styles.textMessageCard}>Your API Key&nbsp;</div>
            <div className={[styles.textAccentCard, styles.cursor].join(" ")} onClick={onClick}>
                {item.data.name}&nbsp;
            </div>
            <div className={styles.textMessageCard}>is invalid!</div>
        </div>
        <div className={styles.textMessageCard}>{item.data.error}</div>
        <div className={styles.textMessageCard}>Please update your API Key information in your Profile.</div>
    </div>
);

export const errorUserSubSet = (item, onClick) => (
    <div>
        <div className={styles.row}>
            <div className={[styles.textAccent, styles.cursor].join(" ")} onClick={onClick}>
                <div className={styles.textMessageCard}>{item.data?.error}</div>
            </div>
        </div>
    </div>
);

export const statusUserSubSet = (item, onClick) => (
    <div>
        <div className={styles.row}>
            <div className={[styles.textAccent, styles.cursor].join(" ")} onClick={onClick}>
                <div className={styles.textMessageCard} style={{ flexDirection: "row" }}>
                    Subscription&nbsp;<span className={styles.textAccent}>{item.data?.subscriptionName}</span>
                    &nbsp;is&nbsp;
                    {getToUpperCase(item.data?.status)}
                </div>
            </div>
        </div>
        <div className={styles.row} style={{ flex: 1, flexWrap: "wrap", marginTop: 3 }}>
            <div className={styles.textMessageCard}>
                {(item.data?.status === "expired" || item.data?.status === "canceled") &&
                    getTextStatusExpiredOrCanceled()}
                {item.data?.status === "expiring" && getTextStatusExpiring(item)}
            </div>
        </div>
    </div>
);

export const statusUserPaymentSet = (item, onClick) => (
    <div>
        <div className={styles.row}>
            <div className={[styles.textAccent, styles.cursor].join(" ")} onClick={onClick}>
                <div className={styles.textMessageCard} style={{ flexDirection: "row" }}>
                    Your charge&nbsp;<span className={styles.textAccent}>{item.data?.code}</span>&nbsp;for
                    subscription&nbsp;
                    {item.data?.subscriptionName} is {getToUpperCase(item.data?.status)}
                </div>
            </div>
        </div>
    </div>
);
