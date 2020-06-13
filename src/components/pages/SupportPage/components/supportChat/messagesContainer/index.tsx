import React, { useEffect, useState, useContext, useRef } from "react";
import { useSubscription } from "@apollo/react-hooks";
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
    const containerRef = useRef(null);

    const {
        authState: { user_id }
    } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);
    const { data, error, loading } = useSubscription(GET_SUPPORT_MESSAGES, {
        variables: { user_id }
    });

    useEffect(() => {
        if (!loading && data) {
            setMessages(data.messages);
        }
    }, [loading, error, data, user_id]);

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    });

    return (
        <div className={supportChatStyles.messages_container} ref={containerRef}>
            {messages && renderMessages(messages)}
        </div>
    );
};

export default MessagesContainer;
