import React, { FC, useContext, useRef, useEffect, useState, memo } from "react";
import Link from "next/link";
import CoinbaseCommerceButton from "react-coinbase-commerce";
import { useMutation, useQuery } from "@apollo/client";
import { CHECKOUT_USER_SUB, CANCEL_USER_SUB, CHECKOUT_PAYMENT } from "graphql/profile/mutations";
import { GET_USER_SUBS } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { Modal, Button } from "components/basic";
import { SubscriptionPlan } from "components/ui/Modals/SubscriptionPlanModal";
import { LoadingIndicator, ErrorLine } from "components/common";
import { WalletMembershipIcon } from "assets/icons/svg";
import { getToUpperCase, getPriceTotalWithNoZero, getTimeCharge } from "config/utils.ts";
import styles from "./AccountBalance.module.css";

const _AccountBalance: FC = (): any => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const buttonRef = useRef(null);

    const [userSubId, setUserSubId] = useState("");
    const [status, setStatus] = useState("");
    const [subscription, setSubscription] = useState({ name: "" });

    const [subscriptionOption, setSubscriptionOption] = useState({
        name: "",
        price_total: 0,
        active_to: "",
        trial_ended: ""
    });

    const [userPaymentData, setUserPaymentData] = useState({
        id: "",
        code: "",
        price: 0,
        status: "",
        expires_at: ""
    });

    const [isModalSubsVisible, setModalVisibility] = useState(false);
    const [isModalCancelVisible, setModalCancelVisibility] = useState(false);
    const [isModalCheckoutVisible, setModalCheckoutVisibility] = useState(false);
    const [isOkButton, setOkButton] = useState(false);
    const [isFrame, setIframe] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isPlan, setPlan] = useState(false);
    const [formError, setFormError] = useState("");

    const { loading, error, data } = useQuery(GET_USER_SUBS, {
        variables: {
            user_id
        }
    });

    const handleSetSubsVisible = () => setModalVisibility(!isModalSubsVisible);
    const handleSetCancelVisible = () => setModalCancelVisibility(!isModalCancelVisible);
    const [checkoutUserSub] = useMutation(CHECKOUT_USER_SUB);
    const [cancelUserSub] = useMutation(CANCEL_USER_SUB);
    const [checkPayment] = useMutation(CHECKOUT_PAYMENT);

    useEffect(() => {
        if (!loading && !error && data && data.user_subs.length) {
            setPlan(data && data.user_subs.length);
            setUserSubId(data.user_subs[0].id);
            setStatus(getToUpperCase(data.user_subs[0].status));
            setSubscription(data.user_subs[0].subscription);
            setSubscriptionOption(data.user_subs[0].subscriptionOption);
        }
    }, [loading, error, data]);

    const handleSetCheckoutVisible = () => {
        setLoading(true);
        checkoutUserSub({
            variables: {
                userSubId
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

    const handleSetCancelSubs = () => {
        setLoading(true);
        cancelUserSub({
            variables: {
                userSubId
            }
        }).then((result) => {
            handleSetCancelVisible();
            setLoading(false);
            setPlan(false);
            console.log(`cancelUserSub`, result);
        });
    };

    const handleOnModalCheckoutClose = () => {
        setOkButton(true);
        setIframe(false);
        if (buttonRef.current !== null) buttonRef.current.querySelector("button").textContent = "Check Payment";

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

    const handleOnSubscription = (planOptions, { createUserSub }) => {
        setSubscriptionOption(planOptions);
        setUserSubId(createUserSub.id);
        setPlan(true);
    };

    const timeExpiry = getTimeCharge(userPaymentData.expires_at) || 0;

    return (
        <>
            <div className={styles.regionTitle}>Cryptuoso Subscription</div>
            <div className={styles.surface}>
                {!isAuth ? (
                    <>
                        <div className={styles.titleStab}>
                            <WalletMembershipIcon /> Your user subscription will appear here.
                        </div>
                        <Link href=" /auth/login">
                            <a>
                                <Button
                                    isUppercase
                                    style={{ margin: "0 auto", width: "260px" }}
                                    title="Try for free"
                                    size="big"
                                    type="primary"
                                />
                            </a>
                        </Link>
                    </>
                ) : (
                    <>
                        <div className={styles.topPart}>
                            <div className={styles.name}>
                                <div className={styles.tableCellText}>{subscription.name}</div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.row}>
                                <div className={styles.exchangeCell}>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Period
                                    </div>
                                    <div className={styles.tableCellText}>
                                        {isPlan ? subscriptionOption.name : "Forever"}
                                    </div>
                                </div>
                                <div className={styles.exchangeCell}>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Price
                                    </div>
                                    <div className={styles.tableCellText}>
                                        $ {isPlan ? getPriceTotalWithNoZero(subscriptionOption.price_total) : 0}
                                    </div>
                                </div>
                                <div className={styles.exchangeCell}>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Status
                                    </div>
                                    <div className={styles.tableCellText}>{isPlan ? status : "Active"}</div>
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

                        {isPlan ? (
                            <>
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
                                    <Button
                                        title="Cancel"
                                        size="normal"
                                        icon="close"
                                        type="dimmed"
                                        onClick={handleSetCancelVisible}
                                    />
                                </div>
                                <ErrorLine formError={formError} style={{ width: "auto" }} />
                            </>
                        ) : (
                            <div
                                className={[styles.row, styles.exchangeGroup, styles.btnGroup].join(" ")}
                                style={{ alignSelf: "center" }}>
                                <Button
                                    isUppercase
                                    title="Start free trial"
                                    size="normal"
                                    icon="wallet"
                                    type="primary"
                                    onClick={handleSetSubsVisible}
                                />
                            </div>
                        )}
                    </>
                )}
                {isModalSubsVisible && (
                    <Modal isOpen={isModalSubsVisible} onClose={handleSetSubsVisible}>
                        <h2 style={{ color: "white", margin: 0 }}>Choose plan</h2>
                        <SubscriptionPlan
                            enabled={isModalSubsVisible}
                            handleOnClose={handleSetSubsVisible}
                            handleOnClick={handleOnSubscription}
                            currentPlan={data && data.user_subs && subscriptionOption}
                        />
                        <style jsx>
                            {`
                                @media (max-width: 670px) {
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
                        isFrame={isFrame}
                        onClose={() => {
                            setModalCheckoutVisibility(!isModalCheckoutVisible);
                            setOkButton(false);
                        }}
                        className={`${styles.checkout} ${isFrame ? styles.frame : ""}`}
                        style={{
                            backgroundColor: isFrame ? "transparent" : "",
                            paddingBottom: 20
                        }}>
                        <div className={`${styles.content} ${isFrame ? styles.frame : ""}`}>
                            <h2>Checkout</h2>
                            <div className={styles.exchangeCell}>
                                <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                    Subscription
                                </div>
                                <div className={styles.tableCellText}>
                                    {subscription.name}&nbsp;
                                    {subscriptionOption.name}
                                </div>
                            </div>

                            <div className={styles.exchangeCell}>
                                <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                    Price Status
                                </div>
                                <div className={styles.tableCellText}>
                                    $ {userPaymentData.price} {userPaymentData.status}
                                </div>
                            </div>
                            {timeExpiry <= 0 || (
                                <div className={styles.exchangeCell}>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Charge expires in
                                    </div>
                                    <div className={styles.tableCellText}>
                                        {timeExpiry} {timeExpiry > 1 ? `minutes` : `minute`}
                                    </div>
                                </div>
                            )}
                            <p className={styles.text} style={{ height: isFrame ? "100vh" : "" }}>
                                {`The payment processing and validation
                                on the blockchain may take up to 60 minutes.
                                When your payment will be resolved
                                your subscription will be activated.`}
                                <a
                                    className={styles.howItWorks}
                                    href="https://commerce.coinbase.com/faq#customers"
                                    rel="nofollow">
                                    How it works?
                                </a>
                            </p>
                        </div>
                        {isOkButton ? (
                            <>
                                <div ref={buttonRef} style={{ marginBottom: 15 }}>
                                    <CoinbaseCommerceButton
                                        styled={{ display: "flex" }}
                                        chargeId={userPaymentData.code}
                                        onLoad={() => setIframe(true)}
                                        onModalClosed={() => handleOnModalCheckoutClose()}
                                    />
                                </div>
                                <Button
                                    title="OK"
                                    size="normal"
                                    type="dimmed"
                                    onClick={() => {
                                        setModalCheckoutVisibility(!isModalCheckoutVisible);
                                        setOkButton(false);
                                    }}
                                />
                            </>
                        ) : (
                            <CoinbaseCommerceButton
                                styled={{ display: "flex" }}
                                chargeId={userPaymentData.code}
                                onLoad={() => setIframe(true)}
                                onModalClosed={() => handleOnModalCheckoutClose()}
                            />
                        )}
                        {isLoading && (
                            <div className={styles.loader}>
                                <LoadingIndicator />
                            </div>
                        )}
                    </Modal>
                )}
            </div>
            {isModalCancelVisible && (
                <>
                    <Modal isOpen={isModalCancelVisible} onClose={handleSetCancelVisible} className={styles.cancel}>
                        <h2 className={styles.title}>Cancel subscription</h2>
                        <div className={`${styles.text}`}>
                            <p>
                                Are you sure you want to cancel your <b>{subscription.name}</b> subscription?
                            </p>
                            <p>
                                All robots will be <b>stopped</b>! If there are any <b>open positions</b> they will be{" "}
                                <b>canceled</b> (closed) with current market prices and potentially may cause profit{" "}
                                <b>losses</b>
                            </p>
                        </div>
                        <div className={styles.btnGroup}>
                            <Button
                                isUppercase
                                style={{ margin: "0 auto", width: "80px" }}
                                title="Yes"
                                size="normal"
                                type="primary"
                                onClick={handleSetCancelSubs}
                            />
                            <Button
                                isUppercase
                                style={{ margin: "0 auto", width: "80px" }}
                                title="No"
                                size="normal"
                                type="success"
                                onClick={handleSetCancelVisible}
                            />
                        </div>
                        {isLoading && (
                            <div className={styles.loader}>
                                <LoadingIndicator />
                            </div>
                        )}
                    </Modal>
                </>
            )}
        </>
    );
};

export const AccountBalance = memo(_AccountBalance);
