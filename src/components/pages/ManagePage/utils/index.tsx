/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// components
import { RobotChartCell } from "components/basic/Table/components/cells";
import { CheckBox } from "components/basic";

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

export interface ColumnsArraySchema {
    [index: number]: {
        Header: string;
        id: string;
        disableSortBy?: boolean;
        columns: {
            Header: string;
            accessor: string;
            isVisible?: boolean;
            orderSchema?: { field: string; subfield?: string };
            width?: number;
            Cell?: (props: any) => any;
        }[];
    };
}

export const defineProperty = (object, property, value) =>
    Object.defineProperty(object, property, { value, writable: false });

export const buildRobotChartCell = ({ value }) =>
    value.length ? <RobotChartCell performance={value} height={120} /> : null;

export const buildCheckBoxCell = ({ value }) => (
    <CheckBox
        style={{ display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}
        checked={value}
        disabled
    />
);
