import React from 'react';
import Particles from 'react-particles-js';

import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import styles from './index.module.css';

const primary = '#0B98C5';
const DinamicImage: React.FC = () => {
  const { width, height } = useWindowDimensions();
  return (
    <div className={styles.headerBgImg}>
      <Particles
        height={`${height}`}
        params={{
          particles: {
            number: {
              value: width <= 768 ? 25
                : width <= 992 ? 50 : 100
            },
            size: { value: 3 },
            color: { value: primary },
            line_linked: { color: primary }
          }
        }} />
    </div>
  );
};

export default DinamicImage;
