import React, { FC, useContext, useRef, useEffect, useState, memo } from "react";
import Link from "next/link";
import dayjs from "libs/dayjs";
import CoinbaseCommerceButton from "react-coinbase-commerce";
import { useMutation, useQuery } from "@apollo/client";
import { CHECKOUT_USER_SUB, CANCEL_USER_SUB, CHECKOUT_PAYMENT } from "graphql/profile/mutations";
import { GET_USER_SUBS } from "graphql/profile/queries";
import { AuthContext } from "providers/authContext";
import { Modal, Button } from "components/basic";
import { SubscriptionPlan } from "components/ui/Modals/SubscriptionPlanModal";
import { LoadingIndicator, ErrorLine } from "components/common";
import { WalletMembershipIcon } from "assets/icons/svg";
import { getToUpperCase, getPriceTotalWithNoZero, getTimeCharge, formatDateWithData } from "config/utils.ts";
import styles from "./AccountBalance.module.css";

const _AccountBalance: FC = (): any => {
    const {
        authState: { isAuth, user_id }
    } = useContext(AuthContext);

    const buttonRef = useRef(null);

    const INITIAL_OPTIONS = {
        name: "Forever",
        price_total: 0,
        active_to: null,
        trial_ended: null
    };

    const { loading, data, refetch } = useQuery(GET_USER_SUBS, {
        variables: {
            user_id
        }
    });

    const [userSubId, setUserSubId] = useState("");
    const [status, setStatus] = useState("active");
    const [subsName, setSubsName] = useState("FREE PLAN");
    const [subscriptionOption, setSubscriptionOption] = useState(INITIAL_OPTIONS);

    const [userPaymentData, setUserPaymentData] = useState({
        id: "",
        code: "",
        price: 0,
        status: "",
        created_at: null,
        expires_at: null,
        subscription_from: null,
        subscription_to: null
    });

    const [isModalSubsVisible, setModalVisibility] = useState(false);
    const [isModalCancelVisible, setModalCancelVisibility] = useState(false);
    const [isModalCheckoutVisible, setModalCheckoutVisibility] = useState(false);
    const [isOkButton, setOkButton] = useState(false);
    const [isFrame, setIframe] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isPlan, setPlan] = useState(false);
    const [formError, setFormError] = useState("");

    const handleSetSubsVisible = () => setModalVisibility(!isModalSubsVisible);
    const handleSetCancelVisible = () => setModalCancelVisibility(!isModalCancelVisible);
    const [checkoutUserSub] = useMutation(CHECKOUT_USER_SUB);
    const [cancelUserSub] = useMutation(CANCEL_USER_SUB);
    const [checkPayment] = useMutation(CHECKOUT_PAYMENT);

    useEffect(() => {
        if (data && data.user_subs.length) {
            setPlan(data && data.user_subs.length);
            setUserSubId(data.user_subs[0].id);
            setStatus(data.user_subs[0].status);
            setSubsName(data.user_subs[0].subscription.name);
            setSubscriptionOption(data.user_subs[0].subscriptionOption);
        }

        // refetch();
    }, [setPlan, data /*,refetch*/]);

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
            setSubsName("FREE PLAN");
            setStatus("active");
            setSubscriptionOption(INITIAL_OPTIONS);
            refetch();
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

    const handleOnSubscription = (planOptions, { createUserSub: { id } }, { name }) => {
        setSubscriptionOption(planOptions);
        setUserSubId(id);
        setSubsName(name);
        setPlan(true);
        refetch();
    };

    const timeExpiry = getTimeCharge(userPaymentData.expires_at) || 0;

    return (
        <>
            <div className={styles.regionTitle}>Cryptuoso Subscription</div>
            <div className={styles.surface}>
                {!isAuth && (
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
                )}
                {isAuth && !loading ? (
                    <>
                        <div className={styles.topPart}>
                            <div className={styles.name}>
                                <div className={styles.tableCellText}>{subsName}</div>
                            </div>
                        </div>
                        <div className={styles.subsContainer}>
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
                            </div>
                            <div className={styles.row}>
                                <div className={styles.exchangeCell}>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Status
                                    </div>
                                    <div className={styles.tableCellText}>{getToUpperCase(status)}</div>
                                </div>
                                {status === "trial" &&
                                    subscriptionOption?.trial_ended &&
                                    subscriptionOption?.trial_ended !== null && (
                                        <div className={styles.exchangeCell}>
                                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                                Expires
                                            </div>
                                            <div className={styles.tableCellText}>
                                                {dayjs().to(dayjs(subscriptionOption.trial_ended))}
                                            </div>
                                        </div>
                                    )}

                                {status === "active" &&
                                    subscriptionOption?.active_to &&
                                    subscriptionOption?.active_to !== null && (
                                        <div className={styles.exchangeCell}>
                                            <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                                Expires
                                            </div>
                                            <div className={styles.tableCellText}>
                                                {dayjs().to(dayjs(subscriptionOption.active_to))}
                                            </div>
                                        </div>
                                    )}
                            </div>

                            <div className={styles.rowButtonGroup}>
                                <Link href="/profile/payment-history">
                                    <a>
                                        <Button title="Payment History" size="small" icon="history" type="dimmed" />
                                    </a>
                                </Link>
                                <Button
                                    title="Change plan"
                                    size="small"
                                    icon="settings"
                                    type="dimmed"
                                    style={{ width: 136 }}
                                    onClick={handleSetSubsVisible}
                                />
                                <Button
                                    title="Cancel"
                                    size="small"
                                    icon="close"
                                    type="dimmed"
                                    style={{ width: 136 }}
                                    onClick={handleSetCancelVisible}
                                />
                            </div>
                        </div>

                        {isPlan ? (
                            <>
                                <div
                                    className={[
                                        styles.row,
                                        styles.exchangeGroup,
                                        styles.btnGroup,
                                        styles.btnCheckout
                                    ].join(" ")}
                                    style={{ justifyContent: "center" }}>
                                    <Button
                                        title="Checkout"
                                        size="normal"
                                        icon="bitcoin"
                                        type="primary"
                                        onClick={handleSetCheckoutVisible}
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
                ) : (
                    isAuth && (
                        <div className={styles.loader}>
                            <LoadingIndicator />
                        </div>
                    )
                )}

                {isModalSubsVisible && (
                    <Modal isOpen={isModalSubsVisible} onClose={handleSetSubsVisible}>
                        <h2 style={{ color: "white", margin: 0 }}>Choose plan</h2>
                        <SubscriptionPlan
                            enabled={isModalSubsVisible}
                            handleOnClose={handleSetSubsVisible}
                            handleOnClick={handleOnSubscription}
                            currentPlan={subscriptionOption}
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
                            <div
                                className={styles.exchangeCell}
                                style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <div>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Subscription
                                    </div>
                                    <div className={styles.tableCellText}>{subsName}</div>
                                    <div className={styles.tableCellText}>{subscriptionOption.name}</div>
                                </div>
                                <div>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Period
                                    </div>
                                    <div className={styles.tableCellText}>
                                        {formatDateWithData(userPaymentData?.subscription_from)}
                                    </div>
                                    <div className={styles.tableCellText}>
                                        {formatDateWithData(userPaymentData?.subscription_to)}
                                    </div>
                                </div>
                            </div>

                            <div
                                className={styles.exchangeCell}
                                style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                <div>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Price
                                    </div>
                                    <div className={styles.tableCellText}>$ {userPaymentData.price}</div>
                                </div>
                                <div>
                                    <div className={styles.secondaryText} style={{ minWidth: 60 }}>
                                        Status
                                    </div>
                                    <div className={styles.tableCellText}>{userPaymentData.status}</div>
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
                                        onChargeSuccess={() => handleOnModalCheckoutClose()}
                                        onChargeFailure={() => handleOnModalCheckoutClose()}
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
                                onChargeSuccess={() => handleOnModalCheckoutClose()}
                                onChargeFailure={() => handleOnModalCheckoutClose()}
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
                                Are you sure you want to cancel your <b>{subsName}</b> subscription?
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
