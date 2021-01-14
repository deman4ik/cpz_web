import { ALL_SIGNAL_ROBOTS, SIGNALS_SEARCH } from "graphql/signals/queries";
import { ROBOTS_SEARCH, ALL_TRADING_ROBOTS } from "graphql/robots/queries";

/*queries*/
export const AUTH_QUERIES = [
    {
        signals: ALL_SIGNAL_ROBOTS,
        robots: ALL_TRADING_ROBOTS
    },
    {
        signals: SIGNALS_SEARCH,
        robots: ROBOTS_SEARCH
    }
];

/*local constants*/
export const SHOW_LIMIT = 12;
export const QUERY_KEY = {
    signals: "signals",
    robots: "trading"
};

export const QUERY_FILTER = {
    signals: () => ({ signals: { _eq: true } }),
    robots: () => ({ trading: { _eq: true } })
};

export const DEFAULT_ORDER_BY = {
    recovery_factor: "desc_nulls_last"
};
