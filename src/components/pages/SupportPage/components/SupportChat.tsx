import React from "react";
import { useMutation } from "@apollo/react-hooks";
// components
import { Chat } from "components/common";
// hooks
import useFetchChatMessages from "hooks/useFetchChatMessages";
// utils
import { formatMessage } from "components/common/Chat/utils";
// graohql
import { GET_SUPPORT_MESSAGES } from "graphql/common/queries";
import { SEND_SUPPOT_MESSAGE } from "graphql/support/mutations";

export interface SupportChatProps {
    user_id: string;
}

const SupportChat: React.FC<SupportChatProps> = ({ user_id }) => {
    /*data fetching*/
    const { messages, loading, error } = useFetchChatMessages(GET_SUPPORT_MESSAGES, user_id);
    /*send support message*/
    const [sendSupportMessage, { loading: loadingSend, data: dataSend, error: errorSend }] = useMutation(
        SEND_SUPPOT_MESSAGE
    );
    const sendSupportMessageCallback = (message: string) => {
        sendSupportMessage({ variables: { message, to: user_id } });
    };

    return (
        <Chat
            title="Have a personal problem regarding connecting an exchange or billing? Send message here:"
            containerProps={{
                loading,
                messages,
                formatCallback: formatMessage
            }}
            chatFormProps={{
                loading: loadingSend,
                error: errorSend || dataSend?.supportMessage?.error,
                success: Boolean(dataSend?.supportMessage?.success),
                submitCallback: sendSupportMessageCallback
            }}
        />
    );
};

export default SupportChat;
