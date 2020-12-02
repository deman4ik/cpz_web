import React, { memo, useEffect, useRef, useState } from "react";
import Router from "next/router";
import { useMutation } from "@apollo/client";

import { ADD_TELEGRAM_ACCOUNT } from "graphql/user/mutations";
import { GET_USER_INFO } from "graphql/user/queries";
import { useTelegramLogin } from "libs/auth";
import { Modal } from "components/basic";
import { LoadingIndicator } from "components/common";
import styles from "./index.module.css";

const DOC_LINK = "https://support.cryptuoso.com";

interface Props {
    userId?: number;
    message?: string;
    buttonSize?: string;
    borderRadius?: number;
    userPic?: boolean;
}

const _TelegramLogin: React.FC<Props> = ({
    userId,
    message,
    buttonSize = "medium",
    borderRadius = 2,
    userPic = true
}) => {
    let instance;

    const [errorModalVisible, setModalVisibility] = useState(false);
    const [addTelegram, { loading: addLoading }] = useMutation(ADD_TELEGRAM_ACCOUNT);
    const [login, { loading }] = useTelegramLogin();
    const errorRef = useRef(null);

    useEffect(() => {
        (window as any).onTelegramAuth = (data) => {
            if (userId)
                addTelegram({
                    variables: { data },
                    refetchQueries: [{ query: GET_USER_INFO }]
                }).catch((err) => (errorRef.current = err.message));
            else {
                login({
                    variables: { data }
                })
                    .then(
                        () => {
                            Router.push("/robots");
                        },
                        (error) => {
                            errorRef.current = error.message;
                            setModalVisibility(true);
                        }
                    )
                    .catch((error) => {
                        errorRef.current = error.message;
                        setModalVisibility(true);
                    });
            }
        };
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-login", process.env.TELEGRAM_BOT_NAME);
        script.setAttribute("data-size", buttonSize);
        script.setAttribute("data-radius", `${borderRadius}`);
        script.setAttribute("data-request-access", "write");
        script.setAttribute("data-userpic", `${userPic}`);
        script.setAttribute("data-onauth", "onTelegramAuth(user)");
        script.async = true;
        instance.appendChild(script);
    }, [addTelegram, borderRadius, buttonSize, instance, login, userId, userPic]);

    return (
        <>
            <div className={styles.container}>
                {(loading || addLoading) && <LoadingIndicator />}
                <div className={styles.widget} ref={(ref) => (instance = ref)} />
            </div>
            {message && (
                <div className={styles.telegramPlaceholder}>
                    <div>{message}</div>
                    <br />
                    <span>
                        If you&apos;re unable to log in using the widget, your browser may be blocking third-party
                        cookies. Learn how to fix this in{" "}
                        <a href={`${DOC_LINK}/help#logginginviatelegram`} target="_blank" rel="noreferrer">
                            cryptuoso docs
                        </a>
                        .
                    </span>
                </div>
            )}
            <Modal title="Error" isOpen={errorModalVisible} onClose={() => setModalVisibility(false)}>
                <div className={styles.errorText}>{errorRef.current}</div>
            </Modal>
        </>
    );
};

export default memo(_TelegramLogin);
