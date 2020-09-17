import { REGEXS } from "config/constants";
// utils
import { formatDate } from "config/utils";
import { defineProperty } from "../../utils";

export const getSearchOptions = (value: string): any => {
    const where: any = {
        _or: [
            { name: { _ilike: `%${value}%` } },
            { telegram_username: { _ilike: `%${value}%` } },
            { email: { _ilike: `%${value}%` } }
        ]
    };
    if (value.match(REGEXS.telegram_id)) {
        const telegram_id = { telegram_id: { _eq: value } };
        where._or.push(telegram_id);
    } else if (value.match(REGEXS.uuid)) {
        const id = { id: { _eq: value } };
        where._or.push(id);
    }
    return where;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const formatData = ({ users }: { users: any }) => {
    return users.map((user) => {
        const row = {};

        defineProperty(row, "name", user.name);
        defineProperty(row, "id", user.id);
        defineProperty(row, "email", user.email);
        defineProperty(row, "status", user.status ? "active" : "inactive");
        defineProperty(row, "telegram_id", user.telegram_id);
        defineProperty(row, "telegram_username", user.telegram_username);
        defineProperty(row, "roles", { default: user.roles?.defaultRole, allowed: user.roles?.allowedRoles });
        defineProperty(row, "created_at", formatDate(user.created_at));
        defineProperty(row, "signals_email_notifications", user.settings.notifications.signals.email);
        defineProperty(row, "signals_telegram_notifications", user.settings.notifications.signals.telegram);
        defineProperty(row, "trading_email_notifications", user.settings.notifications.trading.email);
        defineProperty(row, "trading_telegram_notifications", user.settings.notifications.trading.telegram);
        defineProperty(row, "user_signals", user.user_signals_aggregate.aggregate.count);
        defineProperty(row, "user_robots", user.user_robots_aggregate.aggregate.count);
        defineProperty(row, "user_api_keys", user.user_exchange_accs_aggregate.aggregate.count);
        return row;
    });
};
