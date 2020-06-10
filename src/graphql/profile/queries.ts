import gql from "graphql-tag";

export const GET_EXCHANGES = gql`
    query exchanges {
        exchanges {
            code
            name
        }
    }
`;

export const GET_USER_EXCHANGES = gql`
    query user_exchange_accs($user_id: uuid) {
        userExchange: user_exchange_accs(where: { user: { id: { _eq: $user_id } } }) {
            created_at
            exchange
            id
            name
            status
            user {
                id
            }
        }
    }
`;

export const GET_USER_EXCHANGES_WITH_MARKETS = gql`
    query user_exchange_accs_markets($asset: String!, $exchange: String!, $currency: String!) {
        userExchange: user_exchange_accs(where: { exchange: { _eq: $exchange } }) {
            created_at
            exchange
            id
            name
            status
            error
        }
        markets(where: { asset: { _eq: $asset }, exchange: { _eq: $exchange }, currency: { _eq: $currency } }) {
            exchange
            asset
            limits
            currency
            precision
        }
        candles1440(
            where: { exchange: { _eq: $exchange }, asset: { _eq: $asset } }
            limit: 1
            order_by: { time: desc }
        ) {
            high
            low
        }
    }
`;
