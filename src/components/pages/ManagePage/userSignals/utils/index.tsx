/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { formatDate, getUserSignalVolume } from "config/utils";

export const formatSignals = (data) => {
    if (!data) return [];
    return data.user_signals?.map((signal) => {
        return {
            id: signal.id,
            robot_code: signal.robot?.code,
            user_name: signal.user?.name,
            user_id: signal.user?.id,
            subscribed_at: formatDate(signal.subscribed_at),
            volume: getUserSignalVolume(signal)
        };
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
