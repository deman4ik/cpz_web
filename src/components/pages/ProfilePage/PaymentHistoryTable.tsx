import React, { FC, memo } from "react";
import { formatDate, formatDateWithData } from "config/utils";
import styles from "./PaymentHistoryPage.module.css";

interface Props {
    code?: string;
    created_at?: string;
    expires_at?: string;
    price?: string;
    status?: string;
    subscription_from?: string | null;
    subscription_to?: string | null;
    url?: string | null;
    user_sub?: {
        subscription: { name: string };
        subscriptionOption: { name: string };
    };
}

const _PaymentHistoryTable: FC<Props> = ({
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
        <div className={`${styles.tableRow}`}>
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
                                    <span>{code}</span>
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
                            <div className={styles.tableCellText}>{price} $</div>
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
                            Charge Created
                        </div>
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>{formatDate(created_at)}</div>
                        </div>
                    </div>
                </>
            </div>

            <div className={styles.positionGroup}>
                <>
                    <div className={styles.limitWrapper}>
                        <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                            Charge Expires
                        </div>
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>{formatDate(expires_at)}</div>
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
                                {user_sub?.subscription.name} {user_sub?.subscriptionOption.name}
                            </div>
                        </div>
                    </div>
                </>
            </div>
            <div className={styles.positionGroup}>
                <div className={styles.limitWrapper}>
                    <div className={styles.secondaryText} style={{ marginTop: 2 }}>
                        Subscription Period
                    </div>
                    {subscription_from !== null && subscription_to !== null ? (
                        <div className={styles.codeGroup}>
                            <div className={styles.tableCellText}>{`${formatDateWithData(
                                subscription_from
                            )} \n- ${formatDateWithData(subscription_to)}`}</div>
                        </div>
                    ) : (
                        <div style={{ paddingTop: 9 }}>&nbsp;</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const PaymentHistoryTable = memo(_PaymentHistoryTable);
