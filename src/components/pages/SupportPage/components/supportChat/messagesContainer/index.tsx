import React, { useEffect, useState, useContext, useRef } from "react";
import { useSubscription } from "@apollo/client";
// graphql
import { GET_SUPPORT_MESSAGES } from "graphql/support/subscribtions";
// components
import Message from "./Message";
// styles
import supportChatStyles from "components/pages/SupportPage/styles/SupportChat.module.css";
// utils
import formatMessages from "components/pages/SupportPage/utils/formatMessages";
// context
import { AuthContext } from "libs/hoc/authContext";

/**
 * Функция рендера сообщений
 */
const renderMessages = (messages) => {
    const formatedMessages = formatMessages(messages);

    return formatedMessages.map((message, idnex) => <Message {...message} key={idnex} />);
};

const MessagesContainer: React.FC = () => {
    const containerRef = useRef(null); // контейнер с сообщениями
    /*контекст аутентификации*/
    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);

    /*подписка на загрузку сообщений*/
    const { data, error, loading } = useSubscription(GET_SUPPORT_MESSAGES, {
        variables: { user_id }
    });

    /*Установка состояния сообщений*/
    useEffect(() => {
        if (!loading && data?.messages) {
            setMessages(data?.messages);
        }
    }, [loading, error, data, user_id, data?.messages]);

    /*Скролл вниз при апдейте компнента*/
    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    });

    const renderContent = () => {
        if (loading) {
            return <div className={supportChatStyles.messages_container_not_data}>Loading...</div>;
        }
        if (!messages?.length) {
            return <div className={supportChatStyles.messages_container_not_data}> No messages yet!</div>;
        }
        return renderMessages(messages);
    };

    return (
        <div className={supportChatStyles.messages_container} ref={containerRef}>
            {renderContent()}
        </div>
    );
};

export default MessagesContainer;
