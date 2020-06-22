import React from "react";
// styles
import notDesktopStyles from "../styles/NotDesktop.module.css";

interface NotDesktopProps {
    tableRows: Array<any>;
}
// TODO: пробросить key
/*Мобильное отображение данных таблицы*/
const DefaultNotDesktop: React.FC<NotDesktopProps> = ({ tableRows }) => {
    return (
        <div className={notDesktopStyles.not_desktop_wrapper}>
            {tableRows.map(({ cells, NotDesktopView }) => {
                return (
                    <div className={notDesktopStyles.not_desktop_item_wrapper}>
                        <NotDesktopView data={cells} />
                    </div>
                );
            })}
        </div>
    );
};

export default DefaultNotDesktop;
