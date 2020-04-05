import React, { memo } from 'react';

// import { AreaChart } from '../../charts/AreaChart';

import { moneyFormat } from '../../../config/utils';
//import { PropsPerformanceItem } from './types';

interface Props {
  item: any;
  onRedirectToDetaildiv: (path: string) => void;
}

const _PerformanceItem: React.FC<Props> = ({ item, onRedirectToDetaildiv }) => {
  const handleOnPress = () => {
    onRedirectToDetaildiv(item.path);
  };

  return (
    <div className={styles.tableRow}>
      <div className={{ flex: 0.8 }}>
        <TouchableOpacity className={{ flexDirection: 'row', alignItems: 'center' }} onPress={handleOnPress}>
          <div>
            <div className={[ styles.tableCellText, { minWidth: 90 } ]}>{item.name}</div>
            <div className={[ styles.cellProfit, responsive.profitText(item.profit) ]}>
              {item.profit ? `${item.profit > 0 ? '+' : ''}${moneyFormat(item.profit)} $` : null}
            </div>
          </div>
          <IconButton icon='chevron-right' color={vars.color.white} className={{ width: 15, height: 15 }} size={26} />
        </TouchableOpacity>
      </div>
      <div className={{ flex: 0.85 }}>
        { (item.changes && item.changes.length) ? (
          <AreaChart
            height={120}
            positive={item.profit > 0}
            data={item.changes} />
        ) : null }
      </div>
      <div className={{ flex: 0.05 }} />
      <div className={{ flex: 0.9 }}>
        { (item.winRate || item.winRate === 0) ? (
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
        ) : null}
      </div>
    </div>
  );
};

export const PerformanceItem = memo(_PerformanceItem);
