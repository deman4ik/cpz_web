import gql from "graphql-tag";

export const GET_EXCHANGES = gql`
    query exchanges {
        exchanges {
            code
            name
            ref_link
            docs_link
        }
    }
`;

export const GET_USER_EXCHANGES = gql`
    query user_exchange_accs($user_id: uuid) {
        userExchange: v_user_exchange_accs(where: { user_id: { _eq: $user_id } }) {
            exchange
            id
            name
            status
            user_id
            balance: total_balance_usd
            error
        }
    }
`;

export const GET_USER_EXCHANGES_WITH_MARKETS = gql`
    query user_exchange_accs_markets($asset: String!, $exchange: String!, $currency: String!, $user_id: uuid) {
        userExchange: user_exchange_accs(where: { exchange: { _eq: $exchange }, user_id: { _eq: $user_id } }) {
            created_at
            exchange
            id
            name
            status
            error
            user_id
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
