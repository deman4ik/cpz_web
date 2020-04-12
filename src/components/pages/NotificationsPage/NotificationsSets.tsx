import React from 'react';

import { ArrowDownIcon, ArrowUpIcon } from '../../../assets/icons/svg';
import { formatDate, capitalize, colorAction, moneyFormat, valueWithSign, colorDirection } from '../../../config/utils';
import { actionName, actionIcon, actionColor, actionOpen } from './helpers';
import styles from './NotificationsSets.module.css';

export const failedSet = (item) => (
  <div>
    <div className={styles.row}>
      <div className={styles.textMessageDesktop}>{`${item.data.error} Robot `}</div>
      <div className={styles.textAccent}>{item.robot.name}</div>
      <div className={styles.textMessageDesktop}>&nbsp;(</div>
      <div className={styles.textAccent}>{item.data.userRobotId}</div>
      <div className={styles.textMessageDesktop}>)</div>
    </div>
    <div className={styles.row} style={{ flexWrap: 'wrap', marginTop: 3 }}>
      <div className={styles.textMessageDesktop}>{`Error occurred while processing robot job ${item.data.jobType}. `}</div>
      <div className={styles.textMessageDesktop}>Please contact support.</div>
    </div>
  </div>
);

export const messageSet = (item) => (
  <div className={[ styles.messageRow, styles.textMessageDesktop ].join(' ')}>
    {`${item.type === 'message.support-reply'
      ? 'Support Team'
      : 'Announcement'} - ${item.data.message.replace(/<[^>]*>/g, '')}`}
  </div>
);

export const robotTradeSet = (item) => (
  <div>
    {item.data.status === 'open' ? (
      <>
        <div className={styles.row}>
          <div className={styles.textMessageDesktop}>Trade&nbsp;</div>
          <div className={styles.textAccent}>{item.robot.name}&nbsp;</div>
          <div className={styles.textMessageDesktop}>{item.data.code}</div>
        </div>
        <div className={styles.row} style={{ marginTop: 3 }}>
          <div className={styles.textAccent}>Entry&nbsp;</div>
          <div className={styles.textMessageDesktop} style={colorDirection(item.data.entryAction)}>
            {capitalize(item.data.entryAction)}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Volume&nbsp;</div>
          <div className={styles.textMessageDesktop}>
            {`${item.data.entryExecuted} ${item.robot.asset}`}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Price&nbsp;</div>
          <div className={styles.textMessageDesktop}>
            {`${item.data.entryPrice} $`}
          </div>
          <div className={styles.textAccent}>  Date </div>
          <div className={styles.textMessageDesktop}>
            {formatDate(item.data.entryDate)}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className={styles.row}>
          <div className={styles.textMessageDesktop}>Trade&nbsp;</div>
          <div className={styles.textAccent}>{item.robot.name}&nbsp;</div>
          <div className={styles.textMessageDesktop}>{item.data.code}</div>
        </div>
        <div className={styles.row} style={{ marginTop: 3 }}>
          <div className={styles.textAccent}>Exit&nbsp;</div>
          <div className={styles.textMessageDesktop} style={colorDirection(item.data.exitAction)}>
            {capitalize(item.data.exitAction).split(/(?=[A-Z])/).join(' ')}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Volume&nbsp;</div>
          <div className={styles.textMessageDesktop}>
            {`${item.data.exitExecuted} ${item.robot.asset}`}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Price&nbsp;</div>
          <div className={styles.textMessageDesktop}>
            {`${item.data.exitPrice} $`}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Date&nbsp;</div>
          <div className={styles.textMessageDesktop}>
            {formatDate(item.data.exitDate)}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Profit&nbsp;</div>
          <div className={styles.textMessageDesktop} style={colorAction(item.data.profit > 0)}>
            {`${valueWithSign(moneyFormat(item.data.profit))} $`}
          </div>
        </div>
      </>
    )}
  </div>
);

export const errorSet = (item) => (
  <div>
    <div className={styles.row}>
      <div className={styles.textMessageDesktop}>Robot&nbsp;</div>
      <div className={styles.textAccent}>{item.robot.name}</div>
      <div className={styles.textMessageDesktop}>&nbsp;(</div>
      <div className={styles.textAccent}>{item.data.userRobotId}</div>
      <div className={styles.textMessageDesktop}>)</div>
    </div>
    <div className={styles.row} style={{ flex: 1, flexWrap: 'wrap', marginTop: 3 }}>
      <div className={styles.textMessageDesktop}>Error occurred while processing order&nbsp;</div>
      <div className={styles.textAccent}>{item.data.exId}</div>
      <div className={styles.textMessageDesktop}>{` ${item.data.error}. `}</div>
      <div className={styles.textMessageDesktop}>Please check your API Keys and Robot settings or contact support.</div>
    </div>
  </div>
);

const components = {
  arrowdown: ArrowDownIcon,
  arrowup: ArrowUpIcon,
};

export const signalAlertSet = (item) => {
  const SpecificIcon = components[actionIcon(item.data.action)];
  return (
    <>
      <div className={styles.row}>
        <div className={styles.textMessageDesktop}>Signal&nbsp;</div>
        <div className={styles.textAccent}>{item.robot.name}&nbsp;</div>
        <div className={styles.textMessageDesktop}>{item.robot_position.code}</div>
      </div>
      <div className={styles.row} style={{ marginTop: 3 }}>
        <div className={styles.textAccent}>Action&nbsp;</div>
        <div className={styles.textMessageDesktop}>{actionName(item.data.action)}</div>
        <div style={{ marginTop: 1 }}>
          <SpecificIcon color={actionColor(item.data.action)} size={16} />
        </div>
        <div className={styles.textMessageDesktop}>{capitalize(item.data.orderType)} </div>
        <div className={styles.textAccent}>&nbsp;&nbsp;Price&nbsp;</div>
        <div className={styles.textMessageDesktop}>{`${moneyFormat(item.data.price)} $`}</div>
        <div className={styles.textAccent}>&nbsp;&nbsp;Date&nbsp;</div>
        <div className={styles.textMessageDesktop}>{formatDate(item.data.timestamp)}</div>
      </div>
    </>
  );
};

export const robotSet = (item) => (
  <div>
    <div className={styles.row}>
      <div className={styles.textMessageDesktop}>Robot&nbsp;</div>
      <div className={styles.textAccent}>{item.robot.name}</div>
      <div className={styles.textMessageDesktop}>{` is ${item.type.split('.')[1]}`}</div>
    </div>
    {item.data.message ? (
      <div className={[ styles.messageRow, styles.textMessageDesktop ].join(' ')} style={{ marginTop: 3 }}>
        {item.data.message}
      </div>
    ) : null}
  </div>
);

export const signalTradeSet = (item) => (
  <div>
    {actionOpen(item.data.action) ? (
      <>
        <div className={styles.row}>
          <div className={styles.textMessageDesktop}>Signal Trade&nbsp;</div>
          <div className={styles.textAccent}>{item.robot.name}&nbsp;</div>
          <div className={styles.textMessageDesktop}>{item.data.positionCode}</div>
        </div>
        <div className={styles.row} style={{ marginTop: 3 }}>
          <div className={styles.textAccent}>Entry&nbsp;</div>
          <div className={styles.textMessageDesktop} style={colorDirection(item.data.action)}>
            {capitalize(item.data.action)}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Price&nbsp;</div>
          <div className={styles.textMessageDesktop}>
            {`${item.data.price} $`}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Date&nbsp;</div>
          <div className={styles.textMessageDesktop}>
            {formatDate(item.data.timestamp)}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className={styles.row}>
          <div className={styles.textMessageDesktop}>Signal Trade&nbsp;</div>
          <div className={styles.textAccent}>{item.robot.name}&nbsp;</div>
          <div className={styles.textMessageDesktop}>{item.data.positionCode}</div>
        </div>
        <div className={styles.row} style={{ marginTop: 3 }}>
          <div className={styles.textAccent}>Exit&nbsp;</div>
          <div className={styles.textMessageDesktop} style={colorDirection(item.data.action)}>
            {capitalize(item.data.action).split(/(?=[A-Z])/).join(' ')}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Price&nbsp;</div>
          <div className={styles.textMessageDesktop}>
            {`${item.data.price} $`}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Date&nbsp;</div>
          <div className={styles.textMessageDesktop}>
            {formatDate(item.data.timestamp)}
          </div>
          <div className={styles.textAccent}>&nbsp;&nbsp;Profit&nbsp;</div>
          <div className={styles.textMessageDesktop} style={colorAction(item.data.profit > 0)}>
            {`${valueWithSign(moneyFormat(item.data.profit))} $`}
          </div>
        </div>
      </>
    )}
  </div>
);

export const userSet = (item) => (
  <div>
    <div className={styles.row}>
      <div className={styles.textMessageDesktop}>Your API Key&nbsp;</div>
      <div className={styles.textAccent}>{item.data.name}</div>
      <div className={styles.textMessageDesktop}>&nbsp;is invalid!</div>
    </div>
    <div className={styles.row} style={{ marginTop: 3 }}>
      <div className={styles.textMessageDesktop}>{item.data.error}&nbsp;</div>
      <div className={styles.textMessageDesktop}>Please update your API Key information in your Profile.</div>
    </div>
  </div>
);
