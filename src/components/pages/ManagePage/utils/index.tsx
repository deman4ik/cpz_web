import React from "react";
/**
 *  Утилита сборки тайтлов для раздела статистики
 * @param item  - object  с которого собираются значения по ключам из схемы
 * @param titlesScheme - Схема заголовоков
 */
export const getItemsFromTitles = (item: any, titlesScheme: { [key: string]: string }) => {
    return Object.keys(titlesScheme).map((keyTitle) => {
        return (
            <p key={keyTitle}>
                <span>{titlesScheme[keyTitle]}</span>
                {item[keyTitle]}
            </p>
        );
    });
};
