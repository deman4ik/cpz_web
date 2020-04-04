import React, { memo } from 'react';

import { Button } from '../../basic/Button';
import styles from './RobotsListLoadMore.module.css';

interface Props {
  onFetchMore: () => void;
  isLoadingMore: boolean;
  renderLoadMoreButton: boolean;
}

export const _RobotsListLoadMore: React.FC<Props> = ({ renderLoadMoreButton, isLoadingMore, onFetchMore }) => (
  <>
    {renderLoadMoreButton && (
      <div className={styles.btnPosition}>
        <Button
          width={146}
          title='loadMore'
          type='dimmed'
          icon='arrowdown'
          isUppercase
          isLoading={isLoadingMore}
          onClick={onFetchMore} />
      </div>
    )}
  </>
);

export const RobotsListLoadMore = memo(_RobotsListLoadMore);
