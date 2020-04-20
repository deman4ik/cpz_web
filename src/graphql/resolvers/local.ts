export const setModalState = (_root: any, variables: any, context: any) => {
  context.client.writeData({
    data: { ModalVisible: { ...variables, __typename: 'ModalVisible' } }
  });
};

export const setRobot = (_root: any, variables: any, context: any) => {
  const { cache, subs, robot, type } = variables;
  const cacheData = { ...cache, __typename: 'CacheData' };
  const subsData = { ...subs, __typename: 'SubsData' };
  const robotData = { ...robot, cache: cacheData, subs: subsData };
  context.client.writeData({
    data: { Robot: { ...robotData, __typename: 'Robot' } }
  });
  return type;
};

export const setChartData = (_root: any, variables: any, context: any) => {
  context.client.writeData({
    data: { ChartData: { ...variables, __typename: 'ChartData' } }
  });
};

export const setSearchFilters = (_root: any, variables: any, context: any) => {
  context.client.writeData({
    data: { searchFilters: variables.searchFilters }
  });
};
