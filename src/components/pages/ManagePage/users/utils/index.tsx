import React from "react";
// components
import UserCellText from "../components/UserCellText";
import UserCellNotDesktopView from "../components/UserNotDesktopView";
// constants
import { USER_TITLES_SCHEME, CENTRED_CELL, REGEXS } from "../constants";
// utils
import { formatDate } from "config/utils";
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
        const telegram_id = { telegram_id: { _eq: value } };
        where._or.push(telegram_id);
    } else if (value.match(REGEXS.uuid)) {
        // опредление uuid  пользователя
        const id = { id: { _eq: value } };
        where._or.push(id);
    }
    return where; // возвращаемое значение where  для фильтров
};

/*Форматирование данных для вывода в таблицу*/
export const formatUsers = (data: Array<any>): Array<any> => {
    /*Функция для фоматирования настроек пользователя*/
    const formatSettings = (object) =>
        Object.keys(object)
            .filter((key) => object[key])
            .join(", ");

    /*Форматинг и обработка дыннх для отображения в таблице*/
    return data.map((user) => {
        const userItem = { cells: [], NotDesktopView: UserCellNotDesktopView }; // экземпляр строки
        const userCellsScheme: any = {}; // схема ячеек

        /*Форматинг на основе схемы заголовков*/
        Object.keys(USER_TITLES_SCHEME).forEach((key) => {
            let innerComponent; // переопределяемая переменная компонента
            /*Переменные настроек*/

            let notifications;
            let trading;
            /*Форматинг по ключам*/
            switch (key) {
                case "telegram":
                    innerComponent = user.telegram_id ? (
                        <UserCellText>
                            <p>{`${USER_TITLES_SCHEME.telegram.telegram_id}  ${user.telegram_id}`}</p>
                            <p>{`${USER_TITLES_SCHEME.telegram.telegram_username} ${user.telegram_username}`}</p>
                        </UserCellText>
                    ) : (
                        <UserCellText>Not telegram</UserCellText>
                    );
                    userCellsScheme.telegram = {
                        title: USER_TITLES_SCHEME.telegram.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "roles":
                    innerComponent = (
                        <UserCellText>
                            <p>{`${USER_TITLES_SCHEME.roles.defaultRole} ${user.roles.defaultRole}`}</p>
                            <p>{`${USER_TITLES_SCHEME.roles.allowedRoles} ${user.roles.allowedRoles.join(", ")}`}</p>
                        </UserCellText>
                    );
                    userCellsScheme.roles = {
                        title: USER_TITLES_SCHEME.roles.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "settings":
                    notifications = formatSettings(user.settings.notifications.signals);
                    trading = formatSettings(user.settings.notifications.trading);

                    innerComponent = (
                        <UserCellText>
                            <p>
                                {USER_TITLES_SCHEME.settings.notifications}
                                {notifications}
                            </p>
                            <p>
                                {USER_TITLES_SCHEME.settings.trading}
                                {trading}
                            </p>
                        </UserCellText>
                    );
                    userCellsScheme.settings = {
                        title: USER_TITLES_SCHEME.settings.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "entries":
                    innerComponent = (
                        <UserCellText>
                            <p>
                                {USER_TITLES_SCHEME.entries.user_robots}
                                {user.user_robots.length}
                            </p>
                            <p>
                                {USER_TITLES_SCHEME.entries.user_signals}
                                {user.user_signals.length}
                            </p>
                            <p>
                                {USER_TITLES_SCHEME.entries.user_exchange_accs}
                                {user.user_exchange_accs.length}
                            </p>
                        </UserCellText>
                    );
                    userCellsScheme.entries = {
                        title: USER_TITLES_SCHEME.entries.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "status":
                    innerComponent = <UserCellText>{user.status ? "active" : "not active"}</UserCellText>;
                    userCellsScheme.status = {
                        title: USER_TITLES_SCHEME.status.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                case "created_at":
                    innerComponent = <UserCellText style={CENTRED_CELL}>{formatDate(user.created_at)}</UserCellText>;
                    userCellsScheme.created_at = {
                        title: USER_TITLES_SCHEME.created_at.title,
                        notDesktopVal: innerComponent,
                        component: innerComponent
                    };
                    break;
                default:
                    if (Object.prototype.hasOwnProperty.call(user, key)) {
                        innerComponent = <UserCellText>{user[key] ? user[key] : "Not info"}</UserCellText>;
                        userCellsScheme[key] = {
                            title: USER_TITLES_SCHEME[key].title,
                            notDesktopVal: innerComponent,
                            component: innerComponent
                        };
                    }
            }
            userItem.cells.push(userCellsScheme[key]);
        });
        return userItem;
    });
};
