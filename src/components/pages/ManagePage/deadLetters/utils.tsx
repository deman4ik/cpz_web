export const getSearchOptions = (query: string) => {
    if (!query) return null;
    const defaultCondition = { _like: `%${query}%` };
    return {
        _or: [
            { type: defaultCondition },
            { topic: defaultCondition },
            { id: defaultCondition },
            { event_id: defaultCondition }
        ]
    };
};

export const getItemsCount = (data: any): number => {
    return data.dead_letters_aggregate.aggregate.count;
};

export const parseDeadLetters = (data: any): number =>
    data.dead_letters.map((dead_letter) => {
        return { ...dead_letter, data: dead_letter.data?.data };
    });
