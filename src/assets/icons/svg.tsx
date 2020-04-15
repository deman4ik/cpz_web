import React from 'react';

interface Props {
  color?: string;
  size?: number;
}

export const AssignmentIcon: React.FC<Props> = ({ color }) => (
  <svg fill={color} width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z' />
  </svg>
);

export const MultiLineChartIcon: React.FC<Props> = ({ color }) => (
  <svg fill={color} width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M17.45 15.18L22 7.31V21H2V3h2v12.54L9.5 6L16 9.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L4.31 19h2.26l4.39-7.56l6.49 3.74z' />
  </svg>
);

export const NotificationsIcon: React.FC<Props> = ({ color }) => (
  <svg fill={color} width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
    <path d='M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z' />
  </svg>
);

export const TelegramIcon: React.FC<Props> = ({ color, size = 24 }) => (
  <svg fill={color} width={`${size}px`} height={`${size}px`} focusable='false' viewBox='0 0 24 24' aria-hidden='true'>
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

export const InstagramIcon: React.FC<Props> = ({ color }) => (
  <svg width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true' fill={color}>
    <path d='M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z' />
  </svg>
);

export const TwitterIcon: React.FC<Props> = ({ color }) => (
  <svg width='24px' height='24px' focusable='false' viewBox='0 0 24 24' aria-hidden='true' fill={color}>
    <path d='M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z' />
  </svg>
);

export const LiveHelpIcon: React.FC<Props> = ({ color, size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} focusable='false' viewBox='0 0 24 24' aria-hidden='true' fill={color}>
    <path d='M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 11.9 13 12.5 13 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z' />
  </svg>
);

export const RobotIcon: React.FC<Props> = ({ color, size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox='0 0 24 24'>
    <path d='M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z' />
  </svg>
);

export const ChevronRightIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' />
  </svg>
);

export const ChevronLeftIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z' />
  </svg>
);

export const ChevronDownIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
  </svg>
);

export const ChevronUpIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z' />
  </svg>
);

export const CheckIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z' />
  </svg>
);

export const PlusIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' />
  </svg>
);

export const MinusIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M19,13H5V11H19V13Z' />
  </svg>
);

export const SettingsIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z' />
  </svg>
);

export const ArrowDownIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z' />
  </svg>
);

export const ArrowUpIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z' />
  </svg>
);

export const ArrowLeftIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z' />
  </svg>
);

export const CloseIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' />
  </svg>
);

export const MagnifyIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z' />
  </svg>
);

export const BorderColorIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z' />
  </svg>
);

export const ChartLineIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z' />
  </svg>
);

export const BetaIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M9.23,17.59V23.12H6.88V6.72C6.88,5.27 7.31,4.13 8.16,3.28C9,2.43 10.17,2 11.61,2C13,2 14.07,2.34 14.87,3C15.66,3.68 16.05,4.62 16.05,5.81C16.05,6.63 15.79,7.4 15.27,8.11C14.75,8.82 14.08,9.31 13.25,9.58V9.62C14.5,9.82 15.47,10.27 16.13,11C16.79,11.71 17.12,12.62 17.12,13.74C17.12,15.06 16.66,16.14 15.75,16.97C14.83,17.8 13.63,18.21 12.13,18.21C11.07,18.21 10.1,18 9.23,17.59M10.72,10.75V8.83C11.59,8.72 12.3,8.4 12.87,7.86C13.43,7.31 13.71,6.7 13.71,6C13.71,4.62 13,3.92 11.6,3.92C10.84,3.92 10.25,4.16 9.84,4.65C9.43,5.14 9.23,5.82 9.23,6.71V15.5C10.14,16.03 11.03,16.29 11.89,16.29C12.73,16.29 13.39,16.07 13.86,15.64C14.33,15.2 14.56,14.58 14.56,13.79C14.56,12 13.28,11 10.72,10.75Z' />
  </svg>
);

export const LockOpenIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z' />
  </svg>
);

export const EmailIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z' />
  </svg>
);

export const AccountIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z' />
  </svg>
);

export const LogoutIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z' />
  </svg>
);

export const WindowCloseIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z' />
  </svg>
);

export const AlertIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z' />
  </svg>
);

export const MenuDownIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M7,10L12,15L17,10H7Z' />
  </svg>
);

export const FilterVariantIcon: React.FC<Props> = ({ color = 'white', size = 24 }) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox='0 0 24 24' fill={color}>
    <path d='M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z' />
  </svg>
);
