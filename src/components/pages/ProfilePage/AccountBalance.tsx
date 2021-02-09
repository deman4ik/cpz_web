import React, { useContext, memo } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SUBSCRIPTIONS_NAME, GET_USER_SUBS, GET_USER_SUBS_BY_CREATED_AT } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { BetaIcon } from "assets/icons/svg";
import { Button } from "components/basic";
import { color } from "config/constants";
import styles from "./AccountBalance.module.css";

const _AccountBalance: React.FC = () => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data: dataSubs } = useQuery(GET_SUBSCRIPTIONS_NAME);
    const { data: userSubs } = useQuery(GET_USER_SUBS, {
        variables: {
            user_id
        }
    });
    const { data, loading } = useQuery(GET_USER_SUBS_BY_CREATED_AT, {
        variables: {
            user_id
        }
    });

    const planOption = loading || (data && data.user_subs[0].subscriptionOption);
    const subsName = dataSubs && dataSubs.subscriptions[0].name;
    const userSubsStatus = userSubs && userSubs.user_subs[0].status;

    return (
        <>
            <div className={styles.regionTitle}>Cryptuoso Subscription</div>
            <div className={styles.surface}>
                <div className={[styles.row, styles.topPart].join(" ")}>
                    <div className={styles.name}>
                        <div className={styles.tableCellText}>{subsName}</div>
                    </div>
                </div>
                <div>
                    <div className={[styles.row, styles.exchangeGroup].join(" ")}>
                        <div className={styles.exchangeCell}>
                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                Subscription
                            </div>
                            <div className={styles.tableCellText}>{planOption.name}</div>
                        </div>
                        <div className={styles.exchangeCell}>
                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                Amount
                            </div>
                            <div className={styles.tableCellText}>{planOption.amount}</div>
                        </div>
                        <div className={styles.exchangeCell}>
                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                Period
                            </div>
                            <div className={styles.tableCellText}>{planOption.unit}</div>
                        </div>

                        <div className={styles.btn}>
                            <Link href="/profile/subscription-history">
                                <a>
                                    <Button title="History" size="small" icon="history" type="dimmed" />
                                </a>
                            </Link>
                        </div>

                        <div className={styles.exchangeCell}>
                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                Price
                            </div>
                            <div className={styles.tableCellText}>
                                $ {planOption.price_total && planOption.price_total.toFixed(1)}
                            </div>
                        </div>
                        <div className={styles.exchangeCell}>
                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                Status
                            </div>
                            <div className={styles.tableCellText}>{userSubsStatus}</div>
                        </div>

                        {/* <div className={styles.errorCell}>
                            <div className={[styles.errorCellText].join(" ")}>
                                <div style={{ color: color.negative, padding: "0 5px 0 10px" }}>&gt; item.error</div>
                            </div>
                        </div> */}
                    </div>
                    {planOption.active_to && planOption.trial_ended && (
                        <div className={[styles.row, styles.exchangeGroup].join(" ")}>
                            <div className={styles.exchangeCell}>
                                <div className={styles.tableCellText}>
                                    Expires: {planOption.active_to || planOption.trial_ended}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className={[styles.row, styles.exchangeGroup, styles.btnGroup].join(" ")}>
                    <Button title="Change plan" size="small" icon="settings" type="dimmed" />
                    <Button title="Pay" size="small" icon="bitcoin" type="dimmed" />
                    <Button title="Cancel" size="small" icon="close" type="dimmed" />
                </div>
            </div>
        </>
    );
};

export const AccountBalance = memo(_AccountBalance);
