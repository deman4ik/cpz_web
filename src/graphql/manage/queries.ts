import gql from "graphql-tag";

export const GET_USER_STATS = gql`
    query {
        users {
            user_robots {
                id
            }
            user_signals {
                id
            }
        }
    }
`;

export const GET_USER_STATS_DURING_PERIOD = gql`
    query getUsersStatsDuringPeriod($period: timestamp) {
        users(where: { created_at: { _gte: $period } }) {
            created_at
        }
    }
`;

export const GET_USERS = gql`
    query getUsers($where: users_bool_exp) {
        users(where: $where) {
            name
            id
            email
            telegram_username
            created_at
            roles
            status
            telegram_id
            settings
            user_robots {
                id
            }
            user_signals {
                id
            }
            user_exchange_accs {
                id
            }
        }
    }
`;
