import React from "react";
import { useRouter } from "next/router";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
// components
import { Template } from "components/layout/Template";
// styles
import styles from "./styles/SupportChat.module.css";

const ManageSupportChat = () => {
    const { width } = useWindowDimensions(); // width hook
    /*user_id*/
    const { query } = useRouter();
    const { user_id } = query;

    return (
        <Template title="Support chat" width={width}>
            <div className={styles.support_chat_wrapper}>Support chat here</div>
        </Template>
    );
};

export default ManageSupportChat;
