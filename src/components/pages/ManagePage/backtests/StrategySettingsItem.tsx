import React, { FC, useEffect, useRef } from "react";
import { Accordion } from "components/basic";
import { HeaderStatsSectionItem } from "components/pages/TradingRobotPage/Header/HeaderStatsSectionItem";
import { v4 as uuid } from "uuid";
import style from "./BacktestSettingsItem.module.css";

interface StrategySettingsItemProps {
    value: { [key: string]: any };
}
export const StrategySettingsItem: FC<StrategySettingsItemProps> = ({ value }) => {
    const entries = Object.entries(value);
    const firstEntry = entries[0];
    const restEntries = entries.slice(1, entries.length);

    return (
        <div className={style.root}>
            {restEntries && !!restEntries.length ? (
                <Accordion title={`${firstEntry[0]}: ${firstEntry[1]}`}>
                    <div className={style.container}>
                        {restEntries.map((item) => (
                            <HeaderStatsSectionItem
                                customStyles={{ container: { width: 215, marginBottom: 15 }, label: { marginLeft: 0 } }}
                                key={uuid()}
                                value={item[1]}
                                label={item[0]}
                            />
                        ))}
                    </div>
                </Accordion>
            ) : (
                <HeaderStatsSectionItem
                    customStyles={{ label: { marginLeft: 0 } }}
                    key={uuid()}
                    value={firstEntry[1]}
                    label={firstEntry[0]}
                />
            )}
        </div>
    );
};
