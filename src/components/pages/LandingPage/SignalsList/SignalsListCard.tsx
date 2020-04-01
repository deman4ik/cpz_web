import React, { memo } from 'react';

import { moneyFormat } from '../../../../config/utils';
import styles from './SignalsListCard.module.css';

interface Props {
  robot: any;
}

const _SignalsListCard: React.FC<Props> = ({ robot }) => {
  const money = (
    <Text style={responsive.primaryText(screenType)}>
      {Utils.moneyFormat(robot.equity.profit)} $
    </Text>
  );

  return (
    <div className={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.nameCol}>
            <Text style={responsive.primaryText(screenType)}>{robot.name}</Text>
            {screenType.minPhone() && money}
          </View>
          <View style={[ styles.numberCol, responsive.profitCol(screenType) ]}>
            <Text style={styles.secondaryText}>
              <Text style={responsive.label(screenType)}>
                {robot.settings.volume} {robot.asset}
              </Text>
            </Text>
            {screenType.maxPhone() && money}
            <Text style={responsive.lastProfit(robot.equity.lastProfit)}>
              {Utils.valueWithSign(Utils.moneyFormat(robot.equity.lastProfit))} $
            </Text>
          </View>
        </View>
      </View>
      <View style={responsive.chartStat(screenType)}>
        <View style={styles.chartCol}>
          {robot.equity.changes && (
            <AreaChart
              height={120}
              positive={robot.equity.profit > 0}
              data={robot.equity.changes}
            />
          )}
        </View>
        <View style={responsive.statCol(screenType)}>
          <View style={responsive.statRow(screenType)}>
            <Text style={responsive.label(screenType)}>{t('Win Rate')}</Text>
            <Text style={styles.statValue}>
              {Math.round(robot.statistics.winRate.all)} %
            </Text>
          </View>
          <View style={responsive.statRow(screenType)}>
            <Text style={responsive.label(screenType)}>
              {t('Max Drawdown')}
            </Text>
            <Text style={styles.statValue}>
              {Utils.moneyFormat(robot.statistics.maxDrawdown.all)} $
            </Text>
          </View>
          <View style={responsive.statRow(screenType)}>
            <Text style={responsive.label(screenType)}>
              {t('Trades Count')}
            </Text>
            <Text style={styles.statValue}>
              {robot.statistics.tradesCount.all}
            </Text>
          </View>
        </View>
      </View>
    </div>
  );
};

export const SignalsListCard = memo(_SignalsListCard);
