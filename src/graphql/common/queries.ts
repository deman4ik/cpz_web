import gql from "graphql-tag";

export const GET_MARKETS = gql`
    query markets($asset: String!, $exchange: String!, $currency: String!) {
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