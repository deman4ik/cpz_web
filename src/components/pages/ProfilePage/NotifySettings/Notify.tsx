import React from 'react';

import { RobotIcon, ChartLineIcon } from '../../../../assets/icons/svg';
import { color } from '../../../../config/constants';
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
          {/* {renderHelpButton(notification.key)} */}
        </div>
        {item.checkboxes.map(checkbox => (null
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
      <div className={styles.separator} />
    </>
  );
};
