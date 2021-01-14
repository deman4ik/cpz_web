import gql from "graphql-tag";

export const USER_ROBOT_CREATE = gql`
    mutation userRobotCreate($robotId: uuid!, $settings: UserRobotSettings!, $userExAccId: uuid!) {
        userRobotCreate(robotId: $robotId, settings: $settings, userExAccId: $userExAccId) {
            result
        }
    }
`;

export const USER_ROBOT_EDIT = gql`
    mutation userRobotEdit($robotId: uuid!, $settings: UserRobotSettings!) {
        userRobotEdit(id: $robotId, settings: $settings) {
            result
        }
    }
`;

export const USER_ROBOT_DELETE = gql`
    mutation userRobotDelete($id: uuid!) {
        userRobotDelete(id: $id) {
            result
        }
    }
`;

export const USER_ROBOT_START = gql`
    mutation userRobotStart($id: uuid!) {
        userRobotStart(id: $id) {
            result
        }
    }
`;

export const USER_ROBOT_STOP = gql`
    mutation userRobotStop($id: uuid!) {
        userRobotStop(id: $id) {
            result
        }
    }
`;
