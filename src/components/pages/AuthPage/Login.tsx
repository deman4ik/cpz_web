/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Router from "next/router";
import dynamic from "next/dynamic";

import { useFormValidation } from "hooks/useFormValidation";
import { validateAuth } from "config/validation";
import { login } from "libs/auth";
import { Input, Button } from "components/basic";
import { PageHead, Header, Footer } from "components/layout";
import styles from "./index.module.css";

const INITIAL_STATE = {
    email: ""
};

const TelegramLoginWithNoSSR = dynamic(() => import("components/ui/TelegramLogin"), { ssr: false });
const message =
    "If you do not see the Telegram login widget here, it seems that the Telegram is blocked in your country. Please use a proxy or VPN to access the Telegram login widget.";
export const Login: React.FC = () => {
    const { handleSubmit, handleChange, values, errors, isValid, setValid } = useFormValidation(
        INITIAL_STATE,
        validateAuth
    );
    const [password, setPassword] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const onChangePassword = (value: string) => {
        setPassword(value);
    };

    const handleLogin = () => {
        handleSubmit();
    };

    const loginUser = async () => {
        const result = await login({
            email: values.email,
            password
        });

        if (result.success) {
            Router.push("/robots");
        } else {
            errors.password = result.error;
            setValid(false);
            setIsFetching(false);
        }
    };

    const handleSwitchToStep = (step: string) => {
        if (step === "signUp") {
            Router.push("/auth/signup");
        } else {
            Router.push("/auth/forgot_password");
        }
    };

    useEffect(() => {
        if (isValid) {
            setIsFetching(true);
            loginUser();
        }
    }, [isValid]);

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
                            />
                            <Input
                                style={{ marginTop: 8 }}
                                value={password}
                                maxLength={100}
                                width={260}
                                error={errors.password}
                                placeholder="Password"
                                onChangeText={(text) => onChangePassword(text)}
                                type="password"
                            />
                            <Button
                                style={{ marginTop: 10 }}
                                type="success"
                                size="big"
                                title="log in"
                                width={260}
                                isUppercase
                                isLoading={isFetching}
                                onClick={handleLogin}
                            />
                        </div>
                        <div className={styles.divider} />
                        <div className={styles.card}>
                            <div className={styles.loginDescription}>
                                If you don’t already have an account click the button below to create your account.
                            </div>
                            <Button
                                type="primary"
                                size="big"
                                title="Create account"
                                width={260}
                                isUppercase
                                onClick={() => handleSwitchToStep("signUp")}
                            />
                            <div className={styles.telegramGroup}>
                                <div className={styles.telegramDesription}>OR SIGN UP USING TELEGRAM</div>
                                <TelegramLoginWithNoSSR message={message} buttonSize="large" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.footerLogin}>
                        <span>So you can&apos;t get into your account?&nbsp;</span>
                        <span>
                            Did you&nbsp;
                            <span className={styles.forgotLine} onClick={() => handleSwitchToStep("forgotPassword")}>
                                <span className={styles.decoration}>forgot your password</span>
                            </span>
                            ?
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
            <div id="modal" />
        </div>
    );
};
