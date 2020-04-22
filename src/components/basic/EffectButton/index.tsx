import React from 'react';
import { ArrowLeftIcon, WindowCloseIcon } from '../../../assets/icons/svg';

interface Props {
  icon?: string;
  onClick?: React.MouseEventHandler;
  color?: string;
}

const components = {
  arrowleft: ArrowLeftIcon,
  windowclose: WindowCloseIcon
};

export const EffectButton: React.FC<Props> = ({ icon, onClick, color = 'white' }) => {
  const SpecificIcon = components[icon];
  return (
    <div className={[ 'btn', 'ripple' ].join(' ')} onClick={onClick}>
      <i className='icon'>
        <SpecificIcon size={22} color={color} />
      </i>
      <style jsx>{`
        .btn {
          display: flex;
          cursor: pointer;
          border-radius: 50%;
          background-color: var(--dark);
          width: 35px;
          height: 35px;
          position: relative;
          user-select: none;
        }
        .icon {
          position: absolute;
          left: 6px;
          top: 7px;
        }
        .ripple {
          background-position: center;
          transition: background 0.8s;
        }
        .ripple:hover {
          background: var(--lightBg) radial-gradient(circle, transparent 1%, var(--lightBg) 1%) center/15000%;
        }
        .ripple:active {
          background-color: var(--primary);
          background-size: 100%;
          transition: background 0s;
        }`}
      </style>
    </div>
  );
};
