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
                <MessagesContainer />
                <ChatForm />
            </div>
        </div>
    );
};

export default SupportChat;
