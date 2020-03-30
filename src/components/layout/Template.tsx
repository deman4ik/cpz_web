import React from 'react';
import { PageHead } from './PageHead';

interface Props {
  title?: string;
  subTitle?: string;
}

export const Template: React.FC<Props> = ({ title, subTitle }) => (
  <PageHead
    title={`${title}${subTitle ? `: ${subTitle}` : ''}`} />
);
