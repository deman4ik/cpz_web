import React from 'react';

import { RobotIcon, ChartLineIcon, HelpIcon } from '../../../../assets/icons/svg';
import { CheckBox } from '../../../basic';
import { color } from '../../../../config/constants';
import { capitalize } from '../../../../config/utils';
import styles from './Notify.module.css';

interface Props {
  item: any;
  idx: number;
}
const components = {
  robot: RobotIcon,
  chartline: ChartLineIcon
};

export const Notify: React.FC<Props> = ({ item, idx }) => {
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
            <CheckBox
              key={`${item.key}.${checkbox.name}`}
              checked={checkbox.isActive}
              label={capitalize(checkbox.name)}
              />

          // <Checkbox
          //   key={`${notification.key}.${checkbox.name}`}
          //   color={vars.color.primary}
          //   uncheckedColor={vars.color.white}
          //   label={t(capitalize(checkbox.name))}
          //   labelStyle={_styles.label}
          //   isActive={checkbox.isActive}
          //   disabled={checkbox.disabled}
          //   isLoading={checkbox.isLoading}
          //   onPress={() => toggleNotification(notification.key, checkbox.name)}
          // />
          ))}
        </div>
      </div>
      <div className={styles.separator} />
    </>
  );
};
