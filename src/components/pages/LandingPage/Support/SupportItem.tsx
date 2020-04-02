import React from 'react';

import { AlarmIcon, HelpIcon, TelegramIcon } from '../../../../assets/icons/svg';
import { PrimaryButton } from '../../../basic';
import { SupportItemType } from '../types';
import styles from './SupportItem.module.css';

interface Props {
  item: SupportItemType;
}

const components = {
  robot: AlarmIcon,
  help: HelpIcon,
  telegram: TelegramIcon
};

export const SupportItem: React.FC<Props> = ({ item }) => {
  const SpecificIcon = components[item.icon];
  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.colBody}>
          <SpecificIcon color={item.iconColor} />
          <div className={styles.colTitle}>
            {item.title}
          </div>
          <div className={styles.colText}>
            {item.text}
          </div>
        </div>
        <div className={styles.colFooter}>
          <PrimaryButton
            style={styles.headerBtn}
            title={item.button}
            type={item.buttonType}
          />
        </div>
      </div>
    </div>
  );
};
