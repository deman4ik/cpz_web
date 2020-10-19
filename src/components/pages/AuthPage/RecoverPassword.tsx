/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import Router, { useRouter } from "next/router";

import { USER } from "graphql/local/queries";
import { CartFooter } from "./common/CartFooter";
import { Button, Input } from "components/basic";
import { useFormValidation } from "hooks/useFormValidation";
import { validateAuth } from "config/validation";
import { useResetConfirmation } from "libs/auth";
import { Footer, PageHead, Header } from "components/layout";
import styles from "./index.module.css";
import { HTMLButtonTypes } from "components/basic/Button/types";

export const RecoverPassword: React.FC = () => {
    const encodedData = useRouter().query.encoded as string;
    const { userId = "", secretCode = "" } = encodedData
        ? JSON.parse(Buffer.from(encodedData, "base64").toString())
        : {};

    const INITIAL_STATE = {
        verificationCode: secretCode,
        password: "",
        passwordRepeat: ""
    };

    const { data: userInfo } = useQuery(USER);

    const { handleSubmit, handleChange, values, errors, isValid, setValid } = useFormValidation(
        INITIAL_STATE,
        validateAuth
    );
    const [confirm, { loading, success, error }] = useResetConfirmation({
        userId: userId || userInfo?.userId,
        secretCode: secretCode || values.verificationCode,
        password: values.password
    });
    const errorRef = useRef(error);

    useEffect(() => {
        if (isValid && !loading) {
            confirm();
        }
    }, [isValid]);

    useEffect(() => {
        if (success) {
            Router.push("/auth/recovered");
        } else if (error && errorRef.current !== error) {
            setValid(false);
            errors.verificationCode = error;
            errorRef.current = error;
        }
    }, [error, success]);

    return (
        <div className={styles.container}>
            <PageHead title="Reset password" />
            <div className={styles.header}>
                <Header hasHomeButton />
            </div>
            <div className={styles.plate}>
                <div className={styles.cardWrapper}>
                    <form className={styles.card} onSubmit={handleSubmit}>
                        <div className={styles.title}>Reset</div>
                        <Input
                            value={values.verificationCode}
                            error={errors.verificationCode}
                            placeholder="Verification code"
                            maxLength={6}
                            label="Verification Code"
                            autoComplete="one-time-code"
                            width={260}
                            onChangeText={(text: string) => handleChange("verificationCode", text)}
                        />
                        <Input
                            value={values.password}
                            style={{ marginTop: 8 }}
                            maxLength={100}
                            error={errors.password}
                            placeholder="Password"
                            label="Password"
                            autoComplete="current-password"
                            width={260}
                            type="password"
                            onChangeText={(text: string) => handleChange("password", text)}
                        />
                        <Input
                            value={values.passwordRepeat}
                            style={{ marginTop: 8 }}
                            maxLength={100}
                            width={260}
                            error={errors.passwordRepeat}
                            placeholder="Repeat password"
                            label="Repeat Password"
                            autoComplete="new-password"
                            type="password"
                            onChangeText={(text: string) => handleChange("passwordRepeat", text)}
                        />
                        <Button
                            buttonType={HTMLButtonTypes.submit}
                            type="success"
                            size="big"
                            style={{ marginTop: 10 }}
                            title="Reset"
                            width={260}
                            isUppercase
                            isLoading={loading}
                        />
                    </form>
                    <CartFooter />
                </div>
            </div>
            <Footer />
        </div>
    );
};
