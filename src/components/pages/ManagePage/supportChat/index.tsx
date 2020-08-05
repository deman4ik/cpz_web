import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
import useFetchChatMessages from "hooks/useFetchChatMessages";
// components
import { Template } from "components/layout/Template";
import { Chat } from "components/common";
// utils
import { formatMessage } from "components/common/Chat/utils";
// styles
import styles from "./styles/SupportChat.module.css";
// graphql
import { GET_SUPPORT_MESSAGES } from "graphql/common/queries";
import { REPLY_SUPPORT_MESSAGE } from "graphql/manage/mutations";
// types
import { PageType } from "config/types";

const ManageSupportChat = () => {
    const { width } = useWindowDimensions(); // width hook
    /*user_id*/
    const router = useRouter();
    const { user_id } = router.query;
    /*fetch chat data*/
    const { messages, error, loading } = useFetchChatMessages(GET_SUPPORT_MESSAGES, user_id);
    /*reply support message mutation*/
    const [replySupportMessage, { loading: loadingReply, data: dataReply, error: errorReply }] = useMutation(
        REPLY_SUPPORT_MESSAGE
    );
    const sendMessageCallback = (message: string): void => {
        replySupportMessage({ variables: { message, to: user_id } });
    };

    const handlePressBack = () => {
        router.back();
    };

    return (
        <Template title="Support chat" width={width} handlePressBack={handlePressBack} page={PageType.supportRequests}>
            <div className={styles.support_chat_wrapper}>
                <Chat
                    title="Chat with User"
                    containerProps={{
                        loading,
                        messages,
                        formatCallback: (data) => formatMessage(data, true),
                        notMessagesText: error && "Error loading user data!"
                    }}
                    chatFormProps={{
                        loading: loadingReply,
                        error: errorReply || dataReply?.replySupportMessage?.error,
                        success: Boolean(dataReply?.replySupportMessage?.success),
                        submitCallback: sendMessageCallback
                    }}
                />
            </div>
        </Template>
    );
};

export default ManageSupportChat;
