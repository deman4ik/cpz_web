import gql from "graphql-tag";

export const SET_USER_STATUS = gql`
    mutation set_user_status($ids: [uuid!], $status: Int!) {
        update_users(where: { id: { _in: $ids } }, _set: { status: $status }) {
            affected_rows
        }
    }
`;
