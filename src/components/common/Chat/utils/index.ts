// utils
import { formatDate } from "config/utils";
import formatHtmlString from "utils/formatHtmlString";

/**
 * Утилита форматирования сообщений
 * @param data - сообщения пользователя
 * @param supportContext - определяет чат от лица юзера или тех поддержки
 */
export const formatMessage = (data: any, supportContext: boolean) => {
    return data.map(({ data: { message }, timestamp, to }) => {
        const type = supportContext ? (to ? "out" : "in") : !to ? "out" : "in";
        const date = formatDate(timestamp);
        return { message: formatHtmlString(message), type, date };
    });
};
