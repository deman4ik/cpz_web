import React, { memo } from 'react';

import { TelegramIcon, InstagramIcon, TwitterIcon } from '../../assets/icons/svg';
import styles from './Footer.module.css';

const _Footer: React.FC = () => (
  <div className={styles.footer}>
    <div className={styles.row}>
      <div className={styles.colLinks}>
        <a href={process.env.TERMS_URL} className={styles.navItem}>
          <div className={styles.footerNavItemLink}>Terms</div>
        </a>
        <a href={process.env.PRIVACY_URL} className={styles.navItem}>
          <div className={styles.footerNavItemLink}>Privacy</div>
        </a>
        <a href={process.env.SUPPORT_URL} className={styles.navItem}>
          <div className={styles.footerNavItemLink}>Support</div>
        </a>
      </div>
      <div className={styles.logoWrapper}>
        <img
          className={styles.logoImg}
          src='/img/logo.png'
          alt='' />
      </div>
      <div className={styles.rights}>
        <div className={styles.social}>
          <a href='https://twitter.com/cryptuoso' target='_blank' rel='noopener noreferrer'>
            <TwitterIcon color='white' />
          </a>
          <a href='https://www.instagram.com/cryptuoso' target='_blank' rel='noopener noreferrer'>
            <InstagramIcon color='white' />
          </a>
          <a href='https://t.me/joinchat/ACVS-0zaWVBgAYm8gOKYHA' target='_blank' rel='noopener noreferrer'>
            <TelegramIcon color='white' />
          </a>
        </div>
        <div className={styles.logoBrand}>
          <div className={styles.logoText}>
            &copy; {new Date().getFullYear()} Cryptuoso
          </div>
          <div className={styles.brandRights}>&reg;</div>
        </div>
      </div>
    </div>
  </div>
);

export const Footer = memo(_Footer);
