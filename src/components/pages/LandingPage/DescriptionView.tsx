import React, { memo } from 'react';

import Robots from '../../../assets/img/robots.png';
import Signals from '../../../assets/img/signals.png';
import RobotsIcon1 from '../../../assets/img/robots-icon-1.png';
import RobotsIcon2 from '../../../assets/img/robots-icon-2.png';
import RobotsIcon3 from '../../../assets/img/robots-icon-3.png';
import RobotsIcon4 from '../../../assets/img/robots-icon-4.png';

import styles from './DescriptionView.module.css';
import landing_styles from './index.module.css';
import common_styles from '../../../config/common.module.css';

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
        <div className={landing_styles.robotsCol}>
          <div className={`${styles.icon} ${styles.heightMiniIcon}`}>
            <img style={{ width: 52, height: 52 }} src={RobotsIcon1} alt='' />
          </div>
          <div className={styles.title}>Automatic</div>
          <div className={landing_styles.robotsColText}>
            All robots work in the cloud in 24/7 mode and do not require
            installation software on your computer. Thus, signals and
            transactions will not be missed and you can monitor trading with
            any device.
          </div>
        </div>
        <div className={landing_styles.robotsCol}>
          <div className={`${styles.icon} ${styles.heightMiniIcon}`}>
            <img style={{ width: 72, height: 48 }} src={RobotsIcon2} alt='' />
          </div>
          <div className={styles.title}>Instant</div>
          <div className={landing_styles.robotsColText}>
            Cryptocurrency markets are very volatile and often require
            immediate decision making. The robot instantly reacts to market
            fluctuations and uses both stop loss and market orders according
            to algorithms to minimize drawdown.
          </div>
        </div>
        <div className={landing_styles.robotsCol}>
          <div className={`${styles.icon} ${styles.heightMiniIcon}`}>
            <img style={{ width: 50, height: 52 }} src={RobotsIcon3} alt='' />
          </div>
          <div className={styles.title}>Secure</div>
          <div className={landing_styles.robotsColText}>
            The robots use customizable API exchange keys, which only allow
            make deals but not manage your account. We store your keys in
            secure encrypted storage.
          </div>
        </div>
        <div className={landing_styles.robotsCol}>
          <div className={`${styles.icon} ${styles.heightMiniIcon}`}>
            <img style={{ width: 49, height: 52 }} src={RobotsIcon4} alt='' />
          </div>
          <div className={styles.title}>Simple</div>
          <div className={landing_styles.robotsColText}>
            Just add your exchange account and subscribe to robots for
            transactions. Complete a few steps and you&apos;re done.
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const DescriptionView = memo(_DescriptionView);
