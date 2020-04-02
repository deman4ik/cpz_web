export enum PageType {
  robots = 'Robots',
  signals = 'Signals',
  notifications = 'Notifications',
  profile = 'Profile',
  robotStats = 'Robot Stats',
  support = 'Support',
  community = 'Community'
}

export interface DeviceProps {
  isMobile: boolean;
  isIOS: boolean;
  width: number;
}
