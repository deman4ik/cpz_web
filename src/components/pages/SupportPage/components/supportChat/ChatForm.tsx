import React, { useState } from "react";
import { Button } from "components/basic";
import { useMutation } from "@apollo/react-hooks";
// styles
import supportChatStyles from "../../styles/SupportChat.module.css";
import styles from "components/pages/SupportPage/styles/Common.module.css";

const ChatForm: React.FC = () => {
    const [message, setMessage] = useState("");

    /* form handlers*/
    const onchangeMessage = (e): void => {
        setMessage(e.target.innerText);
    };

    const onSumbit = () => {
        console.log(message);
    };

    return (
        <div className={supportChatStyles.support_chat_container}>
            <div className={supportChatStyles.support_chat_description}>
                Have a personal problem regarding connecting an exchange or billing?
                Send message here:
            </div>
            <div
                contentEditable
                className={supportChatStyles.support_chat_textarea}
                onInput={onchangeMessage}
                onBlur={onchangeMessage}
            />
            <div className={supportChatStyles.support_chat_button}>
                <Button type="success" size="normal" title="Send message" onClick={onSumbit} width={180} isUppercase />
            </div>
        </div>
    );
};

export default ChatForm;
