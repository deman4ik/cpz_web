import React from 'react';
import styles from './index.module.css';

interface Props {
  data: any;
  value: string;
  enabled?: boolean;
  onValueChange: (itemValue: string) => void;
}

export const Select: React.FC<Props> = ({ data, value, onValueChange, enabled = true }) => {
  const onChange = (e) => {
    onValueChange(e.target.value);
  };

  return (
    <div className={styles.select_container}>
      <select value={value} onChange={onChange} className={styles.select} disabled={!enabled}>
        { data.map(item => (
          <option key={item.value} value={item.value}>{item.label}</option>
        )) }
      </select>
    </div>
  );
};
