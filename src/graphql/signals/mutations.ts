import gql from "graphql-tag";

export const SUBSCRIBE_TO_SIGNALS = gql`
    mutation subscribeToSignals($robotId: String!, $settings: UserSignalSettings!) {
        userSignalSusbcribe(robotId: $robotId, settings: $settings) {
            result
        }
    }
`;

export const UNSUBSCRIBE_FROM_SIGNALS = gql`
    mutation unsubscribeFromSignals($robotId: String!) {
        userSignalUnsusbcribe(robotId: $robotId) {
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
