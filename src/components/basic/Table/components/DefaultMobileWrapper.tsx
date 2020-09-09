import React, { memo } from "react";
import { v4 as uuid } from "uuid";
// styles
import mobileStyles from "../styles/Mobile.module.css";

export interface MobileProps {
    tableRows: Array<any>;
}

/*Респонсив отображение данных таблицы*/
const DefaultMobileWrapper: React.FC<MobileProps> = memo(({ tableRows }) => {
    return (
        <div className={mobileStyles.mobile_wrapper}>
            {tableRows.map(({ cells, MobileView }) => {
                return (
                    <div className={mobileStyles.mobile_item_wrapper} key={uuid()}>
                        <MobileView data={cells} />
                    </div>
                );
            })}
        </div>
    );
});

export default DefaultMobileWrapper;
