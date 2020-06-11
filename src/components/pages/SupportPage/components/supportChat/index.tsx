import React from "react";
// components
import ChatForm from "./ChatForm";
import MessagesContainer from "./messagesContainer";
// styles
import styles from "../../styles/Common.module.css";
import supportChatStyles from "../../styles/SupportChat.module.css";

const SupportChat = () => {
    return (
        <div className={styles.content_container}>
            <div className={supportChatStyles.support_chat_card}>
                <div className={styles.card_support_title}>Cryptuoso Support Team</div>
                <ChatForm />
                <div className={styles.card_support_title}>Messages history</div>
                <MessagesContainer />
            </div>
        </div>
    );
};

export default SupportChat;
