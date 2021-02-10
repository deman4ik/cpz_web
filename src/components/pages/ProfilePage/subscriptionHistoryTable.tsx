import React, { memo } from "react";
import styles from "./SubscriptionHistoryPage.module.css";

const _SubscriptionHistoryTable = ({ userSubs, userStatus }) => {
    return (
        <div className={`${styles.tableRow} ${styles.tableGridRow}`}>
            <div className={styles.positionGroup} style={{ flex: 0.3 }}>
                {userSubs && (
                    <>
                        <div className={styles.limitWrapper}>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                Subscription Name
                            </div>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}>{userSubs.name}</div>
                            </div>
                        </div>
                        <div className={styles.limitWrapper}>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                Option
                            </div>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}>
                                    {userSubs.name}&nbsp;
                                    {userSubs.amount}&nbsp;
                                    {userSubs.unit}
                                </div>
                            </div>
                        </div>
                        <div className={styles.limitWrapper}>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                Price
                            </div>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}> $ {userSubs.price_total.toFixed(1)}</div>
                            </div>
                        </div>
                        <div className={styles.limitWrapper}>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                Status
                            </div>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}> {userStatus}</div>
                            </div>
                        </div>
                        {userSubs.active_from ||
                            (userSubs.trial_started && (
                                <div className={styles.limitWrapper}>
                                    <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                        Date from
                                    </div>
                                    <div className={styles.codeGroup}>
                                        <div className={styles.tableCellText}>
                                            {userSubs.active_from || userSubs.trial_started}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {userSubs.active_to ||
                            (userSubs.trial_ended && (
                                <div className={styles.limitWrapper}>
                                    <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                        Date to
                                    </div>
                                    <div className={styles.codeGroup}>
                                        <div className={styles.tableCellText}>
                                            {userSubs.active_to || userSubs.trial_ended}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </>
                )}
            </div>
        </div>
    );
};

export const SubscriptionHistoryTable = memo(_SubscriptionHistoryTable);
