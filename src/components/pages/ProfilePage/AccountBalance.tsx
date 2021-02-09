import React, { FC, useContext, memo } from "react";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_SUBS } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { Button } from "components/basic";
import { color } from "config/constants";
import styles from "./AccountBalance.module.css";

const _AccountBalance: FC = (): any => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const { data, loading } = useQuery(GET_USER_SUBS, {
        variables: {
            user_id
        }
    });

    if (loading) return "Loading...";

    const { subscriptionOption, status } = data.user_subs[0];
    const { subscription } = subscriptionOption;

    return (
        <>
            <div className={styles.regionTitle}>Cryptuoso Subscription</div>
            <div className={styles.surface}>
                <div className={[styles.row, styles.topPart].join(" ")}>
                    <div className={styles.name}>
                        <div className={styles.tableCellText}>{subscription.name}</div>
                    </div>
                </div>
                <div>
                    <div className={[styles.row, styles.exchangeGroup].join(" ")}>
                        <div className={styles.exchangeCell}>
                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                Subscription
                            </div>
                            <div className={styles.tableCellText}>{subscriptionOption.name}</div>
                        </div>
                        <div className={styles.exchangeCell}>
                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                Amount
                            </div>
                            <div className={styles.tableCellText}>{subscriptionOption.amount}</div>
                        </div>
                        <div className={styles.exchangeCell}>
                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                Period
                            </div>
                            <div className={styles.tableCellText}>{subscriptionOption.unit}</div>
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
                                $ {subscriptionOption.price_total && subscriptionOption.price_total.toFixed(1)}
                            </div>
                        </div>
                        <div className={styles.exchangeCell}>
                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                Status
                            </div>
                            <div className={styles.tableCellText}>{status}</div>
                        </div>
                    </div>
                    {subscriptionOption.active_to && subscriptionOption.trial_ended && (
                        <div className={[styles.row, styles.exchangeGroup].join(" ")}>
                            <div className={styles.exchangeCell}>
                                <div className={styles.tableCellText}>
                                    Expires: {subscriptionOption.active_to || subscriptionOption.trial_ended}
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
