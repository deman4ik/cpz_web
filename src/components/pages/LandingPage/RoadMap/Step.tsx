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
        <div className={styles.circleCloud}>
          {/* {isActiveCheck && (
          <LinearGradient
            className={styles.circleCloudGr}
            colors={[ '#2e3248', '#1f233f' ]}
              />
          )} */}
          <img
            className={styles.triangle}
            src={renderTriangle}
            alt='' />
          <div className={styles.circleBody}>
            <div className={styles.circleTitle}>{step.date}</div>
            <div className={styles.circleText}>{step.title}</div>
          </div>
        </div>
      </div>
      {/* {isActiveCheck && steps[index + 1] ? (
          <>
            <LinearGradient
              className={responsive.line(isVertical, isActiveLine)}
              colors={[ vars.color.primary, '#727f9b' ]}
              start={isVertical ? [ 1, 0 ] : [ 0, 1 ]}
              end={isVertical ? [ 0, 1 ] : [ 1, 0 ]}
            />
          </>
        ) : (
          <div className={responsive.line(isVertical, isActiveLine)} />
        )} */}
    </>
  );
};
