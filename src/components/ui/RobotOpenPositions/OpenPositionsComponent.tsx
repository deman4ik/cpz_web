import React, { Fragment, memo, useContext } from "react";
import Router from "next/router";

import { Accordion, RedirectLoginButton } from "components/basic";
import { useShowDimension } from "hooks/useShowDimension";
import { SCREEN_TYPE } from "config/constants";
import { NoRecentData, DummyCards } from "components/common";
import { OpenPositionsHeader } from "./OpenPositionsHeader";
import { OpenPositionsItem } from "./OpenPositionsItem";
import { OpenPositionsItemCard } from "./OpenPositionsItemCard";
import { OpenPositionsLeft } from "./OpenPositionsLeft";
import { OpenPositionsTitle } from "./OpenPositionsTitle";
import { exchangeName } from "config/utils";
import { title } from "./helpers";
import styles from "./OpenPositionsComponent.module.css";
// context
import { AuthContext } from "libs/hoc/authContext";

interface Props {
    formatData: any;
    displayType: string;
    width: number;
}

const cardWidth = 310;
const _OpenPositionsComponent: React.FC<Props> = ({ formatData, displayType, width }) => {
    const {
        authState: { isAuth }
    } = useContext(AuthContext);
    const nothingComponent = isAuth ? (
        <NoRecentData message="No recent data available" />
    ) : (
        <RedirectLoginButton style={{ margin: "15px auto" }} />
    );

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
        <div className={styles.container}>
            <div className={styles.regionTitle}>{title[displayType]}</div>
            {!formatData.length
                ? nothingComponent
                : formatData.map((titleItem) => (
                      <div key={titleItem.exchange} style={{ marginTop: 5 }}>
                          <div>
                              {titleItem.assets.map((asset) => (
                                  <Accordion
                                      key={asset.asset}
                                      title={<OpenPositionsTitle volume={asset.volume} title={asset.asset} />}
                                      left={<OpenPositionsLeft title={exchangeName(titleItem.exchange)} />}>
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
                  ))}
        </div>
    );
};

export const OpenPositionsComponent = memo(_OpenPositionsComponent);
