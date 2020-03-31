import React, { memo } from 'react';
import Particles from 'react-particles-js';

import BigLogo from '../../../assets/img/big-logo.png';
import styles from './Header.module.css';

interface Props {

}

const primary = '#0B98C5';
const headerHeight = 1080;
const subTitle = 'Just invest –\n robots make the rest';
export const _Header: React.FC<Props> = () => (
  <>
    <div className={styles.headerBgImg}>
      <Particles
        height={`${headerHeight}`}
        params={{
          particles: {
            number: {
              value: false ? 25
                : false ? 50 : 100
            },
            size: { value: 3 },
            color: { value: primary },
            line_linked: { color: primary }
          }
        }}
        />
    </div>
    <div className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerBody}>
          <div className={styles.groupBrand}>
            <div className={styles.brand}>
              <div className={styles.brandName}>
                CRYPTUOSO
              </div>
              <div className={styles.brandRights}>®</div>
            </div>
            <div className={styles.title}>
              Cryptocurrency trading robots for&nbsp;your&nbsp;successful investment
            </div>
            <div className={styles.subTitle}>
              {subTitle}
            </div>
            <div className={styles.headerGroupBtn}>
              <button type='button' className={`${styles.headerBtn} ${styles.btnLeft}`}>TRY IT FREE</button>
              <button type='button' className={`${styles.headerBtn} ${styles.btnRight}`}>DOCUMENTATION</button>
            </div>
          </div>
          <div className={styles.logoWrapper}>
            <img
              className={styles.bigLogo}
              src={BigLogo}
              alt='' />
          </div>
        </div>
      </div>
    </div>
  </>
);

export const Header = memo(_Header);
