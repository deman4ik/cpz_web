import React, { memo } from 'react';

import Robots from '../../../../assets/img/robots.png';
import Signals from '../../../../assets/img/signals.png';

import { descriptionRobots } from '../helpers';
import styles from './DescriptionView.module.css';
import landing_styles from '../index.module.css';
import common_styles from '../../../../config/common.module.css';

const _DescriptionView: React.FC = () => (
  <div className={common_styles.container}>
    <div className={landing_styles.robotsCols}>
      <div className={landing_styles.robotsRow}>
        <div className={landing_styles.robotsCol}>
          <div className={`${styles.icon} ${styles.heightIcon}`}>
            <img style={{ width: 250, height: 120 }} src={Signals} alt='' />
          </div>
          <div className={styles.title}>Receive Signals</div>
          <div className={landing_styles.robotsColText}>
            Use robot signals as indicators in your trading and make your
            trades manually. You will be able to view the approximate
            statistics of your trade with signals in your account.
          </div>
        </div>
        <div className={landing_styles.robotsCol}>
          <div className={`${styles.icon} ${styles.heightIcon}`}>
            <img style={{ width: 250, height: 120 }} src={Robots} alt='' />
          </div>
          <div className={styles.title}>Automatic Trading</div>
          <div className={landing_styles.robotsColText}>
            Attach you cryptocurrency exchange account (Binance, Bitfinex,
            Kraken) to our robots for automatic trading. Robots automatically
            execute all deals for you, so you only need to keep track of the
            current positions and your trading performance.
          </div>
        </div>
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
