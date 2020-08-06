import React from "react";
// styles
import styles from "../styles/UserChats.module.css";
// utils
import formatHtmlString from "utils/formatHtmlString";

export interface LatestMessageProps {
    message: string;
    timestamp: string;
}

/**
 * Последнее сообщение в чате с пользователем
 */
const LatestMessage: React.FC<LatestMessageProps> = ({ message, timestamp }) => {
    return (
        <div className={styles.latest_message_container}>
            <div className={styles.message} dangerouslySetInnerHTML={formatHtmlString(message, " ")} />
            <time className={styles.date} dateTime={timestamp}>
                {timestamp}
            </time>
        </div>
    );
};

export default LatestMessage;
