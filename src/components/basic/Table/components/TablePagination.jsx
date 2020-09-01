/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import { Button } from "../../Button";
import { Select } from "../../Select";

// styles
import styles from "../styles/Common.module.css";
import headerStyles from "../styles/TableHeader.module.css";
import paginationStyles from "../styles/TablePagination.module.css";

const Pagination = ({
    tableProps,
    pageOptions,
    pageIndex,
    setPageIndex,
    gotoPage,
    setLimit,
    pageSizeOptions,
    pageSize,
    setPageSize
}) => (
    <table {...tableProps} className={styles.table}>
        <tbody>
            <tr className={`${styles.table_row}`}>
                <td className={`${headerStyles.table_header_cell}`}>
                    <div className={`${paginationStyles.pagination_container}`}>
                        <div className={paginationStyles.pagination_button_group}>
                            {pageOptions.map((num, i) => (
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
                        </div>
                        <Select
                            width={110}
                            value={pageSize}
                            data={pageSizeOptions.map((size) => ({ value: size, label: `Show ${size}` }))}
                            onChangeValue={(value) => {
                                setLimit(Number(value));
                                setPageSize(Number(value));
                            }}
                        />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
);

export default Pagination;
