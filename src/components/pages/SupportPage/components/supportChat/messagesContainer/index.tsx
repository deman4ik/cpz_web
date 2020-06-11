import React from "react";
import Message from "./Message";
// styles
import supportChatStyles from "components/pages/SupportPage/styles/SupportChat.module.css";
import styles from "components/pages/SupportPage/styles/Common.module.css";

const MessagesContainer: React.FC = () => {
    return (
        <div className={supportChatStyles.messages_container}>
            <Message type="out" message="Hello I have a troble" date="11 Mar 20 21:57 UTC" />
            <Message
                type="in"
                message="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid asperiores corporis eos sequi velit."
                date="11 Mar 20 21:57 UTC"
            />
        </div>
    );
};

export default MessagesContainer;
