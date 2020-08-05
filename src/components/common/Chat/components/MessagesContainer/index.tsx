import React, { useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
// styles
import styles from "../../styles/Messages.module.css";
// components
import Message from "./Message";

/**
 * Рендеринг сообщений
 * @param messages - массив сообщений
 * @param formatCallback - коллбэк для приведения данных к нужному формату
 */
const renderMessages = (messages, formatCallback) => {
    const formatedMessages = formatCallback(messages);
    return formatedMessages.map((message) => <Message {...message} key={uuid()} />);
};

export interface MessagesContainerProps {
    formatCallback: any;
    messages: Array<any>;
    loading: boolean;
    notMessagesText?: string;
}
/**
 * Компонент отображащий сообщения в чате
 */
const MessagesContainer: React.FC<MessagesContainerProps> = ({
    formatCallback,
    messages,
    loading,
    notMessagesText = "No messages yet!"
}) => {
    const containerRef = useRef(null); // контейнер с сообщениями

    /*Условный рендеринг по контенту*/
    const renderContent = (): React.ReactChild => {
        if (loading) return <div className={styles.messages_container_not_data}>Loading...</div>;
        if (!messages?.length) return <div className={styles.messages_container_not_data}>{notMessagesText}</div>;
        return renderMessages(messages, formatCallback);
    };
    /*Скролл вниз при апдейте компнента*/
    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    });
    return (
        <div className={styles.messages_container} ref={containerRef}>
            {renderContent()}
        </div>
    );
};

export default MessagesContainer;
