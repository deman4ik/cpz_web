import React from 'react';

interface Props {
  message: string;
}

export const NoRecentData: React.FC<Props> = ({ message }) => (
  <div>
    {message}
  </div>
);
