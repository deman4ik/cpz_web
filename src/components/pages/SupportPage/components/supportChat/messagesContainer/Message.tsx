import React from "react";
// styles
import supportChatStyles from "components/pages/SupportPage/styles/SupportChat.module.css";
import styles from "components/pages/SupportPage/styles/Common.module.css";

export interface MessageProps {
    type: "in" | "out";
    message: any;
    date: string;
}

const Message: React.FC<MessageProps> = ({ message, type, date }) => {
    return (
        <div className={supportChatStyles[`message_container_${type}`]}>
            <div className={supportChatStyles[`message_${type}`]}>
                <div dangerouslySetInnerHTML={message} />
                <div className={styles[`date_message_${type}`]}>{date}</div>
            </div>
        </div>
    );
};

export default Message;