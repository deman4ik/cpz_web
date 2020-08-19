/*eslint-disable  react/no-danger*/
import React from "react";
import messagesStyles from "../../styles/Messages.module.css";

export interface MessageProps {
    type: "in" | "out";
    message: any;
    date: string;
    subject: string;
}

/**
 * Компонент собщения
 */
const Message: React.FC<MessageProps> = ({ message, type, date, subject }) => {
    return (
        <div className={messagesStyles[`message_container_${type}`]}>
            <div className={messagesStyles[`message_${type}`]}>
                <div className={messagesStyles[`message_subject_${type}`]}>{subject}</div>
                <div className={messagesStyles.message_text} dangerouslySetInnerHTML={message} />
                <time className={messagesStyles[`message_date_${type}`]}>{date}</time>
            </div>
        </div>
    );
};
export default Message;
