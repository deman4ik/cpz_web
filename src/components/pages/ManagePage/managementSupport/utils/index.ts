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
    user: { id: string; name: string };
    messages_count: number;
    lastMessage: {
        id: string;
        timestamp: string;
        data: {
            message: string;
        };
    };
}

export type orderType = "asc" | "desc";

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
            user: { id, name },
            messages_count,
            lastMessage: {
                timestamp,
                data: { message }
            }
        }) => {
            return {
                id,
                name,
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
    if (!searchString) return null;
    const where: any = { _and: { _or: [] } };
    if (searchString) where._or.push({ name: { _ilike: `%${searchString}%` } });
    if (searchString?.match(REGEXS.uuid)) {
        where._or.push({ id: { _eq: searchString } });
    }
    return where;
};

export const getItemsCount = (data) => data.v_support_messages_aggregate?.aggregate?.count;
