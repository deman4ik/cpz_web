/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// components
import { RobotChartCell } from "components/basic/SearchTable/components/cells";

/**
 *  Утилита сборки тайтлов для раздела статистики
 * @param item  - object  с которого собираются значения по ключам из схемы
 * @param titlesScheme - Схема заголовоков
 */
export const getItemsFromTitles = (item: any, titlesScheme: { [key: string]: string }) => {
    return Object.keys(titlesScheme).map((keyTitle) => {
        if (item[keyTitle]) {
            return (
                <p key={keyTitle}>
                    <span>{titlesScheme[keyTitle]}</span>
                    {item[keyTitle]}
                </p>
            );
        }
        return null;
    });
};

export interface ColumnsSchema {
    [index: number]: {
        Header: string;
        columns: {
            Header: string;
            accessor: string;
            orderSchema?: { field: string; subfield?: string };
            isVisible?: boolean;
            width?: number;
            Cell?: (props: any) => any;
        }[];
    };
}

export const defineProperty = (object, property, value) =>
    Object.defineProperty(object, property, { value, writable: false });

export const buildRobotChartCell = ({ value: { performance, profit } }) => {
    return performance.length ? (
        <RobotChartCell style={{ paddingRight: "25px" }} performance={performance} profit={profit} height={120} />
    ) : null;
};
