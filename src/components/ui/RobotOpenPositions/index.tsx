import NothingComponent from "components/common/NothingComponent";
import { exchangeName, formatMoney, getColor, getColorForMoney, valueWithSign } from "config/utils";
import React, { memo } from "react";
import OpenPositionsTable from "./OpenPositionsTable";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import styles from "./index.module.css";
import tableStyles from "./OpenPositionsTable.module.css";

interface Props {
    type: string;
    data: any;
}

const _RobotOpenPositions: React.FC<Props> = ({ type, data }) => {
    const { width } = useWindowDimensions();
    const { showDimension: desktopSize } = useShowDimension(width, SCREEN_TYPE.DESKTOP);

    const mobile = !desktopSize;

    return (
        <div className={styles.itemCardWrapper}>
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
                        <div
                            className={mobile ? styles.exchangeContainerMobile : tableStyles.tableGridRow}
                            style={{ padding: "0 20px" }}>
                            <div className={styles.exchange}>{exchangeName(exchangeGroup.exchange)}&nbsp;</div>

                            <span
                                className={styles.exchange}
                                style={{
                                    color: "var(--accent)",
                                    fontSize: "var(--normal1)",
                                    gridColumnStart: 4
                                }}>
                                Unrealized Profit:&nbsp;
                                <span
                                    style={{
                                        color: getColorForMoney(exchangeGroup.profit)
                                    }}>{`${valueWithSign(formatMoney(exchangeGroup.profit))} $`}</span>
                            </span>
                        </div>
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
                                                            color: getColor(asset.volume <= 0)
                                                        }}>
                                                        {`${valueWithSign(asset.volume)} ${asset.asset}`}
                                                    </span>
                                                </div>
                                                <div>
                                                    Unrealized Profit:&nbsp;
                                                    <span
                                                        className={styles.headerValueSpan}
                                                        style={{
                                                            color: getColorForMoney(asset.profit)
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
