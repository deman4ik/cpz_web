import React from "react";
import { useAsyncDebounce } from "react-table";

export function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((val) => {
        setGlobalFilter(val || undefined);
    }, 200);

    return (
        <span>
            Search:{" "}
            <input
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: "1.1rem",
                    border: "0"
                }}
            />
        </span>
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
        const opts = new Set();
        preFilteredRows.forEach((row) => {
            opts.add(row.values[id]);
        });
        return [...opts.values()];
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

export function NumberRangeColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id } }) {
    const [min, max] = React.useMemo(() => {
        let minval = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        let maxval = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
        preFilteredRows.forEach((row) => {
            minval = Math.min(row.values[id], minval);
            maxval = Math.max(row.values[id], maxval);
        });
        return [minval, maxval];
    }, [id, preFilteredRows]);

    return (
        <div
            style={{
                display: "flex"
            }}>
            <input
                value={filterValue[0] || ""}
                type="number"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]]);
                }}
                placeholder={`Min (${min})`}
                style={{
                    width: "70px",
                    marginRight: "0.5rem"
                }}
            />
            to
            <input
                value={filterValue[1] || ""}
                type="number"
                onChange={(e) => {
                    const val = e.target.value;
                    setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined]);
                }}
                placeholder={`Max (${max})`}
                style={{
                    width: "70px",
                    marginLeft: "0.5rem"
                }}
            />
        </div>
    );
}
