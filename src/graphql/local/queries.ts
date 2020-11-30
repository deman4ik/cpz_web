import gql from "graphql-tag";
import { RobotsType } from "config/types";

export const USER = gql`
    query {
        userId @client
    }
`;

export const CHART_DATA = gql`
    query {
        ChartData @client {
            limit
            robotId
            timeframe
        }
    }
`;

export const MODAL_VISIBLE = gql`
    query {
        ModalVisible @client {
            isVisible
            type
        }
    }
`;

const SignalTypeFields = `cache {
                id
                tableName
            }
            subs {
                settings
                asset
                exchange
                currency
            }
            id
            code
            name
            userRobotId`;
const RobotTypeFields = `
            ${SignalTypeFields}
            user_ex_acc_id`;

const robotFieldsToType = {
    [RobotsType.signals]: SignalTypeFields,
    [RobotsType.robots]: RobotTypeFields
};
export const ROBOT = (type) => gql`
    query {
        robot: Robot @client {
            ${robotFieldsToType[type]}
        }
        ChartData @client {
            limit
            robotId
            timeframe
        }
    }
`;

export const GET_SEARCH_PROPS = gql`
    query SearchProps {
        SearchProps @client {
            props {
                type
                filters
                orders
            }
        }
    }
`;

export const GET_SEARCH_LIMIT = gql`
    query Limit {
        Limit @client {
            signals
            robots
        }
    }
`;

export const GET_NOTIFICATIONS_PROPS = gql`
    query NotificationsProps {
        NotificationsProps @client {
            filters
        }
    }
`;
