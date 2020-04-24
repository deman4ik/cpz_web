import React from 'react';

import { MenuDownIcon } from '../../../assets/icons/svg';
import { color } from '../../../config/constants';
import styles from './Step.module.css';

interface Props {
  step: string;
  idx?: number;
  activeStep: number;
  steps: string[];
  titleWidth: number;
  showDimension: boolean;
}

export const Step: React.FC<Props> = ({ step, idx = null, activeStep, steps, titleWidth, showDimension }) => {
  const isActiveCheck = idx === null || activeStep - 1 >= idx;
  const isActiveTitle = idx === null || activeStep - 1 === idx;
  const isActivePrevLine = idx <= activeStep - 1;
  const isActiveNextLine = steps[idx + 1] && idx + 1 <= activeStep - 1;
  const isEmptyNextLine = (idx === null && !steps[activeStep]) || (idx !== null && idx === steps.length - 1);

  return (
    <>
      {(idx === null || idx > 0) && (
        <div className={styles.line} style={{ backgroundColor: isActivePrevLine && color.primary }} />
      )}
      <div className={styles.circle} style={{ backgroundColor: isActiveCheck && color.primary }}>
        <div className={styles.circleNumber}>{showDimension ? idx + 1 : activeStep}</div>
        <div
          className={styles.circleTitle}
          style={{ width: titleWidth, marginLeft: -(titleWidth / 2), backgroundColor: isActiveTitle && color.primary }}>
          <div className={styles.circleText}>{step}</div>
          {isActiveTitle && (
            <div className={styles.arrow}>
              <MenuDownIcon color={color.primary} size={40} />
            </div>
          )}
        </div>
      </div>
      {(idx === null || steps[idx + 1]) && (
        <div
          className={styles.line}
          style={{ backgroundColor: isEmptyNextLine ? 'transparent' : isActiveNextLine && color.primary }} />
      )}
    </>
  );
};
