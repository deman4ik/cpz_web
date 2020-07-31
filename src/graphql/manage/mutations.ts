import gql from "graphql-tag";

export const REPLY_SUPPORT_MESSAGE = gql`
    mutation reply_support_message($message: String!, $to: String!) {
        replySupportMessage(message: $message, to: $to) {
            success
            error
        }
    }
`;
