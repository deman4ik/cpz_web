import { CheckIcon, PlusIcon, SettingsIcon, ChevronRightIcon, ChevronLeftIcon,
  ArrowDownIcon, BorderColorIcon, CloseIcon, LockOpenIcon, MinusIcon, FilterVariantRemoveIcon, FilterVariantMinusIcon,
  EmailIcon, AccountIcon } from '../../../assets/icons/svg';

export const components = {
  check: CheckIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  settings: SettingsIcon,
  chevronright: ChevronRightIcon,
  chevronleft: ChevronLeftIcon,
  arrowdown: ArrowDownIcon,
  bordercolor: BorderColorIcon,
  filtervariantremove: FilterVariantRemoveIcon,
  filtervariantminus: FilterVariantMinusIcon,
  close: CloseIcon,
  lockopen: LockOpenIcon,
  email: EmailIcon,
  account: AccountIcon
};

export const props = {
  small: { height: 26, indicator: 10 },
  normal: { height: 34, indicator: 12 },
  big: { height: 50, indicator: 14 }
};
