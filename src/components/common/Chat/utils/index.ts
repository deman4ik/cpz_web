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
export const formatMessage = (data: [], { supportContext, username }: messagesContext) => {
    return data.map(({ data: { message }, timestamp, to }) => {
        let type: string;
        let subject: string;
        const date = formatDate(timestamp);
        if (supportContext) {
            type = to ? "out" : "in";
            subject = to ? "Support" : username;
        } else {
            type = to ? "in" : "out";
            subject = to ? "Support" : "Me";
        }

        return { message: formatHtmlString(message), type, date, subject };
    });
};
