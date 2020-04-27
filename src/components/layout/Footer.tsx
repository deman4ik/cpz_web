import React, { memo } from 'react';

import { event } from '../../libs/gtag';
import { footerLinks, footerIcons, specificIcon } from './helpers';
import styles from './Footer.module.css';

const getSpecificIcon = (icon: string) => {
  const SpecificIcon = specificIcon[icon];
  return <SpecificIcon color='white' />;
};

const _Footer: React.FC = () => {
  const hahdleOnClick = (href: string) => {
    event({
      action: 'click',
      category: 'Landing',
      label: 'conversion',
      value: href
    });
  };

  return (
    <div className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.colLinks}>
          { footerLinks.map(item => (
            <a
              key={item.name}
              href={item.href}
              className={styles.navItem}
              onClick={() => hahdleOnClick(item.href)}
            >
              <span className={styles.navItemText}>{item.name}</span>
            </a>
          )) }
        </div>
        <div className={styles.logoWrapper}>
          <img
            className={styles.logoImg}
            src='/img/logo.png'
            alt='' />
        </div>
        <div className={styles.rights}>
          <div className={styles.social}>
            { footerIcons.map(item => (
              <a
                key={item.icon}
                href={item.href}
                className={styles.linkWrapper}
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => hahdleOnClick(item.href)}
              >
                {getSpecificIcon(item.icon)}
              </a>
            )) }
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
};

export const Footer = memo(_Footer);
