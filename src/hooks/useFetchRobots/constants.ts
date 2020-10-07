import { USER_SIGNAL_ROBOTS, ALL_SIGNAL_ROBOTS } from "graphql/signals/queries";
import { USER_ROBOTS_BY_STATS, ROBOTS_BY_STATS } from "graphql/robots/queries";

/*queries*/
export const AUTH_QUERIES = [
    {
        signals: ALL_SIGNAL_ROBOTS,
        robots: ROBOTS_BY_STATS
    },
    {
        signals: USER_SIGNAL_ROBOTS,
        robots: USER_ROBOTS_BY_STATS
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
