import React, { memo } from 'react';

import { Button } from '../../basic/Button';
import styles from './index.module.css';

interface Props {
  onFetchMore: () => void;
  isLoadingMore: boolean;
  renderLoadMoreButton: boolean;
}

export const _RobotsLoadMore: React.FC<Props> = ({ renderLoadMoreButton, isLoadingMore, onFetchMore }) => (
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

export const RobotsLoadMore = memo(_RobotsLoadMore);
