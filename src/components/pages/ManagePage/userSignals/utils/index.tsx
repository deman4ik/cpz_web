/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { formatDate, getUserSignalSettings, getVolumeType, getVolumeWithUnit } from "config/utils";

export const formatSignals = (data) => {
    if (!data) return [];
    return data.user_signals?.map((signal) => {
        const { id, robot, user, subscribed_at } = signal;
        const { code: robot_code, currency, asset } = robot;
        const { id: user_id, name: user_name } = user;
        const settings = getUserSignalSettings(signal);
        return {
            id,
            robot_code,
            user_name,
            user_id,
            subscribed_at: formatDate(subscribed_at),
            volume: getVolumeWithUnit(settings, { currency, asset }),
            volumeType: getVolumeType(settings)
        };
    });
};

export const getSearchOptions = (value: string) => ({
    _or: [{ user: { name: { _ilike: `%${value}%` } } }, { robot: { name: { _ilike: `%${value}%` } } }]
});
