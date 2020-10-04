/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useRef } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";

import { useFormValidation } from "hooks/useFormValidation";
import { validateAuth } from "config/validation";
import { useEmailLogin } from "libs/auth";
import { Input, Button } from "components/basic";
import { PageHead, Header, Footer } from "components/layout";
import styles from "./index.module.css";

const INITIAL_STATE = {
    email: "",
    password: ""
};

const TelegramLoginWithNoSSR = dynamic(() => import("components/ui/TelegramLogin"), { ssr: false });
const message =
    "If you do not see the Telegram login widget here, it seems that the Telegram is blocked in your country. Please use a proxy or VPN to access the Telegram login widget.";
const _Login: React.FC = () => {
    const { handleSubmit, handleChange, values, errors, isValid, setValid } = useFormValidation(
        INITIAL_STATE,
        validateAuth
    );

    console.log("Login rendered");

    const [login, { loading, success, error }] = useEmailLogin({ email: values.email, password: values.password });
    const errorRef = useRef(error);

    const handleSwitchToStep = (step: string) => {
        if (step === "signUp") {
            Router.push("/auth/signup");
        } else {
            Router.push("/auth/forgot_password");
        }
    };

    useEffect(() => {
        console.log("isvalid update");
        
        if (isValid && !loading && !success) {
            login();
        }
    }, [isValid]);

    useEffect(() => {
        console.log("success-error update")
        if (success) {
            if (typeof window !== "undefined") localStorage.setItem("refreshTokenSet", "true");
            Router.push("/robots");
        } else if (errorRef.current !== error) {
            setValid(false);
            errors.password = error;
            errorRef.current = error;
        }
    }, [success, error]);

    return (
        <div className={styles.container} style={{ alignContent: "space-between" }}>
            <PageHead title="Login" />
            <div className={styles.header}>
                <Header hasHomeButton />
            </div>
            <div className={[styles.plate, styles.plateLogin].join(" ")}>
                <div className={styles.cardWrapper}>
                    <div className={styles.content}>
                        <div className={styles.card} style={{ justifyContent: "center" }}>
                            <div className={styles.title}>Login</div>
                            <Input
                                error={errors.email}
                                value={values.email}
                                maxLength={255}
                                width={260}
                                placeholder="Email"
                                onChangeText={(text: string) => handleChange("email", text)}
                                autoComplete="email"
                            />
                            <Input
                                style={{ marginTop: 8 }}
                                value={values.password}
                                maxLength={100}
                                width={260}
                                error={errors.password}
                                placeholder="Password"
                                onChangeText={(text) => handleChange("password", text)}
                                type="password"
                                autoComplete="password"
                            />
                            <Button
                                style={{ marginTop: 10 }}
                                type="success"
                                size="big"
                                title="log in"
                                width={260}
                                isUppercase
                                isLoading={loading}
                                onClick={handleSubmit}
                            />
                            <div className={styles.loginDescription}>
                                If you don’t already have an account and have not used our
                                <a href={`https://t.me/${process.env.TELEGRAM_BOT_NAME}`}> Telegram bot</a> yet click
                                the button below to create your account with email.
                            </div>
                            <Button
                                type="primary"
                                size="big"
                                title="Create account"
                                width={260}
                                isUppercase
                                onClick={() => handleSwitchToStep("signUp")}
                            />
                        </div>
                        <div className={styles.divider_container}>
                            <div className={styles.divider} />
                            <div className={styles.divider_text}>OR</div>
                        </div>
                        <div className={styles.card} style={{ justifyContent: "center", textAlign: "center" }}>
                            <div className={styles.telegramGroup}>
                                <div className={styles.telegramDesription}>
                                    If you have a Telegram account and want to use our
                                    <a href={`https://t.me/${process.env.TELEGRAM_BOT_NAME}`}> Telegram bot</a> just log
                                    in using Telegram
                                </div>
                                <TelegramLoginWithNoSSR message={message} buttonSize="large" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.footerLogin}>
                        <span className={styles.forgotLine} onClick={() => handleSwitchToStep("forgotPassword")}>
                            <span className={styles.decoration}>Forgot your password?</span>
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
            <div id="modal" />
        </div>
    );
};

export const Login = memo(_Login);
