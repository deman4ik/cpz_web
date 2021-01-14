import React, { FC } from "react";
import { HeaderStatsSectionItem } from "components/pages/TradingRobotPage/Header/HeaderStatsSectionItem";
import { v4 as uuid } from "uuid";
import { ExpandedList } from "components/basic";

interface DynamicDataCellProps {
    value: { [key: string]: any };
}

export const DynamicDataCell: FC<DynamicDataCellProps> = ({ value }) => {
    if (!value) {
        return null;
    }
    const entries = Object.entries(value).sort((a, b) => (a[0] > b[0] ? 1 : -1));

    const customStyles = {
        label: { marginLeft: 0, width: 100 },
        value: { marginLeft: 0, textAlign: "right" }
    };
    return entries && !!entries.length ? (
        <div style={{ width: "100%", height: "100%" }}>
            {entries.map((item) => {
                if (typeof item[1] !== "object" || item[1] === null)
                    return (
                        <HeaderStatsSectionItem
                            customStyles={customStyles}
                            key={uuid()}
                            value={item[1] || "–"}
                            label={item[0]}
                        />
                    );

                return (
                    <HeaderStatsSectionItem
                        customStyles={{ label: customStyles.label }}
                        key={uuid()}
                        value={
                            <div style={{ position: "relative", width: "100%" }}>
                                <ExpandedList key={uuid()} isOpen={false}>
                                    <div style={{ padding: 10 }}>
                                        <DynamicDataCell value={item[1]} />
                                    </div>
                                </ExpandedList>
                            </div>
                        }
                        label={item[0]}
                    />
                );
            })}
        </div>
    ) : null;
};
