import gql from "graphql-tag";

/**
 * Ответ пользователю в чате
 * @nmessage - сообщение
 * @to - id пользователя которому нужно выслать ответ
 * использование: manage/support/[user_id]
 */
export const REPLY_SUPPORT_MESSAGE = gql`
    mutation reply_support_message($message: String!, $to: uuid!) {
        replySupportMessage(message: $message, to: $to) {
            result
        }
    }
`;

export const BROADCAST_NEWS = gql`
    mutation broadcastNews($message: String!) {
        broadcastNews(message: $message) {
            result
        }
    }
`;
