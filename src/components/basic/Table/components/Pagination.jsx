/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from "react";

import { Button } from "../../Button";
import { Select } from "../../Select";

// styles
import styles from "../styles/Common.module.css";
import paginationStyles from "../styles/Pagination.module.css";

const MAX_PAGES = 5;
const MID_FRAGMENT_LENGTH = 3;

const Pagination = ({ tableInstance, setPageIndex, setLimit, pageSizeOptions, pageSize, setPageSize }) => {
    const { pageOptions, pageIndex, gotoPage, pageCount, canNextPage, canPreviousPage } = tableInstance;

    const trimPageOptions = () => {
        if (pageIndex < MAX_PAGES) return pageOptions.slice(0, MAX_PAGES);

        if (pageIndex >= MAX_PAGES && pageIndex < pageCount - MAX_PAGES)
            return pageOptions.slice(pageIndex - 1, pageIndex + MID_FRAGMENT_LENGTH - 1);

        return pageOptions.slice(pageCount - MAX_PAGES, pageCount);
    };

    const trimmedPageOptions = React.useMemo(trimPageOptions, [trimPageOptions]);

    console.log(pageCount, pageIndex);

    useEffect(() => setLimit(pageSizeOptions[0]), [setLimit, pageSizeOptions]);
    return (
        <table className={`${styles.table} ${paginationStyles.pagination}`}>
            <tbody>
                <tr className={`${styles.table_row}`}>
                    <td>
                        <div className={`${paginationStyles.pagination_container}`}>
                            <div className={paginationStyles.pagination_button_group}>
                                <Button
                                    title="←"
                                    onClick={() => {
                                        setPageIndex(pageIndex - 1);
                                        gotoPage(pageIndex - 1);
                                    }}
                                    disabled={!canPreviousPage}
                                />
                                {pageIndex >= MAX_PAGES ? (
                                    <>
                                        <Button
                                            title={1}
                                            onClick={() => {
                                                setPageIndex(0);
                                                gotoPage(0);
                                            }}
                                        />
                                        <Button title="..." />
                                    </>
                                ) : null}
                                {trimmedPageOptions.map((num, i) => (
                                    <div key={i} className={pageIndex === num ? paginationStyles.page_selected : ""}>
                                        <Button
                                            title={num + 1}
                                            onClick={() => {
                                                setPageIndex(num);
                                                gotoPage(num);
                                            }}
                                        />
                                    </div>
                                ))}
                                {(!(pageCount <= MAX_PAGES) &&
                                    pageCount <= MAX_PAGES * 2 &&
                                    pageCount >= Math.ceil((pageIndex + MAX_PAGES) / 2)) ||
                                (pageCount > MAX_PAGES * 2 && pageIndex < pageCount - MAX_PAGES) ? (
                                    <>
                                        <Button title="..." />
                                        <Button
                                            title={pageCount}
                                            onClick={() => {
                                                setPageIndex(pageCount - 1);
                                                gotoPage(pageCount - 1);
                                            }}
                                        />
                                    </>
                                ) : null}
                                <Button
                                    title="→"
                                    onClick={() => {
                                        setPageIndex(pageIndex + 1);
                                        gotoPage(pageIndex + 1);
                                    }}
                                    disabled={!canNextPage}
                                />
                            </div>
                            <div>
                                <Select
                                    width={110}
                                    value={pageSize}
                                    data={pageSizeOptions.map((size) => ({ value: size, label: `Show ${size}` }))}
                                    onChangeValue={(value) => {
                                        setPageIndex(0);
                                        gotoPage(0);
                                        setLimit(Number(value));
                                        setPageSize(Number(value));
                                    }}
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default Pagination;
