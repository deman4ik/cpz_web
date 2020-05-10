import gql from 'graphql-tag';

export const SUBSCRIBE_TO_SIGNALS = gql`
    mutation subscribeToSignals($robotId: String!, $volume: Float!) {
        userSignalSusbcribe(robotId: $robotId, volume: $volume) {
            success
            result
            error
        }
    }
`;

export const UNSUBSCRIBE_FROM_SIGNALS = gql`
    mutation unsubscribeFromSignals($robotId: String!) {
        userSignalUnsusbcribe(robotId: $robotId) {
            success
            result
            error
        }
    }
`;
