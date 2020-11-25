import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
// components
import { Chat } from "components/common";
// hooks
import useFetchChatMessages from "hooks/useFetchChatMessages";
// utils
import { formatMessage } from "components/common/Chat/utils";
// graohql
import { GET_SUPPORT_MESSAGES } from "graphql/common/subscribtions";
import { SEND_SUPPOT_MESSAGE } from "graphql/support/mutations";

export interface SupportChatProps {
    user_id: string;
}

const SupportChat: React.FC<SupportChatProps> = ({ user_id }) => {
    /*data fetching*/
    const { messages, loading: fetching } = useFetchChatMessages(GET_SUPPORT_MESSAGES, user_id);

    /*send support message*/
    const [success, setSuccess] = useState(false);
    const [sendMessage, { loading, data, error }] = useMutation(SEND_SUPPOT_MESSAGE);

    useEffect(() => setSuccess(data?.supportMessage.result === "OK"), [data?.supportMessage.result]);

    return (
        <Chat
            title="Have a personal problem regarding connecting an exchange or billing? Send message here:"
            containerProps={{
                loading: fetching,
                messages,
                formatCallback: (messageData) => formatMessage(messageData, { username: "Me" })
            }}
            chatFormProps={{
                loading,
                error: error || (!success && data?.supportMessage.result),
                success,
                submitCallback: (message: string) => {
                    sendMessage({ variables: { message } });
                }
            }}
        />
    );
};

export default SupportChat;
