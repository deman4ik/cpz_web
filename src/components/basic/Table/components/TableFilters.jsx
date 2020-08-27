/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";
import { useAsyncDebounce } from "react-table";
import styles from "../styles/TableHeader.module.css";

import { SearchInput } from "components/basic";

export function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 200);

    return (
        <div>
            <SearchInput
                placeholder={`${count} records...`}
                value={value || ""}
                onChange={(value) => {
                    setValue(value);
                    onChange(value);
                }}
            />
        </div>
    );
}

export function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ""}
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

export function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}>
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}

export function NumberRangeColumnFilter({ column }) {
    const { filterValue = [], preFilteredRows, setFilter, id } = column;
    const [min, max] = React.useMemo(() => {
        let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach((row) => {
            min = Math.min(row.values[id], min);
            max = Math.max(row.values[id], max);
        });
        return [min, max];
    }, [id, preFilteredRows]);

    return (
        <div className={styles.filter_wrapper}>
            <input
                className={`${styles.between_filter_input} ${styles.between_filter_input_left}`}
                value={filterValue[0] || ""}
                type="number"
                onChange={(e) => {
                    const { value } = e.target;
                    setFilter((old = []) => [value ? parseInt(value, 10) : undefined, old[1]]);
                }}
                placeholder={`${min}`}
            />
            to
            <input
                className={`${styles.between_filter_input} ${styles.between_filter_input_right}`}
                value={filterValue[1] || ""}
                type="number"
                onChange={(e) => {
                    const { value } = e.target;
                    setFilter((old = []) => [old[0], value ? parseInt(value, 10) : undefined]);
                }}
                placeholder={`${max}`}
            />
        </div>
    );
}
