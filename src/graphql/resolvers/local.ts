import { GET_SEARCH_PROPS } from '../local/queries';

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

// export const setSearchFilters = (_root: any, variables: any, context: any) => {
//   const { searchFilters, type } = variables;
//   context.client.writeData({
//     data: { Filters: { [type]: searchFilters, __typename: 'Filters' } }
//   });
// };

export const setSearchProps = (_root: any, variables: any, context: any) => {
  const { field, type, value } = variables;
  const dataProps = context.cache.readQuery({ query: GET_SEARCH_PROPS });
  const itemProps = dataProps.SearchProps.props.find(el => el.type === type);
  let data;
  if (itemProps) {
    data = dataProps.SearchProps.props.map(el => {
      if (el.type === type) {
        return { ...el, [field]: value };
      }
      return el;
    });
  } else {
    const item = { type, filters: '', orders: '', [field]: value, __typename: 'PropsType' };
    data = [ ...dataProps.SearchProps.props, item ];
  }
  context.cache.writeQuery({
    query: GET_SEARCH_PROPS,
    data: { SearchProps: { props: data, __typename: 'SearchProps' } }
  });
};
