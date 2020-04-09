import React, { memo } from 'react';

import { CaptionButton } from '../../basic';
import styles from './index.module.css';

interface Props {
  setVisibleToolbarFilters: () => void;
}

const _StatsPageButtonToolbar: React.FC<Props> = ({ setVisibleToolbarFilters }) => {
  const handleOnPress = () => {
    setVisibleToolbarFilters();
  };

  return (
    <div className={styles.rowContainer}>
      <CaptionButton
        title='filter'
        icon='filtervariant'
        onClick={handleOnPress} />
    </div>
  );
};

export const StatsPageButtonToolbar = memo(_StatsPageButtonToolbar);
