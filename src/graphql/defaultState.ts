export const defaultState = {
    userId: "",
    Limit: {
        signals: 12,
        robots: 12,
        __typename: "Limit"
    },
    NotificationsProps: {
        filters: "all",
        __typename: "NotificationsProps"
    },
    SearchProps: {
        props: [],
        __typename: "SearchProps"
    },
    ModalVisible: {
        isVisible: false,
        type: "",
        __typename: "ModalVisible"
    },
    ChartData: {
        limit: 0,
        robotId: "",
        timeframe: 0,
        __typename: "ChartData"
    },
    Robot: {
        cache: {
            id: "",
            tableName: "",
            __typename: "CacheData"
        },
        id: "",
        userRobotId: "",
        name: "",
        subs: {
            settings: {
                volumeType: "",
                volume: 0,
                volumeInCurrency: 0
            },
            asset: "",
            exchange: "",
            currency: "",
            __typename: "SubsData"
        },
        __typename: "Robot"
    }
};
