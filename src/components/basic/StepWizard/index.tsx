import React, { memo } from 'react';

import { SCREEN_TYPE } from '../../../config/constants';
import { useShowDimension } from '../../../hooks/useShowDimension';
import { Step } from './Step';

interface Props {
  steps: string[];
  activeStep: number;
  height?: number;
  titleWidth?: number;
  width: number;
}

export const _StepWizard: React.FC<Props> = ({ steps, activeStep, height, width, titleWidth }) => {
  const { showDimension } = useShowDimension(width, SCREEN_TYPE.TABLET);

  return (
      <div className='container'>
      <div className='stepsContainer'>
          {showDimension ? (
                  steps.map((step, idx) => (
                      <Step
                      key={idx}
                      step={step}
                            idx={idx}
                      steps={steps}
                      titleWidth={titleWidth}
                            activeStep={activeStep}
                      showDimension={showDimension}
                        />
                  ))
                ) : (
            <Step
                        step={steps[activeStep - 1]}
                    steps={steps}
                    titleWidth={titleWidth}
                        activeStep={activeStep}
                    showDimension={showDimension}
                    />
                )}
            </div>
            <style jsx>
          {`
                    .container {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        margin-left: 40px;
                        margin-right: 40px;
                        height: ${height}px;
                    }
                    .stepsContainer {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                    }

                    @media (max-width: 768px) {
                        .container {
                            margin-left: 0;
                            margin-right: 0;
                        }
                    }
                `}
        </style>
        </div>
  );
};

export const StepWizard = memo(_StepWizard);
