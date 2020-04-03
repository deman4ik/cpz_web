import React from 'react';
import { VictoryArea, VictoryContainer } from 'victory';

import styles from './index.module.css';

interface AreaChartProps {
  data: any; // Todo any
  height: number;
  positive: boolean;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, height, positive }) => {
  const randomId = Math.random();
  const arrX = data.map(d => d.x);
  const arrY = data.map(d => d.y);
  const coordsX = [ Math.min(...arrX), Math.max(...arrX) ];
  const coordsY = [ Math.min(...arrY), Math.max(...arrY) ];
  let domain;

  if (data.length <= 1) {
    domain = null;
  } else if (coordsY[0] === coordsY[1]) {
    domain = {
      x: coordsX,
      y: [ coordsY[0] - 1, coordsY[1] + 1 ]
    };
  } else {
    domain = {
      x: coordsX,
      y: coordsY
    };
  }

  return (
    <div className={styles.container}>
      <svg style={{ height: 0, width: 0 }}>
        <defs>
          <linearGradient id={`gradient-${randomId}`} x1='0%' y1='0%' x2='0%' y2='100%'>
            <stop
              offset='0%'
              stopColor={positive ? '#69DACD' : '#CD3E60'}
              stopOpacity={0.6}
            />
            <stop
              offset='60%'
              stopColor={positive ? '#69DACD' : '#CD3E60'}
              stopOpacity={0.25}
            />
            <stop
              offset='100%'
              stopColor='#141E46'
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
      </svg>
      <VictoryArea
        domain={domain}
        height={height}
        padding={0}
        data={data}
        standalone
        style={{
          data: {
            stroke: positive ? '#69DACD' : '#CD3E60',
            fill: 'transparent',
            strokeWidth: 5
          }
        }}
      />
      <VictoryArea
        domain={domain}
        containerComponent={<VictoryContainer style={{ position: 'absolute' }} />}
        height={height}
        padding={0}
        data={data}
        style={{
          data: {
            stroke: 'transparent',
            fill: `url(#gradient-${randomId})`,
            strokeWidth: 5
          }
        }}
      />
    </div>
  );
};

export default AreaChart;
