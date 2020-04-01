import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type ModalVisible {
    isVisible: Boolean!
    type: String!
  }

  extend type ChartData {
    limit: Int!
    robotId: String!
    timeframe: Int!
  }

  extend type CacheData {
    id: String!
    tableName: String!
  }

  extend type SubsData {
    volume: Float
    asset: String
    exchange: String
    currency: String
  }

  extend type Robot {
    cache: CacheData!
    id: String!
    userRobotId: String
    name: String!
    subs: SubsData
  }

  extend type RobotInfo {
    userRobotId: String
    robotId: String!
    name: String
  }

  extend type Query {
    userId: String!
    ChartData: ChartData!
    ModalVisible: ModalVisible!
    Robot: Robot!
  }
`;
