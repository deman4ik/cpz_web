import React from 'react';

import { PlusIcon, CheckIcon, LogoutIcon, FilterVariantIcon, SettingsIcon, CloseIcon } from '../../../assets/icons/svg';


interface Props {
  title: string;
  style?: object;
  icon?: string;
  width?: number;
  onClick?: () => void;
  responsive?: boolean;
}

const components = {
  check: CheckIcon,
  plus: PlusIcon,
  logout: LogoutIcon,
  filtervariant: FilterVariantIcon,
  settings: SettingsIcon,
  close: CloseIcon
};

export const CaptionButton: React.FC<Props> = ({ title, style, icon, width, onClick, responsive = true }) => {
  const SpecificIcon = components[icon];
  const getClassName = () => {
    const composeClass = [ 'btn' ];
    return composeClass;
  };

  return (
    <div className={getClassName().join(' ')} style={style} onClick={onClick}>
      <div className='wrapper'>
        <div className='btn-text'>
          {title}
        </div>
        <div className='icon'>
          <SpecificIcon size={15} />
        </div>
      </div>
      <div className='aligner' />
      <style jsx>{`
        .btn-text {
          width: 100%;
          color: white;
          font-size: 14px;
          text-align: center;
          padding-left: 10px;
          padding-right: 10px;
          white-space: nowrap;
          opacity: 1;
          user-select: none;
        }
        .icon {
          padding-right: 8px;
          padding-left: 8px;
          padding-top: 3px;
          position: absolute;
          top: -3px;
          right: -18px;
        }
        .aligner {
          width: 12px;
        }
        .btn {
          display: flex;
          cursor: pointer;
          width: ${width ? `${width}px` : 'min-content'};
          height: 34px;
          padding-left: 12px;
          padding-right: 12px;
          user-select: none;
          align-items: center;
          overflow: hidden;
          border-radius: 4px;
          position: relative;
          opacity: 1;
          background-color: transparent;
          text-transform: uppercase;
        }
        .wrapper {
          position: relative;
          width: 100%;
          opacity: 1;
        }
        .wrapper:active {
          opacity: 0.2;
        }
        @media (max-width: 768px) {
          .btn-text {
            display: ${responsive ? 'none' : 'block'};
          }
        }`}
      </style>
    </div>
  );
};
