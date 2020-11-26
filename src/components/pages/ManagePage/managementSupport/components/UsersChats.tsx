import React from "react";
// components
import UserChat, { UserChatProps } from "./UserChat";
// styles
import styles from "../styles/UserChats.module.css";

export interface UsersChatsProps {
    data: Array<UserChatProps>;
}
/**
 * Компонент контейнер пользовательских обращений
 */
const UsersChats: React.FC<UsersChatsProps> = ({ data }) => (
    <div className={styles.users_chats_container}>
        {data.map((item) => (
            <UserChat {...item} key={item.id} />
        ))}
    </div>
);

export default UsersChats;
