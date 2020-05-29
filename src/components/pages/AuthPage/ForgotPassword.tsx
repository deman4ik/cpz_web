/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useApolloClient } from "@apollo/react-hooks";

import { useFormValidation } from "hooks/useFormValidation";
import { validateAuth } from "config/validation";
import { CartFooter } from "./common/CartFooter";
import { Input, Button } from "components/basic";
import { PageHead, Footer, Header } from "components/layout";
import { reset } from "libs/auth";
import styles from "./index.module.css";

const INITIAL_STATE = {
    email: ""
};

export const ForgotPassword: React.FC = () => {
    const [isFetching, setIsFetching] = useState(false);
    const client = useApolloClient();
    const { handleSubmit, handleChange, values, errors, isValid, setValid } = useFormValidation(
        INITIAL_STATE,
        validateAuth
    );

    const handleOnPress = () => {
        handleSubmit();
    };

    const recoverPassword = async () => {
        const result = await reset(values.email, client);

        if (result.success) {
            Router.push("/auth/recover_password");
        } else {
            errors.email = result.error;
            setValid(false);
            setIsFetching(false);
        }
    };

    useEffect(() => {
        if (isValid) {
            setIsFetching(true);
            recoverPassword();
        }
    }, [isValid]);

    return (
        <div className={styles.container}>
            <PageHead title="Enter the Email you have registered with. We will send you the instructions there." />
            <div className={styles.header}>
                <Header hasHomeButton />
            </div>
            <div className={styles.plate}>
                <div className={styles.cardWrapper}>
                    <div className={styles.card}>
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
                            onChangeText={(text: string) => handleChange("email", text)}
                        />
                        <Button
                            style={{ marginTop: 25 }}
                            title="Request password reset"
                            type="success"
                            size="big"
                            width={260}
                            isUppercase
                            isLoading={isFetching}
                            onClick={handleOnPress}
                        />
                    </div>
                    <CartFooter />
                </div>
            </div>
            <Footer />
        </div>
    );
};
