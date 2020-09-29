import {
    USER_SIGNAL_ROBOTS as GET_ROBOTS_BY_STATS_SIGNALS,
    ALL_SIGNAL_ROBOTS as GET_ROBOTS_BY_STATS_SIGNALS_NOT_AUTH
} from "graphql/signals/queries";
import {
    USER_ROBOTS_BY_STATS as GET_ROBOTS_BY_STATS_ROBOTS,
    ROBOTS_BY_STATS as GET_ROBOTS_BY_STATS_ROBOTS_NOT_AUTH
} from "graphql/robots/queries";

/*queries*/
export const AUTH_QUERIES = [
    {
        signals: GET_ROBOTS_BY_STATS_SIGNALS_NOT_AUTH,
        robots: GET_ROBOTS_BY_STATS_ROBOTS_NOT_AUTH
    },
    {
        signals: GET_ROBOTS_BY_STATS_SIGNALS,
        robots: GET_ROBOTS_BY_STATS_ROBOTS
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
