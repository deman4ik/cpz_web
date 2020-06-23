const REGEXS = {
    telegram_id: /^\d{9}/g,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
};

/**
 *  Функция позволяющаяя вернуть переменные которые требуются для фильтров
 */
export const getWhereVariables = (value: string): any => {
    const where: any = {
        _or: [
            { name: { _like: `%${value}%` } },
            { telegram_username: { _like: `%${value}%` } },
            { email: { _like: `%${value}%` } }
        ]
    };
    if (value.match(REGEXS.telegram_id)) {
        // определение telegram_id
        const telgram_id = { telegram_id: value };
        where._or.push(telgram_id);
    } else if (value.match(REGEXS.uuid)) {
        // опредление uuid  пользователя
        const id = { id: value };
        where._or.push(id);
    }
    return where;
};
