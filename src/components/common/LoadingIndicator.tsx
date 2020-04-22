import React from 'react';

interface Props {
  style?: object;
  size?: number;
  color?: string;
}

export const LoadingIndicator: React.FC<Props> = ({ style, size = 12, color = 'white' }) => (
  <div className='indicator' style={style}>
    <div className='loader' />
    <style jsx>{`
      .loader {
        width: ${size * 2}px;
        height: ${size * 2}px;
        border: 2px solid;
        color: #727981;
        border-radius: 50%;
        border-top-color: ${color};
        animation: loader 0.7s linear infinite;
      }
      @keyframes loader {
        to {
          transform: rotate(360deg);
        }
      }
      .indicator {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
      }`}
    </style>
  </div>
);
