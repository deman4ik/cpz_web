import gql from "graphql-tag";

export const SUBSCRIBE_TO_SIGNALS = gql`
    mutation subscribeToSignals($robotId: uuid!, $settings: UserSignalSettings!) {
        userSignalSubscribe(robotId: $robotId, settings: $settings) {
            result
        }
    }
`;

export const UNSUBSCRIBE_FROM_SIGNALS = gql`
    mutation unsubscribeFromSignals($robotId: uuid!) {
        userSignalUnsubscribe(robotId: $robotId) {
            result
        }
    }
`;

export const EDIT_SIGNAL = gql`
    mutation editUserSignal($robotId: uuid!, $settings: UserSignalSettings!) {
        userSignalEdit(robotId: $robotId, settings: $settings) {
            result
        }
    }
`;
