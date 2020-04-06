import React, { memo } from 'react';

import { descriptionRobots, descriptionFirstLine } from '../helpers';
import styles from './DescriptionView.module.css';
import landing_styles from '../index.module.css';
import common_styles from '../../../../config/common.module.css';

const _DescriptionView: React.FC = () => (
  <div className={common_styles.container}>
    <div className={landing_styles.robotsCols}>
      <div className={landing_styles.robotsRow}>
        {descriptionFirstLine.map((item, idx) => (
          <div className={landing_styles.robotsCol} key={idx}>
            <div className={`${styles.icon} ${styles.heightIcon}`}>
              <img style={item.imgStyle} src={`/img/${item.imgSrc}.png`} alt='' />
            </div>
            <div className={styles.title}>{item.title}</div>
            <div className={landing_styles.robotsColText}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
      <div className={landing_styles.robotsRow}>
        {descriptionRobots.map((item, idx) => (
          <div key={idx} className={landing_styles.robotsCol}>
            <div className={`${styles.icon} ${styles.heightMiniIcon}`}>
              <img style={item.imgStyle} src={`/img/robots-icon-${idx + 1}.png`} alt='' />
            </div>
            <div className={styles.title}>{item.title}</div>
            <div className={landing_styles.robotsColText}>
              {item.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const DescriptionView = memo(_DescriptionView);
