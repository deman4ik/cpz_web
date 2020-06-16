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
              <ForumIcon  color="#ffffff" size={40}/>
                <MessagesContainer />
                <ChatForm />
            </div>
        </div>
    );
};

export default SupportChat;
