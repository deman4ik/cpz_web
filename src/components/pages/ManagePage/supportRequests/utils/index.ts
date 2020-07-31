// types
import { UserChatProps } from "../components/UserChat";

export interface message {
    data: { message: string };
}

export interface userRequestItem {
    user_id: string;
    user_name: string;
    messages: Array<message>;
}

export const formatUsersSupportRequests = (usersRequests: Array<userRequestItem>): Array<UserChatProps> => {
    return usersRequests.map(({ user_id, user_name, messages }) => {
        return {
            user_id,
            user_name,
            message: messages[0].data.message
        };
    });
};
