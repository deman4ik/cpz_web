import React from "react";
// components
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import DefaultNotDesktopWrapper from "./components/DefaultNotDesktopWrapper";
import { RobotsLoadMore } from "components/ui/RobotsLoadMore";
// constants
import { SCREEN_TYPE } from "config/constants";
// styles
import styles from "./styles/Common.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";

/*types*/
export interface SearchTableProps {
    headerData: Array<any>; // Заголовки колнок
    tableRows: Array<any>; // Массив строк содержащий ячейки
    columnsWidth?: Array<string>; // Ширина колнок
    NotDesktopWrapper?: React.Component | React.FC; // Респонсив представление обертки
    moreButton: {
        // Кнопка показать больше
        handleFetchMore: () => void; // Коллбэк
        maxCount: number; // Максимальное значение загружаемых данных
        limitStep: number; // Шаг пагинации
    };
}

/**
 * Функция рендерера не десктопного отображения таблицы
 * @param CustomView - Кастомный компонент для рендера  не десктопной версии
 * @param tableRows - данные таблицы
 */
const renderNotDesktopWrapper = (CustomView, tableRows) => {
    return CustomView ? <CustomView tableRows={tableRows} /> : <DefaultNotDesktopWrapper tableRows={tableRows} />;
};

/**
 * Таблица отображаемая в разделах с поиском
 * Nuances:
 * 1) headerData, tableRows[item].cells, columnsWidth - должны быть одинаковыми по количеству колнок
 * 2) columnsWidth - отвечает за ширину каждлой колонки
 * TODO: Прописать авторасчет ширины пропорциональный количиству элементов в процентах (так как пропс не обязатален)
 * TODO: Описать типы
 */
const SearchTable: React.FC<SearchTableProps> = ({
    headerData,
    tableRows,
    columnsWidth,
    NotDesktopWrapper,
    moreButton: { handleFetchMore, maxCount, limitStep }
}) => {
    /*Работа с форматом отображения*/
    const { width } = useWindowDimensions();
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);
    /*Определение пропсов кнопки*/
    const loadButtonProps = {
        onFetchMore: handleFetchMore,
        isLoadingMore: false,
        renderLoadMoreButton: tableRows.length < maxCount
    };

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
                renderNotDesktopWrapper(NotDesktopWrapper, tableRows)
            )}
            <div>
                <RobotsLoadMore {...loadButtonProps} />
            </div>
        </div>
    );
};

export default SearchTable;
