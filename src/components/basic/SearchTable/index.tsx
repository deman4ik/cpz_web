import React from "react";
// components
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import DefaultNotDesktop from "./components/DefaultNotDesktop";
// constants
import { SCREEN_TYPE } from "config/constants";

// styles
import styles from "./styles/Common.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";

interface SearchTableProps {
    headerData: Array<any>;
    tableRows: Array<any>;
    columnsWidth?: Array<string>;
    NotDesktopComponent?: React.Component | React.FC;
}

/**
 * Функция рендерера не десктопного отображения таблицы
 * @param CustomView - Кастомный компонент для рендера  не десктопной версии
 * @param tableRows - данные таблицы
 */
const renderNotDesktop = (CustomView, tableRows) => {
    return CustomView ? <CustomView tableRows={tableRows} /> : <DefaultNotDesktop tableRows={tableRows} />;
};

/**
 * Таблица отображаемая в разделах с поиском
 */
const SearchTable: React.FC<SearchTableProps> = ({ headerData, tableRows, columnsWidth, NotDesktopComponent }) => {
    const { width } = useWindowDimensions();
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);
    return (
        <div className={styles.wrapper}>
            {isDesktopView ? (
                <>
                    <table className={styles.table}>
                        <TableHeader headerData={headerData} columnsWidth={columnsWidth} />
                    </table>
                    <table className={styles.table}>
                        <TableBody tableRows={tableRows} columnsWidth={columnsWidth} />
                    </table>
                </>
            ) : (
                renderNotDesktop(NotDesktopComponent, tableRows)
            )}
        </div>
    );
};

export default SearchTable;
