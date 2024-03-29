import gql from "graphql-tag";

export const SET_MODAL_STATE = gql`
    mutation setModalState($cache: CacheData!, $robot: Robot!, $subs: SubsData, $type: String!, $isVisible: Boolean!) {
        setModalState(isVisible: $isVisible, type: $type) @client
        setRobot(cache: $cache, robot: $robot, subs: $subs, type: $type) @client
    }
`;

export const SET_ROBOT_DATA = gql`
    mutation setRobot($cache: CacheData!, $robot: Robot!, $subs: SubsData, $type: String) {
        setRobot(cache: $cache, robot: $robot, subs: $subs, type: $type) @client
    }
`;

export const SET_MODAL_VISIBLE = gql`
    mutation setModalVisible($type: String!, $isVisible: Boolean!) {
        setModalState(type: $type, isVisible: $isVisible) @client
    }
`;

export const UNSUBSCRIBE = gql`
    mutation unsubscribe($cache: CacheData!, $chartData: ChartData) {
        unsubscribe(cache: $cache, chartData: $chartData) @client
    }
`;

export const SUBSCRIBE = gql`
    mutation subscribe($cache: CacheData!, $volume: Float!, $type: String!, $chartData: ChartData) {
        subscribe(cache: $cache, volume: $volume, type: $type, chartData: $chartData) @client
    }
`;

export const SET_CHART_DATA = gql`
    mutation setChartData($limit: Int!, $robotId: String!, $timeframe: Int!) {
        setChartData(limit: $limit, robotId: $robotId, timeframe: $timeframe) @client
    }
`;

export const DELETE_ROBOT = gql`
    mutation deleteRobot($robot: Robot!) {
        deleteRobot(robot: $robot) @client
    }
`;

export const ACTION_ROBOT = gql`
    mutation actionRobot($robot: Robot!, $message: String!) {
        actionRobot(robot: $robot, message: $message) @client
    }
`;

export const EDIT_ROBOT = gql`
    mutation editRobot($robot: Robot!, $volume: Float!, $code: String) {
        editRobot(robot: $robot, volume: $volume, code: $code) @client
    }
`;

export const CREATE_ROBOT = gql`
    mutation createRobot($robotInfo: robotInfo!, $volume: Float!) {
        createRobot(robotInfo: $robotInfo, volume: $volume) @client
    }
`;

export const SET_SEARCH_PROPS = gql`
    mutation setSearchProps($filters: String!, $type: String!, $orders: String) {
        setSearchProps(filters: $filters, type: $type, orders: $orders) @client
    }
`;

export const SET_SEARCH_LIMIT = gql`
    mutation setSearchLimit($limit: Int, $type: String!) {
        setSearchLimit(limit: $limit, type: $type) @client
    }
`;

export const SET_NOTIFICATIONS_PROPS = gql`
    mutation setNotificationsProps($filters: String!) {
        setNotificationsProps(filters: $filters) @client
    }
`;
