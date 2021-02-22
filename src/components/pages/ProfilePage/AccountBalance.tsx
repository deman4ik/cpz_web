import React, { FC, useContext, useState, memo } from "react";
import Link from "next/link";
import CoinbaseCommerceButton from "react-coinbase-commerce";
import { useMutation, useQuery } from "@apollo/client";
import { CHECKOUT_USER_SUB, CHECKOUT_PAYMENT } from "graphql/profile/mutations";
import { GET_USER_SUBS } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { Modal, Button } from "components/basic";
import { SubscriptionPlan } from "../../ui/Modals/SubscriptionPlanModal";
import { LoadingIndicator, ErrorLine } from "components/common";
import { getPriceTotalWithNoZero, getTimeCharge } from "config/utils.ts";
import styles from "./AccountBalance.module.css";

const _AccountBalance: FC = (): any => {
    const {
        authState: { user_id }
    } = useContext(AuthContext);
    const [isModalSubsVisible, setModalVisibility] = useState(false);
    const [isModalCheckoutVisible, setModalCheckoutVisibility] = useState(false);
    const [formError, setFormError] = useState("");
    const [userPaymentData, setUserPaymentData] = useState({ id: "", code: "", price: 0, status: "", expires_at: "" });
    const [isOkButton, setOkButton] = useState(false);
    const [isFrame, setIframe] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const { data, loading } = useQuery(GET_USER_SUBS, {
        variables: {
            user_id
        }
    });
    const [checkoutUserSub] = useMutation(CHECKOUT_USER_SUB);
    const [checkPayment] = useMutation(CHECKOUT_PAYMENT);

    if (loading || !data) return "Loading...";

    const { id, status, subscription, subscriptionOption } = data.user_subs[0];

    const handleSetSubsVisible = () => setModalVisibility(!isModalSubsVisible);
    const handleSetCheckoutVisible = () => {
        setLoading(true);
        checkoutUserSub({
            variables: {
                userSubId: id
            }
        })
            .then(
                ({
                    data: {
                        checkoutUserSub: { userPayment }
                    }
                }) => {
                    setModalCheckoutVisibility(!isModalCheckoutVisible);
                    setUserPaymentData({ ...userPayment });
                    setLoading(false);
                    console.log(`checkoutUserSub.userPayment`, userPayment);
                }
            )
            .catch(({ message }) => setFormError(message));
    };
    const handleOnModalCheckoutClose = () => {
        setLoading(true);
        checkPayment({
            variables: {
                chargeId: userPaymentData.id
            }
        })
            .then(
                ({
                    data: {
                        checkPayment: { userPayment }
                    }
                }) => {
                    setUserPaymentData({ ...userPaymentData, status: userPayment.status });
                    setLoading(false);
                    console.log(`checkPayment.userPayment`, userPayment);
                }
            )
            .catch(({ message }) => setFormError(message));
    };

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
                            onClick={handleSetCheckoutVisible}
                        />
                    </div>
                ) : (
                    <>
                        <div className={styles.topPart}>
                            <div className={styles.name}>
                                <div className={styles.tableCellText}>{subscription.name}</div>
                            </div>
                        </div>
                        <div>
                            {isLoading && (
                                <div className={styles.loader}>
                                    <LoadingIndicator />
                                </div>
                            )}
                            <div className={styles.row}>
                                <div className={styles.exchangeCell}>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Period
                                    </div>
                                    <div className={styles.tableCellText}>{subscriptionOption.name}</div>
                                </div>
                                <div className={styles.exchangeCell}>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Price
                                    </div>
                                    <div className={styles.tableCellText}>
                                        $ {getPriceTotalWithNoZero(subscriptionOption.price_total)}
                                    </div>
                                </div>
                                <div className={styles.exchangeCell}>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Status
                                    </div>
                                    <div className={styles.tableCellText}>
                                        {status[0].toUpperCase() + status.slice(1)}
                                    </div>
                                </div>
                                <div className={styles.exchangeCell}>
                                    <Link href="/profile/payment-history">
                                        <a>
                                            <Button title="Payment History" size="small" icon="history" type="dimmed" />
                                        </a>
                                    </Link>
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
                            <Button
                                title="Change plan"
                                size="normal"
                                icon="settings"
                                type="dimmed"
                                onClick={handleSetSubsVisible}
                            />
                            <Button
                                title="Checkout"
                                size="normal"
                                icon="bitcoin"
                                type="primary"
                                onClick={handleSetCheckoutVisible}
                            />
                            <Button title="Cancel" size="normal" icon="close" type="dimmed" />
                        </div>
                        <ErrorLine formError={formError} style={{ margin: 0 }} />
                    </>
                )}
                {isModalSubsVisible && (
                    <Modal isOpen={isModalSubsVisible} onClose={handleSetSubsVisible} style={{ padding: 10 }}>
                        <h2 style={{ color: "white", margin: 0 }}>Choose plan</h2>
                        <SubscriptionPlan
                            enabled={isModalSubsVisible}
                            subsName={subscriptionOption.name}
                            handleOnClose={handleSetSubsVisible}
                            currentPlan={subscriptionOption}
                        />
                        <style jsx>
                            {`
                                @media (max-width: 670px) {
                                    :global(a) {
                                        padding: 10px !important;
                                    }
                                    :global(div) {
                                        margin: 0 !important;
                                    }
                                }
                            `}
                        </style>
                    </Modal>
                )}
                {isModalCheckoutVisible && (
                    <Modal
                        isOpen={isModalCheckoutVisible}
                        onClose={() => {
                            setModalCheckoutVisibility(!isModalCheckoutVisible);
                            setOkButton(false);
                            document.body.style.overflow = "auto";
                        }}
                        style={{
                            maxWidth: "480px",
                            padding: 20,
                            backgroundColor: isFrame ? "transparent" : ""
                        }}
                        isFrame={isFrame}>
                        <div
                            style={{
                                color: "white",
                                textAlign: "center",
                                opacity: isFrame ? "0" : "1"
                            }}>
                            <h2 style={{ color: "white", margin: 0 }}>Checkout</h2>
                            <p>
                                {subscription.name}&nbsp;
                                {subscriptionOption.name}
                            </p>
                            <p>Price: $ {userPaymentData.price}</p>
                            <p>Status: {userPaymentData.status}</p>
                            <p>Charge expires {getTimeCharge(userPaymentData.expires_at)}</p>
                            <p
                                style={{
                                    fontSize: 14,
                                    width: "100%",
                                    height: isFrame ? "100vh" : "",
                                    whiteSpace: "pre-line",
                                    margin: "0 auto"
                                }}>
                                {`The payment processing and validation
on the blockchain may take up to 60 minutes.
When your payment will be resolved
your subscription will be activated.`}
                                <a
                                    style={{ display: "block", fontSize: 14, margin: "10px 0 20px" }}
                                    href="https://commerce.coinbase.com/faq#customers"
                                    rel="nofollow">
                                    How it works?
                                </a>
                            </p>
                        </div>
                        {isOkButton ? (
                            <Button
                                title="OK"
                                size="normal"
                                type="dimmed"
                                onClick={() => {
                                    setModalCheckoutVisibility(!isModalCheckoutVisible);
                                    setOkButton(false);
                                }}
                            />
                        ) : (
                            <>
                                <CoinbaseCommerceButton
                                    styled={{ display: "flex" }}
                                    chargeId={userPaymentData.code}
                                    onLoad={() => setIframe(true)}
                                    onModalClosed={() => {
                                        handleOnModalCheckoutClose();
                                        setOkButton(true);
                                        setIframe(false);
                                    }}
                                />
                            </>
                        )}
                    </Modal>
                )}
            </div>
        </>
    );
};

export const AccountBalance = memo(_AccountBalance);
