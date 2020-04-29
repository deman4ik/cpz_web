export type ButtonSize = 'big' | 'normal' | 'small';
export type ButtonType =
  | 'primary'
  | 'success'
  | 'dimmed'
  | 'negative'
  | 'outline'
  | 'outline-white'
  | 'rounded'
  | 'rounded-primary'
  | 'rounded-negative';

interface HoverChangesProps {
  type?: ButtonType;
  title?: string;
  icon?: string;
}

export interface ButtonProps {
  title?: string;
  icon?: string;
  type?: string;
  style?: object;
  isUppercase?: boolean;
  isLoading?: boolean;
  size?: ButtonSize;
  width?: number;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  hoverChanges?: HoverChangesProps;
  responsive?: boolean;
  clickable?: boolean;
}
