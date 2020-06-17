import React from "react";
// components
import ChatForm from "./ChatForm";
import MessagesContainer from "./messagesContainer";
// styles
import styles from "../../styles/Common.module.css";
import supportChatStyles from "../../styles/SupportChat.module.css";
// icons
import { ForumIcon } from "assets/icons/svg";

const SupportChat = () => {
    return (
        <div className={styles.content_container}>
            <div className={supportChatStyles.support_chat_card}>
                <div style={{ paddingLeft: "9px", display: "flex", alignItems: "center" }}>
                    <div className={styles.card_icon}>
                        <ForumIcon color="#ffffff" size={35} />
                    </div>
                    <div>Have a personal problem regarding connecting an exchange or billing? Send message here:</div>
                </div>
                <MessagesContainer />
                <ChatForm />
            </div>
        </div>
    );
};

export default SupportChat;
