import React, { memo } from 'react';
import { CaptionButton } from '../../basic';

interface Props {
  setVisibleToolbarFilters: () => void;
}

const _StatsPageButtonToolbar: React.FC<Props> = ({ setVisibleToolbarFilters }) => (
  <div className='toolbar'>
      <CaptionButton title='filter' icon='filtervariant' onClick={setVisibleToolbarFilters} />
    </div>
);

export const StatsPageButtonToolbar = memo(_StatsPageButtonToolbar);
