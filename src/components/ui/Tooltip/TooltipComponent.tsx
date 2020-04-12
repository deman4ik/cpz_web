import React from 'react';
import styles from './TooltipComponent.module.css';

interface Props {
  show: boolean;
  message: string;
  direction: string;
}

export const TooltipComponent: React.FC<Props> = ({ show, message, direction }) => (
  <div className='tooltip' style={{ visibility: show ? 'visible' : 'hidden' }}>
    <div className='text'>{message}</div>
    <style jsx>{`
      .tooltip {
        display: flex;
        position: absolute;
        flex-direction: row;
        margin-left: 10px;
        margin-right: 10px;
        background-color: var(--lightBg);
        padding: 15px 20px;
        box-shadow: var(--shadow);
        ${direction === 'down' ? 'top' : 'bottom'}: 30px;
        right: -200px;
        width: 400px;
        height: auto;
        overflow: hidden;
        z-index: 103;
      }
      .text {
        font-size: var(--normal1);
        color: white;
      }
    `}
    </style>
  </div>
);
