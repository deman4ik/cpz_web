import { MainMenuItemProps } from './types';
import { PageType } from '../../config/types';

export const MAINMENU_MAX_WIDTH = 200;
export const MAINMENU_MIN_WIDTH = 56;
export const MAINMENU_MIN_HEIGHT = 56;
export const MAINMENU_ITEMS: MainMenuItemProps[] = [
  { label: PageType.robots, icon: 'alarm_on', route: 'robots' },
  { label: PageType.signals, icon: 'alarm_on', route: 'signals' },
  { label: PageType.notifications, icon: 'alarm_on', route: 'notifications' },
  { label: PageType.profile, icon: 'alarm_on', route: 'profile' }
];
export const MAINMENU_DESKTOP_ITEMS: MainMenuItemProps[] = [
  {
    label: PageType.support,
    icon: 'help-circle',
    href: 'https://support.cryptuoso.com'
  },
  {
    label: PageType.community,
    icon: 'telegram',
    href: 'https://t.me/joinchat/ACVS-0zaWVBgAYm8gOKYHA'
  }
];
