import gql from "graphql-tag";

export const UPDATE_EXCHANGE_KEY = gql`
    mutation userExchangeAccUpsert($exchange: String!, $id: uuid, $name: String, $keys: ExchangeKeys!) {
        userExchangeAccUpsert(exchange: $exchange, id: $id, name: $name, keys: $keys) {
            result
        }
    }
`;

export const UPDATE_EXCHANGE_NAME = gql`
    mutation userExchangeAccChangeName($name: String!, $id: uuid!) {
        userExchangeAccChangeName(id: $id, name: $name) {
            result
        }
    }
`;

export const DELETE_EXCHANGE_BY_ID = gql`
    mutation userExchangeAccDelete($id: uuid!) {
        userExchangeAccDelete(id: $id) {
            result
        }
    }
`;

export const SET_USER_SUB = gql`
    mutation createUserSub($subscriptionId: uuid!, $subscriptionOption: String!) {
        createUserSub(subscriptionId: $subscriptionId, subscriptionOption: $subscriptionOption)
    }
`;
