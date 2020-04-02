import React, { memo } from 'react';
import Particles from 'react-particles-js';

import BigLogo from '../../../assets/img/big-logo.png';
import { PrimaryButton } from '../../basic';
import styles from './Hat.module.css';
import { Header } from '../../layout';

const primary = '#0B98C5';
const headerHeight = 1080;
const subTitle = 'Just invest –\n robots make the rest';
export const _Hat: React.FC = () => (
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
        <Header />
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
              <PrimaryButton title='TRY IT FREE' type='secondary' style={styles.headerBtn} />
              <PrimaryButton title='DOCUMENTATION' type='primary' style={styles.headerBtn} />
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

export const Hat = memo(_Hat);
