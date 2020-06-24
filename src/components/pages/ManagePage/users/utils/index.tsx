import React from "react";
// components
import UserCellText from "../components/UserCellText";
import UserCellNotDesktopView from "../components/UserNotDesktopView";
// constants
import { USER_TITLES_SCHEME, CENTRED_CELL, HEADER_TABLE_DATA, COLUMNS_WIDTH } from "../constants";

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
        const telegram_id = { telegram_id: value };
        where._or.push(telegram_id);
    } else if (value.match(REGEXS.uuid)) {
        // опредление uuid  пользователя
        const id = { id: value };
        where._or.push(id);
    }
    return where;
};

export const formatUsers = (data: any) => {
    const newData = data.map((user) => {
        const userItem = { cells: [], NotDesktopView: UserCellNotDesktopView };
        const userCellsScheme = { ...USER_TITLES_SCHEME }; // копия схемы
        Object.keys(USER_TITLES_SCHEME).forEach((key) => {
            switch (key) {
                default:
                    if (user[key]) {
                        userCellsScheme[key].notDesktopVal = user[key];
                        userCellsScheme[key].component = <UserCellText>{user[key]}</UserCellText>;
                    }
            }
        });
        console.log(userCellsScheme);
    });
    // console.log(newData);
};
