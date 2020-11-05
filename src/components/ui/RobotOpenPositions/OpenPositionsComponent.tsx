import React, { Fragment, memo } from "react";
import Router from "next/router";

// components
import { Accordion } from "components/basic";
import { DummyCards } from "components/common";
import { OpenPositionsHeader } from "./OpenPositionsHeader";
import { OpenPositionsItem } from "./OpenPositionsItem";
import { OpenPositionsItemCard } from "./OpenPositionsItemCard";
import { OpenPositionsTitle } from "./OpenPositionsTitle";
import { OpenPositionsSubtitle } from "./OpenPositionsSubtitle";
import NothingComponent from "components/common/NothingComponent/";
// hooks
import { useShowDimension } from "hooks/useShowDimension";
// constants
import { SCREEN_TYPE } from "config/constants";
// helpers
import { exchangeName } from "config/utils";
// styles
import styles from "./OpenPositionsComponent.module.css";

interface Props {
    formatData: any;
    displayType: string;
    width: number;
}

const cardWidth = 310;
const _OpenPositionsComponent: React.FC<Props> = ({ formatData, displayType, width }) => {
    const { showDimension: isDesktopView } = useShowDimension(width, SCREEN_TYPE.WIDE);
    const countDummyCards = (dataLength) => {
        const cardsInARow = width - 200 <= 0 ? 1 : Math.floor((width - 200) / cardWidth);
        const module = dataLength % cardsInARow;
        return module ? cardsInARow - module : 0;
    };

    const handleRedirectToDetailView = (code: string) => {
        Router.push(`/${displayType}/robot/${code}`);
    };

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
                formatData.map((titleItem, index) => (
                    <div key={titleItem.exchange} style={{ marginTop: (index > 0 && 10) || 0 }}>
                        <div>
                            {titleItem.assets.map((asset) => (
                                <Accordion
                                    key={asset.asset}
                                    title={<OpenPositionsTitle title={exchangeName(titleItem.exchange)} />}
                                    subtitle={
                                        <OpenPositionsSubtitle
                                            volume={asset.volume}
                                            profit={asset.profit}
                                            asset={asset.asset}
                                        />
                                    }
                                    isOpen>
                                    {isDesktopView ? (
                                        <Fragment key={asset.asset}>
                                            <OpenPositionsHeader />
                                            {asset.robots.map((item, idx) => (
                                                <OpenPositionsItem
                                                    item={item}
                                                    key={idx}
                                                    onRedirectToDetailView={handleRedirectToDetailView}
                                                />
                                            ))}
                                        </Fragment>
                                    ) : (
                                        <div key={asset.value} className={styles.cardItemsContainer}>
                                            {asset.robots.map((item, idx) => (
                                                <OpenPositionsItemCard
                                                    item={item}
                                                    key={idx}
                                                    onRedirectToDetailView={handleRedirectToDetailView}
                                                />
                                            ))}
                                            {DummyCards(countDummyCards(asset.robots.length), cardWidth)}
                                        </div>
                                    )}
                                </Accordion>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export const OpenPositionsComponent = memo(_OpenPositionsComponent);
