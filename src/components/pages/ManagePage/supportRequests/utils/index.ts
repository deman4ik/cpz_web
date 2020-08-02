// types
import { UserChatProps } from "../components/UserChat";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface message {
    data: { message: string };
}

export interface userRequestItem {
    user_id: string;
    user_name: string;
    messages: Array<message>;
}

/**
 * Утилита форматирования сообщений
 */
export const formatUsersSupportRequests = (usersRequests: Array<userRequestItem>): Array<UserChatProps> => {
    const requests = usersRequests.map(({ user_id, user_name, messages }) => {
        return {
            user_id,
            user_name,
            message: messages[0].data.message
        };
    });
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
