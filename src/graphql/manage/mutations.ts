import gql from "graphql-tag";

/**
 * Ответ пользователю в чате
 * @nmessage - сообщение
 * @to - id пользователя которому нужно выслать ответ
 * использование: manage/support/[user_id]
 */
export const REPLY_SUPPORT_MESSAGE = gql`
    mutation reply_support_message($message: String!, $to: String!) {
        replySupportMessage(message: $message, to: $to) {
            success
            error
        }
    }
`;
