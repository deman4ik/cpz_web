import React from "react";
import messagesStyles from "../../styles/Messages.module.css";

export interface MessageProps {
    type: "in" | "out";
    message: any;
    date: string;
}
const Message: React.FC<MessageProps> = ({ message, type, date }) => {
    return (
        <div className={messagesStyles[`message_container_${type}`]}>
            <div className={messagesStyles[`message_${type}`]}>
                <div dangerouslySetInnerHTML={message} />
                <div className={messagesStyles[`date_message_${type}`]}>{date}</div>
            </div>
        </div>
    );
};
export default Message;
