/*eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import React from "react";

// components
import { RobotChartCell } from "components/basic/Table/components/cells";
import { CheckBox } from "components/basic";
import { DocumentNode } from "graphql";

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

export type InputOptions = { label: string | number; value: any }[] | "string" | "number";
export enum InputType {
    select = "select",
    text = "text",
    number = "number"
}

/**
 * single – mutation is called one time
 */
export enum CallMode {
    single,
    multiple
}

export interface ColumnsArraySchema {
    [index: number]: {
        Header: string;
        id: string;
        disableSortBy?: boolean;
        columns: {
            Header: string;
            accessor: any;
            isVisible?: boolean;
            sortSchema?: { field: string; subfield?: string };
            width?: number | string;
            Cell?: (props: any) => any;
            fieldSchema?: { field: string; subfield?: string };
            mutation?: DocumentNode;
            mutationInputOptions?: InputOptions;
            mutationCallMode?: CallMode;
            mutationInputType?: InputType;
        }[];
    };
}

export const defineProperty = (object, property, value) =>
    Object.defineProperty(object, property, { value, writable: false });

export const buildRobotChartCell = ({ value }) =>
    value && value.length ? <RobotChartCell performance={value} height={120} /> : null;

export const buildDisabledCheckboxCell = ({ value }) => <CheckBox checked={value} disabled />;
