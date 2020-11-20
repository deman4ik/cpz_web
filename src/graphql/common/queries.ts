import gql from "graphql-tag";

export const GET_MARKETS = gql`
    query get_user_markets($user_id: uuid!, $asset: String!, $exchange: String!, $currency: String!) {
        v_user_exchange_accs(where: { status: { _eq: "enabled" }, user: { id: { _eq: $user_id } } }) {
            total_balance_usd
            amounts {
                    used_balance_percent
                }
            user {
                markets(where: { asset: { _eq: $asset }, exchange: { _eq: $exchange }, currency: { _eq: $currency } }) {
                    asset
                    current_price
                    limits
                }
            }
        }
    }
`;

/**
 * Фильтры роботов/сигналов на страницах поиска
 * Использование: /robots/search  /signals/search
 * @where - алиас для отбора только роботов или сигналов, имеет вид: ({ signals: { _eq: true } }) или  ({ trading: { _eq: true } })
 */
export const GET_ROBOTS_FILTERS = gql`
    query get_robots_filters($where: robots_bool_exp) {
        filters: robots(where: $where, distinct_on: [exchange, asset, timeframe]) {
            exchange
            asset
            timeframe
        }
        SearchProps @client {
            props {
                type
                filters
                orders
            }
        }
    }
`;
