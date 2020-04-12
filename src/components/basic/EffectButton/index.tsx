import React from 'react';

import { ArrowLeftIcon } from '../../../assets/icons/svg';
import styles from './index.module.css';


interface Props {
  icon?: string;
  onClick?: () => void;
}

const components = {
  arrowleft: ArrowLeftIcon,
};

export const EffectButton: React.FC<Props> = ({ icon, onClick }) => {
  const SpecificIcon = components[icon];
  return (
    <div className={[ styles.btn, styles.ripple ].join(' ')} onClick={onClick}>
      <div className={styles.icon}>
        <SpecificIcon size={22} />
      </div>
    </div>
  );
};
