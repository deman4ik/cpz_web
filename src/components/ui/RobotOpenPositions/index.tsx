import NothingComponent from "components/common/NothingComponent";
import { exchangeName, formatMoney, getColor, valueWithSign } from "config/utils";
import React, { memo } from "react";
import OpenPositionsTable from "./OpenPositionsTable";
import styles from "./index.module.css";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";

interface Props {
    type: string;
    data: any;
}

const _RobotOpenPositions: React.FC<Props> = ({ type, data }) => {
    const { width } = useWindowDimensions();
    const { showDimension: desktopSize } = useShowDimension(width, SCREEN_TYPE.DESKTOP);

    const mobile = !desktopSize;

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
                                    <div className={styles.assetHeader}>
                                        {asset.asset}
                                        {mobile && (
                                            <div className={styles.assetHeaderMobileStats}>
                                                <div>
                                                    Amount:&nbsp;
                                                    <span
                                                        className={styles.headerValueSpan}
                                                        style={{
                                                            color: getColor(asset.volume < 0)
                                                        }}>
                                                        {`${valueWithSign(asset.volume)} ${asset.asset}`}
                                                    </span>
                                                </div>
                                                <div>
                                                    Unrealized Profit:&nbsp;
                                                    <span
                                                        className={styles.headerValueSpan}
                                                        style={{
                                                            color: getColor(asset.profit < 0)
                                                        }}>
                                                        {`${valueWithSign(formatMoney(asset.profit))} $`}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <OpenPositionsTable width={width} mobile={mobile} type={type} asset={asset} />
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
