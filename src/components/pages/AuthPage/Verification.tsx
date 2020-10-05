/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import Router from "next/router";

import { useConfirmation } from "libs/auth";
import { useFormValidation } from "hooks/useFormValidation";
import { validateAuth } from "config/validation";
import { USER } from "graphql/local/queries";
import { CartFooter } from "./common/CartFooter";
import { Button, Input } from "components/basic";
import { Footer, PageHead, Header } from "components/layout";
import styles from "./index.module.css";

const INITIAL_STATE = {
    verificationCode: ""
};

export const Verification: React.FC = () => {
    const { data, loading: userInfoLoading } = useQuery(USER);
    const { handleSubmit, handleChange, values, errors, isValid, setValid } = useFormValidation(
        INITIAL_STATE,
        validateAuth
    );
    const [confirm, { loading, success, error }] = useConfirmation({
        userId: data.userId,
        secretCode: values.verificationCode
    });
    const errorRef = useRef(error);

    useEffect(() => {
        if (!userInfoLoading && data && !data.userId) {
            Router.push("/auth/signup");
        }
    }, [data]);

    useEffect(() => {
        if (isValid && !loading && !success) {
            confirm();
        }
    }, [isValid]);

    useEffect(() => {
        if (success) {
            Router.push("/auth/activated");
        } else if (error && errorRef.current !== error) {
            setValid(false);
            errors.verificationCode = error;
            errorRef.current = error;
        }
    }, [error, success]);

    return (
        <div className={styles.container}>
            <PageHead title="Verification" />
            <div className={styles.header}>
                <Header hasHomeButton />
            </div>
            <div className={styles.plate}>
                <div className={styles.cardWrapper}>
                    <div className={styles.card}>
                        <div className={styles.title}>Verification</div>
                        <div className={styles.titleDescription}>
                            Enter the verification code you recieved via Email below.
                        </div>
                        <Input
                            value={values.verificationCode}
                            error={errors.verificationCode}
                            placeholder="Verification code"
                            maxLength={6}
                            width={260}
                            onChangeText={(text: string) => handleChange("verificationCode", text)}
                        />
                        <Button
                            size="big"
                            style={{ marginTop: 30 }}
                            title="Verify my email address"
                            type="success"
                            width={260}
                            isLoading={loading}
                            onClick={handleSubmit}
                            isUppercase
                        />
                    </div>
                    <CartFooter />
                </div>
            </div>
            <Footer />
        </div>
    );
};
