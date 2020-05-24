import { GET_SEARCH_PROPS } from "../local/queries";

export const setModalState = (_root: any, variables: any, context: any) => {
    context.client.writeData({
        data: { ModalVisible: { ...variables, __typename: "ModalVisible" } }
    });
};

export const setRobot = (_root: any, variables: any, context: any) => {
    const { cache, subs, robot, type } = variables;
    const cacheData = { ...cache, __typename: "CacheData" };
    const subsData = { ...subs, __typename: "SubsData" };
    const robotData = { ...robot, cache: cacheData, subs: subsData };
    context.client.writeData({
        data: { Robot: { ...robotData, __typename: "Robot" } }
    });
    return type;
};

export const setChartData = (_root: any, variables: any, context: any) => {
    context.client.writeData({
        data: { ChartData: { ...variables, __typename: "ChartData" } }
    });
};

export const setSearchProps = (_root: any, variables: any, context: any) => {
    const { filters, type, orders } = variables;
    const dataProps = context.cache.readQuery({ query: GET_SEARCH_PROPS });
    const itemProps = dataProps.SearchProps.props.find((el) => el.type === type);
    let data;
    if (itemProps) {
        data = dataProps.SearchProps.props.map((el) => {
            if (el.type === type) {
                return { ...el, filters, orders };
            }
            return el;
        });
    } else {
        const item = { type, filters, orders, __typename: "PropsType" };
        data = [...dataProps.SearchProps.props, item];
    }
    context.cache.writeQuery({
        query: GET_SEARCH_PROPS,
        data: { SearchProps: { props: data, __typename: "SearchProps" } }
    });
};

export const setSearchLimit = (_root: any, variables: any, context: any) => {
    const { limit, type } = variables;
    context.client.writeData({
        data: { Limit: { [type]: limit, __typename: "Limit" } }
    });
};

export const setNotificationsProps = (_root: any, variables: any, context: any) => {
    const { filters } = variables;
    console.log("filters", filters);
    context.client.writeData({
        data: { NotificationsProps: { filters, __typename: "NotificationsProps" } }
    });
    return filters;
};
