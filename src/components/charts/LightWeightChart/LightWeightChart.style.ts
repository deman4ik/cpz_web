import { CSSProperties } from 'react';

export const styles = {
  container: {
    position: 'relative',
    cursor: 'crosshair',
    display: 'flex',
  } as CSSProperties,
  toolTip: {
    position: 'absolute',
    display: 'none',
    padding: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#131722',
    fontFamily: '"Trebuchet MS", Roboto, Ubuntu, sans-serif',
    backgroundColor: 'rgba(44, 52, 84, 0.6)',
    top: '12px',
    left: '12px',
    zIndex: 100
  } as CSSProperties,
  btn: {
    width: '27px',
    height: '27px',
    position: 'absolute',
    display: 'none',
    padding: '7px',
    boxSizing: 'border-box',
    fontSize: '10px',
    borderRadius: '50%',
    textAlign: 'center',
    zIndex: 100,
    color: '#B2B5BE',
    cursor: 'pointer',
    background: 'rgba(250, 250, 250, 0.95)',
    boxShadow: '0 2px 5px 0 rgba(117, 134, 150, 0.45)'
  } as CSSProperties,
  legend: {
    position: 'absolute',
    left: '12px',
    top: '12px',
    zIndex: 10,
    fontSize: '15px',
    lineHeight: '18px',
    fontFamily: '"Trebuchet MS", Roboto, Ubuntu, sans-serif',
    fontWeight: 500,
    color: '#ffffff'
  } as CSSProperties,
};
