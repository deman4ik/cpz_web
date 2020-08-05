// utils
import { formatDate } from "config/utils";
import formatHtmlString from "utils/formatHtmlString";

export interface messagesContext {
    supportContext?: boolean;
    username: string;
}

/**
 * Утилита форматирования сообщений
 * @param data - сообщения пользователя
 * @param messagesContext - определяет чат от лица юзера или тех поддержки  а так же username  в сообщениях
 */
// todo: Работа с условиями
export const formatMessage = (data: any, { supportContext, username }: messagesContext) => {
    return data.map(({ data: { message }, timestamp, to }) => {
        const type = supportContext ? (to ? "out" : "in") : !to ? "out" : "in";
        const date = formatDate(timestamp);
        const subject = supportContext ? (to ? "Support" : username) : !to ? "Me" : "Support";
        return { message: formatHtmlString(message), type, date, subject };
    });
};
