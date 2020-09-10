/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
// hooks
import useWindowDimensions from "hooks/useWindowDimensions";
import useFetchChatMessages from "hooks/useFetchChatMessages";
// components
import { ManagementTemplate } from "components/layout";
import { Chat } from "components/common";
// utils
import { formatMessage } from "components/common/Chat/utils";
// styles
import styles from "./styles/SupportChat.module.css";
// graphql
import { GET_SUPPORT_MESSAGES } from "graphql/common/subscribtions";
import { REPLY_SUPPORT_MESSAGE } from "graphql/manage/mutations";
import { GET_USER_INFO } from "graphql/user/queries";
// types
import { PageType } from "config/types";

const ManageSupportChat = () => {
    const { width } = useWindowDimensions(); // width hook П
    /*user_id*/
    const router = useRouter();
    const { user_id } = router.query;
    /*fetch chat data*/
    const { messages, error, loading } = useFetchChatMessages(GET_SUPPORT_MESSAGES, user_id);
    const { data: user_data } = useQuery(GET_USER_INFO, {
        variables: { user_id }
    });
    const username = user_data?.users[0]?.name || "";
    const messagesContextUsername = username || user_data?.users[0]?.telegram_username || user_id;

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
        <ManagementTemplate
            title="Support chat"
            width={width}
            handlePressBack={handlePressBack}
            page={PageType.supportRequests}>
            <div className={styles.support_chat_wrapper}>
                <Chat
                    title={`Chat with ${username} (${user_id})`}
                    containerProps={{
                        loading,
                        messages,
                        formatCallback: (data) =>
                            formatMessage(data, { supportContext: true, username: messagesContextUsername }),
                        notMessagesText: error && "Error loading user data!"
                    }}
                    chatFormProps={{
                        loading: loadingReply,
                        error: errorReply || dataReply?.replySupportMessage?.error,
                        success: Boolean(dataReply?.replySupportMessage?.success && user_data),
                        submitCallback: sendMessageCallback
                    }}
                />
            </div>
        </ManagementTemplate>
    );
};

export default ManageSupportChat;
