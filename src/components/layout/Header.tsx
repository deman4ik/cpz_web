/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { memo } from 'react';
import Link from 'next/link';

import { getAccessToken } from '../../libs/accessToken';
//import { useLogoutProcess } from '../../hooks/useLogoutProcess';
import { linksHeader, authHeader } from './helpers';
import styles from './Header.module.css';

interface Props {
  hasHomeButton?: boolean;
}

const _Header: React.FC<Props> = ({ hasHomeButton }) => {
  const { token } = getAccessToken();
  const handleOnClick = () => {
    console.log('click');
  };
  //const { logoutProcess } = useLogoutProcess();
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        {hasHomeButton && (
          <div className={styles.btnWrapper}>
            <div className={styles.btnTitle}>Cryptuoso</div>
          </div>
        )}
        {!!token && (
        <>
          {linksHeader.map((item, idx) => (
            <div key={idx} className={styles.btnWrapper}>
              <Link href={item.href} replace>
                <a className={styles.btnTitle}>{item.title}</a>
              </Link>
            </div>
          ))}
        </>
        )}
      </div>
      <div className={styles.rightContainer}>
        {token ? (
          <div className={styles.btnWrapper}>
            <div className={styles.btnTitle} onClick={handleOnClick}>Log out</div>
          </div>
        ) : (
          <>
            {authHeader.map((item, idx) => (
              <div key={idx} className={styles.btnWrapper}>
                <Link href={item.href} replace>
                  <a className={styles.btnTitle}>{item.title}</a>
                </Link>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export const Header = memo(_Header);
