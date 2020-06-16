import React, { useEffect, useState, useContext } from "react";
import { Button } from "components/basic";
import { useMutation } from "@apollo/react-hooks";
// components
import { LoadingIndicator } from "components/common";
// styles
import supportChatStyles from "../../styles/SupportChat.module.css";
import styles from "../../styles/Common.module.css";
// graphql
import { SEND_SUPPOT_MESSAGE } from "graphql/support/mutations";
// context
import { AuthContext } from "libs/hoc/authContext";

const ChatForm: React.FC = () => {
    const [clear, setClear] = useState(false);
    const [message, setMessage] = useState("");
    const [sendSupportMessage, { loading, data, error }] = useMutation(SEND_SUPPOT_MESSAGE);

    /* form handlers*/
    const onchangeMessage = (e): void => {
        setMessage(e.target.value);
    };

    const onSumbit = () => {
        if (message) {
            sendSupportMessage({
                variables: { message }
            });
        }
        setClear(false); // установка флага отчистки
    };

    /*отчитска поля после отправки*/
    useEffect(() => {
        if (data?.supportMessage?.success && !loading && !clear) {
            setMessage("");
            setClear(true);
        }
    }, [data?.supportMessage?.success, loading, message, clear]);

    return (
        <div className={supportChatStyles.support_chat_container}>
            <div className={supportChatStyles.support_chat_description}>
                Have a personal problem regarding connecting an exchange or billing? Send message here:
            </div>
            <div className={supportChatStyles.support_chat_textarea_wrapper}>
                <textarea
                    className={supportChatStyles.support_chat_textarea}
                    onChange={onchangeMessage}
                    value={message}
                    placeholder="Enter your message here..."
                />
                {loading && (
                    <div className={styles.loader}>
                        <LoadingIndicator />
                    </div>
                )}
                {error ||
                    (data?.supportMessage?.error && (
                        <div className={supportChatStyles.support_chat_error}>Error, please try again!</div>
                    ))}
            </div>
            <div className={supportChatStyles.support_chat_button}>
                <Button type="success" size="normal" title="Send message" onClick={onSumbit} width={180} isUppercase />
            </div>
        </div>
    );
};

export default ChatForm;