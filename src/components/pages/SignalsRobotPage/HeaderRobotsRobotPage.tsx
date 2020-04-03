import React, { memo, useState } from 'react';

//import { ScreenTypeProps } from '../../../services/Screen';
// import { HeaderButtonRobotPage } from './HeaderButtonRobotPage';
// import { HeaderStatsRobotPage } from './HeaderStatsRobotPage';
// import { TooltipButton } from '../../ui/Tooltip/TooltipButton';
// import { TooltipText } from '../../ui/Tooltip/TooltipText';
// import { styles, responsive } from './HeaderRobotsRobotPage.style';
import styles from './HeaderRobotsRobotPage.module.css';

interface Props {
  robotData: any;
  robotSubscribe: (variables: any) => void;
}

const _HeaderRobotsRobotPage: React.FC<Props> = ({ robotData, robotSubscribe }) => {
  // const [ top, setTop ] = useState(0);
  // const [ left, setLeft ] = useState(0);
  // const [ isDescriptionExpanded, setDescriptionExpanded ] = useState(false);

  return (
    <>
      {/* <TooltipText
        isDescriptionExpanded={isDescriptionExpanded}
        top={top}
        left={left}
        maxWidth={800}
        text={robotData ? robotData.robot.strategyByStrategy.description : null} /> */}
      <div className={styles.header}>
        <div className={styles.container}>
          <div className={styles.headerName}>
            <div className={styles.robotNameWrapper}>
              <div className={styles.robotName}>
                {robotData.robot.name}
              </div>
              {/* <div className={responsive.toolTip(screenType)}>
                <TooltipButton
                  setLeft={setLeft}
                  setTop={setTop}
                  setDescriptionExpanded={setDescriptionExpanded}
                  isDescriptionExpanded={isDescriptionExpanded} />
              </div> */}
            </div>
            {/* <HeaderButtonRobotPage
              robotSubscribe={robotSubscribe}
              screenType={screenType}
              robotData={robotData} /> */}
          </div>
        </div>
        {/* <HeaderStatsRobotPage robotData={robotData} screenType={screenType} /> */}
      </div>
    </>
  );
};

export const HeaderRobotsRobotPage = memo(_HeaderRobotsRobotPage);
