import NothingComponent from "components/common/NothingComponent";
import { exchangeName } from "config/utils";
import React, { memo } from "react";
import OpenPositionsTable from "./OpenPositionsTable";
import styles from "./index.module.css";

interface Props {
    type: string;
    data: any;
}

const _RobotOpenPositions: React.FC<Props> = ({ type, data }) => {
    return (
        <div>
            {!data.length ? (
                <div style={{ marginTop: "20px" }}>
                    <NothingComponent
                        beforeButtonKeyWord={type}
                        beforeButtonMessage={`${type} positions`}
                        buttonSize="normal"
                        buttonStyles={{ width: "200px", margin: "auto" }}
                    />
                </div>
            ) : (
                data.map((exchangeGroup, index) => (
                    <div key={exchangeGroup.exchange} style={{ marginTop: (index > 0 && 10) || 0 }}>
                        <h1 className={styles.exchange}>{exchangeName(exchangeGroup.exchange)}</h1>
                        <div>
                            {exchangeGroup.assets.map((asset) => (
                                <div key={asset.asset}>
                                    <div className={styles.assetHeader}>{asset.asset}</div>
                                    <OpenPositionsTable type={type} asset={asset} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default memo(_RobotOpenPositions);
