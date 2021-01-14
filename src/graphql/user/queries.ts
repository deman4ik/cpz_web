import gql from "graphql-tag";

export const GET_USER_INFO = gql`
    query userInfo($user_id: uuid) {
        users(where: { id: { _eq: $user_id } }) {
            id
            name
            email
            telegram_username
            telegram_id
            settings
        }
    }
`;

export const GET_NOTIFICATIONS = gql`
    query get_notifications($limit: Int!, $offset: Int, $where: notifications_bool_exp) {
        notifications(limit: $limit, offset: $offset, where: $where, order_by: { timestamp: desc })
            @connection(key: "notifications") {
            type
            data
            readed
            id
            timestamp
            robot {
                id
                code
                name
                asset
            }
            user_robot {
                robot {
                    code
                    name
                    asset
                }
            }
        }
    }
`;

export const GET_NOTIFICATIONS_AGGREGATE = gql`
    query notifications_aggregate($where: notifications_bool_exp) {
        notifications_aggregate(where: $where) {
            aggregate {
                count
            }
        }
    }
`;
