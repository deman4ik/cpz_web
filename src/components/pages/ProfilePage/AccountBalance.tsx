import React, { FC, useContext, useState, memo } from "react";
import Link from "next/link";
import CoinbaseCommerceButton from "react-coinbase-commerce";
import { useMutation, useQuery } from "@apollo/client";
import { CHECKOUT_USER_SUB } from "graphql/profile/mutations";
import { GET_USER_SUBS } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { Modal, Button } from "components/basic";
import { SubscriptionPlan } from "../../ui/Modals/SubscriptionPlanModal";
import { ErrorLine } from "components/common";
import styles from "./AccountBalance.module.css";

const _AccountBalance: FC = (): any => {
    const [isModalVisible, setModalVisibility] = useState(false);
    const [formError, setFormError] = useState("");
    const [checkoutUserSub, { data: chekoutData }] = useMutation(CHECKOUT_USER_SUB);
    const handleSetVisible = () => setModalVisibility(!isModalVisible);

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
    const { subscription, subscription_id } = subscriptionOption;

    const handleOnCheckoutUserSub = () => {
        checkoutUserSub({
            variables: {
                userSubId: subscription_id
            }
        }).catch(({ message }) => setFormError(message));
    };

    const handleOnModalClose = () => console.log(`closed!`);

    console.log(`chekoutData`, chekoutData);

    return (
        <>
            <div className={styles.regionTitle}>Cryptuoso Subscription</div>
            <div className={styles.surface}>
                {!status ? (
                    <div className={styles.stub}>
                        <div className={styles.title}>
                            <h4>Cryptuoso Trading Signal:&nbsp;</h4>
                            <p>FREE PLAN</p>
                        </div>
                        <div className={styles.title}>
                            Status:&nbsp;
                            <div className={styles.beta}>Active</div>
                        </div>

                        <Button
                            isUppercase
                            style={{ margin: "20px auto" }}
                            title="Start free trial"
                            size="small"
                            type="primary"
                            onClick={handleSetVisible}
                        />
                    </div>
                ) : (
                    <>
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
                        <div
                            style={{
                                textAlign: "center",
                                backgroundColor: "white",
                                marginTop: 10,
                                padding: 5,
                                borderRadius: 5
                            }}>
                            <CoinbaseCommerceButton chargeId={subscription_id} />
                        </div>
                        <div className={[styles.row, styles.exchangeGroup, styles.btnGroup].join(" ")}>
                            <Button
                                title="Change plan"
                                size="small"
                                icon="settings"
                                type="dimmed"
                                onClick={handleSetVisible}
                            />
                            <Button
                                title="Pay"
                                size="small"
                                icon="bitcoin"
                                type="dimmed"
                                onClick={handleOnCheckoutUserSub}
                            />
                            <Button title="Cancel" size="small" icon="close" type="dimmed" />
                        </div>
                        <ErrorLine formError={formError} style={{ margin: 0 }} />
                    </>
                )}
                {isModalVisible && (
                    <Modal isOpen={isModalVisible} onClose={() => handleSetVisible()} style={{ paddingTop: "20px" }}>
                        <h2 style={{ color: "white", margin: 0 }}>Choose plan</h2>
                        <SubscriptionPlan enabled={isModalVisible} subsName={subscriptionOption.name} />
                    </Modal>
                )}
            </div>
        </>
    );
};

export const AccountBalance = memo(_AccountBalance);
