import React from 'react';

import { ButtonType } from './types';
import { CheckIcon, PlusIcon, SettingsIcon, ChevronRightIcon } from '../../../assets/icons/svg';

export interface HoverChangesProps {
  type?: ButtonType;
  title?: string;
  icon?: string;
}

interface Props {
  title?: string;
  icon?: string;
  type?: string;
  style?: object;
  isUppercase?: boolean;
  size?: string;
  width?: number;
  disabled?: boolean;
  onClick?: () => void;
  hoverChanges?: HoverChangesProps;
}

const components = {
  check: CheckIcon,
  plus: PlusIcon,
  settings: SettingsIcon,
  chevronright: ChevronRightIcon
};

export const Button: React.FC<Props> = ({ title, type, style, icon, isUppercase, onClick, width }) => {
  const SpecificIcon = components[icon];
  const getClassName = () => {
    const composeClass = [ 'btn' ];
    if (isUppercase) composeClass.push('uppercase');
    if (type) composeClass.push(type);
    return composeClass;
  };

  return (
    <div className={getClassName().join(' ')} style={style}>
      <div className='btn-text'>
        {title}
      </div>
      <div className='icon'>
        <SpecificIcon size={15} />
      </div>
      <div className='aligner' />
      <style jsx>{`
        .btn-text {
          width: 100%;
          color: white;
          font-size: 12px;
          text-align: center;
          padding-left: 4px;
          padding-right: 4px;
        }
        .icon {
          padding-right: 8px;
          padding-left: 8px;
          padding-top: 3px;
          position: absolute;
          right: 0;
        }
        .aligner {
          width: 20px;
        }
        .btn {
          display: flex;
          cursor: pointer;
          width: ${width ? `${width}px` : 'min-content'};
          height: 26px;
          padding-left: 10px;
          padding-right: 10px;
          user-select: none;
          align-items: center;
          overflow: hidden;
          border-radius: 4px;
          position: relative;
          opacity: 1;
        }
        .btn:active {
          opacity: 0.2;
        }
        .btn.uppercase {
          text-transform: uppercase;
        }
        .btn.success {
          background-image: linear-gradient(rgb(28, 164, 107), rgb(9, 107, 65));
        }
        .btn.primary {
          background-image: linear-gradient(rgb(11, 152, 197), rgb(4, 97, 128));
        }
        .btn.dimmed {
          background-color: rgb(44, 52, 84);
        }
      `}
      </style>
    </div>
  );
};
