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
}

const borderRadius = 2;
const requestAccess = "write";
const userPic = true;
const _TelegramLogin: React.FC<Props> = ({ userId, message, buttonSize = "medium" }) => {
    let instance;

    const [loginData, setLoginData] = useState({ id: null, hash: null });
    const [addTelegram, { loading: addLoading }] = useMutation(ADD_TELEGRAM_ACCOUNT);
    const [login, { loading, error }] = useTelegramLogin(loginData);
    const errorRef = useRef(error);

    useEffect(() => {
        (window as any).TelegramLoginWidget = userId
            ? {
                  dataOnauth: (data) => {
                      addTelegram({
                          variables: { data },
                          refetchQueries: [{ query: GET_USER_INFO }]
                      }).catch((e) => (errorRef.current = e.message));
                  }
              }
            : {
                  dataOnauth: (data) => {
                      setLoginData(data);
                      login()
                          .then(() => {
                              Router.push("/robots");
                          })
                          .catch((err) => (errorRef.current = err));
                  }
              };
        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?7";
        script.setAttribute("data-telegram-login", process.env.TELEGRAM_BOT_NAME);
        script.setAttribute("data-size", buttonSize);
        script.setAttribute("data-radius", `${borderRadius}`);
        script.setAttribute("data-request-access", requestAccess);
        script.setAttribute("data-userpic", `${userPic}`);
        script.setAttribute("data-onauth", "TelegramLoginWidget.dataOnauth(user)");
        script.async = true;
        instance.appendChild(script);
    }, [addTelegram, buttonSize, instance, login, userId]);

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
            <Modal title="Error" isOpen={!!errorRef.current} onClose={() => (errorRef.current = "")}>
                <div className={styles.errorText}>{errorRef.current}</div>
            </Modal>
        </>
    );
};

export default memo(_TelegramLogin);
