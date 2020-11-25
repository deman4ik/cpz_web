/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
// hooks
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
    /*user_id*/
    const router = useRouter();
    const { user_id } = router.query;

    /*fetch chat data*/
    const { messages, error, loading: fetching } = useFetchChatMessages(GET_SUPPORT_MESSAGES, user_id);
    const { data: userData } = useQuery(GET_USER_INFO, {
        variables: { user_id }
    });
    const username = userData?.users[0]?.name || "";
    const messagesContextUsername = username || userData?.users[0]?.telegram_username || user_id;

    /*reply support message mutation*/
    const [success, setSuccess] = useState(false);
    const [reply, { loading: loadingReply, data, error: replyError }] = useMutation(REPLY_SUPPORT_MESSAGE);

    useEffect(() => setSuccess(data?.replySupportMessage.result === "OK"), [data?.replySupportMessage.result]);

    const handlePressBack = () => {
        router.back();
    };

    return (
        <ManagementTemplate title="Support chat" page={PageType.managementSupport} navigateBack={handlePressBack}>
            <div className={styles.support_chat_wrapper}>
                <Chat
                    title={`Chat with ${username} [${user_id}]`}
                    containerProps={{
                        loading: fetching,
                        messages,
                        formatCallback: (messageData) =>
                            formatMessage(messageData, { supportContext: true, username: messagesContextUsername }),
                        notMessagesText: error && "Error fetching user data"
                    }}
                    chatFormProps={{
                        loading: loadingReply,
                        error: replyError || (!success && data?.replySupportMessage.result),
                        success: userData && success,
                        submitCallback: (message: string): void => {
                            reply({ variables: { message, to: user_id } });
                        }
                    }}
                />
            </div>
        </ManagementTemplate>
    );
};

export default ManageSupportChat;
