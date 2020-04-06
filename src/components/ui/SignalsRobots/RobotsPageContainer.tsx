import React from 'react';
import Router from 'next/router';
import { useMutation } from '@apollo/react-hooks';

import { SET_MODAL_STATE } from '../../../graphql/local/mutations';
import { MODAL_VISIBLE } from '../../../graphql/local/queries';
import { RobotsItem } from '../RobotsItems/RobotsItem';
import { RobotsItemCard } from '../RobotsItems/RobotsItemCard';
import { SignalRobotsAddSignals } from './SignalRobotsAddSignals';
import { SignalRobotsAddSignalsCard } from './SignalRobotsAddSignalsCard';
import { RobotsHeader } from '../RobotsItems/RobotsHeader';
import styles from './index.module.css';
import { useDummyCarts } from '../../../hooks/useDummyCarts';
import { DummyCards } from '../../common';

interface Props {
  data: any;
  width: number;
  displayType: string;
}

const cartWidth = 408;
export const RobotsPageContainer: React.FC<Props> = ({ data, width, displayType }) => {
  const { dummyCards } = useDummyCarts(width, cartWidth, data.length + 1);
  const handleRedirectToDetailView = (code: string) => {
    Router.push(`/${displayType}/robot/${code}`);
  };

  const [ setSubscride ] = useMutation(SET_MODAL_STATE, {
    refetchQueries: [ { query: MODAL_VISIBLE } ]
  });

  const robotSubscribe = (variables) => {
    setSubscride(variables);
  };

  return (
    <>
      { screenWidth > 1280 ? (
        <div className={styles.container}>
          <RobotsHeader />
          { data.map((item) => (
            <RobotsItem
              key={item.id}
              item={item}
              robotSubscribe={robotSubscribe}
              displayType={displayType}
              onRedirectToDetailView={handleRedirectToDetailView} />
          ))}
          <SignalRobotsAddSignals displayType={displayType} />
        </div>
      ) : (
        // <div className={styles.containerCard}>
        //   { data.map((item) => (
        //     <RobotsItemCard
        //       key={item.id}
        //       item={item}
        //       robotSubscribe={robotSubscribe}
        //       displayType={displayType}
        //       onRedirectToDetailView={handleRedirectToDetailView} />
        //   ))}
        //   <SignalRobotsAddSignalsCard displayType={displayType} />
        //   {DummyCards(dummyCards, cartWidth)}
        // </div>
      )}
    </>
  );
};
