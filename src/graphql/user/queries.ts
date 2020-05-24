import gql from "graphql-tag";

export const GET_USER_INFO = gql`
    query userInfo {
        users {
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
    query notifications($limit: Int!, $offset: Int, $type: [String!]) {
        notifications(limit: $limit, offset: $offset, where: { type: { _in: $type } }, order_by: { timestamp: desc })
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
            robot_position {
                id
                code
                entry_action
                entry_price
                entry_date
                exit_action
                exit_price
                exit_date
                profit
                status
            }
            user_position {
                id
                code
                status
                entry_action
                entry_executed
                entry_price
                entry_date
                exit_action
                exit_executed
                exit_price
                exit_date
                profit
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
