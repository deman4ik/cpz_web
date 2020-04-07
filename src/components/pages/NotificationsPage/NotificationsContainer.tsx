import React from 'react';
import Router from 'next/router';

// import { NotificationsItem } from './NotificationsItem';
// import { NotificationsItemCard } from './NotificationsItemCard';
import { Button } from '../../basic';

interface Props {
  formatData: any;
  handleLoadMore: () => void;
  isLoadingMore: boolean;
  recordsCount: number;
  width: number;
}

export const NotificationsContainer: React.FC<Props> =
({ formatData, handleLoadMore, isLoadingMore, recordsCount, width }) => {
  //const maxTablet = screenWidth < 760;
  const routeNotification = (action: { link: string; redirect: boolean }) => {
    if (action.redirect) {
      window.location.assign(action.link);
    } else {
      Router.push(action.link);
    }
  };

  return (<div />
    // <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
    //   <View style={styles.topCards}>
    //     {maxTablet ? (
    //       <View style={styles.topCardsContainer}>
    //         {formatData.map((item, idx) => (
    //           <NotificationsItemCard
    //             key={`${item.id}_${idx}`}
    //             item={item}
    //             screenWidth={screenWidth}
    //             routeNotification={routeNotification} />
    //         ))}
    //       </View>
    //     ) : (
    //       <Surface style={common.accordionSurface} theme={{ roundness: 0 }}>
    //         {formatData.map((item, idx) => (
    //           <NotificationsItem
    //             key={`${item.id}_${idx}`}
    //             item={item}
    //             routeNotification={routeNotification} />
    //         ))}
    //       </Surface>
    //     )}
    //     { recordsCount > formatData.length ? (
    //       <View style={styles.loadMore}>
    //         <Button
    //           width={146}
    //           title={t('Load More')}
    //           type='dimmed'
    //           icon='arrow-down'
    //           isUppercase
    //           isLoading={isLoadingMore}
    //           onPress={handleLoadMore} />
    //       </View>
    //     ) : null}
    //   </View>
    // </View>
  );
};
