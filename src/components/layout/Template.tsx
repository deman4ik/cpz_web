import React, { useEffect, useState } from 'react';
import { PageHead, MainMenu, NavBar } from '.';

import { PageType } from '../../config/types';
import { SCREEN_TYPE } from '../../config/constants';
import useWindowDimensions from '../hooks/useWindowDimensions';
import styles from './Template.module.css';

interface Props {
  title?: string;
  subTitle?: string;
  page?: PageType;
}

export const Template: React.FC<Props> = ({ title, subTitle, children, page }) => {
  const [ showDesktop, setShowDesktop ] = useState(false);
  const { width } = useWindowDimensions();
  useEffect(() => {
    setShowDesktop(width > SCREEN_TYPE.PHONE);
  }, [ width ]);
  return (
    <div className={styles.container}>
      <PageHead
        title={`${title}${subTitle ? `: ${subTitle}` : ''}`} />
      <div className={styles.mainMenuContainer}>
        <MainMenu activeTab={page} showDesktop={showDesktop} />
        <div className={styles.wrapFixed}>
          <NavBar
            title={title}
            subTitle={subTitle} />
        </div>
      </div>
      <div className={styles.mainContainer}>
        {children}
      </div>
    </div>
  );
};
