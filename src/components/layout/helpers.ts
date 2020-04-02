import { MainMenuItemProps } from './types';
import { PageType } from '../../config/types';

export const MAINMENU_MAX_WIDTH = 200;
export const MAINMENU_MIN_WIDTH = 56;
export const MAINMENU_MIN_HEIGHT = 56;
export const MAINMENU_ITEMS: MainMenuItemProps[] = [
  { label: PageType.robots, icon: 'robot', route: 'robots' },
  { label: PageType.signals, icon: 'signals', route: 'signals' },
  { label: PageType.notifications, icon: 'notifications', route: 'notifications' },
  { label: PageType.profile, icon: 'profile', route: 'profile' }
];
export const MAINMENU_DESKTOP_ITEMS: MainMenuItemProps[] = [
  {
    label: PageType.support,
    icon: 'help',
    href: 'https://support.cryptuoso.com'
  },
  {
    label: PageType.community,
    icon: 'telegram',
    href: 'https://t.me/joinchat/ACVS-0zaWVBgAYm8gOKYHA'
  }
];

export const linksHeader = [
  {
    title: 'Robots',
    href: '/robots'
  },
  {
    title: 'Signals',
    href: '/signals'
  },
  {
    title: 'Notifications',
    href: '/notifications'
  },
  {
    title: 'Profile',
    href: '/profile'
  },
];

export const authHeader = [
  {
    title: 'Log in',
    href: '/auth/login'
  },
  {
    title: 'Sign up',
    href: '/auth/signup'
  }
];
