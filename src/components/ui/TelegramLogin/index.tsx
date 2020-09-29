import React, { memo, useEffect, useState } from "react";
import Router from "next/router";
import { useMutation } from "@apollo/client";

import { ADD_TELEGRAM_ACCOUNT } from "graphql/user/mutations";
import { GET_USER_INFO } from "graphql/user/queries";
import { useTelegramLogin } from "libs/auth";
import { Modal } from "components/basic";
import { LoadingIndicator } from "components/common";
import styles from "./index.module.css";

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

    const [loginData, setLoginData] = useState(null);
    const [error, setError] = useState("");
    const [addTelegram, { loading: addLoading }] = useMutation(ADD_TELEGRAM_ACCOUNT);
    const [login, info] = useTelegramLogin(loginData || {});

    // if (result.success && result.error === "") {
    //     Router.push("/robots");
    // } else if (result.error !== "") {
    //     setError(result.error);
    // }

    useEffect(() => {
        (window as any).TelegramLoginWidget = userId
            ? {
                  dataOnauth: (data) =>
                      addTelegram({
                          variables: { data },
                          refetchQueries: [{ query: GET_USER_INFO }]
                      }).then((response) => {
                          if (response.data.setTelegram.error) {
                              setError(response.data.setTelegram.error);
                          }
                      })
              }
            : {
                  dataOnauth: (data) => {
                      setLoginData(data);
                      login();
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
                {(info.loading || addLoading) && <LoadingIndicator />}
                <div className={styles.widget} ref={(ref) => (instance = ref)} />
            </div>
            {message && <div className={styles.telegramPlaceholder}>{message}</div>}
            <Modal title="Error" isOpen={!!error} onClose={() => setError("")}>
                <div className={styles.errorText}>{error}</div>
            </Modal>
        </>
    );
};

export default memo(_TelegramLogin);
