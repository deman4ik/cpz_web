import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import { SET_MODAL_STATE } from '../../../graphql/local/mutations';
import { MODAL_VISIBLE } from '../../../graphql/local/queries';
import { SCREEN_TYPE } from '../../../config/constants';
import { useShowDimension } from '../../../hooks/useShowDimension';
import { RobotsItem } from '../RobotsItems/RobotsItem';
// import { RobotsItemCard } from '../RobotsItems/RobotsItemCard';
import { RobotsHeader } from '../RobotsItems/RobotsHeader';
// import { useDummyCarts } from '../../../hooks/useDummyCarts';
// import { DummyCards } from '../Common/DummyCards';
//import { RobotsListLoadMore } from './RobotsListLoadMore';
import styles from './index.module.css';
//import { Dimension } from '../../../config/types';

interface Props {
  data: any;
  isLoadingMore: boolean;
  onFetchMore: () => void;
  counts: number;
  width: number;
  displayType: string;
}

const cartWidth = 408;
const SHOW_LIMIT = 12;
export const RobotsList: React.FC<Props> = props => {
  //const { screenType, screenWidth } = props.dimension;
  //const { dummyCards } = useDummyCarts(screenWidth, cartWidth, props.data.length);
  const renderLoadMoreButton = (props.data.length >= SHOW_LIMIT) && props.data.length < props.counts;
  const { showDimension: isDesktopView } = useShowDimension(props.width, SCREEN_TYPE.WIDE);
  //const isDesktopView = screenWidth > 1280;
  const handleRedirectToDetailView = (code: string) => {
    Router.push(`/${props.displayType}/robot/${code}`);
  };

  const [ setSubscride ] = useMutation(SET_MODAL_STATE, {
    refetchQueries: [ { query: MODAL_VISIBLE } ]
  });

  const robotSubscribe = (variables) => {
    setSubscride(variables);
  };

  return (
    <div className={styles.container}>
      <RobotsHeader />
      { props.data.map((item) => (
        <RobotsItem
          key={item.id}
          item={item}
          robotSubscribe={robotSubscribe}
          displayType={props.displayType}
          onRedirectToDetailView={handleRedirectToDetailView} />
      ))}
      {/* {isDesktopView ? (
        <>
          <RobotsHeader />
          { props.data.map((item) => (
            <RobotsItem
              key={item.id}
              item={item}
              robotSubscribe={robotSubscribe}
              displayType={props.displayType}
              onRedirectToDetailView={handleRedirectToDetailView} />
          ))}
        </>
      ) : (
        <View style={styles.containerCart}>
          { props.data.map((item) => (
            <RobotsItemCard
              key={item.id}
              item={item}
              screenType={screenType}
              screenWidth={screenWidth}
              robotSubscribe={robotSubscribe}
              displayType={props.displayType}
              onRedirectToDetailView={handleRedirectToDetailView} />
          ))}
          {DummyCards(dummyCards, cartWidth)}
        </View>
      )}
      <RobotsListLoadMore
        renderLoadMoreButton={renderLoadMoreButton}
        isLoadingMore={props.isLoadingMore}
        isDesktopView={isDesktopView}
        onFetchMore={props.onFetchMore} /> */}
    </div>
  );
};

// RobotsList.defaultProps = {
//   data: [],
// } as Partial<Props>;
