/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';

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
  style?: object;
}

export const Input: React.FC<Props> =
({ value, icon, placeholder, buttonTitle, type = 'text', onChangeText, onClickButton, style,
  onKeyPress, width = 350, error, selectTextOnFocus, responsive, readonly, maxLength = 30 }) => {
  const [ inputValue, setInputValue ] = useState(value);
  const handleOnInput = (e) => {
    if (type === 'number') {
      e.target.value = e.target.value.toString().slice(0, 8);
    }
    if (onChangeText) {
      onChangeText(e.target.value);
    }
    setInputValue(e.target.value);
  };

  const formatInput = (e) => {
    if (type === 'number') {
      if (e.keyCode === 46 || e.keyCode === 8 || e.keyCode === 190 || e.keyCode === 13) {
        if (e.keyCode === 13) {
          if (onKeyPress) onKeyPress(e);
        }
      } else if (e.keyCode < 48 || e.keyCode > 57) {
        e.preventDefault();
      }
    } else if (onKeyPress) onKeyPress(e);
  };

  const getInputClass = () => {
    const styleInput = [ 'input' ];
    if (error) styleInput.push('error');
    return styleInput;
  };

  useEffect(() => {
    setInputValue(value);
  }, [ value ]);

  return (
    <div className='wrapper' style={style}>
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
          className={getInputClass().join(' ')}
          placeholder={placeholder}
          maxLength={maxLength}
          autoFocus
          type={type === 'number' ? 'text' : type}
          readOnly={readonly}
          onChange={handleOnInput}
          onKeyDown={formatInput}
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
        
        .input {
          background-color: var(--darkBg);
          color: var(--accent);
          border-radius: 2px;
          font-size: var(--normal1);
          padding: 11px;
          padding-right: ${icon ? '35px' : '11px'};
        }
        
        .input.error {
          box-shadow: 0px 0px 0px 2px var(--negative);
        }

        .icon {
          position: absolute;
          right: 5px;
          top: 6px;
        }
        
        .input::-webkit-input-placeholder,
        .input::placeholder {
          color: var(--accent);
        }
        
        .input::-webkit-inner-spin-button {
          display: none;
        }
        
        @media (max-width: 480px) {
          .wrapper {
            width: ${responsive ? width - (width / 100) * 14 : width}px;
          }
        }
      `}
      </style>
    </div>
  );
};
