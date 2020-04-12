import React from 'react';
import Spinner from 'react-activity/lib/Spinner';

interface Props {
  style?: object;
  height?: number;
  size?: number;
}

export const LoadingIndicator: React.FC<Props> = ({ style, size }) => {
  return (
    <div className='indicator' style={style}>
      <Spinner size={size} />
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
};
