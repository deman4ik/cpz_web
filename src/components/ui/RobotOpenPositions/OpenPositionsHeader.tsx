import React, { memo } from 'react';
import styles from './OpenPositionsHeader.module.css';

const positionTabHeaders = [
  { title: 'Position', flex: 0.8 },
  { title: 'Amount', flex: 0.44 },
  { title: 'Entry', flex: 0.48 }
];
const defaultFlex = 1;

const _OpenPositionsHeader: React.FC = () => (
  <div className={styles.tableHeader}>
    {positionTabHeaders.map((header) => (
      <div key={header.title} className={styles.wrapper} style={{ flex: header.flex || defaultFlex }}>
        <div className={styles.tableHeaderText}>{header.title}</div>
      </div>
    ))}
  </div>
);

export const OpenPositionsHeader = memo(_OpenPositionsHeader);
