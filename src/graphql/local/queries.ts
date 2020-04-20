import gql from 'graphql-tag';

export const USER = gql`
  query userId {
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

export const ROBOT = gql`
  query {
    robot: Robot @client {
      cache {
        id
        tableName
      }
      subs {
        volume
        asset
        exchange
        currency
      }
      id
      name
      userRobotId
    }
    ChartData @client {
      limit
      robotId
      timeframe
    }
  }
`;

export const SEARCH_FILTERS = gql`
  query searchFilters {
    searchFilters @client
  }
`;
