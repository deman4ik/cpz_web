import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/UserChats.module.css";
// components
import { Card } from "components/basic";
import LatestMessage from "./LastetMessage";
import { Button } from "components/basic";

export interface UserChatProps {
    message: string;
    user_id: string;
    user_name?: string;
}

/**
 * Компонент-карточка пользовательского чата
 */
const UserChat: React.FC<UserChatProps> = ({ message, user_id, user_name }) => {
    /* handle press and route on chat page*/
    const router = useRouter();
    const handlePressReply = () => router.push(`/manage/support/${user_id}`);

    return (
        <Card style={{ minHeight: "200px" }}>
            <div className={styles.user_chat_content}>
                <h3 className={styles.user_chat_content_title}>User info</h3>
                {user_name && <p>{user_name}</p>}
                <p>{user_id}</p>
                <h3 className={styles.user_chat_content_title}>Lastest message</h3>
                <LatestMessage message={message} />
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
        </Card>
    );
};

export default UserChat;
