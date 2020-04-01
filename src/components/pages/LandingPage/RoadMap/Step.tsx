import React from 'react';

import styles from './Step.module.css';

interface StepProps {
  date: string;
  title: string;
}

interface Props {
  step: StepProps;
  idx: number;
}
const active = 6;
export const Step: React.FC<Props> = ({ step, idx }) => {
  const isActiveCheck = active === idx + 1;
  const isActiveLine = active >= idx + 1;
  const isFuture = active < idx + 1;
  const isOdd = (idx + 1) % 2 !== 0;
  const isVertical = false;

  let renderTriangle;

  if (isVertical) {
    if (isActiveCheck) {
      renderTriangle = '/img/roadmap-triangle-cur-mob.png';
    } else if (isActiveLine) {
      renderTriangle = '/img/roadmap-triangle-fin-mob.png';
    } else if (isFuture) {
      renderTriangle = '/img/roadmap-triangle-will-mob.png';
    }
  } else if (isActiveCheck) {
    renderTriangle = isOdd
      ? '/img/roadmap-triangle-cur-odd.png'
      : '/img/roadmap-triangle-cur.png';
  } else if (isActiveLine) {
    renderTriangle = isOdd
      ? '/img/roadmap-triangle-fin-odd.png'
      : '/img/roadmap-triangle-fin.png';
  } else if (isFuture) {
    renderTriangle = isOdd
      ? '/img/roadmap-triangle-will-odd.png'
      : '/img/roadmap-triangle-will.png';
  }
  const getCircleCloud = () => {
    const circleCloud = [ styles.circleCloud ];
    if (isOdd) {
      circleCloud.push(styles.oddBottom);
    } else {
      circleCloud.push(styles.oddTop);
    }
    if (isFuture) circleCloud.push(styles.isFuture);
    if (isActiveCheck) circleCloud.push(styles.activeCloud);
    if (isActiveLine && !isActiveCheck) circleCloud.push(styles.isFinished);
    return circleCloud;
  };

  const getTriangleStyle = () => {
    const triangle = [ styles.triangle ];
    if (!isOdd) {
      triangle.push(styles.oddTriangleBottom);
    } else {
      triangle.push(styles.oddTriangleTop);
    }
    return triangle;
  };

  const getLineStyle = () => {
    const line = [ styles.line ];
    if (isActiveLine) line.push(styles.activeLine);
    if (isActiveCheck && (idx === 5)) line.push(styles.endActiveLine);
    return line;
  };

  return (
    <>
      <div className={`${styles.line}${isActiveLine ? ` ${styles.activeLine}` : ''}`} />
      <div className={styles.circle}>
        {isFuture ? (
          <div className={styles.circleFuture} />
        ) : (
          <img
            className={styles.circleCheck}
            src='/img/roadmap-check.png'
            alt='' />
        )}
        <div className={getCircleCloud().join(' ')}>
          <img
            className={getTriangleStyle().join(' ')}
            src={renderTriangle}
            alt='' />
          <div className={styles.circleBody}>
            <div className={`${styles.circleTitle}${isFuture ? ` ${styles.isFutureText}` : ''}`}>{step.date}</div>
            <div className={`${styles.circleText}${isFuture ? ` ${styles.isFutureText}` : ''}`}>{step.title}</div>
          </div>
        </div>
      </div>
      <div className={getLineStyle().join(' ')} />
    </>
  );
};
