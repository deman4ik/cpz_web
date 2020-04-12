import React, { useState } from 'react';

import { HelpIcon } from '../../../assets/icons/svg';
import { color } from '../../../config/constants';
import { TooltipComponent } from './TooltipComponent';
import styles from './index.module.css';

interface Props {
  message: string;
  direction?: string;
}

export const Tooltip: React.FC<Props> = ({ message, direction }) => {
  const [ hover, setHover ] = useState(false);

  const handleOnMouseEnter = () => {
    setHover(true);
  };

  const handleOnMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      className={styles.hover}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      <HelpIcon color={color.accent} size={24} />
      <TooltipComponent show={hover} message={message} direction={direction} />
    </div>
  );
};
