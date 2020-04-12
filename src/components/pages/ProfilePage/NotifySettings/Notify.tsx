import React from 'react';

import { RobotIcon, ChartLineIcon, HelpIcon } from '../../../../assets/icons/svg';
import { CheckBox } from '../../../basic';
import { color } from '../../../../config/constants';
import { capitalize } from '../../../../config/utils';
import styles from './Notify.module.css';

interface Props {
  item: any;
  isLast: boolean;
  toggleNotification: (key: string, name: string) => void;
}
const components = {
  robot: RobotIcon,
  chartline: ChartLineIcon
};

export const Notify: React.FC<Props> = ({ item, toggleNotification, isLast }) => {
  const SpecificIcon = components[item.icon];
  return (
    <>
      <div className={styles.column}>
        <div className={styles.titleRow}>
          <SpecificIcon color={color.accent} size={24} />
          <div className={styles.titleText}>
            {item.title}
          </div>
          <HelpIcon color={color.accent} size={24} />
          {/* {renderHelpButton(notification.key)} */}
        </div>
        <div className={styles.checkboxGroup}>
          {item.checkboxes.map(checkbox => (
            <div className={styles.checkBoxWrapper} key={`${item.key}.${checkbox.name}`}>
              <CheckBox
                checked={checkbox.isActive}
                onClick={() => toggleNotification(item.key, checkbox.name)}
                label={capitalize(checkbox.name)}
                disabled={checkbox.disabled} />
            </div>
          ))}
        </div>
      </div>
      { !isLast ? <div className={styles.separator} /> : null }
    </>
  );
};
