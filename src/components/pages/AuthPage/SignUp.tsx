/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useApolloClient } from "@apollo/client";
import Router from "next/router";

import { CartFooter } from "./common/CartFooter";
import { useFormValidation } from "hooks/useFormValidation";
import { validateAuth } from "config/validation";
import { useRegistration } from "libs/auth";
import { Button, Input } from "components/basic";
import { PageHead, Footer, Header } from "components/layout";
import styles from "./index.module.css";

const INITIAL_STATE = {
    email: "",
    password: "",
    passwordRepeat: ""
};

export const SignUp: React.FC = () => {
    const client = useApolloClient();
    const { handleSubmit, handleChange, values, errors, isValid, setValid } = useFormValidation(
        INITIAL_STATE,
        validateAuth
    );
    const [register, { loading, success, error }] = useRegistration(
        { email: values.email, password: values.password },
        client
    );
    const errorRef = useRef(error);

    useEffect(() => {
        if (isValid && !loading) {
            register();
        }
    }, [isValid]);

    useEffect(() => {
        if (success) {
            Router.push("/auth/verification");
        } else if (error && errorRef.current !== error) {
            setValid(false);
            errors.email = error;
            errorRef.current = error;
        }
    }, [error, success]);

    return (
        <div className={styles.container}>
            <PageHead title="Create account" />
            <div className={styles.header}>
                <Header hasHomeButton />
            </div>
            <div className={styles.plate}>
                <div className={styles.cardWrapper}>
                    <div className={styles.card}>
                        <div className={styles.title}>Create account</div>
                        <Input
                            value={values.email}
                            error={errors.email}
                            maxLength={255}
                            placeholder="Email"
                            width={260}
                            onChangeText={(text: string) => handleChange("email", text)}
                        />
                        <Input
                            value={values.password}
                            style={{ marginTop: 8 }}
                            error={errors.password}
                            maxLength={100}
                            placeholder="Password"
                            type="password"
                            width={260}
                            onChangeText={(text: string) => handleChange("password", text)}
                        />
                        <Input
                            value={values.passwordRepeat}
                            style={{ marginTop: 8 }}
                            error={errors.passwordRepeat}
                            maxLength={100}
                            placeholder="Repeat password"
                            type="password"
                            width={260}
                            onChangeText={(text: string) => handleChange("passwordRepeat", text)}
                        />
                        <Button
                            type="success"
                            style={{ marginTop: 10 }}
                            size="big"
                            width={260}
                            title="Sign Up"
                            isUppercase
                            isLoading={loading}
                            onClick={handleSubmit}
                        />
                    </div>
                    <CartFooter />
                </div>
            </div>
            <Footer />
        </div>
    );
};
