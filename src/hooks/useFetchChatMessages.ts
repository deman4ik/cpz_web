import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "libs/hoc/authContext";
import { useSubscription } from "@apollo/react-hooks";
import { GET_SUPPORT_MESSAGES } from "graphql/support/subscribtions";

/**
 * Hook фетчинга сообщений для чата
 * @param messagesQuery - query  для получения сообщений
 * @param user_id - параметр для фетчинга с конкретного юзера
 */
const useFetchChatMessages = (messagesQuery, user_id) => {
    console.log(user_id);
    /*messages state*/
    const [messages, setMessages] = useState([]);

    /*Подписка на загрузку сообщений*/
    const { data, error, loading } = useSubscription(messagesQuery, {
        variables: { user_id }
    });

    /*Установка состояния сообщений*/
    useEffect(() => {
        if (!loading && data?.messages) {
            setMessages(data?.messages);
        }
    }, [loading, error, data, user_id, data?.messages]);

    return { messages, error, loading };
};

export default useFetchChatMessages;
