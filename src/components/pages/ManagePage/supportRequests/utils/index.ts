// types
import { UserChatProps } from "../components/UserChat";
// utils
import { formatDate } from "config/utils";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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

/**
 * Утилита форматирования сообщений
 */
export const formatUsersSupportRequests = (usersRequests: Array<userRequestItem>): Array<UserChatProps> => {
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
            const messages_count = messageCount + countByTo;
            return {
                user_id,
                user_name,
                message: messagesByTo[0].data.message,
                timestamp: formatDate(messagesByTo[0]?.timestamp),
                messages_count
            };
        }
    );
    return requests;
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
