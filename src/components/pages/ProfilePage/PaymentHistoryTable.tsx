import React, { memo } from "react";
import styles from "./PaymentHistoryPage.module.css";

const _PaymentHistoryTable = ({
    code,
    created_at,
    expires_at,
    price,
    status,
    subscription_from,
    subscription_to,
    url,
    user_sub
}) => {
    return (
        <div className={`${styles.tableRow} ${styles.tableGridRow}`}>
            <div className={styles.positionGroup}>
                <>
                    <div className={styles.limitWrapper}>
                        <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                            Charge Code
                        </div>
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>
                                {url !== null ? (
                                    <a className={styles.tableCellUrl} href={url}>
                                        {code}
                                    </a>
                                ) : (
                                    { code }
                                )}
                            </div>
                        </div>
                    </div>
                </>
            </div>

            <div className={styles.positionGroup}>
                <>
                    <div className={styles.limitWrapper}>
                        <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                            Charge Price
                        </div>
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>{price}</div>
                        </div>
                    </div>
                </>
            </div>

            <div className={styles.positionGroup}>
                <>
                    <div className={styles.limitWrapper}>
                        <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                            Charge Status
                        </div>
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>{status}</div>
                        </div>
                    </div>
                </>
            </div>

            <div className={styles.positionGroup}>
                <>
                    <div className={styles.limitWrapper}>
                        <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                            Created
                        </div>
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>{created_at}</div>
                        </div>
                    </div>
                </>
            </div>

            <div className={styles.positionGroup}>
                <>
                    <div className={styles.limitWrapper}>
                        <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                            Expires
                        </div>
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>{expires_at}</div>
                        </div>
                    </div>
                </>
            </div>

            <div className={styles.positionGroup}>
                <>
                    <div className={styles.limitWrapper}>
                        <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                            Subscription
                        </div>
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>
                                {user_sub.subscription.name} {user_sub.subscriptionOption.name}
                            </div>
                        </div>
                    </div>
                </>
            </div>

            <div className={styles.positionGroup}>
                <>
                    <div className={styles.limitWrapper}>
                        <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                            Subscription Period
                        </div>
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>{`${subscription_from} \n- ${subscription_to}`}</div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    );
};

export const PaymentHistoryTable = memo(_PaymentHistoryTable);
