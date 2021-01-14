/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Router from "next/router";
import { useApolloClient } from "@apollo/client";

import { useFormValidation } from "hooks/useFormValidation";
import { validateAuth } from "config/validation";
import { CartFooter } from "./common/CartFooter";
import { Input, Button } from "components/basic";
import { PageHead, Footer, Header } from "components/layout";
import { usePasswordReset } from "libs/auth";
import styles from "./index.module.css";
import { HTMLButtonTypes } from "components/basic/Button/types";

const INITIAL_STATE = {
    email: ""
};

export const ForgotPassword: React.FC = () => {
    const client = useApolloClient();
    const { handleSubmit, handleChange, values, errors, isValid, setValid } = useFormValidation(
        INITIAL_STATE,
        validateAuth
    );
    const [reset, { loading, success, error }] = usePasswordReset({ email: values.email }, client);
    const errorRef = useRef(error);

    useEffect(() => {
        if (success) {
            Router.push("/auth/recover_password");
        } else if (error && errorRef.current !== error) {
            setValid(false);
            errors.email = error;
            errorRef.current = error;
        }
    }, [error, success]);

    useEffect(() => {
        if (isValid && !loading) reset();
    }, [isValid]);

    return (
        <div className={styles.container}>
            <PageHead title="Enter the Email you have registered with. We will send you the instructions there." />
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.plate}>
                <div className={styles.cardWrapper}>
                    <form className={styles.card} onSubmit={handleSubmit}>
                        <div className={styles.title}>Forgot password?</div>
                        <div className={styles.titleDescription}>
                            Enter the Email you have registered with. We will send you the instructions there.
                        </div>
                        <Input
                            value={values.email}
                            error={errors.email}
                            maxLength={255}
                            width={260}
                            placeholder="Email"
                            label="Email"
                            autoComplete="email"
                            onChangeText={(text: string) => handleChange("email", text)}
                        />
                        <Button
                            buttonType={HTMLButtonTypes.submit}
                            style={{ marginTop: 25 }}
                            title="Request password reset"
                            type="success"
                            size="big"
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
