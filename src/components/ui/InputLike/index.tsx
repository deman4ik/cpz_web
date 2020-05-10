import React from 'react';
import { Button } from '../../basic';

interface Props {
  icon: string;
  value: string;
  buttonTitle?: string;
  onClickButton?: () => void;
  width?: number;
}

export const InputLike: React.FC<Props> = ({ icon, value, onClickButton, width = 350, buttonTitle }) => {
  const handleOnClick = (e) => {
    e.stopPropagation();
    onClickButton();
  };

  return (
      <div className='wrapper' onClick={handleOnClick}>
      <div className='container'>
          <div className='icon'>
          <Button title={buttonTitle || 'Change'} type='dimmed' size='small' responsive icon={icon} />
                </div>
          <div className='input'>{value}</div>
        </div>
            <style jsx>
          {`
                    .wrapper {
                        width: ${width}px;
                        cursor: pointer;
                        opacity: 1;
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
                        padding: 11px;
                        padding-right: ${icon ? '35px' : '11px'};
                        height: 38px;
                    }
                    .searchInput.error {
                        box-shadow: 0px 0px 0px 2px var(--negative);
                    }
                    .icon {
                        position: absolute;
                        right: 5px;
                        top: 6px;
                    }
                    .wrapper:active {
                        opacity: 0.2;
                    }

                    @media (max-width: 480px) {
                        .wrapper {
                            width: ${width - (width / 100) * 25}px;
                        }
                    }
                `}
        </style>
        </div>
  );
};
