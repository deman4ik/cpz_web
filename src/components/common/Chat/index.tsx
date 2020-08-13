import React from "react";
// components
import { Card } from "components/basic";
import MessagesContainer from "./components/MessagesContainer";
import ChatForm, { ChatFormProps } from "./components/ChatForm";
// styles
import styles from "./styles/Common.module.css";
// icons
import { ForumIcon } from "assets/icons/svg";
// types
import { MessagesContainerProps } from "./components/MessagesContainer";

export interface ChatProps {
    title: string;
    containerProps: MessagesContainerProps;
    chatFormProps: ChatFormProps;
}

export const Chat: React.FC<ChatProps> = ({ title, containerProps, chatFormProps }) => {
    return (
        <div className={styles.content_container}>
            <Card
                style={{
                    color: "#ffffff"
                }}>
                <div style={{ paddingLeft: "9px", display: "flex", alignItems: "center" }}>
                    <div className={styles.chat_icon}>
                        <ForumIcon color="#ffffff" size={35} />
                    </div>
                    <div>{title}</div>
                </div>
                <MessagesContainer {...containerProps} />
                <ChatForm {...chatFormProps} />
            </Card>
        </div>
    );
};
