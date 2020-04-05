import { PropsWithChildren } from 'react';
import { WithTranslation } from 'react-i18next';

import { ScreenTypeProps } from '../../../services/Screen';

export interface PropsPerformanceItem extends PropsWithChildren<WithTranslation> {
  item: any;
  screenType?: ScreenTypeProps;
  screenWidth?: number;
  onRedirectToDetailView: (path: string) => void;
}

export type displayType = 'signals' | 'robots';
