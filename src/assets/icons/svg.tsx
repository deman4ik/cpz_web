import React from 'react';

interface Props {
  color: string;
}

export const AlarmIcon: React.FC<Props> = ({ color }) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill={color} width='24px' height='24px'>
    <path d='M0 0h24v24H0z' fill='none' />
    <path d='M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm-1.46-5.47L8.41 12.4l-1.06 1.06 3.18 3.18 6-6-1.06-1.06-4.93 4.95z' />
  </svg>
);

export const AssignmentIcon: React.FC<Props> = ({ color }) => (
  <svg fill={color} width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z' />
  </svg>
);

export const MultiLineChartIcon: React.FC<Props> = ({ color }) => (
  <svg fill={color} width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M22 6.92l-1.41-1.41-2.85 3.21C15.68 6.4 12.83 5 9.61 5 6.72 5 4.07 6.16 2 8l1.42 1.42C5.12 7.93 7.27 7 9.61 7c2.74 0 5.09 1.26 6.77 3.24l-2.88 3.24-4-4L2 16.99l1.5 1.5 6-6.01 4 4 4.05-4.55c.75 1.35 1.25 2.9 1.44 4.55H21c-.22-2.3-.95-4.39-2.04-6.14L22 6.92z' />
  </svg>
);

export const NotificationsIcon: React.FC<Props> = ({ color }) => (
  <svg fill={color} width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z' />
  </svg>
);

export const TelegramIcon: React.FC<Props> = ({ color }) => (
  <svg fill={color} width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z' />
  </svg>
);

export const HelpIcon: React.FC<Props> = ({ color }) => (
  <svg fill={color} width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' />
  </svg>
);

export const CircleIcon: React.FC<Props> = ({ color }) => (
  <svg height='10' width='10' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill={color} /></svg>
);
