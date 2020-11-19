import React from "react";

interface Props {
    color?: string;
    size?: number;
}

export const AssignmentIcon: React.FC<Props> = ({ color, size = 24 }) => (
    <svg style={{ width: size, height: size }} fill={color} viewBox="0 0 24 24">
        <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z" />
    </svg>
);

export const BackBurger: React.FC<Props> = ({ color, size = 24 }) => (
    <svg
        aria-hidden="true"
        focusable="false"
        width="1em"
        height="1em"
        style={{ transform: "rotate(360deg)", width: size, height: size }}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24">
        <path d="M5 13l4 4l-1.4 1.42L1.18 12L7.6 5.58L9 7l-4 4h16v2H5m16-7v2H11V6h10m0 10v2H11v-2h10z" fill={color} />
        <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
    </svg>
);

export const MultiLineChartIcon: React.FC<Props> = ({ color, size = 24 }) => (
    <svg style={{ width: size, height: size }} fill={color} viewBox="0 0 24 24">
        <path d="M17.45 15.18L22 7.31V21H2V3h2v12.54L9.5 6L16 9.78l4.24-7.33l1.73 1l-5.23 9.05l-6.51-3.75L4.31 19h2.26l4.39-7.56l6.49 3.74z" />
    </svg>
);

export const NotificationsIcon: React.FC<Props> = ({ color, size = 24 }) => (
    <svg style={{ width: size, height: size }} fill={color} viewBox="0 0 24 24">
        <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z" />
    </svg>
);

export const TelegramIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg fill={color} width={`${size}px`} height={`${size}px`} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
    </svg>
);

export const HelpIcon: React.FC<Props> = ({ color }) => (
    <svg fill={color} width="24px" height="24px" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
);

export const CircleIcon: React.FC<Props> = ({ color }) => (
    <svg height="10" width="10" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill={color} />
    </svg>
);

export const InstagramIcon: React.FC<Props> = ({ color = "white" }) => (
    <svg width="24px" height="24px" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill={color}>
        <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    </svg>
);

export const TwitterIcon: React.FC<Props> = ({ color = "white" }) => (
    <svg width="24px" height="24px" focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill={color}>
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
    </svg>
);

export const LiveHelpIcon: React.FC<Props> = ({ color, size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill={color}>
        <path d="M19 2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-6 16h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 11.9 13 12.5 13 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </svg>
);

export const RobotIcon: React.FC<Props> = ({ color, size = 24 }) => (
    <svg style={{ width: size, height: size }} fill={color} viewBox="0 0 24 24">
        <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z" />
    </svg>
);

export const ChevronRightIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
    </svg>
);

export const ChevronLeftIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
    </svg>
);

export const ChevronDownIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
);

export const ChevronUpIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
    </svg>
);

export const CheckIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
);

export const PlusIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
);

export const MinusIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M19,13H5V11H19V13Z" />
    </svg>
);

export const SettingsIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
    </svg>
);

export const ArrowDownIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z" />
    </svg>
);

export const ArrowUpIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
    </svg>
);

export const ArrowLeftIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
    </svg>
);

export const ArrowRightIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M4,11V13H16L10.5,18.5,11.92,19.92,19.84,12,11.92,4.08,10.5,5.5,16,11H4Z" />
    </svg>
);

export const CloseIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
    </svg>
);

export const MagnifyIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
);

export const BorderColorIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M20.71,4.04C21.1,3.65 21.1,3 20.71,2.63L18.37,0.29C18,-0.1 17.35,-0.1 16.96,0.29L15,2.25L18.75,6M17.75,7L14,3.25L4,13.25V17H7.75L17.75,7Z" />
    </svg>
);

export const ChartLineIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M16,11.78L20.24,4.45L21.97,5.45L16.74,14.5L10.23,10.75L5.46,19H22V21H2V3H4V17.54L9.5,8L16,11.78Z" />
    </svg>
);

export const BetaIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M9.23,17.59V23.12H6.88V6.72C6.88,5.27 7.31,4.13 8.16,3.28C9,2.43 10.17,2 11.61,2C13,2 14.07,2.34 14.87,3C15.66,3.68 16.05,4.62 16.05,5.81C16.05,6.63 15.79,7.4 15.27,8.11C14.75,8.82 14.08,9.31 13.25,9.58V9.62C14.5,9.82 15.47,10.27 16.13,11C16.79,11.71 17.12,12.62 17.12,13.74C17.12,15.06 16.66,16.14 15.75,16.97C14.83,17.8 13.63,18.21 12.13,18.21C11.07,18.21 10.1,18 9.23,17.59M10.72,10.75V8.83C11.59,8.72 12.3,8.4 12.87,7.86C13.43,7.31 13.71,6.7 13.71,6C13.71,4.62 13,3.92 11.6,3.92C10.84,3.92 10.25,4.16 9.84,4.65C9.43,5.14 9.23,5.82 9.23,6.71V15.5C10.14,16.03 11.03,16.29 11.89,16.29C12.73,16.29 13.39,16.07 13.86,15.64C14.33,15.2 14.56,14.58 14.56,13.79C14.56,12 13.28,11 10.72,10.75Z" />
    </svg>
);

export const LockOpenIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z" />
    </svg>
);

export const EmailIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
    </svg>
);

export const AccountIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
);

export const LogoutIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
    </svg>
);

export const WindowCloseIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
    </svg>
);

export const AlertIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
    </svg>
);

export const MenuDownIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M7,10L12,15L17,10H7Z" />
    </svg>
);

export const FilterVariantIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M6,13H18V11H6M3,6V8H21V6M10,18H14V16H10V18Z" />
    </svg>
);

export const FilterVariantRemoveIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M21 8H3V6H21V8M13.81 16H10V18H13.09C13.21 17.28 13.46 16.61 13.81 16M18 11H6V13H18V11M21.12 15.46L19 17.59L16.88 15.46L15.47 16.88L17.59 19L15.47 21.12L16.88 22.54L19 20.41L21.12 22.54L22.54 21.12L20.41 19L22.54 16.88L21.12 15.46Z" />
    </svg>
);

export const FilterVariantMinusIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M21 8H3V6H21V8M13.81 16H10V18H13.09C13.21 17.28 13.46 16.61 13.81 16M18 11H6V13H18V11M23 18H15V20H23V18Z" />
    </svg>
);

export const CancelIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,13.85 4.63,15.55 5.68,16.91L16.91,5.68C15.55,4.63 13.85,4 12,4M12,20A8,8 0 0,0 20,12C20,10.15 19.37,8.45 18.32,7.09L7.09,18.32C8.45,19.37 10.15,20 12,20Z" />
    </svg>
);

export const CardAccount: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path
            fill="currentColor"
            d="M2,3H22C23.05,3 24,3.95 24,5V19C24,20.05 23.05,21 22,21H2C0.95,21 0,20.05 0,19V5C0,3.95 0.95,3 2,3M14,6V7H22V6H14M14,8V9H21.5L22,9V8H14M14,10V11H21V10H14M8,13.91C6,13.91 2,15 2,17V18H14V17C14,15 10,13.91 8,13.91M8,6A3,3 0 0,0 5,9A3,3 0 0,0 8,12A3,3 0 0,0 11,9A3,3 0 0,0 8,6Z"
        />
    </svg>
);

export const ChartAreaSpline: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path fill="currentColor" d="M22,21H2V3H4V15.54L9.5,6L16,9.78L20.24,2.45L21.97,3.45L22,21Z" />
    </svg>
);

export const AccountPlus: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M6,10V7H4V10H1V12H4V15H6V12H9V10M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12Z"
        />
    </svg>
);

export const ForumIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z"
        />
    </svg>
);

export const TextSearch: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M19.31 18.9L22.39 22L21 23.39L17.88 20.32C17.19 20.75 16.37 21 15.5 21C13 21 11 19 11 16.5C11 14 13 12 15.5 12C18 12 20 14 20 16.5C20 17.38 19.75 18.21 19.31 18.9M15.5 19C16.88 19 18 17.88 18 16.5C18 15.12 16.88 14 15.5 14C14.12 14 13 15.12 13 16.5C13 17.88 14.12 19 15.5 19M21 4V6H3V4H21M3 16V14H9V16H3M3 11V9H21V11H18.97C17.96 10.37 16.77 10 15.5 10C14.23 10 13.04 10.37 12.03 11H3Z"
        />
    </svg>
);

export const PlayListCheck: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M14,10H2V12H14V10M14,6H2V8H14V6M2,16H10V14H2V16M21.5,11.5L23,13L16,20L11.5,15.5L13,14L16,17L21.5,11.5Z"
        />
    </svg>
);

export const MessageAlert: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path d="M13,10H11V6H13M13,14H11V12H13M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z" />
    </svg>
);

export const ShieldKey: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M12,8A1,1 0 0,1 13,9A1,1 0 0,1 12,10A1,1 0 0,1 11,9A1,1 0 0,1 12,8M21,11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1L21,5V11M12,6A3,3 0 0,0 9,9C9,10.31 9.83,11.42 11,11.83V18H13V16H15V14H13V11.83C14.17,11.42 15,10.31 15,9A3,3 0 0,0 12,6Z"
        />
    </svg>
);

export const TextBoxSearch: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M15.5,12C18,12 20,14 20,16.5C20,17.38 19.75,18.21 19.31,18.9L22.39,22L21,23.39L17.88,20.32C17.19,20.75 16.37,21 15.5,21C13,21 11,19 11,16.5C11,14 13,12 15.5,12M15.5,14A2.5,2.5 0 0,0 13,16.5A2.5,2.5 0 0,0 15.5,19A2.5,2.5 0 0,0 18,16.5A2.5,2.5 0 0,0 15.5,14M7,15V17H9C9.14,18.55 9.8,19.94 10.81,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19A2,2 0 0,1 21,5V13.03C19.85,11.21 17.82,10 15.5,10C14.23,10 13.04,10.37 12.04,11H7V13H10C9.64,13.6 9.34,14.28 9.17,15H7M17,9V7H7V9H17Z"
        />
    </svg>
);

export const PlusBox: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z"
        />
    </svg>
);

export const Check: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} fill={color} viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
);

export const DashBoard: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} color={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M21,14V4H3V14H21M21,2A2,2 0 0,1 23,4V16A2,2 0 0,1 21,18H14L16,21V22H8V21L10,18H3C1.89,18 1,17.1 1,16V4C1,2.89 1.89,2 3,2H21M4,5H15V10H4V5M16,5H20V7H16V5M20,8V13H16V8H20M4,11H9V13H4V11M10,11H15V13H10V11Z"
        />
    </svg>
);

export const Users: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg style={{ width: size, height: size }} color={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M16 17V19H2V17S2 13 9 13 16 17 16 17M12.5 7.5A3.5 3.5 0 1 0 9 11A3.5 3.5 0 0 0 12.5 7.5M15.94 13A5.32 5.32 0 0 1 18 17V19H22V17S22 13.37 15.94 13M15 4A3.39 3.39 0 0 0 13.07 4.59A5 5 0 0 1 13.07 10.41A3.39 3.39 0 0 0 15 11A3.5 3.5 0 0 0 15 4Z"
        />
    </svg>
);

export const ListBulleted: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg style={{ width: size, height: size }} color={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z"
        />
    </svg>
);

export const AccountStar: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg style={{ width: size, height: size }} color={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M15,14C12.33,14 7,15.33 7,18V20H23V18C23,15.33 17.67,14 15,14M15,12A4,4 0 0,0 19,8A4,4 0 0,0 15,4A4,4 0 0,0 11,8A4,4 0 0,0 15,12M5,13.28L7.45,14.77L6.8,11.96L9,10.08L6.11,9.83L5,7.19L3.87,9.83L1,10.08L3.18,11.96L2.5,14.77L5,13.28Z"
        />
    </svg>
);

export const AccountDetails: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg style={{ width: size, height: size }} color={color} viewBox="0 0 24 24">
        <path
            fill="currentColor"
            d="M11 9C11 10.66 9.66 12 8 12C6.34 12 5 10.66 5 9C5 7.34 6.34 6 8 6C9.66 6 11 7.34 11 9M14 20H2V18C2 15.79 4.69 14 8 14C11.31 14 14 15.79 14 18M22 12V14H13V12M22 8V10H13V8M22 4V6H13V4Z"
        />
    </svg>
);

export const EyeIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
    </svg>
);

export const MenuIcon: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 24 24" fill={color}>
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
);

export const DeadLetter: React.FC<Props> = ({ color = "white", size = 24 }) => (
    <svg style={{ width: size, height: size }} viewBox="0 0 24 24">
        <path
            fill={color}
            d="M13.09 18H4V8L12 13L20 8V13.09C20.72 13.21 21.39 13.46 22 13.81V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H13.09C13.04 19.67 13 19.34 13 19C13 18.66 13.04 18.33 13.09 18M20 6L12 11L4 6H20M20.41 19L22.54 21.12L21.12 22.54L19 20.41L16.88 22.54L15.47 21.12L17.59 19L15.47 16.88L16.88 15.47L19 17.59L21.12 15.47L22.54 16.88L20.41 19Z"
        />
    </svg>
);
