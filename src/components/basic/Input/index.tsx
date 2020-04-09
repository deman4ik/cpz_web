/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState } from 'react';

import { Button } from '../Button';

interface Props {
  value: string;
  icon?: string;
  placeholder?: string;
  buttonTitle?: string;
  maxLength?: number;
  type?: string;
  onChangeText?: (value) => void;
  onKeyPress?: (e: any) => void;
  onClickButton?: () => void;
  width?: number;
  responsive?: boolean;
  error?: boolean;
  selectTextOnFocus?: boolean;
  readonly?: boolean;
}

export const Input: React.FC<Props> =
({ value, icon, placeholder, buttonTitle, type = 'text', onChangeText, onClickButton,
  onKeyPress, width = 350, error, selectTextOnFocus, responsive, readonly, maxLength = 30 }) => {
  const [ inputValue, setInputValue ] = useState(value);
  const handleOnChange = (e) => {
    if (onChangeText) {
      onChangeText(e.target.value);
    }
    setInputValue(e.target.value);
  };

  const handleOnInput = (e) => {
    if (type === 'number') {
      e.target.value = Math.max(0, Number(e.target.value)).toString().slice(0, 8);
    }
  };

  const getInputClass = () => {
    const style = [ 'searchInput' ];
    if (error) style.push('error');
    return style;
  };

  return (
    <div className='wrapper'>
      <div className='container'>
        { icon ? (
          <div className='icon'>
            <Button
              title={buttonTitle || 'Change'}
              type='dimmed'
              size='small'
              onClick={onClickButton}
              responsive
              icon={icon} />
          </div>
        ) : null}
        <input
          type={type}
          className={getInputClass().join(' ')}
          placeholder={placeholder}
          maxLength={maxLength}
          autoFocus
          readOnly={readonly}
          onInput={handleOnInput}
          onChange={handleOnChange}
          onKeyDown={onKeyPress}
          value={inputValue} />
      </div>
      <style jsx>{`
        .wrapper {
          width: ${width}px;
        }
        
        .container {
          display: flex;
          flex-direction: column;
          position: relative;
          flex: 1; 
        }
        
        .searchInput {
          background-color: var(--darkBg);
          color: var(--accent);
          border-radius: 2px;
          padding: 11px;
          padding-right: ${icon ? '35px' : '11px'};
        }
        
        .searchInput.error {
          box-shadow: 0px 0px 0px 2px var(--negative);
        }

        .icon {
          position: absolute;
          right: 5px;
          top: 6px;
        }
        
        .searchInput::-webkit-input-placeholder,
        .searchInput::placeholder {
          color: var(--accent);
        }
        
        .searchInput::-webkit-inner-spin-button {
          display: none;
        }
        
        @media (max-width: 480px) {
          .wrapper {
            width: ${responsive ? (width / 100) * 14 : width}px;
          }
        }
      `}
      </style>
    </div>
  );
};
