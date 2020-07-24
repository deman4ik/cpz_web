import React, { memo } from "react";
import { v4 as uuid } from "uuid";
// styles
import notDesktopStyles from "../styles/NotDesktop.module.css";

export interface NotDesktopProps {
    tableRows: Array<any>;
}

/*Респонсив отображение данных таблицы*/
const DefaultNotDesktopWrapper: React.FC<NotDesktopProps> = memo(({ tableRows }) => {
    return (
        <div className={notDesktopStyles.not_desktop_wrapper}>
            {tableRows.map(({ cells, NotDesktopView }) => {
                return (
                    <div className={notDesktopStyles.not_desktop_item_wrapper} key={uuid()}>
                        <NotDesktopView data={cells} />
                    </div>
                );
            })}
        </div>
    );
});

export default DefaultNotDesktopWrapper;
