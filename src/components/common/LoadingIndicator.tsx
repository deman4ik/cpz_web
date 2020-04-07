import React from 'react';
import Spinner from 'react-activity/lib/Spinner';

interface Props {
  style?: object;
  height?: number;
}

export const LoadingIndicator: React.FC<Props> = ({ style, height }) => (
  <div className='indicator' style={style}>
    <Spinner />
    <style jsx>{`
      .indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        height: ${height ? `${height}px` : '100vh'};
      }`}
    </style>
  </div>
);
