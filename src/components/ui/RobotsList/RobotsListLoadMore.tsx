import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { WithTranslation, withTranslation } from 'react-i18next';

import { Button } from '../../basic/Button';
import { responsive } from './RobotsListLoadMore.style';

interface Props extends PropsWithChildren<WithTranslation> {
  onFetchMore: () => void;
  isLoadingMore: boolean;
  renderLoadMoreButton: boolean;
  isDesktopView: boolean;
}

export const _RobotsListLoadMore: React.FC<Props> = ({ t, renderLoadMoreButton, isLoadingMore, isDesktopView, onFetchMore }) => (
  <>
    {renderLoadMoreButton && (
      <View style={responsive.btnPosition(isDesktopView)}>
        <Button
          width={146}
          title={t('loadMore')}
          type='dimmed'
          icon='arrow-down'
          isUppercase
          isLoading={isLoadingMore}
          onPress={onFetchMore}
        />
      </View>
    )}
  </>
);

export const RobotsListLoadMore = withTranslation()(_RobotsListLoadMore);
