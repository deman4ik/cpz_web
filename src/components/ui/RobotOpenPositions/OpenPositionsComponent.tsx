import React, { Fragment, memo } from 'react';
import Router from 'next/router';

//import { Accordion } from '../../basic';
import { NoRecentData, DummyCards } from '../../common';
// import { OpenPositionsHeader } from './OpenPositionsHeader';
// import { OpenPositionsItem } from './OpenPositionsItem';
// import { OpenPositionsItemCard } from './OpenPositionsItemCard';
// import { OpenPositionsLeft } from './OpenPositionsLeft';
// import { OpenPositionsTitle } from './OpenPositionsTitle';
import { exchangeName } from '../../../config/utils';
import { title } from './helpers';
import styles from './OpenPositionsComponent.module.css';

interface Props {
  formatData: any;
  displayType: string;
  width: number;
}

const cardWidth = 310;
const _OpenPositionsComponent: React.FC<Props> = ({ formatData, displayType, width }) => {
  // const countDummyCards = (dataLength) => {
  //   const cardsInARow = (screenWidth - 200 <= 0) ? 1 : Math.floor((screenWidth - 200) / cardWidth);
  //   const module = dataLength % cardsInARow;
  //   return (module ? cardsInARow - module : 0);
  // };

  const handleRedirectToDetailView = (code: string) => {
    Router.push(`/${displayType}/robot/${code}`);
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div className={styles.regionTitle}>{title[displayType]}</div>
      <NoRecentData message='No recent data available' />
      {/* { !formatData.length
        ? (<NoRecentData message='No recent data available' />)
        : formatData.map(title => (
          <View key={title.exchange} style={{ marginTop: 5 }}>
            <View style={!screenType.maxTablet() && { marginHorizontal: -5 }}>
              { title.assets.map(asset => (
                <Accordion
                  key={asset.asset}
                  title={<OpenPositionsTitle volume={asset.volume} title={asset.asset} />}
                  titleStyle={styles.accordionTitle}
                  screenType={screenType}
                  surfaceStyle={responsive.surfaceStyle(screenType)}
                  left={() => <OpenPositionsLeft title={exchangeName(title.exchange)} />}
              >
                  { !maxDesktop ? (
                    <Fragment key={asset.asset}>
                      <OpenPositionsHeader />
                      { asset.robots.map((item, idx) => (
                        <OpenPositionsItem
                          item={item}
                          key={idx}
                          onRedirectToDetailView={handleRedirectToDetailView} />
                      )) }
                    </Fragment>
                  ) : (
                    <View key={asset.value} style={styles.cardItemsContainer}>
                      { asset.robots.map((item, idx) => (
                        <OpenPositionsItemCard
                          item={item}
                          key={idx}
                          onRedirectToDetailView={handleRedirectToDetailView} />
                      )) }
                      {DummyCards(countDummyCards(asset.robots.length), cardWidth)}
                    </View>
                  )}
                </Accordion>
              )) }
            </View>
          </View>
        )) } */}
    </div>
  );
};

export const OpenPositionsComponent = memo(_OpenPositionsComponent);
