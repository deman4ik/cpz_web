import React from 'react';
import Particles from 'react-particles-js';

import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import styles from './index.module.css';
import { color } from '../../../../config/constants';

const DinamicImage: React.FC = () => {
  const { width, height } = useWindowDimensions();

  return (
    <div className={styles.headerBgImg}>
      <Particles
        height={`${height}px`}
        params={{
          particles: {
            number: {
              value: width <= 768 ? 25
                : width <= 992 ? 50 : 100
            },
            size: { value: 3 },
            color: { value: color.primary },
            line_linked: { color: color.primary }
          }
        }} />
    </div>
  );
};

export default DinamicImage;
