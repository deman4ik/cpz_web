import React from "react";
// components
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

// styles
import styles from "./styles/Common.module.css";

//TODO: Описать нормальные types
interface SearchTableProps {
    headerData: Array<any>;
    tableBody: Array<any>;
    columnsWidth?: Array<string>;
}

/**
 * Таблица отображаемая в разделах с поиском
 */
const SearchTable: React.FC<SearchTableProps> = ({ headerData,tableBody, columnsWidth }) => {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <TableHeader headerData={headerData} columnsWidth={columnsWidth} />
            </table>
            <table className={styles.table}>
                <TableBody tableBody={tableBody} columnsWidth={columnsWidth} />
            </table>
        </div>
    );
};

export default SearchTable;
