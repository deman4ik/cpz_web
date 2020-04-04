import React from 'react';

// import { AreaChart } from '../../charts/AreaChart';
import { moneyFormat } from '../../../config/utils';
import { SignalItem } from '../RobotsList/types';
//import { vars } from '../../../styles';
import { formatVariables } from './helpers';
// import { RobotsButtonItem } from './RobotsButtonItem';
// import { RobotItemStatusBlock } from './RobotItemStatusBlock';
import styles from './RobotsItem.module.css';

interface Props {
  item: SignalItem;
  onRedirectToDetailView: (code: string) => void;
  robotSubscribe: (variables: any) => void;
  displayType: string;
}

export const RobotsItem: React.FC<Props> = ({ item, robotSubscribe, displayType, onRedirectToDetailView }) => {
  const subscribeToggle = () => {
    robotSubscribe(formatVariables(item, '', displayType));
  };

  const handleOnPressChangeVolume = () => {
    robotSubscribe(formatVariables(item, 'edit'));
  };

  const handleOnPressDelete = () => {
    robotSubscribe(formatVariables(item, 'delete'));
  };

  const handleOnPressDetails = () => {
    onRedirectToDetailView(item.code);
  };

  return (
    <div className={styles.itemContainer}>
      <div className={styles.cellName} onPress={handleOnPressDetails}>
        <div className={{ minWidth: 215 }}>
          <div className={styles.primaryText}>{item.name}</div>
          <div className={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <div className={styles.secondaryText}>
              {item.volume ? `${item.volume} ` : ''}
              {item.asset}
            </div>
            <div className={responsive.profitText(item.profit)}>
              {item.profit !== 0 && `${item.profit > 0 ? '+' : ''}${moneyFormat(item.profit)} $`}
            </div>
          </div>
        </div>
        {/* <IconButton icon='chevron-right' color={vars.color.white} className={{ width: 15, height: 15 }} size={26} /> */}
      </div>
      <div className={styles.cellPerformance}>
        { (item.performance && item.performance.length) ? (
          <div />
          // <AreaChart
          //   height={120}
          //   positive={item.profit > 0}
          //   data={item.performance} />
        ) : null }
      </div>
      <div className={styles.cellStatistics}>
        { item.winRate ? (
          <>
            <div className={{ flexDirection: 'row' }}>
              <div className={styles.secondaryText}>
                {`${t('winrateZero')}  `}
              </div>
              <div className={[ styles.secondaryText, { color: '#fff' } ]}>
                {`${item.winRate} %`}
              </div>
            </div>
            <div className={{ flexDirection: 'row', marginTop: 6, flexWrap: 'wrap' }}>
              <div
                className={styles.secondaryText}>
                {`${t('maxdrawdownZero')}  `}
              </div>
              <div
                className={[ styles.secondaryText, responsive.profitText(item.maxDrawdown), { fontSize: 14 } ]}>
                {`${moneyFormat(item.maxDrawdown)} $`}
              </div>
            </div>
            <div className={{ flexDirection: 'row', marginTop: 6 }}>
              <div
                className={styles.secondaryText}>
                {`${t('tradescountZero')}  `}
              </div>
              <div className={[ styles.secondaryText, { color: '#fff' } ]}>
                {item.tradesCount}
              </div>
            </div>
          </>
        ) : null }
      </div>
      {/* <div className={styles.cellStatus}>
        <RobotItemStatusBlock item={item} displayType={displayType} />
      </div> */}
      {/* <RobotsButtonItem
        isSubscribed={item.isSubscribed}
        robotStatus={item.user_robots.status}
        displayType={displayType}
        subscribeToggle={subscribeToggle}
        handleOnPressDelete={handleOnPressDelete}
        handleOnPressChangeVolume={handleOnPressChangeVolume} /> */}
    </div>
  );
};
