import gql from "graphql-tag";
import { RobotsType } from "config/types";

export const GET_MARKETS_ROBOTS = gql`
    query get_user_markets_robots($id: uuid, $user_id: uuid!, $asset: String!, $exchange: String!, $currency: String!) {
        v_user_exchange_accs(where: { id: { _eq: $id }, user: { id: { _eq: $user_id } } }) {
            total_balance_usd
            amounts {
                used_balance_percent
                available_balance_percent
            }
            user {
                markets(where: { asset: { _eq: $asset }, exchange: { _eq: $exchange }, currency: { _eq: $currency } }) {
                    asset
                    precision
                    current_price
                    limits
                }
            }
        }
    }
`;
export const GET_MARKETS_SIGNALS = gql`
    query get_user_markets_signals($id: uuid, $user_id: uuid!, $asset: String, $exchange: String, $currency: String) {
        v_user_markets(
            where: {
                exchange: { _eq: $exchange }
                asset: { _eq: $asset }
                currency: { _eq: $currency }
                user_id: { _eq: $user_id }
            }
        ) {
            asset
            precision
            price: current_price
            limits
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

export const queriesToRobotTypeMap = {
    [RobotsType.signals]: GET_MARKETS_SIGNALS,
    [RobotsType.robots]: GET_MARKETS_ROBOTS
};
