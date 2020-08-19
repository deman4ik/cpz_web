import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/UserChats.module.css";
// components
import { Card, Button } from "components/basic";
import LatestMessage from "./LastetMessage";

export interface UserChatProps {
    message: string;
    user_id: string;
    user_name?: string;
    timestamp: string;
    messages_count: number;
}

/**
 * Компонент-карточка пользовательского чата
 */
const UserChat: React.FC<UserChatProps> = ({ message, user_id, user_name, timestamp, messages_count }) => {
    /* handle press and route on chat page*/
    const router = useRouter();
    const handlePressReply = () => router.push(`/manage/support/${user_id}`);

    return (
        <div className={styles.chat_card_wrapper}>
            <Card style={{ boxSizing: "border-box", width: "100%", margin: 0, height: "100%" }}>
                <div className={styles.user_chat_content}>
                    <p>{user_name && user_name}</p>
                    <p className={styles.user_chat_content_user_id}>{user_id}</p>
                    <p>Messages: {messages_count}</p>
                    <h3 className={styles.user_chat_content_title}>Latest message</h3>
                    <LatestMessage message={message} timestamp={timestamp} />
                    <div className={styles.user_chat_button_wrapper}>
                        <div className={styles.user_chat_button}>
                            <Button
                                onClick={handlePressReply}
                                type="success"
                                title="Reply"
                                style={{ height: "30px", width: "100%" }}
                                isUppercase
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UserChat;
