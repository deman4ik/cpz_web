// types
import { UserChatProps } from "../components/UserChat";
// utils
import { formatDate } from "config/utils";
import { SortMethodType } from "components/pages/ManagePage/common/OrderModalInner/types";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i; // todo: вынести типы regex  в общие константы

/*=== LOCAL TYPES ====*/
export interface message {
    data: { message: string };
    timestamp: string;
}

export interface messages_aggregate {
    aggregate: {
        count: number;
    };
}

export interface userRequestItem {
    user_id: string;
    user_name: string;
    messages: Array<message>;
    messagesByTo: Array<message>;
    messages_aggregate: messages_aggregate;
    messagesByTo_aggregate: messages_aggregate;
}

export type orderType = "asc" | "desc";

/*=== LOCAL UTILS ====*/

/**
 * Утилита для получения последнего сообщения (с учетом последней даты) в функции форматирования
 * @param messages - массив сообщений (messages и messagesByTo)
 */
const getLastMessageByDate = (messages: Array<message>): message => {
    if (messages.length) {
        return messages.sort((a, b) => {
            const dateA = new Date(a.timestamp).getTime();
            const dateB = new Date(b.timestamp).getTime();
            return dateB - dateA;
        })[0];
    }
    return messages[0];
};

/**
 * Функция сортировки юзеров по дате
 * @param data - массив юзеров и их сообщений
 * @param orderType - порядок сортировки
 */
const sortRequestsByDate = (data: Array<UserChatProps>, orderType?: null | orderType) => {
    if (orderType) {
        return data.sort((a, b) => {
            const dateA = new Date(a.timestamp).getTime();
            const dateB = new Date(b.timestamp).getTime();
            if (orderType === "desc") {
                return dateB - dateA;
            }
            return dateA - dateB;
        });
    }
    return data;
};

/*=== DATA UTILS ====*/

/**
 * Утилита форматирования сообщений
 */
export const formatUsersSupportRequests = (usersRequests: Array<userRequestItem>, orderType): Array<UserChatProps> => {
    const requests = usersRequests.map(
        ({
            user_id,
            user_name,
            messages,
            messagesByTo,
            messages_aggregate: {
                aggregate: { count: messageCount }
            },
            messagesByTo_aggregate: {
                aggregate: { count: countByTo }
            }
        }) => {
            const allMessages = [...messages, ...messagesByTo]; // мердж входящих и исходящих сообщений
            const {
                data: { message },
                timestamp
            } = getLastMessageByDate(allMessages);
            const messages_count = messageCount + countByTo;

            return {
                user_id,
                user_name,
                message,
                timestamp: formatDate(timestamp),
                messages_count
            };
        }
    );
    return sortRequestsByDate(requests, orderType);
};

/**
 * Утилита обработки поиска
 * @param searchString - строка с данными
 */
export const getSearchParams = (searchString: string) => {
    const where: any = {
        _or: [{ name: { _ilike: `%${searchString}%` } }]
    };
    if (searchString?.match(UUID_REGEX)) {
        where._or.push({ id: { _eq: searchString } });
    }
    return where;
};