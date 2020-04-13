import React from 'react';
import Spinner from 'react-activity/lib/Spinner';

interface Props {
  style?: object;
  height?: number;
  size?: number;
}

export const LoadingIndicator: React.FC<Props> = ({ style, size }) => (
  <div className='indicator' style={style}>
    <Spinner size={size} speed={1} />
    <style jsx>{`
      .indicator {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
    }`}
    </style>
  </div>
);
