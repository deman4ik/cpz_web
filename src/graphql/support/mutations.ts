import gql from "graphql-tag";

export const SEND_SUPPOT_MESSAGE = gql`
    mutation sendSupportMessage($message: String!) {
        supportMessage(message: $message) {
            result
        }
    }
`;
