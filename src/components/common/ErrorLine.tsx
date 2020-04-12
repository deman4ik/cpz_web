import React, { memo } from 'react';
import styles from './ErrorLine.module.css';

interface Props {
  formError: string;
}

const _ErrorLine: React.FC<Props> = ({ formError }) => (
  <>
    {formError ? (
      <div className={styles.errorContainer}>
        <div className={styles.errorText}>{formError}</div>
      </div>
    ) : null}
  </>
);

export const ErrorLine = memo(_ErrorLine);
