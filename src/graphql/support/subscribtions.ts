import gql from "graphql-tag";

export const GET_SUPPORT_MESSAGES = gql`
    subscription get_support_messages($user_id: uuid) {
        messages(where: { userByFrom: { id: { _eq: $user_id } } }) {
            data
            from
            to
            timestamp
            userByFrom {
                id
            }
        }
    }
`;
