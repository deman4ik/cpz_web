// constants
import { REGEXS } from "config/constants";
// types
import { UserChatProps } from "../components/UserChat";
// utils
import { formatDate } from "config/utils";

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

/*=== DATA UTILS ====*/

/**
 * Утилита форматирования сообщений
 */
export const formatUsersSupportRequests = ({
    support_requests
}: {
    support_requests: Array<userRequestItem>;
}): Array<UserChatProps> => {
    return support_requests.map(
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
            const allMessages = [...messages, ...messagesByTo];
            const latestMessages = getLastMessageByDate(allMessages);
            const {
                data: { message },
                timestamp
            } = latestMessages;
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
};

/**
 * Утилита обработки поиска
 * @param searchString - строка с данными
 */
export const getSearchParams = (searchString: string) => {
    const where: any = { _and: { _or: [{ messages: { to: { _is_null: true } } }, { messagesByTo: {} }] } };
    if (searchString) where._or.push({ name: { _ilike: `%${searchString}%` } });
    if (searchString?.match(REGEXS.uuid)) {
        where._or.push({ id: { _eq: searchString } });
    }
    return where;
};

export const getItemsCount = (data) => data.users_aggregate?.aggregate?.count;
