import gql from 'graphql-tag';

export const UPDATE_EXCHANGE_KEY = gql`
    mutation userExchangeAccUpsert($exchange: String!, $id: ID!, $name: String, $keys: ExchangeKeys!) {
        userExchangeAccUpsert(exchange: $exchange, id: $id, name: $name, keys: $keys) {
            error
            result
            success
        }
    }
`;

export const UPDATE_EXCHANGE_NAME = gql`
    mutation userExchangeAccChangeName($name: String!, $id: ID!) {
        userExchangeAccChangeName(id: $id, name: $name) {
            error
            result
            success
        }
    }
`;

export const DELETE_EXCHANGE_BY_ID = gql`
    mutation userExchangeAccDelete($id: ID!) {
        userExchangeAccDelete(id: $id) {
            error
            result
            success
        }
    }
`;
