import gql from "graphql-tag";

export const GET_MARKETS = gql`
    query get_user_markets($asset: String!, $exchange: String!, $currency: String!) {
        v_user_markets(where: { asset: { _eq: $asset }, exchange: { _eq: $exchange }, currency: { _eq: $currency } }) {
            asset
            currency
            current_price
            exchange
            limits
        }
    }
`;

/**
 * Фильтры роботов/сигналов на страницах поиска
 * Использование: /robots/search  /user_robots/search
 * @where - алиас для отбора только роботов или сигналов, имеет вид: ({ user_robots: { _eq: true } }) или  ({ trading: { _eq: true } })
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
