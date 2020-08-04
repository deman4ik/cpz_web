import React from "react";
// components
import UserChat from "./UserChat";
// styles
import styles from "../styles/UserChats.module.css";
// types
import { UserChatProps } from "./UserChat";

export interface UsersChatsProps {
    data: Array<UserChatProps>;
}
/**
 * Компонент контейнер пользовательских обращений
 */
const UsersChats: React.FC<UsersChatsProps> = ({ data }) => (
    <div className={styles.users_chats_container}>
        {data.map((item) => (
            <UserChat {...item} key={item.user_id} />
        ))}
    </div>
);

export default UsersChats;
