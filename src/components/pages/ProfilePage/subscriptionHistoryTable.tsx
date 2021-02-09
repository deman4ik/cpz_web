import React, { memo } from "react";

import styles from "./subscriptionHistoryPage.module.css";

const _SubscriptionHistoryTable = ({ userSubs, userStatus }) => {
    return (
        <div className={`${styles.tableRow} ${styles.tableGridRow}`}>
            <div className={styles.positionGroup} style={{ flex: 0.3 }}>
                {userSubs && (
                    <>
                        <div className={styles.limitWrapper}>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}>Subscription Name</div>
                            </div>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                {userSubs.name}
                            </div>
                        </div>
                        <div className={styles.limitWrapper}>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}>Option</div>
                            </div>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                {userSubs.name}&nbsp;
                                {userSubs.amount}&nbsp;
                                {userSubs.unit}
                            </div>
                        </div>
                        <div className={styles.limitWrapper}>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}>Price</div>
                            </div>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                $ {userSubs.price_total.toFixed(1)}
                            </div>
                        </div>
                        <div className={styles.limitWrapper}>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}>Status</div>
                            </div>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                {userStatus}
                            </div>
                        </div>
                        <div className={styles.limitWrapper}>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}>Date from</div>
                            </div>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                {userSubs.active_from || userSubs.trial_started}
                            </div>
                        </div>
                        <div className={styles.limitWrapper}>
                            <div className={styles.codeGroup}>
                                <div className={styles.tableCellText}>Date to</div>
                            </div>
                            <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                                {userSubs.active_to || userSubs.trial_ended}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export const SubscriptionHistoryTable = memo(_SubscriptionHistoryTable);
