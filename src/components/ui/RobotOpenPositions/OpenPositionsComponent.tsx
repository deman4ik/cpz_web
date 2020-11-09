import React, { memo } from "react";

// components
import OpenPositionsTable from "./OpenPositionsTable";
import NothingComponent from "components/common/NothingComponent/";
// helpers
import { exchangeName, formatMoney, getColor, valueWithSign } from "config/utils";
// styles
import styles from "./OpenPositionsComponent.module.css";

interface Props {
    formatData: any;
    displayType: string;
}

const _OpenPositionsComponent: React.FC<Props> = ({ formatData, displayType }) => {
    return (
        <div>
            {!formatData.length ? (
                <div style={{ marginTop: "20px" }}>
                    <NothingComponent
                        beforeButtonKeyWord={displayType}
                        beforeButtonMessage={`${displayType} positions`}
                        buttonSize="normal"
                        buttonStyles={{ width: "200px", margin: "auto" }}
                    />
                </div>
            ) : (
                formatData.map((exchangeGroup, index) => (
                    <div key={exchangeGroup.exchange} style={{ marginTop: (index > 0 && 10) || 0 }}>
                        <h1 className={styles.exchange}>{exchangeName(exchangeGroup.exchange)}</h1>
                        <div>
                            {exchangeGroup.assets.map((asset) => (
                                <>
                                    <div className={styles.assetHeader}>{asset.asset}</div>
                                    <OpenPositionsTable key={asset.asset} displayType={displayType} asset={asset} />
                                </>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export const OpenPositionsComponent = memo(_OpenPositionsComponent);
