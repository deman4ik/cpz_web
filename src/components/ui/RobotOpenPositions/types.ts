import { PropsWithChildren } from 'react';
import { WithTranslation } from 'react-i18next';

export interface PropsOpenPositionsItem extends PropsWithChildren<WithTranslation> {
  item: {
    id: string;
    code: string;
    volume: number;
    entry_price: string;
    entry_date: string;
    direction: string;
    robot: {
      name: string;
      code: string;
      asset: string;
    };
  };
  onRedirectToDetailView: (code: string) => void;
}
