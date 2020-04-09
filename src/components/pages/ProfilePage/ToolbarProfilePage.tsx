import React, { memo } from 'react';

import { useLogoutProcess } from '../../../hooks/useLogoutProcess';
import { CaptionButton } from '../../basic';
import styles from '../../../config/common.module.css';

const _ToolbarProfilePage: React.FC = () => {
  const { logoutProcess } = useLogoutProcess();

  return (
    <div className={styles.toolbar}>
      <CaptionButton
        title='Log out'
        icon='logout'
        onClick={logoutProcess} />
    </div>
  );
};

export const ToolbarProfilePage = memo(_ToolbarProfilePage);