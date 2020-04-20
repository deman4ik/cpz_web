import gql from 'graphql-tag';

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
  mutation subscribe($cache: CacheData!, $volume: Float!, $name: String, $type: String!, $chartData: ChartData) {
    subscribe(cache: $cache, volume: $volume, name: $name, type: $type, chartData: $chartData) @client
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
  mutation editRobot($robot: Robot!, $volume: Float!, $name: String, $code: String) {
    editRobot(robot: $robot, volume: $volume, name: $name, code: $code) @client
  }
`;

export const CREATE_ROBOT = gql`
  mutation createRobot($robotInfo: robotInfo!, $volume: Float!) {
    createRobot(robotInfo: $robotInfo, volume: $volume) @client
  }
`;

export const SET_SEARCH_FILTERS = gql`
  mutation setSearchFilters($searchFilters: String!) {
    setSearchFilters(searchFilters: $searchFilters) @client
  }
`;
