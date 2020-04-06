export type ButtonSize = 'big' | 'normal' | 'small';
export type ButtonType = 'primary' | 'success' | 'dimmed' | 'negative' | 'outline' | 'outline-white' | 'rounded' | 'rounded-primary' | 'rounded-negative';

export interface HoverChangesProps {
  type?: ButtonType;
  title?: string;
  icon?: string;
}
