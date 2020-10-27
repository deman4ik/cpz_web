import gql from "graphql-tag";

/**
 * @variables email, password
 * @returns accessToken
 */
export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        result: login(email: $email, password: $password) {
            accessToken
        }
    }
`;

/**
 * @variables id, hash
 * @returns accessToken
 */
export const LOGIN_TELEGRAM = gql`
    mutation login_with_telegram($data: JSON!) {
        result: loginTelegram(data: $data) {
            accessToken
        }
    }
`;

/**
 * @returns result
 */
export const LOGOUT = gql`
    mutation logout {
        result: logout {
            result
        }
    }
`;

/**
 * @variables email, password
 * @optional name
 * @returns userId
 */
export const REGISTER = gql`
    mutation register($email: String!, $password: String!, $name: String) {
        result: register(email: $email, name: $name, password: $password) {
            userId
        }
    }
`;

/**
 * @returns accessToken, refreshToken, refreshTokenExpireAt
 */
export const REFRESH_TOKEN = gql`
    mutation refresh_token {
        result: refreshToken {
            accessToken
        }
    }
`;

/**
 * @variables secretCode, userId
 * @returns accessToken
 */
export const ACTIVATE_ACCOUNT = gql`
    mutation activate_account($secretCode: String!, $userId: uuid!) {
        result: activateAccount(secretCode: $secretCode, userId: $userId) {
            accessToken
        }
    }
`;

/**
 * @variables email
 * @returns userId
 */
export const PASSWORD_RESET = gql`
    mutation password_reset($email: String!) {
        result: passwordReset(email: $email) {
            userId
        }
    }
`;

/**
 * @variables password, secretCode, userId
 * @returns accessToken
 */
export const CONFIRM_PASSWORD_RESET = gql`
    mutation confirm_pw_reset($password: String!, $secretCode: String!, $userId: uuid!) {
        result: confirmPasswordReset(password: $password, secretCode: $secretCode, userId: $userId) {
            accessToken
        }
    }
`;

/**
 * @variables email
 * @returns result
 */
export const CHANGE_EMAIL = gql`
    mutation change_email($email: String!) {
        result: changeEmail(email: $email) {
            result
        }
    }
`;

/**
 * @variables secretCode
 * @returns accessToken
 */
export const CONFIRM_CHANGE_EMAIL = gql`
    mutation confirm_change_email($secretCode: String!) {
        result: confirmChangeEmail(secretCode: $secretCode) {
            accessToken
        }
    }
`;
