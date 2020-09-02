/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { formatDate } from "config/utils";
import { defineProperty } from "../../utils";

export const formatData = ({ user_signals }) => {
    return user_signals.map((signal) => {
        const row = {};
        defineProperty(row, "id", signal.id);
        defineProperty(row, "robot_code", signal.robot.code);
        defineProperty(row, "user_name", signal?.user?.name);
        defineProperty(row, "user_id", signal.user.id);
        defineProperty(row, "subscribed_at", formatDate(signal.subscribed_at));
        defineProperty(row, "volume", parseFloat(signal.volume));
        return row;
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
