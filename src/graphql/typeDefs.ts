import gql from "graphql-tag";

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

    extend type RobotSettings {
        volumeType: String!
        volume: Float
        volumeInCurrency: Float
    }

    extend type SubsData {
        settings: RobotSettings
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

    extend type PropsType {
        type: String
        filters: String
        orders: String
    }

    extend type SearchProps {
        props: [PropsType]
    }

    extend type Limit {
        signals: Int
        robots: Int
    }

    extend type NotificationsProps {
        filters: String
    }

    extend type Query {
        userId: String!
        Limit: Limit!
        ChartData: ChartData!
        ModalVisible: ModalVisible!
        Robot: Robot!
        SearchProps: SearchProps!
        NotificationsProps: NotificationsProps!
    }
`;
