import React from "react";
// styles
import styles from "./styles/Common.module.css";
import headerStyles from "./styles/TableHeader.module.css";

interface TableHeaderProps {
    headerData: Array<any>;
    columnsWidth?: Array<string>;
}

/**
 * Шапка таблицы
 * @param headerData  - заголовки таблицы
 * @param columnsWidth - щирина ячеек
 */
const TableHeader: React.FC<TableHeaderProps> = ({ headerData, columnsWidth }) => {
    let headerCells = [];
    if (!columnsWidth) {
        headerCells = headerData.map((itempRrops, index) => (
            <td className={headerStyles.table_header_cell} {...itempRrops} key={index}>
                {itempRrops.text}
            </td>
        ));
    } else {
        headerCells = columnsWidth.map((width, index) => (
            <td style={{ width }} className={headerStyles.table_header_cell} {...headerData[index]} key={index}>
                {headerData[index]?.text}
            </td>
        ));
    }

    return (
        <thead>
            <tr className={styles.table_row}>{headerCells}</tr>
        </thead>
    );
};

export default TableHeader;
