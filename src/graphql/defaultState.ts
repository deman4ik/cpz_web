export const defaultState = {
  userId: '',
  ModalVisible: {
    isVisible: false,
    type: '',
    __typename: 'ModalVisible'
  },
  ChartData: {
    limit: 0,
    robotId: '',
    timeframe: 0,
    __typename: 'ChartData'
  },
  Robot: {
    cache: {
      id: '',
      tableName: '',
      __typename: 'CacheData'
    },
    id: '',
    userRobotId: '',
    name: '',
    subs: {
      volume: 0,
      asset: '',
      exchange: '',
      currency: '',
      __typename: 'SubsData'
    },
    __typename: 'Robot'
  },
};
