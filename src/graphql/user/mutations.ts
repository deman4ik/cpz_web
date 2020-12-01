import gql from "graphql-tag";

export const SET_USER_NAME = gql`
    mutation changeName($name: String!) {
        changeName(name: $name) {
            result
        }
    }
`;

export const SET_USER_PASSWORD = gql`
    mutation changePassword($password: String!, $oldPassword: String) {
        changePassword(password: $password, oldPassword: $oldPassword) {
            result
        }
    }
`;

export const CHANGE_USER_EMAIL = gql`
    mutation changeEmail($email: String!) {
        changeEmail(email: $email) {
            result
        }
    }
`;

export const CONFIRM_USER_EMAIL = gql`
    mutation confirmChangeEmail($secretCode: String!) {
        confirmChangeEmail(secretCode: $secretCode) {
            accessToken
        }
    }
`;

export const SET_NOTIFICATION_SETTINGS = gql`
    mutation setNotificationSettings(
        $newsEmail: Boolean
        $newsTelegram: Boolean
        $signalsEmail: Boolean
        $signalsTelegram: Boolean
        $tradingEmail: Boolean
        $tradingTelegram: Boolean
    ) {
        setNotificationSettings(
            signalsEmail: $signalsEmail
            signalsTelegram: $signalsTelegram
            tradingEmail: $tradingEmail
            tradingTelegram: $tradingTelegram
        ) {
            result
        }
    }
`;

export const ADD_TELEGRAM_ACCOUNT = gql`
    mutation setTelegram($data: TelegramInput!) {
        setTelegram(data: $data) {
            result
        }
    }
`;

// For test only
export const UPDATE_USER = gql`
    mutation update_users($_set: users_set_input!, $where: users_bool_exp!) {
        update_users(_set: $_set, where: $where) {
            affected_rows
        }
    }
`;

export const UPDATE_NOTIFICATIONS = gql`
    mutation update_notifications($_set: notifications_set_input, $where: notifications_bool_exp!) {
        update_notifications(_set: $_set, where: $where) {
            affected_rows
        }
    }
`;
