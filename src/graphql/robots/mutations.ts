import gql from "graphql-tag";

export const USER_ROBOT_CREATE = gql`
    mutation userRobotCreate($robotId: String!, $volume: Float!, $userExAccId: String!) {
        userRobotCreate(robotId: $robotId, settings: { volume: $volume }, userExAccId: $userExAccId) {
            error
            result
            success
        }
    }
`;

export const USER_ROBOT_EDIT = gql`
    mutation userRobotEdit($id: String!, $volume: Float!) {
        userRobotEdit(id: $id, settings: { volume: $volume }) {
            error
            result
            success
        }
    }
`;

export const USER_ROBOT_DELETE = gql`
    mutation userRobotDelete($id: String!) {
        userRobotDelete(id: $id) {
            error
            result
            success
        }
    }
`;

export const USER_ROBOT_START = gql`
    mutation userRobotStart($id: ID!) {
        userRobotStart(id: $id) {
            error
            status
            id
            success
        }
    }
`;

export const USER_ROBOT_STOP = gql`
    mutation userRobotStop($id: ID!) {
        userRobotStop(id: $id) {
            error
            status
            id
            success
        }
    }
`;
