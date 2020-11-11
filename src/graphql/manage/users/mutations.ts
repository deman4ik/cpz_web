import gql from "graphql-tag";

export const SET_USER_STATUS = gql`
    mutation set_user_status($where: users_bool_exp!, $status: Int) {
        update_users(where: $where, _set: { status: $status }) {
            affected_rows
        }
    }
`;
