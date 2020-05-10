import gql from 'graphql-tag';

export const SET_USER_NAME = gql`
    mutation changeName($name: String!) {
        changeName(name: $name) {
            success
            result
            error
        }
    }
`;

export const SET_USER_PASSWORD = gql`
    mutation changePassword($password: String!, $oldPassword: String) {
        changePassword(password: $password, oldPassword: $oldPassword) {
            success
            result
            error
        }
    }
`;

export const CHANGE_USER_EMAIL = gql`
    mutation changeEmail($email: String!) {
        changeEmail(email: $email) {
            success
            result
            error
        }
    }
`;

export const CONFIRM_USER_EMAIL = gql`
    mutation confirmChangeEmail($secretCode: String!) {
        confirmChangeEmail(secretCode: $secretCode) {
            success
            result
            error
        }
    }
`;

export const SET_NOTIFICATION_SETTINGS = gql`
    mutation setNotificationSettings(
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
            success
            result
            error
        }
    }
`;

export const ADD_TELEGRAM_ACCOUNT = gql`
    mutation setTelegram($data: JSON!) {
        setTelegram(data: $data) {
            success
            result
            error
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
