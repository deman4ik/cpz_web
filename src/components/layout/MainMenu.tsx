import React, { memo } from 'react';

import logoAccent from '../../assets/img/logo-accent.png';

const bigLogo = { width: 72, height: 71 };
const smallLogo = { width: 30, height: 29 };

const _MainMenu: React.FC = () => {
  return (
    <img src={logoAccent} alt='' />
  );
};

export const MainMenu = memo(_MainMenu);
