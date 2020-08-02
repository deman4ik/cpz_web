import React, { useEffect, useState } from "react";
// components
import { LoadingIndicator } from "components/common";
import { Button } from "components/basic";
// styles
import styles from "../styles/Common.module.css";
import chatFormStyles from "../styles/ChatForm.module.css";

export interface ChatFormProps {
    loading: boolean;
    success: boolean;
    error: any;
    submitCallback: (message: string) => void;
}

/**
 * Компонент UI формы отправки сообщения
 */
const ChatForm: React.FC<ChatFormProps> = ({ loading, success, submitCallback, error }) => {
    const [clear, setClear] = useState(false);
    const [message, setMessage] = useState("");

    /*Form handlers*/
    const onchangeMessage = (e): void => {
        setMessage(e.target.value);
    };

    const onSubmit = () => {
        if (message) {
            submitCallback(message);
        }
        setClear(false);
    };

    useEffect(() => {
        if (success && !loading && !clear) {
            setMessage("");
            setClear(true);
        }
    }, [success, loading, clear, message]);

    return (
        <div className={chatFormStyles.chat_form_container}>
            <div className={chatFormStyles.chat_form_textarea_wrapper}>
                <textarea
                    className={chatFormStyles.chat_form_textarea}
                    onChange={onchangeMessage}
                    value={message}
                    placeholder="Enter your message here..."
                />
                {loading && (
                    <div className={styles.loader}>
                        <LoadingIndicator />
                    </div>
                )}
                {error && <div className={chatFormStyles.chat_form_error}>Error, please try again!</div>}
            </div>
            <div className={chatFormStyles.chat_form_button}>
                <Button onClick={onSubmit} type="success" title="Send" style={{ height: "50px", width: "100%" }} />
            </div>
        </div>
    );
};

export default ChatForm;
