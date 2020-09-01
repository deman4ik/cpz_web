/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { formatDate } from "config/utils";

export const formatUsersSignals = (data) => {
    console.log(data);
    return data.user_signals.map((signal) => {
        const row = {};
        Object.defineProperty(row, "id", { value: signal.id, writable: false });
        Object.defineProperty(row, "robot_code", { value: signal.robot.code, writable: false });
        Object.defineProperty(row, "user_name", { value: signal?.user?.name, writable: false });
        Object.defineProperty(row, "user_id", { value: signal.user.id, writable: false });
        Object.defineProperty(row, "subscribed_at", { value: formatDate(signal.subscribed_at), writable: false });
        Object.defineProperty(row, "volume", { value: parseFloat(signal.volume), writable: false });
        return row;
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
