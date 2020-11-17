import React, { FC } from "react";
import { HeaderStatsSectionItem } from "components/pages/TradingRobotPage/Header/HeaderStatsSectionItem";
import { v4 as uuid } from "uuid";

interface DynamicDataCellProps {
    value: { [key: string]: any };
}
export const DynamicDataCell: FC<DynamicDataCellProps> = ({ value }) => {
    if (!value) {
        return null;
    }
    const entries = Object.entries(value).sort((a, b) => (a[0] > b[0] ? 1 : -1));
    const firstEntry = entries[0];
    const restEntries = entries.slice(1, entries.length);

    const customStyles = { label: { marginLeft: 0 } };
    return (
        <div>
            {restEntries && !!restEntries.length ? (
                <div>
                    {restEntries.map((item) => (
                        <HeaderStatsSectionItem
                            customStyles={customStyles}
                            key={uuid()}
                            value={item[1]}
                            label={item[0]}
                        />
                    ))}
                </div>
            ) : (
                <HeaderStatsSectionItem
                    customStyles={customStyles}
                    key={uuid()}
                    value={firstEntry[1]}
                    label={firstEntry[0]}
                />
            )}
        </div>
    );
};
