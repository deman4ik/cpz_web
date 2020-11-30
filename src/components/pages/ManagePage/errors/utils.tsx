export const getSearchOptions = (query: string) => {
    if (!query) return null;
    const defaultCondition = { _like: `%${query}%` };
    return {
        _or: [
            { type: defaultCondition },
            { topic: defaultCondition }
            //{ id: defaultCondition },
            //{ event_id: defaultCondition }
        ]
    };
};

export const getItemsCount = (data: any): number => {
    return data.error_events_aggregate.aggregate.count;
};

export const parseErrors = (data: any): number => {
    return data.error_events.map((error_event) => ({ ...error_event, data: error_event.data.data }));
};
