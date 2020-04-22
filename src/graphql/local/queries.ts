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
